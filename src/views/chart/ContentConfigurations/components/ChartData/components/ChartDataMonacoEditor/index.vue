<template>
  <template v-if="targetData.filter">
    <n-card>
      <p><span class="func-keyword">function</span>&nbsp;&nbsp;filter(data, res)&nbsp;&nbsp;{</p>
      <!-- Thân Body Function -->
      <div class="go-ml-4">
        <n-code :code="targetData.filter" language="typescript"></n-code>
      </div>
      <p>}</p>
      <template #footer>
        <n-space justify="end">
          <n-button type="primary" tertiary size="small" @click="addFilter">
            <template #icon>
              <n-icon>
                <filter-edit-icon />
              </n-icon>
            </template>
            Sửa (Edit)
          </n-button>
          <n-button tertiary size="small" @click="delFilter"> {{ $t('phase7.auto_87') }} </n-button>
        </n-space>
      </template>
    </n-card>
  </template>
  <template v-else>
    <n-button class="go-ml-3" @click="addFilter">
      <template #icon>
        <n-icon>
          <filter-icon />
        </n-icon>
      </template>
      Thêm+lọc
    </n-button>
  </template>

  <!-- Bảng Tooltip -->
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
                  <n-code :code="toString(sourceData?.data) || window['$t']('views_components.auto_112')" language="json" :word-wrap="true"></n-code>
                </n-space>
              </div>
              <div class="editor-data-show">
                <n-space>
                  <n-text depth="3">{{ $t('phase7.auto_501') }}</n-text>
                  <n-code :code="toString(sourceData) || window['$t']('views_components.auto_112')" language="json" :word-wrap="true"></n-code>
                </n-space>
              </div>
              <div class="editor-data-show">
                <n-space>
                  <n-text depth="3">{{ $t('phase7.auto_154') }}</n-text>
                  <n-code :code="filterRes || window['$t']('views_components.auto_112')" language="json" :word-wrap="true"></n-code>
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
import { ref, computed, watch, toRef, toRefs, toRaw, reactive } from 'vue'
import { useTargetData } from '../../../hooks/useTargetData.hook'
import { MonacoEditor } from '@/components/Pages/MonacoEditor'
import { icon } from '@/plugins'
import { goDialog, toString } from '@/utils'
import { customizeHttp } from '@/api/http'
import cloneDeep from 'lodash/cloneDeep'

const { DocumentTextIcon } = icon.ionicons5
const { FilterIcon, FilterEditIcon } = icon.carbon
const { targetData, chartEditStore } = useTargetData()
const { requestDataType } = toRefs(targetData.value.request)
const { requestOriginUrl } = toRefs(chartEditStore.getRequestGlobalConfig)

// được kiểm soátBảng Tooltip
const showModal = ref(false)
// filter mẫu chức năng
const filter = ref(targetData.value.filter || `return data`)
// cờ lỗi bộ lọc
const errorFlag = ref(false)
// Mục tiêuStatic (Cứng)/giao diệnDữ liệu
const sourceData = ref<any>('')

// Dynamic (Động)LấyDữ liệu
const fetchTargetData = async () => {
  try {
    const res = await customizeHttp(toRaw(targetData.value.request), toRaw(chartEditStore.getRequestGlobalConfig))
    if (res) {
      sourceData.value = res
      return
    }
    window['$message'].warning(window['$t']('views_components.auto_108'))
  } catch (error) {
    console.error(error);
    window['$message'].warning(window['$t']('views_components.auto_104'))
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
    return window['$t']('phase7.auto_1')
  }
})

// Thêm+lọc
const addFilter = () => {
  showModal.value = true
}

// {{ $t('phase7.auto_87') }}lọc
const delFilter = () => {
  goDialog({
    message: window['$t']('views_components.auto_148'),
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
    window['$message'].error(window['$t']('views_components.auto_147'))
    return
  }
  targetData.value.filter = filter.value
  closeFilter()
}

watch(
  () => showModal.value,
  (newData: boolean) => {
    if (newData) {
      fetchTargetData()
      filter.value = targetData.value.filter || `return data`
    }
  }
)
</script>

<style lang="scss" scoped>
.func-keyword {
  color: #b478cf;
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
