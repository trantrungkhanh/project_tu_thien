# project_tu_thien

## Hướng dẫn setup môi trường
    1. Cài đặt nodejs
    2. Cài đặt mysql và restore filde dump database trong thư mục ngoài cùng của project
    3. Chạy lệnh "npm install -y" trong 2 thư mục /Source/frontend và /Source/backend
    4. Vào thư mục /Source/backend/, chỉnh sửa file .env thành thông tin database của mình mới tạo phía trên
    5. Mở 2 terminal, 1 terminal ở thư mục /Source/frontend và chạy lệnh "npm start", 1 terminal ở thư mục /Source/backend và chạy lệnh "node index.js"
    6. Truy cập vào website bằng http://127.0.0.1/home (Không sử dụng localhost, nếu sử dụng localhost sẽ không gửi OTP về số điện thoại được)
    7. Tài khoản để login vào admin (admin/123456)

## Chức năng chính
    1. Tạo tài khoản (Người đóng góp, người nhận hỗ trợ, tổ chức từ thiện) và gửi OTP về số điện thoại đăng kí để xác thực
    (Không trùng tên tài khoản, email và số điện thoại)
    2. Chức năng theo từng vai trò:
        - Người nhận hỗ trợ:
            + Chỉnh sửa thông tin cá nhân, cập nhật mật khẩu
            + Xem các thông tin về chiến dịch, bình luận và đánh giá về các chiến dịch
        - Người đóng góp:
        + Chỉnh sửa thông tin cá nhân, cập nhật mật khẩu
            + Được xem tất cả các thông tin
            + Đóng góp theo từng chiến dịch và nhận được thông báo về email khi quyên góp của mình được xác nhận
            + Xuất báo cáo về chiến dịch
            + Nhận được thông báo về email khi chiến dịch mình đã từng đóng góp có cập nhật mới
            + Đánh giá, bình luận chiến dịch
        - Tổ chức từ thiện:
            + Khi tạo tài khoản với vai trò tổ chức từ thiện thì thông tin tổ chức từ thiện sẽ được tạo tự động với trạng thái là "Đang chờ duyệt"
            + Chỉnh sửa thông tin tổ chức từ thiện và upload hình ảnh giấy tờ chứng nhận được hoạt động
            + Chỉnh sửa thông tin cá nhân, cập nhật mật khẩu
            + Nhận được email thông báo khi được quản trị viên chấp nhận hoạt động của tổ chức từ thiện, trạng thái sẽ chuyển sang "Đang hoạt động"
            + Tạo chiến dịch mới, quản lí cập nhật các chiến dịch cũ
            + Xuất báo cáo của chiến dịch
        - Quản trị viên:
            + Quản lí tài khoản user
            + Quản lí chiến dịch (Xóa - xuất báo cáo)
            + QUản lí tổ chức từ thiện (Chuyển đổi trạng thái của tổ chức: Đang hoạt động - Dừng hoạt động)
            + Quản lí quyên góp (Xác nhận quyên góp)
    3. Màn hình home:
        - Chuyển đổi theme sáng/tối
        - Danh sách các chiến dịch, tổ chức từ thiện
        - Đánh giá của người dùng
        - Bản tin sẽ được lấy và cập nhật theo nguồn: nhandan.vn