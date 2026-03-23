<template>
  <div class="go-content-layers-list-item" :class="{ hover, select, 'list-mini': selectText }">
    <div class="go-flex-center item-content">
      <n-image
        class="list-img"
        object-fit="contain"
        preview-disabled
        :src="imageInfo"
        :fallback-src="requireErrorImg()"
      ></n-image>
      <n-ellipsis style="margin-right: auto">
        <span class="list-text">
          {{ props.componentData.chartConfig.title }}
        </span>
      </n-ellipsis>
      <layers-status :isGroup="isGroup" :hover="hover" :status="status"></layers-status>
    </div>
    <div :class="{ 'select-modal': select }"></div>
  </div>
</template>

<script setup lang="ts">
import { computed, PropType, ref } from 'vue'
import { requireErrorImg } from '@/utils'
import { useDesignStore } from '@/store/modules/designStore/designStore'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { LayerModeEnum } from '@/store/modules/chartLayoutStore/chartLayoutStore.d'
import { fetchImages } from '@/packages'
import { CreateComponentType, CreateComponentGroupType } from '@/packages/index.d'
import { LayersStatus } from '../LayersStatus/index'

const props = defineProps({
  componentData: {
    type: Object as PropType<CreateComponentType | CreateComponentGroupType>,
    required: true
  },
  isGroup: {
    type: Boolean,
    default: false
  },
  layerMode: {
    type: String as PropType<LayerModeEnum>,
    default: LayerModeEnum.THUMBNAIL
  }
})

// màu sắc toàn cầu
const designStore = useDesignStore()
const chartEditStore = useChartEditStore()
const imageInfo = ref('')

// Nhận hình ảnh
const fetchImageUrl = async () => {
  imageInfo.value = await fetchImages(props.componentData.chartConfig)
}
fetchImageUrl()

// màu sắc
const themeColor = computed(() => {
  return designStore.getAppTheme
})

// Tính toán mục tiêu hiện được chọn
const select = computed(() => {
  const id = props.componentData.id
  return chartEditStore.getTargetChart.selectId.find((e: string) => e === id)
})

// vật nổi
const hover = computed(() => {
  return props.componentData.id === chartEditStore.getTargetChart.hoverId
})

// Trạng thái thành phần trốn/khóa
const status = computed(() => {
  return props.componentData.status
})

// Có nên chọn văn bản hay không
const selectText = computed(() => {
  return props.layerMode === LayerModeEnum.TEXT
})
</script>

<style lang="scss" scoped>
$centerHeight: 52px;
$centerMiniHeight: 28px;
$textSize: 10px;

@include go(content-layers-list-item) {
  position: relative;
  height: $centerHeight;
  width: 90%;
  margin: 5px 5%;
  margin-bottom: 5px;
  border-radius: 5px;
  cursor: pointer;
  border: 1px solid rgba(0, 0, 0, 0);
  @extend .go-transition-quick;
  &.hover,
  &:hover {
    @include fetch-bg-color('background-color4');
  }
  &:hover {
    @include deep() {
      .icon-item {
        opacity: 1;
      }
    }
  }

  .select-modal,
  .item-content {
    position: absolute;
    top: 0;
    left: 0;
  }
  .item-content {
    z-index: 1;
    padding: 6px 5px;
    justify-content: start !important;
    width: calc(100% - 10px);
    height: calc(100% - 10px);
  }

  .select-modal {
    width: 100%;
    height: 100%;
    opacity: 0.3;
    background-color: v-bind('themeColor');
  }

  .list-img {
    flex-shrink: 0;
    height: $centerHeight;
    border-radius: 5px;
    overflow: hidden;
    border: none !important;
    padding: 2px;
    @include hover-border-color('hover-border-color');
  }

  .list-text {
    padding-left: 6px;
    font-size: $textSize;
  }

  /* phong cách đã chọn */
  &.select {
    border: 1px solid v-bind('themeColor');
    background-color: rgba(0, 0, 0, 0);
  }

  // miniphong cách
  &.list-mini {
    height: $centerMiniHeight;
  }
}
</style>
