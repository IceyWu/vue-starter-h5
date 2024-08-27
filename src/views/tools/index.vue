<script setup>
import md5 from 'js-md5'
import { showFailToast, showSuccessToast, showToast } from 'vant'
import { debounce, deepClone } from '@iceywu/utils'
import { getApiError, testWebBody } from '@/api/webTest'
import { useUserStore } from '@/store/modules/user'
import { requestTo } from '@/utils/http/tool'

const userStore = useUserStore()
const showData = ref({})

const successLoading = ref(false)
async function handleSuccessReq() {
  if (successLoading.value)
return
  successLoading.value = true
  const [err, result] = await requestTo(testWebBody({}))
  if (result) {
    const { list } = result
    showSuccessToast('请求成功')
    showData.value.push(...list)
  }
 else {
    showFailToast('请求失败')
  }
  successLoading.value = false
}
// 失败请求
const failLoading = ref(false)
async function handleErrorReq() {
  if (failLoading.value)
return
  failLoading.value = true
  const [err, result] = await requestTo(getApiError({}))
  if (err) {
    showFailToast('请求有误')
  }
  failLoading.value = false
}
// 登录
const loginLoading = ref(false)
async function handleLogin() {
  if (loginLoading.value)
return
  loginLoading.value = true
  const params = {
    username: '18882076569',
    password: md5('zs-famous-teacher' + '123456'),
  }

  const [err, result] = await requestTo(userStore.handLogin(params))
  if (result) {
    const { code, msg, data } = result
    if (code === 200) {
      showSuccessToast('登录成功')
      showData.value = data
    }
 else {
      showFailToast(msg)
    }
  }
 else {
    showFailToast(err.msg)
  }
  loginLoading.value = false
}

// 点赞
const likeNum = ref(0)
const isLikeBase = ref(false)
const isLike = ref(deepClone(isLikeBase.value))
const handleLike = debounce(() => {
  // 执行请求
  if (isLike.value === isLikeBase.value) {
    showToast('和原数据一样，不执行请求')
  }
 else if (isLike.value) {
    showToast('点赞')
  }
 else {
    showToast('取消点赞')
  }
}, 1000)

function handleLikeClick() {
  if (isLike.value) {
    likeNum.value--
  }
 else {
    likeNum.value++
  }
  isLike.value = !isLike.value
  handleLike()
}
</script>

<template>
  <div class="tools-content px-[12px] pt-[20px] space-y-5">
    <div class="border-l-[3px] border-[color:#41b883] pl-[12px]">
      <h3 class="my-[4px] text-[18px] font-bold">Mock</h3>
    </div>
    <van-space>
      <van-button
        :loading="successLoading"
        type="success"
        @click="handleSuccessReq"
        >
成功请求
</van-button>
      <van-button :loading="loginLoading" type="success" @click="handleLogin">
Login
</van-button>
      <van-button :loading="failLoading" type="danger" @click="handleErrorReq">
失败请求
</van-button>
    </van-space>
    <div
      class="rounded-[4px] bg-[var(--color-block-background)] px-[10px] py-[2px] text-[14px]"
    >
      <p class="my-[14px] leading-[24px]">
        {{ showData }}
      </p>
    </div>
    <!-- 连点 -->
    <van-space>
      <van-button type="success" @click="handleLikeClick">
点赞（防抖）
</van-button>
      <span>点赞数：{{ likeNum }}</span>
    </van-space>
  </div>
</template>
