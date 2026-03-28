<div align="center">
  <h1>📊 TiniX Visualization (Auto-BI Edition)</h1>
  <p><strong>Nền tảng Trực quan hóa Dữ liệu Thông minh, Bảo mật Cục bộ và Tự động hóa bằng AI (Auto-BI)</strong></p>
</div>

---

## 🌟 Giới thiệu tổng quan

**TiniX Visualization** là một Low-Code Framework thế hệ mới chuyên xây dựng các Dashboard chuyên nghiệp. Khác biệt với các công cụ truyền thống, TiniX tích hợp sức mạnh của **Trí tuệ Nhân tạo (AI)** để giúp người dùng chuyển đổi dữ liệu thô (Excel, CSV) thành các biểu đồ phân tích sâu sắc chỉ trong vài giây thông qua quy trình **Auto-BI**.

Dự án được tối ưu hóa 100% Tiếng Việt, vận hành theo triết lý "Local-First" – dữ liệu và cấu hình nằm gọn trong hạ tầng của bạn, đảm bảo tính riêng tư tuyệt đối cho các báo cáo doanh nghiệp.

## ✨ Tính năng Đột phá

### 1. 🤖 Auto-BI Wizard (AI-Driven Generation)
- **Tự động Phân tích:** AI tự động đề xuất loại biểu đồ phù hợp nhất dựa trên đặc tính dữ liệu (Phân tán, Xu hướng, So sánh, Tỷ trọng).
- **Khởi tạo Dashboard Thần tốc:** Tạo 4-10 biểu đồ chuyên sâu chỉ với 3 bước: Tải dữ liệu -> AI Đề xuất -> Tùy chỉnh & Lưu.
- **Thumbnail Thông minh:** Tự động gán ảnh đại diện theo chủ đề (Tài chính, Marketing, Bản đồ...) ngay khi vừa khởi tạo.

### 2. 🗺️ Geographic Intelligence (Bản đồ Toàn cầu & Việt Nam)
- **Hỗ trợ Đa vùng:** Chế độ hiển thị linh hoạt Thế giới (World Map), Việt Nam (63 tỉnh thành) và Trung Quốc.
- **Dữ liệu Sạch:** Cam kết sử dụng bản đồ đã tinh chỉnh, loại bỏ hoàn toàn các đường biên giới nhạy cảm (Đường lưỡi bò) để đảm bảo tính chuẩn mực pháp lý.
- **Hỗ trợ đa ngôn ngữ địa lý:** Tự động chuẩn hóa tên quốc gia từ tiếng Việt sang tiếng Anh để ánh xạ dữ liệu chính xác trên bản đồ thế giới.

### 3. 📈 Thư viện Biểu đồ Nâng cao (10+ Loại hình)
- **Nhóm Cổ điển:** Cột, Đường, Tròn, Diện tích.
- **Nhóm Chuyên sâu:** 
  - **Radar/Funnel:** Phân tích năng lực và phễu chuyển đổi.
  - **Heatmap/TreeMap:** Trực quan hóa mật độ và cấu trúc phân cấp.
  - **Scatter:** Phân tích tương quan dữ liệu phức tạp với tooltip thông minh.

### 4. 🔗 Pipeline & Xử lý Dữ liệu
- **Data Aggregation:** Tự động tính tổng, làm tròn và lọc Top-N giúp biểu đồ luôn sạch sẽ, không bị rối số liệu.
- **Cấu hình Động:** Gắn kết dữ liệu trực tiếp từ các Dataset đã tải lên hoặc gọi REST API realtime.

## 🛠 Kiến trúc & Công nghệ (Tech Stack)
### Frontend
- **Framework:** Vue 3.x (Composition API), Vite 4.x
- **State:** Pinia (Quản lý trạng thái Dashboard)
- **UI:** Naive UI (Dark Mode chuẩn Hi-Tech)
- **Charts:** ECharts 5.x, VChart (Web-GL Ready)

### Backend (Local Server)
- **Runtime:** Node.js + Express
- **Database:** SQLite3 (Lưu trữ cục bộ không cần cài đặt phức tạp)
- **AI Integration:** OpenAI API / AI Service (Xử lý logic gợi ý biểu đồ)

## 🚀 Cài đặt & Khởi nghiệp

### Yêu cầu hệ thống: Node.js >= 16.14

1. **Cài đặt thư viện:**
   ```bash
   npm install
   ```

2. **Cấu hình Môi trường (QUAN TRỌNG):**
   - Sao chép file mẫu: `cp .env.example .env` (hoặc copy-paste thủ công).
   - Mở file `.env` và điền `OPENROUTER_API_KEY` của bạn để sử dụng tính năng AI.
   - Các file `.env` và `database.sqlite` đã được cấu hình trong `.gitignore` để đảm bảo bảo mật, không bị đẩy lên Git.

3. **Khởi chạy đồng thời (Frontend & Backend):**
   ```bash
   npm run dev:all
   ```

4. **Tự động khởi tạo dữ liệu:**
   - Khi chạy lần đầu, hệ thống sẽ tự động tạo file dữ liệu SQLite và nạp sẵn các **Dataset mẫu** (Doanh số, Năng lượng...) để bạn trải nghiệm ngay mà không cần cấu hình database thủ công.

5. **Truy cập:**
   - Frontend: `http://localhost:3000` (hoặc cổng hiển thị trên terminal)
   - API Server: `http://localhost:3000/api`

## 💡 Cấu trúc Thư mục Chính
- `src/packages/`: Thư viện core các component biểu đồ.
- `src/views/project/dataManagement/`: Trung tâm quản lý dữ liệu và Auto-BI Wizard.
- `server/`: Mã nguồn server Node.js và dịch vụ AI.
- `src/store/`: Quản lý trạng thái toàn cục của dashboard và cấu hình canvas.

---
> **TiniX Visualization** - Biến dữ liệu thô thành những quyết định chiến lược.
