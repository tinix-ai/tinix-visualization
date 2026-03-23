<template>
  <div class="go-edit">
    <n-layout>
      <n-layout-header class="go-edit-header go-px-5 go-flex-items-center" bordered>
        <div>
          <n-text class="go-edit-title go-mr-4">{{ $t('phase7.auto_17') }}</n-text>
          <n-button v-if="showOpenFilePicker" class="go-mr-3" size="medium" @click="importJSON">
            <template #icon>
              <n-icon>
                <download-icon></download-icon>
              </n-icon>
            </template>
            Nhập vào (Import)
          </n-button>
        </div>
        <n-space>
          <!-- tạm thờiGiờĐóng -->
          <!-- <n-tag :bordered="false" type="warning"> 「Khóa click ngoài trang (Mất Focus){{ $t('phase7.auto_447') }}」 </n-tag> -->
          <n-tag :bordered="false" type="warning"> {{ $t('phase7.auto_427') }} </n-tag>
          <n-button v-if="showOpenFilePicker" class="go-mr-3" size="medium" @click="updateSync">
            <template #icon>
              <n-icon>
                <analytics-icon></analytics-icon>
              </n-icon>
            </template>
            {{ $t('phase7.auto_447') }}
          </n-button>
        </n-space>
      </n-layout-header>
      <n-layout-content>
        <monaco-editor
          v-model:modelValue="content"
          language="json"
          :editorOptions="{
            lineNumbers: 'on',
            minimap: { enabled: true }
          }"
        />
      </n-layout-content>
    </n-layout>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { MonacoEditor } from '@/components/Pages/MonacoEditor'
import { SavePageEnum } from '@/enums/editPageEnum'
import { getSessionStorageInfo } from '../preview/utils'
import { setSessionStorage, JSONStringify, JSONParse, setTitle, goDialog } from '@/utils'
import { StorageEnum } from '@/enums/storageEnum'
import { icon } from '@/plugins'
import type { ChartEditStorageType } from '../preview/index.d'

const { ChevronBackOutlineIcon, DownloadIcon, AnalyticsIcon } = icon.ionicons5
const showOpenFilePicker: Function = (window as any).showOpenFilePicker
const content = ref('')

window['$message'].warning(window['$t']('views_components.auto_325'))

// từsessionStorage LấyDữ liệu
async function getDataBySession() {
  const localStorageInfo: ChartEditStorageType = (await getSessionStorageInfo()) as unknown as ChartEditStorageType
  setTitle(window['$t']('phase7.auto_302'))
  content.value = JSONStringify(localStorageInfo)
}
setTimeout(getDataBySession)

// Quay lại cửa sổ cha mẹ
function back() {
  window.opener.name = Date.now()
  window.open(window.opener.location.href, window.opener.name)
}

// Nhập vào (Import)jsonchữ
function importJSON() {
  goDialog({
    message: window['$t']('views_components.auto_323'),
    isMaskClosable: true,
    transformOrigin: 'center',
    onPositiveCallback: async () => {
      try {
        const files = await showOpenFilePicker()
        const file = await files[0].getFile()
        const fr = new FileReader()
        fr.readAsText(file)
        fr.onloadend = () => {
          content.value = (fr.result || '').toString()
        }
        window['$message'].success(window['$t']('views_components.auto_289'))
      } catch (error) {
        window['$message'].error(window['$t']('views_components.auto_321'))
        console.log(error)
      }
    }
  })
}

// đồng bộDữ liệuSửa (Edit)Trang
window.opener.addEventListener(SavePageEnum.CHART, (e: any) => {
  window['$message'].success(window['$t']('views_components.auto_292'))
  setSessionStorage(StorageEnum.GO_CHART_STORAGE_LIST, [e.detail])
  content.value = JSONStringify(e.detail)
})

// {{ $t('phase7.auto_447') }}đồng bộ nútDữ liệu
document.addEventListener('keydown', function (e) {
  if (e.keyCode == 83 && (navigator.platform.match('Mac') ? e.metaKey : e.ctrlKey)) {
    e.preventDefault()
    updateSync()
  }
})

// Lưu ngoài tiêu điểm (tạm thời{{ $t('phase7.auto_10') }}đóng cửa)
// addEventListener('blur', updateSync)

// Cập nhật đồng bộ
async function updateSync() {
  if (!window.opener) {
    return window['$message'].error(window['$t']('views_components.auto_324'))
  }
  goDialog({
    message: window['$t']('views_components.auto_319'),
    isMaskClosable: true,
    transformOrigin: 'center',
    onPositiveCallback: () => {
      try {
        const detail = JSONParse(content.value)
        delete detail.id
        // Giữidkhông thay đổi
        window.opener.dispatchEvent(new CustomEvent(SavePageEnum.JSON, { detail }))
        window['$message'].success(window['$t']('views_components.auto_322'))
      } catch (e) {
        window['$message'].error(window['$t']('views_components.auto_320'))
        console.log(e)
      }
    }
  })
}

// Đóng trang gửi đóngSự kiện
window.onbeforeunload = () => {
  if (window.opener) {
    window.opener.dispatchEvent(new CustomEvent(SavePageEnum.CLOSE))
  }
}
</script>

<style lang="scss" scoped>
.go-edit {
  display: flex;
  flex-direction: column;
  height: 100vh;
  .go-edit-header {
    display: flex;
    align-items: center;
    height: 60px;
    justify-content: space-between;
    .go-edit-title {
      position: relative;
      bottom: 3px;
      font-size: 18px;
      font-weight: bold;
    }
  }
  @include deep() {
    .go-editor-area {
      height: calc(100vh - 60px) !important;
    }
  }
}
</style>
