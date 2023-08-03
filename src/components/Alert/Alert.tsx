interface IAlertProp {
    text: string
    isSuccess: boolean
}

const Alert = ({text, isSuccess}: IAlertProp) => {
  return <div className={`flex text-start text-sm px-4 py-1 border ${isSuccess ? 'border-green-700 bg-green-500' : 'border-red-500 bg-red-300'} text-white rounded-md`}>
      { text }
  </div>
}

export default Alert