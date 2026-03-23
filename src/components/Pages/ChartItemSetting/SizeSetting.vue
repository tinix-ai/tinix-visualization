<template>
  <setting-item-box :name="$t('views_components.auto_440')"
>
    <n-input-number
      v-model:value="chartAttr.w"
      :min="50"
      :disabled="isGroup"
      size="small"
      placeholder="px"
    >
      <template #prefix>
        <n-text depth="3">{{ $t('phase7.auto_83') }}</n-text>
      </template>
    </n-input-number>
    <n-input-number
      v-model:value="chartAttr.h"
      :min="50"
      :disabled="isGroup"
      size="small"
      placeholder="px"
    >
      <template #prefix>
        <n-text depth="3">{{ $t('phase7.auto_126') }}</n-text>
      </template>
    </n-input-number>
  </setting-item-box>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { PickCreateComponentType } from '@/packages/index.d'
import { SettingItemBox } from '@/components/Pages/ChartItemSetting'

const props = defineProps({
  chartAttr: {
    type: Object as PropType<Omit<PickCreateComponentType<'attr'>, 'node' | 'conNode'>>,
    required: true
  },
  isGroup: {
    type: Boolean,
    required: false
  }
})
</script>
