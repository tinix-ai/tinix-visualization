<div align="center">
  <h1>📊 TiniX Visualization</h1>
  <p><strong>Nền tảng Thiết kế Bảng Điều Khiển (Dashboard) Kéo-Thả & Phân tích Dữ liệu Trực quan Tối giản, Bảo mật Cục bộ và Tuyệt đẹp</strong></p>
</div>

---

## 🌟 Giới thiệu tổng quan
**TiniX Visualization** là một Low-Code Framework chuyên xây dựng và vận hành các Hệ thống Trực quan hóa Dữ liệu (Data Visualization Dashboard). Dựa trên lõi Vue 3 và công nghệ biểu đồ đa dạng (ECharts, VChart), hệ thống cho phép người dùng từ Giám đốc mảng, Phân tích viên Data đến Kỹ sư Hệ thống đều có thể tạo ra các bảng thông tin trực quan chuyên nghiệp.

Dự án mang lại một giao diện người dùng **hoàn toàn 100% Tiếng Việt (Sạch bóng ngôn ngữ ngoại vùng)**, hỗ trợ thao tác dựng biểu đồ kéo-thả trên trình duyệt mà không cần viết code. Đặc biệt, TiniX Visualization ưu tiên quy trình lưu trữ, trích xuất cấu hình (JSON Config) độc lập mà không bắt buộc cài đặt CSDL Database phức tạp.

## ✨ Tính năng Nổi bật
- **Kéo thả Trực quan (Drag & Drop):** Cung cấp không gian làm việc (Canvas) linh hoạt, hỗ trợ Snap-to-Grid, Quản lý đa Lớp (Layer), và tính năng Nhóm (Group/Ungroup) tiện lợi như phần mềm Design.
- **Thư viện Biểu đồ Đồ sộ:** Tích hợp hơn 50+ loại Khối hiển thị từ Cổ điển (Cột, Đường, Tròn) đến Chuyên sâu (Bản đồ Nhiệt, Phễu, Lưới, Đồng hồ Đo, Radar, Biểu đồ Nước...).
- **Hệ thống Pipeline Dữ liệu Thông minh:**
  - Hỗ trợ Dữ liệu Tĩnh cục bộ.
  - Tương tác API Động (Fetch REST API tuần hoàn theo giây, tuỳ chỉnh Request Header & Params).
  - Tích hợp WebSockets/MQTT cho các định dạng biểu đồ theo thời gian thực (Real-time update).
  - Xử lý mảng và Format tiền kỳ qua ngôn ngữ JavaScript nội tuyến.
- **Tuỳ biến Giao diện Nâng cao:**
  - Engine CSS mở rộng: Filter (Độ tương phản, Hue Rotate, Độ Sáng, Bóng mờ).
  - Chế độ Trộn Màu (Blend Mode) Layer chồng Layer chuẩn xác như phần mềm Photoshop / Figma.
- **Phát hành File Cục Bộ (Local Publish):** Đóng gói và phát hành bản thiết kế thành file cấu hình chuẩn dạng `.json`. Tải về trọn vẹn, khôi phục cấu hình và chia sẻ bất cứ phút nào.
- **Môi trường Toàn việt hóa:** Toàn bộ giao diện, tài liệu, thuật ngữ cảnh báo, Log Event đã được Việt hoá triệt để, xóa sổ hoàn toàn tiếng Trung rác, mang lại môi trường vận hành an toàn cho các tác vụ nội bộ (Internal Tool).

## 🛠 Ngăn xếp Công nghệ (Tech Stack)
* **Core Framework:** Vue 3.x (Composition API / Hooks)
* **Ngôn ngữ Types:** TypeScript 4.x
* **Trình Đóng Gói (Build Tool):** Vite 4.x
* **State Management:** Pinia 2.x
* **Bộ UI Components:** Naive UI (Theme Darkmode)
* **Chart Rendering Engines:** ECharts 5.x, VChart
* **Styling Logic:** SCSS, CSS Variables

## 🚀 Hướng dẫn Cài đặt & Khởi động
Hệ thống là một ứng dụng **Single Page Application (SPA)**, hoạt động trơn tru dựa trên sức mạnh của Client-side. Vui lòng đảm bảo nền tảng OS đã cài đặt Node.js (>= 16.x) và Node Package Manager.

1. **Cài đặt thư viện phụ thuộc:**
   ```bash
   npm install
   # Hoặc nếu dùng pnpm (khuyên dùng):
   # pnpm install
   ```

2. **Khởi chạy Môi trường Phát triển (Development):**
   ```bash
   npm run dev
   ```

3. **Đóng gói Triển khai (Production Build):**
   ```bash
   npm run build
   ```
   > Sau khi lệnh trên hoàn tất, hãy trích xuất thư mục `dist` đưa lên các Web Server tĩnh (VD: Nginx, Apache, Netlify, Github Pages...) để truy cập Public.

## 💡 Cấu trúc Trọng điểm
- `src/packages/`: Khu vực chứa toàn bộ Nhân (Core Engine) của các Đối tượng Component (Biểu đồ, Khối Text, Hình ảnh, Input Form, Decorate...).
- `src/views/chart/`: Trang quản lý Bàn Làm Việc (Workbench) và hệ thống công cụ đồ hoạ Drag-and-drop thiết lập Dashboard.
- `src/api/`: Quản lý các cấu trúc Request gọi API và Mock Data giả lập cấu hình.
- `src/settings/`: Cấu trúc màu sắc, Setting Theme (Sáng/Tối) và Thông số mặc định dự án.

## 📝 Khai báo Giấy phép và Nguồn gốc
Dự án được khởi nguồn dựa trên bộ khung lõi mã nguồn mở từ hệ sinh thái [GoView] kết hợp với các tinh chỉnh sâu rộng về mặt giao diện, dọn dẹp ngôn ngữ (Localization-Vietnam) triệt để và thay thế mô hình triển khai Back-end/Front-end nhằm tối ưu hóa 100% phù hợp với mục đích và hành vi sử dụng tại tổ chức nội bộ/Việt Nam.

---
> Xin trân trọng cảm ơn bạn đã quan tâm và xây dựng cùng **TiniX Visualization!**
