import { createApp } from 'vue'
import App from './App.vue'
import router, { setupRouter } from '@/router'
import i18n from '@/i18n/index'
import { setupStore } from '@/store'
import { setupNaive, setupDirectives, setupCustomComponents, initFunction } from '@/plugins'
import { GoAppProvider } from '@/components/GoAppProvider/index'
import { setHtmlTheme } from '@/utils'
import { addCollection } from 'iconify-icon'
import uimIcons from '@iconify/json/json/uim.json'
import lineMdIcons from '@iconify/json/json/line-md.json'
import wiIcons from '@iconify/json/json/wi.json'

// Giới thiệu phong cách toàn cầu
import '@/styles/pages/index.scss'
// Giới thiệu hoạt hình
import 'animate.css/animate.min.css'
// Giới thiệu thước kẻ
import 'vue3-sketch-ruler/lib/style.css'
// Biểu tượng đăng ký
addCollection(uimIcons)
addCollection(lineMdIcons)
addCollection(wiIcons)

async function appInit() {
  const goAppProvider = createApp(GoAppProvider)
  goAppProvider.config.globalProperties.window = window

  const app = createApp(App)
  app.config.globalProperties.window = window

  // Đăng ký được sử dụng phổ biến trên toàn cầu naive-ui thành phần
  setupNaive(app)

  // Đăng ký chỉ thị tùy chỉnh toàn cầu
  setupDirectives(app)

  // Đăng ký các thành phần tùy chỉnh toàn cầu
  setupCustomComponents(app)

  // Quản lý trạng thái gắn kết
  setupStore(app)

  // Giải quyết bảo vệ tuyến đường,AxiosCó thể được sử dụng trongDialog，Message và các thành phần toàn cầu khác
  goAppProvider.mount('#appProvider', true)

  // Tuyến đường gắn kết
  setupRouter(app)

  // Gắn kết khi tuyến đường đã sẵn sàngAPPVí dụ
  await router.isReady()

  // Store Xử lý màu chủ đề khi sẵn sàng
  setHtmlTheme()

  // Đăng ký ngôn ngữ
  app.use(i18n)

  // gắn kết với window
  window['$vue'] = app

  // Gắn vào trang
  app.mount('#app', true)
}

appInit().then(() => {
  initFunction()
})

