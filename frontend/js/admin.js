document.addEventListener('DOMContentLoaded', () => {
    // --- ƯU TIÊN TẢI DỮ LIỆU TỪ LOCALSTORAGE ---
    const localDb = localStorage.getItem('ns_games_db');
    if (localDb) {
        window.NS_GAMES = JSON.parse(localDb);
    }

    // Kiểm tra quyền Admin
    const u = JSON.parse(localStorage.getItem('novastation_user'));
    if (!u) {
        alert('Bạn cần đăng nhập để tiếp tục!');
        window.location.href = 'login.html';
        return;
    }
    if (u.role !== 'Admin') {
        alert('Truy cập bị từ chối! Chỉ có Admin mới được vào trang này.');
        window.location.href = 'index.html';
        return;
    }
    document.getElementById('adminName').textContent = 'Xin chào, ' + u.name;

    // --- CHUYỂN TAB QUẢN LÝ ---
    const menuLinks = document.querySelectorAll('#adminMenu a');
    const sections = document.querySelectorAll('.admin-section');

    menuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            menuLinks.forEach(l => l.classList.remove('active'));
            sections.forEach(s => s.style.display = 'none');
            
            link.classList.add('active');
            const target = link.getAttribute('data-target');
            document.getElementById(target).style.display = 'block';

            if(target === 'section-orders') renderOrders();
            if(target === 'section-users') renderUsers();
            if(target === 'section-stats') renderStats();
        });
    });

    const tbody = document.getElementById('adminGamesBody');
    let editingId = null;
    
    // --- CHỨC NĂNG XUẤT DỮ LIỆU ĐỂ ZIP ---
    const exportBtn = document.getElementById('exportDataBtn');
    if (exportBtn) {
        exportBtn.addEventListener('click', () => {
            // Nâng cấp: Thay vì copy, tạo file JS và tự động tải xuống
            const dataString = `window.NS_GAMES=${JSON.stringify(window.NS_GAMES, null, 4)};`;
            const blob = new Blob([dataString], { type: 'text/javascript' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'games.js';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            alert('Trình duyệt vừa tải xuống file games.js!\n\nHãy chép đè file vừa tải vào thư mục "data" trước khi nén Zip để gửi người khác.');
        });
    }

    // --- HÀM TỰ ĐỘNG GHI THẲNG VÀO FILE BẰNG BACKEND SERVER ---
    const autoSaveToFile = async () => {
        try {
            await fetch('http://localhost:3000/api/save', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(window.NS_GAMES, null, 4)
            });
        } catch (e) {
            // Nếu bạn không bật server thì bỏ qua không bị lỗi
        }
    };

    // Hàm render bảng dữ liệu
    const renderTable = (games) => {
        tbody.innerHTML = games.map((g, index) => `
            <tr>
                <td>#${g.id}</td>
                <td><img src="${g.image}" alt="${g.title}"></td>
                <td><strong>${g.title}</strong></td>
                <td>${g.category}</td>
                <td style="color: #ffffff; font-weight: bold;">${money(g.price)}</td>
                <td><span class="badge" style="background: var(--line); color: #ffffff;">Còn ${g.stock || 10}</span></td>
                <td>
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <div style="display: flex; flex-direction: column; gap: 4px;">
                            <button style="background: transparent; border: none; color: var(--muted); cursor: pointer; padding: 0; font-size: 10px; line-height: 1; opacity: ${index === 0 ? '0.3' : '1'}; transition: color 0.2s ease;" onclick="moveGame('${g.id}', -1)" ${index === 0 ? 'disabled' : ''} onmouseover="this.style.color='#ffffff'" onmouseout="this.style.color='var(--muted)'" title="Đẩy lên">▲</button>
                            <button style="background: transparent; border: none; color: var(--muted); cursor: pointer; padding: 0; font-size: 10px; line-height: 1; opacity: ${index === games.length - 1 ? '0.3' : '1'}; transition: color 0.2s ease;" onclick="moveGame('${g.id}', 1)" ${index === games.length - 1 ? 'disabled' : ''} onmouseover="this.style.color='#ffffff'" onmouseout="this.style.color='var(--muted)'" title="Kéo xuống">▼</button>
                        </div>
                        <button onclick="editGame('${g.id}')" style="background: transparent; border: none; color: var(--muted); cursor: pointer; padding: 4px; display: inline-flex; align-items: center; justify-content: center; transition: color 0.2s ease;" onmouseover="this.style.color='var(--blue)'" onmouseout="this.style.color='var(--muted)'" title="Sửa game"><svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg></button> 
                        <button onclick="deleteGame('${g.id}')" style="background: transparent; border: none; color: var(--muted); cursor: pointer; padding: 4px; display: inline-flex; align-items: center; justify-content: center; transition: color 0.2s ease;" onmouseover="this.style.color='var(--danger)'" onmouseout="this.style.color='var(--muted)'" title="Xóa game"><svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg></button>
                    </div>
                </td>
            </tr>
        `).join('');
    };

    renderTable(window.NS_GAMES || []);

    // Chức năng DI CHUYỂN vị trí Game
    window.moveGame = (id, direction) => {
        if (!window.NS_GAMES) return;
        const idx = window.NS_GAMES.findIndex(g => g.id == id);
        if (idx < 0) return;
        
        const newIdx = idx + direction;
        if (newIdx < 0 || newIdx >= window.NS_GAMES.length) return;
        
        const temp = window.NS_GAMES[idx];
        window.NS_GAMES[idx] = window.NS_GAMES[newIdx];
        window.NS_GAMES[newIdx] = temp;
        
        localStorage.setItem('ns_games_db', JSON.stringify(window.NS_GAMES));
        autoSaveToFile();
        renderTable(window.NS_GAMES);
    };

    // Chức năng XÓA Game
    window.deleteGame = async (id) => {
        if (!confirm('Bạn có chắc chắn muốn xóa game này?')) return;
        try {
            const res = await fetch(`http://localhost:3000/api/games/${id}`, { method: 'DELETE' });
            if (!res.ok) throw new Error('Lỗi Backend');
        } catch (err) {
        }
        if (window.NS_GAMES) {
            const idx = window.NS_GAMES.findIndex(g => g.id == id);
            if (idx > -1) window.NS_GAMES.splice(idx, 1);
            localStorage.setItem('ns_games_db', JSON.stringify(window.NS_GAMES));
            
            // Lưu lại ID đã xóa để không bị đồng bộ ngược lại từ file games.js
            let deleted = JSON.parse(localStorage.getItem('ns_deleted_games') || '[]');
            if (!deleted.includes(id)) deleted.push(id);
            localStorage.setItem('ns_deleted_games', JSON.stringify(deleted));
            autoSaveToFile();
        }
        renderTable(window.NS_GAMES || []);
        if (typeof showToast === 'function') showToast('Đã xóa game thành công!');
    };

    // Chức năng SỬA Game (Mở modal & điền dữ liệu)
    window.editGame = (id) => {
        const game = (window.NS_GAMES || []).find(g => g.id == id);
        if (!game) return;
        
        editingId = id;
        document.getElementById('modalTitle').textContent = 'Sửa Thông Tin Game';
        document.getElementById('gameTitle').value = game.title || '';
        document.getElementById('gameCategory').value = game.category || 'Hành động';
        document.getElementById('gamePrice').value = game.price || 0;
        document.getElementById('gameOldPrice').value = game.oldPrice || game.original_price || '';
        document.getElementById('gameStock').value = game.stock !== undefined ? game.stock : 10;
        document.getElementById('gamePlatform').value = game.platform || 'PS5';
        document.getElementById('gameLanguage').value = game.language || '';
        document.getElementById('gameImage').value = game.image || '';
        document.getElementById('gameGallery').value = (game.gallery || []).join(', ');
        document.getElementById('gameDesc').value = game.desc || '';
        
        document.getElementById('gameModal').classList.add('active');
    };

    // Modal Logic
    const modal = document.getElementById('gameModal');
    const form = document.getElementById('gameForm');
    
    const closeModal = () => { 
        modal.classList.remove('active'); 
        form.reset(); 
        editingId = null;
        document.getElementById('modalTitle').textContent = 'Thêm Game Mới';
    };

    const addGameBtn = document.getElementById('addGameBtn');
    if (addGameBtn) addGameBtn.addEventListener('click', () => modal.classList.add('active'));
    
    const closeBtn = document.getElementById('closeModalBtn');
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    
    const cancelBtn = document.getElementById('cancelModalBtn');
    if (cancelBtn) cancelBtn.addEventListener('click', closeModal);

    // Xử lý Gửi Form (Thêm hoặc Sửa)
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const gameData = {
                title: document.getElementById('gameTitle').value,
                category: document.getElementById('gameCategory').value,
                price: parseInt(document.getElementById('gamePrice').value),
                oldPrice: document.getElementById('gameOldPrice').value ? parseInt(document.getElementById('gameOldPrice').value) : null,
                stock: parseInt(document.getElementById('gameStock').value),
                platform: document.getElementById('gamePlatform').value,
                language: document.getElementById('gameLanguage').value,
                image: document.getElementById('gameImage').value,
                gallery: document.getElementById('gameGallery').value.split(',').map(s => s.trim()).filter(Boolean),
                desc: document.getElementById('gameDesc').value
            };

            // Cập nhật dữ liệu ngay trên bộ nhớ tạm của giao diện (Local) trước
            if (editingId) {
                const game = window.NS_GAMES.find(g => g.id == editingId);
                if (game) Object.assign(game, gameData);
            } else {
                gameData.id = Date.now().toString().slice(-4);
                if(window.NS_GAMES) window.NS_GAMES.unshift(gameData);
            }

            try {
                // Đã thay thế việc gọi API cũ bằng hàm autoSaveToFile tập trung
            } catch (err) {
                // Bỏ qua lỗi backend vì đã xử lý local ở trên
            }
            
            localStorage.setItem('ns_games_db', JSON.stringify(window.NS_GAMES));
            autoSaveToFile();
            if (typeof showToast === 'function') showToast(`${editingId ? 'Cập nhật' : 'Thêm'} game thành công!`);
            
            renderTable(window.NS_GAMES);
            closeModal();
        });
    }

    // --- QUẢN LÝ ĐƠN HÀNG ---
    const getLocalOrders = () => JSON.parse(localStorage.getItem('novastation_orders') || '[]');
    
    const renderOrders = () => {
        const ordersBody = document.getElementById('adminOrdersBody');
        const orders = getLocalOrders();

        const statusColor = (s) => {
            if (s.includes('hoàn') || s.includes('thanh')) return '#22c55e';
            if (s.includes('giao')) return '#3b82f6';
            if (s.includes('hủy')) return 'var(--danger)';
            return '#f59e0b';
        };
        
        ordersBody.innerHTML = orders.map(o => `
            <tr>
                <td><strong>${o.id}</strong></td>
                <td>${o.customerName || 'Khách vãng lai'}</td>
                <td>${o.date}</td>
                <td style="color: #ffffff; font-weight: bold;">${money(o.total)}</td>
                <td>
                    <select class="input" style="padding: 5px; width: auto; background: ${o.status.includes('hủy') ? 'var(--danger)' : 'var(--panel2)'};" onchange="updateOrderStatus('${o.id}', this.value)">
                        <option value="Chờ xử lý" ${o.status==='Chờ xử lý'?'selected':''}>Chờ xử lý</option>
                        <option value="Đã thanh toán" ${o.status==='Đã thanh toán'?'selected':''}>Đã thanh toán</option>
                        <option value="Đang giao" ${o.status==='Đang giao'?'selected':''}>Đang giao</option>
                        <option value="Đã hoàn thành" ${o.status==='Đã hoàn thành'?'selected':''}>Đã hoàn thành</option>
                        <option value="Đã hủy" ${o.status==='Đã hủy'?'selected':''}>Đã hủy</option>
                    </select>
                </td>
                <td>
                    <div style="display:flex;align-items:center;gap:8px;">
                        <button onclick="adminShowOrderDetail('${o.id}')" style="background: transparent; border: none; color: var(--muted); cursor: pointer; padding: 4px; display: inline-flex; align-items: center; justify-content: center; transition: color 0.2s ease;" onmouseover="this.style.color='var(--blue)'" onmouseout="this.style.color='var(--muted)'" title="Xem chi tiết đơn hàng">
                            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                        </button>
                        <button onclick="deleteOrder('${o.id}')" style="background: transparent; border: none; color: var(--muted); cursor: pointer; padding: 4px; display: inline-flex; align-items: center; justify-content: center; transition: color 0.2s ease; vertical-align: middle;" onmouseover="this.style.color='var(--danger)'" onmouseout="this.style.color='var(--muted)'" title="Xóa đơn hàng">
                            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('') || '<tr><td colspan="7" style="text-align:center; padding: 20px;">Chưa có đơn hàng nào</td></tr>';
    };

    // --- MODAL CHI TIẾT ĐƠN HÀNG (ADMIN) ---
    window.adminShowOrderDetail = function(orderId) {
        const orders = getLocalOrders();
        const o = orders.find(x => x.id === orderId);
        if (!o) return;

        let overlay = document.getElementById('admin-order-detail-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.id = 'admin-order-detail-overlay';
            Object.assign(overlay.style, {
                position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
                background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                zIndex: 10000, opacity: 0, transition: 'opacity 0.3s'
            });
            overlay.addEventListener('click', e => { if (e.target === overlay) adminCloseOrderDetail(); });
            document.body.appendChild(overlay);
        }

        const statusColor = (s) => {
            if (s.includes('hoàn') || s.includes('thanh')) return '#22c55e';
            if (s.includes('giao')) return '#3b82f6';
            if (s.includes('hủy')) return 'var(--danger, #ff4d6d)';
            return '#f59e0b';
        };

        const items = o.items && o.items.length > 0
            ? o.items.map(i => `
                <div style="display:flex;align-items:center;gap:14px;padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.07);">
                    <img src="${i.image || ''}" alt="${i.title}" onerror="this.style.display='none'" style="width:54px;height:72px;object-fit:cover;border-radius:6px;border:1px solid rgba(255,255,255,0.1);flex-shrink:0;">
                    <div style="flex:1;min-width:0;">
                        <div style="color:#fff;font-weight:600;font-size:13px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${i.title}</div>
                        <div style="color:rgba(255,255,255,0.45);font-size:12px;margin-top:4px;">Số lượng: <strong style="color:rgba(255,255,255,0.75);">${i.qty}</strong></div>
                        <div style="color:rgba(255,255,255,0.45);font-size:12px;">Đơn giá: <strong style="color:rgba(255,255,255,0.75);">${money(i.price)}</strong></div>
                    </div>
                    <div style="color:#fff;font-weight:700;font-size:14px;white-space:nowrap;">${money(i.price * i.qty)}</div>
                </div>
            `).join('')
            : '<p style="color:rgba(255,255,255,0.35);text-align:center;font-size:13px;padding:20px 0;font-style:italic;">Không có thông tin sản phẩm trong đơn này.</p>';

        overlay.innerHTML = `
            <div style="background:#0d1117;border:1px solid rgba(255,255,255,0.12);border-radius:14px;width:min(580px,95vw);max-height:90vh;overflow-y:auto;box-shadow:0 32px 80px rgba(0,0,0,0.7);position:relative;animation:adminSlideUp 0.3s cubic-bezier(0.34,1.56,0.64,1);">
                <style>@keyframes adminSlideUp{from{transform:translateY(30px);opacity:0}to{transform:translateY(0);opacity:1}}</style>

                <!-- HEADER -->
                <div style="padding:20px 24px 16px;border-bottom:1px solid rgba(255,255,255,0.08);display:flex;align-items:flex-start;justify-content:space-between;position:sticky;top:0;background:#0d1117;z-index:2;border-radius:14px 14px 0 0;">
                    <div>
                        <div style="display:flex;align-items:center;gap:10px;">
                            <svg viewBox="0 0 24 24" width="18" height="18" stroke="rgba(255,255,255,0.4)" stroke-width="2" fill="none"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                            <span style="color:#fff;font-weight:700;font-size:16px;">Chi tiết đơn hàng</span>
                            <span style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);color:rgba(255,255,255,0.5);font-size:11px;padding:2px 8px;border-radius:20px;font-weight:600;">${o.id}</span>
                        </div>
                        <div style="color:rgba(255,255,255,0.35);font-size:12px;margin-top:5px;margin-left:28px;">Ngày đặt: ${o.date}</div>
                    </div>
                    <button onclick="adminCloseOrderDetail()" style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);color:rgba(255,255,255,0.6);border-radius:50%;width:32px;height:32px;cursor:pointer;font-size:18px;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:0.2s;" onmouseover="this.style.background='rgba(255,255,255,0.13)'" onmouseout="this.style.background='rgba(255,255,255,0.06)'">&times;</button>
                </div>

                <!-- TRẠNG THÁI + ĐỔI NHANH -->
                <div style="padding:14px 24px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;background:rgba(255,255,255,0.02);border-bottom:1px solid rgba(255,255,255,0.06);">
                    <div style="display:flex;align-items:center;gap:8px;">
                        <div style="width:8px;height:8px;border-radius:50%;background:${statusColor(o.status)};box-shadow:0 0 8px ${statusColor(o.status)};flex-shrink:0;"></div>
                        <span style="color:${statusColor(o.status)};font-weight:600;font-size:13px;">${o.status}</span>
                    </div>
                    <div style="display:flex;align-items:center;gap:8px;">
                        <span style="color:rgba(255,255,255,0.4);font-size:12px;">Đổi trạng thái:</span>
                        <select id="adminDetailStatusSelect" style="padding:6px 10px;width:auto;font-size:12px;background:#1a1f2e;border:1px solid rgba(255,255,255,0.2);color:#fff;border-radius:6px;cursor:pointer;outline:none;" onchange="adminUpdateStatusFromDetail('${o.id}', this.value)">
                            <option value="Chờ xử lý" ${o.status==='Chờ xử lý'?'selected':''} style="background:#1a1f2e;color:#f59e0b;">Chờ xử lý</option>
                            <option value="Đã thanh toán" ${o.status==='Đã thanh toán'?'selected':''} style="background:#1a1f2e;color:#22c55e;">Đã thanh toán</option>
                            <option value="Đang giao" ${o.status==='Đang giao'?'selected':''} style="background:#1a1f2e;color:#3b82f6;">Đang giao</option>
                            <option value="Đã hoàn thành" ${o.status==='Đã hoàn thành'?'selected':''} style="background:#1a1f2e;color:#a78bfa;">Đã hoàn thành</option>
                            <option value="Đã hủy" ${o.status==='Đã hủy'?'selected':''} style="background:#1a1f2e;color:#ff4d6d;">Đã hủy</option>
                        </select>
                    </div>
                </div>

                <!-- THÔNG TIN KHÁCH HÀNG -->
                <div style="padding:16px 24px;border-bottom:1px solid rgba(255,255,255,0.06);">
                    <div style="color:rgba(255,255,255,0.4);font-size:11px;text-transform:uppercase;letter-spacing:1px;margin-bottom:12px;font-weight:700;">Thông tin khách hàng</div>
                    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
                        ${o.customerName ? `
                        <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);border-radius:8px;padding:10px 14px;">
                            <div style="color:rgba(255,255,255,0.35);font-size:10px;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:4px;">Tên</div>
                            <div style="color:#fff;font-weight:600;font-size:13px;">${o.customerName}</div>
                        </div>` : ''}
                        ${o.customerPhone ? `
                        <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);border-radius:8px;padding:10px 14px;">
                            <div style="color:rgba(255,255,255,0.35);font-size:10px;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:4px;">Số điện thoại</div>
                            <div style="color:#fff;font-weight:600;font-size:13px;">${o.customerPhone}</div>
                        </div>` : ''}
                        ${o.customerEmail ? `
                        <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);border-radius:8px;padding:10px 14px;grid-column:1/-1;">
                            <div style="color:rgba(255,255,255,0.35);font-size:10px;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:4px;">Email</div>
                            <div style="color:#fff;font-weight:600;font-size:13px;">${o.customerEmail}</div>
                        </div>` : ''}
                        ${o.address ? `
                        <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);border-radius:8px;padding:10px 14px;grid-column:1/-1;">
                            <div style="color:rgba(255,255,255,0.35);font-size:10px;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:4px;">Địa chỉ giao hàng</div>
                            <div style="color:#fff;font-weight:600;font-size:13px;">${o.address}</div>
                        </div>` : ''}
                    </div>
                </div>

                <!-- DANH SÁCH SẢN PHẨM -->
                <div style="padding:16px 24px;border-bottom:1px solid rgba(255,255,255,0.06);">
                    <div style="color:rgba(255,255,255,0.4);font-size:11px;text-transform:uppercase;letter-spacing:1px;margin-bottom:4px;font-weight:700;">
                        Sản phẩm đã mua ${o.items && o.items.length > 0 ? `<span style="font-size:10px;background:rgba(255,255,255,0.07);padding:1px 7px;border-radius:20px;margin-left:6px;">${o.items.reduce((s, i) => s + i.qty, 0)} sản phẩm</span>` : ''}
                    </div>
                    ${items}
                </div>

                <!-- TỔNG TIỀN -->
                <div style="padding:18px 24px;display:flex;justify-content:space-between;align-items:center;background:rgba(255,255,255,0.02);border-radius:0 0 14px 14px;">
                    <span style="color:rgba(255,255,255,0.4);font-size:14px;">Tổng thanh toán</span>
                    <span style="color:#fff;font-size:22px;font-weight:800;letter-spacing:-0.5px;">${money(o.total)}</span>
                </div>
            </div>
        `;

        overlay.style.display = 'flex';
        setTimeout(() => overlay.style.opacity = 1, 10);
    };

    window.adminCloseOrderDetail = function() {
        const overlay = document.getElementById('admin-order-detail-overlay');
        if (!overlay) return;
        overlay.style.opacity = 0;
        setTimeout(() => overlay.style.display = 'none', 300);
    };

    window.adminUpdateStatusFromDetail = function(orderId, newStatus) {
        let orders = getLocalOrders();
        const o = orders.find(x => x.id === orderId);
        if (o) {
            o.status = newStatus;
            localStorage.setItem('novastation_orders', JSON.stringify(orders));
            if (typeof showToast === 'function') showToast('Cập nhật trạng thái thành công!');
            renderOrders(); // Cập nhật bảng bên dưới luôn
        }
    };

    window.updateOrderStatus = (id, newStatus) => {
        let orders = getLocalOrders();
        let o = orders.find(x => x.id === id);
        if (o) {
            o.status = newStatus;
            localStorage.setItem('novastation_orders', JSON.stringify(orders));
            if (typeof showToast === 'function') showToast('Cập nhật trạng thái thành công!');
            renderOrders();
        }
    };

    window.deleteOrder = (id) => {
        if(!confirm('Xóa đơn hàng này?')) return;
        let orders = getLocalOrders();
        orders = orders.filter(x => x.id !== id);
        localStorage.setItem('novastation_orders', JSON.stringify(orders));
        renderOrders();
    };

    // --- QUẢN LÝ NGƯỜI DÙNG ---
    const getLocalUsers = () => {
        let users = JSON.parse(localStorage.getItem('novastation_users') || '[]');
        if (users.length === 0) {
            const currUser = JSON.parse(localStorage.getItem('novastation_user'));
            if (currUser) users.push({ id: 1, name: currUser.name, email: currUser.email, role: 'Admin', status: 'Hoạt động' });
            users.push({ id: 2, name: 'Người dùng Tester', email: 'tester@gmail.com', role: 'Khách hàng', status: 'Hoạt động' });
            users.push({ id: 3, name: 'Khách hàng B', email: 'khachb@yahoo.com', role: 'Khách hàng', status: 'Khóa' });
            localStorage.setItem('novastation_users', JSON.stringify(users));
        }
        return users;
    };

    const renderUsers = () => {
        const usersBody = document.getElementById('adminUsersBody');
        let users = getLocalUsers();

        usersBody.innerHTML = users.map(u => `
            <tr>
                <td>#${u.id}</td>
                <td><strong>${u.name}</strong></td>
                <td>${u.email}</td>
                <td><span class="badge" style="background: ${u.role==='Admin'?'var(--danger)':'var(--blue)'}">${u.role}</span></td>
                <td><span style="color: #ffffff; font-weight: bold;">${u.status}</span></td>
                <td>
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <button onclick="toggleUserStatus(${u.id})" style="background: transparent; border: none; color: var(--muted); cursor: pointer; padding: 4px; display: inline-flex; align-items: center; justify-content: center; transition: color 0.2s ease;" onmouseover="this.style.color='var(--gold)'" onmouseout="this.style.color='var(--muted)'" title="${u.status==='Khóa' ? 'Mở khóa người dùng' : 'Khóa người dùng'}">
                            ${u.status==='Khóa' ? '<svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 9.9-1"></path></svg>' : '<svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>'}
                        </button>
                        <button onclick="deleteUser(${u.id})" style="background: transparent; border: none; color: var(--muted); cursor: pointer; padding: 4px; display: inline-flex; align-items: center; justify-content: center; transition: color 0.2s ease;" onmouseover="this.style.color='var(--danger)'" onmouseout="this.style.color='var(--muted)'" title="Xóa người dùng"><svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg></button>
                    </div>
                </td>
            </tr>
        `).join('') || '<tr><td colspan="6" style="text-align:center; padding: 20px;">Chưa có người dùng</td></tr>';
    };

    window.toggleUserStatus = (id) => {
        let users = getLocalUsers();
        let targetUser = users.find(x => x.id === id);
        const currentUser = JSON.parse(localStorage.getItem('novastation_user') || '{}');

        if (targetUser) {
            if (targetUser.email === 'novastationadmin@gmail.com' || targetUser.id === currentUser.id) {
                if (typeof showToast === 'function') showToast('Không thể khóa tài khoản Quản trị viên này!');
                else alert('Không thể khóa tài khoản Quản trị viên này!');
                return;
            }
            targetUser.status = targetUser.status === 'Khóa' ? 'Hoạt động' : 'Khóa';
            localStorage.setItem('novastation_users', JSON.stringify(users));
            renderUsers();
            if (typeof showToast === 'function') showToast(`Đã ${targetUser.status === 'Khóa' ? 'khóa' : 'mở khóa'} người dùng!`);
        }
    };

    window.deleteUser = (id) => {
        let users = getLocalUsers();
        let targetUser = users.find(x => x.id === id);
        const currentUser = JSON.parse(localStorage.getItem('novastation_user') || '{}');

        if (targetUser && (targetUser.email === 'novastationadmin@gmail.com' || targetUser.id === currentUser.id)) {
            if (typeof showToast === 'function') showToast('Không thể xóa tài khoản Quản trị viên này!');
            else alert('Không thể xóa tài khoản Quản trị viên này!');
            return;
        }

        if(!confirm('Xóa người dùng này?')) return;
        users = users.filter(x => x.id !== id);
        localStorage.setItem('novastation_users', JSON.stringify(users));
        renderUsers();
        if (typeof showToast === 'function') showToast('Đã xóa người dùng thành công!');
    };

    // --- THỐNG KÊ DOANH THU ---
    const renderStats = () => {
        let orders = getLocalOrders();
        let users = getLocalUsers();
        
        let validOrders = orders.filter(o => !o.status.includes('hủy'));
        let totalRev = validOrders.reduce((sum, o) => sum + o.total, 0);
        
        // Giả lập số lượng game dựa trên tổng tiền (Khoảng 1.2tr / game)
        let totalGamesSold = Math.round(totalRev / 1200000);

        document.getElementById('statTotalRev').textContent = money(totalRev);
        document.getElementById('statTotalOrders').textContent = validOrders.length;
        document.getElementById('statTotalGames').textContent = totalGamesSold;
        document.getElementById('statTotalUsers').textContent = users.length;
    };
});