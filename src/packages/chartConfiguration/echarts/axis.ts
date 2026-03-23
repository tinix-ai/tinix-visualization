export const axisConfig = {
  // Xvị trí trục
  xposition: [
    {
      label: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_335') : 'đáy'),
      value: 'top'
    },
    {
      label: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_323') : 'đứng đầu'),
      value: 'bottom'
    }
  ],
  // Yvị trí trục
  yposition: [
    {
      label: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_197') : 'bên trái'),
      value: 'left'
    },
    {
      label: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_249') : 'bên phải'),
      value: 'right'
    }
  ],
  // đường kẻ
  splitLint: {
    lineStyle: {
      type: [
        {
          label: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_436') : 'đường chấm chấm'),
          value: 'solid'
        },
        {
          label: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_63') : 'thẳng đứng'),
          value: 'dashed'
        },
        {
          label: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_194') : 'đường liền nét'),
          value: 'dotted'
        }
      ]
    }
  },
  // lập bản đồ trực quan
  visualMap: {
    orient: [
      {
        label: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_283') : 'đường chấm chấm'),
        value: 'vertical'
      },
      {
        label: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_57') : 'mức độ'),
        value: 'horizontal'
      }
    ]
  }
}
