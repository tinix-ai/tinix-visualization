<template>
  <div class="auto-bi-wizard-fullscreen">
    <div class="wizard-header">
      <n-space justify="space-between" align="center">
        <n-space align="center">
          <n-button secondary @click="$emit('back')">
            <template #icon>
              <n-icon :component="ArrowBackIcon" />
            </template>
            Quay lại
          </n-button>
          <n-h2 style="margin: 0">Auto-BI Workspace: {{ dataset?.name }}</n-h2>
        </n-space>
        <n-space>
          <n-button @click="handleRestart" ghost type="warning" size="small" v-if="currentStep > 1">Bắt đầu lại</n-button>
          <n-button @click="handleSaveDraft" :loading="saveLoading">Lưu nháp</n-button>
          <n-button type="primary" :loading="loading" @click="handleGenerate" v-if="currentStep === 3">
            Sinh dự án ngay
          </n-button>
        </n-space>
      </n-space>
      <n-divider style="margin: 15px 0" />
      <n-steps :current="currentStep" :status="currentStatus" size="small">
        <n-step title="Phân tích dữ liệu" description="AI nhận diện Schema" />
        <n-step title="Chọn biểu đồ" description="Gợi ý từ AI" />
        <n-step title="Hoàn tất" description="Sẵn sàng sinh Dashboard" />
      </n-steps>
    </div>

    <div class="wizard-content-scroll" v-loading="loading">
      <!-- Bước 1: Review Schema -->
      <div v-if="currentStep === 1" class="step-container">
        <n-space justify="space-between" align="center" class="mb-4">
          <n-h4 style="margin: 0">Xác nhận cấu trúc dữ liệu</n-h4>
          <n-button size="small" type="warning" ghost @click="startAnalysis(true)">
            <template #icon><n-icon :component="FlashIcon" /></template>
            Phân tích lại bằng AI
          </n-button>
        </n-space>
        
        <n-data-table
          :columns="schemaColumns"
          :data="analysisResult.columns"
          :max-height="400"
          bordered
          class="schema-table"
        />
        
        <div class="insights-box mt-6">
          <n-h5>AI Insights:</n-h5>
          <n-alert title="Nhận định từ AI" type="info" :show-icon="false">
            <ul>
              <li v-for="(insight, index) in analysisResult.insights" :key="index">
                {{ insight }}
              </li>
            </ul>
          </n-alert>
        </div>
      </div>

      <!-- Bước 2: Chọn biểu đồ -->
      <div v-if="currentStep === 2" class="step-container">
        <n-space justify="space-between" align="center" class="mb-4">
          <n-h4 style="margin: 0">Gợi ý trực quan hóa</n-h4>
          <n-button size="small" type="warning" ghost @click="fetchSuggestions(true)">
            <template #icon><n-icon :component="FlashIcon" /></template>
            Gợi ý lại
          </n-button>
        </n-space>

        <n-alert v-if="executiveSummary" title="Tóm tắt thông điệp từ AI" type="success" :show-icon="true" class="mb-4">
          {{ executiveSummary }}
        </n-alert>

        <n-grid :cols="3" :x-gap="16" :y-gap="16">
          <n-grid-item v-for="(chart, index) in suggestedCharts" :key="index">
            <n-card 
              size="small" 
              :title="chart.title" 
              hoverable 
              :class="{ 'is-selected': chart.selected }"
              @click="chart.selected = !chart.selected"
            >
              <template #header-extra>
                <n-checkbox v-model:checked="chart.selected" @click.stop />
              </template>
              <n-space vertical>
                <n-tag :type="getChartTagType(chart.chartType)" size="small">
                  {{ chart.chartType }}
                </n-tag>
                <n-text depth="3" class="reason-text">{{ chart.reason }}</n-text>
                <n-divider dashed style="margin: 8px 0" />
                <n-text size="small" depth="3">
                  Mapping: <b>{{ chart.mapping.x }}</b> vs <b>{{ chart.mapping.y }}</b>
                </n-text>
              </n-space>
            </n-card>
          </n-grid-item>
        </n-grid>
      </div>

      <!-- Bước 3: Cấu hình cuối -->
      <div v-if="currentStep === 3" class="step-container narrow-view">
        <n-h4>Cấu hình dự án</n-h4>
        <n-form-item label="Tên dự án Dashboard">
          <n-input v-model:value="projectName" placeholder="Nhập tên dự án..." size="large" />
        </n-form-item>
        <n-form-item label="Chủ đề (Theme)">
          <n-select v-model:value="projectTheme" :options="themeOptions" />
        </n-form-item>
        
        <n-card title="Tóm tắt Dashboard" size="small" class="mt-4">
          <n-statistic label="Số lượng biểu đồ sẽ tạo" :value="selectedChartsCount" />
          <div class="mt-2">
            <n-tag v-for="c in selectedCharts" :key="c.id" size="small" style="margin-right: 4px;">
              {{ c.title }}
            </n-tag>
          </div>
        </n-card>
      </div>
    </div>

    <div class="wizard-footer">
      <n-space justify="center" size="large">
        <n-button v-if="currentStep > 1" @click="currentStep--">Quay lại</n-button>
        <n-button v-if="currentStep < 3" type="primary" size="large" :loading="loading" @click="handleNext" style="width: 200px">
          Tiếp theo
        </n-button>
        <n-button v-else type="primary" size="large" :loading="loading" @click="handleGenerate" style="width: 200px">
          Sinh dự án Dashboard
        </n-button>
      </n-space>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, h, computed, toRaw } from 'vue'
import { 
  NButton, NSpace, NDataTable, NTag, NH2, NH4, NH5, NDivider, NSteps, NStep,
  NGrid, NGridItem, NCard, NCheckbox, NText, NInput, NFormItem, NAlert, NIcon,
  useMessage, NSelect, NStatistic
} from 'naive-ui'
import { icon } from '@/plugins'
import axios from 'axios'
import { getUUID, fetchPathByName, routerTurnByPath } from '@/utils'
import { ChartEnum } from '@/enums/pageEnum'
import { saveProjectApi, saveDatasetApi, analyzeDatasetApi, suggestChartsApi } from '@/api/storage.api'

const props = defineProps({
  dataset: Object
})

const emit = defineEmits(['back', 'complete'])
const { ArrowBackIcon, FlashIcon } = icon.ionicons5
const message = useMessage()

const currentStep = ref(1)
const currentStatus = ref<'process' | 'error' | 'finish' | 'wait'>('process')
const loading = ref(false)
const saveLoading = ref(false)

const analysisResult = reactive<{ columns: any[], insights: string[] }>({
  columns: [],
  insights: []
})

interface ChartSuggestion {
  id?: string
  title: string
  chartType: 'Bar' | 'Line' | 'Pie' | 'Map' | 'Gauge' | 'Table' | 'Radar' | 'Funnel' | 'Heatmap' | 'TreeMap' | 'Scatter'
  reason: string
  mapping: { x: string; y: string }
  selected: boolean
  w?: number
  h?: number
}

const suggestedCharts = ref<ChartSuggestion[]>([])
const executiveSummary = ref('')
const projectName = ref(`Auto-BI: ${props.dataset?.name || 'Dự án mới'}`)
const projectTheme = ref('chalk')

const themeOptions = [
  { label: 'Chalk (Tối)', value: 'chalk' },
  { label: 'Macarons (Sáng)', value: 'macarons' },
  { label: 'Dark (Huyền bí)', value: 'dark' }
]

const selectedCharts = computed<ChartSuggestion[]>(() => suggestedCharts.value.filter(c => c.selected))
const selectedChartsCount = computed(() => selectedCharts.value.length)

// --- MAPPING LOGIC (FIXED KEYS) ---
const chartKeyMap: any = {
  'Bar': { key: 'BarCommon', chartKey: 'VBarCommon', conKey: 'VCBarCommon', package: 'Charts', category: 'Bars', categoryName: 'Biểu đồ thanh', chartFrame: 'echarts' },
  'Line': { key: 'LineCommon', chartKey: 'VLineCommon', conKey: 'VCLineCommon', package: 'Charts', category: 'Lines', categoryName: 'Biểu đồ đường', chartFrame: 'echarts' },
  'Pie': { key: 'PieCommon', chartKey: 'VPieCommon', conKey: 'VCPieCommon', package: 'Charts', category: 'Pies', categoryName: 'Biểu đồ hình tròn', chartFrame: 'echarts' },
  'Map': { key: 'MapBase', chartKey: 'VMapBase', conKey: 'VCMapBase', package: 'Charts', category: 'Maps', categoryName: 'Bản đồ', chartFrame: 'echarts' },
  'Radar': { key: 'Radar', chartKey: 'VRadar', conKey: 'VCRadar', package: 'Charts', category: 'Mores', categoryName: 'Khác', chartFrame: 'echarts' },
  'Funnel': { key: 'Funnel', chartKey: 'VFunnel', conKey: 'VCFunnel', package: 'Charts', category: 'Mores', categoryName: 'Khác', chartFrame: 'echarts' },
  'Heatmap': { key: 'Heatmap', chartKey: 'VHeatmap', conKey: 'VCHeatmap', package: 'Charts', category: 'Mores', categoryName: 'Khác', chartFrame: 'echarts' },
  'TreeMap': { key: 'TreeMap', chartKey: 'VTreeMap', conKey: 'VCTreeMap', package: 'Charts', category: 'Mores', categoryName: 'Khác', chartFrame: 'echarts' },
  'Scatter': { key: 'ScatterCommon', chartKey: 'VScatterCommon', conKey: 'VCScatterCommon', package: 'Charts', category: 'Scatters', categoryName: 'Phân tán', chartFrame: 'echarts' },
  'Table': { key: 'TableList', chartKey: 'VTableList', conKey: 'VCTableList', package: 'Tables', category: 'Tables', categoryName: 'Bảng', chartFrame: 'common' }
}

const detectMapRegion = (source: any[], xField: string) => {
  if (!Array.isArray(source) || source.length === 0) return 'world'
  const sample = source.slice(0, 30).map(row => String(row[xField] || '').toLowerCase())
  const vnKeywords = ['việt nam', 'vietnam', 'hà nội', 'hồ chí minh', 'đà nẵng', 'hải phòng', 'vũng tàu']
  const cnKeywords = ['china', 'trung quốc', 'beijing', 'shanghai', 'guangzhou', 'shenzhen']
  if (sample.some(v => vnKeywords.some(kw => v.includes(kw)))) return 'vietnam'
  if (sample.some(v => cnKeywords.some(kw => v.includes(kw)))) return 'china'
  if (sample.some(v => /[\u4e00-\u9fa5]/.test(v))) return 'china'
  return 'world'
}

const normalizeMapName = (name: string) => {
  const n = String(name || '').toLowerCase().trim()
  const map: Record<string, string> = {
    'mỹ': 'United States', 'usa': 'United States', 'hoa kỳ': 'United States',
    'anh': 'United Kingdom', 'uk': 'United Kingdom',
    'đức': 'Germany', 'pháp': 'France', 'ý': 'Italy', 'tây ban nha': 'Spain',
    'nhật bản': 'Japan', 'hàn quốc': 'Korea', 'trung quốc': 'China',
    'nga': 'Russia', 'ấn độ': 'India', 'brazil': 'Brazil', 'úc': 'Australia',
    'canada': 'Canada', 'việt nam': 'Vietnam', 'singapore': 'Singapore', 'thái lan': 'Thailand'
  }
  return map[n] || name
}

const getThematicThumbnail = (charts: ChartSuggestion[]) => {
  if (charts.some(c => c.chartType === 'Map')) return 'project/autobi_map.png'
  if (charts.some(c => c.chartType === 'Radar' || c.chartType === 'Funnel')) return 'project/autobi_marketing.png'
  // Check first chart or titles
  const first = charts[0]
  if (first?.title?.toLowerCase().includes('doanh thu') || first?.title?.toLowerCase().includes('revenue')) return 'project/autobi_finance.png'
  return 'project/autobi_generic.png'
}

onMounted(() => {
  if (props.dataset?.bi_config) {
    const config = props.dataset.bi_config
    analysisResult.columns = config.analysisResult?.columns || []
    analysisResult.insights = config.analysisResult?.insights || []
    suggestedCharts.value = config.suggestedCharts || []
    currentStep.value = config.currentStep || 1
    projectTheme.value = config.projectTheme || 'chalk'
    
    if (analysisResult.columns.length === 0) {
      startAnalysis()
    }
  } else {
    startAnalysis()
  }
})

const handleSaveDraft = async () => {
  saveLoading.value = true
  try {
    await saveDatasetApi({
      ...props.dataset,
      bi_config: {
        analysisResult: JSON.parse(JSON.stringify(analysisResult)),
        suggestedCharts: suggestedCharts.value,
        projectTheme: projectTheme.value,
        currentStep: currentStep.value
      }
    })
    message.success('Đã lưu vết phân tích!')
  } catch (err) {
    message.error('Lỗi khi lưu nháp.')
  } finally {
    saveLoading.value = false
  }
}

const startAnalysis = async (force = false) => {
  if (!force && analysisResult.columns.length > 0) return
  
  loading.value = true
  try {
    const sample = props.dataset?.content?.slice(0, 15) || []
    const res = await analyzeDatasetApi(sample)
    
    // Ánh xạ phòng thủ cao: Kiểm tra nhiều loại key có thể có
    let rawColumns = res?.columns || res?.data?.columns || []
    
    // Nếu AI không trả được columns hoặc mảng rỗng -> Fallback
    if (rawColumns.length === 0 && sample.length > 0) {
      console.warn('[Auto-BI] AI returned no columns, using local extraction')
      const keys = Object.keys(sample[0] || {})
      rawColumns = keys.map(k => ({ name: k }))
    }

    if (rawColumns.length > 0) {
      analysisResult.columns = rawColumns.map((col: any) => ({
        name: col.name || col['tên cột'] || col['tên_cột'] || col['key'] || 'N/A',
        type: col.type || 'dimension',
        subType: col.subType || 'category',
        description: col.description || col['giải thích'] || ''
      }))
      analysisResult.insights = res?.insights || ['Đã trích xuất cấu trúc dữ liệu thành công.']
    } else {
      throw new Error('Không thể xác định cột dữ liệu')
    }
    handleSaveDraft()
  } catch (err) {
    // Fallback tuyệt đối: trích header từ dataset gốc
    const sample = props.dataset?.content?.slice(0, 5) || []
    const keys = Object.keys(sample[0] || {})
    analysisResult.columns = keys.map(k => ({
      name: k, type: 'dimension', subType: 'category', description: ''
    }))
    analysisResult.insights = ['Không thể kết nối AI. Cấu trúc được trích xuất tự động.']
    message.warning('AI không khả dụng, sử dụng phân tích cục bộ.')
  } finally {
    loading.value = false
  }
}

const fetchSuggestions = async (force = false) => {
  if (!force && suggestedCharts.value.length > 0) return
  
  loading.value = true
  try {
    const res = await suggestChartsApi(analysisResult)
    if (!res) throw new Error('API failed')
    // Cập nhật cấu trúc mới: { suggestedTheme, executiveSummary, charts }
    if (res && res.charts) {
      suggestedCharts.value = res.charts.map((c: any) => ({
        ...c,
        selected: c.selected !== false // Mặc định là true nếu không bị AI tắt
      }))
      executiveSummary.value = res.executiveSummary || ''
      projectTheme.value = res.suggestedTheme || 'chalk'
      
      message.success('Đã tìm thấy các gợi ý trực quan hóa mới!')
    }
    handleSaveDraft()
  } catch (err) {
    message.error('Lỗi khi lấy gợi ý.')
  } finally {
    loading.value = false
  }
}

const handleRestart = () => {
  suggestedCharts.value = []
  analysisResult.columns = []
  analysisResult.insights = []
  currentStep.value = 1
  handleSaveDraft() // Lên server xóa đi config cũ
  startAnalysis(true)
}

const handleNext = async () => {
  if (currentStep.value === 1) {
    await fetchSuggestions()
    currentStep.value = 2
  } else {
    currentStep.value = 3
  }
}

const aggregateData = (source: any[], xField: string, yField: string, limit = 15) => {
  if (!Array.isArray(source) || source.length === 0) return []
  const map = new Map<string, number>()
  source.forEach(row => {
    const key = String(row[xField] || 'N/A')
    const rawVal = row[yField] || 0
    const val = Number(String(rawVal).replace(/[^0-9.-]+/g,"")) || 0
    map.set(key, (map.get(key) || 0) + val)
  })
  return Array.from(map.entries())
    .map(([k, v]) => ({ [xField]: k, [yField]: Math.round(v * 100) / 100 }))
    .sort((a: any, b: any) => b[yField] - a[yField])
    .slice(0, limit)
}

const handleGenerate = async () => {
  const datasetId = props.dataset?.id || ''
  if (!datasetId || datasetId === 'undefined') {
    message.error('ID nguồn dữ liệu không hợp lệ. Vui lòng chọn lại tập dữ liệu.')
    return
  }

  loading.value = true
  try {
    // --- BƯỚC 0: SYNC DỮ LIỆU LÊN SERVER (TRÁNH LỖI 404) ---
    await saveDatasetApi(toRaw(props.dataset))

    const projectId = getUUID()
    const charts = selectedCharts.value
    const pondId = `POND_${props.dataset?.id || getUUID()}`
    const datasetId = props.dataset?.id || ''
    
    // --- DYNAMIC GRID CALCULATOR ---
    const CANVAS_WIDTH = 1920
    const GRID_UNIT = CANVAS_WIDTH / 12 // 160px per unit
    let currentX = 0
    let currentY = 0
    let lastRowMaxHeight = 0
    
    const componentList: any[] = []
    
    // 1. ADD EXECUTIVE SUMMARY (NARRATIVE)
    if (executiveSummary.value) {
      const summaryHeight = 180
      componentList.push({
        id: getUUID(),
        key: 'TextCommon',
        isGroup: false,
        attr: { x: 0, y: 0, w: CANVAS_WIDTH, h: summaryHeight, zIndex: 1, offsetX: 0, offsetY: 0 },
        styles: { filterShow: false, opacity: 1, rotateZ: 0, blendMode: 'normal', animations: [] },
        status: { lock: false, hide: false },
        chartConfig: { key: 'TextCommon', chartKey: 'VTextCommon', conKey: 'VCTextCommon', package: 'Informations', category: 'Texts', categoryName: 'Văn bản', title: 'Tóm tắt phân tích' },
        option: {
          dataset: executiveSummary.value,
          fontSize: 22,
          fontColor: '#fff',
          fontWeight: 'bold',
          textAlign: 'center',
          writingMode: 'horizontal-tb'
        }
      })
      currentY = summaryHeight + 20
    }

    // 2. ADD CHARTS WITH SMART LAYOUT
    charts.forEach((suggest, index) => {
      const mapping = chartKeyMap[suggest.chartType] || chartKeyMap['Bar']
      const isEcharts = mapping.chartFrame === 'echarts'
      
      // Determine Dimensions
      const wUnits = Number(suggest.w || 4) // AI usually suggests 4, 6, 12
      const w = wUnits * GRID_UNIT
      const h = Number(suggest.h || 400)
      
      // Wrapping Logic
      if (currentX + w > CANVAS_WIDTH) {
        currentX = 0
        currentY += lastRowMaxHeight + 20
        lastRowMaxHeight = 0
      }
      
      const x = currentX
      const y = currentY
      
      currentX += w
      lastRowMaxHeight = Math.max(lastRowMaxHeight, h)

      // --- DATA PREPARATION ---
      const rawContent = Array.isArray(props.dataset?.content) ? props.dataset.content : []
      const xField = suggest.mapping?.x || ''
      const yField = suggest.mapping?.y || ''
      const aggregatedSource = aggregateData(rawContent, xField, yField, 15)
      
      let filterStr = ''
      if (suggest.chartType === 'Scatter') {
         filterStr = `// @tinix-transform:${JSON.stringify({ x: xField, y: yField, type: 'raw', limit: 1000, sort: 'none' })}\nif (!data || !Array.isArray(data)) return [];\nreturn [{ dimensions: ["${xField}", "${yField}"], source: data.map(i => ({ ["${xField}"]: Number(i["${xField}"]) || 0, ["${yField}"]: Number(i["${yField}"]) || 0 })) }];`
      } else {
         const isVirtual = (suggest as any).virtual === true
         // Dự phòng công thức: Nếu AI gợi ý virtual mà ko có formula, dùng cột yField làm gốc
         const rawFormula = (suggest as any).formula || ''
         const formula = isVirtual && !rawFormula ? `row["${yField}"]` : rawFormula
         
         const transformMeta = { x: xField, y: yField, type: isVirtual ? 'virtual' : 'sum', formula, limit: 15, sort: 'desc' }
         
         if (isVirtual && formula) {
           filterStr = `// @tinix-transform:${JSON.stringify(transformMeta)}\nif (!data || !Array.isArray(data)) return [];\nconst x = "${xField}", y = "${yField}", map = new Map();\ndata.forEach(row => { \n  const k = String(row[x] || 'N/A'); \n  let v = 0;\n  try { v = Number(${formula}) || 0; } catch(e) { v = 0; }\n  map.set(k, (map.get(k) || 0) + v); \n});\nconst source = Array.from(map.entries()).map(([k, v]) => ({ [x]: k, [y]: Math.round(v * 100) / 100 })).sort((a, b) => b[y] - a[y]).slice(0, 15);\nreturn [{ dimensions: [x, y], source }];`
         } else {
           filterStr = `// @tinix-transform:${JSON.stringify(transformMeta)}\nif (!data || !Array.isArray(data)) return [];\nconst x = "${xField}", y = "${yField}", map = new Map();\ndata.forEach(row => { const k = String(row[x] || 'N/A'), v = Number(String(row[y] || 0).replace(/[^0-9.-]+/g,"")) || 0; map.set(k, (map.get(k) || 0) + v); });\nconst source = Array.from(map.entries()).map(([k, v]) => ({ [x]: k, [y]: Math.round(v * 100) / 100 })).sort((a, b) => b[y] - a[y]).slice(0, 15);\nreturn [{ dimensions: [x, y], source }];`
         }
      }
      
      let option: any = {}
      if (isEcharts) {
        option.dataset = { dimensions: [xField, yField], source: aggregatedSource }
        const seriesType = mapping.category === 'Lines' ? 'line' : mapping.category === 'Pies' ? 'pie' : mapping.category === 'Maps' ? 'map' : 'bar'
        
        if (seriesType === 'pie') {
          option.series = [{ type: 'pie', radius: ['30%', '50%'], center: ['50%', '57%'], label: { show: true, formatter: '{b}: {d}%', fontSize: 10 }, encode: { itemName: xField, value: yField } }]
        } else if (seriesType === 'map') {
          const adcode = detectMapRegion(rawContent, xField)
          option.mapRegion = { adcode }; option.geo = { map: adcode, show: false }
          option.dataset = { map: aggregatedSource.map((i: any) => ({ name: adcode === 'world' ? normalizeMapName(i[xField]) : i[xField], value: i[yField] })) }
          option.visualMap = { show: true, min: 0, max: Math.max(...aggregatedSource.map((i:any) => i[yField] || 0)) || 100, inRange: { color: ['#e0ffff', '#006edd'] } }
          option.series = [{ type: 'effectScatter', coordinateSystem: 'geo', data: [] }, { type: 'map', map: adcode, encode: { value: 'value' } }]
        } else if (suggest.chartType === 'Radar') {
          const vals = aggregatedSource.map((i:any) => i[yField] || 0); const maxVal = Math.max(...vals) || 100
          option.radar = { indicator: aggregatedSource.map((i:any) => ({ name: String(i[xField] || ''), max: maxVal * 1.2 })), shape: 'polygon' }
          option.series = [{ type: 'radar', label: { show: true, fontSize: 10 }, data: [{ value: vals, name: suggest.title }] }]
        } else if (suggest.chartType === 'Scatter') {
          option.tooltip = { trigger: 'item', formatter: `X: {@[0]}<br/>Y: {@[1]}` }
          option.series = [{ type: 'scatter', encode: { x: xField, y: yField } }]
          option.xAxis = { type: 'value', scale: true }; option.yAxis = { type: 'value', scale: true }
        } else {
          option.series = [{ type: seriesType, label: { show: true, position: 'top', fontSize: 10, color: '#eee' }, encode: { x: xField, y: yField } }]
          if ((seriesType as any) !== 'treemap') {
            option.xAxis = { type: 'category', axisLabel: { rotate: aggregatedSource.length > 5 ? 45 : 0, interval: 0, fontSize: 10 } }
            option.yAxis = { type: 'value' }
          }
        }
      } else {
        option.dataset = (mapping.key === 'TableList') ? aggregatedSource.map((row: any) => ({ name: String(row[xField] || ''), value: Number(row[yField]) || 0 })) : aggregatedSource
      }

      componentList.push({
        id: getUUID(),
        key: mapping.key,
        isGroup: false,
        attr: { x, y, w, h, zIndex: index + 2, offsetX: 0, offsetY: 0 },
        filter: filterStr,
        styles: { filterShow: false, opacity: 1, rotateZ: 0, blendMode: 'normal', animations: [] },
        status: { lock: false, hide: false },
        events: { baseEvent: {}, advancedEvents: {}, interactEvents: [] },
        chartConfig: { ...mapping, title: suggest.title },
        option: option,
        request: {
          requestDataType: 2, requestHttpType: 'get', requestUrl: `/datasets/${datasetId}`,
          requestDataPondId: pondId, requestContentType: 0, requestParamsBodyType: 'none',
          requestInterval: 30, requestIntervalUnit: 'second', requestParams: { Params: {}, Body: {}, Header: {} }
        }
      })
    })

    const dynamicCanvasHeight = Math.max(1080, currentY + lastRowMaxHeight + 100)

    const newProject: any = {
      id: projectId,
      title: projectName.value,
      image: getThematicThumbnail(charts),
      index: 0,
      editCanvasConfig: {
        projectName: projectName.value,
        width: CANVAS_WIDTH,
        height: dynamicCanvasHeight,
        chartThemeColor: projectTheme.value,
        previewScaleType: 'fit',
        selectColor: true
      },
      requestGlobalConfig: {
        requestInterval: 30,
        requestIntervalUnit: 'second',
        requestParams: { Params: {}, Body: {}, Header: {} },
        requestDataPond: [{
          dataPondId: pondId,
          dataPondName: props.dataset?.name || 'Dataset',
          dataPondRequestConfig: {
            requestDataType: 1, requestHttpType: 'get', requestUrl: `/datasets/${datasetId}`,
            requestContentType: 0, requestParamsBodyType: 'none', requestInterval: 30,
            requestIntervalUnit: 'second', requestParams: { Params: {}, Body: {}, Header: {} }
          }
        }]
      },
      componentList
    }

    await saveProjectApi(newProject)
    message.success('Dashboard đã được khởi tạo thành công!')
    
    // Chuyển đến không gian thiết kế trực quan (ChartHome), KHÔNG PHẢI JSON editor
    const path = fetchPathByName(ChartEnum.CHART_HOME_NAME, 'href')
    routerTurnByPath(path, [projectId], undefined, true)
  } catch (err) {
    message.error('Lỗi khi sinh dự án.')
  } finally {
    loading.value = false
  }
}

const getChartTagType = (type: string) => {
  switch (type) {
    case 'Map': return 'error'
    case 'Line': return 'warning'
    case 'Pie': return 'success'
    case 'Table': return 'info'
    default: return 'primary'
  }
}

// Columns for Step 1
const schemaColumns = [
  { title: 'Tên cột', key: 'name' },
  { 
    title: 'Vai trò', 
    key: 'type',
    render(row) {
      return h(NSelect, {
        value: row.type,
        options: [
          { label: 'Dimension', value: 'dimension' },
          { label: 'Metric', value: 'metric' }
        ],
        size: 'small',
        onUpdateValue: (v) => { row.type = v }
      })
    }
  },
  {
    title: 'Kiểu nội dung',
    key: 'subType',
    render(row) {
      return h(NSelect, {
        value: row.subType,
        options: [
          { label: 'Thời gian', value: 'time' },
          { label: 'Địa lý', value: 'geography' },
          { label: 'Phân loại', value: 'category' },
          { label: 'Số liệu', value: 'number' }
        ],
        size: 'small',
        onUpdateValue: (v) => { row.subType = v }
      })
    }
  },
  { title: 'Mô tả ý nghĩa', key: 'description' }
]

</script>

<style scoped lang="scss">
.auto-bi-wizard-fullscreen {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #101014; // Default naive-ui dark bg
  z-index: 2000;
  display: flex;
  flex-direction: column;
  padding: 24px;
}

.wizard-header {
  flex-shrink: 0;
}

.wizard-content-scroll {
  flex: 1;
  overflow-y: auto;
  padding: 20px 0;
}

.wizard-footer {
  flex-shrink: 0;
  padding-top: 20px;
  border-top: 1px solid rgba(255,255,255,0.09);
}

.step-container {
  max-width: 1200px;
  margin: 0 auto;
}

.schema-table {
  background: rgba(255,255,255,0.02);
}

.narrow-view {
  max-width: 600px;
}

.is-selected {
  border: 1px solid var(--n-primary-color);
  background: rgba(var(--n-primary-color-rgb), 0.05);
}

.reason-text {
  font-size: 13px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.mt-6 { margin-top: 1.5rem; }
.mb-4 { margin-bottom: 1rem; }
</style>
