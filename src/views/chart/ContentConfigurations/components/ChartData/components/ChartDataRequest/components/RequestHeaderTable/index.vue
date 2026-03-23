<template>
  <n-table class="go-request-header-table-box" :single-line="false" size="small">
    <thead>
      <tr>
        <th></th>
        <th>Key</th>
        <th>Value</th>
        <th>{{ $t('phase7.auto_507') }}</th>
        <th>{{ $t('phase7.auto_412') }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in tableArray.content" :key="index">
        <td>
          {{ index + 1 }}
        </td>
        <td>
          <n-input v-model:value="item.key" :disabled="editDisabled" type="text" size="small" @blur="blur" />
        </td>
        <td>
          <n-input v-model:value="item.value" :disabled="editDisabled" type="text" size="small" @blur="blur" />
        </td>
        <td>
          <div style="width: 80px">
            <n-button class="go-ml-2" type="primary" size="small" ghost :disabled="editDisabled" @click="add(index)"
              >+</n-button
            >
            <n-button
              class="go-ml-2"
              type="warning"
              size="small"
              ghost
              :disabled="index === 0 && editDisabled"
              @click="remove(index)"
            >
              -
            </n-button>
          </div>
        </td>
        <td>
          <n-button v-if="item.error" class="go-ml-2" text type="error"> {{ $t('phase7.auto_433') }} </n-button>
          <n-button v-else class="go-ml-2" text type="primary"> {{ $t('phase7.auto_487') }} </n-button>
        </td>
      </tr>
    </tbody>
  </n-table>
</template>

<script setup lang="ts">
import { PropType, reactive, ref, toRefs, watch } from 'vue'
import { RequestParamsObjType } from '@/enums/httpEnum'

const emits = defineEmits(['update'])

const props = defineProps({
  target: {
    type: Object as PropType<RequestParamsObjType>,
    required: true,
    default: () => {}
  },
  editDisabled: {
    type: Boolean,
    required: false,
    default: false
  }
})

// xác định lỗi
const error = ref(false)

// Biểu mẫu mặc định
const defaultItem = {
  key: '',
  value: '',
  error: false
}
const tableArray = reactive<{
  content: typeof defaultItem[]
}>({ content: [] })

// Mất tập trung
const blur = () => {
  let successNum = 0
  tableArray.content.forEach(item => {
    if ((item.key !== '' && item.value == '') || (item.key === '' && item.value !== '')) {
      // sai lầm
      item.error = true
    } else {
      // Chính xác
      successNum++
      item.error = false
    }
  })
  // Xác minh xem tất cả đã được thông qua
  if (successNum == tableArray.content.length) {
    // Chuyển đổi dữ liệu thành đối tượng
    const updateObj: any = {}
    tableArray.content.forEach((e: typeof defaultItem) => {
      if (e.key) updateObj[e.key] = e.value
    })
    emits('update', updateObj)
  }
}

// Mới
const add = (index: number) => {
  tableArray.content.splice(index + 1, 0, {
    key: '',
    value: '',
    error: false
  })
}

// giảm bớt
const remove = (index: number) => {
  if (tableArray.content.length !== 1) {
    tableArray.content.splice(index, 1)
  }
  blur()
}

// Tùy chọn nghe
watch(
  () => props.target,
  (target: RequestParamsObjType) => {
    tableArray.content = []
    for (const k in target) {
      tableArray.content.push({
        key: k,
        value: target[k],
        error: false
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

<style lang="scss">
@include go('request-header-table-box') {
  background-color: rgba(0, 0, 0, 0);
  @include deep() {
    .n-data-table .n-data-table-td {
      background-color: rgba(0, 0, 0, 0);
    }
    .add-btn-box {
      width: 100%;
      display: flex;
      justify-content: center;
      .add-btn {
        width: 300px;
      }
    }
  }
}
</style>
