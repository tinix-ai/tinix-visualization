import { RouteRecordRaw } from 'vue-router'
import { PageEnum } from '@/enums/pageEnum'

// Đường dẫn nhập
const importPath = {
  'PageEnum.BASE_HOME_NAME': () => import('@/views/project/index.vue'),
  'PageEnum.BASE_HOME_ITEMS_NAME': () => import('@/views/project/items/index.vue'),
  'PageEnum.BASE_HOME_TEMPLATE_NAME': () => import('@/views/project/mtTemplate/index.vue'),
  'PageEnum.BASE_HOME_TEMPLATE_MARKET_NAME': () => import('@/views/project/templateMarket/index.vue')
}

const projectRoutes: RouteRecordRaw = {
  path: PageEnum.BASE_HOME,
  name: PageEnum.BASE_HOME_NAME,
  component: importPath['PageEnum.BASE_HOME_NAME'],
  redirect: PageEnum.BASE_HOME_ITEMS,
  meta: {
    title: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_444') : 'dự án'),
    isRoot: true
  },
  children: [
    {
      path: PageEnum.BASE_HOME_ITEMS,
      name: PageEnum.BASE_HOME_ITEMS_NAME,
      component: importPath['PageEnum.BASE_HOME_ITEMS_NAME'],
      meta: {
        title: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_121') : 'dự án của tôi')
      }
    },
    {
      path: PageEnum.BASE_HOME_TEMPLATE,
      name: PageEnum.BASE_HOME_TEMPLATE_NAME,
      component: importPath['PageEnum.BASE_HOME_TEMPLATE_NAME'],
      meta: {
        title: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_254') : 'mẫu của tôi')
      }
    },
    {
      path: PageEnum.BASE_HOME_TEMPLATE_MARKET,
      name: PageEnum.BASE_HOME_TEMPLATE_MARKET_NAME,
      component: importPath['PageEnum.BASE_HOME_TEMPLATE_MARKET_NAME'],
      meta: {
        title: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_519') : 'thị trường mẫu')
      }
    }
  ]
}

export default projectRoutes
