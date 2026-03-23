import { ChartFrameEnum, PackagesCategoryEnum } from '@/packages/index.d'
import { ImageConfig } from '@/packages/components/Informations/Mores/Image/index'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../index.d'

// Thư viện chia sẻ từ xa (gọi giao diện để lấy hình ảnhDanh sách）
const imageList = [
  { imageName: 'carousel1', imageUrl: 'https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel1.jpeg' },
  { imageName: 'carousel2', imageUrl: 'https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel2.jpeg' }
]

const photoConfigList = imageList.map(i => ({
  ...ImageConfig,
  category: ChatCategoryEnum.SHARE,
  categoryName: ChatCategoryEnumName.SHARE,
  package: PackagesCategoryEnum.PHOTOS,
  chartFrame: ChartFrameEnum.STATIC,
  image: i.imageUrl,
  dataset: i.imageUrl,
  title: i.imageName,
  redirectComponent: `${ImageConfig.package}/${ImageConfig.category}/${ImageConfig.key}` // Nhảy đường dẫn thành phầnRule Format：packageName/categoryName/componentKey
}))

export default photoConfigList
