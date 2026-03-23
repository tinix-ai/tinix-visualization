import { RouteRecordRaw } from 'vue-router'
import { PreviewEnum } from '@/enums/pageEnum'

// Đường dẫn nhập
const importPath = {
  'PreviewEnum.CHART_PREVIEW_NAME': () => import('@/views/preview/wrapper.vue')
}

const chartRoutes: RouteRecordRaw = {
  path: PreviewEnum.CHART_PREVIEW,
  name: PreviewEnum.CHART_PREVIEW_NAME,
  component: importPath['PreviewEnum.CHART_PREVIEW_NAME'],
  meta: {
    title: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_276') : 'Xem trước'),
    isRoot: true
  }
}


export default chartRoutes