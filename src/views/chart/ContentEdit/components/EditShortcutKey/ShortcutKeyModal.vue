<template>
  <n-modal v-model:show="modelShowRef" :mask-closable="true" @afterLeave="closeHandle">
    <n-table class="model-content" :bordered="false" :single-line="false">
      <thead>
        <tr>
          <th>{{ $t('phase7.auto_198') }}</th>
          <th>{{ $t('phase7.auto_37') }}</th>
          <th>
            <n-space justify="space-between">
              <span> {{ $t('phase7.auto_376') }} </span>
              <n-icon size="20" class="go-cursor-pointer" @click="closeHandle">
                <close-icon></close-icon>
              </n-icon>
            </n-space>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in shortcutKeyOptions" :key="index">
          <td>{{ item.label }}</td>
          <td>{{ item.win }}</td>
          <td v-if="item.macSource">{{ item.mac }}</td>
          <td v-else>
            <n-gradient-text :size="22">{{ item.mac.substr(0, 1) }}</n-gradient-text>
            + {{ item.mac.substr(3) }}
          </td>
        </tr>
      </tbody>
    </n-table>
  </n-modal>
</template>

<script setup lang="ts">
import { watch, ref } from 'vue'
import { icon } from '@/plugins'
import { WinKeyboard, MacKeyboard } from '@/enums/editPageEnum'

const { CloseIcon } = icon.ionicons5
const modelShowRef = ref(false)

const emit = defineEmits(['update:modelShow'])

const props = defineProps({
  modelShow: Boolean
})


watch(() => props.modelShow, (newValue) => {
  modelShowRef.value = newValue
})

// {{ $t('phase7.auto_50') }}
const shortcutKeyOptions = [
  {
    label: window['$t']('views_components.auto_276'),
    win: `${WinKeyboard.SPACE.toUpperCase()} + 🖱️ `,
    mac: `${MacKeyboard.SPACE.toUpperCase()} + 🖱️ `,
    macSource: true
  },
  {
    label: window['$t']('phase7.auto_349'),
    win: window['$t']('phase7.auto_75'),
    mac: `${MacKeyboard.CTRL.toUpperCase()} + ↑ `
  },
  {
    label: window['$t']('views_components.auto_262'),
    win: `${WinKeyboard.CTRL.toUpperCase()} + L `,
    mac: `${MacKeyboard.CTRL.toUpperCase()} + L `
  },
  {
    label: window['$t']('views_components.auto_261'),
    win: `${WinKeyboard.CTRL.toUpperCase()} + ${WinKeyboard.SHIFT.toUpperCase()}+ L `,
    mac: `${MacKeyboard.CTRL.toUpperCase()} + ${MacKeyboard.SHIFT.toUpperCase()} + L `
  },
  {
    label: window['$t']('views_components.auto_279'),
    win: `${WinKeyboard.CTRL.toUpperCase()} + H `,
    mac: `${MacKeyboard.CTRL.toUpperCase()} + H `
  },
  {
    label: window['$t']('views_components.auto_277'),
    win: `${WinKeyboard.CTRL.toUpperCase()} + ${WinKeyboard.SHIFT.toUpperCase()} + H `,
    mac: `${MacKeyboard.CTRL.toUpperCase()} + ${MacKeyboard.SHIFT.toUpperCase()} + H `
  },
  {
    label: window['$t']('views_components.auto_2'),
    win: 'Delete'.toUpperCase(),
    mac: `${MacKeyboard.CTRL.toUpperCase()} + Backspace `
  },
  {
    label: window['$t']('views_components.auto_272'),
    win: `${WinKeyboard.CTRL.toUpperCase()} + C `,
    mac: `${MacKeyboard.CTRL.toUpperCase()} + C `
  },
  {
    label: window['$t']('views_components.auto_274'),
    win: `${WinKeyboard.CTRL.toUpperCase()} + X `,
    mac: `${MacKeyboard.CTRL.toUpperCase()} + X `
  },
  {
    label: window['$t']('views_components.auto_273'),
    win: `${WinKeyboard.CTRL.toUpperCase()} + V `,
    mac: `${MacKeyboard.CTRL.toUpperCase()} + V `
  },
  {
    label: window['$t']('views_components.auto_270'),
    win: `${WinKeyboard.CTRL.toUpperCase()} + Z `,
    mac: `${MacKeyboard.CTRL.toUpperCase()} + Z `
  },
  {
    label: window['$t']('views_components.auto_275'),
    win: `${WinKeyboard.CTRL.toUpperCase()} + ${WinKeyboard.SHIFT.toUpperCase()} + Z `,
    mac: `${MacKeyboard.CTRL.toUpperCase()} + ${MacKeyboard.SHIFT.toUpperCase()} + Z `
  },
  {
    label: window['$t']('views_components.auto_269'),
    win: `${WinKeyboard.CTRL.toUpperCase()} + 🖱️ `,
    mac: `${MacKeyboard.CTRL_SOURCE_KEY.toUpperCase()} + 🖱️ `
  },
  {
    label: window['$t']('views_components.auto_271'),
    win: `${WinKeyboard.CTRL.toUpperCase()} + G / 🖱️ `,
    mac: `${MacKeyboard.CTRL_SOURCE_KEY.toUpperCase()} + G / 🖱️`
  },
  {
    label: window['$t']('views_components.auto_278'),
    win: `${WinKeyboard.CTRL.toUpperCase()} + ${WinKeyboard.SHIFT.toUpperCase()} + G `,
    mac: `${MacKeyboard.CTRL_SOURCE_KEY.toUpperCase()} + ${WinKeyboard.SHIFT.toUpperCase()} + G `
  }
]

const closeHandle = () => {
  emit('update:modelShow', false)
}
</script>

<style lang="scss" scoped>
.model-content {
  width: 50vw;
  padding-bottom: 20px;
  overflow: hidden;
  border-radius: 15px;
  td {
    padding: 5px 10px;
  }
}
</style>
