import Helpers from "@/config/helpers/helpers"
import { CopyAllRounded } from "@mui/icons-material"

// Created by Collins Ihezie on 19/03/2024

interface IAddressProp{
    account: string
}

const Address = ({account}: IAddressProp) => {
    return (
        <button className="flex flex-row space-x-4 rounded-full bg-blue-500 px-4 py-1 text-white w-fit hover:bg-blue-400 mt-6">
            <div className="">{ Helpers.truncateText(account) }</div>

            <CopyAllRounded />
        </button>
    )
}

export default Address