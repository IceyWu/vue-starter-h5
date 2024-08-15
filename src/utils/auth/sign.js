import md5 from 'js-md5'
import { sortObj } from '@iceywu/utils'
import { v4 as uuidv4 } from 'uuid'
import { secretKey } from '@/config/sign'

function generateUUID(num = 32) {
  return uuidv4()
}
export function encrypt(data = {}) {
  const ttData = JSON.parse(JSON.stringify(data))

  for (const key in data) {
    if (data[key] instanceof Object) {
      data[key] = JSON.stringify(data[key])
    }
    // if (Array.isArray(data[key])) {
    //   data[key] = JSON.stringify(data[key]);
    // }
  }
  let tempData = {}
  const timestamp = new Date().getTime()
  const uuid = generateUUID(32)

  const baseData = sortObj({
    ...ttData,
    timestamp,
  })
  const signData = sortObj({
    ...data,
    nonce: uuid,
    timestamp,
  })

  let signStr = ''
  for (const key in signData) {
    signStr += `${key}=${signData[key]}&`
  }
  // 在拼接secretKey
  signStr += `key=${secretKey}`

  const sign = md5(signStr)
  tempData = {
    ...baseData,
    sign,
  }
  return {
    nonce: uuid,
    timestamp,
    sign,
    tempData: ttData,
  }
}
