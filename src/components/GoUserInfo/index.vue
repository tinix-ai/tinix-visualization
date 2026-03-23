<template>
  <n-dropdown
    trigger="hover"
    @select="handleSelect"
    :show-arrow="true"
    :options="options"
  >
    <div class="user-info-box">
      <person-icon v-if="fallback"></person-icon>
      <n-avatar
        v-if="!fallback"
        round
        object-fit="cover"
        size="medium"
        :src="Person"
        @error="errorHandle"
      ></n-avatar>
    </div>
  </n-dropdown>

  <!-- Model thiết lập hệ thống -->
  <go-system-set v-model:modelShow="modelShow"></go-system-set>
  <!-- Model thông tin phần mềm -->
  <go-system-info v-model:modelShow="modelShowInfo"></go-system-info>
</template>

<script lang="ts" setup>
import { h, ref } from 'vue'
import { NAvatar, NText } from 'naive-ui'
import { renderIcon } from '@/utils'
import { logout, renderLang } from '@/utils'
import { GoSystemSet } from '@/components/GoSystemSet/index'
import { GoSystemInfo } from '@/components/GoSystemInfo/index'
import Person from './person.png'

import { icon } from '@/plugins'
const {
  ChatboxEllipsesIcon,
  PersonIcon,
  LogOutOutlineIcon,
  SettingsSharpIcon
} = icon.ionicons5

const t = window['$t']

const modelShowInfo = ref(false)
const modelShow = ref(false)

// dù thất bại
const fallback = ref(false)

// Hiển thị biểu tượng người dùng
const renderUserInfo = () => {
  return h(
    'div',
    {
      style: 'display: flex; align-items: center; padding: 8px 12px;'
    },
    [
      h(NAvatar, {
        round: true,
        style: 'margin-right: 12px;',
        src: Person
      }),
      h('div', null, [
        h('div', null, [
          h(NText, { depth: 2 }, { default: () => window['$t']('views_components.auto_375') })
        ])
      ])
    ]
  )
}
const options = ref([
  {
    label: window['$t']('views_components.auto_374'),
    key: 'info',
    type: 'render',
    render: renderUserInfo
  },
  {
    type: 'divider',
    key: 'd1'
  },
  {
    label: renderLang('global.sys_set'),
    key: 'sysSet',
    icon: renderIcon(SettingsSharpIcon)
  },
  {
    label: renderLang('global.contact'),
    key: 'contact',
    icon: renderIcon(ChatboxEllipsesIcon)
  },
  {
    type: 'divider',
    key: 'd3'
  },
  {
    label: renderLang('global.logout'),
    key: 'logout',
    icon: renderIcon(LogOutOutlineIcon)
  }
])

// Lỗi hiển thị hình ảnh
const errorHandle = (e: Event) => {
  fallback.value = true
}

// System Master Cấu Hình
const sysSetHandle = () => {
  modelShow.value = true
}

// System Master Cấu Hình
const sysInfoHandle = () => {
  modelShowInfo.value = true
}

const handleSelect = (key: string) => {
  switch (key) {
    case 'contact':
      sysInfoHandle()
      break
    case 'sysSet':
      sysSetHandle()
      break
    case 'logout':
      logout()
      break
  }
}
</script>

<style lang="scss" scoped>
.user-info-box {
  cursor: pointer;
  transform: scale(0.7);
}
</style>
