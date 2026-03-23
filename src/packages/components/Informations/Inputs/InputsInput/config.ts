import cloneDeep from 'lodash/cloneDeep'
import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { chartInitConfig } from '@/settings/designSetting'
import { COMPONENT_INTERACT_EVENT_KET } from '@/enums/eventEnum'
import { interactActions, ComponentInteractEventEnum } from './interact'
import {InputsInputConfig} from "./index";

export const option = {
    // Kiểu hiển thị thành phần thời gian, phải giống với interactActions Dữ liệu được xác định trong
    [COMPONENT_INTERACT_EVENT_KET]: ComponentInteractEventEnum.DATA,
    // giá trị mặc định
    inputValue: "0",
    // Hiển thị nội dung cấu hình cho người dùng
    dataset: ""
}

export default class Config extends PublicConfigClass implements CreateComponentType {
    public key = InputsInputConfig.key
    public attr = { ...chartInitConfig, w: 260, h: 32, zIndex: -1 }
    public chartConfig = cloneDeep(InputsInputConfig)
    public interactActions = interactActions
    public option = cloneDeep(option)
}