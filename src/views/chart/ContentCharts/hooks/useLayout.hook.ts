import { ref, toRefs } from 'vue'

// cách trình bày
import { useChartLayoutStore } from '@/store/modules/chartLayoutStore/chartLayoutStore'
// phong cách
import { useDesignStore } from '@/store/modules/designStore/designStore'

// màu sắc toàn cầu
const designStore = useDesignStore()
const themeColor = ref(designStore.getAppTheme)

// kiểm soát cấu trúc
const { setItem } = useChartLayoutStore()
const { getCharts } = toRefs(useChartLayoutStore())

export {
  themeColor,
  setItem,
  getCharts
}