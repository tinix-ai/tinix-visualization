/**
 * *LấyTrêntập tin đã tải lênDữ liệu
 * @param { File } file đối tượng tập tin
 */
export const readFile = (file: File) => {
  return new Promise((resolve: Function) => {
    try {
      const reader = new FileReader()
      reader.onload = (evt: ProgressEvent<FileReader>) => {
        if (evt.target) {
          resolve(evt.target.result)
        }
      }
      reader.readAsText(file)
    } catch (error) {
      window['$message'].error(window['$t']('global.auto_24'))
    }
  })
}

/**
 * * vượt qua a NhãnTải xuốngDữ liệu
 * @param url 
 * @param filename 
 * @param fileSuffix 
 */
export const downloadByA = (url: string, filename = new Date().getTime(), fileSuffix?: string) => {
  const ele = document.createElement('a') // tạo nênTải xuốngliên kết
  ele.download = `${filename}.${fileSuffix}` //Cài Đặt ChỉnhTải xuốngcủaDanh xưng
  ele.style.display = 'none' // hộp ẩnTải xuốngliên kết
  // Nội dung ký tự được chuyển đổi thànhblobURL
  ele.href = url
  // Nhấp chuột liên kếtGiphòng
  document.body.appendChild(ele)
  ele.click()
  // sau đó loại bỏ
  document.body.removeChild(ele)
}

/**
 * * Tải xuốngDữ liệu
 * @param { string } content Dữ liệunội dung
 * @param { ?string } filename tài liệuDanh xưng(ký tự ngẫu nhiên mặc định)
 * @param { ?string } fileSuffix tài liệuDanh xưng(ký tự ngẫu nhiên mặc định)
 */
export const downloadTextFile = (
  content: string,
  filename = new Date().getTime(),
  fileSuffix?: string
) => {
  // Nội dung ký tự được chuyển đổi thànhblobURL
  const blob = new Blob([content])
  downloadByA(URL.createObjectURL(blob), filename, fileSuffix)
}
