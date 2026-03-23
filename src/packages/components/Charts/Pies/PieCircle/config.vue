<template>
  <!-- Vòng lặp seriesList -->
  <CollapseItem v-for="(item, index) in config.series" :key="index" :name="window['$t']('packages.auto_242')" :expanded="true">
    <SettingItemBox :name="$t('packages.auto_243')"
>
      <SettingItem :name="$t('packages.auto_239')"
>
        <n-input-number v-model:value="config.dataset" :min="0" :max="1" :step="0.01" size="small" :placeholder="$t('packages.auto_239')"
>
        </n-input-number>
      </SettingItem>
    </SettingItemBox>
    <!-- Tiêu đề Center -->
    <SettingItemBox v-if="config.title" :name="$t('packages.auto_329')"
>
      <SettingItem :name="$t('packages.auto_21')"
>
        <n-color-picker size="small" :modes="['hex']" v-model:value="config.title.textStyle.color"></n-color-picker>
      </SettingItem>
      <SettingItem :name="$t('packages.auto_223')"
>
        <n-input-number
          v-model:value="config.title.textStyle.fontSize"
          :min="0"
          :step="1"
          size="small"
          :placeholder="$t('packages.auto_223')"

        >
        </n-input-number>
      </SettingItem>
    </SettingItemBox>
    <!-- Echarts Cấu hình toàn cầu -->
    <SettingItemBox :name="$t('packages.auto_291')"
>
      <SettingItem :name="$t('packages.auto_21')"
>
        <n-color-picker size="small" :modes="['hex']" v-model:value="item.data[0].itemStyle.color"></n-color-picker>
      </SettingItem>
      <SettingItem :name="$t('packages.auto_332')"
>
        <n-input-number
          v-model:value="item.data[0].itemStyle.shadowBlur"
          :min="0"
          :max="50"
          :step="1"
          size="small"
          :placeholder="$t('packages.auto_332')"

        >
        </n-input-number>
      </SettingItem>
      <SettingItem :name="$t('packages.auto_330')"
>
        <n-color-picker
          size="small"
          :modes="['hex']"
          v-model:value="item.data[0].itemStyle.shadowColor"
        ></n-color-picker>
      </SettingItem>
    </SettingItemBox>
    <!-- Style khách -->
    <SettingItemBox :name="$t('packages.auto_283')"
>
      <SettingItem :name="$t('packages.auto_21')"
>
        <n-color-picker size="small" :modes="['hex']" v-model:value="item.data[1].itemStyle.color"></n-color-picker>
      </SettingItem>
      <SettingItem :name="$t('packages.auto_332')"
>
        <n-input-number
          v-model:value="item.data[1].itemStyle.shadowBlur"
          :min="0"
          :step="1"
          size="small"
          :placeholder="$t('packages.auto_332')"

        >
        </n-input-number>
      </SettingItem>
      <SettingItem :name="$t('packages.auto_330')"
>
        <n-color-picker
          size="small"
          :modes="['hex']"
          v-model:value="item.data[1].itemStyle.shadowColor"
        ></n-color-picker>
      </SettingItem>
      <SettingItem :name="$t('packages.auto_327')"
>
        <n-select
          v-model:value="item.radius[0]"
          size="small"
          :options="[
            { label: window['$t']('packages.auto_326'), value: '75%' },
            { label: window['$t']('packages.auto_325'), value: '60%' },
            { label: window['$t']('packages.auto_328'), value: '45%' },
            { label: window['$t']('packages.auto_331'), value: '30%' }
          ]"
        />
      </SettingItem>
    </SettingItemBox>
  </CollapseItem>
</template>

<script setup lang="ts">
import { PropType, computed } from 'vue'
// Sau đây là thành phần bố trí mô-đun cài đặt được đóng gói. Hiệu ứng cụ thể có thể được xem trên trang web chính thức.
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
</script>
