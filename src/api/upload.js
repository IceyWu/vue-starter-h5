import { http } from '@/utils/http'
// 文件检查
export function fileCheck(data) {
  return http.request(
    'post',
    '/common/file/check',
    { data },
    { isNeedToken: true, isNeedEncrypt: false },
  )
}
// 上传文件
export function fileUpload(data) {
  return http.request(
    'post',
    '/common/file/upload',
    { data },
    { isNeedToken: true, isNeedEncrypt: false },
  )
}

/** 上传预览文件 */
export function uploadPreviewFile(data) {
  return http.request('post', '/common/file/filePreview', { data })
}
/** 获取预览文件地址 */
export function getFileFullPath(params) {
  return http.request('get', '/common/file/fullPath', { params })
}

/** 上传预览文件V2 */
export function uploadPreviewFileV2(data) {
  return http.request('post', '/common/file/v2/filePreview', { data })
}

// new------->
/**
 * 根据文件的md5获取未上传完的任务
 * @param identifier 文件md5
 * @returns {Promise<AxiosResponse<any>>}
 */
export function taskInfo(identifier) {
  return http.request(
    'get',
    `/minio/tasks/${identifier}`,
    {},
    { isNeedToken: false },
  )
}
/**
 * 获取预签名分片上传地址
 * @param identifier 文件md5
 * @param partNumber 分片编号
 * @returns {Promise<AxiosResponse<any>>}
 */
export function preSignUrl({ identifier, partNumber }) {
  return http.request(
    'get',
    `/minio/tasks/${identifier}/${partNumber}`,
    {},
    { isNeedToken: false },
  )
}

/**
 * 初始化一个分片上传任务
 * @param identifier 文件md5
 * @param fileName 文件名称
 * @param totalSize 文件大小
 * @param chunkSize 分块大小
 * @returns {Promise<AxiosResponse<any>>}
 */
export function initTask(data) {
  return http.request('post', '/minio/tasks', { data }, { isNeedToken: false })
}
/**
 * 合并分片
 * @param identifier
 * @returns {Promise<AxiosResponse<any>>}
 */
export function merge(identifier) {
  return http.request(
    'post',
    `/minio/tasks/merge/${identifier}`,
    {},
    { isNeedToken: false },
  )
}
