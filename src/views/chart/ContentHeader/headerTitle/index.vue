<template>
  <n-space>
    <n-icon size="20" :depth="3">
      <fish-icon></fish-icon>
    </n-icon>
    <n-text @click="handleFocus" class="go-cursor-pointer">
      Dự án -
      <n-button v-show="!focus" secondary size="tiny">
        <span class="title">
          {{ comTitle }}
        </span>
      </n-button>
    </n-text>

    <n-input
      v-show="focus"
      ref="inputInstRef"
      size="small"
      type="text"
      maxlength="16"
      show-count
      :placeholder="$t('views_components.auto_304')"

      v-model:value.trim="title"
      @keyup.enter="handleBlur"
      @blur="handleBlur"
    ></n-input>
  </n-space>
</template>

<script setup lang="ts">
import { ref, nextTick, computed } from 'vue'
import { fetchRouteParamsLocation, setTitle } from '@/utils'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { EditCanvasConfigEnum } from '@/store/modules/chartEditStore/chartEditStore.d'
import { icon } from '@/plugins'

import { watch } from 'vue'

const { FishIcon } = icon.ionicons5
const chartEditStore = useChartEditStore()

const focus = ref<boolean>(false)
const inputInstRef = ref(null)

const title = ref<string>(chartEditStore.getEditCanvasConfig.projectName || '')

// Theo dõi sự thay đổi của tên dự án trong store
watch(() => chartEditStore.getEditCanvasConfig.projectName, (newVal) => {
  title.value = newVal || ''
})

const comTitle = computed(() => {
  const newTitle = chartEditStore.getEditCanvasConfig.projectName || window['$t']('views_components.auto_303')
  setTitle(`${newTitle} - ${window['$t']('phase7.auto_271')}`)
  return newTitle
})

const handleFocus = () => {
  title.value = chartEditStore.getEditCanvasConfig.projectName || ''
  focus.value = true
  nextTick(() => {
    inputInstRef.value && (inputInstRef.value as any).focus()
  })
}

const handleBlur = () => {
  chartEditStore.setEditCanvasConfig(EditCanvasConfigEnum.PROJECT_NAME, title.value)
  focus.value = false
}
</script>
<style lang="scss" scoped>
.title {
  padding-left: 5px;
  padding-right: 5px;
  font-size: 15px;
}
</style>
