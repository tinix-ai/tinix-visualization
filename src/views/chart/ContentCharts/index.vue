<template>
  <!-- Tráibên của tất cả các thành phầnXem / HátDanh sách -->
  <content-box class="go-content-charts" :class="{ scoped: !getCharts }" :title="$t('views_components.auto_1')"
 :depth="1" :backIcon="false">
    <template #icon>
      <n-icon size="14" :depth="2">
        <bar-chart-icon></bar-chart-icon>
      </n-icon>
    </template>

    <template #top-right>
      <charts-search v-show="getCharts" :menuOptions="menuOptions"></charts-search>
    </template>
    <!-- Biểu đồ -->
    <aside>
      <div class="menu-width-box">
        <n-menu
          class="menu-width"
          v-model:value="selectValue"
          :options="menuOptions"
          :icon-size="16"
          :indent="18"
          @update:value="clickItemHandle"
        ></n-menu>
        <div class="menu-component-box">
          <go-skeleton :load="!selectOptions" round text :repeat="2" style="width: 90%"></go-skeleton>
          <charts-option-content
            v-if="selectOptions"
            :selectOptions="selectOptions"
            :key="selectValue"
          ></charts-option-content>
        </div>
      </div>
    </aside>
  </content-box>
</template>

<script setup lang="ts">
import { ContentBox } from '../ContentBox/index'
import { ChartsOptionContent } from './components/ChartsOptionContent'
import { ChartsSearch } from './components/ChartsSearch'
import { useAsideHook } from './hooks/useAside.hook'

const { getCharts, BarChartIcon, themeColor, selectOptions, selectValue, clickItemHandle, menuOptions } = useAsideHook()
</script>

<style lang="scss" scoped>
/* tổng thểChiều rộng Width */
$width: 330px;
/* Danh sáchcủaChiều rộng Width */
$widthScoped: 90px;
/* cái nàyChiều cao HeightVà ContentBox Hiệp hội thành phần */
$topHeight: 40px;

@include go(content-charts) {
  width: $width;
  @extend .go-transition;
  &.scoped,
  .menu-width {
    width: $widthScoped;
  }
  .menu-width-box {
    display: flex;
    height: calc(100vh - #{$--header-height} - #{$topHeight});
    .menu-width {
      flex-shrink: 0;
      @include fetch-bg-color('background-color2');
    }
    .menu-component-box {
      flex-shrink: 0;
      width: $width - $widthScoped;
      overflow: hidden;
    }
  }
  @include deep() {
    .menu-width {
      .n-menu-item {
        height: auto !important;
        &.n-menu-item--selected {
          &::after {
            content: '';
            position: absolute;
            left: 2px;
            top: 0;
            height: 100%;
            width: 3px;
            background-color: v-bind('themeColor');
            border-top-right-radius: 3px;
            border-bottom-right-radius: 3px;
          }
        }
        .n-menu-item-content {
          display: flex;
          flex-direction: column;
          padding: 6px 12px !important;
          font-size: 14px !important;
          align-items: center;
          justify-content: center;
        }
        .n-menu-item-content__icon {
          font-size: 18px !important;
          margin-right: 0 !important;
        }
      }
    }
  }
}
</style>
