// Ювелирные товары с деталями
let products = [
    { 
        id: 1, 
        name: 'Кольцо "Лунный свет"', 
        price: 12500,
        category: 'ring',
        metal: 'gold',
        metalName: 'Золото 585',
        size: '16, 17, 18, 19',
        weight: '2.3 г',
        stone: 'Фианит',
        image: 'https://disk.yandex.ru/i/IFJz7-IBI_mqSg'
    },
    { 
        id: 2, 
        name: 'Серьги "Золотая роса"', 
        price: 18900,
        category: 'earrings',
        metal: 'gold',
        metalName: 'Золото 750',
        size: 'One size',
        weight: '3.1 г',
        stone: 'Бриллианты 0.15 ct',
        image: 'https://i.pinimg.com/736x/77/92/3e/77923e5757f59998e931c1598b0d4103.jpg'
    },
    { 
        id: 3, 
        name: 'Подвеска "Розовое облако"', 
        price: 9500,
        category: 'pendant',
        metal: 'silver',
        metalName: 'Серебро 925',
        size: '4x2 см',
        weight: '1.8 г',
        stone: 'Розовый кварц',
        image: 'https://i.pinimg.com/736x/b0/e0/04/b0e004c35eb432b79d0505098ac5ed95.jpg'
    },
    { 
        id: 4, 
        name: 'Браслет "Серебряный звон"', 
        price: 7500,
        category: 'bracelet',
        metal: 'silver',
        metalName: 'Серебро 925',
        size: '17-19 см',
        weight: '4.2 г',
        stone: 'Аметист',
        image: 'https://via.placeholder.com/300/E5C1C4/white?text=Bracelet'
    },
    { 
        id: 5, 
        name: 'Кольцо "Королевская ночь"', 
        price: 35000,
        category: 'ring',
        metal: 'platinum',
        metalName: 'Платина 950',
        size: '15-20',
        weight: '5.7 г',
        stone: 'Бриллиант 0.5 ct',
        image: 'https://i.pinimg.com/736x/b0/e0/04/b0e004c35eb432b79d0505098ac5ed95.jpg'
    },
    { 
        id: 6, 
        name: 'Серьги "Лунный свет"', 
        price: 12500,
        category: 'earrings',
        metal: 'silver',
        metalName: 'Серебро 925',
        size: 'One size',
        weight: '2.5 г',
        stone: 'Лунный камень',
        image: 'https://via.placeholder.com/300/C9C59A/white?text=Moon+Earrings'
    }
];

let cart = [];
let currentCategoryFilter = 'all';
let currentMetalFilter = 'all';
let currentSort = 'default';

// Загрузка и отображение товаров с фильтрацией
function loadProducts() {
    let filteredProducts = [...products];
    
    // Фильтр по категории
    if (currentCategoryFilter !== 'all') {
        filteredProducts = filteredProducts.filter(p => p.category === currentCategoryFilter);
    }
    
    // Фильтр по металлу
    if (currentMetalFilter !== 'all') {
        filteredProducts = filteredProducts.filter(p => p.metal === currentMetalFilter);
    }
    
    // Сортировка
    if (currentSort === 'price-asc') {
        filteredProducts.sort((a, b) => a.price - b.price);
    } else if (currentSort === 'price-desc') {
        filteredProducts.sort((a, b) => b.price - a.price);
    } else if (currentSort === 'name-asc') {
        filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
    } else if (currentSort === 'name-desc') {
        filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
    }
    
    const container = document.getElementById('products-list');
    container.innerHTML = filteredProducts.map(product => `
        <div class="product-card" onclick="toggleDetails(${product.id})">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/300/C9C59A/white?text=Jewelry'">
            </div>
            <div class="product-info">
                <div class="product-title">${product.name}</div>
                <div class="product-price">${product.price.toLocaleString()} ₽</div>
                <button class="add-to-cart" onclick="event.stopPropagation(); addToCart(${product.id})">
                    В корзину
                </button>
            </div>
            <div class="product-details" id="details-${product.id}">
                <div class="detail-row">
                    <span class="detail-label">Металл:</span>
                    <span class="detail-value metal-${product.metal}">${product.metalName}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Размер:</span>
                    <span class="detail-value">${product.size}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Вес:</span>
                    <span class="detail-value">${product.weight}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Камень:</span>
                    <span class="detail-value">${product.stone}</span>
                </div>
            </div>
        </div>
    `).join('');
}

// Разворачивание карточки
function toggleDetails(productId) {
    const card = document.querySelector(`.product-card`); // Нужно улучшить
    // Находим карточку по id в data-атрибуте
    const cards = document.querySelectorAll('.product-card');
    cards.forEach(card => {
        const btn = card.querySelector('.add-to-cart');
        // Простой способ: закрываем другие, открываем выбранную
    });
    
    const detailsDiv = document.getElementById(`details-${productId}`);
    const cardDiv = detailsDiv.closest('.product-card');
    
    if (cardDiv.classList.contains('expanded')) {
        cardDiv.classList.remove('expanded');
    } else {
        // Закрываем все другие
        document.querySelectorAll('.product-card').forEach(c => c.classList.remove('expanded'));
        cardDiv.classList.add('expanded');
    }
}

// Добавление в корзину
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            id: productId,
            name: product.name,
            price: product.price,
            metal: product.metalName,
            size: product.size,
            quantity: 1
        });
    }
    
    updateCartDisplay();
    updateCartCount();
    saveCartToLocalStorage();
    showNotification(`${product.name} добавлено в корзину`);
}

// Обновление корзины
function updateCartDisplay() {
    const cartContainer = document.getElementById('cart-list');
    
    if (cart.length === 0) {
        cartContainer.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-bag"></i>
                <p>Корзина пуста</p>
            </div>
        `;
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    cartContainer.innerHTML = `
        ${cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-details">
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-price">${item.price.toLocaleString()} ₽</div>
                    <div class="cart-item-meta" style="font-size: 12px; color: #999;">
                        ${item.metal}, ${item.size}
                    </div>
                    <div class="cart-item-controls">
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                        <button class="delete-btn" onclick="removeFromCart(${item.id})">Удалить</button>
                    </div>
                </div>
            </div>
        `).join('')}
        <div class="cart-total">
            <span>Итого:</span>
            <span>${total.toLocaleString()} ₽ (${totalQty} шт.)</span>
        </div>
    `;
}

// Обновление количества
function updateQuantity(productId, newQuantity) {
    if (newQuantity <= 0) {
        removeFromCart(productId);
        return;
    }
    const item = cart.find(i => i.id === productId);
    if (item) {
        item.quantity = newQuantity;
        updateCartDisplay();
        updateCartCount();
        saveCartToLocalStorage();
    }
}

// Удаление из корзины
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartDisplay();
    updateCartCount();
    saveCartToLocalStorage();
    showNotification('Товар удален');
}

// Обновление счетчика
function updateCartCount() {
    const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCount = document.getElementById('cart-count');
    if (cartCount) cartCount.textContent = totalQty;
}

// Сохранение/загрузка
function saveCartToLocalStorage() {
    localStorage.setItem('jewelry-cart', JSON.stringify(cart));
}

function loadCartFromLocalStorage() {
    const savedCart = localStorage.getItem('jewelry-cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartDisplay();
        updateCartCount();
    }
}

// Уведомления
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #C9C59A;
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        z-index: 2000;
        animation: slideIn 0.3s ease;
    `;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 2000);
}

// Фильтры и сортировка
function setupFilters() {
    // Фильтр по категории
    document.querySelectorAll('[data-filter]').forEach(el => {
        el.addEventListener('click', (e) => {
            document.querySelectorAll('[data-filter]').forEach(f => f.classList.remove('active'));
            el.classList.add('active');
            currentCategoryFilter = el.getAttribute('data-filter');
            loadProducts();
        });
    });
    
    // Фильтр по металлу
    document.querySelectorAll('[data-metal]').forEach(el => {
        el.addEventListener('click', () => {
            currentMetalFilter = el.getAttribute('data-metal');
            loadProducts();
        });
    });
    
    // Сортировка
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            currentSort = e.target.value;
            loadProducts();
        });
    }
}

// Открытие корзины
function toggleCart() {
    const sidebar = document.getElementById('cart-sidebar');
    const overlay = document.getElementById('cart-overlay');
    sidebar.classList.toggle('open');
    overlay.classList.toggle('show');
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    loadCartFromLocalStorage();
    setupFilters();
    document.querySelector('.cart-icon')?.addEventListener('click', toggleCart);
});

// Стиль для уведомлений
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    .product-card {
        cursor: pointer;
    }
    .add-to-cart {
        cursor: pointer;
    }
`;
document.head.appendChild(style);