import { Clear, QrCode, } from "@mui/icons-material"
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react"
import Alert from "../Alert/Alert"
import Helpers from "@/config/helpers/helpers"
import { BUSD_CONTRACT_ADDRESS, BUSD_ABI } from "@/config/contract_abi";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { toast } from "react-toastify";

// Created by Collins Ihezie on 19/03/2024

interface ITransfer {
    onClick: () => void
    busdBal?: number,
}


const Transfer = ({onClick, busdBal}: ITransfer) => {
   const [isTyping, setIsTyping] = useState<boolean>(false)
   const [isAddressValid, setIsAddressValid] = useState<boolean>(false)
   const [isFirstAddress, setIsFirstAddress] =  useState<boolean>(true)
   const [isAmountValid, setIsAmountValid] = useState<boolean>(false)
   const [isFirstAmount, setIsFirstAmount] =  useState<boolean>(true)
   const inputRef = useRef<HTMLInputElement>(null)
   const { data: hash, isPending, writeContract } = useWriteContract() 
   const { isLoading: isConfirming, isSuccess: isConfirmed, isError, error } = useWaitForTransactionReceipt({ hash }) 

   useEffect(() => {
     if(isConfirmed){
      toast.success("Transaction confirmed")
      window.location.reload()
     } else if(isError){
      toast.error(error.message)
     }
   }, [isConfirmed, isError]);

  
   const onAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
      if(e.target.value === ''){
        setIsTyping(false)
        setIsFirstAddress(true)
      } else {
        setIsFirstAddress(false)
        setIsTyping(true);
        let addressCheck = Helpers.validateAddress(e.target.value)
        setIsAddressValid(addressCheck)
      }
   }

   const onAmountChange = (e: any) => {
       setIsFirstAmount(false)

      if(e.target.value > (busdBal ?? 0)){
         setIsAmountValid(false)
      } else if(e.target.value <= 0 || e.target.value == ''){
        setIsFirstAmount(true)

        setIsAmountValid(false)
      } else {
        setIsAmountValid(true)
      }
   }

   const clearAddress = () => {
     inputRef.current!.value = ""
     setIsTyping(false)
   }

   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      if(isAddressValid && isAmountValid){
         setIsFirstAddress(true)
         setIsFirstAmount(true)

         writeContract({
          address: BUSD_CONTRACT_ADDRESS,
          abi: BUSD_ABI,
          functionName: 'transferBusdToken',
          // @ts-ignore
          args: [ e.target.address.value, BigInt(e.target.amount.value)]
         })
      }
   }
   
  return (
        <form onSubmit={ handleSubmit } className="flex flex-col justify-between items-center space-y-6 md:bg-cardBackground mt-4 rounded-md md:shadow-md px-4 py-4 md:w-7/12 w-96 h-96">
          <div className="flex flex-col space-y-6 w-full">
          <div className="flex flex-row justify-between items-center w-full">
               <div className="text-xl text-white">Send to</div>

               <button className="text-blue-400 text-sm" onClick={ onClick }>Cancel</button>
           </div>

           <div className="flex flex-col space-y-2">
           <label className="relative block w-full">
            <input id="address" className="w-full border bg-cardBackground text-white border-slate-400 drop-shadow-md rounded-md py-2 pl-3 pr-10 placeholder:text-md"
                placeholder="Enter public address(0x)" type="text" ref={ inputRef } onChange={ onAddressChange } disabled={ isPending }/>

            <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                {
                    isTyping ? <button onClick={ clearAddress }> <Clear style={{color: "white"}}/> </button> : <QrCode style={{color: "white"}} />
                }
            </span>
           </label>

          {
             !isFirstAddress ? <Alert 
             text={isAddressValid ? 'Address is valid' : 'Invalid recipient address'}
             isSuccess={isAddressValid} />  : null
          }

           </div>

          
          <div className="flex flex-col space-y-1">

          {
             isAddressValid ? (
              <input id="amount" className=" w-full border bg-cardBackground text-white border-slate-400 drop-shadow-md rounded-md py-2 pl-3 pr-4"
                onChange={ onAmountChange } placeholder="Enter amount" type="number" disabled={ isPending }/>
             ) : null
          }

          {
             !isFirstAmount ? <Alert 
             text={isAmountValid ? 'Amount is valid' : 'Invalid amount or amount is bigger than balance'}
             isSuccess={isAmountValid} />  : null
          }  
          </div>  

            <div className="text-center text-white text-sm">
               Max Amount: { busdBal ?? 0 } BUSD
            </div>  
          </div>

          {
            isAddressValid && isAmountValid ? (
              <button disabled={ isPending } type="submit" className={`shadow-lg bg-blue-500 rounded-full text-white py-2 px-4 hover:bg-blue-400 w-full justify-between`}>
                {
                    isPending ? <svg role="status" className="inline w-5 h-5 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                    </svg> :  isConfirming ? 'Wait for confirmation....' : isConfirmed ? 'Transaction confirmed' : 'SEND'
                }
              </button> 
            ) : null
          }
              

        </form>
  )
}

export default Transfer
 