const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static(__dirname));

// Статические файлы для изображений
app.use('/images', express.static(path.join(__dirname, 'images')));

// Ювелирные товары
let products = [
    { id: 1, name: 'Кольцо "Лунный свет"', price: 12500 },
    { id: 2, name: 'Серьги "Золотая роса"', price: 18900 },
    { id: 3, name: 'Подвеска "Розовое облако"', price: 9500 },
    { id: 4, name: 'Браслет "Серебряный звон"', price: 7500 },
    { id: 5, name: 'Колье "Жемчужная симфония"', price: 23500 },
    { id: 6, name: 'Запонки "Золотой дуб"', price: 8900 },
    { id: 7, name: 'Брошь "Стрекоза"', price: 6500 },
    { id: 8, name: 'Тиара "Королевская ночь"', price: 45000 }
];

let cart = [];

// Главная страница
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Получить все товары
app.get('/api/products', (req, res) => {
    res.json(products);
});

// Получить корзину
app.get('/api/cart', (req, res) => {
    const items = cart.map(item => ({
        ...item,
        product: products.find(p => p.id === item.productId)
    }));
    res.json({ items });
});

// Добавить в корзину
app.post('/api/cart', (req, res) => {
    const { productId, quantity = 1 } = req.body;
    const exist = cart.find(i => i.productId === productId);
    
    if (exist) {
        exist.quantity += quantity;
    } else {
        cart.push({ id: Date.now(), productId, quantity });
    }
    
    res.json({ success: true });
});

// Обновить количество
app.put('/api/cart/:id', (req, res) => {
    const cartItem = cart.find(i => i.id == req.params.id);
    if (cartItem) {
        cartItem.quantity = req.body.quantity;
        res.json({ success: true });
    } else {
        res.status(404).json({ error: 'Товар не найден' });
    }
});

// Удалить из корзины
app.delete('/api/cart/:id', (req, res) => {
    cart = cart.filter(i => i.id != req.params.id);
    res.json({ success: true });
});

app.listen(3000, () => {
    console.log('✅ JUWELIER сервер запущен: http://localhost:3000');
});