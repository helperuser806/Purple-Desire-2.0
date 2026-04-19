// =========================================================
// CARRITO.JS - CARRITO, WISHLIST, CHECKOUT Y AUTH
// ---------------------------------------------------------
// Este archivo controla:
// - Carrito de compras
// - Wishlist (favoritos)
// - Checkout (pago)
// - Autenticación básica (alias/admin)
// =========================================================



// =========================================================
// REFERENCIAS DEL DOM
// =========================================================

const cartSidebar = document.getElementById('cartSidebar');



// =========================================================
// CONTROL DE APERTURA / CIERRE DEL CARRITO
// =========================================================

document.getElementById('btnCartToggle').onclick = () =>
    cartSidebar.classList.add('open');

document.getElementById('closeCart').onclick = () =>
    cartSidebar.classList.remove('open');



// =========================================================
// AGREGAR PRODUCTO AL CARRITO
// ---------------------------------------------------------
// Si el producto ya existe → aumenta cantidad
// Si no → lo agrega
// =========================================================

window.agregarAlCarrito = function(id) {

    const producto = products.find(p => p.id === id);

    const itemEnCarrito = cart.find(item => item.id === id);



    // =====================================================
    // SI YA EXISTE → INCREMENTAR
    // =====================================================
    if (itemEnCarrito) {
        itemEnCarrito.cantidad++;
    }

    // =====================================================
    // SI NO EXISTE → AGREGAR
    // =====================================================
    else {
        cart.push({ ...producto, cantidad: 1 });
    }



    guardarYActualizarCarrito();

    mostrarToast(`${producto.nombre} añadido.`, 'normal');
};



// =========================================================
// CAMBIAR CANTIDAD (+ / -)
// =========================================================

window.cambiarCantidad = (id, delta) => {

    const item = cart.find(i => i.id === id);

    if (item) {

        item.cantidad += delta;

        // Si llega a 0 → eliminar
        if (item.cantidad <= 0) {
            cart = cart.filter(i => i.id !== id);
        }

        guardarYActualizarCarrito();
    }
};



// =========================================================
// ELIMINAR PRODUCTO DEL CARRITO
// =========================================================

window.eliminarDelCarrito = (id) => {

    cart = cart.filter(i => i.id !== id);

    guardarYActualizarCarrito();
};



// =========================================================
// GUARDAR + ACTUALIZAR UI
// ---------------------------------------------------------
// Sincroniza localStorage + interfaz
// =========================================================

function guardarYActualizarCarrito() {

    localStorage.setItem('pd_cart_cop', JSON.stringify(cart));

    actualizarCarritoUI();
};



// =========================================================
// ACTUALIZAR INTERFAZ DEL CARRITO
// ---------------------------------------------------------
// Renderiza:
// - productos
// - subtotal
// - total
// - envío
// =========================================================

function actualizarCarritoUI() {

    const cartItemsCont = document.getElementById('cartItems');

    cartItemsCont.innerHTML = '';



    let subtotal = 0;

    let cantidadTotal = 0;



    // =====================================================
    // RECORRER ITEMS DEL CARRITO
    // =====================================================
    cart.forEach(item => {

        subtotal += item.precio * item.cantidad;

        cantidadTotal += item.cantidad;



        cartItemsCont.innerHTML += `
            <div class="cart-item fade-in">
                <img src="${item.img}" onerror="this.src='https://via.placeholder.com/60'">

                <div class="cart-item-info">
                    <h4>${item.nombre}</h4>

                    <p style="color:var(--neon-pink); font-weight:bold;">
                        $${item.precio.toLocaleString('es-CO')}
                    </p>

                    <div style="margin-top:5px; display:flex; gap:10px; align-items:center;">
                        <button onclick="cambiarCantidad(${item.id}, -1)" class="btn-icon">
                            <i class="fa-solid fa-minus"></i>
                        </button>

                        <span>${item.cantidad}</span>

                        <button onclick="cambiarCantidad(${item.id}, 1)" class="btn-icon">
                            <i class="fa-solid fa-plus"></i>
                        </button>
                    </div>
                </div>

                <div class="cart-item-actions">
                    <button onclick="eliminarDelCarrito(${item.id})">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            </div>`;
    });



    // =====================================================
    // CONTADOR DE ITEMS
    // =====================================================
    document.getElementById('cartCount').innerText = cantidadTotal;



    // =====================================================
    // CÁLCULO DE ENVÍO
    // =====================================================
    const metaEnvio = 150000;

    let shipping =
        subtotal >= metaEnvio || subtotal === 0
            ? 0
            : 15000;



    // =====================================================
    // PROGRESO DE ENVÍO
    // =====================================================
    let porcentaje = Math.min((subtotal / metaEnvio) * 100, 100);

    const fillEnvio = document.getElementById('shippingFill');

    fillEnvio.style.width = `${porcentaje}%`;



    // =====================================================
    // TOTAL FINAL
    // -----------------------------------------------------
    // subtotal + 10% + envío
    // =====================================================
    document.getElementById('cartTotal').innerText =
        (subtotal + (subtotal * 0.1) + shipping)
            .toLocaleString('es-CO');
};



// =========================================================
// WISHLIST (FAVORITOS)
// =========================================================

window.toggleWishlist = (id) => {

    const index = wishlist.indexOf(id);



    // Agregar o quitar
    index === -1
        ? wishlist.push(id)
        : wishlist.splice(index, 1);



    localStorage.setItem('pd_wishlist', JSON.stringify(wishlist));



    actualizarWishlistUI();

    renderProducts(products);
};



function actualizarWishlistUI() {

    document.getElementById('wishlistCount').innerText =
        wishlist.length;
};



// =========================================================
// CHECKOUT (PROCESO DE COMPRA)
// =========================================================

window.abrirCheckout = () => {

    // Validar carrito vacío
    if (cart.length === 0) {

        mostrarAlertaPersonalizada(
            'error',
            'Carrito Vacío',
            'Añade productos primero.'
        );

        return;
    }



    // Copiar total al checkout
    document.getElementById('checkoutTotal').innerText =
        document.getElementById('cartTotal').innerText;



    // Cerrar carrito y abrir modal
    cartSidebar.classList.remove('open');

    document.getElementById('checkoutModal')
        .classList.add('active');
};



// =========================================================
// PROCESAR PAGO
// =========================================================

document.getElementById('paymentForm').onsubmit = function(e) {

    e.preventDefault();



    mostrarAlertaPersonalizada(
        'success',
        '¡Pago Exitoso!',
        `Código: PD-${Math.floor(Math.random() * 9000000)}`
    );



    // Vaciar carrito
    cart = [];

    guardarYActualizarCarrito();



    // Cerrar modal
    document.getElementById('checkoutModal')
        .classList.remove('active');
};



// =========================================================
// AUTENTICACIÓN (LOGIN SIMPLE)
// ---------------------------------------------------------
// No es segura, solo control visual (admin / usuario)
// =========================================================

const userNameDisplay = document.getElementById('userNameDisplay');



document.getElementById('authForm').onsubmit = (e) => {

    e.preventDefault();



    const aliasInput =
        document.getElementById('alias')
            .value.trim().toLowerCase();



    // =====================================================
    // DEFINIR ROL
    // =====================================================
    currentUserRole =
        aliasInput === 'admin'
            ? 'admin'
            : 'anonymous_user';



    // Guardar alias
    currentAlias =
        document.getElementById('alias').value;



    // Mostrar nombre en UI
    userNameDisplay.innerText = currentAlias;



    // Mostrar/ocultar panel admin
    document.getElementById('btnAdminPanel')
        .classList.toggle(
            'hidden',
            currentUserRole !== 'admin'
        );



    // Cerrar modal
    document.getElementById('authModal')
        .classList.remove('active');



    // Re-render para aplicar cambios (admin controls)
    renderProducts(products);
};