import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home',
    component: () => import('@/layouts/main.vue'),
    name: 'Home',
    meta: {
      title: '首页',
    },
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '首页',
          isCache: false, // 是否缓存
          isNav: true,
        }
      }
    ]
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/common/404.vue'),
    meta: {
      noCache: true,
    },
  },
  {
    path: '/redirect',
    name: 'Redirect',
    component: () => import('@/layouts/main.vue'),
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/common/redirect.vue'),
        meta: {
          noCache: true,
        },
      },
    ],
  },
  {
    path: '/commodity-manage',
    name: 'CommodityManage',
    component: () => import('@/layouts/main.vue'),
    meta: {
      title: '版费商品列表',
    },
    children: [
      {
        path: 'external-commodity/list',
        name: 'ExternalCommodityList',
        component: () => import('@/views/commodity-manage/external-commodity/list/index.vue'),
        meta: {
          title: '外部版费商品列表',
          isCache: false, // 是否缓存
          activeMenu: 'ExternalCommodityList',
          isNav: true,
        }
      },
      {
        path: 'external-commodity/detail/:id',
        name: 'ExternalCommodityDetail',
        component: () => import('@/views/commodity-manage/external-commodity/detail/index.vue'),
        meta: {
          title: '外部版费商品详情',
          isCache: false, // 是否缓存
          activeMenu: 'ExternalCommodityList',
          isNav: false,
        }
      },
      {
        path: 'inner-commodity/list',
        name: 'InnerCommodityList',
        component: () => import('@/views/commodity-manage/inner-commodity/list/index.vue'),
        meta: {
          title: '内部版费商品列表',
          isCache: false, // 是否缓存
          activeMenu: 'InnerCommodityList',
          isNav: true,
        }
      },
      {
        path: 'inner-commodity/detail/:id',
        name: 'InnerCommodityDetail',
        component: () => import('@/views/commodity-manage/inner-commodity/detail/index.vue'),
        meta: {
          title: '内部版费商品详情',
          isCache: false, // 是否缓存
          activeMenu: 'InnerCommodityList',
          isNav: false,
        }
      },
    ]
  },
  {
    path: '/order-manage',
    name: 'OrderManage',
    component: () => import('@/layouts/main.vue'),
    meta: {
      title: '订单管理',
    },
    children: [
      {
        path: 'common-order/list',
        name: 'CommonOrderList',
        component: () => import('@/views/order-manage/common-order/list/index.vue'),
        meta: {
          title: '普通订单列表',
          isCache: true, // 是否缓存
          activeMenu: 'CommonOrderList',
          isNav: true,
        }
      },
      {
        path: 'common-order/detail/:id',
        name: 'CommonOrderDetail',
        component: () => import('@/views/order-manage/common-order/detail/index.vue'),
        meta: {
          title: '普通订单详情',
          isCache: false, // 是否缓存
          activeMenu: 'CommonOrderList',
          isNav: false,
        }
      },
      {
        path: 'cutting-order/list',
        name: 'CuttingOrderList',
        component: () => import('@/views/order-manage/cutting-order/list/index.vue'),
        meta: {
          title: '样衣剪版订单列表',
          isCache: false, // 是否缓存
          activeMenu: 'CuttingOrderList',
          isNav: true,
        }
      },
      {
        path: 'cutting-order/detail/:id',
        name: 'CuttingOrderDetail',
        component: () => import('@/views/order-manage/cutting-order/detail/index.vue'),
        meta: {
          title: '样衣剪版订单详情',
          isCache: false, // 是否缓存
          activeMenu: 'CuttingOrderList',
          isNav: false,
        }
      },
    ]
  }
]

const router = createRouter({
  scrollBehavior: () => ({ left: 0, top: 0 }),
  history: createWebHashHistory(),
  routes
})

export default router
