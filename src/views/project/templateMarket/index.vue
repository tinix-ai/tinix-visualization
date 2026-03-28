<template>
  <div class="go-project-template-market">
    <div class="market-header go-mb-4">
      <n-space justify="space-between" align="center">
        <h2>Thư viện Mẫu (Template Market)</h2>
      </n-space>
    </div>
    
    <div class="go-items-list">
      <n-grid
        :x-gap="20"
        :y-gap="20"
        cols="2 s:2 m:3 l:4 xl:4 xxl:4"
        responsive="screen"
      >
        <n-grid-item v-for="(item, index) in displayList" :key="item.id">
          <template-card
            :templateData="item"
          ></template-card>
        </n-grid-item>
      </n-grid>
      
      <div class="list-pagination go-mt-4">
        <n-pagination
          :item-count="totalCount"
          :page-sizes="[12, 24, 36]"
          show-size-picker
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { templateList as staticTemplateList } from './data'
import TemplateCard from './components/TemplateCard.vue'
import { getLocalStorage } from '@/utils'
import { StorageEnum } from '@/enums/storageEnum'
import { getTemplateOverridesApi, getSystemTemplatesApi } from '@/api/storage.api'

const displayList = ref<any[]>([])
const totalCount = ref(staticTemplateList.length)

const loadData = async () => {
  try {
    // 1. Lấy danh sách ghi đè từ SQLite Server
    let templateStorage = await getTemplateOverridesApi()
    if (!Array.isArray(templateStorage)) {
      templateStorage = getLocalStorage(StorageEnum.GO_TEMPLATE_STORAGE) || []
      if (!Array.isArray(templateStorage)) templateStorage = []
    }

    // 2. Lấy danh sách mẫu hệ thống bổ sung từ SQLite Server
    let systemTemplates = await getSystemTemplatesApi()
    if (!Array.isArray(systemTemplates)) systemTemplates = []

    // 3. Hợp nhất danh sách mẫu tĩnh và mẫu hệ thống mới
    const fullTemplateList = [...staticTemplateList, ...systemTemplates]
    totalCount.value = fullTemplateList.length

    displayList.value = fullTemplateList.map(item => {
      // Tìm bản ghi đè (Find override)
      const override = templateStorage.find((t: any) => t.id === item.id)
      if (override) {
        return {
          ...item,
          config: override,
          title: override.editCanvasConfig?.projectName || item.title,
          image: override.editCanvasConfig?.backgroundImage || item.image
        }
      }
      return item
    })
  } catch (error) {
    console.error('Template Market Load Error:', error)
    // Fallback tối thượng: Hiển thị ít nhất danh sách tĩnh
    displayList.value = [...staticTemplateList]
  }
}

onMounted(() => {
  loadData()
})
</script>

<style lang="scss" scoped>
@include go('project-template-market') {
  box-sizing: border-box;
  min-height: calc(100vh - #{$--header-height} * 2 - 2px);
  padding: 30px 20px;
  .market-header {
    h2 {
      font-weight: bold;
      color: var(--n-text-color);
      margin: 0;
    }
  }
  .go-items-list {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .list-pagination {
      display: flex;
      justify-content: flex-end;
      margin-top: 20px;
    }
  }
}
</style>

