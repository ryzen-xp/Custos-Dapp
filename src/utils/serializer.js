import {Buffer} from 'buffer'



/**
 * Pads a given starknet address with leading zeros to ensure it is 64 characters long.
 *
 * @function padAddress
 * @param {string} address - The starknet address to pad.
 * @returns {string} The padded starknet address.
 *
 * @example
 * const address = '0x1234567890abcdef';
 * const paddedAddress = padAddress(address);
 * console.log(paddedAddress); // Output: '0x0000000000000000000000001234567890abcdef'
 */
export const padAddress = (address) => {
    return '0x' + address.slice(2).padStart(64, '0');
};




/**
 * Converts a Felt (a number in the Felt128 field) to a string.
 *
 * @function feltToString
 * @param {number} felt - The Felt number to convert.
 * @returns {string} The string representation of the Felt number.
 *
 * @example
 * const feltNumber = 1234567890;
 * const feltString = feltToString(feltNumber);
 * console.log(feltString); // Output: '1234567890'
 */
export const feltToString = (felt)=> {
    const newStrB = Buffer.from(felt.toString(16), 'hex')
    return newStrB.toString()
}





/**
 * Converts a string to a Felt (a number in the Felt128 field) represented as a hexadecimal string.
 *
 * @function stringToFelt
 * @param {string} str - The string to convert.
 * @returns {string} The Felt number as a hexadecimal string prefixed with '0x'.
 *
 * @example
 * const inputString = 'Hello, Felt!';
 * const feltNumber = stringToFelt(inputString);
 * console.log(feltNumber); // Output: '0x48656c6c6f2c2046656c7421'
 */
export const stringToFelt = (str)=> {
    return "0x" + Buffer.from(str).toString('hex');
}