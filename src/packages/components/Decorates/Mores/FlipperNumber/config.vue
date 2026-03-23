<template>
  <collapse-item :name="$t('packages.auto_430')"
 :expanded="true">
    <setting-item-box :name="$t('packages.auto_280')"
>
      <setting-item :name="$t('packages.auto_438')"
>
        <n-input-number v-model:value="optionData.dataset" size="small" :min="0"></n-input-number>
      </setting-item>
      <setting-item :name="$t('packages.auto_436')"
>
        <n-input-number v-model:value="optionData.flipperLength" size="small" :min="1"></n-input-number>
      </setting-item>
    </setting-item-box>

    <setting-item-box :name="$t('packages.auto_150')"
>
      <setting-item :name="$t('packages.auto_109')"
>
        <n-input-number v-model:value="optionData.flipperWidth" size="small" :min="1"></n-input-number>
      </setting-item>
      <setting-item :name="$t('packages.auto_379')"
>
        <n-input-number v-model:value="optionData.flipperHeight" size="small" :min="1"></n-input-number>
      </setting-item>
      <setting-item :name="$t('packages.auto_368')"
>
        <n-input-number v-model:value="optionData.flipperBorderWidth" size="small" :min="0" :max="10"></n-input-number>
      </setting-item>
      <setting-item :name="$t('packages.auto_105')"
>
        <n-input-number v-model:value="optionData.flipperRadius" size="small" :min="0"></n-input-number>
      </setting-item>
      <setting-item :name="$t('packages.auto_437')"
>
        <n-input-number v-model:value="optionData.flipperGap" size="small" :min="0"></n-input-number>
      </setting-item>
      <setting-item />
      <setting-item :name="$t('packages.auto_417')"
>
        <n-color-picker
          size="small"
          :show-alpha="false"
          :modes="['hex']"
          v-model:value="optionData.flipperBgColor"
        ></n-color-picker>
      </setting-item>
      <setting-item :name="$t('packages.auto_431')"
>
        <n-color-picker size="small" :modes="['hex']" v-model:value="optionData.flipperTextColor"></n-color-picker>
      </setting-item>
    </setting-item-box>

    <setting-item-box :name="$t('packages.auto_425')"
>
      <setting-item :name="$t('packages.auto_351')"
>
        <n-select
          v-model:value="optionData.flipperType"
          size="small"
          :options="[
            { label: window['$t']('packages.auto_427'), value: 'down' },
            { label: window['$t']('packages.auto_429'), value: 'up' }
          ]"
        ></n-select>
      </setting-item>
      <setting-item :name="$t('packages.auto_424')"
>
        <n-input-number
          v-model:value="optionData.flipperSpeed"
          size="small"
          :min="100"
          :max="900"
          :step="100"
        ></n-input-number>
      </setting-item>
    </setting-item-box>
  </collapse-item>
</template>
<script setup lang="ts">
import { PropType } from 'vue'
import { CollapseItem, SettingItemBox, SettingItem } from '@/components/Pages/ChartItemSetting'
import { OptionType } from './config'

defineProps({
  optionData: {
    type: Object as PropType<OptionType>,
    required: true
  }
})
</script>
