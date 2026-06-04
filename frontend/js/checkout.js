
// =============================================================
//  CHECKOUT.JS - NovaStation
//  Bao gồm: Địa chỉ Việt Nam, Mã giảm giá, Bill/Hóa đơn
// =============================================================

// ---- DỮ LIỆU ĐỊA CHỈ VIỆT NAM (Rút gọn, bao gồm 63 tỉnh/thành) ----
const VN_ADDRESS = {
    "Hà Nội": {
        "Ba Đình": ["Cống Vị","Điện Biên","Đội Cấn","Giảng Võ","Kim Mã","Liễu Giai","Ngọc Hà","Ngọc Khánh","Phúc Xá","Quán Thánh","Thành Công","Vĩnh Phúc"],
        "Hoàn Kiếm": ["Chương Dương","Cửa Đông","Cửa Nam","Đồng Xuân","Hàng Bạc","Hàng Bài","Hàng Bồ","Hàng Buồm","Hàng Đào","Hàng Gai","Hàng Mã","Lý Thái Tổ","Phan Chu Trinh","Phúc Tân","Tràng Tiền","Trần Hưng Đạo"],
        "Đống Đa": ["Cát Linh","Hàng Bột","Khâm Thiên","Kim Liên","Láng Hạ","Láng Thượng","Nam Đồng","Ngã Tư Sở","Nguyễn Trãi","Ô Chợ Dừa","Phương Liên","Phương Mai","Quang Trung","Quốc Tử Giám","Thịnh Quang","Thổ Quan","Trung Liệt","Trung Phụng","Văn Chương","Văn Miếu"],
        "Hai Bà Trưng": ["Bách Khoa","Bạch Đằng","Bùi Thị Xuân","Cầu Dền","Đống Mác","Đồng Nhân","Đồng Tâm","Lê Đại Hành","Minh Khai","Nguyễn Du","Phạm Đình Hổ","Phố Huế","Quỳnh Lôi","Quỳnh Mai","Thanh Nhàn","Thanh Lương","Trương Định","Vĩnh Tuy"],
        "Tây Hồ": ["Bưởi","Nhật Tân","Phú Thượng","Quảng An","Tây Hồ","Thụy Khuê","Xuân La","Yên Phụ"],
        "Cầu Giấy": ["Dịch Vọng","Dịch Vọng Hậu","Mai Dịch","Nghĩa Đô","Nghĩa Tân","Quan Hoa","Trung Hòa","Yên Hòa"],
        "Hoàng Mai": ["Đại Kim","Định Công","Giáp Bát","Hoàng Liệt","Hoàng Văn Thụ","Lĩnh Nam","Mai Động","Tân Mai","Thanh Trì","Thịnh Liệt","Trần Phú","Tương Mai","Vĩnh Hưng","Yên Sở"],
        "Thanh Xuân": ["Hạ Đình","Khương Đình","Khương Mai","Khương Trung","Kim Giang","Nhân Chính","Phương Liệt","Thanh Xuân Bắc","Thanh Xuân Nam","Thanh Xuân Trung","Thượng Đình"],
        "Nam Từ Liêm": ["Cầu Diễn","Đại Mỗ","Mễ Trì","Mỹ Đình I","Mỹ Đình II","Phú Đô","Phương Canh","Tây Mỗ","Trung Văn","Xuân Phương"],
        "Bắc Từ Liêm": ["Cổ Nhuế I","Cổ Nhuế II","Đông Ngạc","Đức Thắng","Liên Mạc","Minh Khai","Phú Diễn","Phúc Diễn","Tây Tựu","Thụy Phương","Thượng Cát","Xuân Đỉnh","Xuân Tảo"]
    },
    "TP. Hồ Chí Minh": {
        "Quận 1": ["Bến Nghé","Bến Thành","Cô Giang","Cầu Kho","Cầu Ông Lãnh","Đa Kao","Nguyễn Cư Trinh","Nguyễn Thái Bình","Phạm Ngũ Lão","Tân Định"],
        "Quận 3": ["Võ Thị Sáu","Phường 1","Phường 2","Phường 3","Phường 4","Phường 5","Phường 6","Phường 7","Phường 8","Phường 9","Phường 10","Phường 11","Phường 12","Phường 13","Phường 14"],
        "Quận 5": ["Phường 1","Phường 2","Phường 3","Phường 4","Phường 5","Phường 6","Phường 7","Phường 8","Phường 9","Phường 10","Phường 11","Phường 12","Phường 13","Phường 14","Phường 15"],
        "Quận 7": ["Bình Thuận","Phú Mỹ","Phú Thuận","Tân Hưng","Tân Kiểng","Tân Phong","Tân Phú","Tân Quy","Tân Thuận Đông","Tân Thuận Tây"],
        "Bình Thạnh": ["Phường 1","Phường 2","Phường 3","Phường 5","Phường 6","Phường 7","Phường 11","Phường 12","Phường 13","Phường 14","Phường 15","Phường 17","Phường 19","Phường 21","Phường 22","Phường 24","Phường 25","Phường 26","Phường 27","Phường 28"],
        "Gò Vấp": ["Phường 1","Phường 3","Phường 4","Phường 5","Phường 6","Phường 7","Phường 8","Phường 9","Phường 10","Phường 11","Phường 12","Phường 13","Phường 14","Phường 15","Phường 16","Phường 17"],
        "Tân Bình": ["Phường 1","Phường 2","Phường 3","Phường 4","Phường 5","Phường 6","Phường 7","Phường 8","Phường 9","Phường 10","Phường 11","Phường 12","Phường 13","Phường 14","Phường 15"],
        "Thủ Đức": ["Bình Chiểu","Bình Thọ","Hiệp Bình Chánh","Hiệp Bình Phước","Linh Chiểu","Linh Đông","Linh Tây","Linh Trung","Linh Xuân","Long Bình","Long Phước","Long Thạnh Mỹ","Long Trường","Phú Hữu","Phước Bình","Phước Long A","Phước Long B","Tam Bình","Tam Phú","Tăng Nhơn Phú A","Tăng Nhơn Phú B","Thảo Điền","Trường Thọ"]
    },
    "Đà Nẵng": {
        "Hải Châu": ["Bình Hiên","Bình Thuận","Hải Châu I","Hải Châu II","Hòa Cường Bắc","Hòa Cường Nam","Hòa Thuận Đông","Hòa Thuận Tây","Nam Dương","Phước Ninh","Thạch Thang","Thanh Bình","Thuận Phước"],
        "Thanh Khê": ["An Khê","Chính Gián","Hòa Khê","Tam Thuận","Tân Chính","Thạc Gián","Thanh Khê Đông","Thanh Khê Tây","Vĩnh Trung","Xuân Hà"],
        "Sơn Trà": ["An Hải Bắc","An Hải Đông","An Hải Tây","Mân Thái","Nại Hiên Đông","Phước Mỹ","Thọ Quang"],
        "Ngũ Hành Sơn": ["Hòa Hải","Hòa Quý","Khuê Mỹ","Mỹ An"],
        "Cẩm Lệ": ["Hòa An","Hòa Phát","Hòa Thọ Đông","Hòa Thọ Tây","Hòa Xuân","Khuê Trung"],
        "Liên Chiểu": ["Hòa Hiệp Bắc","Hòa Hiệp Nam","Hòa Khánh Bắc","Hòa Khánh Nam","Hòa Minh"]
    },
    "Hải Phòng": {
        "Hồng Bàng": ["Hoàng Văn Thụ","Minh Khai","Phan Bội Châu","Phạm Hồng Thái","Quán Toan","Sở Dầu","Thượng Lý","Trại Chuối"],
        "Ngô Quyền": ["Cầu Đất","Cầu Tre","Đổng Quốc Bình","Gia Viên","Lạch Tray","Lê Lợi","Máy Chai","Máy Tơ","Vạn Mỹ"],
        "Lê Chân": ["An Biên","An Dương","Cát Dài","Dư Hàng","Dư Hàng Kênh","Đông Hải","Hàng Kênh","Kênh Dương","Lam Sơn","Nam Hải","Niệm Nghĩa","Nghĩa Xá","Trần Nguyên Hãn","Trại Cau","Vĩnh Niệm"],
        "Hải An": ["Đằng Giang","Đằng Hải","Đằng Lâm","Đông Hải I","Đông Hải II","Nam Hải","Thành Tô"],
        "Kiến An": ["Bắc Sơn","Đồng Hòa","Nam Sơn","Phù Liễn","Quán Trữ","Tràng Minh","Trần Thành Ngọ"]
    },
    "Cần Thơ": {
        "Ninh Kiều": ["An Bình","An Cư","An Hòa","An Khánh","An Lạc","An Nghiệp","An Phú","Cái Khế","Hưng Lợi","Tân An","Thới Bình","Xuân Khánh"],
        "Bình Thủy": ["An Thới","Bình Thủy","Bùi Hữu Nghĩa","Long Hòa","Long Tuyền","Thới An","Trà An","Trà Nóc"],
        "Cái Răng": ["Ba Láng","Hưng Phú","Hưng Thạnh","Lê Bình","Phú Thứ","Thường Thạnh","Tân Phú"],
        "Ô Môn": ["Long Hưng","Phước Thới","Thới An","Thới Long","Trường Lạc"]
    },
    "Bình Dương": {
        "TP. Thủ Dầu Một": ["Chánh Mỹ","Chánh Nghĩa","Định Hòa","Hiệp An","Hiệp Thành","Hòa Phú","Phú Cường","Phú Hòa","Phú Lợi","Phú Mỹ","Phú Thọ","Tân An","Tương Bình Hiệp"],
        "Dĩ An": ["An Bình","Bình An","Bình Thắng","Đông Hòa","Tân Bình","Tân Đông Hiệp"],
        "Thuận An": ["An Phú","An Thạnh","Bình Chuẩn","Bình Hòa","Bình Nhâm","Hưng Định","Lái Thiêu","Thuận Giao","Vĩnh Phú"]
    },
    "Đồng Nai": {
        "Biên Hòa": ["An Bình","An Hòa","Bình Đa","Bửu Hòa","Bửu Long","Hòa Bình","Hiệp Hòa","Long Bình","Long Bình Tân","Tân Biên","Tân Hiệp","Tân Hòa","Tân Mai","Tân Phong","Thống Nhất","Trảng Dài","Trung Dũng","Tân Tiến"],
        "Long Khánh": ["An Lộc","Bảo Quang","Bảo Vinh","Bình Lộc","Phú Bình","Suối Tre","Xuân An","Xuân Bình","Xuân Hòa","Xuân Lập","Xuân Thanh","Xuân Tân"]
    },
    "Khánh Hòa": {
        "Nha Trang": ["Phước Hải","Phước Hòa","Phước Long","Phước Tiến","Tân Lập","Vạn Thắng","Vạn Thạnh","Vĩnh Hải","Vĩnh Hòa","Vĩnh Nguyên","Vĩnh Phước","Vĩnh Thọ","Vĩnh Trường","Xương Huân"]
    },
    "Thừa Thiên Huế": {
        "TP. Huế": ["An Cựu","An Đông","An Hòa","An Tây","Đúc","Hương Long","Hương Sơ","Kim Long","Phú Bình","Phú Cát","Phú Hiệp","Phú Hòa","Phú Hội","Phú Nhuận","Phú Thuận","Phước Vĩnh","Tây Lộc","Thuận Hòa","Thuận Lộc","Thuận Thành","Trường An","Vỹ Dạ","Xuân Phú"]
    },
    "Bà Rịa - Vũng Tàu": {
        "Vũng Tàu": ["Nguyễn An Ninh","Phước Thắng","Phước Trung","Rạch Dừa","Thắng Nhất","Thắng Nhì","Thắng Tam","Vũng Tàu"]
    },
    "Lâm Đồng": {
        "Đà Lạt": ["Phường 1","Phường 2","Phường 3","Phường 4","Phường 5","Phường 6","Phường 7","Phường 8","Phường 9","Phường 10","Phường 11","Phường 12","Xuân Thọ","Xuân Trường","Tà Nung"]
    },
    "An Giang": { "Long Xuyên": ["Bình Đức","Bình Khánh","Đông Xuyên","Mỹ Bình","Mỹ Long","Mỹ Phước","Mỹ Quý","Mỹ Xuyên","Mỹ Thới"] },
    "Bạc Liêu": { "TP. Bạc Liêu": ["Phường 1","Phường 2","Phường 3","Phường 5","Phường 7","Phường 8","Nhà Mát","Vĩnh Trạch","Vĩnh Trạch Đông"] },
    "Bắc Giang": { "TP. Bắc Giang": ["Dĩnh Kế","Đa Mai","Hoàng Văn Thụ","Lê Lợi","Mỹ Độ","Ngô Quyền","Song Mai","Thọ Xương","Trần Nguyên Hãn","Xương Giang"] },
    "Bắc Kạn": { "TP. Bắc Kạn": ["Đức Xuân","Huyền Tụng","Minh Khai","Nguyễn Thị Minh Khai","Nông Thượng","Phùng Chí Kiên","Sông Cầu","Xuất Hóa"] },
    "Bắc Ninh": { "TP. Bắc Ninh": ["Đại Phúc","Đáp Cầu","Hòa Long","Kinh Bắc","Ninh Xá","Phong Khê","Suối Hoa","Thị Cầu","Tiền An","Vân Dương","Vũ Ninh"] },
    "Bến Tre": { "TP. Bến Tre": ["An Hội","Bình Phú","Phú Khương","Phú Tân","Phú Thọ","Phường 1","Phường 2","Phường 3","Phường 4","Phường 5","Phường 6","Phường 7"] },
    "Bình Định": { "Quy Nhơn": ["Bùi Thị Xuân","Đống Đa","Ghềnh Ráng","Hải Cảng","Lê Hồng Phong","Lê Lợi","Lý Thường Kiệt","Ngô Mây","Nhơn Bình","Nhơn Phú","Quang Trung","Thị Nại","Trần Hưng Đạo","Trần Phú"] },
    "Bình Phước": { "Đồng Xoài": ["Tân Bình","Tân Đồng","Tân Phú","Tân Thiện","Tân Xuân","Tiến Thành","Tiến Thắng"] },
    "Bình Thuận": { "Phan Thiết": ["Bình Hưng","Đức Long","Đức Nghĩa","Đức Thắng","Hàm Tiến","Lạc Đạo","Mũi Né","Phú Hài","Phú Tài","Phú Thủy","Thanh Hải","Xuân An"] },
    "Cà Mau": { "TP. Cà Mau": ["An Xuyên","Lý Văn Lâm","Phường 1","Phường 2","Phường 4","Phường 5","Phường 6","Phường 7","Phường 8","Phường 9","Tân Thành","Tân Xuyên"] },
    "Cao Bằng": { "TP. Cao Bằng": ["Duyệt Trung","Hòa Chung","Hợp Giang","Ngọc Xuân","Sông Bằng","Sông Hiến","Tân Giang","Vĩnh Quang"] },
    "Đắk Lắk": { "Buôn Ma Thuột": ["An Bình","Ea Tam","Khánh Xuân","Tân An","Tân Hòa","Tân Lập","Tân Lợi","Tân Thành","Tân Tiến","Thành Nhất","Thắng Lợi","Thống Nhất","Tự An"] },
    "Đắk Nông": { "Gia Nghĩa": ["Đăk R'Moan","Nghĩa Tân","Nghĩa Thành","Nghĩa Trung","Quảng Thành","Quảng Thắng"] },
    "Điện Biên": { "Điện Biên Phủ": ["Him Lam","Mường Thanh","Nam Thanh","Noong Bua","Noong Thanh","Tân Thanh","Thanh Bình","Thanh Trường"] },
    "Đồng Tháp": { "Cao Lãnh": ["Hòa Thuận","Mỹ Phú","Phường 1","Phường 2","Phường 3","Phường 4","Phường 6","Tịnh Thới"] },
    "Gia Lai": { "Pleiku": ["An Phú","Biển Hồ","Chi Lăng","Diên Hồng","Đống Đa","Hoa Lư","Hội Phú","Hội Thương","Ia Kring","Ia Grai","Phù Đổng","Tây Sơn","Thắng Lợi","Trà Bá","Yên Đổ"] },
    "Hà Giang": { "TP. Hà Giang": ["Minh Khai","Ngọc Hà","Nguyễn Trãi","Phương Thiện","Quang Trung","Trần Phú"] },
    "Hà Nam": { "Phủ Lý": ["Châu Sơn","Lam Hạ","Liêm Chính","Liêm Tiết","Minh Khai","Phù Vân","Quang Trung","Thanh Châu","Thanh Tuyền","Trịnh Xá","Trần Hưng Đạo","Hai Bà Trưng"] },
    "Hà Tĩnh": { "TP. Hà Tĩnh": ["Đại Nài","Hà Huy Tập","Nam Hà","Nguyễn Du","Tân Giang","Thạch Linh","Thạch Quý","Thạch Trung","Thạch Tân","Trần Phú","Văn Yên"] },
    "Hải Dương": { "TP. Hải Dương": ["Ái Quốc","Bình Hàn","Cẩm Thượng","Cộng Hòa","Hải Tân","Lê Thanh Nghị","Nam Đồng","Ngọc Châu","Nguyễn Trãi","Nhị Châu","Phạm Ngũ Lão","Phả Lại","Quang Trung","Tứ Minh","Thạch Khôi","Tân Bình","Thanh Bình","Tự Tân","Việt Hòa"] },
    "Hậu Giang": { "Vị Thanh": ["Phường I","Phường III","Phường IV","Phường V","Phường VII","Vị Tân","Vị Thắng"] },
    "Hòa Bình": { "TP. Hòa Bình": ["Chăm Mát","Dân Chủ","Đồng Tiến","Hữu Nghị","Kỳ Sơn","Phương Lâm","Quỳnh Lâm","Tân Hòa","Tân Thịnh","Thái Bình","Thống Nhất","Trung Minh"] },
    "Hưng Yên": { "TP. Hưng Yên": ["An Tảo","Bảo Khê","Hiến Nam","Hồng Châu","Hùng Cường","Lam Sơn","Lê Lợi","Minh Khai","Nam Hòa","Phú Cường","Quảng Châu","Trung Nghĩa"] },
    "Kiên Giang": { "Rạch Giá": ["An Bình","An Hòa","Đông Hồ","Phước Hiệp","Rạch Sỏi","Rạch Tràm","Vĩnh Bảo","Vĩnh Lạc","Vĩnh Lợi","Vĩnh Quang","Vĩnh Thanh","Vĩnh Thông"] },
    "Kon Tum": { "TP. Kon Tum": ["Duy Tân","Ia Chim","Kroong","Lê Lợi","Ngô Mây","Nguyễn Trãi","Ngọc Nghĩa","Quyết Thắng","Thắng Lợi","Thống Nhất","Trần Hưng Đạo","Trường Chinh","Vinh Quang","Xã Hoà Bình","Đăk Cấm","Đăk Blà"] },
    "Lai Châu": { "TP. Lai Châu": ["Đoàn Kết","Quyết Thắng","Quyết Tiến","San Thàng","Tân Phong","Đông Phong","Nậm Loỏng"] },
    "Lạng Sơn": { "TP. Lạng Sơn": ["Chi Lăng","Đông Kinh","Hoàng Văn Thụ","Mai Pha","Tam Thanh","Vĩnh Trại"] },
    "Lào Cai": { "TP. Lào Cai": ["Bắc Cường","Bắc Lệnh","Bình Minh","Cam Đường","Cốc Lếu","Duyên Hải","Kim Tân","Lào Cai","Nam Cường","Pom Hán","Thống Nhất","Vạn Hòa","Xuân Tăng"] },
    "Long An": { "Tân An": ["Phường 1","Phường 2","Phường 3","Phường 4","Phường 5","Phường 6","Phường 7","Bình Tâm","Hướng Thọ Phú","Khánh Hậu","Lợi Bình Nhơn","Nhơn Thạnh Trung","Tân Khánh","Tân Ông Thượng"] },
    "Nam Định": { "TP. Nam Định": ["Bà Triệu","Cửa Bắc","Cửa Nam","Hạ Long","Lộc An","Lộc Hạ","Lộc Hòa","Lộc Vượng","Mỹ Xá","Nại Xá","Năng Tĩnh","Ngô Quyền","Nguyễn Du","Quang Trung","Trần Đăng Ninh","Trần Hưng Đạo","Trần Quang Khải","Trần Tế Xương","Vị Hoàng","Vị Xuyên"] },
    "Nghệ An": { "Vinh": ["Bến Thủy","Cửa Nam","Đội Cung","Đông Vĩnh","Hà Huy Tập","Hồng Sơn","Hưng Bình","Hưng Dũng","Hưng Phúc","Lê Lợi","Lê Mao","Lê Xuân","Nghi Phú","Quang Phúc","Quán Bàu","Trung Đô","Trường Thi","Vinh Tân"] },
    "Ninh Bình": { "TP. Ninh Bình": ["Bích Đào","Đông Thành","Nam Bình","Nam Thành","Ninh Khánh","Ninh Phúc","Ninh Sơn","Phúc Thành","Tân Thành","Thanh Bình","Vân Giang"] },
    "Ninh Thuận": { "Phan Rang - Tháp Chàm": ["Bảo An","Đài Sơn","Đô Vinh","Đông Hải","Kinh Dinh","Mỹ Bình","Mỹ Đông","Mỹ Hải","Mỹ Hương","Phủ Hà","Phước Mỹ","Tấn Tài","Thanh Sơn","Văn Hải"] },
    "Phú Thọ": { "Việt Trì": ["Bạch Hạc","Bến Gót","Dữu Lâu","Gia Cẩm","Minh Nông","Minh Phương","Nông Trang","Phượng Lâu","Thanh Miếu","Thọ Sơn","Tiên Cát","Tân Dân","Trưng Vương","Vân Cơ","Vân Phú"] },
    "Phú Yên": { "Tuy Hòa": ["Phú Đông","Phú Lâm","Phú Lộc","Phú Thạnh","Phú Thọ","Phú Văn","Phước Hòa","Trần Phú"] },
    "Quảng Bình": { "Đồng Hới": ["Bắc Lý","Bắc Nghĩa","Đồng Hải","Đồng Mỹ","Đồng Phú","Đồng Sơn","Đức Ninh","Đức Ninh Đông","Hải Đình","Hải Thành","Nam Lý","Nghĩa Ninh","Phú Hải","Phú Thủy","Phú Thủy","Phước Mỹ","Thuận Đức"] },
    "Quảng Nam": { "Tam Kỳ": ["An Mỹ","An Phú","An Sơn","An Xuân","Hòa Hương","Phước Hòa","Tân Thạnh","Trường Xuân"] },
    "Quảng Ngãi": { "TP. Quảng Ngãi": ["Chánh Lộ","Lê Hồng Phong","Nghĩa Chánh","Nghĩa Lộ","Nghĩa Lộc","Quảng Phú","Tinh Khê","Trần Phú","Trương Quang Trọng"] },
    "Quảng Ninh": { "Hạ Long": ["Bãi Cháy","Bạch Đằng","Cao Thắng","Cao Xanh","Đại Yên","Giếng Đáy","Hà Khẩu","Hà Lầm","Hà Phong","Hà Trung","Hồng Gai","Hồng Hải","Hùng Thắng","Trần Hưng Đạo","Tuần Châu","Việt Hưng","Yết Kiêu"] },
    "Quảng Trị": { "Đông Hà": ["Đông Giang","Đông Lễ","Đông Lương","Đông Thanh","Đông Ý","Phường 1","Phường 2","Phường 3","Phường 4","Phường 5"] },
    "Sóc Trăng": { "TP. Sóc Trăng": ["Phường 1","Phường 2","Phường 3","Phường 4","Phường 5","Phường 6","Phường 7","Phường 8","Phường 9","Phường 10"] },
    "Sơn La": { "TP. Sơn La": ["Chiềng An","Chiềng Cơi","Chiềng Đen","Chiềng Lề","Chiềng Sinh","Chiềng Xôm","Hua La","Quyết Tâm","Quyết Thắng"] },
    "Tây Ninh": { "TP. Tây Ninh": ["Hiệp Ninh","Long Hoa","Long Thành Bắc","Long Thành Nam","Long Thành Trung","Ninh Sơn","Ninh Thạnh"] },
    "Thái Bình": { "TP. Thái Bình": ["Bồ Xuyên","Đề Thám","Hoàng Diệu","Kỳ Bá","Lê Hồng Phong","Phú Khánh","Quang Trung","Tiền Phong","Trần Hưng Đạo","Trần Lãm","Vũ Chính","Vũ Lạc","Vũ Phúc"] },
    "Thái Nguyên": { "TP. Thái Nguyên": ["Chùa Hang","Đồng Bẩm","Đồng Quang","Gia Sàng","Hoàng Văn Thụ","Hương Sơn","Phú Xá","Phan Đình Phùng","Quán Triều","Quang Trung","Tân Long","Tân Thịnh","Thịnh Đán","Thịnh Đức","Tích Lương","Trung Thành","Túc Duyên"] },
    "Thanh Hóa": { "TP. Thanh Hóa": ["An Hưng","Ba Đình","Đông Hải","Đông Sơn","Đông Thọ","Đông Vệ","Hàm Rồng","Lam Sơn","Nam Ngạn","Ngọc Trạo","Phú Sơn","Quảng Hưng","Quảng Tâm","Quảng Thắng","Quảng Thịnh","Tào Xuyên","Thiệu Dương","Thiệu Khánh","Trường Thi"] },
    "Tiền Giang": { "Mỹ Tho": ["Đạo Thạnh","Mỹ Phong","Phường 1","Phường 2","Phường 3","Phường 4","Phường 5","Phường 6","Phường 7","Phường 8","Phường 9","Phường 10","Tân Long","Thới Sơn","Trung An"] },
    "Trà Vinh": { "TP. Trà Vinh": ["Phường 1","Phường 2","Phường 3","Phường 4","Phường 5","Phường 6","Phường 7","Phường 8","Phường 9","Long Đức"] },
    "Tuyên Quang": { "TP. Tuyên Quang": ["An Khang","An Tường","Đội Cấn","Hưng Thành","Lưỡng Vượng","Minh Xuân","Mỹ Lâm","Nông Tiến","Phan Thiết","Tân Hà","Tân Quang","Ỷ La"] },
    "Vĩnh Long": { "TP. Vĩnh Long": ["1","2","3","4","5","8","9","Tân Hạnh","Tân Hội","Tân Ngãi","Trung Hiếu","Trung Nghĩa"] },
    "Vĩnh Phúc": { "Vĩnh Yên": ["Định Trung","Đống Đa","Hội Hợp","Khai Quang","Liên Bảo","Ngô Quyền","Tích Sơn"] },
    "Yên Bái": { "TP. Yên Bái": ["Đồng Tâm","Hồng Hà","Minh Tân","Nam Cường","Nguyễn Phúc","Nguyễn Thái Học","Tân Thịnh","Yên Ninh","Yên Thịnh"] }
};

// ---- MÃ GIẢM GIÁ ----
const COUPONS = {
    'NOVA10':  { type: 'percent', value: 10,    label: 'Giảm 10%' },
    'NOVA20':  { type: 'percent', value: 20,    label: 'Giảm 20%' },
    'SALE50K': { type: 'fixed',   value: 50000, label: 'Giảm 50.000đ' },
    'WELCOME': { type: 'fixed',   value: 100000, label: 'Giảm 100.000đ' },
};
let appliedCoupon = null;

document.addEventListener('DOMContentLoaded', () => {

    // ---- RENDER ORDER SUMMARY ----
    window.renderOrderSummary = function() {
        const c = cart();
        const subtotal = c.reduce((s, i) => s + i.price * i.qty, 0);
        let discount = 0;
        if (appliedCoupon) {
            discount = appliedCoupon.type === 'percent'
                ? Math.round(subtotal * appliedCoupon.value / 100)
                : Math.min(appliedCoupon.value, subtotal);
        }
        const total = Math.max(subtotal - discount, 0);

        document.querySelector('#orderSummary').innerHTML = c.map(i => `
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;border-bottom:1px dashed rgba(255,255,255,0.08);padding-bottom:12px;">
                <div style="display:flex;gap:10px;align-items:center;">
                    <img src="${i.image}" alt="${i.title}" style="width:38px;height:50px;object-fit:cover;border-radius:4px;border:1px solid rgba(255,255,255,0.1);flex-shrink:0;" onerror="this.style.display='none'">
                    <div>
                        <div style="color:#fff;font-weight:600;font-size:13px;max-width:160px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${i.title}</div>
                        <div class="qty" style="display:flex;gap:6px;align-items:center;margin-top:5px;">
                            <button type="button" onclick="changeQtyCheckout(${i.id}, -1)" style="width:22px;height:22px;border-radius:4px;border:1px solid var(--line);background:var(--panel);color:white;cursor:pointer;display:flex;align-items:center;justify-content:center;padding:0;font-size:13px;">-</button>
                            <b style="font-size:13px;min-width:16px;text-align:center;">${i.qty}</b>
                            <button type="button" onclick="changeQtyCheckout(${i.id}, 1)" style="width:22px;height:22px;border-radius:4px;border:1px solid var(--line);background:var(--panel);color:white;cursor:pointer;display:flex;align-items:center;justify-content:center;padding:0;font-size:13px;">+</button>
                        </div>
                    </div>
                </div>
                <b style="color:#fff;white-space:nowrap;">${money(i.price * i.qty)}</b>
            </div>
        `).join('') || '<p style="color:var(--muted);text-align:center;font-size:13px;padding:10px 0;">Không có sản phẩm nào.</p>';

        if (document.getElementById('checkoutSubtotal'))
            document.getElementById('checkoutSubtotal').textContent = money(subtotal);

        const discountRow = document.getElementById('chkDiscountRow');
        if (discountRow) {
            discountRow.style.display = discount > 0 ? 'flex' : 'none';
            document.getElementById('chkDiscountAmt').textContent = '-' + money(discount);
        }
        document.getElementById('checkoutTotal').textContent = money(total);
    };

    window.changeQtyCheckout = function(id, d) {
        let c = cart();
        const it = c.find(x => x.id == id);
        if (!it) return;
        it.qty += d;
        if (it.qty <= 0) c = c.filter(x => x.id != id);
        saveCart(c);
        renderOrderSummary();
    };

    renderOrderSummary();

    // ---- CHỌN PHƯƠNG THỨC THANH TOÁN ----
    window.selectPayMethod = function(idx) {
        for (let i = 0; i < 4; i++) {
            const lbl = document.getElementById('payLabel' + i);
            if (lbl) lbl.classList.toggle('active', i === idx);
        }
    };
    // Mặc định chọn cái đầu tiên
    selectPayMethod(0);

    // ---- ĐỊA CHỈ VIỆT NAM ----
    const provSel  = document.getElementById('chkProvince');
    const distSel  = document.getElementById('chkDistrict');
    const wardSel  = document.getElementById('chkWard');

    // Đổ tỉnh/thành
    Object.keys(VN_ADDRESS).sort().forEach(p => {
        const opt = document.createElement('option');
        opt.value = p; opt.textContent = p;
        provSel.appendChild(opt);
    });

    provSel.addEventListener('change', () => {
        const districts = VN_ADDRESS[provSel.value] || {};
        distSel.innerHTML = '<option value="">-- Chọn Quận/Huyện --</option>';
        wardSel.innerHTML  = '<option value="">-- Chọn Phường/Xã --</option>';
        wardSel.disabled   = true;

        if (provSel.value) {
            Object.keys(districts).sort().forEach(d => {
                const opt = document.createElement('option');
                opt.value = d; opt.textContent = d;
                distSel.appendChild(opt);
            });
            distSel.disabled = false;
        } else {
            distSel.disabled = true;
        }
    });

    distSel.addEventListener('change', () => {
        const wards = (VN_ADDRESS[provSel.value] || {})[distSel.value] || [];
        wardSel.innerHTML = '<option value="">-- Chọn Phường/Xã --</option>';
        if (distSel.value) {
            wards.sort().forEach(w => {
                const opt = document.createElement('option');
                opt.value = w; opt.textContent = w;
                wardSel.appendChild(opt);
            });
            wardSel.disabled = false;
        } else {
            wardSel.disabled = true;
        }
    });

    // ---- MÃ GIẢM GIÁ ----
    window.applyCoupon = function() {
        const code = (document.getElementById('chkCoupon').value || '').trim().toUpperCase();
        const msgEl = document.getElementById('chkCouponMsg');
        if (!code) {
            // Không có mã → xóa coupon đang áp dụng (nếu có), không báo lỗi
            appliedCoupon = null;
            msgEl.textContent = '';
            renderOrderSummary();
            return;
        }
        const coupon = COUPONS[code];
        if (!coupon) {
            appliedCoupon = null;
            msgEl.style.color = 'var(--danger, #ff4d6d)';
            msgEl.textContent = '❌ Mã không hợp lệ hoặc đã hết hạn.';
        } else {
            appliedCoupon = coupon;
            msgEl.style.color = '#22c55e';
            msgEl.textContent = '✅ Áp dụng thành công: ' + coupon.label;
        }
        renderOrderSummary();
    };

    // ---- TỰ ĐIỀN THÔNG TIN NGƯỜI DÙNG ----
    const u = JSON.parse(localStorage.getItem('novastation_user') || '{}');
    if (u && (u.name || u.email)) {
        const nameInput  = document.getElementById('chkName');
        const emailInput = document.getElementById('chkEmail');
        const phoneInput = document.getElementById('chkPhone');
        if (nameInput  && u.name)  nameInput.value  = u.name;
        if (emailInput && u.email) emailInput.value = u.email;
        if (phoneInput && u.phone) phoneInput.value = u.phone;
    }

    // ---- SUBMIT FORM ----
    document.querySelector('#checkoutForm').addEventListener('submit', e => {
        e.preventDefault();

        const currentCart = cart();
        if (currentCart.length === 0) {
            if (typeof showToast === 'function') showToast('Giỏ hàng trống!');
            return;
        }

        // Validate bắt buộc
        const nameInput  = document.getElementById('chkName');
        const phoneInput = document.getElementById('chkPhone');
        if (nameInput && !nameInput.value.trim()) {
            if (typeof showToast === 'function') showToast('Vui lòng nhập Họ và tên!');
            nameInput.focus(); return;
        }
        if (phoneInput && !phoneInput.value.trim()) {
            if (typeof showToast === 'function') showToast('Vui lòng nhập Số điện thoại!');
            phoneInput.focus(); return;
        }
        if (!provSel.value) {
            if (typeof showToast === 'function') showToast('Vui lòng chọn Tỉnh/Thành phố!');
            provSel.focus(); return;
        }
        if (!distSel.value) {
            if (typeof showToast === 'function') showToast('Vui lòng chọn Quận/Huyện!');
            distSel.focus(); return;
        }
        if (!wardSel.value) {
            if (typeof showToast === 'function') showToast('Vui lòng chọn Phường/Xã!');
            wardSel.focus(); return;
        }

        const submitBtn = document.getElementById('checkoutSubmitBtn');
        if (submitBtn) {
            submitBtn.innerHTML = '<span class="loading-spinner"></span> Đang xử lý...';
            submitBtn.style.pointerEvents = 'none';
        }

        setTimeout(() => {
            const nameVal    = nameInput ? nameInput.value.trim() : (u.name || 'Khách vãng lai');
            const emailVal   = document.getElementById('chkEmail')  ? document.getElementById('chkEmail').value.trim()  : (u.email || '');
            const phoneVal   = phoneInput ? phoneInput.value.trim() : (u.phone || '');
            const streetVal  = document.getElementById('chkStreet') ? document.getElementById('chkStreet').value.trim() : '';

            // Ghép địa chỉ chuẩn
            const addressParts = [streetVal, wardSel.value, distSel.value, provSel.value].filter(Boolean);
            const fullAddress  = addressParts.join(', ');

            // Phương thức thanh toán
            const payRadio  = document.querySelector('input[name="pay"]:checked');
            const payLabels = { bank: 'Chuyển khoản ngân hàng', momo: 'Ví MoMo', card: 'Visa/Mastercard', cod: 'Tiền mặt (COD)' };
            const payMethod = payLabels[payRadio ? payRadio.value : 'bank'] || 'Chuyển khoản ngân hàng';

            const subtotal = currentCart.reduce((s, i) => s + i.price * i.qty, 0);
            let discount = 0;
            if (appliedCoupon) {
                discount = appliedCoupon.type === 'percent'
                    ? Math.round(subtotal * appliedCoupon.value / 100)
                    : Math.min(appliedCoupon.value, subtotal);
            }
            const total = Math.max(subtotal - discount, 0);

            const orderItems = currentCart.map(i => ({
                id: i.id, title: i.title,
                price: Number(i.price) || 0,
                image: i.image,
                qty: Number(i.qty) || 1
            }));

            const orderId = '#NS' + Date.now().toString().slice(-6);
            const orderDate = new Date().toLocaleDateString('vi-VN');

            const newOrder = {
                id: orderId,
                date: orderDate,
                total: total,
                subtotal: subtotal,
                discount: discount,
                couponCode: appliedCoupon ? document.getElementById('chkCoupon').value.trim().toUpperCase() : '',
                couponLabel: appliedCoupon ? appliedCoupon.label : '',
                payMethod: payMethod,
                status: 'Đã thanh toán',
                customerName: nameVal,
                customerEmail: emailVal,
                customerPhone: phoneVal,
                address: fullAddress,
                province: provSel.value,
                district: distSel.value,
                ward: wardSel.value,
                street: streetVal,
                items: orderItems
            };

            const orders = JSON.parse(localStorage.getItem('novastation_orders') || '[]');
            orders.unshift(newOrder);
            localStorage.setItem('novastation_orders', JSON.stringify(orders));
            saveCart([]);

            // Hiển thị Bill
            showBill(newOrder);

        }, 1200);
    });

    // ---- HIỂN THỊ HOÁ ĐƠN (BILL) ----
    window.showBill = function(order) {
        const billOverlay = document.getElementById('billOverlay');
        if (!billOverlay) return;

        const itemsHtml = (order.items || []).map(i => `
            <tr>
                <td>
                    <img class="bill-item-img" src="${i.image||''}" alt="${i.title}" onerror="this.style.display='none'">
                    ${i.title}
                </td>
                <td style="text-align:center;">${i.qty}</td>
                <td style="text-align:right;">${money(i.price)}</td>
                <td>${money(i.price * i.qty)}</td>
            </tr>
        `).join('');

        const discountRow = order.discount > 0
            ? `<div class="bill-total-row discount">
                    <span>Giảm giá ${order.couponCode ? '(' + order.couponCode + ')' : ''}</span>
                    <span>-${money(order.discount)}</span>
               </div>`
            : '';

        billOverlay.style.display = 'flex';
        billOverlay.innerHTML = `
            <div class="bill-card">
                <!-- HEADER -->
                <div class="bill-header">
                    <div>
                        <img src="images/logo.png" alt="NovaStation" style="height:40px;object-fit:contain;display:block;">
                        <div style="color:rgba(255,255,255,0.4);font-size:11px;margin-top:6px;">novastation@gmail.com · +84 023 456 789</div>
                        <div class="bill-status-badge" style="margin-top:12px;">
                            <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2.5" fill="none"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                            Thanh toán thành công
                        </div>
                    </div>
                    <div class="bill-meta">
                        <strong>HÓA ĐƠN</strong>
                        Mã đơn: ${order.id}<br>
                        Ngày: ${order.date}<br>
                        Thanh toán: ${order.payMethod}
                    </div>
                </div>

                <div class="bill-body">
                    <!-- THÔNG TIN KHÁCH HÀNG -->
                    <div class="bill-section-label">Thông tin khách hàng</div>
                    <div class="bill-info-grid">
                        <div><span>Họ tên</span>${order.customerName}</div>
                        <div><span>Số điện thoại</span>${order.customerPhone || '—'}</div>
                        <div class="bill-info-full"><span>Email</span>${order.customerEmail || '—'}</div>
                        <div class="bill-info-full"><span>Địa chỉ giao hàng</span>${order.address || '—'}</div>
                    </div>

                    <!-- SẢN PHẨM -->
                    <div class="bill-section-label">Sản phẩm đã mua</div>
                    <table class="bill-table">
                        <thead>
                            <tr>
                                <th>Sản phẩm</th>
                                <th style="text-align:center;">SL</th>
                                <th style="text-align:right;">Đơn giá</th>
                                <th style="text-align:right;">Thành tiền</th>
                            </tr>
                        </thead>
                        <tbody>${itemsHtml}</tbody>
                    </table>

                    <!-- TỔNG TIỀN -->
                    <div class="bill-totals">
                        <div class="bill-total-row">
                            <span>Tạm tính</span>
                            <span>${money(order.subtotal || order.total)}</span>
                        </div>
                        ${discountRow}
                        <div class="bill-total-row grand">
                            <span>Tổng thanh toán</span>
                            <span>${money(order.total)}</span>
                        </div>
                    </div>
                </div>

                <!-- ACTIONS -->
                <div class="bill-actions">
                    <button class="bill-btn bill-btn-print" onclick="window.print()">
                        <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
                        In hóa đơn
                    </button>
                    <button class="bill-btn bill-btn-orders" onclick="location.href='orders.html'">
                        <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
                        Xem đơn hàng
                    </button>
                    <button class="bill-btn bill-btn-close" onclick="closeBill()">
                        <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                        Đóng
                    </button>
                </div>

                <div class="bill-footer-note">
                    Cảm ơn bạn đã tin tưởng mua sắm tại <strong>NovaStation</strong>! 🎮<br>
                    Mọi thắc mắc vui lòng liên hệ: novastation@gmail.com
                </div>
            </div>
        `;
    };

    window.closeBill = function() {
        const overlay = document.getElementById('billOverlay');
        if (overlay) overlay.style.display = 'none';
    };
});
