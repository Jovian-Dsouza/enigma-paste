import { encrypt } from "@metamask/eth-sig-util";
import { bufferToHex } from "ethereumjs-util";
const CryptoJS = require("crypto-js");

function generateKey(length) {
  const key = CryptoJS.lib.WordArray.random(length);
  return key;
}

export async function getPublicKey(walletAddress) {
  const keyB64 = await window.ethereum.request({
    method: "eth_getEncryptionPublicKey",
    params: [walletAddress],
  });
  return keyB64;
}

export async function encryptData(walletAddress, data) {
  let publicKey = await getPublicKey(walletAddress)
  if (!publicKey) {
    return;
  }

  //Encrypt the data using AES
  const aesKey = generateKey(16).toString(); // Generate a 16-byte (128-bit) key
  const encryptedData = CryptoJS.AES.encrypt(data, aesKey).toString();

  //Encrypt AES key using public key
  const encryptedKey = bufferToHex(
    Buffer.from(
      JSON.stringify(
        encrypt({
          publicKey: publicKey,
          data: aesKey,
          version: "x25519-xsalsa20-poly1305",
        })
      ),
      "utf8"
    )
  );

  return JSON.stringify({
    key: encryptedKey,
    data: encryptedData,
  });
}

export async function decryptData(walletAddress, data) {
  const dataJson = JSON.parse(data);

  //Decrypt the AES key
  let aesKey = await window.ethereum
    .request({
      method: "eth_decrypt",
      params: [dataJson["key"], walletAddress],
    })
    .catch((error) => {
      window.alert(error.message);
    });
  if (!aesKey) {
    return;
  }

  const decryptedMessage = CryptoJS.AES.decrypt(
    dataJson["data"],
    aesKey
  ).toString(CryptoJS.enc.Utf8);
  return decryptedMessage;
}
