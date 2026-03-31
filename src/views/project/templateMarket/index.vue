<template>
  <div class="go-project-template-market">
    <n-layout class="market-layout-inner">
      <n-layout-content class="market-content" :native-scrollbar="false">
        <!-- Header -->
        <div class="market-header">
          <div class="market-header-left">
            <n-text class="market-title">{{ $t('project.template_market') }}</n-text>
            <n-text depth="3" class="market-subtitle">
              {{ filteredList.length }} mẫu có sẵn
            </n-text>
          </div>
          <div class="market-header-right">
            <n-input
              v-model:value="searchText"
              placeholder="Tìm kiếm mẫu..."
              clearable
              size="small"
              style="width: 220px"
            >
              <template #prefix>
                <n-icon :component="SearchIcon" />
              </template>
            </n-input>
          </div>
        </div>

        <!-- Category Tabs -->
        <div class="market-categories">
          <n-space :size="8">
            <n-button
              v-for="(label, key) in allCategories"
              :key="key"
              :type="selectedCategory === Number(key) ? 'primary' : 'default'"
              size="small"
              secondary
              @click="selectedCategory = Number(key)"
            >
              {{ label }}
            </n-button>
          </n-space>
        </div>

        <!-- Template Grid -->
        <div v-if="filteredList.length > 0" class="market-grid">
          <template-card
            v-for="item in filteredList"
            :key="item.id"
            :templateData="item"
          />
        </div>

        <!-- Empty State -->
        <div v-else class="market-empty">
          <n-result
            status="info"
            title="Không tìm thấy mẫu"
            description="Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm."
          />
        </div>
      </n-layout-content>
    </n-layout>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { icon } from '@/plugins'
import TemplateCard from './components/TemplateCard.vue'
import { templateList, templateCategoryMap } from './data'

const { SearchIcon } = icon.ionicons5

const searchText = ref('')
const selectedCategory = ref(0)

// All categories including "All"
const allCategories = computed(() => {
  return {
    0: 'Tất cả',
    ...templateCategoryMap
  }
})

// Filtered template list
const filteredList = computed(() => {
  let list = templateList

  // Filter by category
  if (selectedCategory.value !== 0) {
    list = list.filter(item => item.category === selectedCategory.value)
  }

  // Filter by search text
  if (searchText.value.trim()) {
    const keyword = searchText.value.trim().toLowerCase()
    list = list.filter(item =>
      item.title.toLowerCase().includes(keyword) ||
      (templateCategoryMap[item.category as keyof typeof templateCategoryMap] || '').toLowerCase().includes(keyword)
    )
  }

  return list
})
</script>

<style lang="scss" scoped>
@include go('project-template-market') {
  position: relative;
  width: 100%;
  height: calc(100vh - 62px);
  background-color: var(--n-color);
  overflow: hidden;

  .market-layout-inner {
    height: 100%;
    background-color: transparent;

    .market-content {
      background-color: var(--n-color);
      padding: 20px 24px;
    }
  }

  .market-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;

    &-left {
      display: flex;
      flex-direction: column;
      gap: 4px;

      .market-title {
        font-size: 22px;
        font-weight: 700;
      }

      .market-subtitle {
        font-size: 13px;
      }
    }
  }

  .market-categories {
    margin-bottom: 20px;
    padding-bottom: 16px;
    border-bottom: 1px solid rgba(128, 128, 128, 0.15);
  }

  .market-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 16px;
    padding-bottom: 40px;
  }

  .market-empty {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 300px;
  }
}
</style>
