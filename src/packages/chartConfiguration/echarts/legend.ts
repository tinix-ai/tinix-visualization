export const legendConfig = {
  // Xvị trí trục
  lengendX: [
    {
      label: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_438') : 'hình mũi tên'),
      value: 'left'
    },
    {
      label: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_11') : 'dựa vào'),
      value: 'center'
    },
    {
      label: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_71') : 'trung tâm'),
      value: 'right'
    }
  ],
  // yvị trí trục
  lengendY: [
    {
      label: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_291') : 'Giữ bên phải'),
      value: 'top'
    },
    {
      label: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_11') : 'dựa vào'),
      value: 'center'
    },
    {
      label: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_274') : 'Giữ bên trái'),
      value: 'bottom'
    }
  ],
  // Hướng sắp xếp
  orient: [
    {
      label: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_57') : 'mức độ'),
      value: 'horizontal'
    },
    {
      label: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_255') : 'hình dạng cây bút'),
      value: 'vertical'
    }
  ],
  // hình dạng
  shape: [
    {
      label: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_251') : 'hình vuông tròn'),
      value: 'circle'
    },
    {
      label: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_512') : 'quảng trường'),
      value: 'rect'
    },
    {
      label: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_69') : 'cúi xuống'),
      value: 'roundRect'
    },
    {
      label: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_189') : 'tam giác'),
      value: 'triangle'
    },
    {
      label: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_5') : 'thẳng đứng'),
      value: 'pin'
    },
    {
      label: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_45') : 'tròn'),
      value: 'arrow'
    }
  ]
}
