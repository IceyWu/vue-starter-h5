import { http } from '@/utils/http'

export function apiGet(params) {
  return http.request(
    'get',
    '/app/activity/findAll',
    { params },
    {
      isNeedFullRes: false, // 是否需要返回完整的响应对象
      // isShowLoading: true, // 是否显示loading
      isNeedToken: false, // 是否需要token
    },
  )
}
export function apiPost(data) {
  return http.request(
    'post',
    '/back/galleryType/findAll',
    { data },
    {
      isNeedFullRes: false, // 是否需要返回完整的响应对象
      // isShowLoading: true, // 是否显示loading
      isNeedToken: true, // 是否需要token
    },
  )
}
// 登录
export function getLogin(data) {
  return http.request(
    'post',
    '/app/user/login',
    { data },
    {
      isNeedToken: false, // 是否需要token
    },
  )
}
// 退出
export function outLogin(data) {
  return http.request(
    'post',
    '/teacher/teacher/logouting',
    { data },
    {
      isNeedToken: true, // 是否需要token
    },
  )
}
