import { Contract } from "ethers"
import { BUSD_CONTRACT_ADDRESS, abi } from "./contract_abi"

export const contractFactory = ({signerOrProvider}: any) => {
    return new Contract(BUSD_CONTRACT_ADDRESS, abi, signerOrProvider)
}