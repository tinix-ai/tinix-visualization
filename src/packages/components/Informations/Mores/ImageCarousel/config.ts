import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { ImageCarouselConfig } from './index'
import cloneDeep from 'lodash/cloneDeep'
import logo from '@/assets/logo.png'

export const option = {
  // Danh sách tài nguyên hình ảnh
  dataset: [
    'https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel1.jpeg',
    'https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel2.jpeg',
    'https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel3.jpeg',
  ],
  // Tự động phát
  autoplay: true,
  // Khoảng thời gian tự động phát (mili giây)
  interval: 5000,
  // Số lượng hình ảnh hiển thị trên mỗi trang
  slidesPerview: 1,
  // hướng băng chuyền
  direction: "horizontal",
  // Kéo để chuyển đổi
  draggable: true,
  // Màn hình trung tâm
  centeredSlides: false,
  // hiệu ứng chuyển tiếp
  effect: "slide",
  // Có hiển thị điểm chỉ báo hay không
  showDots: true,
  // phong cách chỉ báo
  dotType: "dot",
  // vị trí chỉ báo
  dotPlacement: "bottom",
  // Hiển thị mũi tên
  showArrow: false,
  // phong cách hình ảnh
  fit: "contain",
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = ImageCarouselConfig.key
  public chartConfig = cloneDeep(ImageCarouselConfig)
  public option = cloneDeep(option)
}
