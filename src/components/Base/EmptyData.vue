<script setup>
import ImgEmpty1 from '@/assets/empty/success.png'

const props = defineProps({
  // 文案
  description: {
    type: String,
    default: '暂无数据',
  },
  subDescription: {
    type: String,
    default: '',
  },
  // 按钮文案
  btnText: {
    type: String,
    default: '开始上传',
  },
  // 图片类型
  imgType: {
    type: [String, Number],
    default: '1',
  },
  imgSize: {
    type: [String, Number],
    default: '150',
  },
  isNeedAddBtn: {
    type: Boolean,
    default: true,
  },
  imgClass: {
    type: String,
    default: null,
  },
})
const emit = defineEmits(['addClick'])
// 图片
const imgSrc = computed(() => {
  if (props.imgType === '1') {
    return ImgEmpty1
  }
 else if (props.imgType === '2') {
    return ''
  }
 else if (props.imgType === '3') {
    return ''
  }
 else if (props.imgType === '4') {
    return ''
  }
})

function addFunc() {
  // console.log("addFunc");
  emit('addClick')
}
</script>

<template>
  <div class="empty-box-l">
    <div :class="imgClass ? imgClass : 'empty-img'">
      <van-image width="100%" height="100%" :src="imgSrc" />
    </div>
    <div class="desc">
      <slot>
        <div class="flex items-center justify-center">{{ description }}</div>
        <div v-if="subDescription" class="flex items-center justify-center">
          {{ subDescription }}
        </div>
      </slot>
    </div>
    <div v-if="isNeedAddBtn" class="empty-btn" @click="addFunc">
      {{ btnText }}
    </div>
  </div>
  <!-- <van-empty image="search" :image-size="imgSize" :description="description" /> -->
</template>

<style lang="less" scoped>
// @import "@/styles/base/base.less";
.empty-box-l {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  // gap: 36px;
  // margin-top: 364px;
  // .gapReplace(div, bottom, 36px);
  .empty-img {
    width: 535px;
    // height: 405px;
  }
  .small-empty {
    width: 169px;
    height: 169px;
  }
  .desc {
    display: flex;
    flex-direction: column;
    font-family: 'Source Han Sans CN';
    font-style: normal;
    font-weight: 400;
    font-size: 40px;
    line-height: 60px;
    color: #b2b4b9;
  }
  .empty-btn {
    margin-top: 36px;
    width: 536px;
    height: 120px;
    background: #428ffc;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 73px;

    font-family: 'Source Han Sans CN';
    font-style: normal;
    font-weight: 400;
    font-size: 52px;
    // line-height: 78px;

    color: #ffffff;
  }
}
</style>
