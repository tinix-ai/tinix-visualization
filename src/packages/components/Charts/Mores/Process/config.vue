<template>
  <!-- Mặc định mở rộng -->
  <CollapseItem :name="$t('packages.auto_291')"
 :expanded="true">
    <SettingItemBox :name="$t('packages.auto_280')"
>
      <SettingItem :name="$t('packages.auto_239')"
>
        <!-- Tương đương Option ở config.ts --><!-- n-input-number là NativeUI Plugin -->
        <n-input-number v-model:value="optionData.dataset" size="small" :min="0" :placeholder="$t('packages.auto_284')"
></n-input-number>
      </SettingItem>
      <setting-item :name="$t('packages.auto_127')"
>
        <n-input v-model:value="optionData.unit" size="small"></n-input>
      </setting-item>
    </SettingItemBox>

    <SettingItemBox :name="$t('packages.auto_283')"
>
      <SettingItem :name="$t('packages.auto_287')"
>
        <n-select v-model:value="optionData.type" :options="types" :placeholder="$t('packages.auto_285')"
 />
      </SettingItem>

      <!-- Kích cỡ màu sắc v.v... -->
      <SettingItem :name="$t('packages.auto_289')"
>
        <n-color-picker size="small" :modes="['hex']" v-model:value="optionData.color"></n-color-picker>
      </SettingItem>
      <SettingItem :name="$t('packages.auto_282')"
>
        <n-color-picker size="small" :modes="['hex']" v-model:value="optionData.railColor"></n-color-picker>
      </SettingItem>
      <setting-item :name="$t('packages.auto_286')"
 v-if="optionData.type !== types[0].value">
        <n-input-number v-model:value="optionData.offsetDegree" size="small"></n-input-number>
      </setting-item>
      <SettingItem v-if="optionData.type == types[0].value">
        <n-space>
          <n-switch v-model:value="optionData.processing" size="small" />
          <n-text>{{ $t('phase7.auto_315') }}</n-text>
        </n-space>
      </SettingItem>
    </SettingItemBox>

    <SettingItemBox :name="$t('packages.auto_288')"
>
      <SettingItem :name="$t('packages.auto_111')"
 v-if="optionData.type == types[0].value">
        <n-select v-model:value="optionData.indicatorPlacement" :options="indicatorPlacements" :placeholder="$t('packages.auto_285')"
 />
      </SettingItem>
      <SettingItem :name="$t('packages.auto_281')"
>
        <n-color-picker size="small" :modes="['hex']" v-model:value="optionData.indicatorTextColor"></n-color-picker>
      </SettingItem>
       <setting-item :name="$t('packages.auto_290')"
>
        <n-input-number v-model:value="optionData.indicatorTextSize" size="small"></n-input-number>
      </setting-item>
    </SettingItemBox>
  </CollapseItem>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
// Sau đây là thành phần bố trí mô-đun cài đặt được đóng gói. Hiệu ứng cụ thể có thể được xem trên trang web chính thức.
import { CollapseItem, SettingItemBox, SettingItem } from '@/components/Pages/ChartItemSetting'

// Lấy option củaDữ liệu, dễ sử dụng typeof Nhận loại
import { option, types, indicatorPlacements } from './config'

const props = defineProps({
  optionData: {
    type: Object as PropType<typeof option>,
    required: true
  }
})
</script>
