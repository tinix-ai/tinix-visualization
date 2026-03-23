import { RouteRecordRaw } from 'vue-router'
import { EditEnum } from '@/enums/pageEnum'

// Đường dẫn nhập
const importPath = {
  [EditEnum.CHART_EDIT_NAME]: () => import('@/views/edit/index.vue')
}

const chartRoutes: RouteRecordRaw = {
  path: EditEnum.CHART_EDIT,
  name: EditEnum.CHART_EDIT_NAME,
  component: importPath[EditEnum.CHART_EDIT_NAME],
  meta: {
    title: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_420') : 'biên tập'),
    isRoot: true
  }
}


export default chartRoutes