<template>
  <collapse-item :name="$t('packages.auto_623')"
 :expanded="true">
    <n-tag type="primary">{{ $t('phase7.auto_366') }}</n-tag>
    <setting-item-box :alone="true" :name="$t('packages.auto_626')"
>
      <setting-item :alone="true">
        <n-select
          v-model:value="optionData.align"
          size="small"
          :options="[
            { label: window['$t']('packages.auto_41'), value: 'left' },
            { label: window['$t']('packages.auto_45'), value: 'center' },
            { label: window['$t']('packages.auto_38'), value: 'right' }
          ]"
        />
      </setting-item>
    </setting-item-box>
    <setting-item-box :alone="false" :name="$t('packages.auto_526')"
>
      <setting-item :name="$t('packages.auto_524')"
 :alone="true">
        <n-input-number v-model:value="optionData.pagination.page" size="small" :placeholder="$t('packages.auto_223')"
></n-input-number>
      </setting-item>
      <setting-item :name="$t('packages.auto_525')"
 :alone="true">
        <n-select v-model:value="optionData.pagination.pageSize" size="small" :options="page" />
      </setting-item>
    </setting-item-box>
    <setting-item-box :alone="false" :name="$t('packages.auto_634')"
>
      <SettingItem :name="$t('packages.auto_636')"
 class="form_name">
        <div style="width: 260px">
          <n-input v-model:value="header" size="small" placeholder="tiêu đềDữ liệu(Tiếng Anh','Phútcắt)"></n-input>
        </div>
      </SettingItem>
    </setting-item-box>
    <setting-item-box :alone="false" :name="$t('packages.auto_622')"
>
      <SettingItem :name="$t('packages.auto_635')"
 :alone="true">
        <n-select v-model:value="(optionData as any).style.border" size="small" :options="borderFlag" />
      </SettingItem>
      <SettingItem :name="$t('packages.auto_628')"
 :alone="true">
        <n-select
          v-model:value="(optionData as any).style.bottomBordered"
          size="small"
          :options="bottom_borderedFlag"
        />
      </SettingItem>
      <SettingItem :name="$t('packages.auto_631')"
 :alone="true">
        <n-select v-model:value="(optionData as any).style.singleLine" size="small" :options="columnFlag" />
      </SettingItem>
      <SettingItem :name="$t('packages.auto_618')"
 :alone="true">
        <n-select v-model:value="(optionData as any).style.singleColumn" size="small" :options="lineFlag" />
      </SettingItem>
      <SettingItem :name="$t('packages.auto_637')"
 :alone="true">
        <n-select v-model:value="(optionData as any).style.striped" size="small" :options="stripedFlag" />
      </SettingItem>
      <setting-item :name="$t('packages.auto_223')"
 :alone="true">
        <n-input-number
          v-model:value="optionData.style.fontSize"
          :min="12"
          size="small"
          :placeholder="$t('packages.auto_223')"

        ></n-input-number>
      </setting-item>
      <setting-item :name="$t('packages.auto_620')"
 :alone="true">
        <n-input-number
          v-model:value="optionData.style.borderWidth"
          :min="0"
          size="small"
          :placeholder="$t('packages.auto_223')"

        ></n-input-number>
      </setting-item>
      <setting-item :name="$t('packages.auto_256')"
 :alone="true">
        <n-color-picker size="small" :modes="['rgb']" v-model:value="optionData.style.borderColor"></n-color-picker>
      </setting-item>
      <setting-item :name="$t('packages.auto_629')"
 :alone="true">
        <n-select v-model:value="optionData.style.borderStyle" size="small" :options="borderStyleFlag" />
      </setting-item>
      <SettingItem :name="$t('packages.auto_632')"
 :alone="true">
        <n-select v-model:value="optionData.inputShow" size="small" :options="inputSelect" />
      </SettingItem>
    </setting-item-box>
  </collapse-item>
</template>

<script setup lang="ts">
import { PropType, watch, ref } from 'vue'
import { option } from './config'
import { CollapseItem, SettingItemBox, SettingItem } from '@/components/Pages/ChartItemSetting'

const page = [
  { label: '2', value: 2 },
  { label: '5', value: 5 },
  { label: '10', value: 10 },
  { label: '15', value: 15 },
  { label: '30', value: 30 }
]
const borderFlag = [
  { label: window['$t']('packages.auto_219'), value: 'on' },
  { label: window['$t']('packages.auto_624'), value: 'off' }
]
const columnFlag = [
  { label: window['$t']('packages.auto_219'), value: 'off' },
  { label: window['$t']('packages.auto_624'), value: 'on' }
]
const lineFlag = [
  { label: window['$t']('packages.auto_219'), value: 'off' },
  { label: window['$t']('packages.auto_624'), value: 'on' }
]
const bottom_borderedFlag = [
  { label: window['$t']('packages.auto_219'), value: 'on' },
  { label: window['$t']('packages.auto_624'), value: 'off' }
]
const stripedFlag = [
  { label: window['$t']('packages.auto_219'), value: 'on' },
  { label: window['$t']('packages.auto_624'), value: 'off' }
]
const borderStyleFlag = [
  { label: window['$t']('packages.auto_633'), value: 'solid' },
  { label: window['$t']('packages.auto_630'), value: 'dashed' },
  { label: window['$t']('packages.auto_621'), value: 'dotted' },
  { label: window['$t']('packages.auto_625'), value: 'double' }
]
const inputSelect = [
  { label: window['$t']('packages.auto_619'), value: 'none' },
  { label: window['$t']('packages.auto_627'), value: 'flex' }
]
const props = defineProps({
  optionData: {
    type: Object as PropType<typeof option>,
    required: true
  }
})

const header = ref()
const median = ref<string[]>([])
props.optionData.dataset.dimensions.forEach(item => {
  median.value.push(item.title)
})

//thay đổistring
watch(
  () => props.optionData,
  () => {
    median.value = []
    props.optionData.dataset.dimensions.forEach(item => {
      median.value.push(item.title)
    })
    header.value = median.value.toString()
  },
  {
    deep: false,
    immediate: true
  }
)

//gia hạncolumns
watch([header], ([headerNew], [headerOld]) => {
  if (headerNew !== headerOld) {
    headerNew.split(',').forEach((item: string, index: number) => {
      if (index + 1 <= props.optionData.dataset.dimensions.length) {
        props.optionData.dataset.dimensions[index].title = headerNew.split(',')[index]
      }
    })
  }
})
</script>
