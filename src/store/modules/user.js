import { getLogin, refreshTokenApi, outLogin } from "@/api/admin";
import { showToast, showLoadingToast } from "vant";
import {
  setToken,
  removeToken,
  AccessTokenKey,
  RefreshTokenKey,
  ExpiresKey,
} from "@/utils/auth";
export const useUserStore = defineStore(
  "user",
  () => {
    // 用户信息
    const userInfo = ref({});

    const countdown = ref(0); //验证码倒计时
    // 设置用户信息
    const setUserInfo = (info) => {
      userInfo.value = info;
    };

    /** 后台登入 */
    const handLogin = async (dataT) => {
      return new Promise((resolve, reject) => {
        getLogin(dataT)
          .then((res) => {
            const { code, data } = res;

            if (code === 200) {
              const { teacher, token } = data;
              const TokenInfo = {
                id: teacher.id,
                username: teacher.username,
                name: teacher.name,
                roles: teacher.positions,
                accessToken: token[AccessTokenKey],
                expires: token[ExpiresKey],
              };
              setToken(TokenInfo);
              userInfo.value = teacher;

              resolve(res);
            } else {
              reject(res);
            }
          })
          .catch((error) => {
            reject(error);
          });
      });
    };
    /** 退出登录 */
    const outlogin = async () => {
      outLogin({ id: userInfo.value.id })
        .then(() => {
          const { origin, pathname } = window.location;
          console.log("🍪-----origin,pathname-----", origin, pathname);
          window.open(origin + pathname, "_self");
          showToast({
            message: "退出成功",
            icon: "checked",
          });
        })
        .catch((error) => {
          reject(error);
        });
    };

    return {
      userInfo,

      setUserInfo,
      handLogin,

      outlogin,
    };
  },

  {
    persist: {
      key: "user-key",
    },
  }
);
