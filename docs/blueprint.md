# **App Name**: FaceChecker

## Core Features:

- Face Registration UI: User interface for employees to register their faces using the device's camera. The UI will guide the user to capture images from multiple angles, ensuring comprehensive facial data capture. Instructions shall guide the user to capture the face from different angles.
- Facial Recognition: AI-powered facial recognition system using live camera feed to detect and verify registered employees for attendance tracking.
- Admin Dashboard: A simple admin page to view attendance logs and manage employee information.

## Style Guidelines:

- Primary color: White or light grey for a clean and professional look.
- Secondary color: Dark blue or grey for text and backgrounds.
- Accent: Teal (#008080) to highlight interactive elements and important information.
- Clean and intuitive layout with clear visual hierarchy.
- Use consistent and professional icons for navigation and actions.

## Original User Request:
Hệ thống Đăng ký và Điểm danh Nhân viên bằng Nhận diện Khuôn mặt với Firebase
Mục tiêu
Xây dựng một web app đơn giản sử dụng Firebase cho phép:

Nhân viên đăng ký khuôn mặt của họ
Hệ thống điểm danh tự động qua nhận diện khuôn mặt từ camera
Quản lý thông tin điểm danh nhân viên

Kiến trúc hệ thống với Firebase
Frontend

HTML/CSS/JavaScript với React
WebRTC để truy cập camera
Face-api.js cho nhận diện khuôn mặt và liveness detection
TensorFlow.js cho xử lý dữ liệu khuôn mặt
Firebase SDK cho web

Backend

Firebase Authentication cho đăng nhập/xác thực
Firebase Cloud Functions thay thế cho server Node.js
Firebase Hosting để triển khai ứng dụng web

Cơ sở dữ liệu

Firebase Firestore để lưu thông tin nhân viên và dữ liệu điểm danh
Firebase Storage để lưu trữ ảnh khuôn mặt (nếu cần)
Cấu trúc lưu trữ vector đặc trưng khuôn mặt trong Firestore

Quy trình đăng ký khuôn mặt
Giao diện đăng ký

Xác thực người dùng qua Firebase Authentication
Form thông tin nhân viên (ID, tên, phòng ban, vị trí)
Truy cập camera trực tiếp (không cho phép upload ảnh có sẵn)
Hướng dẫn từng bước để chụp khuôn mặt ở các góc độ khác nhau

Xác thực khuôn mặt

Liveness detection để đảm bảo người thật

Yêu cầu thực hiện cử chỉ ngẫu nhiên (nhìn trái, phải, nháy mắt)
Phân tích chuyển động tự nhiên
Kiểm tra ánh sáng và chất lượng hình ảnh


Xác minh khuôn mặt hợp lệ

Kiểm tra góc độ khuôn mặt
Đảm bảo khuôn mặt đầy đủ trong khung hình
Xác nhận độ rõ nét và ánh sáng phù hợp



Thu thập dữ liệu

Chụp ít nhất 5 ảnh khuôn mặt từ các góc độ khác nhau
Yêu cầu quay video ngắn 5 giây để trích xuất thêm frame
Áp dụng data augmentation để tăng cường dataset
Trích xuất vector đặc trưng và lưu vào Firestore

Quy trình điểm danh
Giao diện điểm danh

Truy cập camera
Hiển thị khung định vị khuôn mặt
Kết quả nhận diện thời gian thực

Xử lý nhận diện

Phát hiện khuôn mặt trong frame
Thực hiện liveness detection
Trích xuất vector đặc trưng
Truy vấn Firestore để so sánh với dữ liệu đã lưu
Hiển thị kết quả nhận diện (tên nhân viên, ID)
Ghi nhận thời gian điểm danh vào Firestore

Xử lý ngoại lệ

Thông báo nếu không tìm thấy khuôn mặt
Cảnh báo nếu phát hiện liveness check không thành công
Cho phép nhập ID thủ công trong trường hợp hệ thống không nhận diện được

Trang quản lý
Tính năng quản lý

Xác thực quyền quản trị viên với Firebase Authentication
Xem danh sách nhân viên đã đăng ký từ Firestore
Báo cáo điểm danh theo ngày/tuần/tháng
Xuất báo cáo định dạng Excel/PDF (qua Cloud Functions)
Quản lý thông tin nhân viên (thêm, sửa, xóa trong Firestore)

Bảo mật

Phân quyền người dùng với Firebase Authentication
Bảo mật dữ liệu với Firebase Security Rules
Log hoạt động hệ thống qua Firebase Analytics

Triển khai
Yêu cầu kỹ thuật

Tài khoản Firebase (có thể sử dụng gói miễn phí để bắt đầu)
HTTPS được cung cấp tự động qua Firebase Hosting
Phù hợp với hạn chế về tài nguyên trong gói Firebase miễn phí

Quy trình phát triển

Thiết lập dự án Firebase và cấu hình các dịch vụ
Phát triển prototype đăng ký khuôn mặt với xác thực Firebase
Triển khai hệ thống nhận diện cơ bản
Thêm liveness detection
Phát triển trang quản lý với quyền phù hợp
Tối ưu hiệu suất và độ chính xác
Triển khai qua Firebase Hosting
  