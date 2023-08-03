import Address from "@/components/Address/Address";
import BnbBusdBalanceText from "@/components/BnB_Balance_Text/BnbBalText";
import Card from "@/components/Card/Card";
import Dashboard from "@/components/Dashboard/Dashboard";
import Layout from "@/components/Layout/Layout";
import Logo from "@/components/Logo/Logo";
import NavBar from "@/components/NavBar/NavBar";
import RowButton from "@/components/RowButton/RowButton";
import SendTo from "@/components/SendTo/SendTo";
import { Component, ReactNode } from "react";
import Web3Modal from "web3modal";
import { ethers } from 'ethers';
import { contractFactory } from "@/config/contract_factory";


interface IProps {
  
}

type data = {
  bnbBalance: number
  busdBalance: number
}

interface IState{
  showSendUi: boolean
  walletConnected: boolean,
  provider: any,
  signer: any,
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
      provider: undefined,
      signer: undefined,
      account: '',
      data: {
        busdBalance: 10,
        bnbBalance: 0
      },
      _isLoading: false
    }

    this.connectWallet = this.connectWallet.bind(this)
  }

  async connectWallet() {
    const providerOptions = {}
    const web3modal = new Web3Modal({
      network: 'BSC Testnet',
      cacheProvider: true,
      providerOptions: providerOptions
    })

    try{
      const provider = await web3modal.connect()
      const signer = new ethers.providers.Web3Provider(provider).getSigner()
      const account = await signer.getAddress()
      this.setState({ provider, signer, account, walletConnected: true })

      //get balances
      await this.getBnbAndBusdBalance()
    } catch(error){
      console.log(error);
    }
  }

  getBnbAndBusdBalance = async () => {
     try {
        const contract = contractFactory(this.state.provider)
        const bnbBalance = await contract.getBnbBalance()
        const busdBalance = await contract.getBusdBalanceOf(this.state.account)

        this.setState({data: {bnbBalance, busdBalance}})
     } catch (error) {
       console.log(error);
     }
  }

  toggleUi = () => {
    this.setState({showSendUi: !this.state.showSendUi})
  }

  transferToken = async (amount: number, address: string): Promise<void> => {
      this.setState({_isLoading: true})

      const contract = contractFactory(this.state.signer) 

      await contract.transferBusdToken(address, amount)
      //get current balance
      await this.getBnbAndBusdBalance()

      this.setState({_isLoading: false, showSendUi: false})

      // setTimeout(()=>{ this.setState({_isLoading: false}) }, 3000)
  }

  render(): ReactNode {

    return (
    <Layout>
       <Logo />

       <Dashboard isSendUi={this.state.showSendUi}>

              <NavBar
                 text = {this.state.walletConnected ? 'Connected' : 'Connect wallet'}
                 isConnected = {this.state.walletConnected}
                 onClick = { this.connectWallet }
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
    )
  }
}