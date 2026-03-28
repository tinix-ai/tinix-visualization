<template>
  <div class="go-chart-data-transform-ui">
    <n-space vertical :size="16">
      <div v-if="!config.x" class="go-mb-2">
        <n-alert type="info" size="small" :bordered="false">
          Chọn các trường dữ liệu bên dưới để bắt đầu cấu hình biểu đồ.
        </n-alert>
      </div>

      <n-grid :cols="1" :y-gap="12">
        <n-gi>
           <n-text depth="3" strong style="margin-bottom: 4px; display: block;">1. Chọn trường dữ liệu</n-text>
           <n-grid :x-gap="12" :cols="1" :y-gap="8">
             <n-gi>
                <setting-item-box name="Trục X (Nhãn)">
                  <n-select v-model:value="config.x" :options="columnOptions" size="small" placeholder="Chọn cột nhãn" />
                </setting-item-box>
             </n-gi>
             <n-gi>
                <setting-item-box name="Trục Y (Số liệu)">
                  <n-select v-model:value="config.y" :options="columnOptions" size="small" placeholder="Chọn cột giá trị" />
                </setting-item-box>
             </n-gi>
           </n-grid>
        </n-gi>

        <n-divider style="margin: 8px 0;" />

        <n-gi>
           <n-text depth="3" strong style="margin-bottom: 4px; display: block;">2. Thiết lập phép tính</n-text>
           <n-grid :x-gap="12" :cols="1" :y-gap="8">
            <n-gi>
              <setting-item-box name="Phép tính">
                <n-select v-model:value="config.type" :options="operationOptions" size="small" />
              </setting-item-box>
            </n-gi>
            <n-gi>
              <setting-item-box name="Sắp xếp">
                <n-select v-model:value="config.sort" :options="sortOptions" size="small" />
              </setting-item-box>
            </n-gi>
          </n-grid>
        </n-gi>

        <n-gi>
           <n-grid :x-gap="12" :cols="1" :y-gap="8">
            <n-gi>
              <setting-item-box name="Giới hạn (Top N)">
                <n-input-number v-model:value="config.limit" :min="1" :max="1000" size="small" />
              </setting-item-box>
            </n-gi>
          </n-grid>
        </n-gi>
      </n-grid>
    </n-space>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { SettingItemBox } from '@/components/Pages/ChartItemSetting'

const props = defineProps({
  modelValue: String, // The filter code
  sourceData: Object  // Raw data preview
})

const emit = defineEmits(['update:modelValue'])

// Internal config
const config = ref({
  x: '',
  y: '',
  type: 'sum',
  sort: 'desc',
  limit: 15
})

// Options for columns based on source data
const columnOptions = computed(() => {
  const data = props.sourceData?.data || []
  if (!Array.isArray(data) || data.length === 0) return []
  const keys = Object.keys(data[0])
  return keys.map(k => ({ label: k, value: k }))
})

const operationOptions = [
  { label: 'Tổng (Sum)', value: 'sum' },
  { label: 'Đếm (Count)', value: 'count' },
  { label: 'Trung bình (Avg)', value: 'avg' },
  { label: 'Lớn nhất (Max)', value: 'max' },
  { label: 'Nhỏ nhất (Min)', value: 'min' },
  { label: 'Dữ liệu thô (Raw)', value: 'raw' }
]

const sortOptions = [
  { label: 'Giảm dần (Top)', value: 'desc' },
  { label: 'Tăng dần', value: 'asc' },
  { label: 'Không sắp xếp', value: 'none' }
]

// Flag to prevent recursive updates
let isInternalChange = false

// Parse metadata tag on change
watch(() => props.modelValue, (val) => {
  if (isInternalChange) {
    isInternalChange = false
    return
  }
  if (!val) return
  const match = val.match(/\/\/ @tinix-transform:(.*)/)
  if (match && match[1]) {
    try {
      const parsed = JSON.parse(match[1])
      config.value = { ...config.value, ...parsed }
    } catch (e) {
      console.error('Failed to parse transform metadata', e)
    }
  }
}, { immediate: true })

// Generate filter string whenever config changes
watch(config, (newConf) => {
  if (!newConf.x || !newConf.y) return
  isInternalChange = true
  const filterCode = generateFilter(newConf)
  emit('update:modelValue', filterCode)
}, { deep: true })

function generateFilter(c: any) {
  const meta = `// @tinix-transform:${JSON.stringify(c)}`
  
  if (c.type === 'raw') {
    return `${meta}
if (!data || !Array.isArray(data)) return data;
const x = "${c.x}";
const y = "${c.y}";
return { 
  dimensions: [x, y], 
  source: data.map(i => ({ [x]: i[x], [y]: i[y] })).slice(0, ${c.limit})
};`
  }

  // Aggregation Logic
  const aggLogic = 
    c.type === 'sum' ? 'map.set(key, (map.get(key) || 0) + val);' :
    c.type === 'count' ? 'map.set(key, (map.get(key) || 0) + 1);' :
    c.type === 'avg' ? 'const entry = map.get(key) || { s: 0, c: 0 }; map.set(key, { s: entry.s + val, c: entry.c + 1 });' :
    c.type === 'max' ? 'map.set(key, Math.max(map.get(key) ?? -Infinity, val));' :
    'map.set(key, Math.min(map.get(key) ?? Infinity, val));'

  const finalMapLogic = c.type === 'avg' 
    ? '.map(([k, v]) => ({ [x]: k, [y]: Math.round((v.s / v.c) * 100) / 100 }))'
    : '.map(([k, v]) => ({ [x]: k, [y]: Math.round(v * 100) / 100 }))'

  const sortLogic = c.sort === 'desc' ? `.sort((a, b) => b[y] - a[y])` : 
                    c.sort === 'asc' ? `.sort((a, b) => a[y] - b[y])` : ''

  return `${meta}
if (!data || !Array.isArray(data)) return data;
const x = "${c.x}";
const y = "${c.y}";
const map = new Map();
data.forEach(row => {
  const key = row[x] === undefined ? 'N/A' : String(row[x]);
  const val = Number(row[y]) || 0;
  ${aggLogic}
});
const source = Array.from(map.entries())
  ${finalMapLogic}
  ${sortLogic}
  .slice(0, ${c.limit});
return { dimensions: [x, y], source };`
}
</script>

<style scoped lang="scss">
.go-chart-data-transform-ui {
  padding: 5px;
}
</style>
