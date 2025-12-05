import { configDotenv } from "dotenv";
import { encrypt, decrypt } from "encryptly";

configDotenv();
const { ENCRYPTION_KEY } = process.env;

const originalData = "John Doe";
const encryptedData = encrypt(originalData, ENCRYPTION_KEY);
const decryptedData = decrypt(encryptedData, ENCRYPTION_KEY);

console.log('Original Data:', originalData);
console.log('Encrypted Data:', encryptedData);
console.log('Decrypted Data:', decryptedData);