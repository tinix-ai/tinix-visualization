<template>
  <n-timeline class="go-chart-configurations-timeline">
    <!-- đối phó với echarts củaDữ liệulập bản đồ -->
    <n-timeline-item v-if="isCharts && dimensionsAndSource" type="info" :title="TimelineTitleEnum.MAPPING">
      <n-table striped size="small" :single-line="false" style="font-size: 12px;">
        <thead>
          <tr>
            <th style="width: 80px;">Trường</th>
            <th>Ánh xạ</th>
            <th style="width: 40px; text-align: center;">Th.thái</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in dimensionsAndSource" :key="index">
            <td style="font-weight: bold;">
               <n-ellipsis :line-clamp="1">{{ item.field }}</n-ellipsis>
            </td>
            <td>
              <n-text depth="3">{{ item.mapping }}</n-text>
            </td>
            <td style="text-align: center;">
              <n-tooltip trigger="hover">
                <template #trigger>
                   <n-badge dot :type="item.result === 0 || item.result === 1 ? 'success' : 'error'"></n-badge>
                </template>
                {{ item.result === 0 || item.result === 1 ? 'Khớp dữ liệu' : 'Chưa có dữ liệu' }}
              </n-tooltip>
            </td>
          </tr>
        </tbody>
      </n-table>
    </n-timeline-item>
    <!-- đối phó với vcharts củaDữ liệulập bản đồ -->
    <n-timeline-item v-if="isVChart" type="info" :title="TimelineTitleEnum.MAPPING">
      <n-table striped>
        <thead>
          <tr>
            <th v-for="item in vchartTableTitle" :key="item">{{ item }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in fieldList" :key="item.field">
            <td>
              <n-ellipsis style="width: 70px; max-width: 240px">
                {{ item.field }}
              </n-ellipsis>
            </td>
            <td v-if="isArray(item.mapping)">
              <n-space :size="4" vertical>
                <n-input
                  v-for="(mappingItem, index) in item.mapping"
                  :key="index"
                  v-model:value="item.mapping[index]"
                  type="tiny"
                  size="small"
                  :placeholder="$t('views_components.auto_138')"

                  @change="() => (item.result = matchingHandle(item.mapping[index]))"
                />
              </n-space>
            </td>
            <td v-else>
              <n-input v-model:value="item.mapping" type="text" size="small" :placeholder="$t('views_components.auto_126')"
 />
            </td>
            <!-- <td>
              <n-space style="width: 70px" :size="4">
                <n-badge dot :type="item.result === 1 ? 'success' : 'error'"></n-badge>
                <n-text>{{ $t('phase7.auto_232') }}</n-text>
              </n-space>
            </td> -->
          </tr>
        </tbody>
      </n-table>
    </n-timeline-item>
    <n-timeline-item v-show="filterShow" color="#97846c" :title="TimelineTitleEnum.FILTER">
      <n-space :size="18" vertical>
        <n-text depth="3">{{ $t('phase7.auto_416') }}</n-text>
        <chart-data-monaco-editor></chart-data-monaco-editor>
      </n-space>
    </n-timeline-item>
    <n-timeline-item type="success" :title="TimelineTitleEnum.CONTENT">
      <n-space vertical>
        <n-space class="source-btn-box">
          <n-button class="sourceBtn-item" :disabled="noData" @click="openOnlineEditHandle">
            <template #icon>
              <n-icon>
                <EditIcon />
              </n-icon>
            </template>
            Sửa (Edit)
          </n-button>
          <n-upload
            v-model:file-list="uploadFileListRef"
            :show-file-list="false"
            :customRequest="customRequest"
            @before-upload="beforeUpload"
          >
            <n-space>
              <n-button v-if="!ajax" class="sourceBtn-item" :disabled="noData">
                <template #icon>
                  <n-icon>
                    <document-add-icon />
                  </n-icon>
                </template>
                Nhập vào (Import)（json / txt）
              </n-button>
            </n-space>
          </n-upload>
          <div>
            <n-button class="sourceBtn-item" :disabled="noData" @click="download">
              <template #icon>
                <n-icon>
                  <document-download-icon />
                </n-icon>
              </template>
              Tải xuống
            </n-button>
            <n-tooltip trigger="hover">
              <template #trigger>
                <n-icon class="go-ml-1" size="21" :depth="3">
                  <help-outline-icon></help-outline-icon>
                </n-icon>
              </template>
              <span>{{ $t('phase7.auto_217') }}</span>
            </n-tooltip>
          </div>
        </n-space>
        <n-card size="small">
          <n-code :code="toString(source)" language="json"></n-code>
        </n-card>
      </n-space>
    </n-timeline-item>
  </n-timeline>
  <!-- Sửa (Edit)Dữ liệu -->
  <n-modal
    class="go-online-edit go-background-filter"
    :title="windowAny['$t'] ? windowAny['$t']('views_components.auto_130') + targetData.chartConfig.title : 'Chỉnh sửa ' + targetData.chartConfig.title"
    preset="card"
    size="small"
    style="width: 800px"
    v-model:show="showRef"
    transform-origin="center"
    :mask-closable="false"
    :bordered="true"
    @afterLeave="closeOlineEditHandle"
    content-style="padding: 0;"
  >
    <n-divider style="margin: 4px 0 10px" />
    <monaco-editor
      v-model:modelValue="editorCode"
      height="70vh"
      :language="targetData.chartConfig.chartKey === 'VHtmlCommon' ? 'html' : 'json'"
    />
    <template #action>
      <n-space justify="space-between">
        <div class="go-flex-items-center">
          <n-tag :bordered="false" type="primary" style="border-radius: 5px">
            <template #icon>
              <n-icon :component="DocumentTextIcon" />
            </template>
            Hướng dẫn
          </n-tag>
          <n-space :wrap-item="false" vertical>
            <n-text class="go-ml-2" depth="3" style="font-size: 1">
              1. Mã định dạng:
              <n-tag :bordered="false" type="warning" style="font-size: 12px">( shift + alt + f ) </n-tag>
              <n-divider vertical />
              <n-tag :bordered="false" type="warning" style="font-size: 12px">{{ $t('phase7.auto_93') }}</n-tag>
            </n-text>
            <n-text class="go-ml-2" depth="3" style="font-size: 1; text-align: left">
              2. String phải bọc nháy kép "", nếu thiếu sẽ lỗi đỏ tưng bừng
            </n-text>
          </n-space>
        </div>
        <n-space>
          <n-button class="go-px-4" :focusable="false" @click="closeOlineEditHandle">{{ $t('phase7.auto_311') }}</n-button>
          <n-button class="go-px-4" type="primary" @click="saveOlineEditHandle"> {{ $t('phase7.auto_447') }} </n-button>
        </n-space>
      </n-space>
    </template>
  </n-modal>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { ChartFrameEnum } from '@/packages/index.d'
import { RequestDataTypeEnum } from '@/enums/httpEnum'
import { icon } from '@/plugins'
import { DataResultEnum, TimelineTitleEnum } from '../../index.d'
import { ChartDataMonacoEditor } from '../ChartDataMonacoEditor'
import { useFile } from '../../hooks/useFile.hooks'
import { useTargetData } from '../../../hooks/useTargetData.hook'
import { toString, isArray, goDialog } from '@/utils'
// @ts-ignore
import MonacoEditor from '@/components/Pages/MonacoEditor/index.vue'

const { targetData } = useTargetData()
defineProps({
  show: {
    type: Boolean,
    required: false
  },
  ajax: {
    type: Boolean,
    required: true
  }
})

// tiêu đề bảng
const tableTitle = ['Trường', 'Ánh xạ', 'Trạng thái']
const vchartTableTitle = ['Trường', 'Ánh xạ']

const { HelpOutlineIcon, DocumentTextIcon } = icon.ionicons5
const { DocumentAddIcon, DocumentDownloadIcon, EditIcon } = icon.carbon

const windowAny = window as any

const source = ref()
const dimensions = ref()
const dimensionsAndSource = ref()
const noData = ref(false)
const showRef = ref(false)
// Sửa (Edit)mã số
const editorCode = ref('')

// lập bản đồDanh sách, Chú ý đến nội bộmappingđáp ứng,TrênĐảng cần được sửa đổi
const fieldList = ref<
  Array<{
    field: string
    mapping: string[]
    result: DataResultEnum
  }>
>([])

const { uploadFileListRef, customRequest, beforeUpload, download } = useFile(targetData)

// liệuXem / Hátlọc
const filterShow = computed(() => {
  return targetData.value.request.requestDataType !== RequestDataTypeEnum.STATIC
})

// là hỗ trợ dataset củaBiểu loại đồ thị
const isCharts = computed(() => {
  return targetData.value.chartConfig.chartFrame === ChartFrameEnum.ECHARTS
})
// là hỗ trợ vchart củaBiểu loại đồ thị
const isVChart = computed(() => {
  return targetData.value.chartConfig.chartFrame === ChartFrameEnum.VCHART
})

// Xử lý ánh xạDanh sáchkết quả trạng thái
const matchingHandle = (mapping: string) => {
  let res = DataResultEnum.SUCCESS
  for (let i = 0; i < source.value.length; i++) {
    if (source.value[i][mapping] === undefined) {
      res = DataResultEnum.FAILURE
      return res
    }
  }
  return DataResultEnum.SUCCESS
}

// Xử lý ánh xạDanh sách
const dimensionsAndSourceHandle = () => {
  try {
    // Xóa mục đầu tiênDữ liệuNhận dạng trục
    return dimensions.value.map((dimensionsItem: string, index: number) => {
      return index === 0
        ? {
            // Cánh đồng
            field: windowAny['$t'] ? windowAny['$t']('views_components.auto_132') : 'Nhãn',
            // lập bản đồ
            mapping: dimensionsItem,
            // {{ $t('phase7.auto_412') }}
            result: DataResultEnum.NULL
          }
        : {
            field: windowAny['$t'] ? windowAny['$t']('phase7.auto_13') : 'Dữ liệu',
            mapping: dimensionsItem,
            result: matchingHandle(dimensionsItem)
          }
    })
  } catch (error) {
    return []
  }
}

// đối phó với vchart lập bản đồDanh sách
const initFieldListHandle = () => {
  if (targetData.value?.option) {
    fieldList.value = []
    // {{ $t('phase7.auto_182') }}Danh xưng, tìm trong số đó Field kết thúc của key giá trị tổng hợp
    for (const key in targetData.value.option) {
      if (key.endsWith('Field')) {
        const value = targetData.value.option[key]
        targetData.value.option[key] = value
        const item = {
          field: key,
          mapping: value,
          result: DataResultEnum.SUCCESS
        }
        if (item.mapping === undefined) {
          item.result = DataResultEnum.FAILURE
        }
        fieldList.value.push(item)
      }
    }
  }
}

// mở trực tuyếnSửa (Edit)
const openOnlineEditHandle = () => {
  showRef.value = true
  if (targetData.value.chartConfig.chartKey !== 'VHtmlCommon') {
    editorCode.value = JSON.stringify(source.value, null, 2)
  } else {
    editorCode.value = source.value
  }
}

// {{ $t('phase7.auto_311') }}trực tuyếnSửa (Edit)
const closeOlineEditHandle = () => {
  showRef.value = false
}

// Hủy trực tuyếnSửa (Edit)
const saveOlineEditHandle = () => {
  // Cài Đặt Chỉnh
  const setDataHandle = (newData: any) => {
    targetData.value.option.dataset = newData
  }
  goDialog({
    message: windowAny['$t'] ? windowAny['$t']('views_components.auto_134') : 'Lưu thay đổi dữ liệu?',
    onPositiveCallback: () => {
      try {
        let jsonData = editorCode.value
        if (targetData.value.chartConfig.chartKey !== 'VHtmlCommon') {
          jsonData = JSON.parse(jsonData)
        }
        if (typeof jsonData !== typeof source.value) {
          goDialog({
            message: windowAny['$t'] ? windowAny['$t']('views_components.auto_137') : 'Định dạng không khớp, bạn có chắc chắn?',
            onPositiveCallback: () => {
              try {
                setDataHandle(jsonData)
                editorCode.value = ''
                windowAny['$message']?.success(windowAny['$t'] ? windowAny['$t']('views_components.auto_127') : 'Lưu thành công')
                closeOlineEditHandle()
              } catch (error) {
                windowAny['$message']?.error(windowAny['$t'] ? windowAny['$t']('views_components.auto_135') : 'Lỗi lưu dữ liệu')
              }
            }
          })
        } else {
          try {
            setDataHandle(jsonData)
            editorCode.value = ''
            windowAny['$message']?.success(windowAny['$t'] ? windowAny['$t']('views_components.auto_127') : 'Lưu thành công')
            closeOlineEditHandle()
          } catch (error) {
            windowAny['$message']?.error(windowAny['$t'] ? windowAny['$t']('views_components.auto_135') : 'Lỗi lưu dữ liệu')
          }
        }
      } catch (error) {
        console.log(error)
        window['$message'].error(window['$t']('views_components.auto_135'))
      }
    }
  })
}

watch(
  () => targetData.value?.option?.dataset,
  (
    newData?: {
      source: any
      dimensions: any
    } | null
  ) => {
    noData.value = false
    if (newData && targetData?.value?.chartConfig?.chartFrame === ChartFrameEnum.ECHARTS) {
      // chỉ một DataSet Dữ liệuCó một định dạng tương ứng
      source.value = newData
      if (isCharts.value) {
        dimensions.value = newData.dimensions
        dimensionsAndSource.value = dimensionsAndSourceHandle()
      }
    } else if (newData && targetData?.value?.chartConfig?.chartFrame === ChartFrameEnum.VCHART) {
      source.value = newData
      initFieldListHandle()
    } else if (newData !== undefined && newData !== null) {
      dimensionsAndSource.value = null
      source.value = newData
      fieldList.value = []
    } else {
      noData.value = true
      source.value = windowAny['$t'] ? windowAny['$t']('views_components.auto_133') : 'Chưa có nguồn dữ liệu'
    }
    if (isArray(newData)) {
      dimensionsAndSource.value = null
    }
  },
  {
    immediate: true
  }
)
</script>

<style lang="scss" scoped>
@include go('chart-configurations-timeline') {
  @include deep() {
    pre {
      white-space: pre-wrap;
      word-wrap: break-word;
    }
  }
  .source-btn-box {
    margin-top: 10px !important;
  }
}
</style>
