import CircleAvater from "../CircleAvater/CircleAvater"

const Logo = () => {
    return (
        <div className="hidden md:flex flex-row justify-center space-x-4 items-center mt-8 mb-6">
            <CircleAvater />

            <div className="text-2xl text-white font-bold">BUSDPortal</div>
        </div>
    )
}

export default Logo