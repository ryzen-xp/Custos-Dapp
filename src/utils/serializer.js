import {Buffer} from 'buffer'

// Pads a starknet address with leading zeros
export const padAddress = (address) => {
    return '0x' + address.slice(2).padStart(64, '0');
};

// Converts a Felt to a string
export const feltToString = (felt)=> {
    const newStrB = Buffer.from(felt.toString(16), 'hex')
    return newStrB.toString()
}

// Converts a string to a Felt
export const stringToFelt = (str)=> {
    return "0x" + Buffer.from(str).toString('hex');
}

// Converts a string to a byte array
export const stringToByteArray = (str) => {
    return new TextEncoder().encode(str);
};

// Converts a byte array (string of comma-separated values) to a string
export const byteArrayToString = (byteArray) => {
    console.log("array", byteArray);
    
    // Convert the comma-separated string to an array of numbers
    const byteArrayNumbers = byteArray.split(',').map(Number);
    
    // Check if the resulting array is empty
    if (byteArrayNumbers.length === 0) {
        console.warn("Input byteArray is empty.");
        return ""; 
    }

    // Convert to Uint8Array for decoding
    const uint8Array = new Uint8Array(byteArrayNumbers);
    console.log("converted", uint8Array);
    
    return new TextDecoder().decode(uint8Array);
};

// Converts a hexadecimal string to a number
export const hexToNumber = (hex) => {
    if (hex.startsWith('0x')) {
        hex = hex.slice(2);
    }
    return parseInt(hex, 16);
};

// Converts a number to a hexadecimal string
export const numberToHex = (num, prefix = true) => {
    let hex = num.toString(16);
    return prefix ? '0x' + hex : hex;
};