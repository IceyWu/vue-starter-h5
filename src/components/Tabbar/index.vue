<template>
  <van-tabbar v-model="active" :placeholder="true" :route="true" fixed>
    <van-tabbar-item
      v-for="(item, index) in tabbarData"
      :key="index"
      :icon="item.icon"
      :to="item.to"
    >
      {{ item.title }}
      <template #icon>
        <div :class="item.icon"></div>
      </template>
    </van-tabbar-item>
  </van-tabbar>
</template>

<script setup>
import { ref, reactive } from "vue";

const active = ref(0);
const tabbarData = reactive([
  {
    icon: "wap-home-o",
    title: "列表",
    icon: "i-carbon-text-align-justify",
    to: {
      name: "Demo",
    },
  },
  {
    icon: "gem-o",
    title: "Api",
    icon: "i-carbon-api",
    to: {
      name: "Tools",
    },
  },
  {
    icon: "user-o",
    title: "表单",
    icon: "i-carbon-data-format",
    to: {
      name: "Playground",
    },
  },
  {
    icon: "user-o",
    title: "个人中心",
    icon: "i-carbon-user-identification",
    to: {
      name: "About",
    },
  },
]);
</script>
