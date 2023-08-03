import { CopyAllRounded } from "@mui/icons-material"

const Address = () => {
    return (
        <button className="flex flex-row space-x-4 rounded-full bg-blue-500 px-4 py-1 text-white w-fit hover:bg-blue-400 mt-6">
            <div className="">0xac1ee....3D5B</div>

            <CopyAllRounded />
        </button>
    )
}

export default Address