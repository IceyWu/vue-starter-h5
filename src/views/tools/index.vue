<script setup>
import md5 from 'js-md5'
// import { getListApi, getListApiError } from "@/api/webTest";
import { showFailToast, showSuccessToast } from 'vant'
import { useUserStore } from '@/store/modules/user'
import 'vant/es/toast/style'

const userStore = useUserStore()
const showData = ref({})

async function handleSuccessReq() {
  const { list } = await getListApi()
  showSuccessToast('请求成功')
  showData.value.push(...list)
}
function handleErrorReq() {
  getListApiError().then(
    () => {},
    (err) => {
      console.log(err)
      showFailToast('请求有误')
    },
  )
}
// 登录
async function handleLogin() {
  const params = {
    username: '18882076569',
    password: md5('zs-famous-teacher' + '123456'),
  }

  try {
    const { code, msg, data } = ({} = await userStore.handLogin(params))
    if (code === 200) {
      showSuccessToast('登录成功')
      showData.value = data
    }
 else {
      showFailToast(msg)
    }
  }
 catch (error) {
    showFailToast(error.msg)
  }
}
</script>

<template>
  <div class="tools-content px-[12px] pt-[20px]">
    <div class="mb-[12px] border-l-[3px] border-[color:#41b883] pl-[12px]">
      <h3 class="my-[4px] text-[18px] font-bold">Mock</h3>
    </div>
    <van-space>
      <van-button type="success" @click="handleSuccessReq">成功请求</van-button>
      <van-button type="success" @click="handleLogin">Login</van-button>
      <van-button type="danger" @click="handleErrorReq">失败请求</van-button>
    </van-space>
    <div
      class="mt-[14px] rounded-[4px] bg-[var(--color-block-background)] px-[10px] py-[2px] text-[14px]"
    >
      <p class="my-[14px] leading-[24px]">
        {{ showData }}
      </p>
    </div>
  </div>
</template>
