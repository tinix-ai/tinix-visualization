<template>
  <collapse-item :name="$t('packages.auto_18')"
 :expanded="true">
    <setting-item-box :name="$t('packages.auto_396')"
 :alone="true">
      <setting-item>
        <n-input v-model:value="optionData.dataset" type="textarea" size="small"></n-input>
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

      <setting-item :name="$t('packages.auto_581')"
>
        <n-input-number v-model:value="optionData.letterSpacing" size="small" :placeholder="$t('packages.auto_579')"
></n-input-number>
      </setting-item>
    </setting-item-box>
    <setting-item-box :name="$t('packages.auto_139')"
>
      <setting-item>
        <n-space>
          <n-switch v-model:value="optionData.showShadow" size="small" />
          <n-text>{{ $t('phase7.auto_310') }}</n-text>
        </n-space>
      </setting-item>
      <setting-item :name="$t('packages.auto_21')"
>
        <n-color-picker size="small" :modes="['hex']" v-model:value="optionData.colorShadow"></n-color-picker
      ></setting-item>
      <setting-item name="x">
        <n-input-number v-model:value="optionData.hShadow" size="small"></n-input-number
      ></setting-item>
      <setting-item name="y">
        <n-input-number v-model:value="optionData.vShadow" size="small"></n-input-number
      ></setting-item>
      <setting-item :name="$t('packages.auto_464')"
>
        <n-input-number v-model:value="optionData.blurShadow" size="small"></n-input-number
      ></setting-item>
    </setting-item-box>

    <setting-item-box :name="$t('packages.auto_351')"
>
      <setting-item :name="$t('packages.auto_577')"
>
        <n-input-number
          v-model:value="optionData.animationSpeed"
          size="small"
          :placeholder="$t('packages.auto_577')"

          :min="0"
        ></n-input-number>
      </setting-item>
      <setting-item :name="$t('packages.auto_580')"
>
        <n-input-number
          v-model:value="optionData.animationTime"
          size="small"
          :placeholder="$t('packages.auto_580')"

          :min="0"
        ></n-input-number>
      </setting-item>
    </setting-item-box>
  </collapse-item>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { option, FontWeightEnum, FontWeightObject } from './config'
import { CollapseItem, SettingItemBox, SettingItem } from '@/components/Pages/ChartItemSetting'
const props = defineProps({
  optionData: {
    type: Object as PropType<typeof option>,
    required: true
  }
})

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
</script>
