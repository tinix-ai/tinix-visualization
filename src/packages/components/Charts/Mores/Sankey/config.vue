<template>
  <div>
    <CollapseItem :name="$t('packages.auto_314')"
 :expanded="true">
      <SettingItemBox :name="$t('packages.auto_150')"
>
        <SettingItem :name="$t('packages.auto_310')"
>
          <n-select
            v-model:value="sankeyConfig.orient"
            size="small"
            :options="orientList"
            :placeholder="$t('packages.auto_312')"

          />
        </SettingItem>
        <SettingItem :name="$t('packages.auto_311')"
>
          <n-select
            v-model:value="optionData.tooltip.show"
            size="small"
            :options="toolTipSwitch"
            :placeholder="$t('packages.auto_313')"

          />
        </SettingItem>
      </SettingItemBox>
    </CollapseItem>
  </div>
</template>

<script setup lang="ts">
import { PropType, computed } from 'vue'
import { CollapseItem, SettingItemBox, SettingItem } from '@/components/Pages/ChartItemSetting'
import { option, orientList, toolTipSwitch } from './config'
import { GlobalThemeJsonType } from '@/settings/chartThemes/index'

const props = defineProps({
  optionData: {
    type: Object as PropType<typeof option & GlobalThemeJsonType>,
    required: true
  }
})

const sankeyConfig = computed<typeof option.series>(() => {
  return props.optionData.series
})

</script>
