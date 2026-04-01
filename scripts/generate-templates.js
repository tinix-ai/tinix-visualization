const fs = require('fs');
const path = require('path');

const srcDataPath = path.join(__dirname, '../src/views/project/templateMarket/data.ts');
const templatesDir = path.join(__dirname, '../src/views/project/templateMarket/templates');

// 1. Read the 100 titles from data.ts
const dataTsContent = fs.readFileSync(srcDataPath, 'utf8');
const match = dataTsContent.match(/const rawTemplateTitles[^\[]*\[([\s\S]*?)\]\n/);
if (!match) {
  console.error("Could not find rawTemplateTitles in data.ts");
  process.exit(1);
}

const listContent = match[1];
const items = [];
const regex = /\{[\s]*title:\s*'([^']+)',\s*category:\s*(\d+)[\s]*\}/g;
let m;
while ((m = regex.exec(listContent)) !== null) {
  items.push({ title: m[1], category: parseInt(m[2], 10) });
}

// 2. Load the 12 base configs originally present alongside Base64 images
const baseConfigs = [];
const baseImages = [];
for (let i = 1; i <= 12; i++) {
  const tplId = `tpl-${String(i).padStart(3, '0')}`;
  const configPath = path.join(templatesDir, tplId, 'config.json');
  if (fs.existsSync(configPath)) {
    baseConfigs.push(fs.readFileSync(configPath, 'utf8'));
  }
  
  // Try finding real screenshot of the dashboard
  let imgPath = path.join(templatesDir, tplId, 'image.png');
  if (!fs.existsSync(imgPath)) imgPath = path.join(templatesDir, tplId, 'moke.png');
  
  if (fs.existsSync(imgPath)) {
    const rawImg = fs.readFileSync(imgPath);
    baseImages.push(`data:image/png;base64,${rawImg.toString('base64')}`);
  } else {
    baseImages.push(null);
  }
}

// 3. Fallback generic semantic mappings
const fallbackCategoryDictionary = {
  1: { "Ấn tượng": "Tiếp cận", "Click": "Tìm hiểu", "Lead": "Mở Tài Khoản", "Đăng ký": "Nạp tiền", "Mua hàng": "Giao dịch", "Facebook": "Cổ phiếu", "Google": "Trái phiếu", "Tiktok": "Quỹ ETF", "ROI": "Lãi suất", "Doanh thu": "Dòng tiền vào", "Lợi nhuận": "Lãi/Lỗ" },
  2: { "Ấn tượng": "Lượt xem", "Click": "Nộp CV", "Lead": "Phỏng vấn", "Đăng ký": "Đạt yêu cầu", "Mua hàng": "Nhận việc", "Facebook": "Thâm niên", "Google": "Mới vào", "Tiktok": "Đã nghỉ", "ROI": "Hiệu suất", "Doanh thu": "Định biên", "Lợi nhuận": "Thực tế" },
  3: { "ROI": "ROAS" },
  4: { "Ấn tượng": "Điều phối", "Click": "Lấy hàng", "Lead": "Nhập kho", "Đăng ký": "Xuất kho", "Mua hàng": "Giao thành công", "Facebook": "Đường bộ", "Google": "Đường biển", "Tiktok": "Hàng không", "ROI": "Đúng hạn", "Doanh thu": "Khối lượng", "Lợi nhuận": "Thực giao" },
  5: { "Ấn tượng": "Khám sàng lọc", "Click": "Lấy mẫu", "Lead": "Xét nghiệm", "Đăng ký": "Kê đơn", "Mua hàng": "Hồi phục", "Facebook": "Nội trú", "Google": "Ngoại trú", "Tiktok": "Cấp cứu", "ROI": "Khỏi bệnh", "Doanh thu": "Tiếp nhận", "Lợi nhuận": "Xuất viện" },
  6: { "Ấn tượng": "Nguyên liệu", "Click": "Sơ chế", "Lead": "Lắp ráp", "Đăng ký": "Kiểm định", "Mua hàng": "Xuất xưởng", "Facebook": "Dây chuyền 1", "Google": "Dây chuyền 2", "Tiktok": "Dây chuyền 3", "ROI": "Đạt chuẩn OEE", "Doanh thu": "Kế hoạch", "Lợi nhuận": "Thành phẩm" },
  7: { "Ấn tượng": "Truy cập", "Click": "Ghi danh", "Lead": "Tham gia", "Đăng ký": "Nộp bài", "Mua hàng": "Hoàn thành khóa", "Facebook": "Hệ Đại học", "Google": "Hệ Cao đẳng", "Tiktok": "Tại chức", "ROI": "Đạt khá giỏi", "Doanh thu": "Chỉ tiêu", "Lợi nhuận": "Đạt được" },
  8: { "Ấn tượng": "Truy cập", "Click": "Quan tâm", "Lead": "Yêu cầu", "Đăng ký": "Đặt chỗ", "Mua hàng": "Hoàn tất", "Doanh thu": "Lượt khách", "Lợi nhuận": "Hài lòng" }
};

// 4. Detailed mapping targeting specific template Titles
const specificMappings = [
  // EDUCATION
  {
    match: /giảng viên/i,
    map: { "Ấn tượng": "Gắn bó", "Click": "Báo giảng", "Lead": "Lên lớp", "Đăng ký": "Phản hồi", "Mua hàng": "Đánh giá tốt", "Facebook": "Chính quy", "Google": "Thỉnh giảng", "Tiktok": "Trợ giảng", "Tết Giáp Thìn": "Học kỳ 1", "Sale 3.3": "Học kỳ 2", "Summer Vibe": "Học kỳ Hè", "Back to School": "Khóa luyện thi", "ROI": "Đạt Khá/Giỏi", "Doanh thu": "Tiết dạy", "Lợi nhuận": "Số tiết đạt", "Tinix Visualization": "Toán cao cấp", "Dashboard Template": "Lập trình C", "Dữ liệu lớn": "Triết học", "Phân tích dữ liệu": "Ngoại ngữ", "AI Studio": "Kinh tế học", "Hoàn thành KPI": "Tỉ lệ Hoàn thành Tiết", "Tỉ suất lợi nhuận": "Tỉ lệ hài lòng" }
  },
  {
    match: /ký túc xá/i,
    map: { "Ấn tượng": "Tìm hiểu", "Click": "Nộp đơn", "Lead": "Đang xét duyệt", "Đăng ký": "Nhận phòng", "Mua hàng": "Trả phòng", "Facebook": "Khu A: Nam", "Google": "Khu B: Nữ", "Tiktok": "Khu C: Sinh viên Ngoại", "Tết Giáp Thìn": "Tháng 1-3", "Sale 3.3": "Tháng 4-6", "Summer Vibe": "Tháng 7-9", "Back to School": "Tháng 10-12", "ROI": "Độ an toàn PCCC", "Doanh thu": "Sức chứa tối đa", "Lợi nhuận": "Sinh viên đang ở", "Tinix Visualization": "Sự cố Điện", "Dashboard Template": "Sự cố Cấp Nước", "Dữ liệu lớn": "Mất vệ sinh", "Phân tích dữ liệu": "Mất an ninh", "AI Studio": "Phản ánh Internet", "Hoàn thành KPI": "Tỉ lệ Lấp đầy", "Tỉ suất lợi nhuận": "Tỉ lệ Tuân thủ nội quy" }
  },
  {
    match: /ngoại khóa|luyện thi/i,
    map: { "Ấn tượng": "Quan tâm", "Click": "Đăng ký", "Lead": "Tham gia", "Đăng ký": "Đạt chứng nhận", "Mua hàng": "Đạt giải", "Facebook": "Câu Lạc Bộ Thể thao", "Google": "Văn nghệ - Sự kiện", "Tiktok": "CLB Học thuật", "Doanh thu": "Sĩ số tối đa", "Lợi nhuận": "Số lượng tham gia", "ROI": "Hoàn thành xuất sắc" }
  },
  {
    match: /sinh viên|tuyển sinh/i,
    map: { "Ấn tượng": "Tham quan", "Click": "Nộp hồ sơ", "Lead": "Dự thi", "Đăng ký": "Nhập học", "Mua hàng": "Tốt nghiệp", "Facebook": "Khối Tự nhiên", "Google": "Khối Xã hội", "Tiktok": "Ngoại ngữ", "Doanh thu": "Chỉ tiêu Tuyển", "Lợi nhuận": "Thực tế Tuyển Sinh", "Tinix Visualization": "CNT Thông tin", "Dashboard Template": "Kinh tế", "Dữ liệu lớn": "Luật", "Phân tích dữ liệu": "Báo chí", "AI Studio": "Y Dược" }
  },

  // HEALTH
  {
    match: /dịch bệnh/i,
    map: { "Ấn tượng": "Sàng lọc", "Click": "Nghi nhiễm", "Lead": "Cách ly", "Đăng ký": "Nhiễm bệnh", "Mua hàng": "Bình phục", "Facebook": "Hồ Chí Minh", "Google": "Hà Nội", "Tiktok": "Đà Nẵng", "Doanh thu": "Tổng Xét nghiệm", "Lợi nhuận": "Ca Khỏi Khẩn cấp", "ROI": "Tỉ lệ tử vong" }
  },
  {
    match: /không khí/i,
    map: { "Ấn tượng": "Cực Tốt", "Click": "Bình thường", "Lead": "Bụi nhẹ", "Đăng ký": "Bụi nặng", "Mua hàng": "Cực Nguy hại", "Facebook": "PM2.5", "Google": "PM10", "Tiktok": "CO2", "Doanh thu": "Ngưỡng Cảnh cáo", "Lợi nhuận": "Ngưỡng An Toàn", "ROI": "Mật độ PM" }
  },

  // MANUFACTURING
  {
    match: /dây chuyền/i,
    map: { "Ấn tượng": "Cấp liệu", "Click": "Sơ chế thô", "Lead": "Lắp ráp CNC", "Đăng ký": "Kiểm tra lỗi", "Mua hàng": "Đóng thùng", "Facebook": "Tổ máy 1", "Google": "Tổ máy 2", "Tiktok": "Tổ máy 3", "Doanh thu": "Công suất Thiết Kế", "Lợi nhuận": "Sản lượng Đầu ra", "ROI": "Chỉ số OEE" }
  },
  {
    match: /bảo trì|thiết bị/i,
    map: { "Ấn tượng": "Lịch hẹn", "Click": "Ghi nhận lỗi", "Lead": "Kiểm tra", "Đăng ký": "Thay thế Linh kiện", "Mua hàng": "Nghiệm thu Vận hành", "Facebook": "Bảo trì Định kỳ", "Google": "Sự cố Đột xuất", "Tiktok": "Đại tu Khẩn cấp", "Doanh thu": "Giờ Dừng máy", "Lợi nhuận": "Giờ Hoạt động", "ROI": "Tuổi thọ Máy" }
  },

  // LOGISTIC
  {
    match: /kho bãi|lưu kho/i,
    map: { "Ấn tượng": "Báo đơn", "Click": "Gom hàng", "Lead": "Đóng màng co", "Đăng ký": "Xếp lên Kệ", "Mua hàng": "Xuất xe", "Facebook": "Khu Vực A (Hàng ướt)", "Google": "Khu Vực B (Hàng khô)", "Tiktok": "Khu C (Lạnh)", "Doanh thu": "Sức chứa Tối đa Kg", "Lợi nhuận": "Thực Tế Lưu Kho Kg", "ROI": "Tốc độ xử lý phút" }
  },
  {
    match: /đội xe|vận đơn|vận tải/i,
    map: { "Ấn tượng": "Lên lịch", "Click": "Điều xe", "Lead": "Đang lấy hàng", "Đăng ký": "Đang trung chuyển", "Mua hàng": "Giao tận tay", "Facebook": "Tải 2 Tấn", "Google": "Tàu Biển 80T", "Tiktok": "Đầu kéo Container", "Doanh thu": "Cuốc xe Kế Hoạch", "Lợi nhuận": "Cuốc xe Hoàn Thành", "ROI": "Chỉ số Trễ hẹn" }
  },

  // HRM
  {
    match: /kpi/i,
    map: { "Ấn tượng": "Giao Task", "Click": "Tiếp nhận", "Lead": "Cập nhật", "Đăng ký": "Review", "Mua hàng": "Đạt Điểm Tuyệt đối", "Facebook": "Bộ phận Sales", "Google": "Bộ phận Tech", "Tiktok": "Bộ phận Support", "Doanh thu": "Kế hoạch Quý", "Lợi nhuận": "Ghi nhận KPI", "ROI": "Chỉ số Hoàn thành" }
  },
  {
    match: /tuyển dụng/i,
    map: { "Ấn tượng": "Đọc Job", "Click": "Gửi CV", "Lead": "Phỏng vấn 1", "Đăng ký": "Đàm phán Lương", "Mua hàng": "Duyệt Đi làm", "Facebook": "Kênh IT Việc", "Google": "Kênh LinkedIn", "Tiktok": "Fanpage Career", "Doanh thu": "Chỉ tiêu Tuyển", "Lợi nhuận": "Cung ứng đủ", "ROI": "Tỉ suất Nghỉ việc" }
  },
  {
    match: /lương|phúc lợi/i,
    map: { "Ấn tượng": "Trình bảng lương", "Click": "KT Phản hồi", "Lead": "Duyệt Kế Toán", "Đăng ký": "Bắn Tiền", "Mua hàng": "Hoàn thành Lương Quý", "Facebook": "Lương Cơ Bản", "Google": "Tiền Thưởng KPIs", "Tiktok": "Các loại Phụ cấp", "Doanh thu": "Quỹ Ngân Sách", "Lợi nhuận": "Chi bình quân", "ROI": "Tỉ suất Hài Lòng" }
  },

  // FINANCE
  {
    match: /chứng khoán|đầu tư/i,
    map: { "Ấn tượng": "Xem mã", "Click": "Chốt số lượng", "Lead": "Đặt lệnh", "Đăng ký": "Khớp lệnh", "Mua hàng": "Hàng về TK", "Facebook": "Biều đồ Cổ phiếu", "Google": "Mảng Trái phiếu", "Tiktok": "Chứng quyền", "Doanh thu": "Vốn hóa TT", "Lợi nhuận": "Tiền lãi Net", "ROI": "Tăng trưởng Lãi", "Tinix Visualization": "VNM", "Dashboard Template": "HPG" }
  },
  {
    match: /nợ công/i,
    map: { "Ấn tượng": "Hồ sơ vay", "Click": "Dự án xin vốn", "Lead": "Phê duyệt ODA", "Đăng ký": "Giải ngân", "Mua hàng": "Hoàn tất Trả nợ", "Facebook": "Nợ Quốc tế", "Google": "Nợ Ngân Hàng", "Tiktok": "Trái Phiếu Chính Phủ", "Doanh thu": "Khoản Đang Vay", "Lợi nhuận": "Khoản Trả Nợ Xong", "ROI": "Lạm phát" }
  },

  // OTHER
  {
    match: /bất động sản/i,
    map: { "Ấn tượng": "Hẹn gọi", "Click": "Xem căn hộ", "Lead": "Đặt cọc Thiện chí", "Đăng ký": "Chuyển cọc cứng", "Mua hàng": "Ký Hợp Đồng Mua", "Facebook": "Phân khúc Cao Cấp", "Google": "Nhà Ở Xã Hội", "Tiktok": "Đất Nền Dự án", "Doanh thu": "Số Căn Tối Đa", "Lợi nhuận": "Số Căn Đã Bán", "ROI": "Lợi nhuận gộp CĐT" }
  },
  {
    match: /khách sạn|đặt phòng/i,
    map: { "Ấn tượng": "Truy cập OTA", "Click": "Xem giá", "Lead": "Thêm thanh toán", "Đăng ký": "Giữ chỗ thành công", "Mua hàng": "Đã Check-in", "Facebook": "Hạng Tiêu chuẩn", "Google": "Hạng Cao cấp", "Tiktok": "Hạng Biệt thự VIP", "Doanh thu": "Giường Lắp đặt", "Lợi nhuận": "Giường Đang Khách Ở", "ROI": "Biên LNT Ròng" }
  },
  {
    match: /khiếu nại/i,
    map: { "Ấn tượng": "Tiếp nhận Lỗi", "Click": "Mở Ticket", "Lead": "Chuyển phòng ban", "Đăng ký": "Sửa chữa xong", "Mua hàng": "Đóng Ticket Hoàn hảo", "Facebook": "Lỗi phần mềm", "Google": "Thái độ NV", "Tiktok": "Lỗi phần cứng", "Doanh thu": "Tổng Sự cố", "Lợi nhuận": "Đã cứu vãn", "ROI": "Tỉ suất Churn Rate" }
  }
];

function escapeHtml(unsafe) {
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
}

function getSvgPlaceholder(rawTitle, hue, baseImageb64) {
  const title = escapeHtml(rawTitle.toUpperCase());
  const accentColor = `hsl(${(hue + 40) % 360}, 100%, 65%)`;

  let imgTag = '';
  if (baseImageb64) {
    // Embedding the authentic base image with a hue filter to shift colors per template
    imgTag = `<image href="${baseImageb64}" width="800" height="450" preserveAspectRatio="xMidYMid slice" filter="url(#hue-shift)" opacity="0.6"/>`;
  } else {
    // Fallback if no real image
    imgTag = `<rect width="800" height="450" fill="hsl(${hue}, 40%, 15%)" />`;
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="450" viewBox="0 0 800 450">
  <defs>
    <filter id="hue-shift">
      <feColorMatrix type="hueRotate" values="${hue}" />
    </filter>
    <linearGradient id="overlayFade" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#000;stop-opacity:0.3" />
      <stop offset="100%" style="stop-color:#0b1120;stop-opacity:1" />
    </linearGradient>
  </defs>
  
  ${imgTag}
  <rect width="800" height="450" fill="url(#overlayFade)"/>
  
  <rect width="800" height="6" fill="${accentColor}"/>
  <text x="400" y="210" font-family="'Inter', 'Segoe UI', 'Roboto', sans-serif" font-size="28" font-weight="bold" fill="#ffffff" text-anchor="middle" dominant-baseline="middle" letter-spacing="1">
    ${title}
  </text>
  <text x="400" y="260" font-family="'Inter', 'Segoe UI', 'Roboto', sans-serif" font-size="14" font-weight="normal" fill="#rgba(255,255,255,0.6)" text-anchor="middle" dominant-baseline="middle" letter-spacing="3">
    ANALYTICS DASHBOARD TEMPLATE
  </text>
</svg>`;
}

// 5. Generate 100 individual folders
items.forEach((item, index) => {
  const tplId = `tpl-${String(index + 1).padStart(3, '0')}`;
  const folderPath = path.join(templatesDir, tplId);
  
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }

  const baseIndex = index % baseConfigs.length;
  let configStr = baseConfigs[baseIndex];
  const b64Image = baseImages[baseIndex];

  // A. Try to find a precise mapping based on the title string
  let appliedDict = null;
  for (const group of specificMappings) {
    if (group.match.test(item.title)) {
      appliedDict = group.map;
      break;
    }
  }

  // B. Fallback to category definition if no specific phrase matched
  if (!appliedDict) {
    appliedDict = fallbackCategoryDictionary[item.category];
  }

  // Replace matched semantic terms
  if (appliedDict) {
    // Sort keys descending by length so longer phrases get replaced first (avoids parts of words being swapped)
    const keys = Object.keys(appliedDict).sort((a,b) => b.length - a.length);
    for (const key of keys) {
      configStr = configStr.replace(new RegExp(key, 'g'), appliedDict[key]);
    }
  }

  const newConfig = JSON.parse(configStr);

  // Ensure default geo component exists if needed for lines/scatter
  if (!newConfig.geo) {
    newConfig.geo = {
      show: false,
      type: 'map',
      roam: false,
      map: 'vietnam',
      selectedMode: false,
      zoom: 1
    };
  }

  // Customize projectName
  if (newConfig.editCanvasConfig) {
    newConfig.editCanvasConfig.projectName = item.title;
  }
  
  // Customize the large title text inside the chart components
  if (newConfig.componentList && Array.isArray(newConfig.componentList)) {
    let titleComp = null;
    let maxFontSize = 0;
    
    newConfig.componentList.forEach(comp => {
      // Find the main dashboard title visually
      if (comp.chartConfig && comp.chartConfig.key === "TextCommon") {
        if (comp.option && typeof comp.option.dataset === 'string') {
          const fontSize = comp.option.fontSize || 0;
          if (fontSize > maxFontSize) {
            maxFontSize = fontSize;
            titleComp = comp;
          }
        }
      }
      
      // Also apply map to chart titles
      if (comp.chartConfig && comp.chartConfig.title) {
        if (appliedDict && appliedDict[comp.chartConfig.title]) {
           comp.chartConfig.title = appliedDict[comp.chartConfig.title];
        }
      }
    });
    
    // Replace dashboard specific main title
    if (titleComp) {
      titleComp.option.dataset = item.title.toUpperCase();
    }
  }

  // Save the custom config.json
  fs.writeFileSync(path.join(folderPath, 'config.json'), JSON.stringify(newConfig, null, 2));

  // Save a unique SVG thumbnail
  const randomHue = Math.floor(Math.random() * 360);
  const svgContent = getSvgPlaceholder(item.title, randomHue, b64Image);
  fs.writeFileSync(path.join(folderPath, 'image.svg'), svgContent);
});

console.log("Successfully generated 100 deep-semantic templates in", templatesDir);
