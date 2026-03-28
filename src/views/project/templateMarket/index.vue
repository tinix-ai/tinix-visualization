<template>
  <div class="go-project-template-market">
    <div class="content-box">
      <n-space vertical align="center">
        <h2>TiniX Visualization Templates</h2>
        <p>Tính năng Chợ Giao diện đang được phát triển, vui lòng quay lại sau!</p>
        <n-button type="primary" disabled>
          Sắp ra mắt
        </n-button>
      </n-space>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
@include go('project-template-market') {
  box-sizing: border-box;
  height: calc(100vh - 62px);
  padding-top: 3vh;
  .content-box {
    width: 700px;
    margin: 0 auto 0;
    padding: 20px;
    border-radius: 10px;
    background: linear-gradient(120deg, rgba(255, 255, 255, 0.15) 0%, rgba(29, 83, 163, 0.3) 99.09%);
    box-shadow: 0px 0px 6px 6px rgba(0, 0, 0, 0.04);
    @extend .go-flex-center;
    img {
      border-radius: 6px;
    }
  }
}

@include dark() {
  @include go('project-template-market') {
    background-color: #18181c;
  }
}
</style>
