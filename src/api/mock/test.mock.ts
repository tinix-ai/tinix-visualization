import heatmapJson from './heatMapData.json'
import scatterJson from './scatter.json'
import mapJson from './map.json'
import tTreemapJson from './treemap.json'
import sankeyJson from './sankey.json'
import graphDataJson from './graph.json'

export default {
  // biểu đồ đơn
  fetchMockSingleData: {
    code: 0,
    status: 200,
    msg: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_174') : 'Yêu cầu thành công'),
    data: {
    dimensions: ['product', 'dataOne'],
      'source|20': [
        {
          product: '@name',
          'dataOne|0-900': 3
        }
      ]
    }
  },
  // Biểu đồ viên nang
  fetchCapsule: {
    code: 0,
    status: 200,
    msg: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_174') : 'Yêu cầu thành công'),
    data: {
      dimensions: ['name', 'value'],
      "source|2-5": [
        { 'name|+1': [(typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_130') : 'Hạ Môn'),(typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_345') : 'Phúc Châu'),(typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_522') : 'Bắc Kinh'),(typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_513') : 'Thượng Hải'),(typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_339') : 'Tân Cương'),(typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_437') : 'Trịnh Châu'),(typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_344') : 'Hồ Nam'),(typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_518') : 'Nội Mông')], 'value|0-40': 20 },
      ]
    }
  },
  // biểu đồ
  fetchMockData: {
    code: 0,
    status: 200,
    msg: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_174') : 'Yêu cầu thành công'),
    data: {
      dimensions: ['product', 'dataOne', 'dataTwo', 'dataThree'],
      'source|20': [
        {
          product: '@name',
          'dataOne|100-900': 3,
          'dataTwo|100-900': 3,
          'dataThree|100-900': 3
        }
      ]
    }
  },
  // Danh sách xếp hạng
  fetchRankList: {
    code: 0,
    status: 200,
    msg: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_174') : 'Yêu cầu thành công'),
    'data|50': [{ name: '@name', 'value|100-900': 5 }]
  },
  // bảng băng chuyền
  fetchScrollBoard: {
    code: 0,
    status: 200,
    msg: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_174') : 'Yêu cầu thành công'),
    data: [
      [(typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_423') : 'hàng 1 cột 1'), (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_362') : 'hàng 1 cột 2'), '1'],
      [(typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_168') : 'Hàng 2 Cột 1'), (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_31') : 'Hàng 2 Cột 2'), '2'],
      [(typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_113') : 'hàng 3 cột 1'), (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_101') : 'hàng 3 cột 2'), '3'],
      [(typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_493') : 'hàng 4 cột 1'), (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_90') : 'hàng 4 cột 2'), '4'],
      [(typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_176') : 'hàng 5 cột 1'), (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_414') : 'hàng 5 cột 2'), '5'],
      [(typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_360') : 'hàng 6 cột 1'), (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_65') : 'hàng 6 cột 2'), '6'],
      [(typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_8') : 'hàng 7 cột 1'), (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_149') : 'hàng 7 cột 2'), (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_292') : 'hàng 7 cột 3')],
      [(typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_313') : 'hàng 8 cột 1'), (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_442') : 'hàng 8 cột 2'), (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_498') : 'hàng 8 cột 3')],
      [(typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_356') : 'hàng 9 cột 1'), (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_483') : 'hàng 9 cột 2'), (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_213') : 'hàng 9 cột 3')],
      [(typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_265') : 'Hàng 10 Cột 1'), (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_205') : 'Hàng 10 Cột 2'), (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_152') : 'Hàng 10 Cột 3')]
    ]
  },
  // lấy số-dấu phẩy động
  fetchNumberFloat: {
    code: 0,
    status: 200,
    msg: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_174') : 'Yêu cầu thành công'),
    data: '@float(0, 0.99, 1, 4)'
  },
  // lấy số-số nguyên
  fetchNumberInt: {
    code: 0,
    status: 200,
    msg: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_174') : 'Yêu cầu thành công'),
    data: '@integer(0, 100)'
  },
  // Từ
  fetchText: {
    code: 0,
    status: 200,
    msg: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_174') : 'Yêu cầu thành công'),
    data: '@paragraph(1, 10)'
  },
  // hình ảnh
  fetchImage: (num: number) => ({
    code: 0,
    status: 200,
    msg: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_174') : 'Yêu cầu thành công'),
    data: `https://robohash.org/${num}`
  }),
  // ra đa
  fetchRadar: {
    code: 0,
    status: 200,
    msg: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_174') : 'Yêu cầu thành công'),
    data: {
      radarIndicator: [
        { name: '@name', max: 10000 },
        { name: '@name', max: 10000 },
        { name: '@name', max: 10000 },
        { name: '@name', max: 10000 },
        { name: '@name', max: 10000 },
        { name: '@name', max: 10000 }
      ],
      seriesData: [
        {
          value: [
            '@integer(0, 10000)',
            '@integer(0, 10000)',
            '@integer(0, 10000)',
            '@integer(0, 10000)',
            '@integer(0, 10000)',
            '@integer(0, 10000)'
          ],
          name: 'data1'
        },
        {
          value: [
            '@integer(0, 10000)',
            '@integer(0, 10000)',
            '@integer(0, 10000)',
            '@integer(0, 10000)',
            '@integer(0, 10000)',
            '@integer(0, 10000)'
          ],
          name: 'data2'
        }
      ]
    }
  },
  // bản đồ nhiệt
  fetchHeatmap: {
    code: 0,
    status: 200,
    msg: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_174') : 'Yêu cầu thành công'),
    data: heatmapJson
  },
  // Biểu đồ phân tán
  fetchScatterBasic: {
    code: 0,
    status: 200,
    msg: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_174') : 'Yêu cầu thành công'),
    data: scatterJson
  },
  // bản đồ trung quốc
  fetchMap: {
    code: 0,
    status: 200,
    msg: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_174') : 'Yêu cầu thành công'),
    data: mapJson
  },
  // đám mây từ
  fetchWordCloud: {
    code: 0,
    status: 200,
    msg: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_174') : 'Yêu cầu thành công'),
    data: [
      {
        name: '@name',
        value: 8000,
        textStyle: {
          color: '#78fbb2'
        },
        emphasis: {
          textStyle: {
            color: 'red'
          }
        }
      },
      { name: '@name', value: '@integer(10, 8000)' },
      { name: '@name', value: '@integer(10, 8000)' },
      { name: '@name', value: '@integer(10, 8000)' },
      { name: '@name', value: '@integer(10, 8000)' },
      { name: '@name', value: '@integer(10, 8000)' },
      { name: '@name', value: '@integer(10, 8000)' },
      { name: '@name', value: '@integer(10, 8000)' },
      { name: '@name', value: '@integer(10, 8000)' },
      { name: '@name', value: '@integer(10, 8000)' },
      { name: '@name', value: '@integer(10, 8000)' },
      { name: '@name', value: '@integer(10, 8000)' },
      { name: '@name', value: '@integer(10, 8000)' },
      { name: '@name', value: '@integer(10, 8000)' },
      { name: '@name', value: '@integer(10, 8000)' },
      { name: '@name', value: '@integer(10, 8000)' },
      { name: '@name', value: '@integer(10, 8000)' },
      { name: '@name', value: '@integer(10, 8000)' },
      { name: '@name', value: '@integer(10, 8000)' },
      { name: '@name', value: '@integer(10, 8000)' }
    ]
  },
  // sơ đồ cây
  fetchTreemap: {
    code: 0,
    status: 200,
    msg: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_174') : 'Yêu cầu thành công'),
    data: tTreemapJson
  },
  // Trái đất 3D
  threeEarth01Data: {
    code: 0,
    status: 200,
    msg: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_174') : 'Yêu cầu thành công'),
    data: [
      {
        startArray: { name: '@name', N: '@integer(10, 100)', E: '@integer(10, 100)' },
        'endArray|10': [{ name: '@name', N: '@integer(10, 100)', E: '@integer(10, 100)' }]
      }
    ]
  },
  // Sơ đồ Sankey
  fetchSankey: {
    code: 0,
    status: 200,
    msg: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_174') : 'Yêu cầu thành công'),
    data: sankeyJson
  },
  // sơ đồ quan hệ
  graphData: {
    code: 0,
    status: 200,
    msg: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_174') : 'Yêu cầu thành công'),
    data: graphDataJson
  },
}
