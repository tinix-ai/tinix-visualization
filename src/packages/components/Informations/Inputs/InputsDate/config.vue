<template>
  <collapse-item :name="$t('packages.auto_488')"
 :expanded="true">
    <setting-item-box :name="$t('packages.auto_483')"
>
      <n-select v-model:value="optionData.isPanel" size="small" :options="panelOptions" />
    </setting-item-box>
  </collapse-item>

  <collapse-item :name="$t('packages.auto_493')"
 :expanded="true">
    <setting-item-box :name="$t('packages.auto_163')"
>
      <setting-item :name="$t('packages.auto_116')"
>
        <n-select v-model:value="optionData.componentInteractEventKey" size="small" :options="datePickerTypeOptions"
                  @update:value="datePickerTypeUpdate"/>
      </setting-item>
    </setting-item-box>

    <setting-item-box :name="$t('packages.auto_502')"
>
      <setting-item :name="$t('packages.auto_116')"
>
        <n-select v-model:value="optionData.defaultType" size="small" :options="defaultTypeOptions"
                  @update:value="defaultTypeUpdate" />
      </setting-item>

    </setting-item-box>
    <setting-item-box v-if="optionData.defaultType === DefaultTypeEnum.STATIC" :alone="true">
      <setting-item :name="$t('packages.auto_486')"
>
        <n-date-picker size="small" clearable v-model:value="optionData.dataset" :type="optionData.componentInteractEventKey" />
      </setting-item>
    </setting-item-box>
    <setting-item-box v-if="optionData.defaultType === DefaultTypeEnum.DYNAMIC" >
      <template #name>
        <n-text></n-text>
        <n-tooltip trigger="hover">
          <template #trigger>
            <n-icon size="21" :depth="3">
              <help-outline-icon></help-outline-icon>
            </n-icon>
          </template>
          <span>{{ $t('phase7.auto_158') }}</span>
        </n-tooltip>
      </template>
      <setting-item :name="differValueName">
        <n-input-number v-model:value="optionData.differValue[0]" class="input-num-width" size="small">
          <template #suffix>
            {{DifferUnitObject[optionData.differUnit[0]]}}
          </template>
        </n-input-number>
      </setting-item>
      <setting-item :name="differUnitName">
        <n-select v-model:value="optionData.differUnit[0]" size="small" :options="differUnitOptions" />
      </setting-item>
      <setting-item v-if="isRange" :name="$t('packages.auto_500')"
>
        <n-input-number v-model:value="optionData.differValue[1]" class="input-num-width" size="small">
          <template #suffix>
            {{DifferUnitObject[optionData.differUnit[1]]}}
          </template>
        </n-input-number>
      </setting-item>
      <setting-item v-if="isRange" :name="$t('packages.auto_505')"
>
        <n-select v-model:value="optionData.differUnit[1]" size="small" :options="differUnitOptions" />
      </setting-item>
    </setting-item-box>

  </collapse-item>
</template>

<script lang="ts" setup>
import { PropType, computed } from 'vue'
import { icon } from '@/plugins'
import { CollapseItem, SettingItemBox, SettingItem } from '@/components/Pages/ChartItemSetting'
import { option } from './config'
import { ComponentInteractEventEnum, DefaultTypeEnum, DifferUnitEnum, DifferUnitObject } from './interact'
import dayjs from "dayjs";

const { HelpOutlineIcon } = icon.ionicons5

const props = defineProps({
  optionData: {
    type: Object as PropType<typeof option>,
    required: true
  }
})

const panelOptions = [
  {
    label: window['$t']('packages.auto_504'),
    value: 0
  },
  {
    label: window['$t']('packages.auto_491'),
    value: 1
  }
]

const datePickerTypeOptions = [
  {
    label: window['$t']('packages.auto_501'),
    value: ComponentInteractEventEnum.DATE
  },
  {
    label: window['$t']('packages.auto_487'),
    value: ComponentInteractEventEnum.DATE_TIME
  },
  {
    label: window['$t']('packages.auto_506'),
    value: ComponentInteractEventEnum.DATE_RANGE
  },
  {
    label: window['$t']('packages.auto_490'),
    value: ComponentInteractEventEnum.MONTH
  },
  {
    label: window['$t']('packages.auto_489'),
    value: ComponentInteractEventEnum.MONTH_RANGE
  },
  {
    label: window['$t']('packages.auto_498'),
    value: ComponentInteractEventEnum.YEAR
  },
  {
    label: window['$t']('packages.auto_485'),
    value: ComponentInteractEventEnum.YEAR_RANGE
  },
  {
    label: window['$t']('packages.auto_496'),
    value: ComponentInteractEventEnum.QUARTER
  },
  {
    label: window['$t']('packages.auto_495'),
    value: ComponentInteractEventEnum.QUARTER_RANGE
  }
]

const defaultTypeOptions = [
  {
    label: window['$t']('packages.auto_484'),
    value: DefaultTypeEnum.STATIC
  },
  {
    label: window['$t']('packages.auto_497'),
    value: DefaultTypeEnum.DYNAMIC
  },
  {
    label: window['$t']('packages.auto_261'),
    value: DefaultTypeEnum.NONE
  }
]


const differUnitOptions = [
  // ManipulateType
  {
    value: DifferUnitEnum.DAY,
    label: DifferUnitObject[DifferUnitEnum.DAY]
  },
  {
    value: DifferUnitEnum.WEEK,
    label: DifferUnitObject[DifferUnitEnum.WEEK]
  },
  {
    value: DifferUnitEnum.MONTH,
    label: DifferUnitObject[DifferUnitEnum.MONTH]
  },
  {
    value: DifferUnitEnum.QUARTER,
    label: DifferUnitObject[DifferUnitEnum.QUARTER]
  },
  {
    value: DifferUnitEnum.YEAR,
    label: DifferUnitObject[DifferUnitEnum.YEAR]
  },
  {
    value: DifferUnitEnum.HOUR,
    label: DifferUnitObject[DifferUnitEnum.HOUR]
  },
  {
    value: DifferUnitEnum.MINUTE,
    label: DifferUnitObject[DifferUnitEnum.MINUTE]
  },
  {
    value: DifferUnitEnum.SECOND,
    label: DifferUnitObject[DifferUnitEnum.SECOND]
  },
  {
    value: DifferUnitEnum.MILLISECOND,
    label: DifferUnitObject[DifferUnitEnum.MILLISECOND]
  }
]


const isRange = computed(() => {
  return props.optionData.componentInteractEventKey.endsWith('range')
})

const differValueName = computed(() => {
  return isRange.value ? window['$t']('packages.auto_499') : window['$t']('packages.auto_494')
})

const differUnitName = computed(() => {
  return isRange.value ? window['$t']('packages.auto_503') : window['$t']('packages.auto_492')
})

const datePickerTypeUpdate = () => {
  props.optionData.dataset = isRange.value ? [dayjs().valueOf(), dayjs().valueOf()] : dayjs().valueOf()
}

const defaultTypeUpdate = (v: string) => {
  if (v === DefaultTypeEnum.STATIC) {
    datePickerTypeUpdate()
  } else {
    // DefaultTypeEnum.
    props.optionData.dataset = null
  }
}

</script>
