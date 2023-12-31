
interface IBnbBusdBalanceText {
    bnbBal?: number
    busdBal?: number
}

//Created by Collins Ihezie on 03/08/203

const BnbBusdBalanceText = ({bnbBal, busdBal}: IBnbBusdBalanceText) => {
    return (
        <div className="flex flex-col items-center text-white py-4">
            <div className="text-3xl">{ busdBal ?? 0 } BUSD</div>
            <div className="text-sm">{ bnbBal ?? 0 } BNB</div>
        </div>
    )
}

export default BnbBusdBalanceText