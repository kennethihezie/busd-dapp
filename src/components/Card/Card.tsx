//Created by Collins Ihezie on 03/08/203


const Card = ({children}: any) => {
    return (
        <div className="flex flex-col justify-center items-center space-y-8 md:bg-cardBackground md:mt-8">{ children }</div>
    )
}

export default Card