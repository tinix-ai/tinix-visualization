import { ref, nextTick, toRaw } from 'vue'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { CreateComponentType, CreateComponentGroupType } from '@/packages/index.d'
import { renderIcon, loadingError } from '@/utils'
import { icon } from '@/plugins'
import { MenuOptionsItemType } from './useContextMenu.hook.d'
import { MenuEnum } from '@/enums/editPageEnum'
import cloneDeep from 'lodash/cloneDeep'

const {
  CopyIcon,
  CutIcon,
  ClipboardOutlineIcon,
  TrashIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  LockOpenOutlineIcon,
  LockClosedOutlineIcon,
  EyeOutlineIcon,
  EyeOffOutlineIcon
} = icon.ionicons5
const { UpToTopIcon, DownToBottomIcon, PaintBrushIcon, Carbon3DSoftwareIcon, Carbon3DCursorIcon } = icon.carbon

const chartEditStore = useChartEditStore()

/**
 * đường phân chia
 * @param {number} n > 2
 * @returns
 */
export const divider = (n: number = 3) => {
  return {
    type: 'divider',
    key: `d${n}`
  }
}

// * Tùy chọn thành phần đơn mặc định
export const defaultOptions: MenuOptionsItemType[] = [
  {
    label: window['$t']('views_components.auto_262'),
    key: MenuEnum.LOCK,
    icon: renderIcon(LockClosedOutlineIcon),
    fnHandle: chartEditStore.setLock
  },
  {
    label: window['$t']('views_components.auto_261'),
    key: MenuEnum.UNLOCK,
    icon: renderIcon(LockOpenOutlineIcon),
    fnHandle: chartEditStore.setUnLock
  },
  {
    label: window['$t']('views_components.auto_277'),
    key: MenuEnum.HIDE,
    icon: renderIcon(EyeOffOutlineIcon),
    fnHandle: chartEditStore.setHide
  },
  {
    label: window['$t']('views_components.auto_312'),
    key: MenuEnum.SHOW,
    icon: renderIcon(EyeOutlineIcon),
    fnHandle: chartEditStore.setShow
  },
  {
    type: 'divider',
    key: 'd0'
  },
  {
    label: window['$t']('views_components.auto_272'),
    key: MenuEnum.COPY,
    icon: renderIcon(CopyIcon),
    fnHandle: chartEditStore.setCopy
  },
  {
    label: window['$t']('views_components.auto_274'),
    key: MenuEnum.CUT,
    icon: renderIcon(CutIcon),
    fnHandle: chartEditStore.setCut
  },
  {
    label: window['$t']('views_components.auto_273'),
    key: MenuEnum.PARSE,
    icon: renderIcon(ClipboardOutlineIcon),
    fnHandle: chartEditStore.setParse
  },
  {
    type: 'divider',
    key: 'd1'
  },
  {
    label: window['$t']('views_components.auto_310'),
    key: MenuEnum.TOP,
    icon: renderIcon(UpToTopIcon),
    fnHandle: chartEditStore.setTop
  },
  {
    label: window['$t']('views_components.auto_311'),
    key: MenuEnum.BOTTOM,
    icon: renderIcon(DownToBottomIcon),
    fnHandle: chartEditStore.setBottom
  },
  {
    label: window['$t']('views_components.auto_314'),
    key: MenuEnum.UP,
    icon: renderIcon(ChevronUpIcon),
    fnHandle: chartEditStore.setUp
  },
  {
    label: window['$t']('views_components.auto_313'),
    key: MenuEnum.DOWN,
    icon: renderIcon(ChevronDownIcon),
    fnHandle: chartEditStore.setDown
  },
  {
    type: 'divider',
    key: 'd2'
  },
  {
    label: window['$t']('views_components.auto_315'),
    key: MenuEnum.CLEAR,
    icon: renderIcon(PaintBrushIcon),
    fnHandle: chartEditStore.setRecordChart
  },
  {
    label: window['$t']('views_components.auto_2'),
    key: MenuEnum.DELETE,
    icon: renderIcon(TrashIcon),
    fnHandle: chartEditStore.removeComponentList
  }
]

// * Tùy chọn thành phần nhiều lựa chọn mặc định
export const defaultMultiSelectOptions: MenuOptionsItemType[] = [
  {
    label: window['$t']('views_components.auto_271'),
    key: MenuEnum.GROUP,
    icon: renderIcon(Carbon3DSoftwareIcon),
    fnHandle: chartEditStore.setGroup
  },
  {
    label: window['$t']('views_components.auto_278'),
    key: MenuEnum.UN_GROUP,
    icon: renderIcon(Carbon3DCursorIcon),
    fnHandle: chartEditStore.setUnGroup
  }
]

// * Không có tùy chọn phân phối dữ liệu
const defaultNoItemKeys = [MenuEnum.PARSE, MenuEnum.CLEAR]

/**
 * * Chọn tùy chọn
 * @param options
 * @param pickList
 * @returns
 */
const pickOption = (options: MenuOptionsItemType[], pickList?: MenuEnum[]) => {
  if (!pickList) return options
  const list: MenuOptionsItemType[] = []
  pickList.forEach(e => {
    list.push(...options.filter(op => op.key === e))
  })
  return list
}

/**
 * * Tùy chọn xóa
 * @param options
 * @param hideList
 * @returns
 */
const hideOption = (options: MenuOptionsItemType[], hideList?: MenuEnum[]) => {
  if (!hideList) return options
  return options.filter((op: MenuOptionsItemType) => {
    return hideList.findIndex((e: MenuEnum) => e !== op.key) !== -1
  })
}

// * Nhấp chuột phải vào nội dung
const menuOptions = ref<MenuOptionsItemType[]>([])

// * Xử lý nhấp chuột phải
const handleContextMenu = (
  e: MouseEvent,
  // Đối tượng nhấp chuột phải
  targetInstance?: CreateComponentType | CreateComponentGroupType,
  // Chức năng phán đoán
  optionsHandle?: Function,
  // Ẩn danh sách tùy chọn
  hideOptionsList?: MenuEnum[],
  // Chọn danh sách tùy chọn
  pickOptionsList?: MenuEnum[]
) => {
  e.stopPropagation()
  e.preventDefault()

  let target = e.target
  while (target instanceof SVGElement) {
    target = target.parentNode
  }

  chartEditStore.setTargetSelectChart(targetInstance && targetInstance.id)

  // Ẩn danh sách cũ
  chartEditStore.setRightMenuShow(false)

  // * Nhiều lựa chọn tùy chọn mặc định
  if (chartEditStore.getTargetChart.selectId.length > 1) {
    menuOptions.value = defaultMultiSelectOptions
  } else {
    // * Tùy chọn mặc định của đài
    menuOptions.value = defaultOptions
  }

  if (!targetInstance) {
    menuOptions.value = pickOption(toRaw(menuOptions.value), defaultNoItemKeys)
  }
  if (hideOptionsList) {
    menuOptions.value = hideOption([...defaultMultiSelectOptions, divider(), ...defaultOptions], hideOptionsList)
  }
  if (pickOptionsList) {
    menuOptions.value = pickOption([...defaultMultiSelectOptions, divider(), ...defaultOptions], pickOptionsList)
  }
  if (optionsHandle) {
    // Các chức năng tùy chỉnh có thể nhận được tùy chọn hiện tại và tất cả các tùy chọn
    menuOptions.value = optionsHandle(
      cloneDeep(toRaw(menuOptions.value)),
      [...defaultMultiSelectOptions, ...defaultOptions],
      targetInstance
    )
  }
  nextTick().then(() => {
    chartEditStore.setMousePosition(e.clientX, e.clientY)
    chartEditStore.setRightMenuShow(true)
  })
}

/**
 * * Nhấp chuột phảihook
 * @param menuConfig
 * @returns
 */
export const useContextMenu = () => {
  // Đặt mặc định
  menuOptions.value = defaultOptions

  // * Mất tập trung
  const onClickOutSide = () => {
    chartEditStore.setRightMenuShow(false)
  }

  // * xử lý sự kiện
  const handleMenuSelect = (key: string) => {
    chartEditStore.setRightMenuShow(false)
    const targetItem: MenuOptionsItemType[] = menuOptions.value.filter((e: MenuOptionsItemType) => e.key === key)

    menuOptions.value.forEach((e: MenuOptionsItemType) => {
      if (e.key === key) {
        if (e.fnHandle) {
          e.fnHandle()
          return
        }
        if (!targetItem) loadingError()
      }
    })
  }

  return {
    menuOptions,
    defaultOptions,
    defaultMultiSelectOptions,
    handleContextMenu,
    onClickOutSide,
    handleMenuSelect,
    mousePosition: chartEditStore.getMousePosition
  }
}
