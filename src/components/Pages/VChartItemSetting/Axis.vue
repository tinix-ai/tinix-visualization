<template>
  <collapse-item :name="axis.name">
    <template #header>
      <n-switch v-model:value="axis.visible" size="small"></n-switch>
    </template>
    <setting-item-box :name="$t('views_components.auto_399')"
>
      <setting-item :name="$t('views_components.auto_469')"
>
        <n-space>
          <n-switch v-model:value="axis.unit.visible" size="small"></n-switch>
        </n-space>
      </setting-item>
      <setting-item :name="$t('views_components.auto_467')"
>
        <n-input v-model:value="axis.unit.text" size="small"></n-input>
      </setting-item>
      <FontStyle :style="toRefs(axis.unit.style)"></FontStyle>
    </setting-item-box>
    <setting-item-box :name="$t('views_components.auto_468')"
>
      <setting-item v-if="axis.label" :name="$t('views_components.auto_469')"
>
        <n-space>
          <n-switch v-model:value="axis.label.visible" size="small"></n-switch>
        </n-space>
      </setting-item>
      <setting-item v-if="axis.label" :name="$t('views_components.auto_449')"
>
        <n-input-number v-model:value="axis.label.style.angle" :min="0" :max="360" size="small" />
      </setting-item>
      <FontStyle v-if="axis.label" :style="toRefs(axis.label.style)"></FontStyle>
    </setting-item-box>
    <setting-item-box :name="$t('views_components.auto_470')"
>
      <setting-item :name="$t('views_components.auto_469')"
>
        <n-space>
          <n-switch v-model:value="axis.title.visible" size="small"></n-switch>
        </n-space>
      </setting-item>
      <setting-item :name="$t('views_components.auto_467')"
>
        <n-input v-model:value="axis.title.style.text" size="small"></n-input>
      </setting-item>
      <setting-item :name="$t('views_components.auto_390')"
>
        <n-select v-model:value="axis.title.position" :options="legendsConfig.position" size="small" />
      </setting-item>
      <setting-item :name="$t('views_components.auto_449')"
>
        <n-input-number v-model:value="axis.title.angle" :min="0" :max="360" size="small" />
      </setting-item>
      <FontStyle :style="toRefs(axis.title.style)"></FontStyle>
    </setting-item-box>
    <setting-item-box :name="$t('views_components.auto_385')"
>
      <setting-item :name="$t('views_components.auto_469')"
>
        <n-space>
          <n-switch v-model:value="axis.domainLine.visible" size="small"></n-switch>
        </n-space>
      </setting-item>
      <setting-item name=""> </setting-item>
      <setting-item :name="$t('views_components.auto_403')"
>
        <n-input-number v-model:value="axis.domainLine.style.lineWidth" :min="0" size="small" />
      </setting-item>
      <setting-item :name="$t('views_components.auto_420')"
>
        <n-color-picker v-model:value="axis.domainLine.style.stroke" size="small" />
      </setting-item>
    </setting-item-box>
    <setting-item-box :name="$t('views_components.auto_471')"
>
      <setting-item :name="$t('views_components.auto_469')"
>
        <n-space>
          <n-switch v-model:value="axis.grid.visible" size="small"></n-switch>
        </n-space>
      </setting-item>
      <setting-item :name="$t('views_components.auto_472')"
>
        <n-space>
          <n-switch v-model:value="isLineDashRef" size="small" @update:value="changeLineDash"></n-switch>
        </n-space>
      </setting-item>
      <setting-item :name="$t('views_components.auto_403')"
>
        <n-input-number v-model:value="axis.grid.style.lineWidth" :min="0" size="small" />
      </setting-item>
      <setting-item :name="$t('views_components.auto_420')"
>
        <n-color-picker v-model:value="axis.grid.style.stroke" size="small" />
      </setting-item>
    </setting-item-box>
  </collapse-item>
</template>

<script setup lang="ts">
import { PropType, ref, toRefs } from 'vue'
import FontStyle from './common/FontStyle.vue'
import { vChartGlobalThemeJsonType } from '@/settings/vchartThemes/index'
import { CollapseItem, SettingItemBox, SettingItem } from '@/components/Pages/ChartItemSetting'
import { legendsConfig } from '@/packages/chartConfiguration/vcharts/index'

const props = defineProps({
  axis: {
    type: Object as PropType<vChartGlobalThemeJsonType>,
    required: true
  }
})

// Xác định xem đó có phải là một đường chấm chấm hay không
const isDash = (data: undefined | Array<number>) => {
  if (!data || data.length === 0 || data[0] === 0) return false
  return true
}

// đường chấm chấm
const isLineDashRef = ref(isDash(props.axis.grid.style.lineDash))

const changeLineDash = (data: boolean) => {
  if (data) {
    props.axis.grid.style.lineDash = [4, 4] // Set nét đứt
  } else {
    props.axis.grid.style.lineDash = [0] // Set nét liền
  }
}
</script>
