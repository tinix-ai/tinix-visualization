import { ref, onBeforeUnmount, nextTick } from 'vue'
import { useDesignStore } from '@/store/modules/designStore/designStore'
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api.js'

export const useMonacoEditor = (language = 'javascript') => {
const designStore = useDesignStore()

  let monacoEditor: monaco.editor.IStandaloneCodeEditor | null = null
  let initReadOnly = false
  const el = ref<HTMLElement | null>(null)

  // định dạng
  const onFormatDoc = async () => {
    await monacoEditor?.getAction('monacoEditor.action.formatDocument')?.run()
  }

  // gia hạn
  const updateVal = (val: string) => {
    nextTick(async () => {
      monacoEditor?.setValue(val)
      initReadOnly && monacoEditor?.updateOptions({ readOnly: false })
      await onFormatDoc()
      initReadOnly && monacoEditor?.updateOptions({ readOnly: true })
    })
  }

  // Tạo phiên bản
  const createEditor = (editorOption: monaco.editor.IStandaloneEditorConstructionOptions = {}) => {
    if (!el.value) return
    const javascriptModel = monaco.editor.createModel('', language)
    initReadOnly = !!editorOption.readOnly
    // tạo nên
    monacoEditor = monaco.editor.create(el.value, {
      model: javascriptModel,
      // Có bật hình ảnh xem trước hay không
      minimap: { enabled: false },
      // góc tròn
      roundedSelection: true,
      // chủ đề
      theme: designStore.getDarkTheme ? 'vs-dark' : 'vs',
      // khóa chính
      multiCursorModifier: 'ctrlCmd',
      // thanh cuộn
      scrollbar: {
        verticalScrollbarSize: 8,
        horizontalScrollbarSize: 8
      },
      // Số dòng
      lineNumbers: 'off',
      // tabkích cỡ
      tabSize: 2,
      //cỡ chữ
      fontSize: 16,
      // Kiểm soát xem trình soạn thảo có tự động điều chỉnh mức thụt lề khi người dùng nhập, dán, di chuyển hoặc thụt dòng hay không
      autoIndent: 'advanced',
      // tự động thanh toán
      automaticLayout: true,
      ...editorOption
    })

    return monacoEditor
  }

  // gỡ cài đặt
  onBeforeUnmount(() => {
    if (monacoEditor) monacoEditor.dispose()
  })

  return {
    el,
    updateVal,
    getEditor: () => monacoEditor,
    createEditor,
    onFormatDoc
  }
}
