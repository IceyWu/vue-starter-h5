import { http } from "@/utils/http";
//名师
export const asyncTaskApi = (params) => {
  return http.request(
    "get",
    "/common/asyncTask/findById",
    { params },
    {
      isNeedToken: true, // 是否需要token
    }
  );
};
