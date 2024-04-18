<template>
    <div class="flex flex-col w-full">
      <!-- <div></div> -->
      <!-- <van-skeleton-image class="!w-full !h-[100px]" /> -->
      <van-skeleton-paragraph class="!h-[15px]" row-width="60%" />
      <van-skeleton-paragraph />
      <!-- <van-skeleton-paragraph /> -->
    </div>
  </template>
  
  <script setup>
  const emit = defineEmits(["update:isShow", "func"]);
  const props = defineProps({
    isShow: {
      type: Boolean,
      default: false,
    },
  });
  onMounted(() => {});
  </script>
  
  <style lang="less" scoped></style>
  