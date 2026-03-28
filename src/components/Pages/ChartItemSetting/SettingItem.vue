<template>
  <div class="go-setting-item" :style="{ width: width + 'px' }">
    <n-text class="name" depth="3">{{ name }}</n-text>
    <slot ></slot>
  </div>
</template>

<script setup lang="ts">
defineProps({
  name: {
    type: String,
    required: false
  },
  width: {
    type: Number,
    required: false
  }
})
</script>

<style lang="scss" scoped>
@include go(setting-item) {
  display: flex;
  flex-direction: column;
  min-width: 110px;
  text-align: start;
  margin-bottom: 12px;
  .name {
    margin-bottom: 4px;
    font-size: 12px;
  }
}
</style>
