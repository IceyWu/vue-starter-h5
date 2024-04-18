<script setup>
import { createReusableTemplate } from "@vueuse/core";

const [DefineTemplate, ReuseTemplate] = createReusableTemplate();
// 列表对象
const listObj = ref({
  list: [],
  loading: false,
  finished: false,
  refreshing: false,
});
const paramsObj = reactive({
  page: -1,
  size: 30,
  sort: "createdAt,desc",
});
// 数据初始化
const initData = () => {
  listObj.value.page = -1;
  listObj.value.finished = false;
  listObj.value.refreshing = false;
  listObj.value.list = [];
  paramsObj.page = -1;
};

const onLoad = (isReload = false) => {
  console.log("-----onLoad-----");
  if (listObj.value.loading || listObj.value.finished) return;
  const totalNum = listObj.value.list.length || 0;
  if (isReload && totalNum > 0) {
    getData(listObj.value.list.length);
  } else {
    paramsObj.page++;
    getData();
  }
};
const onRefresh = (isReload = false) => {
  console.log("-----onRefresh-----");
  if (!isReload) {
    // 参数重置
    initData();
    // 初始化状态
    listObj.value.refreshing = true;
  } else {
    listObj.value.loading = false;
    listObj.value.finished = false;
  }
  onLoad(isReload);
};
const getData = async (reloadSize) => {
  console.log("🐠-----reloadSize-----", reloadSize);
  // 加载状态
  listObj.value.loading = true;

  const params = {
    page: paramsObj.page,
    size: paramsObj.size,
    sort: paramsObj.sort,
    maxPage: 4,
  };
  if (reloadSize) {
    params["page"] = 0;
    params["size"] = reloadSize;
  }
  const [err, resData] = await to(getTestApi(params));
  if (err) {
    console.log("🍭-----err-----", err);
  }
  const { code, msg, data } = resData || {};
  if (listObj.value.refreshing) {
    listObj.value.list = [];
    listObj.value.refreshing = false;
  }
  if (code === 200 && data) {
    console.log("查询成功", data);
    const { content = [], last = false } = data || {};
    if (reloadSize) {
      listObj.value.list = content;
    } else {
      listObj.value.list = listObj.value.list.concat(content);
    }
    listObj.value.finished = last;
    if (listObj.value.finished) {
      console.log("-----加载完毕-----");
    }
    // 填充数据
  } else {
    console.log("查询失败", msg);
    listObj.value.finished = true;
  }
  // 加载状态停止
  listObj.value.loading = false;
};
// 模拟api
const getTestApi = async (params) => {
  await sleep(500);
  const { page, size, maxPage = 3 } = params;
  const baseSize = page * size;
  const data = list(0, size - 1, (index) => {
    const element = baseSize + index;
    return {
      id: element,
      cover: `https://picsum.photos/id/${element}/200/300`,
      title: `title ${element}`,
      desc: `desc ${element}`,
    };
  });
  return {
    code: 200,
    msg: "查询成功",
    data: {
      content: data,
      last: page + 1 === maxPage,
    },
  };
};
const eleRefs = ref([]);
const setRef = (el) => {
  if (el) {
    eleRefs.value.push(el);
  }
};
const scrollToAnchor = () => {
  const index = 5;
  // console.log("🍪-----scrollToAnchor-----", eleRefs.value);
  // eleRefs.value[index].scrollIntoView({ block: "start", behavior: "smooth" });
  const x = 0;
  const y = eleRefs.value[index].offsetTop;
  window.scrollTo({ top: y, left: x, behavior: "smooth" });
};
const router = useRouter();
const offset = ref({ y: 400 });
const handleItemClick = (item) => {
  // console.log("🍪-----handleItemClick-----", item);
  router.push(`/demo/detail/${item.id}`);
  // router.push(`/detail/${item.id}`);
};
onActivated(() => {
  console.log("🎉-----onActivated-----");
  onRefresh(true);
});
onMounted(() => {
  console.log("🎉-----onMounted-----");
});
</script>

<template>
  <DefineTemplate v-slot="{ data }">
    <div>
      <van-card :desc="data.desc" :title="data.title" :thumb="data.cover" />
    </div>
  </DefineTemplate>
  <div class="tools-content px-[12px] min-h-[100vh]">
    <van-floating-bubble
      v-model:offset="offset"
      axis="xy"
      @click="scrollToAnchor"
    >
      定位
    </van-floating-bubble>

    <GetListData
      @onRefresh="onRefresh"
      @onLoad="onLoad"
      v-model:listObj="listObj"
      :isNeedAddBtn="false"
      :immediateCheck="true"
      isNeedSkeleton
      isNeedFinishedText
      :skeletonObj="{
        num: 2,
        gridCol: 1,
        rows: 1,
        type: 'timeLine',
      }"
    >
      <div class="flex flex-col gap-2">
        <div
          :ref="setRef"
          class="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg"
          v-for="(item, index) in listObj.list"
          :key="index"
        >
          <ReuseTemplate @click="handleItemClick(item)" :data="item" />
        </div>
      </div>
    </GetListData>
  </div>
</template>
