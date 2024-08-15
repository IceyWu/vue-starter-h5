<script setup></script>
<template>
  <div>
    <van-dialog
      teleport="#sh-app"
      v-model:show="isShowDlg"
      width="90%"
      className="test"
      :showConfirmButton="true"
      confirmButtonText="关闭"
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
