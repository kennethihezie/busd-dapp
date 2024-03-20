import CircleAvater from "../CircleAvater/CircleAvater"

// Created by Collins Ihezie on 19/03/2024

const Logo = () => {
    return (
        <div className="hidden md:flex flex-row justify-center space-x-4 items-center mt-8 mb-6">
            <CircleAvater />

            <div className="text-2xl text-white font-bold">BUSDPortal</div>
        </div>
    )
}

export default Logo