<template>
  <collapse-item :name="$t('packages.auto_537')"
 :expanded="true">
      <setting-item v-for="(item, index) in optionData.dataset" :key="index">
        <n-input-group>
          <n-input v-model:value="optionData.dataset[index]" size="small" :placeholder="$t('packages.auto_557')"
></n-input>
          <n-button ghost @click="optionData.dataset.splice(index, 1)"> - </n-button>
        </n-input-group>
      </setting-item>
      <setting-item>
        <n-button size="small" @click="optionData.dataset.push('')"> {{ $t('phase7.auto_56') }}</n-button>
      </setting-item>
  </collapse-item>
  <collapse-item :name="$t('packages.auto_552')"
 :expanded="true">
    <setting-item-box :name="$t('packages.auto_561')"
>
      <setting-item>
        <n-space>
          <n-switch v-model:value="optionData.autoplay" size="small" />
          <n-text>{{ $t('phase7.auto_482') }}</n-text>
        </n-space>
      </setting-item>
      <!-- BậtTự động phátGiờ，Cài Đặt Chỉnhkhoảng thời gianGiphòng -->
      <setting-item :name="$t('packages.auto_545')"
>
        <n-input-number v-model:value="optionData.interval" size="small" placeholder="">
          <template #suffix> {{ $t('phase7.auto_7') }} </template>
        </n-input-number>
      </setting-item>
      <setting-item :name="$t('packages.auto_560')"
>
        <n-select v-model:value="optionData.direction" :options="directions" :placeholder="$t('packages.auto_312')"
 />
      </setting-item>
      <setting-item :name="$t('packages.auto_550')"
>
        <n-select v-model:value="optionData.effect" :options="effects" :placeholder="$t('packages.auto_547')"
 />
      </setting-item>
      <setting-item :name="$t('packages.auto_546')"
>
        <n-input-number v-model:value="optionData.slidesPerview" size="small" placeholder=""></n-input-number>
      </setting-item>
      <setting-item>
        <n-space>
          <n-switch v-model:value="optionData.centeredSlides" size="small" />
          <n-text>{{ $t('phase7.auto_422') }}</n-text>
        </n-space>
      </setting-item>
      <setting-item :name="$t('packages.auto_559')"
>
        <n-select v-model:value="optionData.fit" :options="fitList" :placeholder="$t('packages.auto_150')"
 />
      </setting-item>
    </setting-item-box>
    <setting-item-box :name="$t('packages.auto_305')"
>
      <setting-item :name="$t('packages.auto_150')"
>
        <n-select v-model:value="optionData.dotType" :options="dotTypes" :placeholder="$t('packages.auto_556')"
 />
      </setting-item>
      <setting-item :name="$t('packages.auto_111')"
>
        <n-select v-model:value="optionData.dotPlacement" :options="dotPlacements" :placeholder="$t('packages.auto_551')"
 />
      </setting-item>
      <setting-item>
        <n-space>
          <n-switch v-model:value="optionData.showDots" size="small" />
          <n-text>{{ $t('phase7.auto_227') }}</n-text>
        </n-space>
      </setting-item>
      <setting-item>
        <n-space>
          <n-switch v-model:value="optionData.showArrow" size="small" />
          <n-text>{{ $t('phase7.auto_110') }}</n-text>
        </n-space>
      </setting-item>
      <setting-item>
        <n-space>
          <n-switch v-model:value="optionData.draggable" size="small" />
          <n-text>{{ $t('phase7.auto_107') }}</n-text>
        </n-space>
      </setting-item>
    </setting-item-box>
  </collapse-item>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { option } from './config'
import { CollapseItem, SettingItemBox, SettingItem } from '@/components/Pages/ChartItemSetting'

const props = defineProps({
  optionData: {
    type: Object as PropType<typeof option>,
    required: true
  }
})

// từ điển
const dotTypes = [
  {
    label: window['$t']('packages.auto_562'),
    value: 'dot'
  },
  {
    label: window['$t']('packages.auto_558'),
    value: 'line'
  }
]
const directions = [
  {
    label: window['$t']('packages.auto_549'),
    value: 'horizontal'
  },
  {
    label: window['$t']('packages.auto_553'),
    value: 'vertical'
  }
]
const effects = [
  {
    label: 'slide',
    value: 'slide'
  },
  {
    label: 'fade',
    value: 'fade'
  },
  {
    label: 'card',
    value: 'card'
  },
  {
    label: 'custom',
    value: 'custom'
  }
]
const dotPlacements = [
  {
    label: window['$t']('packages.auto_544'),
    value: 'top'
  },
  {
    label: window['$t']('packages.auto_555'),
    value: 'bottom'
  },
  {
    label: window['$t']('packages.auto_554'),
    value: 'left'
  },
  {
    label: window['$t']('packages.auto_548'),
    value: 'right'
  }
]

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
</script>
