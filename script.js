const flowers = [
    { id: 1, name: 'Троянди', description: 'Класичний букет червоних троянд, символ кохання та пристрасті.', price: 500, image: 'https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb' },
    { id: 2, name: 'Тюльпани', description: 'Яскравий весняний букет тюльпанів різних кольорів.', price: 300, image: 'https://images.unsplash.com/photo-1612247258675-efb7b05b61e8?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb' },
    { id: 3, name: 'Півонії', description: 'Пишний букет рожевих півоній, що додає романтики.', price: 600, image: 'https://images.unsplash.com/photo-1550860033-3a1a4a4c3e0e?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb' },
    { id: 4, name: 'Орхідеї', description: 'Екзотичний букет орхідей для особливих моментів.', price: 700, image: 'https://images.unsplash.com/photo-1614975619548-9a0d6b5a7a7d?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb' },
    { id: 5, name: 'Гортензії', description: 'Ніжний букет гортензій у пастельних тонах.', price: 450, image: 'https://images.unsplash.com/photo-1563208545-6f2b0c3e41b5?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb' },
    { id: 6, name: 'Гербери', description: 'Веселий букет гербер, що піднімає настрій.', price: 350, image: 'https://images.unsplash.com/photo-1624996379697-f64b62146fcd?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb' },
    { id: 7, name: 'Лілії', description: 'Елегантний букет лілій з приємним ароматом.', price: 550, image: 'https://images.unsplash.com/photo-1589052328205-8673e4c5d970?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb' },
    { id: 8, name: 'Хризантеми', description: 'Осінній букет хризантем для затишку.', price: 400, image: 'https://images.unsplash.com/photo-1604088545913-5db867e65f4d?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb' },
    { id: 9, name: 'Альстромерії', description: 'Довговічний букет альстромерій у яскравих кольорах.', price: 320, image: 'https://images.unsplash.com/photo-1619221934374-cca8e8a5a1f7?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb' },
    { id: 10, name: 'Гвоздики', description: 'Класичний букет гвоздик для свят.', price: 280, image: 'https://images.unsplash.com/photo-1597067820855-3a4d7ee92d0c?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb' }
];

let cart = [];

if (document.getElementById('gallery')) {
    const gallery = document.getElementById('gallery');
    flowers.forEach(flower => {
        const div = document.createElement('div');
        div.classList.add('product');
        div.innerHTML = `
            <img src="${flower.image}" alt="${flower.name}">
            <h2>${flower.name}</h2>
            <p>${flower.description}</p>
            <p>Ціна: ${flower.price} грн</p>
            <button onclick="addToCart(${flower.id})">Обрати</button>
        `;
        gallery.appendChild(div);
    });
}

function addToCart(id) {
    const flower = flowers.find(f => f.id === id);
    cart.push(flower);
    updateCart();
}

function updateCart() {
    if (document.getElementById('cart-items')) {
        const cartItems = document.getElementById('cart-items');
        cartItems.innerHTML = '';
        let total = 0;
        cart.forEach(item => {
            const div = document.createElement('div');
            div.innerHTML = `<p>${item.name} - ${item.price} грн</p>`;
            cartItems.appendChild(div);
            total += item.price;
        });
        document.getElementById('total').textContent = total;
    }
}

if (document.getElementById('order-form')) {
    document.getElementById('order-form').addEventListener('submit', function(e) {
        e.preventDefault();
        if (cart.length > 0) {
            alert('Замовлення прийнято! Дякуємо за покупку.');
            cart = [];
            updateCart();
        } else {
            alert('Кошик порожній!');
        }
    });
}

if (document.getElementById('cart-items')) {
    updateCart();
}