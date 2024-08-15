import { createApp } from 'vue'
import Dialog from '@/components/Dialog/filePreview.vue'

const createDialogApp = () => {
  return createApp(Dialog)
};

const showDialog = (options) => {
  const app = createDialogApp(); // 每次都创建一个新的app实例
  return new Promise((resolve, reject) => {
    const instance = app.mount(document.createElement('div'))
    document.body.appendChild(instance.$el)
    console.log('instance',instance)
    // 设置标题、内容、类型等属性
    console.log('🌳-----options-----', options);
    instance.data = options.data || {}
    // instance.content = options.content || ''
    // instance.type = options.type || 'info'
    // 监听确认和取消按钮的点击事件，并在事件处理函数中调用 resolve 或 reject 方法
    // instance.handleConfirm = () => {
    //   resolve()
    //   instance.close()
    //   app.unmount(instance.$el)
    //   // document.body.removeChild(instance.$el)
    // }
    // instance.handleCancel = () => {
    //   reject()
    //   instance.close()
    //   app.unmount(instance.$el)
    //   // document.body.removeChild(instance.$el)
    // }
    // 打开提示框
    console.log('🍪-----instance-----', instance);
    instance.open(options.data)
  })
}

export default showDialog
