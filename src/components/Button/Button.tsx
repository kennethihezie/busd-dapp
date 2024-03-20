// Created by Collins Ihezie on 19/03/2024


interface IButtonProp {
    onClick: () => void
    isConnected?: boolean
    text: string
    shouldExpand?: boolean
}


const Button = ({onClick, isConnected, text, shouldExpand}: IButtonProp) => {
    return  <button className={`shadow-lg ${isConnected ? 'bg-green-500' : 'bg-blue-500'} rounded-full text-white py-2 px-4 ${ isConnected ? '' : 'hover:bg-blue-400'}  ${shouldExpand ? 'w-full' : ''} justify-between`} onClick={ onClick } disabled={ isConnected }>{ text }</button>       
}


export default Button