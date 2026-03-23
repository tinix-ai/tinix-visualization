<template>
  <template v-if="optionData.label">
    <collapse-item :name="$t('views_components.auto_412')"
>
      <template #header>
        <n-switch v-model:value="optionData.label.visible" size="small"></n-switch>
      </template>

      <setting-item-box :name="$t('views_components.auto_481')"
>
        <setting-item :name="$t('views_components.auto_390')"
>
          <n-select
            v-model:value="optionData.label.position"
            size="small"
            :options="positionOptions || labelConfig.barPosition"
          />
        </setting-item>

        <setting-item :name="$t('views_components.auto_479')"
>
          <n-input-number v-model:value="optionData.label.offset" :min="1" size="small" />
        </setting-item>
      </setting-item-box>

      <setting-item-box :name="$t('views_components.auto_480')"
>
        <FontStyle :style="toRefs(optionData.label.style)"></FontStyle>
      </setting-item-box>
    </collapse-item>
  </template>
</template>

<script setup lang="ts">
import { PropType, toRefs } from 'vue'
import { labelConfig } from '@/packages/chartConfiguration/vcharts/index'
import FontStyle from './common/FontStyle.vue'
import { vChartGlobalThemeJsonType } from '@/settings/vchartThemes/index'
import { CollapseItem, SettingItemBox, SettingItem } from '@/components/Pages/ChartItemSetting'

defineProps({
  optionData: {
    type: Object as PropType<vChartGlobalThemeJsonType>,
    required: true
  },
  positionOptions: {
    type: Array,
    required: false
  }
})
</script>
