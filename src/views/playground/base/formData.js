import { timestampToTime } from '@/utils'

const maxDate = new Date()
const minDate = new Date(1900, 0, 1)
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
  // 必填
  requiredChoose: [
    {
      required: true,
      message: '请选择',
    },
  ],
  // 姓名
  name: [
    {
      required: true,
      message: '请输入姓名',
    },
  ],
  // 性别
  sex: [
    {
      required: true,
      message: '请选择性别',
    },
  ],
  // 年龄
  birth: [
    {
      required: true,
      message: '请选择年龄',
    },
  ],
  // 请选择文化程度
  diploma: [
    {
      required: true,
      message: '请选择文化程度',
    },
  ],
}

const columns_sex = [
  { text: '男', value: 1 },
  { text: '女', value: 2 },
  // { text: "未知", value: 0 },
]

const columns_educational = [
  { text: '博士研究生', value: '博士研究生' },
  { text: '硕士研究生', value: '硕士研究生' },
  { text: '研究生班', value: '研究生班' },
  { text: '大学本科', value: '大学本科' },
  { text: '大学专科', value: '大学专科' },
  { text: '中等专科', value: '中等专科' },
  { text: '职业高中', value: '职业高中' },
  { text: '技工学校', value: '技工学校' },
  {
    text: '中等师范学校（幼儿师范学校）',
    value: '中等师范学校（幼儿师范学校）',
  },
  { text: '普通高中', value: '普通高中' },
  { text: '初中', value: '初中' },
  { text: '小学', value: '小学' },
  { text: '其他', value: '其他' },
]
export const formItemListData = [
  {
    tag: 1,
    type: 'input',
    key: 'name',
    props: {
      label: '姓名',
      placeholder: '请输入姓名',
      name: 'name',
      rules: formRules.name,
      maxlength: 30,
    },
  },
  {
    tag: 2,
    type: 'picker',
    key: 'sex',
    columns: columns_sex,
    deValFormat: (data) => {
      return columns_sex.find(item => item.value === data)?.text || '未知'
    },
    props: {
      label: '性别',
      placeholder: '请选择',
      isLink: true,
      readonly: true,
      name: 'sex',
      rules: formRules.sex,
    },
  },

  {
    tag: 3,
    type: 'picker',
    key: 'diploma',
    columns: columns_educational,

    props: {
      label: '文化程度',
      placeholder: '请选择',
      isLink: true,
      readonly: true,
      name: 'diploma',
      rules: formRules.diploma,
    },
  },

  {
    tag: 4,
    type: 'date-picker',
    key: 'birth',
    valFormat: (data = []) => {
      if (!data || !data.length)
return ''
      return `${data[0] || ''}-${data[1] || ''}-${data[2] || ''}`
    },
    modelValFormat: (data) => {
      return timestampToTime(data)
    },
    props: {
      label: '出生日期',
      placeholder: '请选择',
      isLink: true,
      readonly: true,
      name: 'birth',
      rules: formRules.birth,
    },
    pickerProps: {
      maxDate,
      minDate,
    },
  },
]
