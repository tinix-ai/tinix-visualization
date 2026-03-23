import { defineAsyncComponent, AsyncComponentLoader } from 'vue'
import { AsyncLoading, AsyncSkeletonLoading } from '@/components/GoLoading'

/**
 * * Đăng ký linh kiện linh hoạt
 */
export const componentInstall = <T> (key:string, node: T)  => {
  if(!window['$vue'].component(key) && node) {
    window['$vue'].component(key, node)
  }
}

/**
 * * Tải các thành phần không đồng bộ
 * @param loader
 * @returns
 */
export const loadAsyncComponent = (loader: AsyncComponentLoader<any>) =>
  defineAsyncComponent({
    loader,
    loadingComponent: AsyncLoading,
    delay: 20,
  })
  
export const loadSkeletonAsyncComponent = (loader: AsyncComponentLoader<any>) =>
  defineAsyncComponent({
    loader,
    loadingComponent: AsyncSkeletonLoading,
    delay: 20,
  })
