<template>
  <CollapseItem :name="$t('packages.auto_280')"
 :expanded="true">
    <SettingItemBox :name="$t('packages.auto_239')"
>
      <SettingItem :name="$t('packages.auto_447')"
>
        <n-input-number
          v-model:value="optionData.dataset"
          size="small"
          :min="1"
        ></n-input-number>
      </SettingItem>
      <SettingItem :name="$t('packages.auto_104')"
>
        <n-input-number
          v-model:value="optionData.numberSize"
          size="small"
          :min="1"
        ></n-input-number>
      </SettingItem>
      <SettingItem :name="$t('packages.auto_445')"
>
        <n-input-number
          v-model:value="optionData.precision"
          size="small"
          :min="0"
        ></n-input-number>
      </SettingItem>
      <SettingItem>
        <n-space>
          <n-switch v-model:value="optionData.showSeparator" size="small" />
          <n-text>{{ $t('phase7.auto_209') }}</n-text>
        </n-space>
      </SettingItem>
    </SettingItemBox>

    <SettingItemBox :name="$t('packages.auto_239')"
>
      <SettingItem :name="$t('packages.auto_444')"
>
        <n-input v-model:value="optionData.prefixText" size="small"></n-input>
      </SettingItem>
      <SettingItem :name="$t('packages.auto_446')"
>
        <n-input v-model:value="optionData.suffixText" size="small"></n-input>
      </SettingItem>
    </SettingItemBox>

    <SettingItemBox :name="$t('packages.auto_21')"
>
      <SettingItem :name="$t('packages.auto_444')"
>
        <n-color-picker
          size="small"
          :modes="['hex']"
          v-model:value="optionData.prefixColor"
        ></n-color-picker>
      </SettingItem>
      <SettingItem :name="$t('packages.auto_446')"
>
        <n-color-picker
          size="small"
          :modes="['hex']"
          v-model:value="optionData.suffixColor"
        ></n-color-picker>
      </SettingItem>
      <SettingItem :name="$t('packages.auto_239')"
>
        <n-color-picker
          size="small"
          :modes="['hex']"
          v-model:value="optionData.numberColor"
        ></n-color-picker>
      </SettingItem>
    </SettingItemBox>
  </CollapseItem>

  <CollapseItem :name="$t('packages.auto_351')"
 :expanded="true">
    <SettingItemBox :name="$t('packages.auto_372')"
>
      <SettingItem>
        <n-input-number
          v-model:value="optionData.dur"
          size="small"
          :step="0.5"
          :min="0.5"
        ></n-input-number>
      </SettingItem>
    </SettingItemBox>
  </CollapseItem>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import {
  CollapseItem,
  SettingItemBox,
  SettingItem,
} from '@/components/Pages/ChartItemSetting'
import { option } from './config'

const props = defineProps({
  optionData: {
    type: Object as PropType<typeof option>,
    required: true,
  },
})
</script>
