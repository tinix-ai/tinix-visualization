export const legendsConfig = {
  // Vị trí
  orient: [
    {
      label: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_335') : 'đáy'),
      value: 'top'
    },
    {
      label: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_323') : 'đứng đầu'),
      value: 'bottom'
    },
    {
      label: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_197') : 'bên trái'),
      value: 'left'
    },
    {
      label: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_249') : 'bên phải'),
      value: 'right'
    }
  ],
  // Căn chỉnh
  position: [
    {
      label: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_134') : 'Nhà Tống'),
      value: 'start'
    },
    {
      label: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_11') : 'dựa vào'),
      value: 'middle'
    },
    {
      label: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_379') : 'kết thúc'),
      value: 'end'
    }
  ],
  // Vị trí chú giải của từng mục
  align: [
    {
      label: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_40') : 'Ở bên trái'),
      value: 'left'
    },
    {
      label: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_15') : 'kịch bản thông thường'),
      value: 'right'
    }
  ]
}

export const fontStyleConfig = {
  // Độ dày phông chữ
  fontWeight: [
    {
      label: '100',
      value: 100
    },
    {
      label: '200',
      value: 200
    },
    {
      label: '300',
      value: 300
    },
    {
      label: '400',
      value: 400
    },
    {
      label: '500',
      value: 500
    },
    {
      label: '600',
      value: 600
    },
    {
      label: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_365') : 'làm tối đi'),
      value: "normal"
    },
    {
      label: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_106') : 'nội bộ'),
      value: "bold"
    }
  ],
  fontFamily: [
    {
      label: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_102') : 'bắt đầu'),
      value: 'SimSun'
    },
    {
      label: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_133') : 'cơ thể màu đen'),
      value: 'SimHei'
    },
    {
      label: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_268') : 'Ở bên phải'),
      value: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_268') : 'Ở bên phải')
    }
  ]
}
