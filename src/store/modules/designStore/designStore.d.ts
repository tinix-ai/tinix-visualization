import { ThemeEnum } from '@/enums/styleEnum'

export type AppThemeColorType = {
  CMYK: number[]
  RGB: number[]
  hex: string
  name: string
  pinyin: string
}

export interface DesignStateType {
  // Đây có phải là một chủ đề tối?
  darkTheme: boolean
  // Tên chủ đề
  themeName: ThemeEnum
  //Số màu
  appTheme: string
  appThemeDetail: AppThemeColorType | null
}
