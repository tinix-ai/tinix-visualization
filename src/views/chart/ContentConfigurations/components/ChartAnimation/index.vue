<template>
  <div class="go-chart-configurations-animations" v-if="targetData">
    <n-button
      class="clear-btn go-my-2"
      :disabled="!targetData.styles.animations.length"
      @click="clearAnimation"
    >
      XóaAnimation
    </n-button>
    <collapse-item
      v-for="(item, index) in animations"
      :key="index"
      :name="item.label"
      :expanded="true"
    >
      <n-grid :x-gap="8" :y-gap="8" :cols="2">
        <n-grid-item
          class="animation-item go-transition-quick"
          :class="[
            activeIndex(childrenItem.value) && 'active',
            hoverPreviewAnimate === childrenItem.value &&
              `animate__animated  animate__${childrenItem.value}`
          ]"
          v-for="(childrenItem, index) in item.children"
          :key="index"
          @mouseover="hoverPreviewAnimate = childrenItem.value"
          @click="addAnimation(childrenItem)"
        >
          <div class="label-box">
            {{ childrenItem.label }}
          </div>
        </n-grid-item>
      </n-grid>
    </collapse-item>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { animations } from '@/settings/animations/index'
import { CollapseItem } from '@/components/Pages/ChartItemSetting'
import { useDesignStore } from '@/store/modules/designStore/designStore'
import { useTargetData } from '../hooks/useTargetData.hook'

// {{ $t('phase7.auto_218') }}Màu sắc
const designStore = useDesignStore()

const hoverPreviewAnimate = ref('')

const { targetData } = useTargetData()

// Màu sắc
const themeColor = computed(() => {
  return designStore.getAppTheme
})

// * đã chọnAnimationphong cách
const activeIndex = (value: string) => {
  const selectValue = targetData.value.styles.animations
  if (!selectValue.length) return false
  return selectValue[0] === value
}

// * XóaAnimation
const clearAnimation = () => {
  targetData.value.styles.animations = []
}

// * Thêm+Animation, hiện tại chỉ hỗ trợ một
const addAnimation = (item: { label: string; value: string }) => {
  targetData.value.styles.animations = [item.value]
}
</script>

<style lang="scss" scoped>
@include go('chart-configurations-animations') {
  padding: 0;
  .clear-btn {
    width: 100%;
  }
  .animation-item {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 44px;
    padding: 4px 6px;
    text-align: center;
    cursor: pointer;
    border-radius: 5px;
    border: 1px solid transparent;
    background-color: rgba(255, 255, 255, 0.05);

    .label-box {
      font-size: 12px;
      line-height: 1.2;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    @include hover-border-color('hover-border-color');
    &:hover,
    &.active {
      color: v-bind('themeColor');
      border: 1px solid v-bind('themeColor');
      background-color: rgba(255, 255, 255, 0.1);
    }
  }
}
</style>
