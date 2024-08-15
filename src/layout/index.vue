<script setup>
import { computed } from "vue";
import tabbar from "@/components/Tabbar/index.vue";
import NavBar from "@/components/NavBar/index.vue";
import { useCachedViewStoreHook } from "@/store/modules/cachedView";
import { useDarkMode } from "@/hooks/useToggleDarkMode";
import * as themeVars from "@/config/theme/config-provider.json";

const cachedViews = computed(() => {
  return useCachedViewStoreHook().cachedViewList;
});
</script>

<template>
  <div id="sh-app" class="app-wrapper">
    <van-config-provider
      class="h-full"
      :theme-vars="themeVars"
      theme-vars-scope="global"
      :theme="useDarkMode() ? 'dark' : 'light'"
    >
      <NavBar :show-back="$route.meta.showBack" :title="$route.meta.title" />
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component
            :is="Component"
            v-if="$route.meta.keepAlive"
            :key="$route.name"
          />
        </keep-alive>
        <component
          :is="Component"
          v-if="!$route.meta.keepAlive"
          :key="$route.name"
        />
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
