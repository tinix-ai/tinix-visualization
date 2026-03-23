import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { TableListConfig } from './index'
import cloneDeep from 'lodash/cloneDeep'
import dataJson from './data.json'

export const option = {
  // dữ liệu
  dataset: dataJson,
  // Số hàng của bảng
  rowNum: 5,
  // thời gian băng chuyền
  waitTime: 2,
  // đơn vị số
  unit: '',
  // phân loại tự động
  sort: true,
  color: '#1370fb',
  textColor: '#CDD2F8FF',
  borderColor: '#1370fb80',
  carousel: 'single',
  //Kích thước phông chữ số sê-ri
  indexFontSize: 12,
  //Kích thước phông chữ dữ liệu bên trái
  leftFontSize: 12,
  //Kích thước phông chữ dữ liệu phù hợp
  rightFontSize: 12,
  // định dạng
  valueFormatter(item: { value: any}) { return item.value}
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = TableListConfig.key
  public chartConfig = cloneDeep(TableListConfig)
  public option = cloneDeep(option)
}
