
document.addEventListener('DOMContentLoaded', () => {
    const u = JSON.parse(localStorage.getItem('novastation_user') || '{}');
    const allOrders = JSON.parse(localStorage.getItem('novastation_orders') || '[]');
    const orders = allOrders.filter(o => o.customerEmail === u.email);

    function renderOrders() {
        document.querySelector('#ordersBody').innerHTML = orders.length
            ? orders.map(o => `
                <tr>
                    <td>${o.id}</td>
                    <td>${o.date}</td>
                    <td>${money(o.total)}</td>
                    <td><span class="status ${o.status.includes('hoàn') || o.status.includes('thanh') ? 'done' : 'pending'}">${o.status}</span></td>
                    <td><button onclick="showOrderDetail('${o.id}')" style="background: linear-gradient(135deg, var(--blue, #1a6ef7), #0755dc); color: #fff; border: none; border-radius: 6px; padding: 6px 14px; font-size: 12px; font-weight: 600; cursor: pointer; transition: 0.2s; letter-spacing: 0.3px;" onmouseover="this.style.opacity='0.85'" onmouseout="this.style.opacity='1'">Xem chi tiết</button></td>
                </tr>
            `).join('')
            : '<tr><td colspan="5" style="text-align:center;padding:30px">Bạn chưa có đơn hàng nào.</td></tr>';
    }

    renderOrders();

    // ---- Modal Chi tiết đơn hàng ----
    window.showOrderDetail = function(orderId) {
        const allOrds = JSON.parse(localStorage.getItem('novastation_orders') || '[]');
        const o = allOrds.find(x => x.id === orderId);
        if (!o) return;

        // Tạo overlay nếu chưa có
        let overlay = document.getElementById('order-detail-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.id = 'order-detail-overlay';
            Object.assign(overlay.style, {
                position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
                background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                zIndex: 10000, opacity: 0, transition: 'opacity 0.3s'
            });
            overlay.addEventListener('click', e => { if (e.target === overlay) closeOrderDetail(); });
            document.body.appendChild(overlay);
        }

        const items = o.items && o.items.length > 0
            ? o.items.map(i => `
                <div style="display:flex;align-items:center;gap:14px;padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.07);">
                    <img src="${i.image || ''}" alt="${i.title}" onerror="this.style.display='none'" style="width:54px;height:72px;object-fit:cover;border-radius:6px;border:1px solid rgba(255,255,255,0.1);flex-shrink:0;">
                    <div style="flex:1;min-width:0;">
                        <div style="color:#fff;font-weight:600;font-size:13px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${i.title}</div>
                        <div style="color:rgba(255,255,255,0.45);font-size:12px;margin-top:4px;">Số lượng: ${i.qty}</div>
                        <div style="color:rgba(255,255,255,0.45);font-size:12px;">Đơn giá: ${money(i.price)}</div>
                    </div>
                    <div style="color:#fff;font-weight:700;font-size:14px;white-space:nowrap;">${money(i.price * i.qty)}</div>
                </div>
            `).join('')
            : '<p style="color:rgba(255,255,255,0.4);text-align:center;font-size:13px;padding:20px 0;">Không có thông tin sản phẩm.</p>';

        const statusClass = o.status.includes('hoàn') || o.status.includes('thanh') ? 'done' : 'pending';

        overlay.innerHTML = `
            <div style="background:#0d1117;border:1px solid rgba(255,255,255,0.1);border-radius:12px;width:min(540px,94vw);max-height:88vh;overflow-y:auto;box-shadow:0 24px 64px rgba(0,0,0,0.6);position:relative;animation:slideUp 0.3s cubic-bezier(0.34,1.56,0.64,1);">
                <style>@keyframes slideUp{from{transform:translateY(30px);opacity:0}to{transform:translateY(0);opacity:1}}</style>

                <!-- Header -->
                <div style="padding:20px 24px 16px;border-bottom:1px solid rgba(255,255,255,0.08);display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;background:#0d1117;z-index:1;border-radius:12px 12px 0 0;">
                    <div>
                        <div style="color:#fff;font-weight:700;font-size:16px;">Chi tiết đơn hàng</div>
                        <div style="color:rgba(255,255,255,0.4);font-size:12px;margin-top:2px;">${o.id} &nbsp;·&nbsp; ${o.date}</div>
                    </div>
                    <button onclick="closeOrderDetail()" style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);color:rgba(255,255,255,0.7);border-radius:50%;width:32px;height:32px;cursor:pointer;font-size:18px;display:flex;align-items:center;justify-content:center;transition:0.2s;" onmouseover="this.style.background='rgba(255,255,255,0.12)'" onmouseout="this.style.background='rgba(255,255,255,0.06)'">&times;</button>
                </div>

                <!-- Trạng thái -->
                <div style="padding:14px 24px;display:flex;align-items:center;gap:10px;background:rgba(255,255,255,0.02);border-bottom:1px solid rgba(255,255,255,0.06);">
                    <svg viewBox="0 0 24 24" width="16" height="16" stroke="${statusClass === 'done' ? '#22c55e' : '#f59e0b'}" stroke-width="2" fill="none"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                    <span style="color:${statusClass === 'done' ? '#22c55e' : '#f59e0b'};font-weight:600;font-size:13px;">${o.status}</span>
                </div>

                <!-- Thông tin người mua -->
                <div style="padding:16px 24px;border-bottom:1px solid rgba(255,255,255,0.06);">
                    <div style="color:rgba(255,255,255,0.5);font-size:11px;text-transform:uppercase;letter-spacing:1px;margin-bottom:10px;font-weight:600;">Thông tin người mua</div>
                    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
                        ${o.customerName ? `<div style="font-size:13px;"><span style="color:rgba(255,255,255,0.4);">Tên:</span> <span style="color:#fff;font-weight:500;">${o.customerName}</span></div>` : ''}
                        ${o.customerPhone ? `<div style="font-size:13px;"><span style="color:rgba(255,255,255,0.4);">SĐT:</span> <span style="color:#fff;font-weight:500;">${o.customerPhone}</span></div>` : ''}
                        ${o.customerEmail ? `<div style="font-size:13px;grid-column:1/-1;"><span style="color:rgba(255,255,255,0.4);">Email:</span> <span style="color:#fff;font-weight:500;">${o.customerEmail}</span></div>` : ''}
                        ${o.address ? `<div style="font-size:13px;grid-column:1/-1;"><span style="color:rgba(255,255,255,0.4);">Địa chỉ:</span> <span style="color:#fff;font-weight:500;">${o.address}</span></div>` : ''}
                    </div>
                </div>

                <!-- Danh sách sản phẩm -->
                <div style="padding:16px 24px;border-bottom:1px solid rgba(255,255,255,0.06);">
                    <div style="color:rgba(255,255,255,0.5);font-size:11px;text-transform:uppercase;letter-spacing:1px;margin-bottom:4px;font-weight:600;">Sản phẩm đã mua</div>
                    ${items}
                </div>

                <!-- Tổng tiền -->
                <div style="padding:16px 24px;display:flex;justify-content:space-between;align-items:center;">
                    <span style="color:rgba(255,255,255,0.5);font-size:14px;">Tổng thanh toán</span>
                    <span style="color:#fff;font-size:20px;font-weight:700;">${money(o.total)}</span>
                </div>
            </div>
        `;

        overlay.style.display = 'flex';
        setTimeout(() => overlay.style.opacity = 1, 10);
    };

    window.closeOrderDetail = function() {
        const overlay = document.getElementById('order-detail-overlay');
        if (!overlay) return;
        overlay.style.opacity = 0;
        setTimeout(() => overlay.style.display = 'none', 300);
    };
});

