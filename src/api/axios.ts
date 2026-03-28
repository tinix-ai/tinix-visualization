import axios, { AxiosResponse, InternalAxiosRequestConfig, AxiosError } from 'axios'
import { ResultEnum } from "@/enums/httpEnum"
import { ErrorPageNameMap } from "@/enums/pageEnum"
import { redirectErrorPage } from '@/utils'

const axiosInstance = axios.create({
  baseURL: import.meta.env.DEV 
    ? (import.meta.env.VITE_DEV_PATH || '/api') 
    : (import.meta.env.VITE_PRO_PATH || '/api'),
  timeout: ResultEnum.TIMEOUT,
})

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

// đánh chặn phản ứng
axiosInstance.interceptors.response.use(
  (res: AxiosResponse) => {
    // Nếu không có data, vẫn trả về res để tránh lỗi null.data ở tầng API/Hooks
    if (res.data === undefined || res.data === null) return Promise.resolve(res)
    
    const { code } = res.data as { code: number }
    // Nếu không có mã phản hồi (Dữ liệu thô từ Dataset/Settings), trả về toàn bộ res
    if (code === undefined || code === null) return Promise.resolve(res)
    
    // Nếu có mã phản hồi theo chuẩn { code, data, msg }
    if (code === ResultEnum.DATA_SUCCESS) return Promise.resolve(res.data)
    
    // Chuyển hướng nếu gặp lỗi
    if (ErrorPageNameMap.get(code)) redirectErrorPage(code)
    return Promise.resolve(res.data)
  },
  (err: AxiosResponse) => {
    return Promise.reject(err)
  }
)

export default axiosInstance
