import cloneDeep from 'lodash/cloneDeep'
import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { chartInitConfig } from '@/settings/designSetting'
import { COMPONENT_INTERACT_EVENT_KET } from '@/enums/eventEnum'
import { interactActions, ComponentInteractEventEnum } from './interact'
import {InputsPaginationConfig} from "./index";

export const option = {
    // Kiểu hiển thị thành phần thời gian, phải giống với interactActions Dữ liệu được xác định trong
    [COMPONENT_INTERACT_EVENT_KET]: ComponentInteractEventEnum.DATA,
    // giá trị mặc định
    pageValue:1,
    sizeValue:[2,4,8,10,20],
    pageSize:4,
    // Hiển thị nội dung cấu hình cho người dùng
    dataset: 10
}

export default class Config extends PublicConfigClass implements CreateComponentType {
    public key = InputsPaginationConfig.key
    public attr = { ...chartInitConfig, w: 395, h: 32, zIndex: -1 }
    public chartConfig = cloneDeep(InputsPaginationConfig)
    public interactActions = interactActions
    public option = cloneDeep(option)
}