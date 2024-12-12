<script setup>
import { getObjVal, list } from '@iceywu/utils'
import { createReusableTemplate } from '@vueuse/core'
import { useRequest } from 'vue-hooks-pure'

const [DefineTemplate, ReuseTemplate] = createReusableTemplate()
async function requestListApi(params) {
  return getTestApi(params)
}
const {
  onRefresh,
  onLoad,
  result: listObj,
  search,
} = useRequest(requestListApi, {
  target: 'list',
  loadingDelay: 300,
  getVal: (res) => {
    const list = getObjVal(res, 'result.content', [])
    return list
  },
  listOptions: {
    defaultPageKey: 'page',
    defaultSizeKey: 'size',
    defaultDataKey: 'list',
    defaultPage: -1,
    getTotal: (data) => {
      const total = getObjVal(data, 'result.total', 0)
      return total
    },
  },
})

// 模拟api
async function getTestApi(params) {
  await sleep(500)
  const { page = 0, size = 10, maxPage = 3 } = params
  const baseSize = page * size
  const data = list(0, size - 1, (index) => {
    const element = baseSize + index
    return {
      id: element,
      cover: `https://picsum.photos/id/${element}/200/300`,
      title: `title ${element}`,
      desc: `desc ${element}`,
    }
  })
  return {
    code: 200,
    msg: '查询成功',
    result: {
      content: data,
      last: page + 1 === maxPage,
      total: 100,
    },
  }
}
const eleRefs = ref([])
function setRef(el) {
  if (el) {
    eleRefs.value.push(el)
  }
}
function scrollToAnchor() {
  const index = 5
  const x = 0
  const y = eleRefs.value[index].offsetTop
  window.scrollTo({ top: y, left: x, behavior: 'smooth' })
}
const router = useRouter()
const offset = ref({ y: 400 })
function handleItemClick(item) {
  router.push(`/demo/detail/${item.id}`)
}
onActivated(() => {
  if (listObj.value?.list?.length > 0) {
    onRefresh(true)
  }
})
onMounted(() => {
  search.value = {
    name: 'iceywu',
  }
  onRefresh()
})
</script>

<template>
  <DefineTemplate v-slot="{ data }">
    <div>
      <van-card :desc="data.desc" :title="data.title" :thumb="data.cover" />
    </div>
  </DefineTemplate>
  <div class="tools-content min-h-[100vh] px-[12px]">
    <van-floating-bubble
      v-model:offset="offset"
      axis="xy"
      @click="scrollToAnchor"
    >
      定位
    </van-floating-bubble>

    <GetListData
      v-model="listObj"
      :immediate-check="false"
      :skeleton-obj="{
        num: 2,
        gridCol: 1,
        rows: 1,
        type: 'timeLine',
      }"
      @on-refresh="onRefresh"
      @on-load="onLoad"
    >
      <div class="flex flex-col space-y-2">
        <div
          v-for="(item, index) in listObj.list"
          :ref="setRef"
          :key="index"
          class="overflow-hidden rounded-lg bg-gray-100 shadow-lg dark:bg-gray-800"
        >
          <ReuseTemplate :data="item" @click="handleItemClick(item)" />
        </div>
      </div>
    </GetListData>
  </div>
</template>
