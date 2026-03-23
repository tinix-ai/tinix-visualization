<template>
  <n-collapse-item :title="$t('views_components.auto_238')"
 name="3">
    <template #header-extra>
      <n-button type="primary" tertiary size="small" @click.stop="showModal = true">
        <template #icon>
          <n-icon>
            <pencil-icon />
          </n-icon>
        </template>
        Sửa (Edit)
      </n-button>
    </template>
    <n-card class="collapse-show-box">
      <!-- Thân Body Function -->
      <div v-for="eventName in EventLife" :key="eventName">
        <p>
          <span class="func-annotate">// {{ EventLifeName[eventName] }}</span>
          <br />
          <span class="func-keyword">async {{ eventName }}</span> (e, components, echarts, node_modules) {
        </p>
        <p class="go-ml-4">
          <n-code :code="(targetData.events.advancedEvents || {})[eventName] || ''" language="typescript"></n-code>
        </p>
        <p>}<span>,</span></p>
      </div>
    </n-card>
  </n-collapse-item>

  <!-- Bảng Tooltip -->
  <n-modal class="go-chart-data-monaco-editor" v-model:show="showModal" :mask-closable="false">
    <n-card :bordered="false" role="dialog" size="small" aria-modal="true" style="width: 1200px; height: 700px">
      <template #header>
        <n-space>
          <n-text>{{ $t('phase7.auto_207') }}</n-text>
        </n-space>
      </template>

      <template #header-extra> </template>

      <n-layout has-sider sider-placement="right">
        <n-layout style="height: 580px; padding-right: 20px">
          <n-tabs v-model:value="editTab" type="card" tab-style="min-width: 100px;">
            <!-- Mẹo -->
            <template #suffix>
              <n-text class="tab-tip" type="warning">{{ $t('phase7.auto_180') }}</n-text>
            </template>
            <n-tab-pane
              v-for="(eventName, index) in EventLife"
              :key="index"
              :tab="`${EventLifeName[eventName]}-${eventName}`"
              :name="eventName"
            >
              <!-- chức năngDanh xưng -->
              <p class="go-pl-3">
                <span class="func-keyword">async function &nbsp;&nbsp;</span>
                <span class="func-keyNameWord">{{ eventName }}(e, components, echarts, node_modules)&nbsp;&nbsp;{</span>
              </p>
              <!-- Edit gốc -->
              <monaco-editor v-model:modelValue="advancedEvents[eventName]" height="480px" language="javascript" />
              <!-- kết thúc chức năng -->
              <p class="go-pl-3 func-keyNameWord">}</p>
            </n-tab-pane>
          </n-tabs>
        </n-layout>
        <n-layout-sider
          :collapsed-width="14"
          :width="340"
          show-trigger="bar"
          collapse-mode="transform"
          content-style="padding: 12px 12px 0px 12px;margin-left: 3px;"
        >
          <n-tabs default-value="1" justify-content="space-evenly" type="segment">
            <!-- Kết quả xác minh -->
            <n-tab-pane :tab="$t('views_components.auto_228')"
 name="1" size="small">
              <n-scrollbar trigger="none" style="max-height: 505px">
                <n-collapse class="go-px-3" arrow-placement="right" :default-expanded-names="[1, 2, 3]">
                  <template v-for="error in [validEvents()]" :key="error">
                    <n-collapse-item :title="$t('views_components.auto_235')"
 :name="1">
                      <n-text depth="3">{{ error.errorFn || window['$t']('views_components.auto_112') }}</n-text>
                    </n-collapse-item>
                    <n-collapse-item :title="$t('views_components.auto_236')"
 :name="2">
                      <n-text depth="3">{{ error.name || window['$t']('views_components.auto_112') }}</n-text>
                    </n-collapse-item>
                    <n-collapse-item :title="$t('views_components.auto_226')"
 :name="3">
                      <n-text depth="3">{{ error.message || window['$t']('views_components.auto_112') }}</n-text>
                    </n-collapse-item>
                  </template>
                </n-collapse>
              </n-scrollbar>
            </n-tab-pane>
            <!-- phụ trợHướng dẫn -->
            <n-tab-pane :tab="$t('views_components.auto_227')"
 name="2">
              <n-scrollbar trigger="none" style="max-height: 505px">
                <n-collapse class="go-px-3" arrow-placement="right" :default-expanded-names="[1, 2, 3, 4]">
                  <n-collapse-item title="e" :name="1">
                    <n-text depth="3">{{ $t('phase7.auto_64') }}</n-text>
                  </n-collapse-item>
                  <n-collapse-item title="this" :name="2">
                    <n-text depth="3">{{ $t('phase7.auto_36') }}</n-text>
                    <br />
                    <n-tag class="go-m-1" v-for="prop in ['refs', 'setupState', 'ctx', 'props', '...']" :key="prop">{{
                      prop
                    }}</n-tag>
                  </n-collapse-item>
                  <n-collapse-item title="components" :name="3">
                    <n-text depth="3"
                      >{{ $t('phase7.auto_228') }}</n-text
                    >
                    <n-code :code="`{\n  [id]: component\n}`" language="typescript"></n-code>
                  </n-collapse-item>
                  <n-collapse-item title="node_modules" :name="4">
                    <n-text depth="3">{{ $t('phase7.auto_262') }}</n-text>
                    <br />
                    <n-tag class="go-m-1" v-for="pkg in Object.keys(npmPkgs || {})" :key="pkg">{{ pkg }}</n-tag>
                  </n-collapse-item>
                </n-collapse>
              </n-scrollbar>
            </n-tab-pane>
            <!-- Giới thiệu vụ việc -->
            <n-tab-pane :tab="$t('views_components.auto_231')"
 name="3">
              <n-scrollbar trigger="none" style="max-height: 505px">
                <n-collapse arrow-placement="right">
                  <n-collapse-item
                    v-for="(item, index) in templateList"
                    :key="index"
                    :title="window['$t']('views_components.auto_232')"
                    :name="index"
                  >
                    <n-code :code="item.code" language="typescript"></n-code>
                  </n-collapse-item>
                </n-collapse>
              </n-scrollbar>
            </n-tab-pane>
          </n-tabs>
        </n-layout-sider>
      </n-layout>

      <template #action>
        <n-space justify="space-between">
          <div class="go-flex-items-center">
            <n-tag :bordered="false" type="primary">
              <template #icon>
                <n-icon :component="DocumentTextIcon" />
              </template>
              Hướng dẫn
            </n-tag>
            <n-text class="go-ml-2" depth="2">{{ $t('phase7.auto_331') }}</n-text>
          </div>

          <n-space>
            <n-button size="medium" @click="closeEvents">{{ $t('phase7.auto_311') }}</n-button>
            <n-button size="medium" type="primary" @click="saveEvents">{{ $t('phase7.auto_447') }}</n-button>
          </n-space>
        </n-space>
      </template>
    </n-card>
  </n-modal>
</template>

<script lang="ts" setup>
import { ref, computed, watch, toRefs, toRaw } from 'vue'
import { MonacoEditor } from '@/components/Pages/MonacoEditor'
import { useTargetData } from '../../../hooks/useTargetData.hook'
import { templateList } from './importTemplate'
import { npmPkgs } from '@/hooks'
import { icon } from '@/plugins'
import { CreateComponentType } from '@/packages/index.d'
import { EventLife } from '@/enums/eventEnum'

const { targetData, chartEditStore } = useTargetData()
const { DocumentTextIcon, ChevronDownIcon, PencilIcon } = icon.ionicons5

const EventLifeName = {
  [EventLife.VNODE_BEFORE_MOUNT]: window['$t']('views_components.auto_234'),
  [EventLife.VNODE_MOUNTED]: window['$t']('views_components.auto_233')
}

const EventLifeTip = {
  [EventLife.VNODE_BEFORE_MOUNT]: window['$t']('views_components.auto_230'),
  [EventLife.VNODE_MOUNTED]: window['$t']('views_components.auto_237')
}

// được kiểm soátBảng Tooltip
const showModal = ref(false)
// Sửa (Edit)kiểm soát khu vực
const editTab = ref(EventLife.VNODE_MOUNTED)
// events mẫu chức năng
let advancedEvents = ref({ ...targetData.value.events.advancedEvents })
// Sự kiệnxác định lỗi
const errorFlag = ref(false)

// Xác thực cú pháp
const validEvents = () => {
  let errorFn = ''
  let message = ''
  let name = ''

  errorFlag.value = Object.entries(advancedEvents.value).every(([eventName, str]) => {
    try {
      // ủng hộawait, xác minh cú pháp
      const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor
      new AsyncFunction(str)
      return true
    } catch (error: any) {
      message = error.message
      name = error.name
      errorFn = eventName
      return false
    }
  })
  return {
    errorFn,
    message,
    name
  }
}

// đóng cửaSự kiện
const closeEvents = () => {
  showModal.value = false
}

// Thêm+Sự kiện
const saveEvents = () => {
  if (validEvents().errorFn) {
    window['$message'].error(window['$t']('views_components.auto_229'))
    return
  }
  if (Object.values(advancedEvents.value).join('').trim() === '') {
    // Thông thoángSự kiện
    targetData.value.events.advancedEvents = {
      vnodeBeforeMount: undefined,
      vnodeMounted: undefined
    }
  } else {
    targetData.value.events.advancedEvents = { ...advancedEvents.value }
  }
  closeEvents()
}

watch(
  () => showModal.value,
  (newData: boolean) => {
    if (newData) {
      advancedEvents.value = { ...targetData.value.events.advancedEvents }
    }
  }
)
</script>

<style lang="scss" scoped>
@import '../index.scss';
</style>
