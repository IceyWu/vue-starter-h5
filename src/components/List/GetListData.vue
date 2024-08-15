<script setup>
import Skeleton from '@/components/Skeleton'
import EmptyData from '@/components/Base/EmptyData.vue'

const props = defineProps({
  // 是否禁用滚动加载
  disabled: {
    type: Boolean,
    default: false,
  },
  isNeedHeader: {
    type: Boolean,
    default: true,
  },
  // 是否需要下拉刷新
  isDisabledRefresh: {
    type: Boolean,
    default: false,
  },
  immediateCheck: {
    type: Boolean,
    default: true,
  },
  // 加载对象
  listObj: {
    type: Object,
    default: () => {
      return {
        loading: false,
        finished: false,
        refreshing: false,
        list: [],
      }
    },
  },
  skeletonObj: {
    type: Object,
    default: () => {
      return {
        num: 1,
        gridCol: 2,
        rows: 1,
      }
    },
  },
  isNeedSkeleton: {
    type: Boolean,
    default: false,
  },
  // 空状态-文案
  emptyText: {
    type: String,
    default: '暂无数据',
  },
  // 空状态-文案
  subDescription: {
    type: String,
    default: '',
  },
  // 空状态-按钮文案
  emptyBtnText: {
    type: String,
    default: '开始上传',
  },
  // 空状态-图片类型
  emptyImgType: {
    type: String,
    default: '1',
  },
  isNeedAddBtn: {
    type: Boolean,
    default: true,
  },
  paddingTop: {
    type: String,
    default: '34',
  },
  paddingBottom: {
    type: String,
    default: null,
  },
  skeletonPTop: {
    type: [String, Number],
    default: '0',
  },
  isNeedEmpty: {
    type: Boolean,
    default: true,
  },
  isNeedFinishedText: {
    type: Boolean,
    default: false,
  },
  imgClass: {
    type: String,
    default: null,
  },
  isNeedPadding: {
    type: Boolean,
    default: true,
  },
  direction: {
    type: String,
    default: 'down',
  },
})
const emit = defineEmits([
  'update:isShow',
  'update:listObj',
  'onRefresh',
  'onLoad',
  'emptyClick',
])
onMounted(() => {})
// 是否展示空数据
const isShowEmptyData = computed(() => {
  return (
    props.listObj.list.length === 0
    && !props.listObj.loading
    && props.isNeedEmpty
  )
})

const finishedText = computed(() => {
  return props.listObj.list.length > 0 && props.isNeedFinishedText
    ? '没有更多了'
    : ''
})

function load() {
  emit('onLoad')
}

function refresh() {
  // 初始化状态
  const tempData = { ...props.listObj }
  tempData.finished = false
  emit('update:listObj', tempData)
  emit('onRefresh')
}

function emptyBtnClick() {
  emit('emptyClick')
}
</script>

<template>
  <van-pull-refresh
    v-model="listObj.refreshing"
    :disabled="isDisabledRefresh"
    class="!overflow-visible"
    @refresh="refresh"
  >
    <template v-if="isNeedSkeleton">
      <van-list
        :finished="listObj.finished"
        :loading="listObj.loading"
        :finished-text="finishedText"
        :immediate-check="immediateCheck"
        :direction="direction"
        :disabled="disabled"
        @load="load"
      >
        <slot />
        <template #loading>
          <!-- 骨架屏 -->
          <div
            v-show="listObj.loading"
            class="my-3 box-border"
            :style="{ paddingTop: `${SkeletonPTop}px` }"
          >
            <Skeleton :loading="listObj.loading" v-bind="skeletonObj" />
          </div>
        </template>
      </van-list>
    </template>

    <template v-else>
      <van-list
        v-model:loading="listObj.loading"
        :finished="listObj.finished"
        :finished-text="finishedText"
        :immediate-check="immediateCheck"
        :disabled="disabled"
        @load="load"
      >
        <slot />
      </van-list>
    </template>

    <div
      v-show="isShowEmptyData"
      :style="{
        paddingTop: `${paddingTop}px`,
        paddingBottom: `${paddingBottom}px`,
      }"
      class="empty-box box-border h-full w-full"
      :class="{
        '!p-0': !isNeedPadding,
      }"
    >
      <slot name="empty">
        <EmptyData
          :description="emptyText"
          :btn-text="emptyBtnText"
          :img-type="emptyImgType"
          :is-need-add-btn="isNeedAddBtn"
          :sub-description="subDescription"
          :img-class="imgClass"
          @add-click="emptyBtnClick"
        />
      </slot>
    </div>
  </van-pull-refresh>
</template>

<style lang="less" scoped>
.text {
  margin-bottom: 32px;
}
.empty-box {
  padding-top: 364px;
  padding-bottom: 364px;
}
</style>
