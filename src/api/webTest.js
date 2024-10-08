import { http } from '@/utils/http'

// 获取Userinfo信息
export function getUserInfo(params) {
  return http.request(
    'get',
    '/web/userinfo',
    { params },
    {
      isNeedToken: true, // 是否需要token
      isNeedEncrypt: true, // 是否需要token
    },
  )
}
// body测试
export function testWebBody(data) {
  return http.request(
    'post',
    '/web/save',
    { data },
    {
      isNeedToken: true, // 是否需要token
      isNeedEncrypt: true, // 是否需要token
    },
  )
}
// body测试-err
export function getApiError(data) {
  return http.request(
    'post',
    '/web/save1',
    { data },
    {
      isNeedToken: true, // 是否需要token
      isNeedEncrypt: true, // 是否需要token
    },
  )
}
