<template>
  <!-- thanh bên vàDữ liệuPhútXử lý tóc -->
  <div class="go-chart-common">
    <div
      v-show="hidePackageOneCategory"
      class="chart-menu-width icon-mode"
    >
      <n-menu
        v-model:value="selectValue"
        :options="packages.menuOptions"
        :icon-size="22"
        :indent="0"
        :collapsed="true"
        :collapsed-width="48"
        :collapsed-icon-size="24"
        @update:value="clickItemHandle"
      ></n-menu>
    </div>
    <div class="chart-content-list">
      <n-scrollbar trigger="none">
        <charts-item-box :menuOptions="packages.selectOptions" @deletePhoto="deleteHandle"></charts-item-box>
      </n-scrollbar>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed, reactive, h } from 'vue'
import { NTooltip, NIcon } from 'naive-ui'
import { ConfigType } from '@/packages/index.d'
import { useSettingStore } from '@/store/modules/settingStore/settingStore'
import { SettingStoreEnums } from '@/store/modules/settingStore/settingStore.d'
import { loadAsyncComponent } from '@/utils'
import { usePackagesStore } from '@/store/modules/packagesStore/packagesStore'
import { PackagesCategoryEnum } from '@/packages/index.d'
import { icon } from '@/plugins'

const {
  BarChartIcon,
  PulseIcon,
  PieChartIcon,
  PawIcon,
  GlobeIcon,
  MoreIcon,
  ListIcon,
  DocumentTextIcon,
  ImageIcon,
  AppsIcon,
  ColorPaletteIcon,
  GridIcon
} = icon.ionicons5

const ChartsItemBox = loadAsyncComponent(() => import('../ChartsItemBox/index.vue'))
const packagesStore = usePackagesStore()

const props = defineProps({
  selectOptions: {
    type: Object,
    default: () => {}
  }
})

// trốnCài Đặt Chỉnh
const settingStore = useSettingStore()

const hidePackageOneCategory = computed(() => {
  if (packages.categorysNum > 2) return true
  return !settingStore.getHidePackageOneCategory
})

// * Mapping Icon cho các phân loại
const categoryIconMap: Record<string, any> = {
  all: GridIcon,
  Bars: BarChartIcon,
  Lines: PulseIcon,
  Pies: PieChartIcon,
  Scatters: PawIcon,
  Maps: GlobeIcon,
  Mores: MoreIcon,
  Tables: ListIcon,
  Informations: DocumentTextIcon,
  Photos: ImageIcon,
  Icons: AppsIcon,
  Decorates: ColorPaletteIcon
}

// * Icon hóa danh mục với Tooltip
const renderIcon = (key: string, label: string) => {
  // Tìm icon phù hợp, fallback về AppsIcon
  const IconComp = categoryIconMap[key] || categoryIconMap[key.split('Charts')[0]] || AppsIcon
  
  return () => h(
    NTooltip,
    { trigger: 'hover', placement: 'right', style: 'padding: 8px 12px; border-radius: 8px; font-size: 13px' },
    {
      trigger: () => h(
        'div', 
        { class: 'category-icon-wrapper' }, 
        [
          h(NIcon, { size: 22 }, { default: () => h(IconComp) })
        ]
      ),
      default: () => label
    }
  )
}

let packages = reactive<{
  [T: string]: any
}>({
  // thanh bên
  menuOptions: [],
  // Lựa chọn hiện tại
  selectOptions: {},
  // PhútLưu trữ lớp học
  categorys: {
    all: []
  },
  categoryNames: {
    all: window['$t']('phase7.auto_182')
  },
  // PhútSố lượng tài liệu lưu trữ của lớp
  categorysNum: 0,
  // Lưu trữ các thành phần thuộc các danh mục khác nhau đi kèmTrạng Trái Hover Activegiá trị
  saveSelectOptions: {}
})

const selectValue = ref<string>('all')

// Cài Đặt Chỉnhban đầuDanh sách
const setSelectOptions = (categorys: any) => {
  for (const val in categorys) {
    packages.selectOptions = categorys[val]
    break
  }
}

watch(
  // @ts-ignore
  () => props.selectOptions,
  (newData: { list: ConfigType[] }) => {
    packages.categorysNum = 0
    if (!newData) return
    newData.list.forEach((e: ConfigType) => {
      const value: ConfigType[] = (packages.categorys as any)[e.category]
      packages.categorys[e.category] = value && value.length ? [...value, e] : [e]
      packages.categoryNames[e.category] = e.categoryName
      packages.categorys['all'].push(e)
    })
    packages.menuOptions = []
    for (const val in packages.categorys) {
      packages.categorysNum += 1
      packages.menuOptions.push({
        key: val,
        label: packages.categoryNames[val],
        icon: renderIcon(val, packages.categoryNames[val])
      })
    }
    setSelectOptions(packages.categorys)
    // mặc địnhTrạng Trái Hover Activeđối phó với
    selectValue.value = packages.menuOptions[0]['key']
  },
  {
    immediate: true
  }
)

watch(
  () => packagesStore.newPhoto,
  newPhoto => {
    if (!newPhoto) return
    const newPhotoCategory = newPhoto.category
    packages.categorys[newPhotoCategory].splice(1, 0, newPhoto)
    packages.categorys['all'].splice(1, 0, newPhoto)
  }
)

// {{ $t('phase7.auto_87') }}hình ảnh
const deleteHandle = (item: ConfigType, index: number) => {
  packages.categorys[item.category].splice(index, 1)
  packages.categorys['all'].splice(index, 1)
}

// Xử lý các nhấp chuộtSự kiện
const clickItemHandle = (key: string) => {
  packages.selectOptions = packages.categorys[key]
}
</script>

<style lang="scss" scoped>
/* cái này{{ $t('phase7.auto_126') }}Và ContentBox Hiệp hội thành phần*/
$topHeight: 40px;
$iconModeWidth: 48px;

@include go('chart-common') {
  display: flex;
  height: calc(100vh - #{$--header-height} - #{$topHeight});
  .chart-menu-width {
    position: relative;
    width: $iconModeWidth;
    flex-shrink: 0;
    @include fetch-bg-color('background-color2-shallow');
    @extend .go-transition-quick;
    border-right: 1px solid rgba(255, 255, 255, 0.05);

    &.icon-mode {
       overflow: hidden;
    }
  }

  .chart-content-list {
    width: 200px;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    @include fetch-bg-color('background-color2');
  }

  @include deep() {
    .category-icon-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 38px;
      height: 38px;
      border-radius: 12px;
      margin: 0 auto;
      @extend .go-transition-quick;
      
      &:hover {
        background: rgba(255, 255, 255, 0.1);
      }
    }

    .n-menu {
      .n-menu-item {
        height: 48px;
        margin: 6px 0;
        
        &.n-menu-item--selected {
          .category-icon-wrapper {
            background: rgba(46, 161, 255, 0.15);
            color: #2ea1ff;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          }
          &::before {
            background-color: transparent !important;
          }
        }
        
        .n-menu-item-content {
          padding: 0 !important;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center !important;

          &::before {
             display: none;
          }
          
          .n-menu-item-content__icon {
             margin: 0 !important;
             display: flex;
             align-items: center;
             justify-content: center;
             width: 100%;
          }
          
          &.n-menu-item-content--collapsed {
            padding: 0 !important;
            justify-content: center !important;
            margin-left: 2px !important; // Adjust rightwards based on user feedback
          }
        }
      }
    }
  }
}
</style>
