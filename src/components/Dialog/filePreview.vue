<script setup></script>

<template>
  <div>
    <van-dialog
      v-model:show="isShowDlg"
      teleport="#sh-app"
      width="90%"
      class-name="test"
      :show-confirm-button="true"
      confirm-button-text="关闭"
      @confirm="handleConfirm"
    >
      <h1>1212</h1>
    </van-dialog>
  </div>
</template>

<style lang="less" scoped>
.tip-box {
  height: 60vh;
  box-sizing: border-box;
  padding: 50px 60px;
}
</style>
