'use client'

import Address from "@/components/Address/Address";
import BnbBusdBalanceText from "@/components/BnB_Balance_Text/BnbBalText";
import Dashboard from "@/components/Dashboard/Dashboard";
import Layout from "@/components/Layout/Layout";
import Logo from "@/components/Logo/Logo";
import NavBar from "@/components/NavBar/NavBar";
import RowButton from "@/components/RowButton/RowButton";
import Transfer from "@/components/Transfer/Transfer";
import { useEffect, useState } from "react";
import { BUSD_CONTRACT_ADDRESS, BUSD_ABI } from "@/config/contract_abi";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { UserBalance } from "@/states/busd_state";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount, useReadContract } from "wagmi";

// Created by Collins Ihezie on 19/03/2024

export default function Page() {
  const [showSendUi, setShowSendUi] = useState(false)

  // Check if the user's wallet is connected, 
  // and it's address using Wagmi's hooks.
  const account = useAccount()

   // State variable to know if the component has been mounted yet or not
  const [ isMounted, setIsMounted ] = useState(false)

  const { open } = useWeb3Modal()

  const busdBalance = useReadContract({
    abi: BUSD_ABI,
    address: BUSD_CONTRACT_ADDRESS,
    functionName: 'getBusdBalanceOf',
    args: [ account.address ]
  })
  
  const bnbBalance = useReadContract({
    abi: BUSD_ABI,
    address: BUSD_CONTRACT_ADDRESS,
    functionName: 'getEtherBalance',
  })

  const connectWallet = async () => {    
    await open({ view: 'Networks' })
  }

  const toggleUi = () => {    
    setShowSendUi(!showSendUi)
  }

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
    <Layout>
       <Logo />

       <Dashboard isSendUi={showSendUi}>

              <NavBar
                 text = { account.isConnected ? 'Connected' : 'Connect wallet' }
                 isConnected = { account.isConnected }
                 onClick = { connectWallet }
               />

              {
                 account.isConnected ? 
                    <>
                      {
                    !showSendUi ? (
                      <div className="flex flex-col space-y-6 justify-center items-center">
                  <Address account={account.address ?? ''}/>
     
                  <BnbBusdBalanceText
                    // @ts-ignore
                    bnbBal={ Number(bnbBalance.data) }
                    // @ts-ignore
                    busdBal={ Number(busdBalance.data) }
                   />
  
                  <RowButton onClick={ toggleUi }/>
                 </div>
                    ) : (
                         <Transfer 
                             onClick={ toggleUi } 
                             busdBal={ Number(busdBalance.data) }
                         />
                    ) 
                 }
                    </>
                  : (
                     <div className="flex flex-col justify-center items-center text-white text-3xl text-center p-8 md:mx-24">
                        Connect Wallet to perform lightening fast transactions
                     </div>
                 )
              }

      </Dashboard> 
    </Layout>

    <ToastContainer />
    </>
  )
}