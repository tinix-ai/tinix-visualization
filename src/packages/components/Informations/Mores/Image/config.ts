import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { ImageConfig } from './index'
import cloneDeep from 'lodash/cloneDeep'
import logo from '@/assets/logo.png'

export const option = {
  // Đường dẫn hình ảnh
  dataset: logo,
  // Phong cách thích ứng
  fit: 'contain',
  // góc tròn
  borderRadius: 10
}

export default class Config extends PublicConfigClass implements CreateComponentType
{
  public key = ImageConfig.key
  public chartConfig = cloneDeep(ImageConfig)
  public option = cloneDeep(option)
}
