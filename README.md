# BusdPortal Dapp

The BusdPortal is a Dapp that interacts with BusdHandler smart contract which enables
User send and receive BUSD Tokens.


# Project setup

```
=> git clone https://github.com/kennethihezie/busd-dapp.git

=> cd busd-dapp

=> npm install

=> Install metamask web extension and create a wallet on metamask.

=> Note: If you deployed your BUSDHandler contract on bsc testnet, Add bsc testnet  network on metamask wallet and switch to it.

=> Replace BUSD_CONTRACT_ADDRESS variable at ./src/config/contract_abi.ts to your BUSDHandler contract deployed address.

=> npm run dev
```

# Integration Flow


## Integration using wagmi

=> Added @web3modal/wagmi and wagmi packages to the application

=> Created a config file which contains wagmi configurations for smooth running of the application.

=> Created Web3ModalProvider component which made use of WagmiProvider.

=> Made use of wagmi hooks like useReadContract, writeContract and useAccount to interact with BUSDHandler smart contract on the blockchain.


## Nextjs integration

=> Designed UI components using tsx and tailwindcss.

=> Made use of App router

=> Created reusable components

=> Used react hook and functional components.

# Challenges

=> Ethereum address validation on input field: I had to write a regular expression to validate wallet address

=> Amount validation: I had to add checks to update the UI respectively when a user enters an invalid amount or amount higher than the current wallet balance
