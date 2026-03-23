<template>
  <n-divider style="margin: 10px 0;" ></n-divider>
  <n-space :size="8" justify="space-between" style="margin-top: 10px;">
    <n-button
      secondary
      v-for="item in positionList"
      :key="item.key"
      @click="positonHandle(item.key)"
    >
      <template #icon>
        <component :is="item.icon" ></component>
      </template>
    </n-button>
  </n-space>
  <setting-item-box name="Vị trí">
    <n-input-number
      v-model:value="chartAttr.y"
      :min="0"
      size="small"
      placeholder="px"
    >
      <template #prefix>
        <n-text depth="3">Trên</n-text>
      </template>
    </n-input-number>
    <n-input-number
      v-model:value="chartAttr.x"
      :min="0"
      size="small"
      placeholder="px"
    >
      <template #prefix>
        <n-text depth="3">Trái</n-text>
      </template>
    </n-input-number>
  </setting-item-box>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { PickCreateComponentType } from '@/packages/index.d'
import { SettingItemBox } from '@/components/Pages/ChartItemSetting'
import { renderIcon } from '@/utils'
import { icon } from '@/plugins/index'
import { EditCanvasConfigType } from '@/store/modules/chartEditStore/chartEditStore.d'

const {
  AlignHorizontalLeftIcon,
  AlignVerticalCenterIcon,
  AlignVerticalTopIcon,
  AlignHorizontalCenterIcon,
  AlignHorizontalRightIcon,
  AlignVerticalBottomIcon
} = icon.carbon

const positionList = [
  {
    key: 'AlignHorizontalLeftIcon',
    lable: 'Căn Trái',
    icon: renderIcon(AlignHorizontalLeftIcon)
  },
  {
    key: 'AlignVerticalCenterIcon',
    lable: 'Căn giữa trục X',
    icon: renderIcon(AlignVerticalCenterIcon)
  },
  {
    key: 'AlignHorizontalRightIcon',
    lable: 'Căn phải',
    icon: renderIcon(AlignHorizontalRightIcon)
  },
  {
    key: 'AlignVerticalTopIcon',
    lable: 'Trên cùng',
    icon: renderIcon(AlignVerticalTopIcon)
  },
  {
    key: 'AlignHorizontalCenterIcon',
    lable: 'Căn giữa trục Y',
    icon: renderIcon(AlignHorizontalCenterIcon)
  },
  {
    key: 'AlignVerticalBottomIcon',
    lable: 'Dưới cùng',
    icon: renderIcon(AlignVerticalBottomIcon)
  }
]

const props = defineProps({
  canvasConfig: {
    type: Object as PropType<EditCanvasConfigType>,
    required: true
  },
  chartAttr: {
    type: Object as PropType<PickCreateComponentType<'attr'>>,
    required: true
  }
})

const positonHandle = (key: string) => {
  switch (key) {
    // Căn Trái
    case positionList[0]['key']:
      props.chartAttr.x = 0
      break
    // Căn giữa trục X
    case positionList[1]['key']:
      props.chartAttr.y = (props.canvasConfig.height - props.chartAttr.h) / 2
      break
    // Căn phải
    case positionList[2]['key']:
      props.chartAttr.x = props.canvasConfig.width - props.chartAttr.w
      break
    // Trên cùng
    case positionList[3]['key']:
      props.chartAttr.y = 0
      break
    // Căn giữa trục Y
    case positionList[4]['key']:
      props.chartAttr.x = (props.canvasConfig.width - props.chartAttr.w) / 2
      break
    // Dưới cùng
    case positionList[5]['key']:
      props.chartAttr.y = props.canvasConfig.height - props.chartAttr.h
      break
  }
}
</script>
