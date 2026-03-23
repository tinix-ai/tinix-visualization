<template>
  <n-collapse-item :title="$t('views_components.auto_258')"
 name="1" v-if="interactActions.length">
    <template #header-extra>
      <n-button type="primary" tertiary size="small" @click.stop="evAddEventsFn">
        <template #icon>
          <n-icon>
            <add-icon />
          </n-icon>
        </template>
        Thêm+
      </n-button>
    </template>

    <!-- Báo cáo No-data -->
    <div v-if="!targetData.events.interactEvents.length" class="no-data go-flex-center">
      <img :src="noData" :alt="$t('views_components.auto_50')"
 />
      <n-text :depth="3">{{ $t('phase7.auto_155') }}</n-text>
    </div>

    <n-card
      v-for="(item, cardIndex) in targetData.events.interactEvents"
      :key="cardIndex"
      class="n-card-shallow"
      size="small"
    >
      <n-space justify="space-between">
        <n-text>{{ $t('phase7.auto_351') }}</n-text>
        <n-button type="error" text size="small" @click="evDeleteEventsFn(cardIndex)">
          <template #icon>
            <n-icon>
              <close-icon />
            </n-icon>
          </template>
        </n-button>
      </n-space>

      <n-divider style="margin: 10px 0" />

      <n-tag :bordered="false" type="primary"> {{ $t('phase7.auto_289') }} </n-tag>

      <setting-item-box :name="$t('views_components.auto_255')"
 :alone="true">
        <n-input-group v-if="interactActions">
          <n-select
            class="select-type-options"
            v-model:value="item.interactOn"
            size="tiny"
            :options="interactActions"
          />
        </n-input-group>
      </setting-item-box>

      <setting-item-box :alone="true">
        <template #name>
          <n-text>{{ $t('phase7.auto_397') }}</n-text>
          <n-tooltip trigger="hover">
            <template #trigger>
              <n-icon size="21" :depth="3">
                <help-outline-icon></help-outline-icon>
              </n-icon>
            </template>
            <n-text>{{ $t('phase7.auto_395') }}</n-text>
          </n-tooltip>
        </template>
        <n-select
          class="select-type-options"
          value-field="id"
          label-field="title"
          size="tiny"
          filterable
          :placeholder="$t('views_components.auto_256')"

          v-model:value="item.interactComponentId"
          :options="fnEventsOptions()"
        />
      </setting-item-box>

      <setting-item-box v-if="fnDimensionsAndSource(item.interactOn).length" :name="$t('views_components.auto_254')"
 :alone="true">
        <n-table size="small" striped>
          <thead>
            <tr>
              <th v-for="item in [window['$t']('views_components.auto_259'), window['$t']('views_components.auto_123')]" :key="item">{{ item }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(cItem, index) in fnDimensionsAndSource(item.interactOn)" :key="index">
              <td>{{ cItem.value }}</td>
              <td>{{ cItem.label }}</td>
            </tr>
          </tbody>
        </n-table>
      </setting-item-box>

      <n-tag :bordered="false" type="primary"> {{ $t('phase7.auto_432') }} </n-tag>

      <setting-item-box
        :name="requestParamsItem"
        v-for="requestParamsItem in requestParamsTypeList"
        :key="requestParamsItem"
      >
        <setting-item
          v-for="(ovlValue, ovlKey, index) in fnGetRequest(item.interactComponentId, requestParamsItem)"
          :key="index"
          :name="`${ovlKey}`"
        >
          <n-select
            size="tiny"
            v-model:value="item.interactFn[ovlKey]"
            :options="fnDimensionsAndSource(item.interactOn)"
            clearable
          ></n-select>
        </setting-item>
        <n-text
          v-show="JSON.stringify(fnGetRequest(item.interactComponentId, requestParamsItem)) === '{}'"
          class="go-pt-1"
          depth="3"
        >
          tạm thời{{ $t('phase7.auto_204') }}Dữ liệu
        </n-text>
      </setting-item-box>
    </n-card>
  </n-collapse-item>
</template>

<script lang="ts" setup>
import { VNodeChild, computed } from 'vue'
import { SelectOption, SelectGroupOption } from 'naive-ui'
import { SettingItemBox, SettingItem, CollapseItem } from '@/components/Pages/ChartItemSetting'
import { CreateComponentType, CreateComponentGroupType, ChartFrameEnum } from '@/packages/index.d'
import { RequestParamsTypeEnum, RequestDataTypeEnum } from '@/enums/httpEnum'
import { InteractEventOn, COMPONENT_INTERACT_EVENT_KET } from '@/enums/eventEnum'
import { icon } from '@/plugins'
import noData from '@/assets/images/canvas/noData.png'
import { goDialog } from '@/utils'
import { useTargetData } from '../../../hooks/useTargetData.hook'

const { CloseIcon, AddIcon, HelpOutlineIcon } = icon.ionicons5
const { targetData, chartEditStore } = useTargetData()
const requestParamsTypeList = [RequestParamsTypeEnum.PARAMS, RequestParamsTypeEnum.HEADER]

// Nhận tương tác thành phầnSự kiệnDanh sách
const interactActions = computed(() => {
  const interactActions = targetData.value.interactActions
  if (!interactActions) return []
  return interactActions.map(value => ({
    label: value.interactName,
    value: value.interactType
  }))
})

// Nhận thành phầnSự kiện
const option = computed(() => {
  return targetData.value.option
})

// Thành phần ràng buộcDữ liệu request
const fnGetRequest = (id: string | undefined, key: RequestParamsTypeEnum) => {
  if (!id) return {}
  const globalConfigPindApr = chartEditStore.requestGlobalConfig.requestDataPond.find(item => {
    return item.dataPondId === id
  })?.dataPondRequestConfig.requestParams

  if (globalConfigPindApr) return globalConfigPindApr[key]
  return chartEditStore.componentList[chartEditStore.fetchTargetIndex(id)]?.request.requestParams[key]
}

// Kết quả truy vấn
const fnDimensionsAndSource = (interactOn: InteractEventOn | undefined) => {
  if (!interactOn || !targetData.value.interactActions) return []
  const tableData = targetData.value.interactActions.find(item => {
    return item.interactType === interactOn
  })

  return tableData?.componentEmitEvents[option.value[COMPONENT_INTERACT_EVENT_KET]] || []
}

// Thành phần ràng buộcDanh sách
const fnEventsOptions = (): Array<SelectOption | SelectGroupOption> => {
  // cây phẳngDữ liệu
  const fnFlattern = (
    data: Array<CreateComponentType | CreateComponentGroupType>
  ): Array<CreateComponentType | CreateComponentGroupType> => {
    return data.reduce(
      (
        iter: Array<CreateComponentType | CreateComponentGroupType>,
        val: CreateComponentType | CreateComponentGroupType
      ) => {
        if (!val.groupList && val.request.requestDataType === RequestDataTypeEnum.AJAX && val.request.requestUrl) {
          iter.push(val)
        }
        return val.groupList && val.groupList.length > 0 ? [...iter, ...fnFlattern(val.groupList)] : iter
      },
      []
    )
  }

  const filterOptionList = fnFlattern(chartEditStore.componentList).filter(item => {
    // loại trừ chính mình
    const isNotSelf = item.id !== targetData.value.id
    // loại trừStatic (Cứng)thành phần
    const isNotStatic = item.chartConfig.chartFrame !== ChartFrameEnum.STATIC
    // loại trừ{{ $t('phase7.auto_142') }}
    const isNotGroup = !item.isGroup

    return isNotSelf && isNotStatic && isNotGroup
  })

  const mapOptionList = filterOptionList.map(item => ({
    id: item.id,
    title: item.chartConfig.title,
    disabled: false,
    type: 'componentList'
  }))

  const requestDataPond = chartEditStore.requestGlobalConfig.requestDataPond.map(item => ({
    id: item.dataPondId,
    title: item.dataPondName,
    disabled: false,
    type: 'requestDataPond'
  }))
  const tarArr = requestDataPond.concat(mapOptionList)
  targetData.value.events.interactEvents?.forEach(iaItem => {
    tarArr.forEach(optionItem => {
      if (optionItem.id === iaItem.interactComponentId) {
        optionItem.disabled = true
      }
    })
  })

  return tarArr
}

// Thêm+mô-đun
const evAddEventsFn = () => {
  targetData.value.events.interactEvents.push({
    interactOn: undefined,
    interactComponentId: undefined,
    interactFn: {}
  })
}

// {{ $t('phase7.auto_87') }}mô-đun
const evDeleteEventsFn = (index: number) => {
  goDialog({
    message: window['$t']('views_components.auto_257'),
    onPositiveCallback: () => {
      targetData.value.events.interactEvents.splice(index, 1)
    }
  })
}
</script>

<style lang="scss" scoped>
.mill-chart-target-data {
  :deep(pre) {
    white-space: pre-wrap;
    word-wrap: break-word;
  }
}

.n-input-group {
  height: 30px;
}

.no-data {
  flex-direction: column;
  width: 100%;
  img {
    width: 120px;
  }
}

:deep(.n-base-selection .n-base-selection-label) {
  height: 32px;
}
</style>
