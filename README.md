  <h1>📊 TiniX Visualization (v0.2)</h1>
  <p><strong>Nền tảng Trực quan hóa Dữ liệu Thông minh, Bảo mật Cục bộ và Tự động hóa bằng AI</strong></p>
  <p>
    <img src="https://img.shields.io/badge/Version-0.2.0-blue" alt="Version 0.2.0" />
    <img src="https://img.shields.io/badge/Vue-3.x-brightgreen" alt="Vue 3" />
    <img src="https://img.shields.io/badge/Vite-4.x-blue" alt="Vite 4" />
    <img src="https://img.shields.io/badge/ECharts-5.x-red" alt="ECharts 5" />
    <img src="https://img.shields.io/badge/AI-Auto--BI-orange" alt="Auto-BI" />
  </p>
</div>

---

## 🌟 Giới thiệu

**TiniX Visualization** là một Low-Code Framework thế hệ mới chuyên sâu về xây dựng các Dashboard (bảng điều khiển) chuyên nghiệp và báo cáo phân tích. Được phát triển dựa trên triết lý **"Local-First, AI-Powered"**, TiniX cho phép doanh nghiệp và cá nhân biến những tập dữ liệu thô phức tạp thành các biểu đồ trực quan, sinh động chỉ trong vài giây mà không cần kỹ năng lập trình chuyên sâu.

---

## ✨ Tính năng Đột phá (Detailed Features)

### 1. 🤖 Hệ thống Auto-BI Wizard (AI-Powered Analytics)

TiniX không chỉ là công cụ vẽ biểu đồ, mà là một cộng sự phân tích dữ liệu chuyên nghiệp được trợ lực bởi AI:

- **Tự động Phân tích Schema:** Hệ thống tự động lấy mẫu dữ liệu (sampling), phân tích kiểu dữ liệu (Numeric, Category, Time, Geography) và gán nhãn logic cho từng cột.

- **AI Suggestion Engine:** Tích hợp với OpenRouter (hỗ trợ Qwen, GPT, Claude), hệ thống gửi thông tin Schema và yêu cầu AI gợi ý các góc nhìn (insights) quan trọng nhất. Kết quả trả về là một bộ 4-10 biểu đồ được cấu hình sẵn hoàn chỉnh.

- **Magic Generator:** Chỉ với 1 cú nhấp chuột, hệ thống tự động thiết lập Mapping (trục X, trục Y), chọn màu sắc (Theme), kích thước và bố cục tối ưu trên Dashboard.

- **Virtual Metrics:** AI có khả năng tự đề xuất các công thức tính toán mới dựa trên dữ liệu hiện có (ví dụ: Tỷ lệ chuyển đổi, Tăng trưởng doanh thu) và nhúng trực tiếp vào biểu đồ.

### 2. 🏪 Chợ Mẫu (Template Market) - *Mới ở v0.2*

TiniX v0.2 ra mắt kho tàng Dashboard mẫu chuyên sâu cho đa dạng lĩnh vực:

- **100+ Bản mẫu chuyên nghiệp**: Đủ các ngành nghề từ Tài chính, Nhân sự (HRM), Marketing, Logistics đến Y tế và Giáo dục.
- **Dễ dàng Tùy chỉnh**: Một click để sử dụng, tự động ánh xạ dữ liệu mẫu sang lĩnh vực thực tế của bạn qua hệ thống Semantic Mapping.

### 3. 🌐 Hệ thống Phát hành & Nhúng (Cloud Publishing) - *Mới ở v0.2*

Cho phép Dashboard thoát khỏi trình biên tập và tiếp cận người xem thực thụ:

- **Cloud Publishing**: Lưu trữ trực tiếp Dashboard lên Server SQLite để chia sẻ link công khai.
- **Mã nhúng Iframe**: Cung cấp đoạn mã nhúng chuyên nghiệp để hiển thị biểu đồ trên các website bên thứ ba (Webflow, WordPress, website nội bộ).
- **Trình xem Xem trước gọn nhẹ**: Dashboard hiển thị mượt mà trên Tab ẩn danh mà không yêu cầu phiên làm việc của Editor.

### 4. 📊 Thư viện Thành phần Trực quan hóa Đa dạng

TiniX sở hữu kho linh kiện (components) đồ sộ, được tối ưu hóa cho hiệu suất cao:

- **Nhóm Biểu đồ Phân tích (ECharts 5.x):** Đầy đủ các loại từ Bar (Cột), Line (Đường), Pie (Tròn), Radar (Radar), Funnel (Phễu), Heatmap (Nhiệt độ), TreeMap (Cấu trúc cây) đến Scatter (Phân tán).

- **Trực quan hóa Địa lý (Global Maps):** Bản đồ Thế Giới và Việt Nam (63 tỉnh thành) với khả năng ánh xạ dữ liệu theo tên tỉnh/quốc gia bằng Tiếng Việt. Biên giới được chuẩn hóa pháp lý, loại bỏ các yếu tố nhạy cảm.

- **Thành phần Trang trí & Media:** Hỗ trợ nhúng Video, Hình ảnh, Văn bản nghệ thuật, Đồng hồ thời gian thực và các đường Border trang trí Hi-tech.

- **Hiệu ứng Hoạt ảnh (Animations):** Tích hợp công nghệ WebGL và Animate.css, giúp Dashboard luôn sinh động và thu hút.

### 3. 🛡️ Kiến trúc Local-First & Bảo mật Tuyệt đối

Sự riêng tư của dữ liệu doanh nghiệp là ưu tiên hàng đầu:

- **Vận hành Cục bộ:** Toàn bộ mã nguồn và dữ liệu SQLite chạy trực tiếp trên hạ tầng của bạn. Không có dữ liệu kinh doanh nào được gửi ra ngoài (ngoại trừ Schema ẩn danh được gửi cho AI nếu bạn sử dụng Auto-BI).

- **Dataset Syncing:** Cơ chế đồng bộ dữ liệu thông minh giữa Frontend và Backend SQLite, đảm bảo dữ liệu luôn nhất quán và sẵn sàng ngay cả khi không có internet.

- **Zero-DB Setup:** Sử dụng SQLite tích hợp, người dùng không cần cài đặt các máy chủ cơ sở dữ liệu (MySQL, Postgres) phức tạp.

### 4. 🎨 Trình Biên tập (Editor) Chuyên nghiệp & Kéo thả (Drag-and-Drop)

Trải nghiệm thiết kế mượt mà như các phần mềm đồ họa chuyên nghiệp:

- **Infinite Canvas:** Không gian làm việc vô hạn với hệ thống lưới (Grid) hỗ trợ căn chỉnh chính xác cao.

- **Hệ thống Lớp (Layer Management):** Quản lý thứ tự hiển thị, khóa/ẩn các phần tử dễ dàng.

- **Right-click Context Menu:** Menu chuột phải đầy đủ các lệnh: Sao chép, Dán, Nhóm (Group), Hủy nhóm, Khóa, và Di chuyển vị trí.

- **Responsive Scaling Engine:** Dashboard tự động tính toán tỷ lệ (Zoom/Fit) để hiển thị đầy màn hình trên laptop, PC hay màn hình TV phòng điều hành mà không làm biến dạng tỷ lệ.

### 5. 🔗 Đồng bộ & Kết nối Dữ liệu Linh hoạt

- **Tải lên File:** Hỗ trợ trực tiếp Excel (.xlsx), CSV, JSON. Tự động xử lý các dòng trống và định dạng sai.

- **Connect REST API:** Cấu hình URL API để biểu đồ tự động lấy dữ liệu từ hệ thống có sẵn của doanh nghiệp.

- **Static Dataset:** Cho phép lưu trữ các bộ dữ liệu tĩnh ngay trong hệ thống để sử dụng lâu dài.

---

## 🏗️ Kiến trúc Hệ thống (Architecture)

TiniX Visualization được xây dựng trên một ngăn xếp công nghệ hiện đại, đảm bảo tốc độ và khả năng mở rộng:

- **Frontend Layer:**
  - **Framework:** Vue 3 (Composition API) + Vite (Build tool siêu tốc).
  - **State Management:** Pinia (Quản lý trạng thái Dashboard reactive).
  - **UI Engine:** Naive UI (Hệ thống component tinh tế).
  - **Components:** Kiến trúc đóng gói `src/packages` giúp dễ dàng mở rộng loại biểu đồ mới.
- **Backend Layer:**
  - **Runtime:** Node.js + Express.
  - **Persistence:** SQLite (Lưu trữ dữ liệu cục bộ, không cần cài đặt database server phức tạp).
- **AI Integration Core:**
  - Kết nối qua OpenRouter (Hỗ trợ Qwen, GPT-4, Claude) để thực hiện các tác vụ phân tích schema và gợi ý BI.

---

## 🚀 Hướng dẫn Cài đặt

### Yêu cầu Hệ thống

- **Node.js:** Phiên bản 16.14 trở lên.
- **Package Manager:** npm hoặc yarn.

### Bước 1: Clone dự án

```bash
git clone https://github.com/tinix-ai/tinix-visualization.git
cd tinix-visualization
```

### Bước 2: Cài đặt thư viện

```bash
npm install
```

### Bước 3: Cấu hình Môi trường

Hệ thống cần một API Key để chạy tính năng Auto-BI.

1. Sao chép file mẫu: `cp .env.example .env`.
2. Mở file `.env` và điền key của bạn:

   ```env
   OPENROUTER_API_KEY=your_key_here
   ```

#### 💡 Mô hình LLM khuyến nghị (Recommended Models)

Để tính năng **Auto-BI** đạt hiệu quả cao nhất (phân tích schema chính xác và gợi ý biểu đồ thông minh), bạn nên sử dụng các mô hình có khả năng lập trình (Coding) và tư vấn SQL tốt:

- **Qwen 2.5 72B / 122B:** (Ví dụ: `qwen/qwen-2.5-72b-instruct`) - Cực kỳ mạnh mẽ trong việc hiểu cấu trúc dữ liệu.
- **Qwen Coder Next:** (Ví dụ: `qwen/qwen-3-coder-next`) - Chuyên biệt cho các tác vụ xử lý mã nguồn và logic.
- **DeepSeek V3 / Coder:** Một lựa chọn tuyệt vời với chi phí thấp và hiệu năng cao.
- **GPT-4o / Claude 3.5 Sonnet:** Các mô hình hàng đầu thế giới cho độ chính xác tuyệt đối.

*Lưu ý: Bạn có thể thay đổi model trong file `server/ai.service.js` hoặc qua biến môi trường `OPENROUTER_MODEL`.*

### Bước 4: Khởi chạy

```bash
# Chạy đồng thời cả Frontend (Cổng 3000) và Backend Server (Cổng 4000)
npm run dev:all
```

---

## 📖 Hướng dẫn Sử dụng (Quick Start)

1. **Khởi tạo:** Truy cập `http://localhost:3000`, nhấn nút **"Tạo mới"**.
2. **Dữ liệu:** Chọn **"Import Data"** để tải lên file Excel hoặc CSV của bạn.
3. **AI Magic:** Sử dụng **Auto-BI Wizard**, nhấn **"Analyze"** để AI quét dữ liệu và **"Suggest Charts"** để nhận các đề xuất Dashboard.
4. **Tùy chỉnh:** Tại màn hình Editor, bạn có thể tự do thay đổi màu sắc, thêm tiêu đề, hiệu ứng hoạt ảnh và cấu hình tỷ lệ co giãn.
5. **Lưu trữ:** Nhấn **"Save"** để lưu dự án vào database cục bộ.

---

## 🗺️ Lộ trình Phát triển (Roadmap)

TiniX Visualization đang liên tục được cải tiến với mục tiêu trở thành nền tảng BI tự động hàng đầu cho doanh nghiệp Việt:

- **Trợ lý Ảo Hỏi đáp Số liệu (AI Data Assistant):** Tích hợp Chatbot thông minh cho phép người dùng đặt câu hỏi trực tiếp về số liệu (ví dụ: "Doanh thu tháng này tăng bao nhiêu % so với tháng trước?") và nhận câu trả lời tức thì kèm biểu đồ minh họa.
- **Data Connector Mở rộng:** Hỗ trợ kết nối trực tiếp với các cơ sở dữ liệu phổ biến như SQL Server, MySQL, PostgreSQL và MongoDB.
- **Giao diện Tích hợp Nâng cao**: Cung cấp SDK riêng để tích hợp sâu Dashboard vào các ứng dụng SaaS.

---

## 🤝 Đóng góp & Bản quyền

Dự án được phát triển và duy trì bởi cộng đồng **TiniX.ai**.

Chúng tôi hoan nghênh mọi sự đóng góp (Pull Request), báo lỗi (Issues) hoặc các ý tưởng cải tiến từ cộng đồng.

---

<div align="center">
  <p>Được xây dựng với ❤️ nhằm mang lại sức mạnh dữ liệu cho mọi người.</p>
  <p>© 2026 TiniX.ai - Powered by Dagoras</p>
</div>
