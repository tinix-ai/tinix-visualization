<template>
    <!-- Vòng lặp seriesList -->
    <CollapseItem :name="window['$t']('packages.auto_242')" :expanded="true">
      <SettingItemBox :name="$t('packages.auto_243')"
>
        <SettingItem :name="$t('packages.auto_239')"
>
          <n-input-number v-model:value="config.dataset" :min="dialConfig.min" :max="dialConfig.max" :step="1" size="small" :placeholder="$t('packages.auto_239')"
>
          </n-input-number>
        </SettingItem>
      </SettingItemBox>
      <!-- Echarts Cấu hình toàn cầu -->
      <!-- Font chữ kim đo -->
      <SettingItemBox :name="$t('packages.auto_244')"
>
        <SettingItem :name="$t('packages.auto_21')"
>
          <n-color-picker size="small" :modes="['hex']" v-model:value="dialConfig.axisLabel.color"></n-color-picker>
        </SettingItem>
        <SettingItem :name="$t('packages.auto_223')"
>
          <n-input-number
            v-model:value="dialConfig.axisLabel.fontSize"
            :min="0"
            :step="1"
            size="small"
            :placeholder="$t('packages.auto_223')"

          >
          </n-input-number>
        </SettingItem>
      </SettingItemBox>
      <!-- Mặt số -->
      <SettingItemBox :name="$t('packages.auto_240')"
>
        <SettingItem :name="$t('packages.auto_21')"
 >
          <n-color-picker size="small" :modes="['hex']" v-model:value="config.series[1].axisLine.lineStyle.color[1][1]"></n-color-picker>
        </SettingItem>
      </SettingItemBox>
      <!-- Kim chỉ -->
      <SettingItemBox :name="$t('packages.auto_241')"
>
        <SettingItem :name="$t('packages.auto_21')"
 >
          <n-color-picker size="small" :modes="['hex']" v-model:value="dialConfig.data[0].itemStyle.color"></n-color-picker>
        </SettingItem>
        <SettingItem :name="$t('packages.auto_109')"
>
          <n-input-number v-model:value="dialConfig.pointer.width" :min="0" :step="1" size="small" :placeholder="$t('packages.auto_239')"
>
          </n-input-number>
        </SettingItem>
      </SettingItemBox>
      <SettingItemBox :name="$t('packages.auto_238')"
>
        <SettingItem :name="$t('packages.auto_236')"
>
          <n-input-number v-model:value="dialConfig.min" :min="0" :step="1" size="small" :placeholder="$t('packages.auto_239')"
>
          </n-input-number>
        </SettingItem>
        <SettingItem :name="$t('packages.auto_237')"
>
          <n-input-number v-model:value="dialConfig.max" :min="0" :step="1" size="small" :placeholder="$t('packages.auto_239')"
>
          </n-input-number>
        </SettingItem>
        <SettingItem :name="$t('packages.auto_21')"
 >
          <n-color-picker size="small" :modes="['hex']" v-model:value="config.series[1].axisTick.lineStyle.color" @update:value="updateClick"></n-color-picker>
        </SettingItem>
      </SettingItemBox>
  
    </CollapseItem>
  </template>
  
  <script setup lang="ts">
  import { PropType, computed } from 'vue'
  import { CollapseItem, SettingItemBox, SettingItem } from '@/components/Pages/ChartItemSetting'
  import { GlobalThemeJsonType } from '@/settings/chartThemes'
  
  const props = defineProps({
    optionData: {
      type: Object as PropType<GlobalThemeJsonType>,
      required: true
    }
  })
  
  const config = computed(() => {
    return props.optionData
  })
  
  const dialConfig = computed(() => {
    return props.optionData.series[0]
  })
  
  const updateClick = (val: any) => {
    props.optionData.series[1].splitLine.lineStyle.color=val
  }
  </script>
  