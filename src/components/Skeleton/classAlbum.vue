<script setup>
const props = defineProps({
  isShow: {
    type: Boolean,
    default: false,
  },
})
const emit = defineEmits(['update:isShow', 'func'])
onMounted(() => {})
</script>

<template>
  <div class="w-full flex flex-col">
    <van-skeleton-image class="!h-[100px] !w-full" />
    <van-skeleton-paragraph class="!h-[15px]" row-width="60%" />
    <van-skeleton-paragraph />
  </div>
</template>

<style lang="less" scoped></style>
