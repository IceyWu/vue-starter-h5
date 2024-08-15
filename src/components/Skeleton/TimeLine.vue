<script setup>
  const props = defineProps({
    isShow: {
      type: Boolean,
      default: false,
    },
  })
  onMounted(() => {})
  </script>

  <template>
    <div class="w-full flex flex-col">
      <!-- <div></div> -->
      <!-- <van-skeleton-image class="!w-full !h-[100px]" /> -->
      <van-skeleton-paragraph class="!h-[15px]" row-width="60%" />
      <van-skeleton-paragraph />
      <!-- <van-skeleton-paragraph /> -->
    </div>
  </template>

  <style lang="less" scoped></style>
