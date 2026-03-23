<template>
  <setting-item-box :name="$t('views_components.auto_177')"
 :alone="true">
    <n-input
      type="text"
      maxlength="12"
      minlength="1"
      :placeholder="$t('views_components.auto_431')"

      size="small"
      clearable
      show-count
      v-model:value="chartConfig.title"
      @focus="handleFocus"
      @blur="handleBlur"
    ></n-input>
  </setting-item-box>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { SettingItemBox } from '@/components/Pages/ChartItemSetting'
import { ConfigType } from '@/packages/index.d'

const props = defineProps({
  chartConfig: {
    type: Object as PropType<ConfigType>,
    required: true
  },
})

let valueCatch = ''

const handleFocus = () => {
  valueCatch = props.chartConfig.title
}

const handleBlur = () => {
  if(!props.chartConfig.title.length) {
    window['$message'].warning(window['$t']('views_components.auto_430'))
    props.chartConfig.title = valueCatch 
  }
}
</script>
