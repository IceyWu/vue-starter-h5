<script setup>
import { closeToast, showLoadingToast } from 'vant'
import { uploadFile } from '@/utils/upload'

// 校验函数可以返回 Promise，实现异步校验
function asyncValidator(val) {
  return new Promise((resolve) => {
    showLoadingToast('验证中...')

    setTimeout(() => {
      closeToast()
      resolve(val === '1234')
    }, 1000)
  })
}

function onFailed(errorInfo) {
  console.log('failed', errorInfo)
}

const formRules = {
  // 手机号
  phone: [
    {
      required: true,
      message: '请输入手机号',
    },
    {
      pattern: /^1\d{10}$/,
      message: '手机号格式错误',
    },
  ],
  // 必填
  required: [
    {
      required: true,
      message: '请输入内容',
    },
  ],
}

const formValues = reactive({
  phone: '',
  switch: true,
  checkBox: true,
  checkboxGroup: ['1'],
  radio: '1',
  stepper: 1,
  rate: 3,
  slider: 50,
  uploader: [{ url: 'https://fastly.jsdelivr.net/npm/@vant/assets/leaf.jpeg' }],
})
function beforeRead(file) {
  console.log('🌳-----file-----', file)
  uploadFile(file, {}, (pro) => {
    console.log('🌳-----pro-----', pro)
  })
    .then((res) => {
      console.log('🌳-----res-----', res)
      const addInfo = {
        ...res,
        url: res.url,
      }
      formValues.uploader.push(addInfo)
    })
    .catch((err) => {
      console.log('🌳-----err-----', err)
    })
}
function beforeDelete(arg, info) {
  console.log('🌵-----beforeDelete-----', arg, info)
  const { name, index } = info
  if (index > -1) {
    console.log('🐠-----formValues-----', formValues)
    return true
  }
 else {
    return false
  }
}
</script>

<template>
  <van-form @failed="onFailed">
    <van-cell-group inset>
      <!-- 通过 pattern 进行正则校验 -->
      <van-field
        v-model="formValues.phone"
        label="手机号"
        name="pattern"
        placeholder="请输入手机号"
        :rules="formRules.phone"
      />
      <!-- 开关 -->
      <van-field name="switch" label="开关">
        <template #input>
          <van-switch v-model="formValues.switch" />
        </template>
      </van-field>
      <!-- 复选框 -->
      <van-field name="checkbox" label="复选框">
        <template #input>
          <van-checkbox v-model="formValues.checkBox" shape="square" />
        </template>
      </van-field>
      <!-- 复选框组 -->
      <van-field name="checkboxGroup" label="复选框组">
        <template #input>
          <van-checkbox-group
            v-model="formValues.checkboxGroup"
            direction="horizontal"
          >
            <van-checkbox name="1" shape="square">复选框 1</van-checkbox>
            <van-checkbox name="2" shape="square">复选框 2</van-checkbox>
          </van-checkbox-group>
        </template>
      </van-field>
      <!-- 单选框 -->
      <van-field name="radio" label="单选框">
        <template #input>
          <van-radio-group v-model="formValues.radio" direction="horizontal">
            <van-radio name="1">单选框 1</van-radio>
            <van-radio name="2">单选框 2</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <!-- 步进器 -->
      <van-field name="stepper" label="步进器">
        <template #input>
          <van-stepper v-model="formValues.stepper" />
        </template>
      </van-field>
      <!-- 评分 -->
      <van-field name="rate" label="评分">
        <template #input>
          <van-rate v-model="formValues.rate" />
        </template>
      </van-field>
      <!-- 滑块 -->
      <van-field name="slider" label="滑块">
        <template #input>
          <van-slider v-model="formValues.slider" />
        </template>
      </van-field>
      <!-- 文件上传 -->
      <van-field name="uploader" label="文件上传">
        <template #input>
          <van-uploader
            v-model="formValues.uploader"
            :before-read="beforeRead"
            :before-delete="beforeDelete"
          >
            <template #preview-cover="{ file }">
              <div class="van-ellipsis preview-cover">{{ file?.fileName || '' }}</div>
            </template>
          </van-uploader>
        </template>
      </van-field>
    </van-cell-group>
    <div style="margin: 16px">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>
</template>
