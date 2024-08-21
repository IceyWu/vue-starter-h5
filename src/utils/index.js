import { compareObjects } from '@iceywu/utils'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime) // 相对时间
dayjs.locale('zh-cn') // 使用本地

export function formatTime(time, format = 'YYYY-MM-DD HH:mm:ss', isISO = true) {
  if (!time)
return ''
  isISO && (time = new Date(time).getTime())
  if (time.toString().length < 13) {
    time = time * 1000
  }
  return dayjs(time).format(format)
}

/** 获取本地存储 */
export function getLocalStorage(key) {
  if (localStorage.getItem(key) !== null) {
    return JSON.parse(localStorage.getItem(key))
  }
}

/** 设置本地存储 */
export function setLocalStorage(key, val) {
  return localStorage.setItem(key, JSON.stringify(val))
}

/** 删除本地存储 */
export function removeLocalStorage(key) {
  return localStorage.removeItem(key)
}

// SessionStorage
/** 获取本地存储 */
export function getSessionStorage(key) {
  if (sessionStorage.getItem(key) !== null) {
    return JSON.parse(sessionStorage.getItem(key))
  }
}

/** 设置本地存储 */
export function setSessionStorage(key, val) {
  return sessionStorage.setItem(key, JSON.stringify(val))
}

/** 删除本地存储 */
export function removeSessionStorage(key) {
  return sessionStorage.removeItem(key)
}

export function useDateFormat(time, format) {
  const date = new Date(Number(time))
  const o = {
    'M+': date.getMonth() + 1, // month
    'D+': date.getDate(), // day
    'h+': date.getHours(), // hour
    'm+': date.getMinutes(), // minute
    's+': date.getSeconds(), // second
    'q+': Math.floor((date.getMonth() + 3) / 3), // quarter
    S: date.getMilliseconds(), // millisecond
  }
  if (/(Y+)/.test(format)) {
    format = format.replace(
      RegExp.$1,
      (`${date.getFullYear()}`).substr(4 - RegExp.$1.length),
    )
  }
  for (const k in o) {
    if (new RegExp(`(${k})`).test(format)) {
      format = format.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : (`00${o[k]}`).substr((`${o[k]}`).length),
      )
    }
  }
  return format
}
/** 时间处理 */
export function formatTimeBefore(time) {
  if (!time)
return ''
  return dayjs(time).fromNow().replace(' ', '')
}
// 文件下载
export function downloadFile(url, fileName = '未知文件') {
  const link = document.createElement('a')
  link.style.display = 'none'
  link.href = url
  link.setAttribute('download', fileName)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

// 根据文件url后缀判断文件类型
export function getFileType(url) {
  if (!url)
return 'other'
  // 文件类型和对应的后缀名数组
  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg']
  const videoExtensions = ['mp4', 'avi', 'mov']
  const pdfExtensions = ['pdf']
  const documentExtensions = ['doc', 'docx']
  const audioExtensions = ['mp3', 'wav', 'ogg']
  const zipExtensions = ['zip', 'rar', '7z']
  const excelExtensions = ['xls', 'xlsx']
  const pptExtensions = ['ppt', 'pptx']
  // 获取文件扩展名
  const fileExtension = url.split('.').pop().toLowerCase()
  // 判断文件类型
  if (imageExtensions.includes(fileExtension)) {
    return 'image'
  }
 else if (videoExtensions.includes(fileExtension)) {
    return 'video'
  }
 else if (pdfExtensions.includes(fileExtension)) {
    return 'pdf'
  }
 else if (documentExtensions.includes(fileExtension)) {
    return 'document'
  }
 else if (audioExtensions.includes(fileExtension)) {
    return 'audio'
  }
 else if (zipExtensions.includes(fileExtension)) {
    return 'zip'
  }
 else if (excelExtensions.includes(fileExtension)) {
    return 'excel'
  }
 else if (pptExtensions.includes(fileExtension)) {
    return 'ppt'
  }
 else {
    return 'other'
  }
}
// 返回对象中不一样的数据
export function getChangedData(oldData, newData) {
  return compareObjects(oldData, newData)
}
// 与基座进行数据交互
export function handleMicroData() {
  let res = null
  // 是否是微前端环境
  console.log(
    '-----------基座对象window------',
    window.__MICRO_APP_ENVIRONMENT__,
  )
  if (window.__MICRO_APP_ENVIRONMENT__) {
    // 主动获取基座下发的数据
    if (window.microApp) {
      const data = window.microApp.getData()
      res = data
    }
  }
  console.log('----------微前端window.microApp---------', res)
  return res
}
export function calculateAge(year, month, day) {
  if (!year || !month || !day)
return 0
  const today = new Date()
  const birthDate = new Date(year, month - 1, day) // 月份从0开始，所以需要减1
  let age = today.getFullYear() - birthDate.getFullYear()
  const monthDiff = today.getMonth() - birthDate.getMonth()
  const dayDiff = today.getDate() - birthDate.getDate()
  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--
  }
  return age || 0
}
// 通过年龄获取出生年月日
export function getBirthdayByAge(age) {
  const today = new Date()
  const year = today.getFullYear() - age
  const month = today.getMonth() + 1
  const day = today.getDate()
  return [year, month, day]
}
// 时间戳转年月日，dayjs
export function timestampToTime(timestamp) {
  if (!timestamp)
return []
  const year = dayjs(timestamp).format('YYYY')
  const month = dayjs(timestamp).format('MM')
  const day = dayjs(timestamp).format('DD')
  return [year, month, day]
}
// 年月日转为时间戳，dayjs
export function timeToTimestamp(year, month, day) {
  if (!year || !month || !day)
return 0
  const date = dayjs(`${year}-${month}-${day}`).valueOf()
  return date
}
// 获取当天的年月日
export function getToday() {
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth() + 1
  const day = today.getDate()
  return [year, month, day]
}

// dataURLtoBlob
export function dataURLtoBlob(dataUrl) {
  const arr = dataUrl.split(',')
  const mime = arr[0].match(/:(.*?);/)[1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new Blob([u8arr], { type: mime })
}

export default {
  getLocalStorage,
  setLocalStorage,
  removeLocalStorage,
  getSessionStorage,
  setSessionStorage,
  removeSessionStorage,

  downloadFile,
  useDateFormat,
}
