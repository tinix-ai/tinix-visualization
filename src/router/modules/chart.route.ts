import { RouteRecordRaw } from 'vue-router'
import { ChartEnum } from '@/enums/pageEnum'

// Đường dẫn nhập
const importPath = {
  'ChartEnum.CHART_HOME_NAME': () => import('@/views/chart/index.vue')
}

const chartRoutes: RouteRecordRaw = {
  path: ChartEnum.CHART_HOME,
  name: ChartEnum.CHART_HOME_NAME,
  component: importPath['ChartEnum.CHART_HOME_NAME'],
  meta: {
    title: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_337') : 'không gian làm việc'),
    isRoot: true,
    noKeepAlive: true,
  }
}


export default chartRoutes