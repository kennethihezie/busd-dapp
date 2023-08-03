import { MoreVert } from "@mui/icons-material"
import BscNavItem from "../Bsc_Nav_Item/BscNavItem"

const NavBar = ({children}: any) => {
    return (
    <nav className="py-4 px-8 shadow-xl flex flex-row justify-between md:bg-cardBackground items-center w-full">
       <BscNavItem />

       {/* <div className="text-xl font-bold text-white">Account 1</div> */}

       <MoreVert style={{color: "white"}}  />
    </nav>
    )
}

export default NavBar