import { App } from 'vue';
import VueLazyLoad from 'vue3-lazyload'
import { requireErrorImg } from '@/utils'

// import { x } from '@/directives';

/**
 * Đăng ký chỉ thị tùy chỉnh toàn cầu
 * @param app
 */
export function setupDirectives(app: App) {
  // Tải hình ảnh lười biếng
  app.use(VueLazyLoad, {
    error: requireErrorImg(),
  })
  // app.directive('x', x);
}
