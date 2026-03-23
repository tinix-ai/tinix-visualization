<template>
  <div v-show="isGroup">
    <n-divider n-divider style="margin: 10px 0"></n-divider>
    <n-tag type="warning"> {{ $t('phase7.auto_509') }}</n-tag>
  </div>

  <collapse-item :name="isCanvas ? window['$t']('views_components.auto_447') : window['$t']('phase7.auto_169')">
    <template #header>
      <n-switch v-model:value="chartStyles.filterShow" size="small"></n-switch>
    </template>
    <setting-item-box :name="$t('views_components.auto_453')"
 :alone="true">
      <setting-item name="{hueRotate}deg">
        <!-- Độ mờ đục -->
        <n-slider
          v-model:value="chartStyles.hueRotate"
          :step="3"
          :min="0"
          :max="360"
          :format-tooltip="degFormatTooltip"
        ></n-slider>
      </setting-item>
    </setting-item-box>
    <setting-item-box name="parseFloat"
 :alone="true">
      <setting-item :name="window['$t']('views_components.auto_462')">
        <!-- Độ mờ đục -->
        <n-slider
          v-model:value="chartStyles.saturate"
          :step="0.1"
          :min="0"
          :max="2"
          :format-tooltip="sliderFormatTooltip"
        ></n-slider>
      </setting-item>
    </setting-item-box>
    <setting-item-box name="parseFloat"
 :alone="true">
      <setting-item :name="window['$t']('views_components.auto_455')">
        <!-- Độ mờ đục -->
        <n-slider
          v-model:value="chartStyles.contrast"
          :step="0.1"
          :min="0"
          :max="2"
          :format-tooltip="sliderFormatTooltip"
        ></n-slider>
      </setting-item>
    </setting-item-box>
    <setting-item-box name="parseFloat"
 :alone="true">
      <setting-item :name="window['$t']('views_components.auto_451')">
        <!-- Độ mờ đục -->
        <n-slider
          v-model:value="chartStyles.brightness"
          :step="0.1"
          :min="0"
          :max="2"
          :format-tooltip="sliderFormatTooltip"
        ></n-slider>
      </setting-item>
    </setting-item-box>
    <setting-item-box name="parseFloat"
 :alone="true">
      <setting-item :name="window['$t']('views_components.auto_457')">
        <!-- Độ mờ đục -->
        <n-slider
          v-model:value="chartStyles.opacity"
          :step="0.1"
          :min="0"
          :max="1"
          :format-tooltip="sliderFormatTooltip"
        ></n-slider>
      </setting-item>
    </setting-item-box>

    <!--  Bộ lọc mặc định  -->
    <div v-if="presetImageList.length" class="preset-filter">
      <n-image
        class="preset-img"
        width="46"
        preview-disabled
        object-fit="scale-down"
        v-for="(item, index) in presetImageList"
        :key="index"
        :class="{ 'active-preset': item.hueRotate === chartStyles.hueRotate }"
        :style="{ filter: `hue-rotate(${item.hueRotate}deg)` }"
        :src="item.src"
        @click="() => (chartStyles.hueRotate = item.hueRotate)"
      ></n-image>
    </div>

    <!-- Blend mode -->
    <setting-item-box v-if="!isCanvas" :alone="true">
      <template #name>
        <n-text>{{ $t('phase7.auto_453') }}</n-text>
        <n-tooltip trigger="hover">
          <template #trigger>
            <n-icon size="21" :depth="3">
              <help-outline-icon></help-outline-icon>
            </n-icon>
          </template>
          <n-text>{{ $t('phase7.auto_521') }}</n-text>
        </n-tooltip>
      </template>
      <setting-item>
        <n-select v-model:value="chartStyles.blendMode" size="small" filterable :options="BlendModeEnumList"></n-select>
      </setting-item>
    </setting-item-box>

    <!-- Chuyển đổi -->
    <setting-item-box v-if="!isCanvas" :name="$t('views_components.auto_463')"
>
      <setting-item :name="$t('views_components.auto_460')"
>
        <!-- Độ mờ đục -->
        <n-input-number
          v-model:value="chartStyles.rotateZ"
          :min="0"
          :max="360"
          size="small"
          :placeholder="$t('views_components.auto_449')"

        ></n-input-number>
      </setting-item>
      <setting-item :name="$t('views_components.auto_446')"
>
        <!-- Độ mờ đục -->
        <n-input-number
          v-model:value="chartStyles.rotateX"
          :min="0"
          :max="360"
          size="small"
          :placeholder="$t('views_components.auto_449')"

        ></n-input-number>
      </setting-item>
      <setting-item :name="$t('views_components.auto_459')"
>
        <!-- Độ mờ đục -->
        <n-input-number
          v-model:value="chartStyles.rotateY"
          :min="0"
          :max="360"
          size="small"
          :placeholder="$t('views_components.auto_449')"

        ></n-input-number>
      </setting-item>
    </setting-item-box>

    <!-- Nghiêng -->
    <setting-item-box v-if="!isCanvas" :name="$t('views_components.auto_448')"
>
      <setting-item :name="$t('views_components.auto_461')"
>
        <n-input-number
          v-model:value="chartStyles.skewX"
          :min="0"
          :max="360"
          size="small"
          :placeholder="$t('views_components.auto_449')"

        ></n-input-number>
      </setting-item>
      <setting-item :name="$t('views_components.auto_456')"
>
        <n-input-number
          v-model:value="chartStyles.skewY"
          :min="0"
          :max="360"
          size="small"
          :placeholder="$t('views_components.auto_449')"

        ></n-input-number>
      </setting-item>
    </setting-item-box>

    <!-- Mẹo -->
    <n-tag type="warning"> {{ $t('phase7.auto_132') }} </n-tag>
  </collapse-item>
</template>

<script setup lang="ts">
import { ref, PropType } from 'vue'
import { PickCreateComponentType, BlendModeEnumList } from '@/packages/index.d'
import { SettingItemBox, SettingItem, CollapseItem } from '@/components/Pages/ChartItemSetting'
import { icon } from '@/plugins'
import logoImg from '@/assets/logo.png'
import { useDesignStore } from '@/store/modules/designStore/designStore'

const props = defineProps({
  isGroup: {
    type: Boolean,
    required: false
  },
  isCanvas: {
    type: Boolean,
    default: false
  },
  chartStyles: {
    type: Object as PropType<Omit<PickCreateComponentType<'styles'>, 'animations'>>,
    required: true
  }
})

const { HelpOutlineIcon } = icon.ionicons5

// TrămPhúthơn định dạng person
const sliderFormatTooltip = (v: string) => {
  return `${(parseFloat(v) * 100).toFixed(0)}%`
}

// Định dạng góc
const degFormatTooltip = (v: string) => {
  return `${v}deg`
}

// Bộ lọc mặc định
interface presetImageData {
  index: number
  src: string
  hueRotate: number
}

const presetImageList = ref([] as presetImageData[])
for (let i = 1; i <= 12; i++) {
  presetImageList.value.push({
    index: i,
    src: logoImg,
    hueRotate: i * 30
  })
}
</script>

<style lang="scss" scoped>
// Bộ lọc mặc định
.preset-filter {
  margin: 20px 0 10px 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .preset-img {
    margin-bottom: 10px;
    padding: 2px;
    border-radius: 6px;
    transition: 0.2s all;
    cursor: pointer;
    &:hover {
      box-shadow: 0 0 0 2px #66a9c9;
    }
  }
  .active-preset {
    box-shadow: 0 0 0 2px #66a9c9;
  }
}
</style>
