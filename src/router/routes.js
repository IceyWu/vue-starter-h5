import Layout from '@/layout/index.vue'

function Demo() {
  return import(/* webpackChunkName: "demo" */ '@/views/demo/index.vue')
}
function NotFound() {
  return import(/* webpackChunkName: "404" */ '@/views/404/index.vue')
}

const routes = [
  {
    path: '/',
    name: 'root',
    component: Layout,
    redirect: { name: 'Demo' },
    children: [
      {
        path: 'demo',
        name: 'Demo',
        component: Demo,
        meta: {
          title: '主页',
          keepAlive: true,
          showTab: true,
        },
        // children: [
        //   {
        //     path: "detail/:id",
        //     // path: "detail",
        //     name: "Detail",
        // component: () => import("@/views/demo/detail.vue"),
        // meta: {
        //   title: "详情",
        //   noCache: true,
        //   showBack: true,
        // },
        //   },
        // ],
      },
      {
        path: 'demo/detail/:id',
        name: 'detail',
        component: () =>
          import(
            /* webpackChunkName: "demo-detail" */ '@/views/demo/detail.vue'
          ),
        meta: {
          title: '详情',
          noCache: true,
          showBack: true,
        },
      },
      {
        path: 'tools',
        name: 'Tools',
        component: () =>
          import(/* webpackChunkName: "tools" */ '@/views/tools/index.vue'),
        meta: {
          title: '工具',
          showTab: true,
        },
      },
      {
        path: 'about',
        name: 'About',
        component: () =>
          import(/* webpackChunkName: "about" */ '@/views/about/index.vue'),
        meta: {
          title: '关于',
          noCache: true,
          showTab: true,
        },
      },

      {
        path: 'playground',
        name: 'Playground',
        component: () =>
          import(
            /* webpackChunkName: "playground" */ '@/views/playground/index.vue'
          ),
        meta: {
          title: '广场',
          noCache: true,
          showTab: true,
        },
      },
      {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound,
        meta: {
          title: '404',
          showTab: false,
        },
      },
    ],
  },
]

export default routes
