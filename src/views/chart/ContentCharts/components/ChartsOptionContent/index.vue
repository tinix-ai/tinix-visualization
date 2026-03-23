<template>
  <!-- thanh bên vàDữ liệuPhútXử lý tóc -->
  <div class="go-chart-common">
    <n-menu
      v-show="hidePackageOneCategory"
      class="chart-menu-width"
      v-model:value="selectValue"
      :options="packages.menuOptions"
      :icon-size="16"
      :indent="18"
      @update:value="clickItemHandle"
    ></n-menu>
    <div class="chart-content-list">
      <n-scrollbar trigger="none">
        <charts-item-box :menuOptions="packages.selectOptions" @deletePhoto="deleteHandle"></charts-item-box>
      </n-scrollbar>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed, reactive } from 'vue'
import { ConfigType } from '@/packages/index.d'
import { useSettingStore } from '@/store/modules/settingStore/settingStore'
import { loadAsyncComponent } from '@/utils'
import { usePackagesStore } from '@/store/modules/packagesStore/packagesStore'
import { PackagesCategoryEnum } from '@/packages/index.d'

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
    for (const val in packages.categorys) {
      packages.categorysNum += 1
      packages.menuOptions.push({
        key: val,
        label: packages.categoryNames[val]
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
$menuWidth: 65px;
@include go('chart-common') {
  display: flex;
  height: calc(100vh - #{$--header-height} - #{$topHeight});
  .chart-menu-width {
    width: $menuWidth;
    flex-shrink: 0;
    @include fetch-bg-color('background-color2-shallow');
  }
  .chart-content-list {
    width: 200px;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  @include deep() {
    .n-menu-item {
      height: 30px;
      &.n-menu-item--selected {
        &::before {
          background-color: rgba(0, 0, 0, 0);
        }
      }
      .n-menu-item-content {
        text-align: center;
        padding: 0px 14px !important;
        font-size: 12px !important;
      }
    }
  }
}
</style>
