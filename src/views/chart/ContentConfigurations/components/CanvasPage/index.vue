<template>
  <div class="go-canvas-setting">
    <n-form inline :label-width="45" size="small" label-placement="left">
      <n-form-item label="Chiều rộng">
        <!-- Chọn kích thước -->
        <n-input-number
          size="small"
          v-model:value="canvasConfig.width"
          :disabled="editCanvas.lockScale"
          :validator="validator"
          @update:value="changeSizeHandle"
        ></n-input-number>
      </n-form-item>
      <n-form-item label="Chiều cao">
        <n-input-number
          size="small"
          v-model:value="canvasConfig.height"
          :disabled="editCanvas.lockScale"
          :validator="validator"
          @update:value="changeSizeHandle"
        ></n-input-number>
      </n-form-item>
    </n-form>

    <div class="upload-box">
      <n-upload
        v-model:file-list="uploadFileListRef"
        :show-file-list="false"
        :customRequest="customRequest"
        :onBeforeUpload="beforeUploadHandle"
      >
        <n-upload-dragger>
          <img v-if="canvasConfig.backgroundImage" class="upload-show" :src="canvasConfig.backgroundImage" alt="Background" />
          <div class="upload-img" v-show="!canvasConfig.backgroundImage">
            <img src="@/assets/images/canvas/noImage.png" />
            <n-text class="upload-desc" depth="3">
              BackgroundHình ảnh cần phải nhỏ hơn {{ backgroundImageSize }}M , định dạng png/jpg
            </n-text>
          </div>
        </n-upload-dragger>
      </n-upload>
    </div>
    <n-space vertical :size="12">
      <n-space>
        <n-text>Màu nền</n-text>
        <div class="picker-height">
          <n-color-picker
            v-if="!switchSelectColorLoading"
            size="small"
            style="width: 250px"
            v-model:value="canvasConfig.background"
            :showPreview="true"
            :swatches="swatchesColors"
          ></n-color-picker>
        </div>
      </n-space>
      <n-space>
        <n-text>Kiểu áp dụng</n-text>
        <n-select
          size="small"
          style="width: 250px"
          v-model:value="selectColorValue"
          :disabled="!canvasConfig.backgroundImage"
          :options="selectColorOptions"
          @update:value="selectColorValueHandle"
        />
      </n-space>
      <n-space>
        <n-text>Kiểu Nền</n-text>
        <n-button class="clear-btn" size="small" :disabled="!canvasConfig.backgroundImage" @click="clearImage">
          Xóa nền
        </n-button>
        <n-button class="clear-btn" size="small" :disabled="!canvasConfig.background" @click="clearColor">
          Xóa màu
        </n-button>
      </n-space>
      <n-space>
        <n-text>Kiểu hiển thị</n-text>
        <n-button-group>
          <n-button
            v-for="item in previewTypeList"
            :key="item.key"
            :type="canvasConfig.previewScaleType === item.key ? 'primary' : 'tertiary'"
            ghost
            size="small"
            @click="selectPreviewType(item.key)"
          >
            <n-tooltip :show-arrow="false" trigger="hover">
              <template #trigger>
                <n-icon class="select-preview-icon" size="18">
                  <component :is="item.icon"></component>
                </n-icon>
              </template>
              {{ item.desc }}
            </n-tooltip>
          </n-button>
        </n-button-group>
      </n-space>
    </n-space>

    <!-- Bộ Lọc -->
    <styles-setting :isCanvas="true" :chartStyles="canvasConfig"></styles-setting>
    <n-divider style="margin: 10px 0"></n-divider>

    <!-- lựa chọn chủ đề vàCấu hình chung -->
    <n-tabs class="tabs-box" size="small" type="segment">
      <n-tab-pane
        v-for="item in globalTabList"
        :key="item.key"
        :name="item.key"
        size="small"
        display-directive="show:lazy"
      >
        <template #tab>
          <n-space>
            <span>{{ item.title }}</span>
            <n-icon size="16" class="icon-position">
              <component :is="item.icon"></component>
            </n-icon>
          </n-space>
        </template>
        <component :is="item.render"></component>
      </n-tab-pane>
    </n-tabs>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, watch } from 'vue'
import { backgroundImageSize } from '@/settings/designSetting'
import { swatchesColors } from '@/settings/chartThemes/index'
import { FileTypeEnum } from '@/enums/fileTypeEnum'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { EditCanvasConfigEnum } from '@/store/modules/chartEditStore/chartEditStore.d'
import { StylesSetting } from '@/components/Pages/ChartItemSetting'
import { UploadCustomRequestOptions } from 'naive-ui'
import { fileToUrl, loadAsyncComponent } from '@/utils'
import { PreviewScaleEnum } from '@/enums/styleEnum'
import { icon } from '@/plugins'

const { ColorPaletteIcon } = icon.ionicons5
const { ScaleIcon, FitToScreenIcon, FitToHeightIcon, FitToWidthIcon } = icon.carbon

const chartEditStore = useChartEditStore()
const canvasConfig = chartEditStore.getEditCanvasConfig
const editCanvas = chartEditStore.getEditCanvas

const uploadFileListRef = ref()
const switchSelectColorLoading = ref(false)
const selectColorValue = ref(0)

const ChartThemeColor = loadAsyncComponent(() => import('./components/ChartThemeColor/index.vue'))

// mặc địnhKiểu áp dụng
const selectColorOptions = [
  {
    label: 'Áp dụng Màu',
    value: 0
  },
  {
    label: 'Áp Dụng Background',
    value: 1
  }
]

const globalTabList = [
  {
    key: 'ChartTheme',
    title: 'Màu Chủ Đề',
    icon: ColorPaletteIcon,
    render: ChartThemeColor
  }
]

const previewTypeList = [
  {
    key: PreviewScaleEnum.FIT,
    title: 'Adaptive (Auto-fit)',
    icon: ScaleIcon,
    desc: 'Tự động co giãn tỷ lệ (Có khoảng trống)'
  },
  {
    key: PreviewScaleEnum.SCROLL_Y,
    title: 'Cuộn Y',
    icon: FitToWidthIcon,
    desc: 'X lấp kín, Y cuộn tự do'
  },
  {
    key: PreviewScaleEnum.SCROLL_X,
    title: 'Cuộn X',
    icon: FitToHeightIcon,
    desc: 'Y lấp kín, X cuộn tự do'
  },
  {
    key: PreviewScaleEnum.FULL,
    title: 'Full kín',
    icon: FitToScreenIcon,
    desc: 'Ép dãn hình, lèn chặt 100% view'
  }
]

watch(
  () => canvasConfig.selectColor,
  newValue => {
    selectColorValue.value = newValue ? 0 : 1
  },
  {
    immediate: true
  }
)

// kích thước vảiRule Format
const validator = (x: number) => x > 50

// Sửa đổi kích thước
const changeSizeHandle = () => {
  chartEditStore.computedScale()
}

// Tải ảnh lênTiền xử lý
//@ts-ignore
const beforeUploadHandle = async ({ file }) => {
  uploadFileListRef.value = []
  const type = file.file.type
  const size = file.file.size

  if (size > 1024 * 1024 * backgroundImageSize) {
    window['$message'].warning(`Ảnh vượt max ${backgroundImageSize}M Hạn chế, vui lòng thử lạiTrênvượt qua!`)
    return false
  }
  if (type !== FileTypeEnum.PNG && type !== FileTypeEnum.JPEG && type !== FileTypeEnum.GIF) {
    window['$message'].warning('Định dạng tệp không khớp, vui lòng thử lạiTrênvượt qua!')
    return false
  }
  return true
}

// Áp dụng Màu
const selectColorValueHandle = (value: number) => {
  canvasConfig.selectColor = value == 0
}

// Xóa nền
const clearImage = () => {
  chartEditStore.setEditCanvasConfig(EditCanvasConfigEnum.BACKGROUND_IMAGE, undefined)
  chartEditStore.setEditCanvasConfig(EditCanvasConfigEnum.SELECT_COLOR, true)
}

// cho phép/đóng cửa Màu sắc(bắt buộc cập nhật)
const switchSelectColorHandle = () => {
  switchSelectColorLoading.value = true
  setTimeout(() => {
    switchSelectColorLoading.value = false
  })
}

// Xóa màu
const clearColor = () => {
  chartEditStore.setEditCanvasConfig(EditCanvasConfigEnum.BACKGROUND, undefined)
  if (canvasConfig.backgroundImage) {
    chartEditStore.setEditCanvasConfig(EditCanvasConfigEnum.SELECT_COLOR, false)
  }
  switchSelectColorHandle()
}

// Tùy chỉnhTrênhoạt động chuyển giao
const customRequest = (options: UploadCustomRequestOptions) => {
  const { file } = options
  nextTick(() => {
    if (file.file) {
      const ImageUrl = fileToUrl(file.file)
      chartEditStore.setEditCanvasConfig(EditCanvasConfigEnum.BACKGROUND_IMAGE, ImageUrl)
      chartEditStore.setEditCanvasConfig(EditCanvasConfigEnum.SELECT_COLOR, false)
    } else {
      window['$message'].error('Thêmhình ảnhlỗi rớt, lát thử lại mạng!')
    }
  })
}

// chọnKiểu hiển thị
const selectPreviewType = (key: PreviewScaleEnum) => {
  chartEditStore.setEditCanvasConfig(EditCanvasConfigEnum.PREVIEW_SCALE_TYPE, key)
}
</script>

<style lang="scss" scoped>
$uploadWidth: 326px;
$uploadHeight: 193px;
@include go(canvas-setting) {
  padding-top: 20px;
  .upload-box {
    cursor: pointer;
    margin-bottom: 20px;
    @include deep() {
      .n-upload-dragger {
        padding: 5px;
        width: $uploadWidth;
        background-color: rgba(0, 0, 0, 0);
      }
    }
    .upload-show {
      width: -webkit-fill-available;
      height: $uploadHeight;
      border-radius: 5px;
    }
    .upload-img {
      display: flex;
      flex-direction: column;
      align-items: center;
      img {
        height: 150px;
      }
      .upload-desc {
        padding: 10px 0;
      }
    }
  }
  .icon-position {
    padding-top: 2px;
  }
  .picker-height {
    min-height: 35px;
  }
  .clear-btn {
    padding-left: 2.25em;
    padding-right: 2.25em;
  }
  .select-preview-icon {
    padding-right: 0.68em;
    padding-left: 0.68em;
  }
  .tabs-box {
    margin-top: 20px;
  }
}
</style>
