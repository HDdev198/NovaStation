const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
// Đường dẫn trỏ thẳng tới file games.js của bạn
const FILE_PATH = path.join(__dirname, 'data', 'games.js');

const server = http.createServer((req, res) => {
    // Cấp quyền CORS để trang Admin của bạn được phép gửi dữ liệu tới đây
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.writeHead(204).end();

    if (req.url === '/api/save' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => { body += chunk.toString(); });
        req.on('end', () => {
            try {
                // Ghi đè trực tiếp dữ liệu mới vào file vật lý
                const content = `window.NS_GAMES=${body};`;
                fs.writeFileSync(FILE_PATH, content, 'utf8');
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true }));
                console.log('✅ Đã cập nhật file data/games.js thành công!');
            } catch (err) {
                res.writeHead(500).end('Lỗi ghi file');
                console.error('❌ Lỗi ghi file:', err);
            }
        });
    } else {
        res.writeHead(404).end();
    }
});

server.listen(PORT, () => {
    console.log(`\n🚀 Server Auto-Save đang chạy...`);
    console.log(`Bây giờ bạn thêm/sửa game trên trang Admin, dữ liệu sẽ ghi thẳng vào file data/games.js!\n`);
});