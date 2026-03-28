<template>
  <div class="go-chart-data-monaco-editor-container">
    <div class="go-mb-2">
       <n-space justify="space-between" align="center">
         <n-text depth="3" strong>Bộ lọc / Transform</n-text>
         <n-radio-group v-model:value="viewMode" size="small" name="mode-toggle">
            <n-radio-button value="visual">Giao diện</n-radio-button>
            <n-radio-button value="code">Mã nguồn</n-radio-button>
          </n-radio-group>
       </n-space>
    </div>
    
    <div v-if="fetchError" class="go-mb-3 go-px-1">
       <n-alert title="Nguồn dữ liệu không khả dụng" type="warning" :bordered="false" size="small">
         {{ fetchError }}
       </n-alert>
    </div>
    
    <n-card v-if="targetData.filter || viewMode === 'visual'" size="small" :bordered="true">
      <template v-if="viewMode === 'visual'">
        <chart-data-transform-ui v-model:modelValue="targetData.filter" :sourceData="sourceData" />
      </template>

      <template v-else>
        <div class="code-box">
          <p><span class="func-keyword">function</span>&nbsp;&nbsp;filter(data, res)&nbsp;&nbsp;{</p>
          <div class="go-ml-4">
            <n-code :code="targetData.filter || 'return data'" language="typescript"></n-code>
          </div>
          <p>}</p>
        </div>
      </template>

      <template #footer>
        <n-space justify="end">
          <n-button type="primary" tertiary size="small" @click="addFilter">
            <template #icon>
              <n-icon>
                <filter-edit-icon />
              </n-icon>
            </template>
            Chỉnh sửa nâng cao (Advanced Edit)
          </n-button>
          <n-button v-if="targetData.filter" tertiary size="small" @click="delFilter"> {{ $t('phase7.auto_87') }} </n-button>
        </n-space>
      </template>
    </n-card>

    <template v-else>
      <n-button class="go-ml-3" @click="viewMode = 'visual'">
        <template #icon>
          <n-icon>
            <filter-icon />
          </n-icon>
        </template>
        Thêm bộ lọc thông minh
      </n-button>
    </template>
  </div>

  <!-- Bảng Tooltip (Advanced Editor) -->
  <n-modal class="go-chart-data-monaco-editor" v-model:show="showModal" :mask-closable="false" :closeOnEsc="false">
    <n-card :bordered="false" role="dialog" size="small" aria-modal="true" style="width: 1000px; height: 600px">
      <template #header>
        <n-space>
          <n-text>{{ $t('phase7.auto_20') }}</n-text>
        </n-space>
      </template>
      <template #header-extra> </template>
      <n-space size="small" vertical>
        <n-space justify="space-between">
          <div>
            <n-space vertical>
              <n-tag type="info">
                <span class="func-keyword">function</span>&nbsp;&nbsp;filter(data, res)&nbsp;&nbsp;{
              </n-tag>
              <monaco-editor v-model:modelValue="filter" width="460px" height="380px" language="javascript" />
              <n-tag type="info">}</n-tag>
            </n-space>
          </div>
          <n-divider vertical style="height: 480px" />
          <n-scrollbar style="max-height: 480px">
            <n-space :size="15" vertical>
              <div class="editor-data-show">
                <n-space>
                  <n-text depth="3">{{ $t('phase7.auto_160') }}</n-text>
                  <n-code :code="toString(sourceData?.data) || windowAny['$t']('views_components.auto_112')" language="json" :word-wrap="true"></n-code>
                </n-space>
              </div>
              <div class="editor-data-show">
                <n-space>
                  <n-text depth="3">{{ $t('phase7.auto_501') }}</n-text>
                  <n-code :code="toString(sourceData) || windowAny['$t']('views_components.auto_112')" language="json" :word-wrap="true"></n-code>
                </n-space>
              </div>
              <div class="editor-data-show">
                <n-space>
                  <n-text depth="3">{{ $t('phase7.auto_154') }}</n-text>
                  <n-code :code="filterRes || windowAny['$t']('views_components.auto_112')" language="json" :word-wrap="true"></n-code>
                </n-space>
              </div>
            </n-space>
          </n-scrollbar>
        </n-space>
      </n-space>
      <template #action>
        <n-space justify="space-between">
          <div class="go-flex-items-center">
            <n-tag :bordered="false" type="primary">
              <template #icon>
                <n-icon :component="DocumentTextIcon" />
              </template>
              Rule Format
            </n-tag>
            <n-text class="go-ml-2" depth="2">{{ $t('phase7.auto_416') }}</n-text>
          </div>

          <n-space>
            <n-button size="medium" @click="closeFilter">{{ $t('phase7.auto_311') }}</n-button>
            <n-button size="medium" type="primary" @click="saveFilter">{{ $t('phase7.auto_447') }}</n-button>
          </n-space>
        </n-space>
      </template>
    </n-card>
  </n-modal>
</template>

<script lang="ts" setup>
import { ref, computed, watch, toRef, toRefs, toRaw, reactive, onMounted } from 'vue'
import { useTargetData } from '../../../hooks/useTargetData.hook'
import { MonacoEditor } from '@/components/Pages/MonacoEditor'
import { icon } from '@/plugins'
import { goDialog, toString } from '@/utils'
import { customizeHttp } from '@/api/http'
import cloneDeep from 'lodash/cloneDeep'
import ChartDataTransformUi from './components/ChartDataTransformUi.vue'

const { DocumentTextIcon } = icon.ionicons5
const { FilterIcon, FilterEditIcon } = icon.carbon
const { targetData, chartEditStore } = useTargetData()

const windowAny = window as any

// được kiểm soátBảng Tooltip
const showModal = ref(false)
// filter mẫu chức năng
const filter = ref(targetData.value.filter || `return data`)
// cờ lỗi bộ lọc
const errorFlag = ref(false)
// Mục tiêuStatic (Cứng)/giao diệnDữ liệu
const sourceData = ref<any>(null)
// Lỗi fetch dữ liệu
const fetchError = ref<string | null>(null)

// Chế độ xem: visual | code - MẶC ĐỊNH LUÔN LÀ VISUAL
// Chế độ xem: visual | code
const viewMode = ref<'visual' | 'code'>('visual')

// Dynamic (Động)LấyDữ liệu
const fetchTargetData = async () => {
  try {
    const res = await customizeHttp(toRaw(targetData.value.request), toRaw(chartEditStore.getRequestGlobalConfig))
    if (res?.data) {
       sourceData.value = res.data
       fetchError.value = ""
    } else {
       // Fallback to existing chart data if remote is empty
       if (targetData.value.option.dataset) {
         sourceData.value = targetData.value.option.dataset
         fetchError.value = "Sử dụng dữ liệu hiện có (Không thể tải mới)"
       } else {
         fetchError.value = windowAny['$t'] ? windowAny['$t']('phase7.auto_14') : "Không thể tải nguồn dữ liệu. Hãy kiểm tra lại kết nối API."
       }
    }
  } catch (error: any) {
    console.error('[Transformer Fetch Error]', error);
    
    // Provide detailed diagnostic message
    const diagnostic = error.diagnostic ? ` (${error.diagnostic})` : ''
    
    if (targetData.value.option.dataset) {
      sourceData.value = targetData.value.option.dataset
      fetchError.value = `Nguồn 404 - Đang hiển thị dữ liệu cục bộ.${diagnostic}`
    } else if (error?.response?.status === 404) {
      fetchError.value = `Nguồn dữ liệu này không tồn tại hoặc đã bị xóa (404).${diagnostic}`
    } else {
      const defaultMsg = windowAny['$t'] ? windowAny['$t']('phase7.auto_14') : "Không thể tải nguồn dữ liệu. Hãy kiểm tra lại kết nối API."
      fetchError.value = `${defaultMsg}${diagnostic}`
    }
  }
}

// lọc{{ $t('phase7.auto_412') }}
const filterRes = computed(() => {
  try {
    const fn = new Function('data', 'res', filter.value)
    const response = cloneDeep(sourceData.value)
    const res = fn(response?.data, response)
    // eslint-disable-next-line vue/no-side-effects-in-computed-properties
    errorFlag.value = false
    return toString(res)
  } catch (error) {
    // eslint-disable-next-line vue/no-side-effects-in-computed-properties
    errorFlag.value = true
    return windowAny['$t']('phase7.auto_1')
  }
})

// Thêm+lọc
const addFilter = () => {
  showModal.value = true
}

// {{ $t('phase7.auto_87') }}lọc
const delFilter = () => {
  goDialog({
    message: windowAny['$t']('views_components.auto_148'),
    onPositiveCallback: () => {
      targetData.value.filter = undefined
    }
  })
}

// Đóng bộ lọc
const closeFilter = () => {
  showModal.value = false
}

// Thêm+lọc
const saveFilter = () => {
  if (errorFlag.value) {
    windowAny['$message'].error(windowAny['$t']('views_components.auto_147'))
    return
  }
  targetData.value.filter = filter.value
  closeFilter()
}

// Watch switch chart
watch(() => targetData.value.id, () => {
   fetchTargetData()
   viewMode.value = 'visual' // Luôn reset về visual khi đổi biểu đồ
}, { immediate: true })

</script>

<style lang="scss" scoped>
.func-keyword {
  color: #b478cf;
}
.code-box {
  padding: 10px;
  background-color: rgba(0,0,0,0.2);
  border-radius: 4px;
}
@include go('chart-data-monaco-editor') {
  &.n-card.n-modal,
  .n-card {
    @extend .go-background-filter;
  }
  .editor-data-show {
    @include fetch-bg-color('filter-color');
    width: 420px;
    padding: 20px;
    border-radius: 5px;
  }
}
</style>

<style lang="scss" scoped>
.func-keyword {
  color: #b478cf;
}
.code-box {
  padding: 10px;
  background-color: rgba(0,0,0,0.2);
  border-radius: 4px;
}
@include go('chart-data-monaco-editor') {
  &.n-card.n-modal,
  .n-card {
    @extend .go-background-filter;
  }
  .editor-data-show {
    @include fetch-bg-color('filter-color');
    width: 420px;
    padding: 20px;
    border-radius: 5px;
  }
}
</style>
