import { ChartList } from '@/packages/components/Charts/index'
import { VChartList } from '@/packages/components/VChart/index'
import { DecorateList } from '@/packages/components/Decorates/index'
import { InformationList } from '@/packages/components/Informations/index'
import { TableList } from '@/packages/components/Tables/index'
import { PhotoList } from '@/packages/components/Photos/index'
import { IconList } from '@/packages/components/Icons/index'
import { PackagesCategoryEnum, PackagesType, ConfigType, FetchComFlagType } from '@/packages/index.d'

const configModules: Record<string, { default: string }> = import.meta.glob('./components/**/config.vue', {
  eager: true
})
const indexModules: Record<string, { default: string }> = import.meta.glob('./components/**/index.vue', {
  eager: true
})
const imagesModules: Record<string, { default: string }> = import.meta.glob('../assets/images/chart/**', {
  eager: true
})

// * tất cảBiểu đồ
export let packagesList: PackagesType = {
  [PackagesCategoryEnum.CHARTS]: ChartList,
  [PackagesCategoryEnum.VCHART]: VChartList,
  [PackagesCategoryEnum.INFORMATIONS]: InformationList,
  [PackagesCategoryEnum.TABLES]: TableList,
  [PackagesCategoryEnum.DECORATES]: DecorateList,
  [PackagesCategoryEnum.PHOTOS]: PhotoList,
  [PackagesCategoryEnum.ICONS]: IconList
}

// Bộ nhớ đệm thành phần, Có thể cải thiện đáng kể tốc độ tải thành phần
const componentCacheMap = new Map<string, any>()
const loadConfig = (packageName: string, categoryName: string, keyName: string) => {
  const key = packageName + categoryName + keyName
  if (!componentCacheMap.has(key)) {
    componentCacheMap.set(key, import(`./components/${packageName}/${categoryName}/${keyName}/config.ts`))
  }
  return componentCacheMap.get(key)
}

/**
 * * Nhận thông tin cấu hình thành phần mục tiêu
 * @param targetData
 */
export const createComponent = async (targetData: ConfigType) => {
  const { redirectComponent, category, key } = targetData
  // redirectComponent Nó được sử dụng cho thư viện thành phần hình ảnh và thư viện thành phần biểu tượng
  if (redirectComponent) {
    const [packageName, categoryName, keyName] = redirectComponent.split('/')
    const redirectChart = await loadConfig(packageName, categoryName, keyName)
    return new redirectChart.default()
  }
  const chart = await loadConfig(targetData.package, category, key)
  return new chart.default()
}

/**
 * * Nhận thành phần
 * @param {string} chartName tên
 * @param {FetchComFlagType} flag biểu tượng 0cho các thành phần hiển thị, 1Để cấu hình các thành phần
 */
const fetchComponent = (chartName: string, flag: FetchComFlagType) => {
  const module = flag === FetchComFlagType.VIEW ? indexModules : configModules
  for (const key in module) {
    const urlSplit = key.split('/')
    if (urlSplit[urlSplit.length - 2] === chartName) {
      return module[key]
    }
  }
}

/**
 * * Nhận các thành phần hiển thị
 * @param {ConfigType} dropData Các mục cấu hình
 */
export const fetchChartComponent = (dropData: ConfigType) => {
  const { key } = dropData
  return fetchComponent(key, FetchComFlagType.VIEW)?.default
}

/**
 * * Nhận các thành phần cấu hình
 * @param {ConfigType} dropData Các mục cấu hình
 */
export const fetchConfigComponent = (dropData: ConfigType) => {
  const { key } = dropData
  return fetchComponent(key, FetchComFlagType.CONFIG)?.default
}

/**
 * * Lấy nội dung hình ảnh
 * @param {ConfigType} targetData Các mục cấu hình
 */
export const fetchImages = async (targetData?: ConfigType) => {
  if (!targetData) return ''
  // Thường xuyên xác định xem hình ảnh có url, nếu vậy, hãy trả lại url
  if (/^(http|https):\/\/([\w.]+\/?)\S*/.test(targetData.image)) return targetData.image
  // Xử lý động dữ liệu mới
  const { image } = targetData
  // Tương thích với dữ liệu cũ
  if (image.includes('@') || image.includes('base64')) return image

  const imageName = image.substring(image.lastIndexOf('/') + 1)
  for (const key in imagesModules) {
    const urlSplit = key.split('/')
    if (urlSplit[urlSplit.length - 1] === imageName) {
      return imagesModules[key]?.default
    }
  }
  return ''
}
