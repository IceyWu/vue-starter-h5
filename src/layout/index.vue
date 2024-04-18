<script setup>
import tabbar from "@/components/Tabbar/index.vue";
import NavBar from "@/components/NavBar/index.vue";
import { useCachedViewStoreHook } from "@/store/modules/cachedView";
import { useDarkMode } from "@/hooks/useToggleDarkMode";
import { computed } from "vue";
import * as themeVars from "@/config/theme/config-provider.json";

const cachedViews = computed(() => {
  return useCachedViewStoreHook().cachedViewList;
});
</script>

<template>
  <div class="app-wrapper">
    <van-config-provider
      :theme-vars="themeVars"
      theme-vars-scope="global"
      :theme="useDarkMode() ? 'dark' : 'light'"
    >
      <nav-bar :showBack="$route.meta.showBack" :title="$route.meta.title" />
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component
            v-if="$route.meta.keepAlive"
            :is="Component"
            :key="$route.name"
          ></component>
        </keep-alive>
        <component
          v-if="!$route.meta.keepAlive"
          :is="Component"
          :key="$route.name"
        ></component>
      </router-view>
      <tabbar v-if="$route.meta.showTab" />
    </van-config-provider>
  </div>
</template>

<style lang="less" scoped>
@import "@/styles/mixin.less";

.app-wrapper {
  .clearfix();
  position: relative;
  height: 100%;
  width: 100%;
}
</style>
