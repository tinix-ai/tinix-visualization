<template>
  <n-modal
    class="go-chart-data-request"
    v-model:show="modelShowRef"
    :mask-closable="false"
    :closeOnEsc="true"
    :onEsc="onEsc"
  >
    <n-card :bordered="false" role="dialog" size="small" aria-modal="true" style="width: 1000px; height: 800px">
      <template #header></template>
      <template #header-extra> </template>
      <n-scrollbar style="max-height: 718px">
        <div class="go-pr-3">
          <n-space vertical>
            <request-global-config></request-global-config>
            <request-target-config
              :target-data-request="targetDataRequest?.dataPondRequestConfig"
            ></request-target-config>
          </n-space>
        </div>
      </n-scrollbar>
      <!-- Dưới cùng -->
      <template #action>
        <n-space justify="space-between">
          <n-space v-if="targetDataRequest">
            <n-tag :bordered="false" type="primary">{{ $t('phase7.auto_35') }}</n-tag>
            <n-input
              v-model:value="targetDataRequest.dataPondName"
              ref="inputInstRef"
              type="text"
              size="small"
              :autofocus="true"
              :clearable="true"
              :minlength="1"
              :maxlength="16"
              :placeholder="$t('views_components.auto_183')"

            ></n-input>
          </n-space>
          <span v-else></span>
          <n-space>
            <n-button @click="closeHandle">{{ $t('phase7.auto_311') }}</n-button>
            <n-button type="primary" @click="closeAndSendHandle">{{ $t('phase7.auto_447') }}</n-button>
          </n-space>
        </n-space>
      </template>
    </n-card>
  </n-modal>
</template>

<script script lang="ts" setup>
import { PropType, ref, watch } from 'vue'
import { RequestContentTypeEnum } from '@/enums/httpEnum'
import { useTargetData } from '../../../hooks/useTargetData.hook'
import { RequestGlobalConfig } from './components/RequestGlobalConfig'
import { RequestTargetConfig } from './components/RequestTargetConfig'
import { RequestDataPondItemType } from '@/store/modules/chartEditStore/chartEditStore.d'
import { goDialog } from '@/utils'

const props = defineProps({
  modelShow: Boolean,
  targetDataRequest: Object as PropType<RequestDataPondItemType>
})
const emit = defineEmits(['update:modelShow', 'editSaveHandle'])

const pondName = ref()
const inputInstRef = ref()
const modelShowRef = ref(false)

watch(
  () => props.modelShow,
  newValue => {
    modelShowRef.value = newValue
  }
)

const closeHandle = () => {
  emit('update:modelShow', false)
}

const closeAndSendHandle = () => {
  if (!props.targetDataRequest?.dataPondName) {
    window.$message.warning(window['$t']('views_components.auto_181'))
    inputInstRef.value?.focus()
    return
  }
  goDialog({
    message: window['$t']('views_components.auto_182'),
    isMaskClosable: true,
    transformOrigin: 'center',
    onPositiveCallback: () => {
      emit('update:modelShow', false)
      emit('editSaveHandle', props.targetDataRequest)
    }
  })
}

const onEsc = () => {
  closeHandle()
}
</script>

<style lang="scss" scoped>
@include go('chart-data-request') {
  &.n-card.n-modal,
  .n-card {
    @extend .go-background-filter;
  }
  .n-card-shallow {
    background-color: rgba(0, 0, 0, 0) !important;
  }
  @include deep() {
    & > .n-card__content {
      padding-right: 0;
    }
    .n-card__content {
      padding-bottom: 5px;
    }
  }
}
</style>
