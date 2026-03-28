export type Chartype = {
  id: number | string
  title: string // tiêu đề
  label: string // Nhãn
  release: boolean // 0Chưa được xuất bản | 1Đã xuất bản
  image?: string // hình ảnh
}

export type ChartList = Chartype[]