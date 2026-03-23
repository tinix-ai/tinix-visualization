import CryptoJS from 'crypto-js'
import { isString } from './type'

const KEY = 'mt'

/**
 * * mã hóa
 * @param data { string }
 * @returns 
 */
export const cryptoEncode = (data: string): string => {
  if (!isString(data)) return ''
  // mã hóa
  const encryptedData = CryptoJS.AES.encrypt(data, KEY, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  }).toString()
  return encryptedData
}

/**
 * * Giải mã
 * @param data { string }
 * @returns 
 */
export const cryptoDecode = (data: string): string => {
  if (!isString(data)) return ''
  // Giải mã
  const decryptedData = CryptoJS.AES.decrypt(data, KEY, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  })
  return decryptedData.toString(CryptoJS.enc.Utf8)
}
