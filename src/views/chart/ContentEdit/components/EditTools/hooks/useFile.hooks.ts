import { ref, nextTick } from 'vue'
import { UploadCustomRequestOptions } from 'naive-ui'
import { FileTypeEnum } from '@/enums/fileTypeEnum'
import { readFile, goDialog, JSONParse } from '@/utils'
import { useSync } from '@/views/chart/hooks/useSync.hook'

export const useFile = () => {
  const importUploadFileListRef = ref()
  const { updateComponent } = useSync()

  // tải lên-tiền tố
  //@ts-ignore
  const importBeforeUpload = ({ file }) => {
    importUploadFileListRef.value = []
    const type = file.file.type
    if (type !== FileTypeEnum.JSON && type !== FileTypeEnum.TXT) {
      window['$message'].warning(window['$t']('views_components.auto_202'))
      return false
    }
    return true
  }

  // tải lên-nhập khẩu
  const importCustomRequest = (options: UploadCustomRequestOptions) => {
    const { file } = options
    nextTick(() => {
      if (file.file) {
        readFile(file.file).then((fileData: any) => {
          goDialog({
            message: window['$t']('views_components.auto_288'),
            positiveText: window['$t']('views_components.auto_284'),
            negativeText: window['$t']('views_components.auto_287'),
            negativeButtonProps: { type: 'info', ghost: false },
            // Mới
            onPositiveCallback: async () => {
              try {
                fileData = JSONParse(fileData)
                await updateComponent(fileData, false, true)
                window['$message'].success(window['$t']('views_components.auto_289'))
              } catch (error) {
                console.log(error)
                window['$message'].error(window['$t']('views_components.auto_285'))
              }
            },
            // che phủ
            onNegativeCallback: async () => {
              try {
                fileData = JSONParse(fileData)
                await updateComponent(fileData, true, true)
                window['$message'].success(window['$t']('views_components.auto_289'))
              } catch (error) {
                console.log(error)
                window['$message'].error(window['$t']('views_components.auto_285'))
              }
            }
          })
        })
      } else {
        window['$message'].error(window['$t']('views_components.auto_286'))
      }
    })
  }

  return {
    importUploadFileListRef,
    importBeforeUpload,
    importCustomRequest
  }
}
