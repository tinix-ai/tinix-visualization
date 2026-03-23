<template>
  <CollapseItem :name="$t('packages.auto_12')"
 :expanded="true">
    <SettingItemBox :name="$t('packages.auto_163')"
>
      <SettingItem :name="$t('packages.auto_614')"
>
        <n-input-number
          v-model:value="optionData.rowNum"
          :min="1"
          size="small"
          :placeholder="$t('packages.auto_611')"

        ></n-input-number>
      </SettingItem>
      <SettingItem :name="$t('packages.auto_615')"
>
        <n-input-number
          v-model:value="optionData.waitTime"
          :min="1"
          size="small"
          :placeholder="$t('packages.auto_607')"

        ></n-input-number>
      </SettingItem>
      <SettingItem :name="$t('packages.auto_649')"
>
        <n-input-number
          v-model:value="optionData.headerHeight"
          :min="1"
          size="small"
          :placeholder="$t('packages.auto_651')"

        ></n-input-number>
      </SettingItem>
      <SettingItem :name="$t('packages.auto_650')"
>
        <n-switch size="small" v-model:value="optionData.index" />
      </SettingItem>
    </SettingItemBox>

    <SettingItemBox :name="$t('packages.auto_217')"
 :alone="true">
      <SettingItem :name="$t('packages.auto_648')"
>
        <n-input v-model:value="header" :min="1" size="small" placeholder="tiêu đềDữ liệu(Tiếng Anh','Phútcắt)"></n-input>
      </SettingItem>
      <SettingItem :name="$t('packages.auto_647')"
>
        <n-input v-model:value="align" :min="1" size="small" placeholder="Dóng hàng Align(Tiếng Anh','Phútcắt)"></n-input>
      </SettingItem>
      <SettingItem :name="$t('packages.auto_654')"
>
        <n-input v-model:value="columnWidth" :min="1" size="small" placeholder="Danh sáchChiều rộng(Tiếng Anh','Phútcắt)"></n-input>
      </SettingItem>
      <SettingItem :name="$t('packages.auto_644')"
>
        <n-select
          v-model:value="optionData.carousel"
          :options="[
            { label: window['$t']('packages.auto_652'), value: 'single' },
            { label: window['$t']('packages.auto_646'), value: 'page' },
          ]"
        />
      </SettingItem>
    </SettingItemBox>

    <SettingItemBox :name="$t('packages.auto_150')"
>
      <SettingItem :name="$t('packages.auto_645')"
>
        <n-color-picker size="small" :modes="['hex']" v-model:value="optionData.headerBGC"></n-color-picker>
      </SettingItem>
      <SettingItem :name="$t('packages.auto_653')"
>
        <n-color-picker size="small" :modes="['hex']" v-model:value="optionData.oddRowBGC"></n-color-picker>
      </SettingItem>
      <SettingItem :name="$t('packages.auto_643')"
>
        <n-color-picker size="small" :modes="['hex']" v-model:value="optionData.evenRowBGC"></n-color-picker>
      </SettingItem>
    </SettingItemBox>
  </CollapseItem>
</template>

<script setup lang="ts">
import { PropType, ref, watch } from 'vue'
import { CollapseItem, SettingItemBox, SettingItem } from '@/components/Pages/ChartItemSetting'
import { option } from './config'

const props = defineProps({
  optionData: {
    type: Object as PropType<typeof option>,
    required: true
  }
})

const header = ref()
const align = ref()
const columnWidth = ref()

watch(
  () => props.optionData,
  newData => {
    header.value = props.optionData.header.toString()
    align.value = props.optionData.align.toString()
    columnWidth.value = props.optionData.columnWidth.toString()
  },
  {
    deep: false,
    immediate: true
  }
)

watch([header, align, columnWidth], ([headerNew, alignNew, columnWidthNew], [headerOld, alignOld, columnWidthOld]) => {
  if (headerNew !== headerOld) {
    props.optionData.header = headerNew.split(',')
  }
  if (alignNew !== alignOld) {
    props.optionData.align = alignNew.split(',')
  }
  if (columnWidthNew !== columnWidthOld) {
    // @ts-ignore
    props.optionData.columnWidth = columnWidthNew.split(',')
  }
})
</script>
