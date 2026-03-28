<template>
  <div v-if="templateData" class="go-items-list-card">
    <n-card hoverable size="small">
      <div class="list-content">
        <div class="list-content-top">
          <mac-os-control-btn
            class="top-btn"
            :hidden="['remove', 'resize']"
          ></mac-os-control-btn>
        </div>
        <div class="list-content-img" @click="handleUse">
          <n-image
            object-fit="cover"
            height="180"
            preview-disabled
            :src="templateData.image"
            :alt="templateData.title"
            :fallback-src="requireErrorImg()"
          ></n-image>
          <div class="list-content-img-overlay">
            <n-button type="primary" size="large" @click.stop="handleUse">
              Sử dụng Mẫu này
            </n-button>
          </div>
        </div>
      </div>
      <template #action>
        <div class="card-footer-new">
          <div class="title-row go-mb-1">
            <n-text class="go-ellipsis-1 project-title" :title="templateData.title">
              {{ templateData.title }}
            </n-text>
          </div>
          
          <div class="info-row go-flex-items-center" justify="space-between">
            <div class="status-info">
              <n-text class="status-text-small">
                {{ templateData.createTime }}
              </n-text>
            </div>
            
            <div class="action-btns">
              <n-space :size="6" align="center">
                <n-tooltip placement="bottom" trigger="hover">
                  <template #trigger>
                    <n-button size="tiny" secondary @click="handleEdit">
                      <template #icon>
                        <n-icon :size="14"><PencilIcon /></n-icon>
                      </template>
                    </n-button>
                  </template>
                  Chỉnh sửa Mẫu
                </n-tooltip>
                <n-tooltip placement="bottom" trigger="hover">
                  <template #trigger>
                    <n-button size="tiny" secondary @click="handleDelete">
                      <template #icon>
                        <n-icon :size="14"><TrashIcon /></n-icon>
                      </template>
                    </n-button>
                  </template>
                  Xóa Mẫu
                </n-tooltip>
              </n-space>
            </div>
          </div>
        </div>
      </template>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { fetchPathByName, routerTurnByPath, getUUID, setLocalStorage, getLocalStorage, requireErrorImg, goDialog } from '@/utils'
import { ChartEnum } from '@/enums/pageEnum'
import { StorageEnum } from '@/enums/storageEnum'
import { icon } from '@/plugins'
import { MacOsControlBtn } from '@/components/Tips/MacOsControlBtn'
import type { UserTemplateType } from '../hooks/useUserTemplateData.hook'

const {
  PencilIcon,
  TrashIcon
} = icon.ionicons5

const props = defineProps({
  templateData: {
    type: Object as PropType<UserTemplateType>,
    required: true
  }
})

const emit = defineEmits(['delete'])

const handleEdit = () => {
  const path = fetchPathByName(ChartEnum.CHART_HOME_NAME, 'href')
  // Để chỉnh sửa mẫu cá nhân, ta có thể dùng ID của nó nhưng Editor cần biết đây là Template
  // Tuy nhiên, mẫu cá nhân thực chất là một Dashboard config.
  // Ta có thể mở nó như một dự án tạm thời hoặc có cơ chế riêng.
  // Hiện tại, ta sẽ mở nó như một dự án với ID mẫu.
  routerTurnByPath(path, [props.templateData.id], undefined, true)
}

const handleDelete = () => {
  goDialog({
    type: 1 as any, // DELETE
    message: `Bạn có chắc chắn muốn xóa mẫu "${props.templateData.title}" không? Hành động này không thể hoàn tác.`,
    onPositiveCallback: () => {
      emit('delete', props.templateData.id)
    }
  })
}

const handleUse = () => {
  const id = getUUID()
  const path = fetchPathByName(ChartEnum.CHART_HOME_NAME, 'href')
  
  // Clone cấu hình
  const newProjectConfig = {
    ...props.templateData.config,
    id: id,
    editCanvasConfig: {
      ...props.templateData.config.editCanvasConfig,
      projectName: `Dự án từ ${props.templateData.title}`
    }
  }

  // Cập nhật danh sách dự án
  const storageList = getLocalStorage(StorageEnum.GO_CHART_STORAGE_LIST) || []
  storageList.push(newProjectConfig)
  setLocalStorage(StorageEnum.GO_CHART_STORAGE_LIST, storageList)
  
  window['$message'].success(`Đã tạo dự án mới từ mẫu: ${props.templateData.title}`)
  routerTurnByPath(path, [id], undefined, true)
}
</script>

<style lang="scss" scoped>
$contentHeight: 180px;

@include go('items-list-card') {
  position: relative;
  border-radius: $--border-radius-base;
  border: 1px solid rgba(0, 0, 0, 0);
  @extend .go-transition;
  &:hover {
    @include hover-border-color('hover-border-color');
  }
  .list-content {
    margin-top: 20px;
    margin-bottom: 5px;
    cursor: pointer;
    border-radius: $--border-radius-base;
    @include background-image('background-point');
    @extend .go-point-bg;
    position: relative;
    overflow: hidden;
    &-top {
      position: absolute;
      top: 10px;
      left: 10px;
      height: 22px;
      z-index: 10;
    }
    &-img {
      height: $contentHeight;
      position: relative;
      @extend .go-flex-center;
      @extend .go-border-radius;
      @include deep() {
        img {
          @extend .go-border-radius;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      &-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.6);
        display: flex;
        justify-content: center;
        align-items: center;
        opacity: 0;
        transition: opacity 0.3s ease;
        border-radius: $--border-radius-base;
      }
    }
    &:hover .list-content-img-overlay {
      opacity: 1;
    }
  }
  .card-footer-new {
    display: flex;
    flex-direction: column;
    padding: 8px 12px 2px;
    
    .title-row {
      .project-title {
        font-size: 15px;
        font-weight: 600;
        color: var(--n-text-color);
        max-width: 100%;
        display: block;
      }
    }
    
    .info-row {
      justify-content: space-between;
      height: 32px;
      
      .status-info {
        display: flex;
        align-items: center;
        opacity: 0.6;
        
        .status-text-small {
          font-size: 11px;
        }
      }
      
      .action-btns {
        display: flex;
        align-items: center;
      }
    }
  }
}
</style>
