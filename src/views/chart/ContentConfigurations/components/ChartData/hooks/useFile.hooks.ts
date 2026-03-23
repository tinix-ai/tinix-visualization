import { ref, toRef, nextTick } from 'vue'
import { UploadCustomRequestOptions } from 'naive-ui'
import { FileTypeEnum } from '@/enums/fileTypeEnum'
import { readFile, downloadTextFile, JSONStringify, JSONParse } from '@/utils'

export const useFile = (targetData: any) => {
  const uploadFileListRef = ref()

  //@ts-ignore
  const beforeUpload = ({ file }) => {
    uploadFileListRef.value = []
    const type = file.file.type
    if (type !== FileTypeEnum.JSON && type !== FileTypeEnum.TXT) {
      window['$message'].warning(window['$t']('views_components.auto_202'))
      return false
    }
    return true
  }

  // Hoạt động tải lên tùy chỉnh
  const customRequest = (options: UploadCustomRequestOptions) => {
    const { file } = options
    nextTick(() => {
      if (file.file) {
        readFile(file.file).then((fileData: any) => {
          targetData.value.option.dataset = JSONParse(fileData)
        })
      } else {
        window['$message'].error(window['$t']('views_components.auto_203'))
      }
    })
  }

  // Tải tập tin xuống
  const download = () => {
    try {
      window['$message'].success(window['$t']('views_components.auto_201'))
      downloadTextFile(JSONStringify(targetData.value.option.dataset), undefined, 'json')
    } catch (error) {
      window['$message'].error(window['$t']('views_components.auto_204'))
    }
  }
  return {
    uploadFileListRef,
    beforeUpload,
    customRequest,
    download
  }
}
