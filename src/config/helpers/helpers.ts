export default class Helpers {
     static truncateText(str: string) {
          return str.substr(0, 6) + '...' + str.slice(-6);
      }

      static validateAddress(address: string): boolean {
         return address.match(/^0x[a-fA-F0-9]{40}$/g) !== null
      }
}