<template>
  <collapse-item :name="$t('packages.auto_163')"
 :expanded="true">
    <setting-item-box :name="$t('packages.auto_185')"
 :alone="true">
      <setting-item>
        <n-select size="small" v-model:value="optionData.mapOptions.lang" :options="langOptions" />
      </setting-item>
    </setting-item-box>
    <setting-item-box name="Key" :alone="true">
      <setting-item :name="$t('packages.auto_173')"
>
        <n-input v-model:value="optionData.mapOptions.amapKey" size="small"></n-input>
      </setting-item>
    </setting-item-box>
    <setting-item-box :name="$t('packages.auto_165')"
 :alone="true">
      <setting-item>
        <n-input size="small" v-model:value="optionData.mapOptions.amapStyleKeyCustom" />
      </setting-item>
    </setting-item-box>
  </collapse-item>
  <collapse-item :name="$t('packages.auto_100')"
 :expanded="true">
    <setting-item-box :name="$t('packages.auto_183')"
>
      <setting-item>
        <n-select size="small" v-model:value="optionData.mapOptions.amapStyleKey" :options="themeOptions" />
      </setting-item>
    </setting-item-box>
    <setting-item-box :name="$t('packages.auto_152')"
 :alone="true">
      <n-checkbox-group v-model:value="optionData.mapOptions.features">
        <n-space item-style="display: flex;">
          <n-checkbox :value="item.value" :label="item.label" v-for="(item, index) in featuresOptions" :key="index" />
        </n-space>
      </n-checkbox-group>
    </setting-item-box>
    <setting-item-box :name="$t('packages.auto_170')"
 :alone="true">
      <setting-item>
        <n-space>
          <n-switch v-model:value="optionData.mapOptions.showLabel" size="small" />
          <n-text>{{ $t('phase7.auto_454') }}</n-text>
        </n-space>
      </setting-item>
    </setting-item-box>
    <setting-item-box :name="$t('packages.auto_111')"
>
      <setting-item :name="$t('packages.auto_167')"
>
        <n-input-number v-model:value="optionData.mapOptions.amapLon" :show-button="false" size="small">
          <template #suffix>°</template>
        </n-input-number>
      </setting-item>
      <setting-item :name="$t('packages.auto_180')"
>
        <n-input-number v-model:value="optionData.mapOptions.amapLat" :show-button="false" size="small">
          <template #suffix>°</template>
        </n-input-number>
      </setting-item>
      <setting-item :name="$t('packages.auto_153')"
>
        <n-input-number v-model:value="optionData.mapOptions.amapZindex" :min="0" size="small"></n-input-number>
      </setting-item>
    </setting-item-box>
    <setting-item-box :name="$t('packages.auto_179')"
 :alone="true">
      <setting-item>
        <n-radio-group v-model:value="optionData.mapOptions.viewMode" name="radiogroup">
          <n-space>
            <n-radio v-for="song in viewModeOptions" :key="song.value" :value="song.value">
              {{ song.label }}
            </n-radio>
          </n-space>
        </n-radio-group>
      </setting-item>
    </setting-item-box>
    <template v-if="optionData.mapOptions.viewMode === '3D'">
      <setting-item-box>
        <setting-item :name="$t('packages.auto_164')"
>
          <n-color-picker size="small" :modes="['hex']" v-model:value="optionData.mapOptions.skyColor"></n-color-picker>
        </setting-item>
        <setting-item :name="$t('packages.auto_154')"
>
          <n-input-number v-model:value="optionData.mapOptions.pitch" :min="0" :max="83" size="small"></n-input-number>
        </setting-item>
      </setting-item-box>
    </template>
  </collapse-item>
  <collapse-item :name="$t('packages.auto_155')"
 :expanded="true">
    <setting-item-box :name="$t('packages.auto_150')"
>
      <setting-item :name="$t('packages.auto_116')"
>
        <n-select size="small" v-model:value="optionData.mapOptions.mapMarkerType" :options="MarkerOptions" />
      </setting-item>
      <setting-item :name="$t('packages.auto_21')"
>
        <n-color-picker v-model:value="optionData.mapOptions.marker.fillColor" size="small"></n-color-picker>
      </setting-item>
    </setting-item-box>
  </collapse-item>
  <collapse-item :name="$t('packages.auto_172')"
 :expanded="true">
    <setting-item-box :name="$t('packages.auto_171')"
>
      <setting-item>
        <n-space>
          <n-switch v-model:value="optionData.mapOptions.satelliteTileLayer.show" size="small" />
          <n-text>{{ $t('phase7.auto_454') }}</n-text>
        </n-space>
      </setting-item>
      <setting-item :name="$t('packages.auto_176')"
>
        <n-input-number
          v-model:value="optionData.mapOptions.satelliteTileLayer.zIndex"
          :min="0"
          size="small"
        ></n-input-number>
      </setting-item>
      <setting-item :name="$t('packages.auto_177')"
>
        <n-input-number
          v-model:value="optionData.mapOptions.satelliteTileLayer.opacity"
          :min="0"
          :max="1"
          step="0.1"
          size="small"
        ></n-input-number>
      </setting-item>
      <setting-item :name="$t('packages.auto_151')"
>
        <n-slider v-model:value="optionData.mapOptions.satelliteTileLayer.zooms" range :step="1" :max="18" :min="3" />
      </setting-item>
    </setting-item-box>
    <setting-item-box :name="$t('packages.auto_159')"
>
      <setting-item>
        <n-space>
          <n-switch v-model:value="optionData.mapOptions.roadNetTileLayer.show" size="small" />
          <n-text>{{ $t('phase7.auto_454') }}</n-text>
        </n-space>
      </setting-item>
      <setting-item :name="$t('packages.auto_176')"
>
        <n-input-number
          v-model:value="optionData.mapOptions.roadNetTileLayer.zIndex"
          :min="0"
          size="small"
        ></n-input-number>
      </setting-item>
      <setting-item :name="$t('packages.auto_177')"
>
        <n-input-number
          v-model:value="optionData.mapOptions.roadNetTileLayer.opacity"
          :min="0"
          :max="1"
          step="0.1"
          size="small"
        ></n-input-number>
      </setting-item>
      <setting-item :name="$t('packages.auto_151')"
>
        <n-slider v-model:value="optionData.mapOptions.roadNetTileLayer.zooms" range :step="1" :max="18" :min="3" />
      </setting-item>
    </setting-item-box>
    <setting-item-box :name="$t('packages.auto_158')"
>
      <setting-item>
        <n-space>
          <n-switch v-model:value="optionData.mapOptions.trafficTileLayer.show" size="small" />
          <n-text>{{ $t('phase7.auto_454') }}</n-text>
        </n-space>
      </setting-item>
      <setting-item :name="$t('packages.auto_176')"
>
        <n-input-number
          v-model:value="optionData.mapOptions.trafficTileLayer.zIndex"
          :min="0"
          size="small"
        ></n-input-number>
      </setting-item>
      <setting-item :name="$t('packages.auto_177')"
>
        <n-input-number
          v-model:value="optionData.mapOptions.trafficTileLayer.opacity"
          :min="0"
          :max="1"
          step="0.1"
          size="small"
        ></n-input-number>
      </setting-item>
      <setting-item :name="$t('packages.auto_151')"
>
        <n-slider v-model:value="optionData.mapOptions.trafficTileLayer.zooms" range :step="1" :max="18" :min="3" />
      </setting-item>
    </setting-item-box>
  </collapse-item>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { option, MarkerEnum, ThemeEnum, LangEnum, ViewModeEnum, ShowHideEnum, FeaturesEnum } from './config'
import { CollapseItem, SettingItemBox, SettingItem } from '@/components/Pages/ChartItemSetting'

defineProps({
  optionData: {
    type: Object as PropType<typeof option>,
    required: true
  }
})

const themeOptions = [
  {
    value: ThemeEnum.NORMAL,
    label: window['$t']('packages.auto_149')
  },
  {
    value: ThemeEnum.DARK,
    label: window['$t']('packages.auto_156')
  },
  {
    value: ThemeEnum.LIGHT,
    label: window['$t']('packages.auto_145')
  },
  {
    value: ThemeEnum.WHITES_MOKE,
    label: window['$t']('packages.auto_162')
  },
  {
    value: ThemeEnum.FRESH,
    label: window['$t']('packages.auto_175')
  },
  {
    value: ThemeEnum.GREY,
    label: window['$t']('packages.auto_186')
  },
  {
    value: ThemeEnum.GRAFFITI,
    label: window['$t']('packages.auto_182')
  },
  {
    value: ThemeEnum.MACARON,
    label: window['$t']('packages.auto_181')
  },
  {
    value: ThemeEnum.BLUE,
    label: window['$t']('packages.auto_161')
  },
  {
    value: ThemeEnum.DARKBLUE,
    label: window['$t']('packages.auto_146')
  },
  {
    value: ThemeEnum.WINE,
    label: window['$t']('packages.auto_169')
  }
]

const langOptions = [
  {
    value: LangEnum.ZH_CN,
    label: window['$t']('packages.auto_184')
  },
  {
    value: LangEnum.EN,
    label: window['$t']('packages.auto_160')
  },
  {
    value: LangEnum.ZH_EN,
    label: window['$t']('packages.auto_157')
  }
]

const viewModeOptions = [
  {
    value: ViewModeEnum.PLANE,
    label: '2D'
  },
  {
    value: ViewModeEnum.STEREOSCOPIC,
    label: '3D'
  }
]

const featuresOptions = [
  {
    value: FeaturesEnum.BG,
    label: window['$t']('packages.auto_148')
  },
  {
    value: FeaturesEnum.POINT,
    label: window['$t']('packages.auto_168')
  },
  {
    value: FeaturesEnum.ROAD,
    label: window['$t']('packages.auto_147')
  },
  {
    value: FeaturesEnum.BUILDING,
    label: window['$t']('packages.auto_166')
  }
]

const MarkerOptions = [
  {
    value: MarkerEnum.CIRCLE_MARKER,
    label: window['$t']('packages.auto_174')
  },
  {
    value: MarkerEnum.MARKER,
    label: window['$t']('packages.auto_178')
  },
  {
    value: MarkerEnum.NONE,
    label: window['$t']('packages.auto_144')
  }
]
</script>
