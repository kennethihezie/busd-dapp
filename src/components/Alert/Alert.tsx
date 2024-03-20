interface IAlertProp {
    text: string
    isSuccess: boolean
}

// Created by Collins Ihezie on 19/03/2024

const Alert = ({text, isSuccess}: IAlertProp) => {
  return <div className={`flex text-start text-sm px-4 py-2   border ${isSuccess ? 'border-green-700 bg-green-500' : 'border-red-500 bg-red-500'} text-white rounded-md`}>
      { text }
  </div>
}

export default Alert