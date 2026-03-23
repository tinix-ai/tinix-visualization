import { ref } from 'vue'
import { goDialog } from '@/utils'
import { DialogEnum } from '@/enums/pluginEnum'
import { ChartList } from '../../..'
// Khởi tạo dữ liệu
export const useDataListInit = () => {
  const list = ref<ChartList>([
    {
      id: 1,
      title: 'Item 1',
      release: true,
      label: 'Case Mẫu'
    },
    {
      id: 2,
      title: 'Item 2',
      release: false,
      label: 'Case Mẫu'
    },
    {
      id: 3,
      title: 'Item 3',
      release: false,
      label: 'Case Mẫu'
    },
    {
      id: 4,
      title: 'Item 4',
      release: false,
      label: 'Case Mẫu'
    },
    {
      id: 5,
      title: 'Item 5',
      release: false,
      label: 'Case Mẫu'
    }
  ])

  // xóa bỏ
  const deleteHandle = (cardData: object, index: number) => {
    goDialog({
      type: DialogEnum.DELETE,
      promise: true,
      onPositiveCallback: () =>
        new Promise(res => setTimeout(() => res(1), 1000)),
      promiseResCallback: (e: any) => {
        window['$message'].success(window['$t']('phase7.auto_149'))
        list.value.splice(index, 1)
      }
    })
  }

  return {
    list,
    deleteHandle
  }
}
