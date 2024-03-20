import BscNavItem from "../Bsc_Nav_Item/BscNavItem"
import Button from "../Button/Button"

// Created by Collins Ihezie on 19/03/2024

const NavBar = ({children, onClick, isConnected, text}: any) => {
    return (
    <nav className="py-4 px-8 shadow-xl flex flex-row justify-between md:bg-cardBackground items-center w-full">
       <BscNavItem />

       <Button 
         onClick={ onClick }
         text={ text }
         isConnected= { isConnected }
       />
    </nav>
    )
}

export default NavBar