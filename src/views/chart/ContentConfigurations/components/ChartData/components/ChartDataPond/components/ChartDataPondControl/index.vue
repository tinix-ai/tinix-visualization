<template>
  <n-modal
    class="go-chart-data-pond-control"
    v-model:show="modelShowRef"
    :mask-closable="false"
    :close-on-esc="true"
    :onEsc="onEsc"
  >
    <n-card :bordered="false" role="dialog" size="small" aria-modal="true" style="width: 900px; height: 650px">
      <template #header></template>
      <template #header-extra> </template>
      <div class="pond-content">
        <!-- Xem / Hátkhu vực -->
        <chart-data-display
          v-if="pondData && !loading"
          :targetData="pondData"
          :globalData="chartEditStore.getRequestGlobalConfig"
        ></chart-data-display>
        <!-- Báo cáo No-data -->
        <div v-else class="no-data go-flex-center">
          <img :src="noData" :alt="$t('views_components.auto_50')"
 />
          <n-text :depth="3">{{ $t('phase7.auto_312') }}</n-text>
        </div>
        <!-- TráibênDanh sách -->
        <chart-data-pond-list @createPond="createPond" @deletePond="deletePond"></chart-data-pond-list>
      </div>
      <!-- Dưới cùng -->
      <template #action>
        <n-space justify="space-between">
          <n-button type="info" secondary :disabled="!pondData" @click="openPond(true)">
            Edit nội dung
            <template #icon>
              <n-icon>
                <pencil-icon />
              </n-icon>
            </template>
          </n-button>
          <div>
            <n-button class="go-mr-3" @click="closeHandle">{{ $t('phase7.auto_311') }}</n-button>
            <n-button type="primary" @click="closeAndSendHandle">{{ $t('phase7.auto_399') }}</n-button>
          </div>
        </n-space>
      </template>
    </n-card>
  </n-modal>

  <!-- Form Config Request -->
  <pond-data-request
    v-model:modelShow="requestShow"
    :targetDataRequest="editData"
    :isEdit="isEdit"
    @editSaveHandle="saveHandle"
  ></pond-data-request>
</template>

<script setup lang="ts">
import { ref, toRefs, computed, nextTick, watch, toRaw } from 'vue'
import noData from '@/assets/images/canvas/noData.png'
import { ChartDataPondList } from '../ChartDataPondList'
import { PondDataRequest } from '../../../ChartDataRequest'
import { ChartDataDisplay } from '../ChartDataDisplay'
import { requestConfig } from '@/packages/public/publicConfig'
import { useTargetData } from '@/views/chart/ContentConfigurations/components/hooks/useTargetData.hook'
import { RequestDataPondItemType } from '@/store/modules/chartEditStore/chartEditStore.d'
import { RequestDataTypeEnum } from '@/enums/httpEnum'
import { icon } from '@/plugins'
import { getUUID, goDialog } from '@/utils'
import { cloneDeep } from 'lodash'

const props = defineProps({
  modelShow: Boolean
})

const emit = defineEmits(['update:modelShow', 'sendHandle'])
const { PencilIcon } = icon.ionicons5
const { chartEditStore, targetData } = useTargetData()
const { requestDataPond } = toRefs(chartEditStore.getRequestGlobalConfig)
const requestShow = ref(false)
const modelShowRef = ref(false)
const loading = ref(false)
const isEdit = ref(false)
const editData = ref<RequestDataPondItemType>()

// đã chọnDữ liệuhồ bơi
const pondData = computed(() => {
  const selectId = targetData?.value?.request?.requestDataPondId
  if (!selectId) return undefined
  const data = requestDataPond.value.filter(item => {
    return selectId === item.dataPondId
  })
  return data[0]
})

watch(
  () => props.modelShow,
  newValue => {
    modelShowRef.value = newValue
  }
)

watch(
  () => pondData.value,
  newValue => {
    loading.value = true
    editData.value = newValue
    nextTick(() => {
      loading.value = false
    })
  },
  {
    immediate: true
  }
)

// Mở/Sửa (Edit)
const openPond = (isEditFlag: boolean = false) => {
  isEdit.value = !!isEditFlag
  requestShow.value = true
}

// {{ $t('phase7.auto_494') }}
const createPond = () => {
  const id = getUUID()
  editData.value = {
    dataPondId: id,
    dataPondName: id,
    dataPondRequestConfig: cloneDeep({ ...requestConfig, requestDataType: RequestDataTypeEnum.Pond })
  }
  openPond()
}

// Hoàn thành việc tạo/Sửa (Edit)
const saveHandle = (newData: RequestDataPondItemType) => {
  // Đi tạo
  if (isEdit.value) {
    editSaveHandle(newData)
  } else {
    createSaveHandle(newData)
  }
  isEdit.value = false
  requestShow.value = false
}

// Sửa (Edit){{ $t('phase7.auto_447') }}sau đó
const editSaveHandle = (newData: RequestDataPondItemType) => {
  try {
    const targetIndex = requestDataPond.value.findIndex(item => item.dataPondId === newData.dataPondId)
    if (targetIndex !== -1) {
      requestDataPond.value.splice(targetIndex, 1, newData)
      // Ôn lạiDữ liệuSau hồ bơi, Ôn lại{{ $t('phase7.auto_182') }}các thành phần liên quan
      chartEditStore.getComponentList.forEach(item => {
        if (
          item.request.requestDataType === RequestDataTypeEnum.Pond &&
          item.request.requestDataPondId === newData.dataPondId
        ) {
          item.request = {
            ...toRaw(newData.dataPondRequestConfig),
            requestDataPondId: newData.dataPondId
          }
        }
      })
      window.$message.success(window['$t']('views_components.auto_171'))
    } else {
      window.$message.error(window['$t']('views_components.auto_168'))
    }
  } catch (error) {
    window.$message.error(window['$t']('views_components.auto_168'))
  }
}

// Sau khi tạo và lưu thành công
const createSaveHandle = (newData: RequestDataPondItemType) => {
  try {
    if (editData.value) {
      requestDataPond.value.unshift(newData)
      window.$message.success(window['$t']('views_components.auto_172'))
    } else {
      window.$message.error(window['$t']('views_components.auto_167'))
    }
  } catch (error) {
    window.$message.error(window['$t']('views_components.auto_167'))
  }
}

// {{ $t('phase7.auto_87') }}Dữ liệuhồ bơi
const deletePond = (targetData: RequestDataPondItemType) => {
  goDialog({
    message: window['$t']('views_components.auto_173'),
    isMaskClosable: true,
    transformOrigin: 'center',
    onPositiveCallback: () => {
      const targetIndex = requestDataPond.value.findIndex(item => item.dataPondId === targetData.dataPondId)
      if (targetIndex !== -1) {
        requestDataPond.value.splice(targetIndex, 1)
        window.$message.success(window['$t']('views_components.auto_170'))
      } else {
        window.$message.error(window['$t']('views_components.auto_169'))
      }
    }
  })
}

// đóng cửa
const closeAndSendHandle = () => {
  // Gán lựa chọn cho đối tượng
  if (pondData.value) {
    targetData.value.request = {
      ...toRaw(pondData.value.dataPondRequestConfig),
      requestDataPondId: pondData.value.dataPondId
    }
  }
  emit('update:modelShow', false)
  emit('sendHandle')
}

const closeHandle = () => {
  emit('update:modelShow', false)
}

const onEsc = () => {
  closeHandle()
}
</script>

<style lang="scss" scoped>
@include go('chart-data-pond-control') {
  /* ở giữa */
  .pond-content {
    display: flex;
  }
  .no-data {
    flex-direction: column;
    width: 100%;
    img {
      width: 200px;
    }
  }
  &.n-card.n-modal,
  .n-card {
    @extend .go-background-filter;
  }
  .n-card-shallow {
    background-color: rgba(0, 0, 0, 0) !important;
  }
  @include deep() {
    & > .n-card__content {
      padding-right: 0;
    }
    .n-card__content {
      padding-bottom: 5px;
    }
  }
}
</style>
