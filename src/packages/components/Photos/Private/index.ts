import { ChartFrameEnum, ConfigType, PackagesCategoryEnum } from '@/packages/index.d'
import { ImageConfig } from '@/packages/components/Informations/Mores/Image/index'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../index.d'
import { setLocalStorage, getLocalStorage, goDialog } from '@/utils'
import { StorageEnum } from '@/enums/storageEnum'
import { FileTypeEnum } from '@/enums/fileTypeEnum'
import { backgroundImageSize } from '@/settings/designSetting'
import { usePackagesStore } from '@/store/modules/packagesStore/packagesStore'

const StoreKey = StorageEnum.GO_USER_MEDIA_PHOTOS

/**
 * TrênChuyển hoàn tấtSự kiệnkiểu
 */
type UploadCompletedEventType = {
  fileName: string
  url: string
}

const userPhotosList: ConfigType[] = getLocalStorage(StoreKey) || []

const uploadFile = (callback: Function | null = null) => {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = '.png,.jpg,.jpeg,.gif' // Chỉ có mục vụ được phép ở đâyPhútLoại hình ảnh
  input.onchange = async () => {
    if (!input.files || !input.files.length) return
    const file = input.files[0]
    const { name, size, type } = file
    if (size > 1024 * 1024 * backgroundImageSize) {
      window['$message'].warning(`Ảnh vượt max ${backgroundImageSize}M Hạn chế, vui lòng thử lạiTrênvượt qua!`)
      return false
    }
    if (type !== FileTypeEnum.PNG && type !== FileTypeEnum.JPEG && type !== FileTypeEnum.GIF) {
      window['$message'].warning((typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_474') : 'Định dạng tệp không khớp, vui lòng tải lên lại!'))
      return false
    }
    const reader = new FileReader()
    reader.onload = () => {
      const eventObj: UploadCompletedEventType = { fileName: name, url: reader.result as string }
      callback && callback(eventObj)
    }
    reader.readAsDataURL(file)
  }
  input.click()
}

const addConfig = {
  ...ImageConfig,
  category: ChatCategoryEnum.PRIVATE,
  categoryName: ChatCategoryEnumName.PRIVATE,
  package: PackagesCategoryEnum.PHOTOS,
  chartFrame: ChartFrameEnum.STATIC,
  title: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_361') : 'Bấm để tải hình ảnh lên'),
  image: 'upload.png',
  redirectComponent: `${ImageConfig.package}/${ImageConfig.category}/${ImageConfig.key}`, // Nhảy đường dẫn thành phầnRule Format：packageName/categoryName/componentKey
  disabled: true,
  configEvents: {
    // nhấp chuộtTrênvượt quaSự kiện
    addHandle: (photoConfig: ConfigType) => {
      goDialog({
        message: `Hình ảnh cần phải nhỏ hơn ${backgroundImageSize}M Và chỉ được lưu trữ tạm thời trên trình duyệt. Hình ảnh hiện tại lưu trữ tạm thờiTrêngiới hạn5M, hình ảnh mới sẽ không còn được lưu vào bộ nhớ đệm nếu vượt quá, vui lòng tự kết nối với giao diện back-end! Bây giờ được biên soạn thành base64 Để kết xuất, vui lòng sử dụng [URLURL】Để tương tác!`,
        transformOrigin: 'center',
        onPositiveCallback: () => {
          uploadFile((e: UploadCompletedEventType) => {
            // VàTrênĐịnh cấu hình các thành phần tương tự như các thành phần đã tải lên, thay đổi tiêu đề, hình ảnh và cài đặt trướcDữ liệu
            const packagesStore = usePackagesStore()
            const newPhoto = {
              ...ImageConfig,
              category: ChatCategoryEnum.PRIVATE,
              categoryName: ChatCategoryEnumName.PRIVATE,
              package: PackagesCategoryEnum.PHOTOS,
              chartFrame: ChartFrameEnum.STATIC,
              title: e.fileName,
              image: e.url,
              dataset: e.url,
              redirectComponent: `${ImageConfig.package}/${ImageConfig.category}/${ImageConfig.key}` // Nhảy đường dẫn thành phầnRule Format：packageName/categoryName/componentKey
            }
            userPhotosList.unshift(newPhoto)
            // Lưu trữ tại địa phươngDữ liệuở giữa
            setLocalStorage(StoreKey, userPhotosList)
            // Chèn vàoTrêntrước nút tải lênVị trí
            packagesStore.addPhotos(newPhoto, 1)
          })
        }
      })
    }
  }
}

export default [addConfig, ...userPhotosList]
