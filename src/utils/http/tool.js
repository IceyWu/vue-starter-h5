import { isArray, isNumber, isObject, toPro } from "@iceywu/utils";

export function isRequestSuccess(data) {
  if (isNumber(data)) {
    return data === 200;
  }
  if (isObject(data)) {
    return data.code === 200;
  } else {
    return false;
  }
}
export const requestValOptions = [
  {
    keys: ["code", "data"],
    // valFormat: (valList: any) => {
    //   const [code, data] = valList;
    //   return isRequestSuccess(code) ? data : [];
    // }
  },
];

export async function requestTo(promise, valList) {
  const valListOptions = valList
    ? [...requestValOptions, ...valList]
    : requestValOptions;

  const [err, res] = await toPro(promise, valListOptions);

  if (err) {
    return [err, null];
  }
  const [code, data] = res[0];
  if (isRequestSuccess(code)) {
    if (isArray(res) && res.length === 1) {
      return [err, data];
    } else {
      res[0] = data;
      return [null, res];
    }
  } else {
    return [res[0], null];
  }
}
