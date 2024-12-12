<script setup>
import EmptyData from '@/components/Base/EmptyData.vue'
import Skeleton from '@/components/Skeleton'
import { PullRefresh } from 'vant'
import { computed } from 'vue'

const props = defineProps({
  isDisabledRefresh: {
    type: Boolean,
    default: false,
  },
  disableList: {
    type: Boolean,
    default: false,
  },
  isNeedEmpty: {
    type: Boolean,
    default: true,
  },
  isNeedSkeleton: {
    type: Boolean,
    default: true,
  },
  vanListProps: {
    type: Object,
    default: () => ({
      direction: 'down',
      immediateCheck: true,
    }),
  },
  skeletonObj: {
    type: Object,
    default: () => ({
      num: 2,
      rows: 1,
      gridCol: 1,
      type: 'timeLine',
    }),
  },
})

const emit = defineEmits(['onLoad', 'onRefresh'])

const listObj = defineModel({
  default: {
    loading: false,
    finished: false,
    refreshing: false,
    list: [],
  },
})

function load() {
  emit('onLoad')
}

function refresh() {
  listObj.value.finished = false
  emit('onRefresh')
}

// 是否展示空数据
const isShowEmptyData = computed(() => {
  return (
    listObj.value?.list?.length === 0 && !listObj.value.loading && props.isNeedEmpty
  )
})
</script>

<template>
  <component
    :is="isDisabledRefresh ? 'div' : PullRefresh"
    v-model="listObj.refreshing"
    :disabled="isDisabledRefresh"
    class="refresh-box !overflow-visible"
    @refresh="refresh"
  >
    <van-list
      :finished="listObj.finished"
      :loading="listObj.loading"
      :disabled="disableList"
      v-bind="vanListProps"
      @load="load"
    >
      <slot />
      <template #loading>
        <!-- 骨架屏 -->
        <div v-show="listObj.loading && isNeedSkeleton" class="my-3 box-border">
          <Skeleton :loading="listObj.loading" v-bind="skeletonObj" />
        </div>
      </template>
    </van-list>

    <div v-show="isShowEmptyData" class="empty-box box-border h-full w-full">
      <slot name="empty">
        <EmptyData />
      </slot>
    </div>
  </component>
</template>

<style lang="less" scoped>
.text {
  margin-bottom: 32px;
}

.empty-box {
  // padding-top: 364px;
  // padding-bottom: 364px;
}
.refresh-box {
  width: 100%;
  overflow: visible !important;
  // background: red;
}
</style>
