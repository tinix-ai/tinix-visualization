<template>
  <collapse-item :name="$t('packages.auto_428')"
 expanded>
    <setting-item-box :name="$t('packages.auto_280')"
 alone>
      <setting-item :name="$t('packages.auto_422')"
>
        <n-input-number
          v-model:value="optionData.dataset"
          size="small"
          :min="0"
          :disabled="optionData.useEndDate"
        ></n-input-number>
      </setting-item>
      <setting-item :name="$t('packages.auto_426')"
>
        <n-date-picker v-model:value="optionData.endDate" type="datetime" :disabled="!optionData.useEndDate" />
      </setting-item>
      <setting-item>
        <n-checkbox v-model:checked="optionData.useEndDate" size="small">{{ $t('phase7.auto_279') }}</n-checkbox>
      </setting-item>
    </setting-item-box>

    <setting-item-box :name="$t('packages.auto_150')"
>
      <setting-item :name="$t('packages.auto_423')"
>
        <n-select
          v-model:value="optionData.style"
          size="small"
          :options="[
            { label: window['$t']('packages.auto_418'), value: window['$t']('packages.auto_418') },
            { label: window['$t']('packages.auto_419'), value: window['$t']('packages.auto_419') }
          ]"
        ></n-select>
      </setting-item>
      <setting-item>
        <n-checkbox v-model:checked="optionData.showDay" size="small">{{ $t('phase7.auto_248') }}</n-checkbox>
      </setting-item>
    </setting-item-box>
  </collapse-item>

  <collapse-item :name="$t('packages.auto_430')"
 expanded>
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
      <setting-item :name="$t('packages.auto_252')"
>
        <n-input-number v-model:value="optionData.flipperGap" size="small" :min="0"></n-input-number>
      </setting-item>
      <setting-item :name="$t('packages.auto_105')"
>
        <n-input-number v-model:value="optionData.flipperRadius" size="small" :min="0"></n-input-number>
      </setting-item>
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
