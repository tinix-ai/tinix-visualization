<template>
  <CollapseItem :name="$t('packages.auto_456')"
 :expanded="true">
    <SettingItemBox :name="$t('packages.auto_451')"
>
      <SettingItem>
        <n-select v-model:value="optionData.color_type" :options="colorOptions" @update:value="handleColorChange" />
      </SettingItem>
    </SettingItemBox>
    <SettingItemBox :name="$t('packages.auto_452')"
>
      <SettingItem>
        <n-color-picker size="small" :modes="['hex']" v-model:value="optionData.o_color"></n-color-picker>
      </SettingItem>
    </SettingItemBox>
    <SettingItemBox :name="$t('packages.auto_458')"
>
      <SettingItem>
        <n-color-picker size="small" :modes="['hex']" v-model:value="optionData.i_color"></n-color-picker>
      </SettingItem>
    </SettingItemBox>
    <SettingItemBox :name="$t('packages.auto_450')"
>
      <SettingItem>
        <n-select v-model:value="optionData.line_class" :options="options" />
      </SettingItem>
    </SettingItemBox>
  </CollapseItem>
</template>

<script setup lang="ts">
import { PropType, ref } from 'vue'
import { CollapseItem, SettingItemBox, SettingItem } from '@/components/Pages/ChartItemSetting'
import { option } from './config'

const props = defineProps({
  optionData: {
    type: Object as PropType<typeof option>,
    required: true
  }
})

const options = ref([
  {
    value: 'svg_ani_flow',
    label: window['$t']('packages.auto_453')
  },
  {
    value: 'svg_ani_flow_back',
    label: window['$t']('packages.auto_454')
  },
  {
    value: 'svg_ani_flow_stop',
    label: window['$t']('packages.auto_449')
  }
])

const colorOptions = ref([
  {
    value: 1,
    label: window['$t']('packages.auto_455')
  },
  {
    value: 2,
    label: window['$t']('packages.auto_457')
  }
])

// Màu mặc định
const handleColorChange = (e: number) => {
  switch (e) {
    case 1:
      props.optionData.o_color = '#0a7ae2'
      props.optionData.i_color = '#119bfa'
      break
    case 2:
      props.optionData.o_color = '#ff9d00'
      props.optionData.i_color = '#f7ea37'
      break
  }
}
</script>
