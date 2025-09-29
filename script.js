const flowers = [
    { id: 1, name: 'Троянди', description: 'Класичний букет червоних троянд, символ кохання та пристрасті.', price: 500, image: 'https://images.pexels.com/photos/19269253/pexels-photo-19269253.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
    { id: 2, name: 'Тюльпани', description: 'Яскравий весняний букет тюльпанів різних кольорів.', price: 300, image: 'https://images.pexels.com/photos/7664379/pexels-photo-7664379.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
    { id: 3, name: 'Півонії', description: 'Пишний букет рожевих півоній, що додає романтики.', price: 600, image: 'https://images.pexels.com/photos/10266847/pexels-photo-10266847.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
    { id: 4, name: 'Орхідеї', description: 'Екзотичний букет орхідей для особливих моментів.', price: 700, image: 'https://images.pexels.com/photos/11577348/pexels-photo-11577348.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
    { id: 5, name: 'Гортензії', description: 'Ніжний букет гортензій у пастельних тонах.', price: 450, image: 'https://images.pexels.com/photos/18703647/pexels-photo-18703647.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
    { id: 6, name: 'Гербери', description: 'Веселий букет гербер, що піднімає настрій.', price: 350, image: 'https://images.pexels.com/photos/17555771/pexels-photo-17555771.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
    { id: 7, name: 'Лілії', description: 'Елегантний букет лілій з приємним ароматом.', price: 550, image: 'https://images.pexels.com/photos/16687847/pexels-photo-16687847.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
    { id: 8, name: 'Хризантеми', description: 'Осінній букет хризантем для затишку.', price: 400, image: 'https://images.pexels.com/photos/14145345/pexels-photo-14145345.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
    { id: 9, name: 'Альстромерії', description: 'Довговічний букет альстромерій у яскравих кольорах.', price: 320, image: 'https://images.pexels.com/photos/36729/alstroemeria-peruvian-lily-flowers-plant.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
    { id: 10, name: 'Гвоздики', description: 'Класичний букет гвоздик для свят.', price: 280, image: 'https://images.pexels.com/photos/894753/pexels-photo-894753.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' }
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

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
    const quantity = parseInt(prompt(`Введіть кількість для "${flower.name}" (за замовчуванням 1):`, '1')) || 1;
    if (quantity > 0) {
        const existingItem = cart.find(item => item.flower.id === id);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({ flower, quantity });
        }
        saveCart();
        alert(`${flower.name} x ${quantity} додано до кошика!`);
        updateCart();
    }
}

function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    updateCart();
}

function updateCart() {
    if (document.getElementById('cart-items')) {
        const cartItems = document.getElementById('cart-items');
        cartItems.innerHTML = '';
        let total = 0;
        cart.forEach((item, index) => {
            const subtotal = item.flower.price * item.quantity;
            const div = document.createElement('div');
            div.innerHTML = `<p>${item.flower.name} - ${item.quantity} шт. x ${item.flower.price} грн = ${subtotal} грн <button onclick="removeFromCart(${index})">Видалити</button></p>`;
            cartItems.appendChild(div);
            total += subtotal;
        });
        document.getElementById('total').textContent = total;
    }
}

if (document.getElementById('order-form')) {
    document.getElementById('order-form').addEventListener('submit', function(e) {
        e.preventDefault();
        if (cart.length > 0) {
            const orderList = cart.map(item => `${item.flower.name} x ${item.quantity}`).join(', ');
            alert(`Замовлення прийнято! Дякуємо за покупку. Ваше замовлення: ${orderList}`);
            cart = [];
            saveCart();
            updateCart();
        } else {
            alert('Кошик порожній!');
        }
    });
}

if (document.getElementById('cart-items')) {
    updateCart();
}
