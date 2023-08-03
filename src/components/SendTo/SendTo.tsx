import { QrCodeScanner, Scanner } from "@mui/icons-material"

interface ISendTo{
    onClick: () => void
 }

const SendTo = ({onClick}: ISendTo) => {
    return (
        <div className="flex flex-col justify-between items-center space-y-6 md:bg-cardBackground mt-4 rounded-md md:shadow-md px-4 py-4 w-96 h-96">
          <div className="flex flex-col space-y-6 w-full">
          <div className="flex flex-row justify-between items-center w-full">
               <div className="text-xl text-white">Send to</div>

               <button className="text-blue-400 text-sm" onClick={ onClick }>Cancel</button>
           </div>

           <label className="relative block w-full">
            <input
                className="w-full border bg-cardBackground text-white border-slate-400 drop-shadow-md rounded-md py-2 pl-3 pr-10"
                placeholder="Enter public address(0x) or ENS name" type="text" />

            <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                <QrCodeScanner style={{color: "white"}} />
            </span>
        </label>


        <input className="w-full border bg-cardBackground text-white border-slate-400 drop-shadow-md rounded-md py-2 pl-3 pr-4"
                placeholder="Enter amount" type="number" />

          </div>
                

         <button className="shadow-lg bg-blue-400 rounded-full text-white w-full py-2 hover:bg-blue-300 justify-between">SEND</button>       
        </div>
    )
}

export default SendTo
 