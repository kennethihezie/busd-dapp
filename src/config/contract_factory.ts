import { Contract } from "ethers"
import { BUSD_CONTRACT_ADDRESS, abi } from "./contract_abi"

//Created by Collins Ihezie on 03/08/203

export const contractFactory = ({signerOrProvider}: any): Contract => {
    return new Contract(BUSD_CONTRACT_ADDRESS, abi, signerOrProvider)
}