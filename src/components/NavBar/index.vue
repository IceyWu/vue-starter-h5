<script setup>
import { useToggleDarkMode } from "@/hooks/useToggleDarkMode";
const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  showBack: {
    type: Boolean,
    default: false,
  },
});

const onClickRight = () => {
  useToggleDarkMode();
};
const router = useRouter();
const onClickLeft = () => {
  if (props.showBack) {
    router.back();
  }
};
</script>

<template>
  <van-nav-bar
    fixed
    placeholder
    :title="title"
    @click-left="onClickLeft"
    @click-right="onClickRight"
  >
    <template v-if="showBack" #left>
      <van-icon name="arrow-left" size="20" />
    </template>
    <template #right>
      <div icon-btn dark:i-carbon-moon i-carbon-sun title="Change Theme" />
    </template>
  </van-nav-bar>
</template>

<style scoped></style>
