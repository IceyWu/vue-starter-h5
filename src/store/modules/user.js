import { showToast } from 'vant'
import { getLogin, outLogin } from '@/api/admin'
import {
  AccessTokenKey,
  ExpiresKey,
  setToken,
} from '@/utils/auth'

export const useUserStore = defineStore(
  'user',
  () => {
    // 基座用户信息
    const micUserInfo = ref({})
    // 用户信息
    const userInfo = ref({})

    // 设置用户信息
    const setUserInfo = (info) => {
      userInfo.value = info
    }
    // 设置基座用户信息
    const setMicUserInfo = (info) => {
      micUserInfo.value = info
    }

    /** 后台登入 */
    const handLogin = async (dataT) => {
      return new Promise((resolve, reject) => {
        getLogin(dataT)
          .then((res) => {
            const { code, data } = res
            if (code === 200) {
              const { user, token } = data
              const TokenInfo = {
                id: user.id,
                username: user.name,
                name: user.name,
                roles: user.positions,
                accessToken: token[AccessTokenKey],
                expires: token[ExpiresKey],
              }
              setToken(TokenInfo)
              userInfo.value = user

              resolve(res)
            }
 else {
              reject(res)
            }
          })
          .catch((error) => {
            reject(error)
          })
      })
    }
    /** 退出登录 */
    const outlogin = async () => {
      outLogin({ id: userInfo.value.id })
        .then(() => {
          const { origin, pathname } = window.location
          console.log('🍪-----origin,pathname-----', origin, pathname)
          window.open(origin + pathname, '_self')
          showToast({
            message: '退出成功',
            icon: 'checked',
          })
        })
        .catch((error) => {
          reject(error)
        })
    }

    return {
      userInfo,
      micUserInfo,
      setUserInfo,
      setMicUserInfo,
      handLogin,
      outlogin,
    }
  },

  {
    persist: {
      key: 'user-key',
    },
  },
)
