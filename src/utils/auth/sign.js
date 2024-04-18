import md5 from "js-md5";
import { sortObj } from "@iceywu/utils";
import { v4 as uuidv4 } from "uuid";
import { secretKey } from "@/config/sign";

function generateUUID(num = 32) {
  return uuidv4();
  const chars =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");
  const uuid = [];
  let i;
  num = num || 32;
  for (i = 0; i < num; i++) uuid[i] = chars[0 | (Math.random() * 62)];
  return uuid.join("");
}
export const encrypt = (data = {}) => {
  const ttData = JSON.parse(JSON.stringify(data));
  for (let key in data) {
    if (Array.isArray(data[key])) {
      data[key] = JSON.stringify(data[key]);
    }
  }
  let tempData = {};
  const timestamp = new Date().getTime();
  const uuid = generateUUID(32);

  const baseData = sortObj({
    ...ttData,
    timestamp,
  });
  const signData = sortObj({
    ...data,
    nonce: uuid,
    timestamp,
  });

  let signStr = "";
  for (let key in signData) {
    signStr += `${key}=${signData[key]}&`;
  }
  // 在拼接secretKey
  signStr += `key=${secretKey}`;
  const sign = md5(signStr);
  tempData = {
    ...baseData,
    sign,
  };
  return {
    nonce: uuid,
    timestamp,
    sign,
    tempData: ttData,
  };
};
