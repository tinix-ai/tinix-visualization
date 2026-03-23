import type { App } from 'vue'
import { GoSkeleton } from '@/components/GoSkeleton'
import { GoLoading } from '@/components/GoLoading'
import { SketchRule } from 'vue3-sketch-ruler'

/**
 * Đăng ký toàn cầu các thành phần tùy chỉnh
 * @param app
 */
export function setupCustomComponents(app: App) {
  app.component('GoSkeleton', GoSkeleton)
  app.component('GoLoading', GoLoading)
  app.component('SketchRule', SketchRule)
}
