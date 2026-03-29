<template>
  <div
    :class="groupData.styles ? animationsClass(groupData.styles.animations) : ''"
    :style="{
      ...getSizeStyle(groupData.attr),
      ...(groupData.styles ? getFilterStyle(groupData.styles) : {}),
    }"
  >
    <div
      class="chart-item"
      v-for="item in groupData.groupList"
      :class="item.styles ? animationsClass(item.styles.animations) : ''"
      :key="item.id"
      :style="{
      ...getComponentAttrStyle(item.attr, groupIndex),
      ...getStatusStyle(item.status),
      ...getPreviewConfigStyle(item.preview),
      ...(item.styles ? getBlendModeStyle(item.styles) : {}) as any
    }"
    >
      <component
        :is="item.chartConfig.chartKey"
        :id="item.id"
        :chartConfig="item"
        :themeSetting="themeSetting"
        :themeColor="themeColor"
        :style="{
          ...getSizeStyle(item.attr),
          ...(item.styles ? getFilterStyle(item.styles) : {}),
          ...(item.styles ? getTransformStyle(item.styles) : {})
        }"
        v-on="useLifeHandler(item)"
      ></component>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { CreateComponentGroupType } from '@/packages/index.d'
import { animationsClass, getFilterStyle, getTransformStyle, getBlendModeStyle } from '@/utils'
import { getSizeStyle, getComponentAttrStyle, getStatusStyle, getPreviewConfigStyle } from '../../utils'
import { useLifeHandler } from '@/hooks'

const props = defineProps({
  groupData: {
    type: Object as PropType<CreateComponentGroupType>,
    required: true
  },
  themeSetting: {
    type: Object,
    default: () => ({})
  },
  themeColor: {
    type: Object,
    required: true
  },
  groupIndex: {
    type: Number,
    required: true
  }
})
</script>

<style lang="scss" scoped>
.chart-item {
  position: absolute;
}
</style>
