import { createRouter, createWebHashHistory } from 'vue-router'
import routes from './routes'
// import { useCachedViewStoreHook } from "@/store/modules/cachedView";
import NProgress from '@/utils/progress'
import setPageTitle from '@/utils/set-page-title'

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return new Promise((resolve) => {
      if (savedPosition) {
        const { top } = savedPosition
        window.scroll({
          top,
        })
      }
 else {
        resolve({ left: 0, top: 0 })
      }
    })
  },
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  // 路由缓存
  // useCachedViewStoreHook().addCachedView(to);
  // 页面 title
  setPageTitle(to.meta.title)
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
