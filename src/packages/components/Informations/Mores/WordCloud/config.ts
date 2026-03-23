import { echartOptionProfixHandle, PublicConfigClass } from '@/packages/public'
import { WordCloudConfig } from './index'
import { CreateComponentType } from '@/packages/index.d'
import cloneDeep from 'lodash/cloneDeep'
import dataJson from './data.json'

export const includes = []

export const ShapeEnumList = [
  { label: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_251') : 'hình vuông tròn'), value: 'circle' },
  { label: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_472') : 'tam giác vuông'), value: 'cardioid' },
  { label: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_374') : 'chỉ sang trái'), value: 'diamond' },
  { label: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_221') : 'hình trái tim'), value: 'triangle-forward' },
  { label: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_189') : 'tam giác'), value: 'triangle' },
  { label: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_26') : 'ngũ giác'), value: 'pentagon' },
  { label: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_336') : 'hình chữ nhật phẳng'), value: 'star' }
]

export const option = {
  dataset: [...dataJson],
  tooltip: {},
  series: [
    {
      type: 'wordCloud',

      // Hình dạng được vẽ bởi "đám mây" có thể được biểu thị dưới dạng hàm gọi lại hoặc từ khóa cố định.
      // Các giá trị có sẵn là:circle|cardioid|diamond|triangle-forward|triangle|pentagon|star
      shape: 'circle',

      // Vùng màu trắng sẽ bị loại khỏi việc vẽ văn bản trong hình ảnh bóng.
      // Các tùy chọn hình dạng sẽ tiếp tục được áp dụng khi hình dạng của đám mây phát triển.
      // maskImage: maskImage,

      // Folllowing left/top/width/height/right/bottom are used for positioning the word cloud
      // Default to be put in the center and has 75% x 80% size.
      left: 'center',
      top: 'center',
      width: '70%',
      height: '80%',
      right: null,
      bottom: null,

      // Phạm vi kích thước văn bản, mặc định [12,60]
      sizeRange: [12, 60],

      // Các bước cho phạm vi và mức độ xoay văn bản. Văn bản sẽ trải qua bước xoay45hiện hữu[-90，90]quay ngẫu nhiên trung bình
      rotationRange: [0, 0],
      rotationStep: 0,

      // size of the grid in pixels for marking the availability of the canvas
      // Kích thước lưới càng lớn thì khoảng cách giữa các từ càng lớn.
      gridSize: 8,

      // đặt thànhtrue, để cho phép các từ được vẽ một phần bên ngoài khung vẽ. Cho phép vẽ lớn hơn kích thước canvas
      drawOutOfBound: false,

      // If perform layout animation.
      // NOTE disable it will lead to UI blocking when there is lots of words.
      layoutAnimation: true,

      // Global text style
      textStyle: {
        fontFamily: 'sans-serif',
        fontWeight: 'bold'
        // Màu sắc có thể là hàm gọi lại hoặc chuỗi màu
        // color: function () {
        //   // màu sắc ngẫu nhiên
        //   return (
        //     'rgb(' +
        //     [Math.round(Math.random() * 160), Math.round(Math.random() * 160), Math.round(Math.random() * 160)].join(
        //       ','
        //     ) +
        //     ')'
        //   )
        // }
      },
      emphasis: {
        focus: 'self',

        textStyle: {
          shadowBlur: 10,
          shadowColor: '#333'
        }
      },
      data: [...dataJson]
    }
  ]
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = WordCloudConfig.key
  public chartConfig = cloneDeep(WordCloudConfig)
  // Biểu đồCác mục cấu hình
  public option = echartOptionProfixHandle(option, includes)
}
