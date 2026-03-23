<template>
  <div>
    <CollapseItem :name="$t('packages.auto_272')"
 :expanded="true">
      <SettingItemBox :name="$t('packages.auto_150')"
>
        <setting-item :name="$t('packages.auto_125')"
>
          <n-select v-model:value="graphConfig.layout" :options="GraphLayout" size="small" />
        </setting-item>
      </SettingItemBox>
      <SettingItemBox :name="$t('packages.auto_108')"
>
        <setting-item :name="$t('packages.auto_268')"
>
          <n-select v-model:value="graphConfig.label.show" :options="LabelSwitch" size="small" />
        </setting-item>
        <setting-item :name="$t('packages.auto_111')"
>
          <n-select v-model:value="graphConfig.label.position" :options="LabelPosition" size="small" />
        </setting-item>
      </SettingItemBox>
      <SettingItemBox :name="$t('packages.auto_118')"
>
        <SettingItem :name="$t('packages.auto_270')"
>
          <!-- Yêu cầu điền 2 chữ số thập phân mới thay đổi -->
          <n-input-number
            v-model:value="optionData.series[0].lineStyle.curveness"
            :min="0"
            :step="0.01"
            :placeholder="$t('packages.auto_269')"

            size="small"
          ></n-input-number>
        </SettingItem>
      </SettingItemBox>
      <SettingItemBox :name="$t('packages.auto_267')"
>
        <SettingItem :name="$t('packages.auto_21')"
>
          <n-color-picker
            size="small"
            :modes="['hex']"
            v-model:value="optionData.legend.textStyle.color"
          ></n-color-picker>
        </SettingItem>
        <SettingItem :name="$t('packages.auto_130')"
>
          <n-input-number
            v-model:value="optionData.legend.textStyle.fontSize"
            :min="0"
            :step="1"
            size="small"
            :placeholder="$t('packages.auto_271')"

          >
          </n-input-number>
        </SettingItem>
      </SettingItemBox>
      <SettingItemBox :name="$t('packages.auto_260')"
 v-if="optionData.series[0].force && graphConfig.layout == 'force'">
        <SettingItem :name="$t('packages.auto_265')"
 v-if="optionData.series[0].force.repulsion">
          <n-input-number
            v-model:value="optionData.series[0].force.repulsion"
            :min="0"
            :step="1"
            size="small"
            :placeholder="$t('packages.auto_275')"

          >
          </n-input-number>
        </SettingItem>
        <SettingItem :name="$t('packages.auto_266')"
 v-if="optionData.series[0].force.gravity">
          <n-input-number
            v-model:value="optionData.series[0].force.gravity"
            :min="0"
            :step="0.1"
            size="small"
            :placeholder="$t('packages.auto_266')"

          >
          </n-input-number>
        </SettingItem>
        <SettingItem :name="$t('packages.auto_264')"
>
          <n-input-number
            v-model:value="optionData.series[0].force.edgeLength"
            :min="0"
            :step="1"
            size="small"
            :placeholder="$t('packages.auto_264')"

          >
          </n-input-number>
        </SettingItem>
        <SettingItem :name="$t('packages.auto_273')"
>
          <n-select v-model:value="graphConfig.force.layoutAnimation" :options="LayoutAnimation" size="small" />
        </SettingItem>
        <SettingItem :name="$t('packages.auto_274')"
>
          <n-input-number
            v-model:value="optionData.series[0].force.friction"
            :min="0"
            :step="0.1"
            size="small"
            :placeholder="$t('packages.auto_274')"

          >
          </n-input-number>
        </SettingItem>
      </SettingItemBox>
    </CollapseItem>
  </div>
</template>

<script setup lang="ts">
import { PropType, computed } from 'vue'
import { CollapseItem, SettingItemBox, SettingItem } from '@/components/Pages/ChartItemSetting'
import { option, GraphLayout, LabelSwitch, LabelPosition, LayoutAnimation } from './config'
import { GlobalThemeJsonType } from '@/settings/chartThemes/index'

const props = defineProps({
  optionData: {
    type: Object as PropType<typeof option & GlobalThemeJsonType>,
    required: true
  }
})

const graphConfig = computed<(typeof option.series)[0]>(() => {
  return props.optionData.series[0]
})
</script>
