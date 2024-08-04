// import CryptoJS from 'crypto-js';

// const SECRET_KEY = "absvhwjklfheifhehfejfowfohopfhoehf787282986289jbjksc";

// export const encryptData = (name, data) => {
//     const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
//     localStorage.setItem(name, encrypted);
// }

// export const clearCart = () =>{
//     localStorage.clear();
// }

// export const decryptData = (data) => {
//     if (!data) {
//         console.warn('decryptData was called with null or undefined data');
//         return null;
//     }
//     try {
//         const bytes = CryptoJS.AES.decrypt(data, SECRET_KEY);
//         if (!bytes || bytes.sigBytes < 0) {
//             console.warn('Failed to decrypt data or data is corrupted');
//             return null;
//         }
//         const decryptedString = bytes.toString(CryptoJS.enc.Utf8);
//         return JSON.parse(decryptedString); // Parse the string back into an object
//     } catch (error) {
//         console.error('Error during decryption:', error);
//         return null;
//     }
// };


// export const cleanAndConvertMobileNumber = (mobileNumberString) => {
//     if (mobileNumberString) {
//         const cleaned = mobileNumberString?.replace(/\D/g, '');
//         if (cleaned === '' || isNaN(parseInt(cleaned, 10))) {
//             return null; 
//         }
//         return parseInt(cleaned, 10);
//     }
// };


// export const getData = (name) => {
//     const encryptedData = localStorage.getItem(name);
//     if (!encryptedData) {
//         return null;
//     }
//     const decryptedData = decryptData(encryptedData);
//     return decryptedData;
// };

import CryptoJS from 'crypto-js';

const SECRET_KEY = "absvhwjklfheifhehfejfowfohopfhoehf787282986289jbjksc";

export const encryptData = (name, data) => {
    try {
        const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
        localStorage.setItem(name, encrypted);
    } catch (error) {
        console.error('Error during encryption:', error);
    }
}

export const clearCart = () => {
    localStorage.clear();
}

export const decryptData = (data) => {
    if (!data) {
        console.warn('decryptData was called with null or undefined data');
        return null;
    }
    try {
        const bytes = CryptoJS.AES.decrypt(data, SECRET_KEY);
        if (!bytes || bytes.sigBytes <= 0) {
            console.warn('Failed to decrypt data or data is corrupted');
            return null;
        }
        const decryptedString = bytes.toString(CryptoJS.enc.Utf8);
        return JSON.parse(decryptedString); // Parse the string back into an object
    } catch (error) {
        console.error('Error during decryption:', error);
        return null;
    }
};

export const getData = (name) => {
    const encryptedData = localStorage.getItem(name);
    if (!encryptedData) {
        console.warn(`No data found in localStorage for key: ${name}`);
        return null;
    }
    const decryptedData = decryptData(encryptedData);
    if (!decryptedData) {
        console.warn(`Failed to decrypt data for key: ${name}`);
        return null;
    }
    return decryptedData;
};

// Usage example
export const getCartData = () => {
    const cartData = getData('cart');
    if (!cartData) {
        console.warn('Cart data is empty or failed to decrypt');
    }
    return cartData;
};

