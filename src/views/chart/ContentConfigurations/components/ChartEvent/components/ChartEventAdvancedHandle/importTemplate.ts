// Lấy ví dụ
const eTemplateString = `
console.log(e)
`
// Có được bức tranh toàn cầu echarts Ví dụ
const echartsTemplateString = `
console.log(echarts)
`

// Lấy thành phần hiện tạiBiểu bộ sưu tập đồ thị
const componentsTemplateString = `
console.log(components)
`

// Lấy nodeModules Ví dụ
const nodeModulesTemplateString = `
console.log(node_modules)
`

// Thêm nhấp chuộtSự kiện
const addClickTemplateString = `
// Chỉ có thể nhận được sau khi kết xuất dom Ví dụ
e.el.addEventListener('click', () => {
  alert(window['$t']('views_components.auto_212'));
}, false)
`

// Giới thiệu không đồng bộ
const importTemplateString = `
await import('https://lf3-cdn-tos.bytecdntp.com/cdn/expire-1-M/lodash.js/4.17.21/lodash.js')

// lodash Mặc định được gán cho "_"
console.log('isEqual', _.isEqual(['1'], ['1']))
`

// Ôn lạiBiểu đồ tooltip
const tooltipTemplateString =
  `
// LấyechartVí dụ
const chart = this.refs.vChartRef.chart

// Biểu đồCài Đặt Chỉnhtooltip
chart.setOption({
  tooltip: {
    trigger: 'axis', //item
    enterable: true, 
    formatter (params) {
      return` +
  '`' +
  `
        <div>
          <img src="https://portrait.gitee.com/uploads/avatars/user/1654/4964818_MTrun_1653229420.png!avatar30">
          <b><a href="https://gitee.com/dromara/go-view">{{ $t('phase7.auto_191') }}</a></b>
        <div>
        <div style='border-radius:35px;color:#666'>
        ` +
  '$' +
  `{Object.entries(params[0].value).map(kv => ` +
  '`' +
  `<div>` +
  '$' +
  `{kv[0]}:` +
  '$' +
  `{kv[1]}</div>` +
  '`' +
  `).join('')}
        </div>
      ` +
  '`;' +
  `
    },
  }
})
`

// Thêm [Băng chuyềnDanh sách】phong cách
const addStyleString =
  `
// Mã định danh phạm vi kiểu thành phần
const scoped = this.subTree.scopeId
function loadStyleString(css){
	let style = document.createElement('style')
	style.type = 'text/css'
	style.appendChild(document.createTextNode(css))
	let head = document.getElementsByTagName('head')[0]
	head.appendChild(style)
}
loadStyleString(` +
  '`' +
  `
.dv-scroll-board[` +
  '$' +
  `{scoped}] {
  position: relative;
  overflow: hidden;
}
.dv-scroll-board[` +
  '$' +
  `{scoped}]::before {
  content: '';
  display: block;
  position: absolute;
  top: -20%;
  left: -100%;
  width: 550px;
  height: 60px;
  transform: rotate(-45deg);
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(255, 255, 255, 0.3), rgba(0, 0, 0, 0));
  animation: cross 2s infinite;
}
@keyframes cross{
  to{
    top: 80%;
    left: 100%;
    transform: rotate(-45deg);
  }
}
` +
  '`' +
  `)
`

// Ôn lạiMapkích thước gốc
const editMapPointString = `
const chart = this.refs.vChartRef.chart
// sự định nghĩaMapkích thước gốc Tương tự, bạn có thể tùy chỉnh nhãn và nội dung khác
this.props.chartConfig.option.series[0].symbolSize = (val) => {
  return Math.sqrt(val[2]) / 3;
}
this.setupState.vEchartsSetOption();
let i = 0; // Chỉ mục băng chuyền hiện tại
const len = 3; // bộ phận băng chuyềnPhútMẹo
(function showTips() {
  const action = (type, dataIndex) => {
    chart.dispatchAction({
      type,
      dataIndex,
      seriesIndex: 0,
    });
  }
  setInterval(() => {
    action("downplay", i);
    action("hideTip", i);
    if (i === len) i = 0;
    i++;
    action("highlight", i);
    action("showTip", i);
  }, 2000);
})()
`

export const templateList = [
  {
    description: window['$t']('views_components.auto_209'),
    code: eTemplateString
  },
  {
    description: window['$t']('views_components.auto_207'),
    code: echartsTemplateString
  },
  {
    description: window['$t']('views_components.auto_211'),
    code: componentsTemplateString
  },
  {
    description: window['$t']('views_components.auto_206'),
    code: nodeModulesTemplateString
  },
  {
    description: window['$t']('views_components.auto_214'),
    code: importTemplateString
  },
  {
    description: window['$t']('views_components.auto_208'),
    code: addClickTemplateString
  },
  {
    description: window['$t']('views_components.auto_210'),
    code: tooltipTemplateString
  },
  {
    description: window['$t']('views_components.auto_215'),
    code: addStyleString
  },
  {
    description: window['$t']('views_components.auto_213'),
    code: editMapPointString
  }
]
