<!-- eslint-disable vue/valid-template-root -->
<template></template>

<script lang="ts" setup>
import { useMessage } from 'naive-ui'
//gắn trên window Tiện lợi và hiện diệnjsđược sử dụng trong
window['$message'] = useMessage()
</script>
