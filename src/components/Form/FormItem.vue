<script setup>
const props = defineProps({
  data: {
    type: Object,
    default: () => {},
  },
})

// import { getToday } from "@/utils";
const modelVal = defineModel({ default: '' })

onMounted(() => {
  initVal(true)
})

const comType = computed(() => {
  return props.data?.type
})
const showPicker = ref(false)
const pickerVal = ref('')
function onConfirm({ selectedOptions }) {
  modelVal.value = selectedOptions[0]?.value
  pickerVal.value = selectedOptions[0]?.text
  showPicker.value = false
}

// const currentDate = ref(["2021", "01", "01"]);
const currentDate = ref(['2021', '01', '01'])

const maxDate = new Date()
const minDate = new Date(1900, 0, 1)
function onConfirmDate(e) {
  console.log('💗onConfirmDate---------->', e)
  initVal()
  showPicker.value = false
}
function initVal(isFirst = false) {
  const { type, columns, valFormat, modelValFormat } = props.data || {}
  const currentDate = [
    maxDate.getFullYear(),
    maxDate.getMonth() + 1,
    maxDate.getDate(),
  ]
  if (type === 'picker') {
    pickerVal.value = columns.find(
      item => item.value === modelVal.value,
    )?.text
  }
 else if (type === 'date-picker') {
    pickerVal.value = valFormat ? valFormat(modelVal.value) : modelVal.value
    modelVal.value
      = modelVal.value && modelVal.value.length > 0
        ? modelVal.value
        : currentDate
  }
}
</script>

<template>
  <!-- 输入框 -->
  <template v-if="comType === 'input'">
    <van-field v-model="modelVal" v-bind="data.props" />
  </template>
  <!-- 选择器 -->
  <template v-else-if="comType === 'picker'">
    <van-field
      v-model="pickerVal"
      v-bind="data.props"
      @click="showPicker = true"
    />
    <van-popup v-model:show="showPicker" position="bottom">
      <van-picker
        :columns="data.columns"
        @confirm="onConfirm"
        @cancel="showPicker = false"
      />
    </van-popup>
  </template>
  <!-- 选择器 -->
  <template v-else-if="comType === 'date-picker'">
    <van-field
      v-model="pickerVal"
      v-bind="data.props"
      @click="showPicker = true"
    />
    <van-popup v-model:show="showPicker" position="bottom">
      <van-date-picker
        v-model="modelVal"
        v-bind="data.pickerProps"
        title="选择日期"
        @confirm="onConfirmDate"
        @cancel="showPicker = false"
      />
    </van-popup>
  </template>
</template>

<style lang="less" scoped>
.FormItem {
  &-content {
    &-title {
      color: #000;
    }
  }
}
</style>
