/**
 * Hằng số cấu hình đóng gói (Build configuration constants)
 */

// Thư mục đầu ra (Output directory)
export const OUTPUT_DIR = 'dist'

// Có bật nén brotli không (Whether to enable brotli compression)
export const brotliSize = false

// Giới hạn cảnh báo kích thước chunk (Chunk size warning limit in KB)
export const chunkSizeWarningLimit = 2000

// Cấu hình Terser (Terser obfuscation options)
export const terserOptions = {
  compress: {
    keep_infinity: true,
    drop_console: true,
  },
}

// Cấu hình Rollup (Rollup output options)
export const rollupOptions = {
  output: {
    manualChunks: {
      vue: ['vue', 'vue-router', 'pinia', 'vue-i18n'],
      naive: ['naive-ui'],
      echarts: ['echarts'],
    },
  },
}
