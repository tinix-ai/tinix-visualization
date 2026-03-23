<template>
  <n-table
    :bordered="false"
    :single-line="false"
    size="small"
    style="border-bottom-right-radius: 7px; border-bottom-left-radius: 7px"
  >
    <thead>
      <tr>
        <th>key</th>
        <th>value</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in tableArray.content" :key="index">
        <td>
          {{ item.key || window['$t']('views_components.auto_112')}}
        </td>
        <td>
          {{ item.value  || window['$t']('views_components.auto_112')}}
        </td>
      </tr>
    </tbody>
  </n-table>
</template>

<script setup lang="ts">
import { PropType, reactive, ref, toRefs, watch } from 'vue'
import { RequestParamsObjType } from '@/enums/httpEnum'
import noData from '@/assets/images/canvas/noData.png'

const props = defineProps({
  target: Object as PropType<RequestParamsObjType>
})

// Biểu mẫu mặc định
const defaultItem = {
  key: '',
  value: ''
}
const tableArray = reactive<{
  content: typeof defaultItem[]
}>({ content: [] })

// Tùy chọn nghe
watch(
  () => props.target as RequestParamsObjType,
  (target: RequestParamsObjType) => {
    tableArray.content = []
    for (const k in target) {
      tableArray.content.push({
        key: k,
        value: target[k]
      })
    }
    // giá trị mặc định
    if (!tableArray.content.length) tableArray.content = [JSON.parse(JSON.stringify(defaultItem))]
  },
  {
    immediate: true,
    deep: true
  }
)
</script>