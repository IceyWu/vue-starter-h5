<script setup>
import md5 from "js-md5";
// import { getListApi, getListApiError } from "@/api/webTest";
import { useUserStore } from "@/store/modules/user";
import { showFailToast, showSuccessToast } from "vant";
import "vant/es/toast/style";
const userStore = useUserStore();
const showData = ref({});

const handleSuccessReq = async () => {
  const { list } = await getListApi();
  showSuccessToast("请求成功");
  showData.push(...list);
};
const handleErrorReq = () => {
  getListApiError().then(
    () => {},
    (err) => {
      console.log(err);
      showFailToast("请求有误");
    }
  );
};
// 登录
const handleLogin = async () => {
  const params = {
    username: "18882076569",
    password: md5("zs-famous-teacher" + "123456"),
  };

  try {
    const { code, msg, data } = ({} = await userStore.handLogin(params));
    if (code === 200) {
      showSuccessToast("登录成功");
      showData.value = data;
    } else {
      showFailToast(msg);
    }
  } catch (error) {
    showFailToast(error.msg);
  }
};
</script>

<template>
  <div class="tools-content pt-[20px] px-[12px]">
    <div class="pl-[12px] border-l-[3px] border-[color:#41b883] mb-[12px]">
      <h3 class="font-bold text-[18px] my-[4px]">Mock</h3>
    </div>
    <van-space>
      <van-button type="success" @click="handleSuccessReq">成功请求</van-button>
      <van-button type="success" @click="handleLogin">Login</van-button>
      <van-button type="danger" @click="handleErrorReq">失败请求</van-button>
    </van-space>
    <div
      class="text-[14px] py-[2px] px-[10px] rounded-[4px] bg-[var(--color-block-background)] mt-[14px]"
    >
      <p class="my-[14px] leading-[24px]">
        {{ showData }}
      </p>
    </div>
  </div>
</template>
