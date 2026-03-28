<template>
  <!-- Echarts Cấu hình toàn cầu -->
  <global-setting :optionData="optionData"></global-setting>
  <CollapseItem :name="$t('packages.auto_100')"
 :expanded="true">
    <SettingItemBox :name="$t('packages.auto_231')"
>
      <SettingItem :name="$t('packages.auto_232')"
>
        <n-select
          size="small"
          v-model:value="mapRegion.adcode"
          :options="mapRegionOptions"
          value-field="adcode"
          label-field="name"
        />
      </SettingItem>
    </SettingItemBox>

    <SettingItemBox :name="$t('packages.auto_210')"
>
      <SettingItem :name="$t('packages.auto_227')"
>
        <n-color-picker
          size="small"
          :modes="['hex']"
          v-model:value="seriesList[1].itemStyle.areaColor.colorStops[0].color"
        ></n-color-picker>
      </SettingItem>
      <SettingItem :name="$t('packages.auto_207')"
>
        <n-color-picker
          size="small"
          :modes="['hex']"
          v-model:value="seriesList[1].itemStyle.areaColor.colorStops[1].color"
        ></n-color-picker>
      </SettingItem>
    </SettingItemBox>
    <SettingItemBox :name="$t('packages.auto_139')"
>
      <SettingItem :name="$t('packages.auto_21')"
>
        <n-color-picker
          size="small"
          :modes="['hex']"
          v-model:value="seriesList[1].itemStyle.shadowColor"
        ></n-color-picker>
      </SettingItem>
      <SettingItem :name="$t('packages.auto_218')"
>
        <n-input-number
          v-model:value="seriesList[1].itemStyle.shadowBlur"
          :min="0"
          size="small"
          :placeholder="$t('packages.auto_228')"

        ></n-input-number>
      </SettingItem>
      <SettingItem :name="$t('packages.auto_214')"
>
        <n-input-number
          v-model:value="seriesList[1].itemStyle.shadowOffsetX"
          size="small"
          :placeholder="$t('packages.auto_211')"

        ></n-input-number>
      </SettingItem>
      <SettingItem :name="$t('packages.auto_199')"
>
        <n-input-number
          v-model:value="seriesList[1].itemStyle.shadowOffsetY"
          size="small"
          :placeholder="$t('packages.auto_206')"

        ></n-input-number>
      </SettingItem>
    </SettingItemBox>

    <SettingItemBox :name="$t('packages.auto_224')"
>
      <SettingItem :name="$t('packages.auto_219')"
>
        <n-space>
          <n-switch v-model:value="seriesList[1].label.show" size="small"></n-switch>
        </n-space>
      </SettingItem>
      <SettingItem :name="$t('packages.auto_194')"
>
        <n-color-picker size="small" :modes="['hex']" v-model:value="seriesList[1].label.color"></n-color-picker>
      </SettingItem>
      <SettingItem :name="$t('packages.auto_223')"
>
        <n-input-number
          v-model:value="seriesList[1].label.fontSize"
          :min="1"
          size="small"
          :placeholder="$t('packages.auto_193')"

        ></n-input-number>
      </SettingItem>
    </SettingItemBox>

    <SettingItemBox :name="$t('packages.auto_225')"
>
      <SettingItem :name="$t('packages.auto_208')"
>
        <n-space>
          <n-switch v-model:value="seriesList[1].emphasis.disabled" size="small"></n-switch>
        </n-space>
      </SettingItem>
      <SettingItem :name="$t('packages.auto_21')"
>
        <n-color-picker
          size="small"
          :modes="['hex']"
          v-model:value="seriesList[1].emphasis.itemStyle.areaColor"
        ></n-color-picker>
      </SettingItem>
      <SettingItem :name="$t('packages.auto_223')"
>
        <n-input-number
          v-model:value="seriesList[1].emphasis.label.fontSize"
          :min="1"
          size="small"
          :placeholder="$t('packages.auto_193')"

        ></n-input-number>
      </SettingItem>
      <SettingItem :name="$t('packages.auto_139')"
>
        <n-color-picker
          size="small"
          :modes="['hex']"
          v-model:value="seriesList[1].emphasis.itemStyle.shadowColor"
        ></n-color-picker>
      </SettingItem>
      <SettingItem :name="$t('packages.auto_204')"
>
        <n-input-number
          v-model:value="seriesList[1].emphasis.itemStyle.borderWidth"
          :min="1"
          size="small"
          :placeholder="$t('packages.auto_200')"

        ></n-input-number>
      </SettingItem>
      <SettingItem :name="$t('packages.auto_215')"
>
        <n-color-picker
          size="small"
          :modes="['hex']"
          v-model:value="seriesList[1].emphasis.label.color"
        ></n-color-picker>
      </SettingItem>
    </SettingItemBox>

    <SettingItemBox :name="$t('packages.auto_220')"
>
      <SettingItem :name="$t('packages.auto_219')"
>
        <n-space>
          <n-switch v-model:value="seriesList[1].tooltip.show" size="small"></n-switch>
        </n-space>
      </SettingItem>
      <SettingItem :name="$t('packages.auto_223')"
>
        <n-input-number
          v-model:value="seriesList[1].tooltip.textStyle.fontSize"
          :min="1"
          size="small"
          :placeholder="$t('packages.auto_193')"

        ></n-input-number>
      </SettingItem>
      <SettingItem :name="$t('packages.auto_194')"
>
        <n-color-picker
          size="small"
          :modes="['hex']"
          v-model:value="seriesList[1].tooltip.textStyle.color"
        ></n-color-picker>
      </SettingItem>
      <SettingItem :name="$t('packages.auto_201')"
>
        <n-color-picker
          size="small"
          :modes="['hex']"
          v-model:value="seriesList[1].tooltip.backgroundColor"
        ></n-color-picker>
      </SettingItem>
    </SettingItemBox>
    <SettingItemBox :name="$t('packages.auto_226')"
>
      <SettingItem :name="$t('packages.auto_21')"
>
        <n-color-picker
          size="small"
          :modes="['hex']"
          v-model:value="seriesList[1].itemStyle.borderColor"
        ></n-color-picker>
      </SettingItem>
      <SettingItem :name="$t('packages.auto_209')"
>
        <n-input-number
          v-model:value="seriesList[1].itemStyle.borderWidth"
          :min="1"
          size="small"
          :placeholder="$t('packages.auto_200')"

        ></n-input-number>
      </SettingItem>
    </SettingItemBox>
    <SettingItemBox :name="$t('packages.auto_202')"
 v-if="mapRegion.enter">
      <SettingItem :name="$t('packages.auto_21')"
>
        <n-color-picker size="small" :modes="['hex']" v-model:value="mapRegion.backColor"></n-color-picker>
      </SettingItem>
      <SettingItem :name="$t('packages.auto_104')"
>
        <n-input-number
          v-model:value="mapRegion.backSize"
          :min="1"
          size="small"
          :placeholder="$t('packages.auto_193')"

        ></n-input-number>
      </SettingItem>
    </SettingItemBox>
  </CollapseItem>
  <CollapseItem :name="$t('packages.auto_155')"
 :expanded="true">
    <SettingItemBox :name="$t('packages.auto_150')"
>
      <SettingItem :name="$t('packages.auto_104')"
>
        <n-input-number v-model:value="seriesList[0].symbolSize" size="small" :min="0"></n-input-number>
      </SettingItem>
      <SettingItem :name="$t('packages.auto_21')"
>
        <n-color-picker size="small" :modes="['hex']" v-model:value="seriesList[0].itemStyle.color"></n-color-picker>
      </SettingItem>
    </SettingItemBox>

    <SettingItemBox :name="$t('packages.auto_130')"
>
      <SettingItem :name="$t('packages.auto_219')"
>
        <n-space>
          <n-switch v-model:value="seriesList[0].label.show" size="small"></n-switch>
        </n-space>
      </SettingItem>
      <SettingItem :name="$t('packages.auto_223')"
>
        <n-input-number v-model:value="seriesList[0].label.fontSize" size="small" :min="0"></n-input-number>
      </SettingItem>
      <SettingItem :name="$t('packages.auto_194')"
>
        <n-color-picker size="small" :modes="['hex']" v-model:value="seriesList[0].label.color"></n-color-picker>
      </SettingItem>
    </SettingItemBox>

    <SettingItemBox :name="$t('packages.auto_222')"
>
      <SettingItem :name="$t('packages.auto_198')"
>
        <n-input-number
          v-model:value="seriesList[0].rippleEffect.scale"
          :min="1"
          size="small"
          :placeholder="$t('packages.auto_216')"

        ></n-input-number>
      </SettingItem>
      <SettingItem :name="$t('packages.auto_229')"
>
        <n-color-picker size="small" :modes="['hex']" v-model:value="seriesList[0].rippleEffect.color"></n-color-picker>
      </SettingItem>
      <SettingItem :name="$t('packages.auto_230')"
>
        <n-select size="small" v-model:value="seriesList[0].rippleEffect.brushType" :options="rippleEffectOptions" />
      </SettingItem>
    </SettingItemBox>
  </CollapseItem>

  <CollapseItem v-if="seriesList[2]" :name="$t('packages.auto_212')"
 :expanded="true">
    <SettingItemBox :name="$t('packages.auto_196')"
>
      <SettingItem :name="$t('packages.auto_213')"
>
        <n-tooltip trigger="hover">
          <template #trigger>
            <n-input-number v-model:value="seriesList[2].effect.period" size="small" :min="0"></n-input-number>
          </template>
          Giá trị càng nhỏ chạy càng nhanh
        </n-tooltip>
      </SettingItem>
      <SettingItem :name="$t('packages.auto_221')"
>
        <n-tooltip trigger="hover">
          <template #trigger>
            <n-input-number
              v-model:value="seriesList[2].effect.trailLength"
              size="small"
              :min="0"
              :max="1"
            ></n-input-number>
          </template>
          Độ dài đuôi khói [0, 1] càng lớn đuôi càng dài
        </n-tooltip>
      </SettingItem>
      <SettingItem :name="$t('packages.auto_104')"
>
        <n-input-number v-model:value="seriesList[2].effect.symbolSize" size="small" :min="0"></n-input-number>
      </SettingItem>
    </SettingItemBox>
    <SettingItemBox :name="$t('packages.auto_217')"
>
      <SettingItem :name="$t('packages.auto_21')"
>
        <n-color-picker
          size="small"
          :modes="['hex']"
          v-model:value="seriesList[2].lineStyle.color"
        ></n-color-picker>
      </SettingItem>
      <SettingItem :name="$t('packages.auto_109')"
>
        <n-input-number v-model:value="seriesList[2].lineStyle.width" size="small" :min="1"></n-input-number>
      </SettingItem>
    </SettingItemBox>
  </CollapseItem>
</template>

<script setup lang="ts">
import { PropType, computed } from 'vue'
import { CollapseItem, SettingItemBox, SettingItem } from '@/components/Pages/ChartItemSetting'
import { GlobalThemeJsonType } from '@/settings/chartThemes/index'
import { GlobalSetting } from '@/components/Pages/ChartItemSetting'
import { ref } from 'vue'

const mapRegionOptions = ref([
  {
    adcode: 'world',
    name: 'Thế giới (World)'
  },
  {
    adcode: 'vietnam',
    name: 'Việt Nam'
  }
])

const rippleEffectOptions = ref([
  {
    value: 'fill',
    label: window['$t']('packages.auto_197')
  },
  {
    value: 'stroke',
    label: window['$t']('packages.auto_195')
  }
])

const props = defineProps({
  optionData: {
    type: Object as PropType<GlobalThemeJsonType>,
    required: true
  }
})


const seriesList = computed(() => {
  return props.optionData.series
})

const mapRegion = computed(() => {
  return props.optionData.mapRegion
})
</script>
