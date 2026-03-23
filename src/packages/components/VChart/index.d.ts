import { IBarChartSpec, ILineChartSpec, IAreaChartSpec, IPieChartSpec, IFunnelChartSpec, IWordCloudChartSpec } from '@visactor/vchart'
import { ICartesianAxisCommonSpec } from '@visactor/vchart/esm/component/axis'


export enum ChatCategoryEnum {
  BAR = 'Bars',
  PIE = 'Pies',
  LINE = 'Lines',
  AREA = 'Areas',
  FUNNEL = 'Funnels',
  WORDCLOUD = 'WordClouds',
  SCATTER = 'Scatters',
}

export enum ChatCategoryEnumName {
  BAR = (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_128') : 'Hơn'),
  PIE = (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_192') : 'biểu đồ thanh'),
  LINE = (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_224') : 'Biểu đồ đường'),
  AREA = (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_357') : 'biểu đồ khu vực'),
  FUNNEL = (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_468') : 'biểu đồ phễu'),
  WORDCLOUD = (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_314') : 'sơ đồ đám mây từ'),
  SCATTER = (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_137') : 'biểu đồ kết hợp'),
}

export interface IBarOption extends Omit<IBarChartSpec, 'axes'> {
  category: ChatCategoryEnum.BAR
  type: 'bar'
  xAxis?: {
    name: string
  } & ICartesianAxisCommonSpec
  yAxis?: {
    name: string
  } & ICartesianAxisCommonSpec
}

export interface ILineOption extends Omit<ILineChartSpec, 'axes'> {
  category: ChatCategoryEnum.LINE
  type: 'line'
  xAxis?: {
    name: string
  } & ICartesianAxisCommonSpec
  yAxis?: {
    name: string
  } & ICartesianAxisCommonSpec
}

export interface IAreaOption extends Omit<IAreaChartSpec, 'axes'> {
  category: ChatCategoryEnum.AREA
  type: 'area'
  xAxis?: {
    name: string
  } & ICartesianAxisCommonSpec
  yAxis?: {
    name: string
  } & ICartesianAxisCommonSpec
}

export interface IPieOption extends IPieChartSpec {
  category?: ChatCategoryEnum.PIE
  type: 'pie'
}

export interface IFunnelOption extends IFunnelChartSpec {
  category: ChatCategoryEnum.FUNNEL
  type: 'funnel'
}

export interface IWordCloudOption extends IWordCloudChartSpec {
  category: ChatCategoryEnum.WORDCLOUD
  type: 'wordCloud'
}

export interface IScatterOption extends Omit<IAreaChartSpec, 'axes'> {
  category: ChatCategoryEnum.SCATTER
  type: 'scatter'
  xAxis?: {
    name: string
  } & ICartesianAxisCommonSpec
  yAxis?: {
    name: string
  } & ICartesianAxisCommonSpec
}

// todo
// export type IOption = IBarOption | ILineOption ....
export type IOption = IBarOption | IPieOption | ILineOption | IAreaOption | IFunnelOption | IScatterOption
