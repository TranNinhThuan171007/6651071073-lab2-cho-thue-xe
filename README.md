# BÁO CÁO BÀI TẬP THỰC HÀNH BUỔI 2 - THIẾT KẾ WEB
## HỆ THỐNG CHO THUÊ XE Ô TÔ CAO CẤP - AUTORENT

---

### 📌 THÔNG TIN SINH VIÊN & ĐỀ TÀI
* **Họ và tên sinh viên:** Trần Ninh Thuận
* **Mã số sinh viên (MSSV):** 6651071073
* **Môn học:** Thực hành Thiết kế Web (Lab 2)
* **Bộ tham số đề bài (D=6, F=3, C=1):**
  * **Đề tài ($D = 6$):** Hệ thống Cho thuê xe ô tô (AutoRent).
  * **Tính năng chuyên biệt ($F = 3$):** Hiệu ứng chuyển trang mượt mà (*Page Transition Animation*) với React Router v7.
  * **Màu sắc chủ đạo ($C = 1$):** Xanh ngọc bích (*Emerald* `#059669`).
* **Repository GitHub:** [https://github.com/TranNinhThuan171007/6651071073-lab2-cho-thue-xe.git](https://github.com/TranNinhThuan171007/6651071073-lab2-cho-thue-xe.git)

---

### 🚀 CÔNG NGHỆ SỬ DỤNG
* **Core:** React 19, TypeScript (Strict Mode).
* **Build Tool:** Vite 8.
* **Styling:** Tailwind CSS v3, Lucide React Icons.
* **Routing:** React Router v7.
* **Data Visualization:** Recharts (Biểu đồ phân tích giá thuê & lượt thuê).
* **Testing:** Vitest & React Testing Library.
* **Tiêu chuẩn thiết kế:** Responsive (Mobile/Tablet/Desktop), Web Accessibility (WCAG 2.1 AA).

---

### 📋 DANH SÁCH CHỨC NĂNG HOÀN THÀNH

#### 1. Giao diện & Trải nghiệm người dùng (UI/UX)
- [x] **Header & Navigation:** Thanh điều hướng sticky, logo AutoRent nổi bật, liên kết nhanh đến danh mục xe và biểu đồ thống kê, hotline 24/7.
- [x] **Hero Banner:** Giới thiệu dịch vụ chuẩn 5 sao với 4 cam kết chất lượng (Bảo hiểm 2 chiều, giao xe tận nơi, không giữ hộ chiếu, xe đời 2023–2024).
- [x] **Lưới hiển thị xe (Grid):** Hiển thị 22 dòng xe đời mới, kích thước khung ảnh cố định `h-52` cân đối 100%, có badge trạng thái "Sẵn sàng giao" / "Đang có khách".
- [x] **Footer:** Đầy đủ thông tin liên hệ, bản quyền sinh viên, email cá nhân `vipthuantran@gmail.com`, hotline 1900 6651.

#### 2. Bộ lọc & Tìm kiếm đa năng (Filter & Search)
- [x] **Tìm kiếm:** Tìm nhanh theo tên xe, thương hiệu (VinFast, Toyota, Mercedes, Ford, Kia...) hoặc địa điểm giao nhận xe.
- [x] **Lọc theo phân khúc:** Xe điện, SUV 7 chỗ, SUV 5 chỗ, Sedan, MPV cao cấp, Bán tải.
- [x] **Lọc theo loại nhiên liệu:** Xăng, Dầu (Diesel), Điện, Hybrid.
- [x] **Lọc theo khoảng giá thuê:** Thanh trượt kép tùy chỉnh từ 500.000₫ đến 5.000.000₫/ngày kết hợp các nút chọn nhanh (Preset buttons).
- [x] **Nút Reset:** Đặt lại toàn bộ bộ lọc về trạng thái ban đầu chỉ với 1 cú click.

#### 3. Trang chi tiết xe (DetailPage)
- [x] **Breadcrumb Navigation:** Điều hướng phân cấp Trang chủ ➔ Phân khúc xe ➔ Tên xe.
- [x] **Thông số kỹ thuật chi tiết:** Động cơ, mã lực, mức tiêu hao nhiên liệu/điện năng, năm sản xuất.
- [x] **Trang bị tiện nghi:** Hiển thị danh sách tính năng nổi bật (ADAS, HUD, âm thanh cao cấp, cửa sổ trời...).
- [x] **Gợi ý xe cùng phân khúc:** Hiển thị các mẫu xe tương tự để khách hàng dễ dàng so sánh.

#### 4. Modal đặt xe & Form kiểm tra (Booking Modal)
- [x] Modal popup đặt xe nhanh với tính toán tổng chi phí tự động theo số ngày thuê.
- [x] Kiểm tra hợp lệ dữ liệu nhập (Họ tên, số điện thoại, định dạng email, ngày nhận xe).
- [x] Hỗ trợ Accessibility (Focus trap và phím tắt `Escape` để đóng modal).

#### 5. Biểu đồ thống kê (Recharts)
- [x] **Biểu đồ cột:** Thống kê mức giá thuê trung bình theo từng phân khúc xe.
- [x] **Biểu đồ thanh:** Xếp hạng Top 6 dòng xe có lượt thuê nhiều nhất hệ thống.

#### 6. Tính năng chuyên biệt ($F = 3$)
- [x] Hiệu ứng chuyển động mượt mà (*Page Transition Animation*) khi chuyển đổi giữa trang danh sách và trang chi tiết xe (`.page-enter-active`).

#### 7. Kiểm thử phần mềm (Unit Testing)
- [x] Bộ test unit viết bằng Vitest trong `src/utils.test.ts` kiểm thử toàn diện các hàm tiện ích:
  - `formatCurrency()`: Định dạng tiền tệ VND chuẩn xác.
  - `truncateText()`: Cắt ngắn văn bản không làm vỡ layout.
  - `validateEmail()`: Kiểm tra định dạng email hợp lệ.
  - `debounce()`: Tối ưu hiệu năng tìm kiếm tránh re-render thừa.

---

### 💻 HƯỚNG DẪN CÀI ĐẶT & CHẠY DỰ ÁN

```bash
# 1. Cài đặt các gói thư viện
npm install

# 2. Khởi chạy máy chủ phát triển (Development Server)
npm run dev

# 3. Chạy bộ kiểm thử (Unit Tests)
npm run test

# 4. Biên dịch mã nguồn cho môi trường Production
npm run build
```

---

© 2026 AutoRent - Trần Ninh Thuận (MSSV: 6651071073).
