import { echartOptionProfixHandle, PublicConfigClass } from '@/packages/public'
import { DialConfig } from './index'
import { CreateComponentType } from '@/packages/index.d'
import cloneDeep from 'lodash/cloneDeep'

export const includes = []
const option = {
  backgroundColor: '#0E1327',
  dataset:70,
  series: [{
      type: "gauge",
      data: [{
          value: 70,
          itemStyle: { // Style Kim chỉ
              color: '#2AF4FF'
          }
      }],
      min: 0, //nhỏ nhấtThước Đo
      max: 100, //tối đaThước Đo
      splitNumber: 10, //Thước ĐoSố lượng
      center: ['50%', '55%'],
      radius: '80%',
      axisLine: {
        lineStyle: {
        color: [
            [0, 'rgba(0,212,230,0.5)'],
            [1, 'rgba(28,128,245,0)']
          ],
          width: 170
        }
      },
      axisLabel: { // phong cách văn bản
        color: '#eee', 
        fontSize: 14,
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        show: false,
      },
      detail: {
        show: false,
      },
      pointer: {
        length: '80%',
        width: 4
      },
      animationDuration: 2000,
    },
    {
      name: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_516') : 'quy mô bên ngoài'),
      type: 'gauge',
      center: ['50%', '55%'],
      radius: '90%',
      axisLine: {
        show: true,
        lineStyle: {
          width: 25,
          color: [ // Ngoài mặt sBộ sốMàu sắc
            [0, '#1369E380'],
            [1, '#1369E380']
          ],
        }
      }, 
      axisLabel: {
        show:false,
      },
      axisTick: {
        splitNumber: 5,
        lineStyle: { //Thước ĐoMàu sắc
          color: '#42E5FB',
          width: 2,
        },
      },
      splitLine: {
        length: 15,
        lineStyle: {
          color: '#42E5FB',
        }
      },
    },
  ]
};

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key: string = DialConfig.key
  public chartConfig = cloneDeep(DialConfig)
  // Biểu đồCác mục cấu hình
  public option = echartOptionProfixHandle(option, includes)
}
