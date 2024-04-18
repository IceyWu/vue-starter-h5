export const useErudaStore = defineStore(
  "eruda",
  () => {
    const maxNum = 6;
    const activeNum = ref(0);
    const activeEruda = computed(() => {
      return activeNum.value >= maxNum;
    });
    const addActiveNum = () => {
      activeNum.value++;
      if(activeNum.value >= maxNum) {
        localStorage.setItem("active-eruda", true)
        window.location.reload();
      }
    };
    const closeEruda = () => {
      activeNum.value = 0;
      localStorage.setItem("active-eruda", false)
      window.location.reload();
    };

    return {
      activeEruda,
      activeNum,
      addActiveNum,
      closeEruda,
    };
  },
  {
    persist: {
      key: "pinia-eruda",
    },
  }
);
