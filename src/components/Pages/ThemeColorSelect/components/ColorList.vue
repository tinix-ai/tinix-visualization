<template>
  <div class="content-left">
    <div
      class="content-left-item go-transition-quick go-mb-0"
      v-for="(item, index) in designColorRecommend"
      :key="index"
      @click="colorSelectHandle(item)"
    >
      <n-space>
        <div class="content-left-item-color" :style="{ backgroundColor: item.hex }"></div>
        <n-space vertical :size="2">
          <span class="color-name-text" :style="{ color: item.hex }">{{ item.name }}</span>
          <n-text depth="3" class="color-hex-text">
            {{ item.hex }}
            <n-divider vertical></n-divider>
            {{ `rgb(${item.RGB[0]}, ${item.RGB[1]}, ${item.RGB[2]})` }}
          </n-text>
        </n-space>
      </n-space>
    </div>
    <n-divider title-placement="left">{{ $t('phase7.auto_419') }}</n-divider>
    <div
      class="content-left-item go-transition-quick"
      v-for="(item, index) in designColor"
      :key="index"
      @click="colorSelectHandle(item)"
    >
      <n-space>
        <div class="content-left-item-color" :style="{ backgroundColor: item.hex }"></div>
        <n-space vertical :size="2">
          <span class="color-name-text" :style="{ color: item.hex }">{{ item.name }}</span>
          <n-text depth="3" class="color-hex-text">
            {{ item.hex }}
            <n-divider vertical></n-divider>
            {{ `rgb(${item.RGB[0]}, ${item.RGB[1]}, ${item.RGB[2]})` }}
          </n-text>
        </n-space>
      </n-space>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'
import { AppThemeColorType } from '@/store/modules/designStore/designStore.d'
import designColorRecommend from '@/settings/designColorRecommend.json'

const emits = defineEmits(['colorSelectHandle'])
defineProps({
  designColor: {
    type: Object as PropType<AppThemeColorType[]>,
    required: true
  }
})
const colorSelectHandle = (color: AppThemeColorType) => {
  emits('colorSelectHandle', color)
}
</script>

<style lang="scss" scoped>
.content-left {
  display: flex;
  flex-wrap: wrap;
  margin-right: 200px;
  .content-left-item {
    position: relative;
    display: flex;
    margin-bottom: 10px;
    margin-right: 10px;
    padding: 10px 20px;
    min-width: 300px;
    border-radius: 5px;
    cursor: pointer;
    border: 1px solid rgba(0, 0, 0, 0);
    &:hover {
      @include hover-border-color("background-color5");
    }
    &::after {
      content: "";
      z-index: -1;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0.7;
      overflow: hidden;
      border-radius: 5px;
      @extend .go-background-filter-shallow;
      backdrop-filter: none;
    }
    &-color {
      width: 10px;
      height: 44px;
      border-radius: 4px;
    }
    .color-name-text {
      font-weight: 500;
      font-size: 14px;
    }
    .color-hex-text {
      font-size: 11px;
    }
  }
}
</style>
