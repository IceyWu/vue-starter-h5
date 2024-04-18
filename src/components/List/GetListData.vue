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
        @load="load"
        :disabled="disabled"
      >
        <slot></slot>
        <template #loading>
          <!-- 骨架屏 -->
          <div
            v-show="listObj.loading"
            class="box-border my-3"
            :style="{ paddingTop: SkeletonPTop + 'px' }"
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
        @load="load"
        :disabled="disabled"
      >
        <slot></slot>
      </van-list>
    </template>

    <div
      v-show="isShowEmptyData"
      :style="{
        paddingTop: paddingTop + 'px',
        paddingBottom: paddingBottom + 'px',
      }"
      class="empty-box w-full h-full box-border"
      :class="{
        '!p-0': !isNeedPadding,
      }"
    >
      <slot name="empty">
        <EmptyData
          :description="emptyText"
          :btnText="emptyBtnText"
          :imgType="emptyImgType"
          :isNeedAddBtn="isNeedAddBtn"
          :subDescription="subDescription"
          :imgClass="imgClass"
          @addClick="emptyBtnClick"
        />
      </slot>
    </div>
  </van-pull-refresh>
</template>

<script setup>
import { PullRefresh } from "vant";
import Skeleton from "@/components/Skeleton";
import EmptyData from "@/components/Base/EmptyData.vue";
const emit = defineEmits([
  "update:isShow",
  "update:listObj",
  "onRefresh",
  "onLoad",
  "emptyClick",
]);
const props = defineProps({
  //是否禁用滚动加载
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
      };
    },
  },
  skeletonObj: {
    type: Object,
    default: () => {
      return {
        num: 1,
        gridCol: 2,
        rows: 1,
      };
    },
  },
  isNeedSkeleton: {
    type: Boolean,
    default: false,
  },
  // 空状态-文案
  emptyText: {
    type: String,
    default: "暂无数据",
  },
  // 空状态-文案
  subDescription: {
    type: String,
    default: "",
  },
  // 空状态-按钮文案
  emptyBtnText: {
    type: String,
    default: "开始上传",
  },
  // 空状态-图片类型
  emptyImgType: {
    type: String,
    default: "1",
  },
  isNeedAddBtn: {
    type: Boolean,
    default: true,
  },
  paddingTop: {
    type: String,
    default: "34",
  },
  paddingBottom: {
    type: String,
    default: null,
  },
  SkeletonPTop: {
    type: [String, Number],
    default: "0",
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
    default: "down",
  },
});

onMounted(() => {});
// 是否展示空数据
const isShowEmptyData = computed(() => {
  return (
    props.listObj.list.length === 0 &&
    !props.listObj.loading &&
    props.isNeedEmpty
  );
});

const finishedText = computed(() => {
  return props.listObj.list.length > 0 && props.isNeedFinishedText
    ? "没有更多了"
    : "";
});

const load = () => {
  emit("onLoad");
};

const refresh = () => {
  // 初始化状态
  const tempData = { ...props.listObj };
  tempData.finished = false;
  emit("update:listObj", tempData);
  emit("onRefresh");
};

const emptyBtnClick = () => {
  emit("emptyClick");
};
</script>

<style lang="less" scoped>
.text {
  margin-bottom: 32px;
}
.empty-box {
  padding-top: 364px;
  padding-bottom: 364px;
}
</style>
