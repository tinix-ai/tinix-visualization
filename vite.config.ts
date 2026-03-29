import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { OUTPUT_DIR, brotliSize, chunkSizeWarningLimit, terserOptions, rollupOptions } from './build/constant'
import viteCompression from 'vite-plugin-compression'
import { viteMockServe } from 'vite-plugin-mock'
import monacoEditorPlugin from 'vite-plugin-monaco-editor'

function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir)
}

export default defineConfig({
  base: '/',
  // Sửa đổi cổng
  server: {
    port: 3020,
    open: true,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:4000',
        changeOrigin: true,
        secure: false,
      },
      '/datasets': {
        target: 'http://127.0.0.1:4000/api',
        changeOrigin: true,
        secure: false,
      }
    }
  },
  // Chuyển hướng đường dẫn
  resolve: {
    alias: [
      {
        find: /\/#\//,
        replacement: pathResolve('types')
      },
      {
        find: '@',
        replacement: pathResolve('src')
      },
      {
        find: 'vue-i18n',
        replacement: 'vue-i18n/dist/vue-i18n.cjs.js' //gỡ rốii8ncảnh báo
      }
    ],
    dedupe: ['vue']
  },
  // tình hình chung css đăng ký
  css: {
    preprocessorOptions: {
      scss: {
        javascriptEnabled: true,
        additionalData: `@import "src/styles/common/style.scss";`
      }
    }
  },
  define: {
    // enable hydration mismatch details in production build
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'true'
  },
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // loại trừ iconify Lỗi biên dịch thành phần bóng biểu tượng
          isCustomElement: tag => tag.startsWith('iconify-icon')
        }
      }
    }),
    monacoEditorPlugin({
      languageWorkers: ['editorWorkerService', 'typescript', 'json', 'html']
    }),
    viteMockServe({
      mockPath: '/src/api/mock',
      // Phát triển công tắc đóng gói
      localEnabled: true,
      // Công tắc đóng gói sản xuất
      prodEnabled: true,
      // Sau khi mở, bạn có thể đọc ts Mô-đun tập tin. Xin lưu ý rằng việc giám sát sẽ không thể thực hiện được khi bật.js tài liệu
      supportTs: true,
      // Giám sát các thay đổi của tập tin
      watchFiles: true
    }),
    // nén
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: 'gzip',
      ext: '.gz'
    })
  ],
  build: {
    target: 'es2020',
    outDir: OUTPUT_DIR,
    // minify: 'terser', // Nếu cần thiết hãy sử dụngterserĐang bối rối, bạn có thể mở 2 dòng này
    // terserOptions: terserOptions,
    rollupOptions: rollupOptions,
    reportCompressedSize: brotliSize,
    chunkSizeWarningLimit: chunkSizeWarningLimit
  }
})
