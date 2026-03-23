<template>
  <div class="go-content-layers-group-list-item">
    <div
      class="root-item-content"
      :class="{ hover, select, 'list-mini': selectText }"
      @click="clickHandle($event)"
      @mousedown="groupMousedownHandle($event)"
      @mouseenter="mouseenterHandle(componentGroupData)"
      @mouseleave="mouseleaveHandle(componentGroupData)"
      @contextmenu="handleContextMenu($event, componentGroupData, optionsHandle)"
    >
      <div class="go-flex-items-center item-content">
        <n-icon size="20" class="go-ml-1">
          <template v-if="expend">
            <folder-open-icon></folder-open-icon>
          </template>
          <template v-else>
            <folder-icon></folder-icon>
          </template>
        </n-icon>
        <n-ellipsis style="margin-right: auto">
          <n-text class="go-ml-2 list-text" :depth="2">
            {{ componentGroupData.chartConfig.title }}
          </n-text>
        </n-ellipsis>
        <layers-status :isGroup="false" :hover="hover" :status="status"></layers-status>
      </div>
      <div :class="{ 'select-modal': select }"></div>
    </div>
    <n-collapse-transition :show="expend">
      <LayersListItem
        v-for="element in componentGroupData.groupList"
        :key="element.id"
        :componentData="element"
        :layer-mode="layerMode"
        :isGroup="true"
        @mousedown="mousedownHandle($event, element, componentGroupData.id)"
        @mouseenter="mouseenterHandle(element)"
        @mouseleave="mouseleaveHandle(element)"
        @contextmenu="handleContextMenu($event, componentGroupData, optionsHandle)"
      ></LayersListItem>
    </n-collapse-transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, PropType } from 'vue'
import { MouseEventButton, WinKeyboard, MacKeyboard } from '@/enums/editPageEnum'
import { MenuEnum } from '@/enums/editPageEnum'
import { useDesignStore } from '@/store/modules/designStore/designStore'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { useContextMenu, divider } from '@/views/chart/hooks/useContextMenu.hook'
import { MenuOptionsItemType } from '@/views/chart/hooks/useContextMenu.hook.d'
import { LayerModeEnum } from '@/store/modules/chartLayoutStore/chartLayoutStore.d'
import { CreateComponentType, CreateComponentGroupType } from '@/packages/index.d'
import { LayersListItem } from '../LayersListItem'
import { LayersStatus } from '../LayersStatus/index'
import { icon } from '@/plugins'

const props = defineProps({
  componentGroupData: {
    type: Object as PropType<CreateComponentGroupType>,
    required: true
  },
  layerMode: {
    type: String as PropType<LayerModeEnum>,
    default: LayerModeEnum.THUMBNAIL
  }
})

// Nhấp chuột phải
const pickOptionsList = [MenuEnum.UN_GROUP]

// màu sắc toàn cầu
const designStore = useDesignStore()
const { FolderIcon, FolderOpenIcon } = icon.ionicons5

const chartEditStore = useChartEditStore()
const { handleContextMenu, onClickOutSide } = useContextMenu()

const expend = ref(false)

// màu sắc
const themeColor = computed(() => {
  return designStore.getAppTheme
})

// Có nên chọn văn bản hay không
const selectText = computed(() => {
  return props.layerMode === LayerModeEnum.TEXT
})

// Tính toán mục tiêu hiện được chọn
const select = computed(() => {
  const id = props.componentGroupData.id
  return chartEditStore.getTargetChart.selectId.find((e: string) => e === id)
})

// bay lên
const hover = computed(() => {
  return props.componentGroupData.id === chartEditStore.getTargetChart.hoverId
})

// Trạng thái thành phần trốn/khóa
const status = computed(() => {
  return props.componentGroupData.status
})

// Nhấp chuột phải
const optionsHandle = (
  targetList: MenuOptionsItemType[],
  allList: MenuOptionsItemType[],
  targetInstance: CreateComponentType
) => {
  const filter = (menulist: MenuEnum[]) => {
    return allList.filter(i => menulist.includes(i.key as MenuEnum))
  }

  // Xử lý nhiều lựa chọn
  if (chartEditStore.getTargetChart.selectId.length > 1) {
    return filter([MenuEnum.GROUP])
  } else {
    const statusMenuEnums: MenuEnum[] = []
    if (targetInstance.status.lock) {
      statusMenuEnums.push(MenuEnum.LOCK)
    } else {
      statusMenuEnums.push(MenuEnum.UNLOCK)
    }
    if (targetInstance.status.hide) {
      statusMenuEnums.push(MenuEnum.HIDE)
    } else {
      statusMenuEnums.push(MenuEnum.SHOW)
    }
    return [
      ...filter([MenuEnum.UN_GROUP]),
      divider(),
      ...targetList.filter(i => !statusMenuEnums.includes(i.key as MenuEnum))
    ]
  }
}

// nhấp chuột
const clickHandle = (e: MouseEvent) => {
  // Nhấn nút trái + CTRL
  if (window.$KeyboardActive?.ctrl) return
  // Xác định phím trái và phím phải
  expend.value = !expend.value
  mousedownHandle(e, props.componentGroupData)
}

// Sự kiện nhấp nhóm
const groupMousedownHandle = (e: MouseEvent) => {
  onClickOutSide()
  // Nếu bạn nhấn nút CTRL, Cho biết nhiều lựa chọn
  const id = props.componentGroupData.id
  if (e.buttons === MouseEventButton.LEFT && window.$KeyboardActive?.ctrl) {
    // Nếu được chọn thì loại bỏ
    if (chartEditStore.targetChart.selectId.includes(id)) {
      const exList = chartEditStore.targetChart.selectId.filter(e => e !== id)
      chartEditStore.setTargetSelectChart(exList)
    } else {
      chartEditStore.setTargetSelectChart(id, true)
    }
    return
  }
  chartEditStore.setTargetSelectChart(id)
}

// sự kiện nhấp chuột công khai
const mousedownHandle = (
  e: MouseEvent,
  componentInstance: CreateComponentType | CreateComponentGroupType,
  id?: string
) => {
  e.preventDefault()
  e.stopPropagation()

  onClickOutSide()
  chartEditStore.setTargetSelectChart(id || componentInstance.id)
}

// sự kiện công khai
const mouseenterHandle = (componentInstance: CreateComponentType | CreateComponentGroupType) => {
  chartEditStore.setTargetHoverChart(componentInstance.id)
}

// sự kiện trục xuất công khai
const mouseleaveHandle = (componentInstance: CreateComponentType | CreateComponentGroupType) => {
  chartEditStore.setTargetHoverChart(undefined)
}
</script>

<style lang="scss" scoped>
$centerHeight: 52px;
$centerMiniHeight: 28px;
$textSize: 10px;

@include go(content-layers-group-list-item) {
  position: relative;
  width: 90%;
  margin: 10px 5%;
  margin-bottom: 5px;
  @extend .go-transition-quick;
  @include deep() {
    .go-content-layers-list-item {
      margin-right: 0 !important;
      width: 95% !important;
    }
  }

  &:hover {
    @include deep() {
      .icon-item {
        opacity: 1;
      }
    }
  }

  .root-item-content {
    height: $centerHeight;
    cursor: pointer;
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0);
    &.hover,
    &:hover {
      @include fetch-bg-color('background-color4');
    }
    /* đã chọn */
    &.select {
      border: 1px solid v-bind('themeColor');
      /* Cần thiết lập mức cao nhất, bao quát hover màu sắc */
      background-color: rgba(0, 0, 0, 0);
      .list-img {
        border: 1px solid v-bind('themeColor') !important;
      }
    }

    // miniphong cách
    &.list-mini {
      height: $centerMiniHeight;
      .item-content {
        height: calc(#{$centerMiniHeight} - 10px) !important;
      }
      .select-modal {
        height: calc(#{$centerMiniHeight} + 2px) !important;
      }
    }
  }
  .select-modal,
  .item-content {
    position: absolute;
    top: 0;
    left: 0;
  }
  .item-content {
    z-index: 1;
    padding: 6px 5px;
    justify-content: start !important;
    width: calc(100% - 10px);
    height: calc(#{$centerHeight} - 10px);
  }
  .select-modal {
    width: 100%;
    height: calc(#{$centerHeight} + 2px);
    opacity: 0.3;
    background-color: v-bind('themeColor');
  }
  .list-text {
    padding-left: 6px;
    font-size: $textSize;
  }

  .list-status-icon {
    margin-left: 3px;
  }
}
</style>
