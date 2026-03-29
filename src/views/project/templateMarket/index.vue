<template>
  <div class="go-project-template-market">
    <n-layout class="market-layout-inner">
      <n-layout-content class="market-content go-p-5" :native-scrollbar="false">
        <div style="height: 100%; display: flex; align-items: center; justify-content: center;">
          <n-result
            status="info"
            title="Chợ Mẫu - Coming Soon"
            description="Tính năng đang được nâng cấp để mang lại trải nghiệm tốt nhất. Vui lòng quay lại sau!"
          >
            <template #icon>
              <n-icon size="80" color="#18a058">
                <ConstructIcon />
              </n-icon>
            </template>
            <template #footer>
              <n-button type="primary" size="large" @click="router.push({ name: 'ProjectHome' })">
                Quay về Dự án của tôi
              </n-button>
            </template>
          </n-result>
        </div>
      </n-layout-content>
    </n-layout>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { icon } from '@/plugins'

const { ConstructIcon } = icon.ionicons5
const router = useRouter()
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
    }
  }
}
</style>
