import { watch } from 'vue'
import { VChart, type ITheme } from '@visactor/vchart'

import light from '@visactor/vchart-theme/public/light.json'
import dark from '@visactor/vchart-theme/public/dark.json'
import vScreenVolcanoBlue from '@visactor/vchart-theme/public/vScreenVolcanoBlue.json'
import vScreenClean from '@visactor/vchart-theme/public/vScreenClean.json'
import vScreenOutskirts from '@visactor/vchart-theme/public/vScreenOutskirts.json'
import vScreenBlueOrange from '@visactor/vchart-theme/public/vScreenBlueOrange.json'
import vScreenFinanceYellow from '@visactor/vchart-theme/public/vScreenFinanceYellow.json'
import vScreenWenLvCyan from '@visactor/vchart-theme/public/vScreenWenLvCyan.json'
import vScreenElectricGreen from '@visactor/vchart-theme/public/vScreenElectricGreen.json'
import vScreenECommercePurple from '@visactor/vchart-theme/public/vScreenECommercePurple.json'
import vScreenRedBlue from '@visactor/vchart-theme/public/vScreenRedBlue.json'
import vScreenPartyRed from '@visactor/vchart-theme/public/vScreenPartyRed.json'
// Bảng màu ngành công nghiệp
import veODesignLightFinance from '@visactor/vchart-theme/public/veODesignLightFinance.json'
import veODesignDarkFinance from '@visactor/vchart-theme/public/veODesignDarkFinance.json'

import veODesignLightGovernment from '@visactor/vchart-theme/public/veODesignLightGovernment.json'
import veODesignDarkGovernment from '@visactor/vchart-theme/public/veODesignDarkGovernment.json'

import veODesignLightConsumer from '@visactor/vchart-theme/public/veODesignLightConsumer.json'
import veODesignDarkConsumer from '@visactor/vchart-theme/public/veODesignDarkConsumer.json'

import veODesignLightAutomobile from '@visactor/vchart-theme/public/veODesignLightAutomobile.json'
import veODesignDarkAutomobile from '@visactor/vchart-theme/public/veODesignDarkAutomobile.json'

import veODesignLightCulturalTourism from '@visactor/vchart-theme/public/veODesignLightCulturalTourism.json'
import veODesignDarkCulturalTourism from '@visactor/vchart-theme/public/veODesignDarkCulturalTourism.json'

import veODesignLightMedical from '@visactor/vchart-theme/public/veODesignLightMedical.json'
import veODesignDarkMedical from '@visactor/vchart-theme/public/veODesignDarkMedical.json'

import veODesignLightNewEnergy from '@visactor/vchart-theme/public/veODesignLightNewEnergy.json'
import veODesignDarkNewEnergy from '@visactor/vchart-theme/public/veODesignDarkNewEnergy.json'

const themeMap = {
  // sáng
  light: light,
  // tối tăm
  dark: dark,
  // màu xanh núi lửa
  vScreenVolcanoBlue: vScreenVolcanoBlue,
  // Xây dựng Đảng màu đỏ
  vScreenPartyRed: vScreenPartyRed,
  // bút chì màu tươi
  vScreenClean: vScreenClean,
  // vùng ngoại ô
  vScreenOutskirts: vScreenOutskirts,
  // xe màu xanh cam
  vScreenBlueOrange: vScreenBlueOrange,
  // Màu vàng tài chính
  vScreenFinanceYellow: vScreenFinanceYellow,
  // Ôn Lân Thanh
  vScreenWenLvCyan: vScreenWenLvCyan,
  // Màu xanh lá cây
  vScreenElectricGreen: vScreenElectricGreen,
  // Thương mại điện tử màu tím
  vScreenECommercePurple: vScreenECommercePurple,
  // đỏ xanh
  vScreenRedBlue: vScreenRedBlue,
  // Bảng màu ngành tài chính
  veODesignLightFinance: veODesignLightFinance,
  veODesignDarkFinance: veODesignDarkFinance,
  // Bảng màu ngành công nghiệp chính phủ
  veODesignLightGovernment: veODesignLightGovernment,
  veODesignDarkGovernment: veODesignDarkGovernment,
  // Bảng màu ngành công nghiệp tiêu dùng
  veODesignLightConsumer: veODesignLightConsumer,
  veODesignDarkConsumer: veODesignDarkConsumer,
  // Bảng màu ngành công nghiệp ô tô
  veODesignLightAutomobile: veODesignLightAutomobile,
  veODesignDarkAutomobile: veODesignDarkAutomobile,
  // Bảng màu ngành du lịch văn hóa
  veODesignLightCulturalTourism: veODesignLightCulturalTourism,
  veODesignDarkCulturalTourism: veODesignDarkCulturalTourism,
  // Bảng màu ngành y tế
  veODesignLightMedical: veODesignLightMedical,
  veODesignDarkMedical: veODesignDarkMedical,
  // Bảng màu ngành năng lượng mới
  veODesignLightNewEnergy: veODesignLightNewEnergy,
  veODesignDarkNewEnergy: veODesignDarkNewEnergy
}

export const useVCharts = () => {
  const getThemeMap = () => {
    return themeMap
  }

  // Đăng ký một chủ đề (hỗ trợ các chủ đề tùy chỉnh)
  const registerTheme = (themeName: keyof typeof themeMap, theme: any) => {
    VChart.ThemeManager.registerTheme(themeName, (themeMap[themeName] as any) || theme)
  }

  // Đặt chủ đề hiện tại
  const setCurrentTheme = (themeName = 'vScreenVolcanoBlue') => {
    VChart.ThemeManager.setCurrentTheme(themeName)
  }

  // Xác định xem chủ đề có tồn tại không
  const themeExist = (name: string): boolean => {
    return VChart.ThemeManager.themeExist(name)
  }

  // Nhận chủ đề
  const getTheme = (name: string): ITheme => {
    return VChart.ThemeManager.getTheme(name)
  }

  // Lấy chủ đề hiện tại
  const getCurrentTheme = (): ITheme => {
    return VChart.ThemeManager.getCurrentTheme()
  }

  // Đặt chủ đề
  const setTheme = (name: keyof typeof themeMap): boolean => {
    if (themeExist(name)) {
      setCurrentTheme(name)
      return true
    } else {
      // Đăng ký đầu tiên
      const theme = themeMap[name]
      if (theme) {
        registerTheme(name, theme)
        setCurrentTheme(name)
        return true
      } else {
        // Đăng ký chủ đề mặc định
        registerTheme('vScreenVolcanoBlue', vScreenVolcanoBlue)
      }
    }
    return false
  }

  return {
    getThemeMap,
    registerTheme,
    setCurrentTheme,
    themeExist,
    getTheme,
    setTheme,
    getCurrentTheme
  }
}

// Khởi tạo chủ đề
export const useInitVChartsTheme = (chartEditStore: any) => {
  const vCharts = useVCharts()

  const initVChartsThemeIns = watch(
    () => chartEditStore.getEditCanvasConfig.vChartThemeName,
    (newTheme: string) => {
      vCharts.setTheme(newTheme as any)
    },
    {
      immediate: true
    }
  )

  return {
    initVChartsThemeIns
  }
}
