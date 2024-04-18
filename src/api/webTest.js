import { http } from "@/utils/http";


// 获取Userinfo信息
export const getUserInfo = (params) => {
  return http.request(
    "get",
    "/web/userinfo",
    { params },
    {
      isNeedToken: true, // 是否需要token
      isNeedEncrypt: true, // 是否需要token
    }
  );
};
// body测试
export const testWebBody = (data) => {
  return http.request(
    "post",
    "/web/save",
    { data },
    {
      isNeedToken: true, // 是否需要token
      isNeedEncrypt: true, // 是否需要token
    }
  );
};
