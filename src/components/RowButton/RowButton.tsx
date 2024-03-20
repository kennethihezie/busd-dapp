import { Add, NorthEast, Send, SettingsEthernet, SwapHoriz } from "@mui/icons-material"

// Created by Collins Ihezie on 19/03/2024

interface IRowButton{
   onClick: () => void
}

const RowButton = ({onClick}: IRowButton) => {
    return (
        <div className="flex flex-row space-x-4 pb-8">
           <div className="flex flex-col items-center">
           <button className="px-2 py-2">
              <div className="rounded-full bg-blue-500 opacity-40 px-1 py-1">
                <Add style={{ color: "white"}} />
              </div>
           </button>
           
           <div className="text-sm text-white opacity-40">Buy</div>

           </div>

           <div className="flex flex-col items-center">
           <button className="px-2 py-2" onClick={ onClick }>
              <div className="rounded-full bg-blue-500 px-1 py-1">
                <NorthEast style={{ color: "white"}} />
              </div>
           </button>

           <div className="text-sm text-white">Send</div>
           </div>

           <div className="flex flex-col items-center">
           <button className="px-2 py-2">
              <div className="rounded-full bg-blue-500 opacity-40 px-1 py-1">
                <SwapHoriz style={{ color: "white"}} />
              </div>
           </button>

           <div className="text-sm text-white opacity-40">Swap</div>
           </div>
        </div>
    )
}

export default RowButton