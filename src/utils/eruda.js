import eruda from 'eruda'

// eruda 初始化
export function initEruda() {
  const activeEruda = localStorage.getItem('active-eruda')
  if (activeEruda === 'true') {
    eruda.init()
  }
}

// eruda 销毁
export function destroyEruda() {
  if (eruda) {
    eruda?.destroy()
  }
}
