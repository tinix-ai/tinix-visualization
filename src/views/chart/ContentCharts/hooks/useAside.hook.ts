import { ref, watch, computed } from 'vue'
import { icon } from '@/plugins'
import { renderLang, renderIcon } from '@/utils'
import { themeColor, setItem, getCharts } from './useLayout.hook'
import { PackagesCategoryEnum, PackagesCategoryName, ConfigType } from '@/packages/index.d'
import { usePackagesStore } from '@/store/modules/packagesStore/packagesStore'
import { ChartLayoutStoreEnum } from '@/store/modules/chartLayoutStore/chartLayoutStore.d'
// biểu tượng
const { AirPlaneOutlineIcon, ImageIcon, BarChartIcon } = icon.ionicons5
const { TableSplitIcon, RoadmapIcon, ChartPieIcon, SpellCheckIcon, GraphicalDataFlowIcon } = icon.carbon

// biểu đồ
export type MenuOptionsType = {
  key: string
  icon: ReturnType<typeof renderIcon>
  label: ReturnType<typeof renderLang>
  list: ConfigType[]
}

const packagesListObj = {
  [PackagesCategoryEnum.CHARTS]: {
    icon: renderIcon(RoadmapIcon),
    label: PackagesCategoryName.CHARTS
  },
  [PackagesCategoryEnum.VCHART]: {
    icon: renderIcon(ChartPieIcon),
    label: PackagesCategoryName.VCHART
  },
  [PackagesCategoryEnum.INFORMATIONS]: {
    icon: renderIcon(SpellCheckIcon),
    label: PackagesCategoryName.INFORMATIONS
  },
  [PackagesCategoryEnum.TABLES]: {
    icon: renderIcon(TableSplitIcon),
    label: PackagesCategoryName.TABLES
  },
  [PackagesCategoryEnum.DECORATES]: {
    icon: renderIcon(GraphicalDataFlowIcon),
    label: PackagesCategoryName.DECORATES
  },
  [PackagesCategoryEnum.PHOTOS]: {
    icon: renderIcon(ImageIcon),
    label: PackagesCategoryName.PHOTOS
  },
  [PackagesCategoryEnum.ICONS]: {
    icon: renderIcon(AirPlaneOutlineIcon),
    label: PackagesCategoryName.ICONS
  }
}

export const useAsideHook = () => {
  const packagesStore = usePackagesStore()
  const menuOptions: MenuOptionsType[] = []

  // Danh sách quy trình
  const handlePackagesList = () => {
    for (const val in packagesStore.getPackagesList) {
      menuOptions.push({
        key: val,
        // @ts-ignore
        icon: packagesListObj[val].icon,
        // @ts-ignore
        label: packagesListObj[val].label,
        // @ts-ignore
        list: packagesStore.getPackagesList[val]
      })
    }
  }
  handlePackagesList()

  // Ghi lại giá trị đã chọn
  let beforeSelect: string = menuOptions[0]['key']
  const selectValue = ref<string>(menuOptions[0]['key'])

  // giá trị đối tượng được chọn
  const selectOptions = ref(menuOptions[0])

  // nhấp chuột item
  const clickItemHandle = (key: string, item: any) => {
    selectOptions.value = item
    // Xử lý gấp
    if (beforeSelect === key) {
      setItem(ChartLayoutStoreEnum.CHARTS, !getCharts.value, false)
    } else {
      setItem(ChartLayoutStoreEnum.CHARTS, true, false)
    }
    beforeSelect = key
  }

  return {
    getCharts,
    BarChartIcon,
    themeColor,
    selectOptions,
    selectValue,
    clickItemHandle,
    menuOptions
  }
}
