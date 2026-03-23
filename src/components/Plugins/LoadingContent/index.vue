<!-- eslint-disable vue/valid-template-root -->
<template></template>

<script lang="ts" setup>
import { useLoadingBar } from 'naive-ui'
// gắn trên window Tiện lợi và hiện diệnjsđược sử dụng trong
window['$loading'] = useLoadingBar()
window['$loading'].finish()
</script>
