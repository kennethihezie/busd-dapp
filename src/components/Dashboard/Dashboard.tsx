// Created by Collins Ihezie on 19/03/2024

const Dashboard = ({children, isSendUi}: any) => {
    return (
        <div className={`flex flex-col justify-center items-center space-y-8 w-full ${isSendUi ? '' : 'md:bg-cardBackground'}`}>
           { children }
        </div>
    )
}

export default Dashboard