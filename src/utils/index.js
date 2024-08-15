import { compareObjects } from "@iceywu/utils";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime); // 相对时间
dayjs.locale("zh-cn"); // 使用本地

export const formatTime = (
  time,
  format = "YYYY-MM-DD HH:mm:ss",
  isISO = true
) => {
  if (!time) return "";
  isISO && (time = new Date(time).getTime());
  if (time.toString().length < 13) {
    time = time * 1000;
  }
  return dayjs(time).format(format);
};

/** 获取本地存储 */
export const getLocalStorage = (key) => {
  if (localStorage.getItem(key) !== null) {
    return JSON.parse(localStorage.getItem(key));
  }
};

/** 设置本地存储 */
export const setLocalStorage = (key, val) => {
  return localStorage.setItem(key, JSON.stringify(val));
};

/** 删除本地存储 */
export const removeLocalStorage = (key) => {
  return localStorage.removeItem(key);
};

// SessionStorage
/** 获取本地存储 */
export const getSessionStorage = (key) => {
  if (sessionStorage.getItem(key) !== null) {
    return JSON.parse(sessionStorage.getItem(key));
  }
};

/** 设置本地存储 */
export const setSessionStorage = (key, val) => {
  return sessionStorage.setItem(key, JSON.stringify(val));
};

/** 删除本地存储 */
export const removeSessionStorage = (key) => {
  return sessionStorage.removeItem(key);
};

export const useDateFormat = (time, format) => {
  const date = new Date(Number(time));
  const o = {
    "M+": date.getMonth() + 1, //month
    "D+": date.getDate(), //day
    "h+": date.getHours(), //hour
    "m+": date.getMinutes(), //minute
    "s+": date.getSeconds(), //second
    "q+": Math.floor((date.getMonth() + 3) / 3), //quarter
    S: date.getMilliseconds(), //millisecond
  };
  if (/(Y+)/.test(format)) {
    format = format.replace(
      RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }
  for (const k in o) {
    if (new RegExp("(" + k + ")").test(format)) {
      format = format.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
    }
  }
  return format;
};
/** 时间处理 */
export const formatTimeBefore = (time) => {
  if (!time) return "";
  return dayjs(time).fromNow().replace(" ", "");
};
// 文件下载
export function downloadFile(url, fileName = "未知文件") {
  const link = document.createElement("a");
  link.style.display = "none";
  link.href = url;
  link.setAttribute("download", fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// 根据文件url后缀判断文件类型
export function getFileType(url) {
  if (!url) return "other";
  // 文件类型和对应的后缀名数组
  const imageExtensions = ["jpg", "jpeg", "png", "gif", "webp", "svg"];
  const videoExtensions = ["mp4", "avi", "mov"];
  const pdfExtensions = ["pdf"];
  const documentExtensions = ["doc", "docx"];
  const audioExtensions = ["mp3", "wav", "ogg"];
  const zipExtensions = ["zip", "rar", "7z"];
  const excelExtensions = ["xls", "xlsx"];
  const pptExtensions = ["ppt", "pptx"];
  // 获取文件扩展名
  const fileExtension = url.split(".").pop().toLowerCase();
  // 判断文件类型
  if (imageExtensions.includes(fileExtension)) {
    return "image";
  } else if (videoExtensions.includes(fileExtension)) {
    return "video";
  } else if (pdfExtensions.includes(fileExtension)) {
    return "pdf";
  } else if (documentExtensions.includes(fileExtension)) {
    return "document";
  } else if (audioExtensions.includes(fileExtension)) {
    return "audio";
  } else if (zipExtensions.includes(fileExtension)) {
    return "zip";
  } else if (excelExtensions.includes(fileExtension)) {
    return "excel";
  } else if (pptExtensions.includes(fileExtension)) {
    return "ppt";
  } else {
    return "other";
  }
}
// 返回对象中不一样的数据
export function getChangedData(oldData, newData) {
  return compareObjects(oldData, newData);
}
// 与基座进行数据交互
export const handleMicroData = () => {
  let res = null;
  // 是否是微前端环境
  console.log(
    "-----------基座对象window------",
    window.__MICRO_APP_ENVIRONMENT__
  );
  if (window.__MICRO_APP_ENVIRONMENT__) {
    // 主动获取基座下发的数据
    if (window.microApp) {
      const data = window.microApp.getData();
      res = data;
    }
  }
  console.log("----------微前端window.microApp---------", res);
  return res;
};

export default {
  getLocalStorage,
  setLocalStorage,
  removeLocalStorage,
  getSessionStorage,
  setSessionStorage,
  removeSessionStorage,

  downloadFile,
  useDateFormat,
};
