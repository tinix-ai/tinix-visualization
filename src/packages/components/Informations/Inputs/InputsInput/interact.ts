import { InteractEventOn, InteractActionsType } from '@/enums/eventEnum'

// Loại thành phần thời gian
export enum ComponentInteractEventEnum {
    DATA = 'data'
}

// Thông số liên kết
export enum ComponentInteractParamsEnum {
    DATA = 'data'
}

// Xác định các thành phần để kích hoạt sự kiện gọi lại
export const interactActions: InteractActionsType[] = [
    {
        interactType: InteractEventOn.CHANGE,
        interactName: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_280') : 'mili giây'),
        componentEmitEvents: {
            [ComponentInteractEventEnum.DATA]: [
                {
                    value: ComponentInteractParamsEnum.DATA,
                    label: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_147') : 'Tùy chọn')
                }
            ]
        }
    }
]
