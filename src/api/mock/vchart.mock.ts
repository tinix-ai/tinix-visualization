import bar from './vchart/bar.json'

export default {
  bar: {
    code: 0,
    status: 200,
    msg: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_174') : 'Yêu cầu thành công'),
    data: bar
  }
}
