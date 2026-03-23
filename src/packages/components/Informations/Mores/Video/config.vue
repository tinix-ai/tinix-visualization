<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable vue/no-mutating-props -->
<template>
  <collapse-item :name="$t('packages.auto_566')"
 expanded>
    <setting-item-box :name="$t('packages.auto_568')"
 alone>
      <setting-item :name="$t('packages.auto_569')"
>
        <n-input v-model:value="optionData.dataset" size="small"></n-input>
      </setting-item>
    </setting-item-box>

    <setting-item-box :name="$t('packages.auto_567')"
>
      <setting-item>
        <n-checkbox v-model:checked="optionData.loop" size="small">{{ $t('phase7.auto_390') }}</n-checkbox>
      </setting-item>
      <setting-item>
        <n-checkbox v-model:checked="optionData.muted" size="small">{{ $t('phase7.auto_190') }}</n-checkbox>
      </setting-item>
    </setting-item-box>

    <setting-item-box :name="$t('packages.auto_150')"
>
      <setting-item :name="$t('packages.auto_116')"
>
        <n-select v-model:value="optionData.fit" size="small" :options="fitList"></n-select>
      </setting-item>
    </setting-item-box>
  </collapse-item>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { option } from './config'
import { CollapseItem, SettingItemBox, SettingItem } from '@/components/Pages/ChartItemSetting'

// Kiểu thích ứng
const fitList = [
  {
    value: 'fill',
    label: 'fill'
  },
  {
    value: 'contain',
    label: 'contain'
  },
  {
    value: 'cover',
    label: 'cover'
  },
  {
    value: 'scale-down',
    label: 'scale-down'
  },
  {
    value: 'none',
    label: 'none'
  }
]

defineProps({
  optionData: {
    type: Object as PropType<typeof option>,
    required: true
  }
})
</script>
