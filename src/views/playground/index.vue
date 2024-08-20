<script setup>
import { formItemListData } from "./base/formData.js";
import { isEmpty } from "@iceywu/utils";

const formValues = ref({
  phone: "", //电话

  idCard: "", // 身份证号码
  diploma: "", // 文化程度

  name: "", //  姓名
  sex: 0, // 性别
  age: [], // 年龄
  birth: [], // 年龄
});

const FORM_ID_ENUM = [1, 2, 3, 4];

const baseFormList = ref([]);
const initFormItemList = () => {
  FORM_ID_ENUM.forEach((id) => {
    const tempItem = formItemListData.find((i) => i.tag === id) || {};
    !isEmpty(tempItem) && baseFormList.value.push(tempItem);
  });
};

onMounted(() => {
  initFormItemList();
});
const onFailed = (errorInfo) => {};
const handleSubmit = () => {};
const formSubmitRef = ref();
const handleApply = () => {
  formSubmitRef.value?.submit();
};
</script>

<template>
  <div class="apply-box">
    <!-- 内容 -->
    <div class="content-box">
      <van-form ref="formSubmitRef" @failed="onFailed" @submit="handleSubmit">
        <van-cell-group inset>
          <FormItem
            v-for="item in baseFormList"
            v-model="formValues[item.key]"
            :key="item.tag"
            :data="item"
          />
        </van-cell-group>
      </van-form>
    </div>
    <!-- 底部按钮 -->
    <footer class="absolute bottom-0 left-0 w-full fcc py-2 bg-bg_color">
      <van-button class="w-[80%]" type="primary" @click="handleApply" round
        >确定</van-button
      >
    </footer>
  </div>
</template>
<style lang="less" scoped>
.apply-box {
  height: calc(100% - 200px);
  position: relative;
  overflow: auto;
  background-image: linear-gradient(
    0deg,
    var(--van-background-2) 0%,
    var(--van-background) 100%
  );
  padding: 20px 0 20px 0;
  box-sizing: border-box;
}
</style>
