<!-- eslint-disable vue/valid-template-root -->
<template></template>
<script lang="ts" setup>
import { useDialog } from 'naive-ui'
//gắn trên window Tiện lợi và hiện diệnjsđược sử dụng trong
window['$dialog'] = useDialog()
</script>
