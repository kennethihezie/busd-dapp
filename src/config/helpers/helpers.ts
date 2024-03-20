import { ethers } from "ethers";

//Created by Collins Ihezie on 03/08/203

export default class Helpers {
     static truncateText(str: string) {
          return str.substr(0, 6) + '...' + str.slice(-6);
      }

      static validateAddress(address: string): boolean {
         return address.match(/^0x[a-fA-F0-9]{40}$/g) !== null
      }

      static convertEtherToWei(value: bigint): number {
         return Number(ethers.utils.formatEther(value)) * 1000000000000000000
      }
}