import throttle from 'lodash/throttle'

// Nó được tách ra để phân tách và tái sử dụng tốt hơn.

// * Điều chỉnh tỷ lệ màn hình (để trống cả hai bên)
export const usePreviewFitScale = (
  width: number,
  height: number,
  scaleDom: HTMLElement | null,
  callback?: (scale: {
    width: number;
    height: number;
  }) => void
) => {
  // * kích thước vải (px）
  const baseWidth = width
  const baseHeight = height

  // * Giá trị thu phóng mặc định
  const scale = {
    width: 1,
    height: 1,
  }

  // * Tỷ lệ được duy trì
  const baseProportion = parseFloat((baseWidth / baseHeight).toFixed(5))
  const calcRate = () => {
    // Tỷ lệ khung hình màn hình hiện tại
    const currentRate = parseFloat(
      (window.innerWidth / window.innerHeight).toFixed(5)
    )
    if (scaleDom) {
      if (currentRate > baseProportion) {
        // có nghĩa là rộng hơn
        scale.width = parseFloat(((window.innerHeight * baseProportion) / baseWidth).toFixed(5))
        scale.height = parseFloat((window.innerHeight / baseHeight).toFixed(5))
        scaleDom.style.transform = `scale(${scale.width}, ${scale.height})`
      } else {
        // có nghĩa là cao hơn
        scale.height = parseFloat(((window.innerWidth / baseProportion) / baseHeight).toFixed(5))
        scale.width = parseFloat((window.innerWidth / baseWidth).toFixed(5))
        scaleDom.style.transform = `scale(${scale.width}, ${scale.height})`
      }
      if (callback) callback(scale)
    }
  }

  const resize = throttle(() => {
    calcRate()
  }, 200)

  // * Thay đổi kích thước cửa sổ và vẽ lại
  const windowResize = () => {
    window.addEventListener('resize', resize)
  }

  // * Giám sát gỡ cài đặt
  const unWindowResize = () => {
    window.removeEventListener('resize', resize)
  }

  return {
    calcRate,
    windowResize,
    unWindowResize,
  }
}

// *  XTrục đã đầy,Ythanh cuộn trục
export const usePreviewScrollYScale = (
  width: number,
  height: number,
  scaleDom: HTMLElement | null,
  callback?: (scale: {
    width: number;
    height: number;
  }) => void
) => {
  // * kích thước vải (px）
  const baseWidth = width
  const baseHeight = height

  // * Giá trị thu phóng mặc định
  const scale = {
    width: 1,
    height: 1,
  }

  // * Tỷ lệ được duy trì
  const baseProportion = parseFloat((baseWidth / baseHeight).toFixed(5))
  const calcRate = () => {
    if (scaleDom) {
      scale.height = parseFloat(((window.innerWidth / baseProportion) / baseHeight).toFixed(5))
      scale.width = parseFloat((window.innerWidth / baseWidth).toFixed(5))
      scaleDom.style.transform = `scale(${scale.width}, ${scale.height})`
      if (callback) callback(scale)
    }
  }

  const resize = throttle(() => {
    calcRate()
  }, 200)

  // * Thay đổi kích thước cửa sổ và vẽ lại
  const windowResize = () => {
    window.addEventListener('resize', resize)
  }

  // * Giám sát gỡ cài đặt
  const unWindowResize = () => {
    window.removeEventListener('resize', resize)
  }

  return {
    calcRate,
    windowResize,
    unWindowResize,
  }
}

// *  YTrục đã đầy,Xthanh cuộn trục
export const usePreviewScrollXScale = (
  width: number,
  height: number,
  scaleDom: HTMLElement | null,
  callback?: (scale: {
    width: number;
    height: number;
  }) => void
) => {
  // * kích thước vải (px）
  const baseWidth = width
  const baseHeight = height

  // * Giá trị thu phóng mặc định
  const scale = {
    height: 1,
    width: 1,
  }

  // * Tỷ lệ được duy trì
  const baseProportion = parseFloat((baseWidth / baseHeight).toFixed(5))
  const calcRate = () => {
    if (scaleDom) {
      scale.width = parseFloat(((window.innerHeight * baseProportion) / baseWidth).toFixed(5))
      scale.height = parseFloat((window.innerHeight / baseHeight).toFixed(5))
      scaleDom.style.transform = `scale(${scale.width}, ${scale.height})`
      if (callback) callback(scale)
    }
  }

  const resize = throttle(() => {
    calcRate()
  }, 200)

  // * Thay đổi kích thước cửa sổ và vẽ lại
  const windowResize = () => {
    window.addEventListener('resize', resize)
  }

  // * Giám sát gỡ cài đặt
  const unWindowResize = () => {
    window.removeEventListener('resize', resize)
  }

  return {
    calcRate,
    windowResize,
    unWindowResize,
  }
}

// * Nội dung bị biến dạng, bao phủ chiều rộng và chiều cao
export const usePreviewFullScale = (
  width: number,
  height: number,
  scaleDom: HTMLElement | null,
  callback?: (scale: {
    width: number;
    height: number;
  }) => void
) => {

  // * Giá trị thu phóng mặc định
  const scale = {
    width: 1,
    height: 1,
  }

  const calcRate = () => {
    if (scaleDom) {
      scale.width = parseFloat((window.innerWidth / width).toFixed(5))
      scale.height = parseFloat((window.innerHeight / height).toFixed(5))
      scaleDom.style.transform = `scale(${scale.width}, ${scale.height})`
      if (callback) callback(scale)
    }
  }

  const resize = throttle(() => {
    calcRate()
  }, 200)

  // * Thay đổi kích thước cửa sổ và vẽ lại
  const windowResize = () => {
    window.addEventListener('resize', resize)
  }

  // * Giám sát gỡ cài đặt
  const unWindowResize = () => {
    window.removeEventListener('resize', resize)
  }

  return {
    calcRate,
    windowResize,
    unWindowResize,
  }
}