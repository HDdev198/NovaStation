/*
  NovaStation — Main JS
  Kamikey-style store interactions
*/

document.addEventListener('DOMContentLoaded', () => {

  const games   = window.gamesData   || [];
  const banners = window.bannersData  || [];
  let cart = JSON.parse(localStorage.getItem('nova_cart')) || [];

  /* ————————————————————
     Elements
  ———————————————————— */
  const cartBadge   = document.getElementById('cart-badge');
  const searchInput = document.getElementById('search-input');
  const searchDrop  = document.getElementById('search-drop');
  const mobileBtn   = document.getElementById('mobile-toggle');
  const navBar      = document.getElementById('nav-bar');
  const catChips    = document.querySelectorAll('.cat-chip');

  /* ————————————————————
     Boot
  ———————————————————— */
  updateBadge();
  renderBanners();
  renderSection('grid-hot',       games.filter(g => g.isHot), 10);
  renderSection('grid-new',       games.filter(g => g.isNew), 10);
  renderSection('grid-sale',      games.filter(g => g.isSale), 10);
  renderSection('grid-featured',  games.filter(g => g.isFeatured), 10);
  renderSection('grid-all',       games);
  initSearch();
  initCats();
  initMobile();

  /* ————————————————————
     BANNERS
  ———————————————————— */
  function renderBanners() {
    const wrap = document.getElementById('banner-grid');
    if (!wrap || !banners.length) return;

    wrap.innerHTML = banners.map(b => {
      const cls = b.type === 'main' ? 'banner-main' : 'banner-side';
      return `
        <a class="banner-card ${cls}" href="#">
          <img src="${b.image}" alt="${b.title.replace('\n',' ')}" class="banner-img" loading="eager">
          <div class="banner-overlay"></div>
          <div class="banner-label">
            <span class="banner-tag">${b.tag}</span>
            <div class="banner-title">${b.title.replace('\n', '<br>')}</div>
            <div class="banner-price">${b.price}</div>
          </div>
        </a>
      `;
    }).join('');
  }

  /* ————————————————————
     PRODUCT GRID
  ———————————————————— */
  function renderSection(id, items, max = 100) {
    const el = document.getElementById(id);
    if (!el) return;
    const list = items.slice(0, max);
    if (!list.length) {
      el.innerHTML = `<p style="grid-column:1/-1;color:var(--text-muted);font-size:0.85rem;">Không có sản phẩm.</p>`;
      return;
    }
    el.innerHTML = list.map(cardHTML).join('');
    el.querySelectorAll('.p-add').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        addToCart(Number(btn.dataset.id));
      });
    });
  }

  function cardHTML(g) {
    const hasDeal    = g.discount > 0;
    const oldPriceHtml = hasDeal
      ? `<span class="p-old">$${g.originalPrice.toFixed(2)}</span>` : '';
    const discountHtml = hasDeal
      ? `<span class="p-discount">-${g.discount}%</span>` : '';

    const newBadge  = g.isNew  ? `<span class="badge badge-new">New</span>`  : '';
    const hotBadge  = g.isHot  ? `<span class="badge badge-hot">Hot</span>` : '';

    return `
      <div class="p-card">
        <div class="p-cover">
          <img src="${g.image}" alt="${g.title}" class="p-img" loading="lazy">
          <div class="p-badges">${newBadge}${hotBadge}</div>
        </div>
        <div class="p-info">
          <div class="p-title" title="${g.title}">${g.title}</div>
          <div class="p-pricing">
            <div class="p-price-block">
              ${oldPriceHtml}
              <span class="p-price">$${g.price.toFixed(2)}</span>
            </div>
            ${discountHtml}
          </div>
          <button class="p-add" data-id="${g.id}">
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
            Thêm vào giỏ
          </button>
        </div>
      </div>
    `;
  }

  /* ————————————————————
     CATEGORY FILTER
  ———————————————————— */
  function initCats() {
    catChips.forEach(chip => {
      chip.addEventListener('click', () => {
        catChips.forEach(c => c.classList.remove('on'));
        chip.classList.add('on');
        const genre = chip.dataset.cat;
        const filtered = genre === 'all'
          ? games
          : games.filter(g => g.category.toLowerCase() === genre.toLowerCase());
        renderSection('grid-all', filtered);
      });
    });
  }

  /* ————————————————————
     LIVE SEARCH
  ———————————————————— */
  function initSearch() {
    if (!searchInput || !searchDrop) return;

    searchInput.addEventListener('input', () => {
      const q = searchInput.value.trim().toLowerCase();
      if (q.length < 2) { searchDrop.classList.remove('open'); return; }

      const hits = games.filter(g =>
        g.title.toLowerCase().includes(q) ||
        g.category.toLowerCase().includes(q)
      ).slice(0, 7);

      showDrop(hits, q);
    });

    searchInput.addEventListener('focus', () => {
      if (searchInput.value.trim().length >= 2) searchDrop.classList.add('open');
    });

    document.addEventListener('click', e => {
      if (!searchInput.closest('.header-search')?.contains(e.target)) {
        searchDrop.classList.remove('open');
      }
    });
  }

  function showDrop(results, q) {
    if (!results.length) {
      searchDrop.innerHTML = `<div class="drop-empty">Không tìm thấy game nào cho "<strong>${q}</strong>"</div>`;
      searchDrop.classList.add('open');
      return;
    }

    searchDrop.innerHTML = results.map(g => `
      <div class="drop-item" data-id="${g.id}">
        <img src="${g.image}" alt="${g.title}" class="drop-img">
        <div style="flex:1;min-width:0;">
          <div class="drop-name">${g.title}</div>
          <div class="drop-cat">${g.category} · PS5</div>
        </div>
        <span class="drop-price">$${g.price.toFixed(2)}</span>
      </div>
    `).join('');

    searchDrop.querySelectorAll('.drop-item').forEach(item => {
      item.addEventListener('click', () => {
        addToCart(Number(item.dataset.id));
        searchDrop.classList.remove('open');
        searchInput.value = '';
      });
    });

    searchDrop.classList.add('open');
  }

  /* ————————————————————
     MOBILE NAV
  ———————————————————— */
  function initMobile() {
    if (!mobileBtn || !navBar) return;

    const open  = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>`;
    const close = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;
    mobileBtn.innerHTML = open;

    mobileBtn.addEventListener('click', () => {
      const isOpen = navBar.classList.toggle('mobile-open');
      mobileBtn.innerHTML = isOpen ? close : open;
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
  }

  /* ————————————————————
     CART
  ———————————————————— */
  function addToCart(id) {
    const game = games.find(g => g.id === id);
    if (!game) return;

    const ex = cart.find(i => i.id === id);
    if (ex) { ex.qty += 1; }
    else     { cart.push({ id: game.id, title: game.title, price: game.price, image: game.image, qty: 1 }); }

    localStorage.setItem('nova_cart', JSON.stringify(cart));
    updateBadge();
    toast('Đã thêm vào giỏ hàng', `"${game.title}" đã được thêm.`, 'ok');
  }

  function updateBadge() {
    if (!cartBadge) return;
    const n = cart.reduce((s, i) => s + i.qty, 0);
    cartBadge.textContent = n > 99 ? '99+' : n;
    cartBadge.classList.toggle('on', n > 0);
  }

  /* ————————————————————
     TOASTS
  ———————————————————— */
  function toast(title, text, type = 'ok') {
    let wrap = document.querySelector('.toast-wrap');
    if (!wrap) {
      wrap = document.createElement('div');
      wrap.className = 'toast-wrap';
      document.body.appendChild(wrap);
    }

    const icon = type === 'ok'
      ? `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="#16a34a" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>`
      : `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="#e03054" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`;

    const t = document.createElement('div');
    t.className = `toast ${type}`;
    t.innerHTML = `
      <div class="toast-icon">${icon}</div>
      <div>
        <div class="toast-ttl">${title}</div>
        <div class="toast-txt">${text}</div>
      </div>
    `;
    wrap.appendChild(t);

    setTimeout(() => {
      t.classList.add('out');
      t.addEventListener('animationend', () => t.remove(), { once: true });
    }, 3500);
  }

});
