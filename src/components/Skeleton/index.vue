<template>
  <div class="skeleton-list" :style="[skeletonListStyle]">
    <van-skeleton
      v-for="(item, index) in skeletonNum"
      :style="[skeletonItemStyle]"
      class="skeleton-item bg-gray-200 dark:bg-gray-800"
      :key="index"
      :loading="loading"
    >
      <template #template>
        <slot>
          <template v-if="type == 'classAlbum'">
            <SkeClassAlbum />
          </template>
          <template v-else-if="type == 'cloudAlbum'">
            <SkeCloudAlbum />
          </template>
          <template v-else-if="type == 'timeLine'">
            <SkeTimeLine />
          </template>
          <template v-else>
            <div class="flex flex-col w-full">
              <van-skeleton-paragraph v-if="title" row-width="60%" />
              <van-skeleton-paragraph
                v-for="(item, index) in rows"
                :key="index"
              />
            </div>
          </template>
        </slot>
      </template>
    </van-skeleton>
  </div>
</template>

<script setup>
import SkeClassAlbum from "./classAlbum.vue";
import SkeCloudAlbum from "./CloudAlbum.vue";
import SkeTimeLine from "./TimeLine.vue";
const emit = defineEmits(["update:isShow", "func"]);
const props = defineProps({
  isShow: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: true,
  },
  num: {
    type: [Number, String],
    default: 0,
  },
  rows: {
    type: [Number, String],
    default: 2,
  },
  title: {
    type: Boolean,
    default: true,
  },
  rowsHeight: {
    type: [Number, String],
    default: 18,
  },
  gridCol: {
    type: [Number, String],
    default: 1,
  },
  paddingY: {
    type: [Number, String],
    default: 0,
  },
  paddingBottom: {
    type: [Number, String],
    default: 0,
  },
  paddingX: {
    type: [Number, String],
    default: 0,
  },
  columnGap: {
    type: [Number, String],
    default: 10,
  },
  rowGap: {
    type: [Number, String],
    default: 10,
  },
  type: {
    type: String,
    default: "classAlbum",
  },
});
onMounted(() => {});
// function
const func = () => {
  emit("func");
};
// function-update
const funcUpdate = () => {
  emit("update:isShow", false);
};

//
const skeletonNum = computed(() => {
  return new Array(props.num);
});

const skeletonListStyle = computed(() => {
  if (!props.loading) return {};
  return {
    gridTemplateColumns: `repeat(${props.gridCol}, 1fr)`,
    gridColumnGap: `${props.columnGap}px`,
    gridRowGap: `${props.rowGap}px`,
    padding: `${props.paddingY}px ${props.paddingX}px`,
    paddingBottom: `${props.paddingBottom}px`,
  };
});

const skeletonItemStyle = computed(() => {
  if (!props.loading) return {};
  return {
    // height: `${props.rows * props.rowsHeight}px`,
    padding: `15px`,
  };
});
</script>

<style lang="less" scoped>
.skeleton-list {
  width: 100%;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  // grid-column-gap: 10rpx;
  // grid-row-gap: 10rpx;
  .skeleton-item {
   // background: #fff;
    border-radius: 10px;
    // padding: 10rpx;
  }
}
</style>
