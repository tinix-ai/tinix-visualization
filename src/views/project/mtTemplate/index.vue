<template>
  <div class="go-project-my-template go-transition">
    <div class="go-p-4">
      <n-h2 class="go-mb-4">Mẫu của tôi</n-h2>
      
      <div v-if="templateList.length > 0">
        <n-grid
          :x-gap="20"
          :y-gap="20"
          :cols="1"
          responsive="screen"
          item-responsive
        >
          <n-grid-item
            v-for="item in templateList"
            :key="item.id"
            span="m:1 l:1 xl:1 2xl:1"
            class="template-grid-item"
          >
            <user-template-card :template-data="item" @delete="handleDelete"></user-template-card>
          </n-grid-item>
        </n-grid>
      </div>

      <div v-else class="empty-state">
        <n-empty description="Bạn chưa có mẫu cá nhân nào">
          <template #extra>
            <n-text depth="3">
              Mở một dự án trong trình biên tập và chọn "Lưu thành Mẫu" để bắt đầu xây dựng thư viện mẫu của riêng bạn.
            </n-text>
          </template>
        </n-empty>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useUserTemplateData, UserTemplateType } from './hooks/useUserTemplateData.hook'
import UserTemplateCard from './components/UserTemplateCard.vue'

const { getUserTemplateList, deleteUserTemplate } = useUserTemplateData()
const templateList = ref<UserTemplateType[]>([])

const loadData = async () => {
  templateList.value = await getUserTemplateList()
}

const handleDelete = async (id: string) => {
  await deleteUserTemplate(id)
  await loadData()
}

onMounted(() => {
  loadData()
})
</script>

<style lang="scss" scoped>
@include go('project-my-template') {
  height: 100%;
  overflow-y: auto;
  
  .empty-state {
    margin-top: 15vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .template-grid-item {
    width: 320px;
    flex-grow: 0;
  }
}

/* Ghi đè grid để hỗ trợ layout linh hoạt hơn */
:deep(.n-grid) {
  display: flex;
  flex-wrap: wrap;
}
</style>
