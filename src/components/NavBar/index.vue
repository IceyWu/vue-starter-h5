<script setup>
import { useToggleDarkMode } from '@/hooks/useToggleDarkMode'

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  showBack: {
    type: Boolean,
    default: false,
  },
})

function onClickRight() {
  useToggleDarkMode()
}
const router = useRouter()
function onClickLeft() {
  if (props.showBack) {
    router.back()
  }
}
</script>

<template>
  <van-nav-bar

     placeholder fixed
    :title="title"
    @click-left="onClickLeft"
    @click-right="onClickRight"
  >
    <template v-if="showBack" #left>
      <van-icon name="arrow-left" size="20" />
    </template>
    <template #right>
      <div i-carbon-sun dark:i-carbon-moon icon-btn title="Change Theme" />
    </template>
  </van-nav-bar>
</template>

<style scoped></style>
