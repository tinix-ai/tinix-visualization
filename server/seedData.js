const sampleSalesData = [
  { "Hạng mục": "Điện thoại", "Doanh số": 1250, "Lợi nhuận": 300, "Tháng": "Tháng 1" },
  { "Hạng mục": "Máy tính", "Doanh số": 850, "Lợi nhuận": 210, "Tháng": "Tháng 1" },
  { "Hạng mục": "Phụ kiện", "Doanh số": 450, "Lợi nhuận": 150, "Tháng": "Tháng 1" },
  { "Hạng mục": "Điện thoại", "Doanh số": 1400, "Lợi nhuận": 350, "Tháng": "Tháng 2" },
  { "Hạng mục": "Máy tính", "Doanh số": 900, "Lợi nhuận": 250, "Tháng": "Tháng 2" },
  { "Hạng mục": "Phụ kiện", "Doanh số": 500, "Lợi nhuận": 180, "Tháng": "Tháng 2" }
];

const sampleEnergyData = [
  { "Tỉnh": "Hà Nội", "Sản lượng": 15000, "Tiêu thụ": 14500 },
  { "Tỉnh": "TP.HCM", "Sản lượng": 22000, "Tiêu thụ": 21800 },
  { "Tỉnh": "Đà Nẵng", "Sản lượng": 8000, "Tiêu thụ": 7900 },
  { "Tỉnh": "Hải Phòng", "Sản lượng": 12000, "Tiêu thụ": 11500 },
  { "Tỉnh": "Cần Thơ", "Sản lượng": 9500, "Tiêu thụ": 9400 }
];

const seedDatasets = [
  {
    id: 'seed-sales-001',
    name: 'Dữ liệu Bán hàng Mẫu (2024)',
    type: 'json',
    content: JSON.stringify(sampleSalesData),
    bi_config: JSON.stringify({
       columns: [
         { name: 'Hạng mục', type: 'dimension', subType: 'category' },
         { name: 'Tháng', type: 'dimension', subType: 'category' },
         { name: 'Doanh số', type: 'metric', subType: 'number' },
         { name: 'Lợi nhuận', type: 'metric', subType: 'number' }
       ]
    })
  },
  {
    id: 'seed-energy-001',
    name: 'Sản lượng Năng lượng VN (Mẫu)',
    type: 'json',
    content: JSON.stringify(sampleEnergyData),
    bi_config: JSON.stringify({
       columns: [
         { name: 'Tỉnh', type: 'dimension', subType: 'geography' },
         { name: 'Sản lượng', type: 'metric', subType: 'number' },
         { name: 'Tiêu thụ', type: 'metric', subType: 'number' }
       ]
    })
  }
];

module.exports = {
  seedDatasets,
  seedProjects: [] // Có thể thêm dashboard mẫu vào đây nếu cần
};
