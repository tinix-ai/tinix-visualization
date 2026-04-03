# CHANGELOG

Tất cả những thay đổi quan trọng của dự án **TiniX Visualization** sẽ được lưu trữ tại đây.

## [0.2.0] - 2026-04-03

### ✨ Tính năng mới (New Features)

- **Chợ Mẫu (Template Market) 1.0**: Chính thức ra mắt kho 100+ Dashboard mẫu chuyên nghiệp cho nhiều lĩnh vực: Tài chính, Nhân sự, Y tế, Logistics, Giáo dục...
- **Hệ thống Phát hành (Cloud Publishing)**: Cho phép lưu trữ Dashboard lên server và cung cấp Mã nhúng Iframe/Link chia sẻ công khai mà không cần qua Editor.
- **Bản đồ Toàn cầu (Global Maps)**: Chuẩn hóa dữ liệu bản đồ thế giới và Việt Nam, thay thế các bản đồ mặc định cũ.

### 🛠️ Cải tiến & Tối ưu (Improvements)

- **Tối ưu hóa ECharts**: Khắc phục lỗi phân cấp `normal` trong cấu hình ECharts, tương thích tốt hơn với phiên bản 5.x.
- **Cleanup Project**: Dọn dẹp các script phát triển dư thừa (`fix-echarts-issues.js`, `generate-templates.js`) và các tài nguyên ảnh placeholder cũ để giảm dung lượng source code.
- **Hiệu suất trang Preview**: Tăng tốc độ tải dữ liệu Dashboard từ SQLite khi truy cập trực tiếp qua link chia sẻ.

## [0.1.0] - 2026-03-15

### ✨ Tính năng cơ bản (Initial Release)

- **Dashboard Editor**: Trình biên tập kéo thả với Canvas vô hạn.
- **Auto-BI AI Wizard**: Tự động phân tích Schema và gợi ý biểu đồ thông minh qua LLM.
- **Local-first Architecture**: Lưu trữ dữ liệu cục bộ an toàn với SQLite.
- **Thư viện Component**: Hỗ trợ đầy đủ các loại biểu đồ ECharts cơ bản.
