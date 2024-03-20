import { defaultWagmiConfig } from "@web3modal/wagmi/react/config"
import { bscTestnet, mainnet } from "wagmi/chains"

export const projectId = 'ddddb30a39bd07de0b087e0247ff46c3'

const metadata = {
    name: 'Web3Modal',
    description: 'Web3Modal Example',
    url: 'https://busd-dapp.vercel.app/',
    icons: ['https://avatars.githubusercontent.com/u/37784886']
}

const chains = [mainnet, bscTestnet] as const

export const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
})