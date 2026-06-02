document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    // Hàm lấy danh sách users từ database giả (localStorage)
    const getUsers = () => {
        let users = JSON.parse(localStorage.getItem('novastation_users') || '[]');
        // Đảm bảo luôn có tài khoản Admin mặc định trong hệ thống
        if (!users.some(u => u.email === 'novastationadmin@gmail.com')) {
            users.push({ id: 1, name: 'novastationadmin', fullName: 'Quản trị viên', email: 'novastationadmin@gmail.com', password: 'nova123456', role: 'Admin', status: 'Hoạt động' });
            localStorage.setItem('novastation_users', JSON.stringify(users));
        }
        return users;
    };
    
    // Hàm lưu danh sách users
    const saveUsers = (users) => localStorage.setItem('novastation_users', JSON.stringify(users));

    // Khởi tạo danh sách users nếu trống
    getUsers();

    // 1. XỬ LÝ ĐĂNG NHẬP
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault(); 
            
            const identity = document.getElementById('loginIdentity').value.trim();
            const pass = document.getElementById('loginPassword').value.trim();
            const users = getUsers();
            const user = users.find(u => (u.email === identity || u.name === identity) && u.password === pass);

            if (identity === 'novastationadmin@gmail.com' || identity === 'novastationadmin') {
                if (pass === 'nova123456') {
                    const adminUser = { id: 1, name: 'novastationadmin', fullName: 'Quản trị viên', email: 'novastationadmin@gmail.com', role: 'Admin', status: 'Hoạt động' };
                    localStorage.setItem('novastation_user', JSON.stringify(adminUser));
                    if (typeof showToast === 'function') showToast('Đăng nhập Admin thành công!');
                    else alert('Đăng nhập Admin thành công!');
                    setTimeout(() => location.href = 'index.html', 1000);
                    return;
                }
            }

            if (user) {
                if (user.status === 'Khóa') {
                    if (typeof showToast === 'function') showToast('Tài khoản của bạn đã bị khóa!', 'error');
                    else alert('Tài khoản của bạn đã bị khóa! Vui lòng liên hệ Admin.');
                    return;
                }

                // Đăng nhập thành công
                localStorage.setItem('novastation_user', JSON.stringify(user));
                if (typeof showToast === 'function') showToast('Đăng nhập thành công!');
                else alert('Đăng nhập thành công!');
                setTimeout(() => location.href = 'index.html', 1000);
            } else {
                // Nếu tìm không thấy user nào khớp
                if (typeof showToast === 'function') showToast('Sai tên đăng nhập hoặc mật khẩu!', 'error');
                else alert('Sai tên đăng nhập/email hoặc mật khẩu! Hoặc tài khoản chưa được đăng ký.');
            }
        });
    }

    // 2. XỬ LÝ ĐĂNG KÝ
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Ngăn trang bị load lại

            const fullName = document.getElementById('registerFullName').value.trim();
            const email = document.getElementById('registerEmail').value.trim();
            const name = document.getElementById('registerUsername').value.trim();
            const pass = document.getElementById('registerPassword').value.trim();

            const users = getUsers();
            
            // Kiểm tra xem email hoặc username đã có người khác đăng ký trước đó chưa
            const isExist = users.some(u => u.email === email || u.name === name);
            if (isExist) {
                if (typeof showToast === 'function') showToast('Email hoặc Tên đăng nhập đã tồn tại!', 'error');
                else alert('Email hoặc Tên đăng nhập này đã có người sử dụng. Vui lòng chọn cái khác!');
                return;
            }

            // Tạo tài khoản mới
            const newUser = {
                id: Date.now().toString().slice(-6),
                fullName: fullName,
                email: email,
                name: name,
                password: pass,
                role: 'Khách hàng',
                status: 'Hoạt động'
            };

            // Thêm người mới vào danh sách tổng và lưu lại
            users.push(newUser);
            saveUsers(users);

            if (typeof showToast === 'function') showToast('Đăng ký thành công! Đang đăng nhập tự động...');
            else alert('Đăng ký thành công! Hệ thống sẽ tự động đăng nhập.');
            
            // Tự động đăng nhập luôn sau khi đăng ký cho tiện lợi
            localStorage.setItem('novastation_user', JSON.stringify(newUser));
            setTimeout(() => location.href = 'index.html', 1200);
        });
    }
});
