<template>
  <collapse-item :name="$t('packages.auto_18')"
 :expanded="true">
    <setting-item-box :name="$t('packages.auto_396')"
 :alone="true">
      <setting-item>
        <n-input v-model:value="optionData.dataset" type="textarea" size="small"></n-input>
      </setting-item>
    </setting-item-box>
    <setting-item-box :name="$t('packages.auto_591')"
 :alone="true">
      <setting-item>
        <n-input-group>
          <n-select
            v-model:value="optionData.linkHead"
            size="small"
            :style="{ width: '80%' }"
            :options="linkHeadOptions"
          />
          <n-input v-model:value="optionData.link" size="small"></n-input>
          <n-button :disabled="!optionData.link" secondary size="small" @click="handleLinkClick">{{ $t('phase7.auto_30') }}</n-button>
        </n-input-group>
      </setting-item>
    </setting-item-box>
  </collapse-item>

  <collapse-item :name="$t('packages.auto_150')"
 :expanded="true">
    <setting-item-box :name="$t('packages.auto_396')"
>
      <setting-item :name="$t('packages.auto_21')"
>
        <n-color-picker size="small" :modes="['hex']" v-model:value="optionData.fontColor"></n-color-picker>
      </setting-item>
      <setting-item :name="$t('packages.auto_223')"
>
        <n-input-number v-model:value="optionData.fontSize" size="small" :placeholder="$t('packages.auto_223')"
></n-input-number>
      </setting-item>
      <setting-item :name="$t('packages.auto_578')"
>
        <n-select v-model:value="optionData.fontWeight" size="small" :options="fontWeightOptions" />
      </setting-item>
      <setting-item :name="$t('packages.auto_587')"
>
        <n-input-number v-model:value="optionData.paddingX" size="small" :placeholder="$t('packages.auto_588')"
></n-input-number>
      </setting-item>
      <setting-item :name="$t('packages.auto_592')"
>
        <n-input-number v-model:value="optionData.paddingY" size="small" :placeholder="$t('packages.auto_588')"
></n-input-number>
      </setting-item>

      <setting-item :name="$t('packages.auto_590')"
>
        <n-select v-model:value="optionData.textAlign" size="small" :options="textAlignOptions" />
      </setting-item>
      <setting-item :name="$t('packages.auto_585')"
>
        <n-select v-model:value="optionData.writingMode" size="small" :options="verticalOptions" />
      </setting-item>

      <setting-item :name="$t('packages.auto_581')"
>
        <n-input-number v-model:value="optionData.letterSpacing" size="small" :placeholder="$t('packages.auto_579')"
></n-input-number>
      </setting-item>
    </setting-item-box>

    <setting-item-box :name="$t('packages.auto_368')"
>
      <setting-item :name="$t('packages.auto_109')"
>
        <n-input-number
          v-model:value="optionData.borderWidth"
          size="small"
          :min="0"
          :placeholder="$t('packages.auto_109')"

        ></n-input-number>
      </setting-item>
      <setting-item :name="$t('packages.auto_21')"
>
        <n-color-picker size="small" :modes="['hex']" v-model:value="optionData.borderColor"></n-color-picker>
      </setting-item>
      <setting-item :name="$t('packages.auto_105')"
>
        <n-input-number
          v-model:value="optionData.borderRadius"
          size="small"
          :min="0"
          :placeholder="$t('packages.auto_105')"

        ></n-input-number>
      </setting-item>
    </setting-item-box>

    <setting-item-box :name="$t('packages.auto_297')"
 :alone="true">
      <setting-item :name="$t('packages.auto_201')"
>
        <n-color-picker size="small" :modes="['hex']" v-model:value="optionData.backgroundColor"></n-color-picker>
      </setting-item>
    </setting-item-box>
  </collapse-item>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { option, WritingModeEnum, WritingModeObject, FontWeightEnum, FontWeightObject } from './config'
import { CollapseItem, SettingItemBox, SettingItem } from '@/components/Pages/ChartItemSetting'
const props = defineProps({
  optionData: {
    type: Object as PropType<typeof option>,
    required: true
  }
})

const textAlignOptions = [
  { label: window['$t']('packages.auto_589'), value: 'start' },
  { label: window['$t']('packages.auto_45'), value: 'center' },
  { label: window['$t']('packages.auto_586'), value: 'end' }
]

const verticalOptions = [
  {
    label: WritingModeEnum.HORIZONTAL,
    value: WritingModeObject[WritingModeEnum.HORIZONTAL]
  },
  {
    label: WritingModeEnum.VERTICAL,
    value: WritingModeObject[WritingModeEnum.VERTICAL]
  }
]
const fontWeightOptions = [
  {
    label: FontWeightEnum.NORMAL,
    value: FontWeightObject[FontWeightEnum.NORMAL]
  },
  {
    label: FontWeightEnum.BOLD,
    value: FontWeightObject[FontWeightEnum.BOLD]
  }
]
const handleLinkClick = () => {
  window.open(props.optionData.linkHead + props.optionData.link)
}
const linkHeadOptions = [
  { label: 'http://', value: 'http://' },
  { label: 'https://', value: 'https://' }
]
</script>
