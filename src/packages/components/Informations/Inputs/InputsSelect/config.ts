import cloneDeep from 'lodash/cloneDeep'
import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { chartInitConfig } from '@/settings/designSetting'
import { COMPONENT_INTERACT_EVENT_KET } from '@/enums/eventEnum'
import { interactActions, ComponentInteractEventEnum } from './interact'
import { InputsSelectConfig } from './index'

export const option = {
  // Kiểu hiển thị thành phần thời gian, phải giống với interactActions Dữ liệu được xác định trong
  [COMPONENT_INTERACT_EVENT_KET]: ComponentInteractEventEnum.DATA,
  // giá trị mặc định
  selectValue: '1',
  // Hiển thị nội dung cấu hình cho người dùng
  dataset: [
    {
      label: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_43') : 'Tùy chọn 3'),
      value: '1'
    },
    {
      label: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_505') : 'Tùy chọn 1'),
      value: '2'
    },
    {
      label: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_114') : 'Tùy chọn 2'),
      value: '3'
    }
  ]
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = InputsSelectConfig.key
  public attr = { ...chartInitConfig, w: 260, h: 32, zIndex: -1 }
  public chartConfig = cloneDeep(InputsSelectConfig)
  public interactActions = interactActions
  public option = cloneDeep(option)
}
