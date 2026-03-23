import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { VideoConfig } from './index'
import cloneDeep from 'lodash/cloneDeep'
import video from '@/assets/videos/earth.mp4'

export const option = {
  // Đường dẫn video
  dataset: video,
  // Chơi vòng lặp
  loop: true,
  // tắt tiếng
  muted: true,
  // Phong cách thích ứng
  fit: 'contain',
  // góc tròn
  borderRadius: 10
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = VideoConfig.key
  public chartConfig = cloneDeep(VideoConfig)
  public option = cloneDeep(option)
}
