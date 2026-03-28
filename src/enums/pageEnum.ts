import { ResultEnum } from '@/enums/httpEnum'

export enum ChartEnum {
  // Tạo biểu đồ
  CHART_HOME = '/chart/home/:id(.*)*',
  CHART_HOME_NAME = 'ChartHome',
}

export enum PreviewEnum {
  //  Xem trước biểu đồ
  CHART_PREVIEW = '/chart/preview/:id(.*)*',
  CHART_PREVIEW_NAME = 'ChartPreview',
}

export enum EditEnum {
  //  biểu đồJSONbiên tập
  CHART_EDIT = '/chart/edit/:id(.*)*',
  CHART_EDIT_NAME = 'ChartEdit',
}

export enum PageEnum {
  // Đăng nhập
  BASE_LOGIN = '/login',
  BASE_LOGIN_NAME = 'Login',

  //Chuyển hướng
  REDIRECT = '/redirect',
  REDIRECT_NAME = 'Redirect',
  RELOAD = '/reload',
  RELOAD_NAME = 'Reload',


  // trang đầu
  BASE_HOME = '/project',
  BASE_HOME_NAME = 'Project',

  // dự án của tôi
  BASE_HOME_ITEMS = '/project/items',
  BASE_HOME_ITEMS_NAME = 'Project-Items',

  // mẫu của tôi
  BASE_HOME_TEMPLATE = '/project/my-template',
  BASE_HOME_TEMPLATE_NAME = 'Project-My-Template',

  // thị trường mẫu
  BASE_HOME_TEMPLATE_MARKET = '/project/template-market',
  BASE_HOME_TEMPLATE_MARKET_NAME = 'Project-Template-Market',

  // quản lý dữ liệu (Dataset Management)
  BASE_HOME_DATA = '/project/data-management',
  BASE_HOME_DATA_NAME = 'Project-Data-Management',

  // sai lầm
  ERROR_PAGE_NAME_403 = 'ErrorPage403',
  ERROR_PAGE_NAME_404 = 'ErrorPage404',
  ERROR_PAGE_NAME_500 = 'ErrorPage500'
}

export const ErrorPageNameMap = new Map([
  [ResultEnum.NOT_FOUND, PageEnum.ERROR_PAGE_NAME_404],
  [ResultEnum.SERVER_FORBIDDEN, PageEnum.ERROR_PAGE_NAME_403],
  [ResultEnum.SERVER_ERROR, PageEnum.ERROR_PAGE_NAME_500]
])
