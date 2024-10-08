import CryptoJS from 'crypto-js';

export const encryptPass = (password) => {
  const secretKey = 'DJIOSCN89W32JNC9E2DW3W223';
  return CryptoJS.AES.encrypt(password, secretKey).toString();
}