<template>
  <div v-if="templateData" class="go-items-list-card">
    <n-card hoverable size="small">
      <div class="list-content">
        <!-- Trên cùng cái nút (Mac OS style) -->
        <div class="list-content-top">
          <mac-os-control-btn
            class="top-btn"
            :hidden="['remove', 'resize']"
          ></mac-os-control-btn>
        </div>
        <!-- Hình ảnh xem trước -->
        <div class="list-content-img" @click="handleUse">
          <n-image
            object-fit="cover"
            height="180"
            preview-disabled
            :src="requireUrl(templateData.image)"
            :alt="templateData.title"
            :fallback-src="requireErrorImg()"
          ></n-image>
          <!-- Lớp phủ (Overlay) khi hover -->
          <div class="list-content-img-overlay">
            <n-button type="primary" size="large" @click.stop="handleUse">
              Tạo Dự án Mới
            </n-button>
          </div>
        </div>
      </div>
      <template #action>
        <div class="card-footer-new">
          <!-- Title on top -->
          <div class="title-row go-mb-1">
            <n-text class="go-ellipsis-1 project-title" :title="templateData.title">
              {{ templateData.title || templateData.id }}
            </n-text>
            <n-text depth="3" class="category-label">
              {{ templateCategoryMap[templateData.category as keyof typeof templateCategoryMap] || 'Chưa phân loại' }}
            </n-text>
          </div>
          
          <!-- Status and Actions at bottom -->
          <div class="info-row go-flex-items-center" justify="space-between">
            <div class="status-info">
              <n-badge
                class="go-animation-twinkle status-dot"
                dot
                :color="templateData.isPublished ? '#34c749' : '#fcbc40'"
              ></n-badge>
              <n-text class="status-text-small">
                {{ templateData.isPublished ? 'Đã phát hành' : 'Chưa phát hành' }}
              </n-text>
            </div>
            
            <div class="action-btns">
              <n-space :size="6" align="center">
                <n-tooltip placement="bottom" trigger="hover">
                  <template #trigger>
                    <n-button size="tiny" secondary @click="handleUse">
                      <template #icon>
                        <n-icon :size="14"><HammerIcon /></n-icon>
                      </template>
                    </n-button>
                  </template>
                  Bản sao & Biên tập (Tạo mới)
                </n-tooltip>
                <n-dropdown
                  trigger="hover"
                  placement="bottom"
                  :options="selectOptions"
                  :show-arrow="true"
                  @select="handleSelect"
                >
                  <n-button size="tiny" secondary>
                    <template #icon>
                      <n-icon :size="14"><EllipsisHorizontalCircleSharpIcon /></n-icon>
                    </template>
                  </n-button>
                </n-dropdown>
              </n-space>
            </div>
          </div>
        </div>
      </template>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { PropType, ref, onMounted } from 'vue'
import { fetchPathByName, routerTurnByPath, getUUID, setSessionStorage, setLocalStorage, getLocalStorage, renderIcon, requireErrorImg, goDialog } from '@/utils'
import { DialogEnum } from '@/enums/pluginEnum'
import { ChartEnum, PreviewEnum } from '@/enums/pageEnum'
import { StorageEnum } from '@/enums/storageEnum'
import { icon } from '@/plugins'
import { MacOsControlBtn } from '@/components/Tips/MacOsControlBtn'
import type { TemplateItem } from '../data'
import { templateCategoryMap } from '../data'
import { saveProjectApi, getTemplateOverridesApi, saveTemplateOverridesApi } from '@/api/storage.api'

const {
  EllipsisHorizontalCircleSharpIcon,
  HammerIcon,
  BrowsersOutlineIcon,
  TrashIcon
} = icon.ionicons5

const emit = defineEmits(['use', 'preview'])

const props = defineProps({
  templateData: Object as PropType<TemplateItem>
})

const requireUrl = (name: string | null | undefined) => {
  if (!name) return ''
  if (name.startsWith('http') || name.startsWith('data:') || name.startsWith('/src/') || name.startsWith('/@fs/')) {
    return name
  }
  // Nếu là đường dẫn cũ (relative), vẫn dùng URL resolver
  return new URL(`../../../../../assets/images/${name}`, import.meta.url).href
}

const selectOptions = ref([
  {
    label: 'Xem trước',
    key: 'preview',
    icon: renderIcon(BrowsersOutlineIcon)
  },
  {
    label: 'Chỉnh sửa gốc (Admin)',
    key: 'edit_original',
    icon: renderIcon(HammerIcon)
  },
  {
    label: 'Xóa bản ghi đè (Reset)',
    key: 'delete_override',
    icon: renderIcon(TrashIcon)
  }
])

const handleSelect = (key: string) => {
  if (key === 'preview') {
    handlePreview()
  } else if (key === 'edit_original') {
    handleEditOriginal()
  } else if (key === 'delete_override') {
    handleDeleteOverride()
  }
}

// Xem trước Live Dashboard (mở tab mới)
const handlePreview = () => {
  if (!props.templateData || !props.templateData.config) {
    window['$message'].warning('Mẫu này hiện chưa có cấu hình chi tiết để xem trước.')
    return
  }
  const previewId = props.templateData.id
  const previewData = {
    id: previewId,
    ...props.templateData.config
  }
  // Lưu vào SessionStorage để Preview route có thể đọc
  setSessionStorage(StorageEnum.GO_CHART_STORAGE_LIST, [previewData])
  const path = fetchPathByName(PreviewEnum.CHART_PREVIEW_NAME, 'href')
  if (path) {
    routerTurnByPath(path, [previewId], undefined, true)
  }
}

const handleDeleteOverride = () => {
  if (!props.templateData) return
  const id = props.templateData.id
  
  goDialog({
    type: DialogEnum.DELETE,
    message: 'Bạn có chắc chắn muốn xóa bản ghi đè và đặt lại mẫu này về mặc định?',
    onPositiveCallback: async () => {
      // Lấy từ SQLite Server
      let templateStorage = await getTemplateOverridesApi()
      if (!templateStorage) {
         // Fallback LocalStorage migration if server failed or empty
         templateStorage = getLocalStorage(StorageEnum.GO_TEMPLATE_STORAGE) || []
      }
      const filterList = templateStorage.filter((item: any) => String(item.id) !== String(id))
      // Lưu lại vào Server
      await saveTemplateOverridesApi(filterList)
      
      window['$message'].success('Đã đặt lại mẫu về mặc định. Đang tải lại trang...')
      setTimeout(() => {
        location.reload()
      }, 1000)
    }
  })
}

const handleEditOriginal = () => {
  if (!props.templateData) return
  const id = props.templateData.id
  const path = fetchPathByName(ChartEnum.CHART_HOME_NAME, 'href')
  routerTurnByPath(path, [id], undefined, true)
}

const handleUse = async () => {
  if (!props.templateData || !props.templateData.config) {
    window['$message'].warning('Mẫu này hiện chưa có cấu hình chi tiết.')
    return
  }

  const id = getUUID()
  const path = fetchPathByName(ChartEnum.CHART_HOME_NAME, 'href')
  
  // Clone cấu hình (Clone config)
  const newProjectConfig = {
    ...props.templateData.config,
    id: id,
    editCanvasConfig: {
      ...props.templateData.config.editCanvasConfig,
      backgroundImage: requireUrl(props.templateData.image)
    }
  }

  // Lưu vào SQLite Server (Save to SQLite Server)
  const success = await saveProjectApi(newProjectConfig)
  
  if (success) {
    window['$message'].success(`Đã khởi tạo dự án: ${props.templateData.title} trên SQLite Server`)
    // Chuyển hướng tới không gian làm việc
    routerTurnByPath(path, [id], undefined, true)
  } else {
    window['$message'].error('Không thể tạo dự án trên Server Backend.')
  }
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
      .category-label {
        font-size: 11px;
        opacity: 0.7;
      }
    }
    
    .info-row {
      justify-content: space-between;
      height: 32px;
      
      .status-info {
        display: flex;
        align-items: center;
        opacity: 0.8;
        
        .status-dot {
          margin-right: 6px;
          transform: scale(0.8);
        }
        
        .status-text-small {
          font-size: 11px;
          letter-spacing: 0.5px;
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
