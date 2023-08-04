import Address from "@/components/Address/Address";
import BnbBusdBalanceText from "@/components/BnB_Balance_Text/BnbBalText";
import Dashboard from "@/components/Dashboard/Dashboard";
import Layout from "@/components/Layout/Layout";
import Logo from "@/components/Logo/Logo";
import NavBar from "@/components/NavBar/NavBar";
import RowButton from "@/components/RowButton/RowButton";
import SendTo from "@/components/SendTo/SendTo";
import { Component, ReactNode } from "react";
import Web3Modal from "web3modal";
import { Contract, ethers } from 'ethers';
import { BUSD_CONTRACT_ADDRESS, abi } from "@/config/contract_abi";
import Helpers from "@/config/helpers/helpers";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

//Created by Collins Ihezie on 03/08/203

interface IProps {
  
}

//create a data type to keep balances
type data = {
  bnbBalance: number
  busdBalance: number
}

//defined an interface for state
interface IState{
  showSendUi: boolean
  walletConnected: boolean,
  account: string
  data?: data,
  _isLoading: boolean
}

export default class Home extends Component<IProps, IState> {

   constructor(props: IProps) {
    super (props)

    this.state = {
      showSendUi: false,
      walletConnected: false,
      account: '',
      data: {
        busdBalance: 0,
        bnbBalance: 0
      },
      _isLoading: false,
    }
   }

   //show metamask from web3Modal to connet wallet
   getSignerOrProvider = async (needSigner = false) => {
    const providerOptions = {}

    const web3modal = new Web3Modal({
      // network: 'mubai',
      // cacheProvider: true,
      providerOptions: providerOptions
    })

    try {
      const provider = await web3modal.connect()
      const signer = new ethers.providers.Web3Provider(provider).getSigner()
      const account = await signer.getAddress()

      this.setState({ account, walletConnected: true })

      if(needSigner){
        return signer
      }

      return provider
    } catch(error){
      console.log(error);
    }
   }

  //get balances
  getBnbAndBusdBalance = async () => {    
     try {        
        let singerOrProvider = await this.getSignerOrProvider(true)   
        //get instance of contract     
        const contract = new Contract(BUSD_CONTRACT_ADDRESS, abi, singerOrProvider)

        //call contract getEtherBalance
        let bnbBalance = await contract.getEtherBalance()

        //call contract getBusdBalanceOf
        let busdBalance = await contract.getBusdBalanceOf(this.state.account)
        
        //Convert bigint to number
        bnbBalance = Number(ethers.utils.formatEther(bnbBalance)).toFixed(4)

        //convert ether wei
        busdBalance = Helpers.convertEtherToWei(busdBalance)
 
        this.setState({data: {bnbBalance, busdBalance}})
     } catch (error) {
       console.log(error);
     }
  }

  toggleUi = () => {
    this.setState({showSendUi: !this.state.showSendUi})
  }

  transferToken = async (amount: number, address: string): Promise<void> => {
      //setState to loading.
      this.setState({_isLoading: true})

      try {
        //get signer from web3modal
      let singerOrProvider = await this.getSignerOrProvider(true)   
      
      //get instance of contract
      const contract = new Contract(BUSD_CONTRACT_ADDRESS, abi, singerOrProvider)
      
      //call transferBusdToken from contract
      await contract.transferBusdToken(address, amount)

      //get current balance
      await this.getBnbAndBusdBalance()

       this.setState({_isLoading: false, showSendUi: false})
       //show toast
      this.notify(true)
      } catch(error) {
        console.log(error);
        
        this.setState({_isLoading: false})

        //show toast
        this.notify(false)
      }
  }

  notify = (isTransferSuccessful: boolean) => {
    if(isTransferSuccessful){
      toast.success("Transaction is pending...", {
        position: toast.POSITION.TOP_CENTER
      })
    } else {
      toast.error("An error occured", {
        position: toast.POSITION.TOP_RIGHT
      })
    }
  };

  render(): ReactNode {

    return (
    <>
    <Layout>
       <Logo />

       <Dashboard isSendUi={this.state.showSendUi}>

              <NavBar
                 text = {this.state.walletConnected ? 'Connected' : 'Connect wallet'}
                 isConnected = {this.state.walletConnected}
                 onClick = { this.getBnbAndBusdBalance }
               />

              {
                 this.state.walletConnected ? 
                    <>
                      {
                    !this.state.showSendUi ? (
                      <div className="flex flex-col space-y-6">
                  <Address
                    account={this.state.account}
                   />
     
                  <BnbBusdBalanceText
                    bnbBal={this.state.data?.bnbBalance}
                    busdBal={this.state.data?.busdBalance}
                   />
  
                  <RowButton onClick={ this.toggleUi }/>
                 </div>
                    ) : (
                         <SendTo 
                             onClick={ this.toggleUi } 
                             transferToken={ this.transferToken }
                             busdBal={this.state.data?.busdBalance}
                             isLoading={this.state._isLoading}
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
}