# BusdPortal Dapp


The BusdPortal is a Dapp that interacts with BusdHandler smart contract which enables
User send and receive BUSD Tokens.

The project is build using nextjs which is a superset of react framework. And etherjs library is used
to interact with blockchain.

This project uses class component and functional components where neccessary, to build a robust UI 
while managing state changes efficiently.


This project uses ether.js library to interact with blockchain and web3modal to connect wallet like metamask to sign transactions.

# Integration Flow

=> Designed UI components using tsx and tailwindcss.

=> Added web3modal and ether.js packages.

=> Setup contract abi and added contract deployed address.

=> Get an instance of web3modal, connect wallet to get access to provider and signers

=> Get an instance of Contract class in ether.js using (BusdHandler deployed contract address, abi, and signer(provided by web3modal))

=> Communocate with blockchain(calling methods on the blockcahin) using the provided instance of ether Contract class.

# Challenges
=> Ethereum address validation on input field: I had to write a regular expression to validate wallet address

=> Amount validation: I had to add checks to update the UI respectively when a user enters and invalid amount or amount higher than the current wallet balance

# Project setup

=> Install metamask web extension, Create a wallet on metamask.

=> Note: If you deployed your BUSDHandler contract on bsc testnet, Add bsc testnet  network on metamask wallet and switch to it.

=> Else If you deployed your BUSDHandler contract on polygon testnet, Add polygon munbai testnet network on metamask wallet and switch to it.

=> Replace BUSD_CONTRACT_ADDRESS variable at ./src/config/contract_abi.ts to your BUSDHandler contract deployed address.

```
=> git clone https://github.com/kennethihezie/busd-dapp.git

=> cd busd-dapp

=> npm install

=> npm run dev
```
