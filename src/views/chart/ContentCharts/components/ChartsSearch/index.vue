<template>
  <div class="go-chart-search-box">
    <div class="chart-search go-transition" :class="{ 'chart-search-focus': isFocus }">
      <n-popover
        class="chart-search-popover"
        :show-arrow="false"
        :show="showPopover"
        :to="false"
        trigger="hover"
        placement="bottom-start"
      >
        <template #trigger>
          <n-input-group>
            <n-input
              size="small"
              placeholder="Tìm component"
              v-model:value.trim="search"
              :loading="loading"
              @focus="focusHandle(true)"
              @blur="focusHandle(false)"
              @update:value="searchHandle"
            >
              <template #suffix>
                <n-icon v-show="!loading" :component="SearchIcon" />
              </template>
            </n-input>
          </n-input-group>
        </template>

        <div class="search-list-box">
          <n-scrollbar style="max-height: 500px">
            <n-empty v-show="!searchRes.length" size="small" description="Không tìm thấy component nào~"></n-empty>
            <div
              class="list-item go-flex-items-center go-ellipsis-1"
              v-for="item in searchRes"
              :key="item.key"
              :title="item.title"
              @click="selectChartHandle(item)"
            >
              <n-icon v-if="item.icon" class="list-img" size="20">
                <component :is="item.icon"></component>
              </n-icon>
              <chart-glob-image v-else class="list-item-img" :chartConfig="item" />
              <n-text class="list-item-fs" depth="2">{{ item.title }}</n-text>
            </div>
          </n-scrollbar>
          <div class="popover-modal"></div>
        </div>
      </n-popover>
    </div>
    <n-button-group class="btn-group go-transition" :class="{ 'btn-group-focus': isFocus }" style="display: flex">
      <n-button
        ghost
        size="small"
        :key="index"
        :type="chartMode === item.value ? 'primary' : 'tertiary'"
        v-for="(item, index) in chartModeList"
        @click="changeChartModeType(item.value)"
      >
        <n-tooltip :show-arrow="false" trigger="hover">
          <template #trigger>
            <n-icon size="14" :component="item.icon" />
          </template>
          {{ item.label }}
        </n-tooltip>
      </n-button>
    </n-button-group>
  </div>
</template>

<script setup lang="ts">
import { ref, onUnmounted } from 'vue'
import { icon } from '@/plugins'
import { createComponent } from '@/packages'
import { ConfigType, CreateComponentType } from '@/packages/index.d'
import { themeColor } from '../../hooks/useLayout.hook'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { ChartModeEnum, ChartLayoutStoreEnum } from '@/store/modules/chartLayoutStore/chartLayoutStore.d'
import { useChartLayoutStore } from '@/store/modules/chartLayoutStore/chartLayoutStore'
import { isString, addEventListener, removeEventListener } from '@/utils'
import { fetchConfigComponent, fetchChartComponent } from '@/packages/index'
import { componentInstall, loadingStart, loadingFinish, loadingError } from '@/utils'
import { ChartGlobImage } from '@/components/Pages/ChartGlobImage'


const props = defineProps({
  menuOptions: {
    type: Array,
    default: () => []
  }
})

const chartEditStore = useChartEditStore()
const chartLayoutStore = useChartLayoutStore()
const { SearchIcon, AlbumsIcon, GridIcon } = icon.ionicons5
const isFocus = ref<boolean>(false)
const showPopover = ref<boolean>(false)
const loading = ref<boolean | undefined>(undefined)
const search = ref<string | null>(null)
const searchRes = ref<ConfigType[]>([])
const chartMode = ref<ChartModeEnum>(chartLayoutStore.getChartType)

const chartModeList = [
  { label: 'Cột đơn', icon: AlbumsIcon, value: ChartModeEnum.SINGLE },
  { label: 'Hai cột', icon: GridIcon, value: ChartModeEnum.DOUBLE }
]

// Trích xuất mảng thành phần
const listFormatHandle = (options: any[]) => {
  const arr = []
  for (const item of options) {
    arr.push(...item.list)
  }
  return arr
}

// thành phầnDanh sách
const List = listFormatHandle(props.menuOptions as unknown as ConfigType[])

// Đóng xử lý
const closeHandle = () => {
  loading.value = undefined
  showPopover.value = false
  search.value = null
  searchRes.value = []
}

// Xử lý tìm kiếm
const searchHandle = (key: string | null) => {
  if (!isString(key) || !key.length) {
    closeHandle()
    return
  }
  loading.value = true
  showPopover.value = true
  searchRes.value = List.filter(
    (e: ConfigType) => !e.disabled && (!key || e.title.toLowerCase().includes(key.toLowerCase()))
  )
  setTimeout(() => {
    loading.value = undefined
  }, 500)
}

// Đóng xử lý
const listenerCloseHandle = (e: Event) => {
  if (!showPopover.value) return
  if (!e.target) return
  if (!(e.target as any).closest('.go-chart-search')) {
    closeHandle()
  }
}

// Chọn xử lý
const selectChartHandle = async (item: ConfigType) => {
  if (item.disabled) return
  try {
    loadingStart()
    // Dynamic (Động)đăng kýBiểu đồThành phần
    componentInstall(item.chartKey, fetchChartComponent(item))
    componentInstall(item.conKey, fetchConfigComponent(item))
    // tạo mớiBiểu đồThành phần
    let newComponent: CreateComponentType = await createComponent(item)
    if (item.redirectComponent) {
      item.dataset && (newComponent.option.dataset = item.dataset)
      newComponent.chartConfig.title = item.title
      newComponent.chartConfig.chartFrame = item.chartFrame
    }
    // Thêm vào
    chartEditStore.addComponentList(newComponent, false, true)
    // đã chọn
    chartEditStore.setTargetSelectChart(newComponent.id)
    // Xóa tìm kiếm
    closeHandle()
    loadingFinish()
  } catch (error) {
    loadingError()
    window['$message'].warning(`Biểu đồ đang phát triển, chờ xíu nha...`)
  }
}

// Cài đặt tiêu điểm
const focusHandle = (value: boolean) => {
  isFocus.value = value
}

// Ôn lạiBiểu đồPhương thức hiển thị
const changeChartModeType = (value: ChartModeEnum) => {
  chartMode.value = value
  chartLayoutStore.setItem(ChartLayoutStoreEnum.Chart_TYPE, value)
}

addEventListener(document, 'click', (e: Event) => {
  listenerCloseHandle(e)
})

onUnmounted(() => {
  removeEventListener(document, 'click', listenerCloseHandle)
})
</script>

<style lang="scss" scoped>
$width: 98px;
$searchWidth: 176px;

@include go('chart-search-box') {
  display: flex;
  .chart-search {
    width: $width;
    margin-right: 10px;
    &.chart-search-focus {
      width: $searchWidth;
      &.chart-search {
        margin-right: 0;
      }
    }
    @include deep() {
      .chart-search-popover {
        padding-left: 5px;
        padding-right: 8px;
      }
    }
    .chart-search-popover {
      .search-list-box {
        width: 163px;
        .list-item {
          z-index: 2;
          position: relative;
          cursor: pointer;
          padding: 2px;
          padding-left: 6px;
          margin-bottom: 5px;
          &-fs {
            font-size: 12px;
          }
          &-img {
            height: 20px;
            max-width: 30px;
            margin-right: 5px;
            border-radius: 5px;
          }
          & > svg {
            min-width: 20px;
            min-height: 20px;
            margin-right: 5px;
          }
          &:hover {
            &::before {
              content: '';
              position: absolute;
              width: 3px;
              height: 100%;
              left: 0;
              top: 0;
              border-radius: 2px;
              background-color: v-bind('themeColor');
            }
            &::after {
              z-index: -1;
              content: '';
              position: absolute;
              width: 100%;
              height: 100%;
              opacity: 0.1;
              left: 0;
              top: 0;
              border-radius: 5px;
              background-color: v-bind('themeColor');
            }
          }
        }
      }
    }
  }
  .btn-group {
    width: 68px;
    overflow: hidden;
    &.btn-group-focus {
      width: 0px;
    }
  }
}
</style>
