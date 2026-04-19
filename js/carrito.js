// ==========================================
// CARRITO, WISHLIST Y CHECKOUT
// ==========================================
const cartSidebar = document.getElementById('cartSidebar');
document.getElementById('btnCartToggle').onclick = () => cartSidebar.classList.add('open');
document.getElementById('closeCart').onclick = () => cartSidebar.classList.remove('open');

window.agregarAlCarrito = function(id) {
    const producto = products.find(p => p.id === id);
    const itemEnCarrito = cart.find(item => item.id === id);
    if (itemEnCarrito) itemEnCarrito.cantidad++;
    else cart.push({ ...producto, cantidad: 1 });
    guardarYActualizarCarrito();
    mostrarToast(`${producto.nombre} añadido.`, 'normal');
};

window.cambiarCantidad = (id, delta) => {
    const item = cart.find(i => i.id === id);
    if(item) { item.cantidad += delta; if(item.cantidad <= 0) cart = cart.filter(i => i.id !== id); guardarYActualizarCarrito(); }
};

window.eliminarDelCarrito = (id) => {
    cart = cart.filter(i => i.id !== id);
    guardarYActualizarCarrito();
};

function guardarYActualizarCarrito() {
    localStorage.setItem('pd_cart_cop', JSON.stringify(cart));
    actualizarCarritoUI();
}

function actualizarCarritoUI() {
    const cartItemsCont = document.getElementById('cartItems');
    cartItemsCont.innerHTML = '';
    let subtotal = 0; let cantidadTotal = 0;
    cart.forEach(item => {
        subtotal += item.precio * item.cantidad; cantidadTotal += item.cantidad;
        cartItemsCont.innerHTML += `
            <div class="cart-item fade-in">
                <img src="${item.img}" onerror="this.src='https://via.placeholder.com/60'">
                <div class="cart-item-info">
                    <h4>${item.nombre}</h4><p style="color:var(--neon-pink); font-weight:bold;">$${item.precio.toLocaleString('es-CO')}</p>
                    <div style="margin-top:5px; display:flex; gap:10px; align-items:center;">
                        <button onclick="cambiarCantidad(${item.id}, -1)" class="btn-icon"><i class="fa-solid fa-minus"></i></button>
                        <span>${item.cantidad}</span>
                        <button onclick="cambiarCantidad(${item.id}, 1)" class="btn-icon"><i class="fa-solid fa-plus"></i></button>
                    </div>
                </div>
                <div class="cart-item-actions"><button onclick="eliminarDelCarrito(${item.id})"><i class="fa-solid fa-trash"></i></button></div>
            </div>`;
    });
    document.getElementById('cartCount').innerText = cantidadTotal;
    const metaEnvio = 150000;
    let shipping = subtotal >= metaEnvio || subtotal === 0 ? 0 : 15000;
    let porcentaje = Math.min((subtotal / metaEnvio) * 100, 100);
    const fillEnvio = document.getElementById('shippingFill');
    fillEnvio.style.width = `${porcentaje}%`;
    document.getElementById('cartTotal').innerText = (subtotal + (subtotal * 0.1) + shipping).toLocaleString('es-CO');
}

// WISHLIST
window.toggleWishlist = (id) => {
    const index = wishlist.indexOf(id);
    index === -1 ? wishlist.push(id) : wishlist.splice(index, 1);
    localStorage.setItem('pd_wishlist', JSON.stringify(wishlist));
    actualizarWishlistUI(); renderProducts(products);
};
function actualizarWishlistUI() { document.getElementById('wishlistCount').innerText = wishlist.length; }

// CHECKOUT
window.abrirCheckout = () => {
    if(cart.length === 0) { mostrarAlertaPersonalizada('error', 'Carrito Vacío', 'Añade productos primero.'); return; }
    document.getElementById('checkoutTotal').innerText = document.getElementById('cartTotal').innerText;
    cartSidebar.classList.remove('open'); document.getElementById('checkoutModal').classList.add('active');
};

document.getElementById('paymentForm').onsubmit = function(e) {
    e.preventDefault();
    mostrarAlertaPersonalizada('success', '¡Pago Exitoso!', `Código: PD-${Math.floor(Math.random()*9000000)}`);
    cart = []; guardarYActualizarCarrito(); document.getElementById('checkoutModal').classList.remove('active');
};

// LOGIN / AUTH
const userNameDisplay = document.getElementById('userNameDisplay');
document.getElementById('authForm').onsubmit = (e) => {
    e.preventDefault();
    const aliasInput = document.getElementById('alias').value.trim().toLowerCase();
    currentUserRole = aliasInput === 'admin' ? 'admin' : 'anonymous_user';
    currentAlias = document.getElementById('alias').value;
    userNameDisplay.innerText = currentAlias;
    document.getElementById('btnAdminPanel').classList.toggle('hidden', currentUserRole !== 'admin');
    document.getElementById('authModal').classList.remove('active'); renderProducts(products);
};