<template>
  <collapse-item :name="$t('packages.auto_480')"
 :expanded="true">
    <setting-item-box :name="$t('packages.auto_537')"
 :alone="true">
      <setting-item :name="$t('packages.auto_538')"
>
        <n-input v-model:value="optionData.dataset" size="small"></n-input>
      </setting-item>
    </setting-item-box>
    <setting-item-box :name="$t('packages.auto_150')"
>
      <setting-item :name="$t('packages.auto_105')"
>
        <n-input-number
          v-model:value="optionData.borderRadius"
          size="small"
          :min="0"
          :placeholder="$t('packages.auto_105')"

        ></n-input-number>
      </setting-item>
    </setting-item-box>
  </collapse-item>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { option } from "./config";
import {
  CollapseItem,
  SettingItemBox,
  SettingItem,
} from "@/components/Pages/ChartItemSetting";

const props = defineProps({
  optionData: {
    type: Object as PropType<typeof option>,
    required: true,
  },
});
</script>
