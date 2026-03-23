<template>
  <n-grid :x-gap="8" :y-gap="8" :cols="2">
    <n-gi v-for="item in list" :key="item.value">
      <div
        class="theme-item"
        :class="{ active: item.value === vChartThemeName }"
        size="small"
        @click="selectThemeHandle(item)"
      >
        <n-ellipsis class="go-mr-1" style="text-align: left">{{ item.name }} </n-ellipsis>
        <n-space :wrap="false" :wrap-item="false" :size="2">
          <span
            class="theme-color-item"
            v-for="colorItem in item.colors"
            :key="colorItem"
            :style="{ backgroundColor: colorItem }"
          ></span>
        </n-space>
      </div>
    </n-gi>
  </n-grid>
  <div class="go-my-4">{{ $t('phase7.auto_203') }}</div>
  <n-grid :x-gap="8" :y-gap="8" :cols="2">
    <n-gi v-for="item in industryList" :key="item.value">
      <div
        class="theme-item"
        :class="{ active: item.value === vChartThemeName }"
        size="small"
        @click="selectThemeHandle(item)"
      >
        <n-ellipsis class="go-mr-2" style="text-align: left">{{ item.name }} </n-ellipsis>
        <n-space :wrap="false" :wrap-item="false" :size="2">
          <span
            class="theme-color-item"
            v-for="colorItem in item.colors"
            :key="colorItem"
            :style="{ backgroundColor: colorItem }"
          ></span>
        </n-space>
      </div>
    </n-gi>
  </n-grid>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useVCharts } from '@/hooks'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { EditCanvasConfigEnum } from '@/store/modules/chartEditStore/chartEditStore.d'
import { useDesignStore } from '@/store/modules/designStore/designStore'

const chartEditStore = useChartEditStore()
const designStore = useDesignStore()
const vCharts = useVCharts()
const themeMap = vCharts.getThemeMap()

const vChartThemeName = computed(() => {
  return chartEditStore.getEditCanvasConfig.vChartThemeName
})

// màu sắc
const themeColor = computed(() => {
  return designStore.getAppTheme
})

const list = ref<
  Array<{
    name: string
    value: keyof typeof themeMap
    colors: string[]
  }>
>([
  {
    name: window['$t']('views_components.auto_63'),
    value: 'vScreenVolcanoBlue',
    colors: ['#2D64DD', '#284588', '#58B4B6']
  },
  {
    name: window['$t']('views_components.auto_68'),
    value: 'vScreenPartyRed',
    colors: ['#d3d3d4', '#d68a46', '#d74f3c']
  },
  {
    name: window['$t']('views_components.auto_72'),
    value: 'vScreenClean',
    colors: ['#94AF60', '#7696B8', '#d6837a']
  },
  {
    name: window['$t']('views_components.auto_79'),
    value: 'vScreenOutskirts',
    colors: ['#A7C4E6', '#e1bf99', '#c0bcbb']
  },
  {
    name: window['$t']('views_components.auto_64'),
    value: 'vScreenBlueOrange',
    colors: ['#acd5fa', '#cc896b', '#5ea4dd']
  },
  {
    name: window['$t']('views_components.auto_70'),
    value: 'vScreenFinanceYellow',
    colors: ['#d7d7d7', '#f09761', '#f7d177']
  },
  {
    name: window['$t']('views_components.auto_75'),
    value: 'vScreenWenLvCyan',
    colors: ['#63c6ba', '#dcb974', '#a34440']
  },
  {
    name: window['$t']('views_components.auto_76'),
    value: 'vScreenElectricGreen',
    colors: ['#75faf2', '#ee813e', '#f4ce7f']
  },
  {
    name: window['$t']('views_components.auto_62'),
    value: 'vScreenECommercePurple',
    colors: ['#6d4cf6', '#ed7266', '#5f83f7']
  },
  {
    name: window['$t']('views_components.auto_66'),
    value: 'vScreenRedBlue',
    colors: ['#2e6cf6', '#bc4741', '#c1e4fb']
  }
])

// Danh sách phiên bản màu ngành
const industryList = ref<
  Array<{
    name: string
    value: keyof typeof themeMap
    colors: string[]
  }>
>([
  {
    name: window['$t']('views_components.auto_80'),
    value: 'light',
    colors: ['#3063f6', '#5dc3f9', '#f1f2f5']
  },
  {
    name: window['$t']('views_components.auto_85'),
    value: 'dark',
    colors: ['#3063f6', '#5dc3f9', '#414348']
  },
  {
    name: window['$t']('views_components.auto_84'),
    value: 'veODesignLightFinance',
    colors: ['#dbba95', '#314b5e', '#f1f2f5']
  },
  {
    name: window['$t']('views_components.auto_86'),
    value: 'veODesignDarkFinance',
    colors: ['#dbba95', '#314b5e', '#414348']
  },
  {
    name: window['$t']('views_components.auto_67'),
    value: 'veODesignLightGovernment',
    colors: ['#c0403a', '#f6c552', '#f1f2f5']
  },
  {
    name: window['$t']('views_components.auto_78'),
    value: 'veODesignDarkGovernment',
    colors: ['#c0403a', '#f6c552', '#414348']
  },
  {
    name: window['$t']('views_components.auto_81'),
    value: 'veODesignLightConsumer',
    colors: ['#3f36ab', '#eb4854', '#f1f2f5']
  },
  {
    name: window['$t']('views_components.auto_74'),
    value: 'veODesignDarkConsumer',
    colors: ['#3f36ab', '#eb4854', '#414348']
  },
  {
    name: window['$t']('views_components.auto_83'),
    value: 'veODesignLightAutomobile',
    colors: ['#1515d1', '#abb6cd', '#f1f2f5']
  },
  {
    name: window['$t']('views_components.auto_71'),
    value: 'veODesignDarkAutomobile',
    colors: ['#1515d1', '#abb6cd', '#414348']
  },
  {
    name: window['$t']('views_components.auto_69'),
    value: 'veODesignLightCulturalTourism',
    colors: ['#77b897', '#3c5a4b', '#f1f2f5']
  },
  {
    name: window['$t']('views_components.auto_77'),
    value: 'veODesignDarkCulturalTourism',
    colors: ['#77b897', '#3c5a4b', '#414348']
  },
  {
    name: window['$t']('views_components.auto_65'),
    value: 'veODesignLightMedical',
    colors: ['#76d0d1', '#314787', '#f1f2f5']
  },
  {
    name: window['$t']('views_components.auto_82'),
    value: 'veODesignDarkMedical',
    colors: ['#76d0d1', '#314787', '#414348']
  },
  {
    name: window['$t']('views_components.auto_61'),
    value: 'veODesignLightNewEnergy',
    colors: ['#64d886', '#1f3b76', '#f1f2f5']
  },
  {
    name: window['$t']('views_components.auto_73'),
    value: 'veODesignDarkNewEnergy',
    colors: ['#64d886', '#1f3b76', '#414348']
  }
])

const selectThemeHandle = (item: { name: string; value: keyof typeof themeMap; colors: string[] }) => {
  vCharts.setTheme(item.value)
  chartEditStore.setEditCanvasConfig(EditCanvasConfigEnum.VCHART_THEME_NAME, item.value)
}
</script>

<style lang="scss" scoped>
$radius: 6px;
$itemRadius: 2px;
.theme-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 34px;
  padding: 0 8px;
  overflow: hidden;
  cursor: pointer;
  font-size: 13px;
  border-radius: $radius;
  @include fetch-bg-color('background-color4-shallow');
  &.active {
    color: v-bind('themeColor');
  }
  .theme-color-item {
    display: inline-block;
    width: 16px;
    height: 16px;
    border-radius: $itemRadius;
  }
}
</style>
