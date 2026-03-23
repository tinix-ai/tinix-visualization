<template>
  <!-- todo Bổ sung các item config thường dùng -->
  <div v-if="optionData.tooltip">
    <collapse-item :name="$t('views_components.auto_496')"
>
      <template #header>
        <n-switch v-model:value="optionData.tooltip.visible" size="small"></n-switch>
      </template>
      <setting-item-box :name="$t('views_components.auto_497')"
>
        <setting-item :name="$t('views_components.auto_493')"
>
          <n-color-picker v-model:value="optionData.tooltip.style.panel.backgroundColor" size="small" />
        </setting-item>
        <setting-item :name="$t('views_components.auto_495')"
>
          <n-color-picker v-model:value="optionData.tooltip.style.panel.border.color" size="small" />
        </setting-item>
        <setting-item :name="$t('views_components.auto_403')"
>
          <n-input-number v-model:value="optionData.tooltip.style.panel.border.width" :min="0" size="small" />
        </setting-item>
        <setting-item :name="$t('views_components.auto_498')"
>
          <n-input-number v-model:value="optionData.tooltip.style.panel.border.radius" :min="0" size="small" />
        </setting-item>
      </setting-item-box>
      <setting-item-box :name="$t('views_components.auto_397')"
>
        <FontStyle :style="toRefs(optionData.tooltip.style.titleLabel)"></FontStyle>
      </setting-item-box>
      <setting-item-box :name="$t('views_components.auto_177')"
>
        <FontStyle :style="toRefs(optionData.tooltip.style.keyLabel)"></FontStyle>
      </setting-item-box>
      <setting-item-box :name="$t('views_components.auto_494')"
>
        <FontStyle :style="toRefs(optionData.tooltip.style.valueLabel)"></FontStyle>
      </setting-item-box>
    </collapse-item>
  </div>
</template>

<script setup lang="ts">
import { PropType, toRefs } from 'vue'
import FontStyle from './common/FontStyle.vue'
import { vChartGlobalThemeJsonType } from '@/settings/vchartThemes/index'
import { CollapseItem, SettingItemBox, SettingItem } from '@/components/Pages/ChartItemSetting'

defineProps({
  optionData: {
    type: Object as PropType<vChartGlobalThemeJsonType>,
    required: true
  }
})
</script>
