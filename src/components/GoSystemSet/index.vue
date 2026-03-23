<template>
  <n-modal v-model:show="modelShowRef" @afterLeave="closeHandle">
    <n-list bordered class="go-system-setting">
      <template #header>
        <n-space justify="space-between">
          <n-h3 class="go-mb-0">{{ $t('phase7.auto_105') }}</n-h3>
          <n-icon size="20" class="go-cursor-pointer" @click="closeHandle">
            <close-icon></close-icon>
          </n-icon>
        </n-space>
      </template>

      <n-list-item v-for="item in list" :key="item.key">
        <!-- Đường phân cách -->
        <n-divider v-if="item.type === 'divider'" style="margin: 0;" />
        <n-space v-else :size="40">
          <n-space>
            <!-- Tiêu đề trái -->
            <n-text class="item-left">{{ item.name }}</n-text>

            <!-- Thao tác dữ liệu -->
            <template v-if="item.type === 'switch'">
              <n-switch
                v-model:value="item.value"
                size="small"
                @update:value="handleChange($event, item)"
              ></n-switch>
            </template>

            <template v-else-if="item.type === 'number'">
              <n-input-number
                v-model:value="item.value"
                class="input-num-width"
                size="small"
                :step="item.step || null"
                :suffix="item.suffix || null"
                :min="item.min || 0"
                @update:value="handleChange($event, item)"
              ></n-input-number>
            </template>

            <template v-else-if="item.type === 'select'">
              <n-select
                class="select-min-width"
                v-model:value="item.value"
                size="small"
                :options="item.options"
                @update:value="handleChange($event, item)"
              />
            </template>
          </n-space>

          <!-- Mô tả bên phải -->
          <n-space>
            <n-text class="item-right">{{ item.desc }}</n-text>
            <n-tooltip v-if="item.tip" trigger="hover">
              <template #trigger>
                <n-icon size="21">
                  <help-outline-icon></help-outline-icon>
                </n-icon>
              </template>
              <span>{{ item.tip }}</span>
            </n-tooltip>
          </n-space>
        </n-space>
      </n-list-item>
    </n-list>
  </n-modal>
</template>

<script script lang="ts" setup>
import { reactive, ref, watch } from 'vue'
import { ListType } from './index.d'
import { useSettingStore } from '@/store/modules/settingStore/settingStore'
import { SettingStoreEnums, ToolsStatusEnum } from '@/store/modules/settingStore/settingStore.d'
import { icon } from '@/plugins'

const props = defineProps({
  modelShow: Boolean
})

const emit = defineEmits(['update:modelShow'])
const { HelpOutlineIcon, CloseIcon } = icon.ionicons5
const settingStore = useSettingStore()
const modelShowRef = ref(false)

const list = reactive<ListType[]>([
  {
    key: SettingStoreEnums.ASIDE_ALL_COLLAPSED,
    value: settingStore.getAsideAllCollapsed,
    type: 'switch',
    name: window['$t']('views_components.auto_371'),
    desc: window['$t']('views_components.auto_363')
  },
  {
    key: SettingStoreEnums.HIDE_PACKAGE_ONE_CATEGORY,
    value: settingStore.getHidePackageOneCategory,
    type: 'switch',
    name: window['$t']('views_components.auto_360'),
    desc: window['$t']('views_components.auto_370')
  },
  {
    key: SettingStoreEnums.CHANGE_LANG_RELOAD,
    value: settingStore.getChangeLangReload,
    type: 'switch',
    name: window['$t']('views_components.auto_367'),
    desc: window['$t']('views_components.auto_361'),
    tip: window['$t']('views_components.auto_366')
  },
  {
    key: 'divider1',
    type: 'divider',
    name: '',
    desc: '',
    value: ''
  },
  {
    key: SettingStoreEnums.CHART_TOOLS_STATUS_HIDE,
    value: settingStore.getChartToolsStatusHide,
    type: 'switch',
    name: window['$t']('views_components.auto_358'),
    desc: window['$t']('views_components.auto_362'),
  },
  {
    key: SettingStoreEnums.CHART_TOOLS_STATUS,
    value: settingStore.getChartToolsStatus,
    type: 'select',
    name: window['$t']('views_components.auto_356'),
    desc: window['$t']('views_components.auto_357'),
    options: [
      {
        label: window['$t']('views_components.auto_359'),
        value: ToolsStatusEnum.ASIDE
      },
      {
        label: window['$t']('views_components.auto_369'),
        value: ToolsStatusEnum.DOCK
      }
    ]
  },
  {
    key: 'divider0',
    type: 'divider',
    name: '',
    desc: '',
    value: ''
  },
  {
    key: SettingStoreEnums.CHART_MOVE_DISTANCE,
    value: settingStore.getChartMoveDistance,
    type: 'number',
    name: window['$t']('views_components.auto_364'),
    min: 1,
    step: 1,
    suffix: 'px',
    desc: window['$t']('views_components.auto_365')
  },
  {
    key: SettingStoreEnums.CHART_ALIGN_RANGE,
    value: settingStore.getChartAlignRange,
    type: 'number',
    name: window['$t']('views_components.auto_372'),
    min: 10,
    step: 2,
    suffix: 'px',
    desc: window['$t']('views_components.auto_368')
  }
])

watch(() => props.modelShow, (newValue) => {
  modelShowRef.value = newValue
})

const closeHandle = () => {
  emit('update:modelShow', false)
}

const handleChange = (e: MouseEvent, item: ListType) => {
  settingStore.setItem(item.key, item.value)
}
</script>

<style lang="scss" scoped>
@include go("system-setting") {
  @extend .go-background-filter;
  min-width: 100px;
  max-width: 60vw;
  padding-bottom: 20px;
  .item-left {
    width: 200px;
  }
  .input-num-width {
    width: 100px;
  }
  .select-min-width {
    width: 115px;
  }
  @include deep() {
    .n-list-item {
      border-bottom: 0!important;
    }
    .n-list-item__divider {
      display: none!important;
    }
  }
}
</style>
