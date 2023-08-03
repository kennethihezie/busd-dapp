import Address from "@/components/Address/Address";
import BnbBalanceText from "@/components/BnB_Balance_Text/BnbBalText";
import Card from "@/components/Card/Card";
import Dashboard from "@/components/Dashboard/Dashboard";
import Layout from "@/components/Layout/Layout";
import Logo from "@/components/Logo/Logo";
import NavBar from "@/components/NavBar/NavBar";
import RowButton from "@/components/RowButton/RowButton";
import SendTo from "@/components/SendTo/SendTo";
import { Component, ReactNode } from "react";

interface IProps {

}

interface IState{
  showSendUi: boolean
}

export default class Home extends Component<IProps, IState> {
  constructor(props: IProps) {
    super (props)

    this.state = {
      showSendUi: false
    }
  }

  toggleUi = () => {
    this.setState({showSendUi: !this.state.showSendUi})
  }

  render(): ReactNode {
    return (
    <Layout>
       <Logo />

       <Dashboard isSendUi={this.state.showSendUi}>

              <NavBar />

               {
                  !this.state.showSendUi ? (
                    <div className="flex flex-col space-y-6">
                <Address />
   
                <BnbBalanceText />

                <RowButton onClick={ this.toggleUi }/>
               </div>
                  ) : (<SendTo onClick={ this.toggleUi } />) 
               }

      </Dashboard> 


    </Layout>
    )
  }
}