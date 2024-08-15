<script setup>
import { showConfirmDialog } from 'vant'

const route = useRoute()
onActivated(() => {
  console.log('🌳onActivated------------------------------>')
})
onDeactivated(() => {
  console.log('别忘了对编辑好的数据进行保存')
})
onBeforeRouteLeave(async (to, from) => {
  const res = await showConfirmDialog({
    title: '提示',
    message: '确定要退出吗？',
    closeOnPopstate: false,
  }).catch(() => {
    return false
  })
  if (res === false) {
    return false
  }
})
</script>

<template>
  <div>我是详情页-{{ route.params.id }}</div>
</template>

<style lang="less"></style>
