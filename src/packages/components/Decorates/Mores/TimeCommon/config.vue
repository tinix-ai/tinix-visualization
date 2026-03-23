<template>
  <CollapseItem :name="$t('packages.auto_280')"
 :expanded="true">
    <SettingItemBox :name="$t('packages.auto_244')"
>
      <SettingItem :name="$t('packages.auto_104')"
>
        <n-input-number
          v-model:value="optionData.timeSize"
          size="small"
          :min="1"
        ></n-input-number>
      </SettingItem>
      <SettingItem :name="$t('packages.auto_463')"
>
        <n-select
          v-model:value="optionData.fontWeight"
          size="small"
          :options="fontWeightOptions"
        />
      </SettingItem>
    </SettingItemBox>
    <SettingItemBox :name="$t('packages.auto_466')"
>
      <SettingItem :name="$t('packages.auto_465')"
>
        <n-input-number
          v-model:value="optionData.timeTextIndent"
          size="small"
          :min="1"
        ></n-input-number>
      </SettingItem>
      <SettingItem :name="$t('packages.auto_467')"
>
        <n-input-number
          v-model:value="optionData.timeLineHeight"
          size="small"
          :min="1"
        ></n-input-number>
      </SettingItem>
    </SettingItemBox>

    <SettingItemBox :name="$t('packages.auto_21')"
>
      <SettingItem :name="$t('packages.auto_468')"
>
        <n-color-picker
          size="small"
          :modes="['hex']"
          v-model:value="optionData.timeColor"
        ></n-color-picker>
      </SettingItem>
    </SettingItemBox>
    <SettingItemBox :name="$t('packages.auto_139')"
>
      <SettingItem>
        <n-space>
          <n-switch v-model:value="optionData.showShadow" size="small" />
          <n-text>{{ $t('phase7.auto_310') }}</n-text>
        </n-space>
      </SettingItem>
      <SettingItem name="x">
        <n-input-number v-model:value="optionData.hShadow" size="small"></n-input-number
      ></SettingItem>
      <SettingItem name="y">
        <n-input-number v-model:value="optionData.vShadow" size="small"></n-input-number
      ></SettingItem>
      <SettingItem :name="$t('packages.auto_464')"
>
        <n-input-number
          v-model:value="optionData.blurShadow"
          size="small"
        ></n-input-number
      ></SettingItem>
      <SettingItem :name="$t('packages.auto_21')"
>
        <n-color-picker
          size="small"
          :modes="['hex']"
          v-model:value="optionData.colorShadow"
        ></n-color-picker
      ></SettingItem>
    </SettingItemBox>
  </CollapseItem>
</template>
<script setup lang="ts">
import { PropType } from "vue";
import {
  CollapseItem,
  SettingItemBox,
  SettingItem,
} from "@/components/Pages/ChartItemSetting";
import { option, FontWeightEnum, FontWeightObject } from "./config";

const props = defineProps({
  optionData: {
    type: Object as PropType<typeof option>,
    required: true,
  },
});
const fontWeightOptions = [
  {
    label: FontWeightEnum.NORMAL,
    value: FontWeightObject[FontWeightEnum.NORMAL],
  },
  {
    label: FontWeightEnum.BOLD,
    value: FontWeightObject[FontWeightEnum.BOLD],
  },
];
</script>
