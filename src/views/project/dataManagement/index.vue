<template>
  <div class="go-project-data-management">
    <!-- View Danh sách (List View) -->
    <div v-if="currentView === 'list'" class="view-list">
      <div class="content-header">
        <n-space justify="space-between" align="center">
          <n-h2>Thư viện Dữ liệu</n-h2>
          <n-space>
            <n-upload
              :show-file-list="false"
              :custom-request="customUploadRequest"
              accept=".json,.csv,.xlsx,.xls"
            >
              <n-button type="primary">
                <template #icon>
                  <n-icon :component="ShareIcon" />
                </template>
                Tải lên Tập dữ liệu (.json, .csv, .xlsx, .xls)
              </n-button>
            </n-upload>
          </n-space>
        </n-space>
      </div>

      <n-divider />

      <n-data-table
        :columns="columns"
        :data="datasetList"
        :loading="loading"
        :pagination="pagination"
      />
    </div>

    <!-- View Auto-BI (Full-Screen Wizard) -->
    <div v-else-if="currentView === 'auto-bi'" class="view-auto-bi">
      <AutoBIWizard 
        :dataset="selectedDataset" 
        @back="currentView = 'list'"
        @complete="fetchDatasets"
      />
    </div>

    <!-- View Chi tiết (Detail/Excel View) -->
    <div v-else class="view-detail">
      <div class="content-header">
        <n-space justify="space-between" align="center">
          <n-space align="center">
            <n-button secondary @click="currentView = 'list'">
              <template #icon>
                <n-icon :component="ArrowBackIcon" />
              </template>
              Quay lại
            </n-button>
            <n-h2 style="margin: 0">Chi tiết: {{ selectedDatasetName }}</n-h2>
          </n-space>
          <n-tag type="info">{{ previewData.length }} bản ghi</n-tag>
        </n-space>
      </div>

      <n-divider />

      <div class="table-container">
        <n-data-table
          :columns="previewColumns"
          :data="previewData"
          flex-height
          class="excel-table"
          :pagination="{ pageSize: 20 }"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, h, reactive, computed } from 'vue'
import { icon } from '@/plugins'
import { getDatasetsApi, saveDatasetApi, deleteDatasetApi } from '@/api/storage.api'
import { NButton, NSpace, NTag, useDialog, useMessage, NDataTable, NH2, NDivider, NUpload, NIcon } from 'naive-ui'
import { getUUID } from '@/utils'
import * as XLSX from 'xlsx'
import AutoBIWizard from './components/AutoBIWizard.vue'

const { ShareIcon, TrashIcon, EyeOutlineIcon, ArrowBackIcon, FlashIcon } = icon.ionicons5
const message = useMessage()
const dialog = useDialog()

const loading = ref(false)
const datasetList = ref([])
const currentView = ref<'list' | 'detail' | 'auto-bi'>('list')
const selectedDatasetName = ref('')

// Auto-BI Wizard refs
const showAutoBI = ref(false)
const selectedDataset = ref(null)

// Biến cho phần Preview table
const previewData = ref<any[]>([])
const previewColumns = ref<any[]>([])

const pagination = reactive({
  page: 1,
  pageSize: 10,
  showSizePicker: true,
  pageSizes: [10, 20, 50],
  onChange: (page: number) => {
    pagination.page = page
  },
  onUpdatePageSize: (pageSize: number) => {
    pagination.pageSize = pageSize
    pagination.page = 1
  }
})

// Columns của danh sách tập dữ liệu chính
const columns = [
  {
    title: 'Tên tập dữ liệu',
    key: 'name'
  },
  {
    title: 'Định dạng',
    key: 'type',
    render(row: any) {
      const type = row.type.toLowerCase()
      let tagType: 'success' | 'warning' | 'info' | 'error' = 'info'
      if (type === 'json') tagType = 'success'
      else if (type === 'csv') tagType = 'warning'
      else if (type === 'xlsx' || type === 'xls') tagType = 'error'
      
      return h(NTag, { type: tagType, size: 'small' }, { default: () => row.type.toUpperCase() })
    }
  },
  {
    title: 'Ngày cập nhật',
    key: 'updated_at'
  },
  {
    title: 'Thao tác',
    key: 'actions',
    render(row: any) {
      return h(NSpace, null, {
        default: () => [
          h(NButton, {
            size: 'small',
            type: 'primary',
            ghost: true,
            onClick: () => {
              selectedDataset.value = row
              currentView.value = 'auto-bi'
            }
          }, { 
            default: () => 'Auto-BI',
            icon: () => h(NIcon, null, { default: () => h(FlashIcon) })
          }),
          h(NButton, {
            size: 'small',
            onClick: () => handlePreview(row)
          }, { default: () => 'Xem thử' }),
          h(NButton, {
            size: 'small',
            type: 'error',
            ghost: true,
            onClick: () => handleDelete(row)
          }, { default: () => 'Xóa' })
        ]
      })
    }
  }
]

// Lấy danh sách
const fetchDatasets = async () => {
  loading.value = true
  const data = await getDatasetsApi()
  if (data) {
    datasetList.value = data
  }
  loading.value = false
}

// Upload tùy chỉnh
const customUploadRequest = async ({ file }: any) => {
  const reader = new FileReader()
  const fileName = file.name
  const extension = fileName.split('.').pop()?.toLowerCase() || 'json'
  
  reader.onload = async (e) => {
    try {
      let parsedContent: any = null
      
      if (extension === 'json') {
        const content = e.target?.result as string
        parsedContent = JSON.parse(content)
      } else if (extension === 'csv') {
        const content = e.target?.result as string
        // Parser CSV đơn giản (có thể cải tiến sau)
        const lines = content.split('\n').filter(l => l.trim())
        const headers = lines[0].split(',')
        parsedContent = lines.slice(1).map(line => {
          const values = line.split(',')
          const obj: any = {}
          headers.forEach((h, i) => {
            obj[h.trim()] = values[i]?.trim()
          })
          return obj
        })
      } else if (extension === 'xlsx' || extension === 'xls') {
        const data = new Uint8Array(e.target?.result as ArrayBuffer)
        const workbook = XLSX.read(data, { type: 'array' })
        const firstSheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[firstSheetName]
        parsedContent = XLSX.utils.sheet_to_json(worksheet)
      }

      if (!parsedContent) {
        throw new Error('Không thể parse dữ liệu hoặc định dạng không hỗ trợ.')
      }

      const id = getUUID()
      await saveDatasetApi({
        id,
        name: fileName,
        type: extension,
        content: parsedContent
      })
      
      message.success('Tải lên tập dữ liệu thành công!')
      fetchDatasets()
    } catch (err) {
      console.error(err)
      message.error('Lỗi khi đọc file hoặc parser dữ liệu.')
    }
  }
  
  if (extension === 'xlsx' || extension === 'xls') {
    reader.readAsArrayBuffer(file.file)
  } else {
    reader.readAsText(file.file)
  }
}

// Xem thử dạng TABLE (Excel-like)
const handlePreview = (row: any) => {
  const data = row.content
  if (!Array.isArray(data) || data.length === 0) {
    message.warning('Dữ liệu không phải dạng danh sách để hiển thị bảng.')
    return
  }

  // Tự động tạo Columns từ Keys của object đầu tiên
  const firstItem = data[0]
  const keys = Object.keys(firstItem)
  
  previewColumns.value = keys.map(key => ({
    title: key,
    key: key,
    resizable: true,
    minWidth: 100,
    render(r: any) {
      const val = r[key]
      return typeof val === 'object' ? JSON.stringify(val) : String(val)
    }
  }))

  previewData.value = data
  selectedDatasetName.value = row.name
  currentView.value = 'detail'
}

// Xóa
const handleDelete = (row: any) => {
  dialog.warning({
    title: 'Xác nhận xóa',
    content: `Bạn có chắc chắn muốn xóa tập dữ liệu "${row.name}"?`,
    positiveText: 'Xác nhận',
    negativeText: 'Hủy',
    onPositiveClick: async () => {
      await deleteDatasetApi(row.id)
      message.success('Đã xóa tập dữ liệu.')
      fetchDatasets()
    }
  })
}

onMounted(() => {
  fetchDatasets()
})
</script>

<style scoped lang="scss">
.go-project-data-management {
  padding: 24px;
  height: calc(100vh - #{$--header-height}); // Offset by header height
  display: flex;
  flex-direction: column;
}

.view-list, .view-detail {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.content-header {
  margin-bottom: 0px;
  padding-bottom: 15px;
}

.table-container {
  flex: 1;
  overflow: hidden;
  margin-top: 10px;
}

.excel-table {
  height: 100%;
}
</style>
