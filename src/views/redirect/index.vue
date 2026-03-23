<template>
  <n-empty :description="$t('views_components.auto_344')"
>
    <template #extra>
      <n-button size="small" @click="goHome">{{ $t('phase7.auto_29') }}</n-button>
    </template>
  </n-empty>
</template>
<script lang="ts" setup>
import { onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
const goHome = () => {
  router.replace({ path: '/' })
}
</script>
