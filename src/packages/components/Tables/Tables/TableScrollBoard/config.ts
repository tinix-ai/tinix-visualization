import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { TableScrollBoardConfig } from './index'
import cloneDeep from 'lodash/cloneDeep'
import dataJson from './data.json'

export const option = {
  header: [(typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_226') : 'Cột 2'), (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_162') : 'Cột 3'), (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_78') : 'Cột 1')],
  dataset: dataJson,
  index: true,
  columnWidth: [30, 100, 100],
  align: ['center', 'right', 'right', 'right'],
  rowNum: 5,
  waitTime: 2,
  headerHeight: 35,
  carousel: 'single',
  headerBGC: '#00BAFF',
  oddRowBGC: '#003B51',
  evenRowBGC: '#0A2732'
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = TableScrollBoardConfig.key
  public chartConfig = cloneDeep(TableScrollBoardConfig)
  public option = cloneDeep(option)
}
