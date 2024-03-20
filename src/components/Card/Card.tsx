// Created by Collins Ihezie on 19/03/2024


const Card = ({children}: any) => {
    return (
        <div className="flex flex-col justify-center items-center space-y-8 md:bg-cardBackground md:mt-8">{ children }</div>
    )
}

export default Card