<script setup>
import { closeDialog, closeToast } from 'vant'
import { destroyEruda } from '@/utils/eruda'
// 页面卸载时
onUnmounted(() => {
  closeDialog()
  closeToast()
  destroyEruda()
})
</script>

<template>
  <router-view />
</template>
