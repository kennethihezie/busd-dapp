import { MoreVert } from "@mui/icons-material"
import BscNavItem from "../Bsc_Nav_Item/BscNavItem"
import Button from "../Button/Button"

//Created by Collins Ihezie on 03/08/203

const NavBar = ({children, onClick, isConnected, text}: any) => {
    return (
    <nav className="py-4 px-8 shadow-xl flex flex-row justify-between md:bg-cardBackground items-center w-full">
       <BscNavItem />

       {/* <div className="text-xl font-bold text-white">Account 1</div> */}

       {/* <MoreVert style={{color: "white"}}  /> */}
       <Button 
         onClick={onClick}
         text={ text }
         isConnected= { isConnected }
       />
    </nav>
    )
}

export default NavBar