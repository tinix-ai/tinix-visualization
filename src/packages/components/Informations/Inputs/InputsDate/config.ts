import dayjs from 'dayjs'
import cloneDeep from 'lodash/cloneDeep'
import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { chartInitConfig } from '@/settings/designSetting'
import { COMPONENT_INTERACT_EVENT_KET } from '@/enums/eventEnum'
import { interactActions, ComponentInteractEventEnum, DefaultTypeEnum, DifferUnitEnum } from './interact'
import { InputsDateConfig } from './index'

export const option = {
  // Kiểu hiển thị thành phần thời gian, phải giống với interactActions Dữ liệu được xác định trong
  [COMPONENT_INTERACT_EVENT_KET]: ComponentInteractEventEnum.DATE,
  // Hiển thị thả xuống
  isPanel: 0,
  // giá trị mặc định
  dataset: dayjs().valueOf() as number | number[] | null,
  // Loại giá trị mặc định
  defaultType: DefaultTypeEnum.STATIC,
  // Đơn vị bù giá trị mặc định động
  differUnit: [DifferUnitEnum.DAY, DifferUnitEnum.DAY],
  // Giá trị bù mặc định động
  differValue: [0, 0]
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = InputsDateConfig.key
  public attr = { ...chartInitConfig, w: 260, h: 32, zIndex: -1 }
  public chartConfig = cloneDeep(InputsDateConfig)
  public interactActions = interactActions
  public option = cloneDeep(option)
}
