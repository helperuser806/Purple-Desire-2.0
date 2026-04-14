// ==========================================
// 1. ESTADO GLOBAL (ANONIMATO, CARRITO Y WISHLIST)
// ==========================================
let currentUserRole = 'guest'; 
let currentAlias = 'Invitado'; 
let cart = JSON.parse(localStorage.getItem('pd_cart_cop')) || [];
let wishlist = JSON.parse(localStorage.getItem('pd_wishlist')) || [];
let categoriaActual = 'todos';

const defaultProducts = [
    { id: 1, nombre: "Condones DUO Hot Action", desc: "Sensación caliente excitante. Caja x 3.", precio: 22000, categoria: "bienestar", img: "images/duo.png" },
    { id: 2, nombre: "Condones Poseidon Classic", desc: "Látex natural, máxima seguridad. Caja x 3.", precio: 16000, categoria: "bienestar", img: "images/poseidon.png" },
    { id: 3, nombre: "Condones Trojan Clásico-ENZ", desc: "Lubricados, receptáculo especial. La marca #1.", precio: 28000, categoria: "bienestar", img: "images/trojan.png" },
    { id: 4, nombre: "Condones Piel Intense", desc: "Doble estimulación que aumenta el placer. Caja x 3.", precio: 18000, categoria: "bienestar", img: "images/condones-piel.jpg" },
    { id: 5, nombre: "Condones Control Finissimo", desc: "Súper finos para máxima sensibilidad. Caja x 12.", precio: 48000, categoria: "bienestar", img: "images/condones-control.jpg" },
    { id: 6, nombre: "Bebida Potenciadora Dura+", desc: "Bebida con Guaraná y Maca. Energía intensa.", precio: 26000, categoria: "bienestar", img: "images/bebida-dura.png" },
    { id: 7, nombre: "Lubricante Crema de Whisky", desc: "Sen Intimo. Saborizado, sensación caliente. 30ml.", precio: 60000, categoria: "bienestar", img: "images/lub-whisky.png" },
    { id: 8, nombre: "Lubricante Fisiomax (Sobres)", desc: "Enriquecido con vitamina E. Prácticos sobres x 30.", precio: 50000, categoria: "bienestar", img: "images/lub-fisiomax.png" },
    { id: 9, nombre: "Lubricante Fisiomax (Tubo)", desc: "Gel íntimo base agua. Tubo 90g. No mancha.", precio: 72000, categoria: "bienestar", img: "images/lub-fisiomax-tubo.jpg" },
    { id: 10, nombre: "Lubricante Silicona Sen Intimo", desc: "Silicona premium. Larga duración bajo el agua. 30ml.", precio: 72000, categoria: "bienestar", img: "images/lub-silicona.png" },
    { id: 11, nombre: "Consolador Neón Púrpura", desc: "Diseño ergonómico translúcido con base de succión.", precio: 152000, categoria: "juguetes", img: "images/dildo-purpura.png" },
    { id: 12, nombre: "Dildo Realista Thin Dong", desc: "Textura piel realista de 7 pulgadas. Base adherente.", precio: 168000, categoria: "juguetes", img: "images/dildo-realista.png" },
    { id: 13, nombre: "Dildo Black Veined", desc: "Imponente y elegante. Textura venosa estimulante.", precio: 180000, categoria: "juguetes", img: "images/dildo-negro.png" },
    { id: 14, nombre: "Rainbow Ribbed Dildo", desc: "Colores vibrantes, diseño ondulado. Placer escalonado.", precio: 140000, categoria: "juguetes", img: "images/dildo-rainbow.png" },
    { id: 15, nombre: "Succionador Louviva", desc: "Estimulador de clítoris de silicona suave. Recargable.", precio: 220000, categoria: "juguetes", img: "images/succionador-rosa.jpg" },
    { id: 16, nombre: "Vibrador Rabbit Púrpura", desc: "Estimulación dual (punto G y clítoris). Multivelocidad.", precio: 120000, categoria: "juguetes", img: "images/vibrador-rabbit-purpura.jpg" },
    { id: 17, nombre: "Masturbador Copa Texturizada", desc: "Copa masculina negra con textura interna realista 3D.", precio: 192000, categoria: "juguetes", img: "images/masturbador-copa.jpg" },
    { id: 18, nombre: "Rosa Succionadora", desc: "Famoso juguete en forma de rosa. Succión por aire.", precio: 180000, categoria: "juguetes", img: "images/rosa-succionadora.jpg" },
    { id: 19, nombre: "Succionador Cerdito", desc: "Divertido diseño de cerdito. Ondas sónicas suaves.", precio: 152000, categoria: "juguetes", img: "images/cerdito-succionador.jpg" },
    { id: 20, nombre: "Body Lencería Pasión", desc: "Atrevido body de encaje rojo con transparencias.", precio: 140000, categoria: "lenceria", img: "images/lenceria-roja.jpg" },
    { id: 21, nombre: "Conjunto Encaje Negro", desc: "Dos piezas con diseño de tiras en la espalda.", precio: 160000, categoria: "lenceria", img: "images/lenceria-negra.jpg" },
    { id: 22, nombre: "Conjunto Dominatrix Cuero", desc: "Estilo látex/cuero negro con faldita y ligueros.", precio: 192000, categoria: "lenceria", img: "images/lenceria-cuero.jpg" },
    { id: 23, nombre: "Body Esmeralda", desc: "Elegante body verde oscuro en encaje semitransparente.", precio: 128000, categoria: "lenceria", img: "images/lenceria-verde.jpg" },
    { id: 24, nombre: "Conjunto Bicolor", desc: "Sujetador y panty rojo/negro con liguero integrado.", precio: 152000, categoria: "lenceria", img: "images/lenceria-rojo-negro.jpg" }
];

let products = JSON.parse(localStorage.getItem('pd_products_cop')) || defaultProducts;

// ==========================================
// 2. INICIALIZACIÓN Y EVENTOS
// ==========================================
window.onbeforeunload = function () {
    window.scrollTo(0, 0);
};

document.addEventListener('DOMContentLoaded', () => {
    window.scrollTo(0, 0);
    // Verificación de edad al cargar
    if (!sessionStorage.getItem('isAdultVerified')) {
        document.getElementById('ageModal').classList.add('active');
        document.body.classList.add('no-scroll'); 
    }
    
    renderProducts(products); 
    actualizarCarritoUI();
    actualizarWishlistUI();
    iniciarCarrusel(); 
});

document.getElementById('btnYes').onclick = () => {
    sessionStorage.setItem('isAdultVerified', 'true');
    document.getElementById('ageModal').classList.remove('active');
    document.body.classList.remove('no-scroll'); 
};

document.getElementById('btnNo').onclick = () => window.location.href = "https://www.google.com/search?q=imagenes+de+gatitos+tiernos+jugando&tbm=isch";

document.getElementById('searchInput').addEventListener('input', aplicarFiltros);
document.getElementById('sortSelect').addEventListener('change', aplicarFiltros);

// ==========================================
// NUEVO: MODO CENSURA / SFW (BOTÓN DE PÁNICO)
// ==========================================
let sfwEnabled = false;
window.toggleSFW = function() {
    sfwEnabled = !sfwEnabled;
    document.body.classList.toggle('sfw-mode', sfwEnabled);
    
    const icon = document.getElementById('sfwIcon');
    if(sfwEnabled) {
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
        mostrarToast("Modo Discreto Activado 👁️‍🗨️", "normal");
    } else {
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
        mostrarToast("Imágenes Visibles", "normal");
    }
};

// ==========================================
// CARRUSEL DE OFERTAS
// ==========================================
let currentSlide = 0;
let slideInterval;

function iniciarCarrusel() {
    const track = document.getElementById('sliderTrack');
    const featuredIds = [15, 22, 7, 11]; 
    const etiquetas = ["🔥 Oferta Top", "✨ Novedad", "💎 Premium", "🤫 Más Vendido"];
    
    track.innerHTML = '';
    
    featuredIds.forEach((id, index) => {
        let p = products.find(prod => prod.id === id);
        if(p) {
            track.innerHTML += `
                <div class="slide-card">
                    <div class="slide-img-container">
                        <img src="${p.img}" class="slide-img" alt="${p.nombre}" onerror="this.src='https://via.placeholder.com/200?text=Sin+Imagen'">
                    </div>
                    <div class="slide-info">
                        <span class="slide-badge">${etiquetas[index]}</span>
                        <h3 class="slide-title">${p.nombre}</h3>
                        <p class="slide-desc">${p.desc}</p>
                        <p class="slide-price">$${p.precio.toLocaleString('es-CO')}</p>
                        <button class="btn btn-primary btn-small" style="width: fit-content;" onclick="agregarAlCarrito(${p.id})"><i class="fa-solid fa-cart-plus"></i> Lo Quiero</button>
                    </div>
                </div>
            `;
        }
    });

    const totalSlides = featuredIds.length;
    const arrancarSlider = () => {
        slideInterval = setInterval(() => {
            currentSlide = (currentSlide + 1) % totalSlides;
            track.style.transform = `translateX(-${currentSlide * 100}%)`;
        }, 6000); 
    };

    arrancarSlider();
    document.getElementById('sliderContainer').addEventListener('mouseenter', () => clearInterval(slideInterval));
    document.getElementById('sliderContainer').addEventListener('mouseleave', arrancarSlider);
}

// ==========================================
// 3. MODO INVITADO / LOGIN
// ==========================================
const authModal = document.getElementById('authModal');
const userNameDisplay = document.getElementById('userNameDisplay');

document.getElementById('btnLogin').onclick = () => {
    authModal.classList.add('active');
    document.body.classList.add('no-scroll');
};
document.getElementById('btnRandomAlias').onclick = () => document.getElementById('alias').value = `Agent_${Math.floor(Math.random() * 9000) + 1000}`;

document.getElementById('btnGuest').onclick = () => {
    currentUserRole = 'guest'; currentAlias = 'Invitado';
    userNameDisplay.innerText = currentAlias;
    document.getElementById('btnAdminPanel').classList.add('hidden');
    authModal.classList.remove('active');
    document.body.classList.remove('no-scroll');
    renderProducts(products);
};

document.getElementById('authForm').onsubmit = (e) => {
    e.preventDefault();
    const aliasInput = document.getElementById('alias').value.trim().toLowerCase();
    if(aliasInput === 'admin') {
        currentUserRole = 'admin'; currentAlias = 'Dueño';
        document.getElementById('btnAdminPanel').classList.remove('hidden');
    } else {
        currentUserRole = 'anonymous_user'; currentAlias = document.getElementById('alias').value.trim();
        document.getElementById('btnAdminPanel').classList.add('hidden');
    }
    userNameDisplay.innerText = currentAlias;
    authModal.classList.remove('active');
    document.body.classList.remove('no-scroll');
    renderProducts(products);
};

// ==========================================
// 4. WISHLIST Y FAKE TRACKER
// ==========================================
window.toggleWishlist = function(id) {
    const index = wishlist.indexOf(id);
    if(index === -1) {
        wishlist.push(id);
        mostrarToast("Añadido a tus favoritos 🤍", "normal");
    } else {
        wishlist.splice(index, 1);
        mostrarToast("Eliminado de favoritos", "normal");
    }
    localStorage.setItem('pd_wishlist', JSON.stringify(wishlist));
    actualizarWishlistUI();
    renderProducts(products);
};

function actualizarWishlistUI() { document.getElementById('wishlistCount').innerText = wishlist.length; }

window.abrirWishlistModal = function() {
    document.body.classList.add('no-scroll');
    const cont = document.getElementById('wishlistItemsContainer');
    cont.innerHTML = '';
    
    if(wishlist.length === 0) {
        cont.innerHTML = '<p style="color:var(--text-muted); text-align:center;">Aún no tienes secretos guardados.</p>';
    } else {
        wishlist.forEach(id => {
            const prod = products.find(p => p.id === id);
            if(prod) {
                cont.innerHTML += `
                    <div style="display: flex; align-items: center; justify-content: space-between; background: #070707; padding: 10px; margin-bottom: 10px; border-radius: 8px; border: 1px solid #222;">
                        <img src="${prod.img}" style="width: 50px; height: 50px; background: white; border-radius: 5px; object-fit: contain;">
                        <div style="flex-grow: 1; margin: 0 15px; text-align: left;">
                            <h4 style="font-size: 0.9rem;">${prod.nombre}</h4>
                            <p style="color: var(--neon-pink); font-weight: bold;">$${prod.precio.toLocaleString('es-CO')}</p>
                        </div>
                        <div style="display: flex; gap: 5px;">
                            <button class="btn-icon" onclick="agregarAlCarrito(${prod.id})" style="color: #4cd137;" title="Al carrito"><i class="fa-solid fa-cart-plus"></i></button>
                            <button class="btn-icon" onclick="toggleWishlist(${prod.id}); abrirWishlistModal();" style="color: var(--text-muted);" title="Quitar"><i class="fa-solid fa-trash"></i></button>
                        </div>
                    </div>
                `;
            }
        });
    }
    document.getElementById('wishlistModal').classList.add('active');
};

window.abrirTracker = function() {
    document.body.classList.add('no-scroll');
    document.getElementById('trackerModal').classList.add('active');
    document.getElementById('trackerInput').value = '';
    document.getElementById('trackerSteps').style.display = 'none';
};

document.getElementById('trackerForm').onsubmit = function(e) {
    e.preventDefault();
    let input = document.getElementById('trackerInput').value.trim();
    if(!input) return;
    
    let stepsContainer = document.getElementById('trackerSteps');
    stepsContainer.style.display = 'block';
    
    let stepEls = [document.getElementById('step1'), document.getElementById('step2'), document.getElementById('step3')];
    stepEls.forEach(el => el.classList.remove('active'));
    
    setTimeout(() => stepEls[0].classList.add('active'), 500);
    setTimeout(() => stepEls[1].classList.add('active'), 1800);
    setTimeout(() => stepEls[2].classList.add('active'), 3200);
};

// ==========================================
// 5. RENDERIZAR PRODUCTOS Y FILTROS
// ==========================================
const productGrid = document.getElementById('productGrid');

function renderProducts(arrayProductos) {
    productGrid.innerHTML = '';
    if(arrayProductos.length === 0) {
        productGrid.innerHTML = `<h3 style="color:var(--text-muted); grid-column: 1/-1; text-align:center;">No hay productos que coincidan.</h3>`;
        return;
    }

    arrayProductos.forEach(prod => {
        const div = document.createElement('div');
        div.classList.add('product-card', 'fade-in');
        
        let adminHtml = currentUserRole === 'admin' ? `
            <div class="admin-controls">
                <button class="btn-icon" onclick="editarProducto(${prod.id}); event.stopPropagation();"><i class="fa-solid fa-pen"></i></button>
                <button class="btn-icon" onclick="eliminarProducto(${prod.id}); event.stopPropagation();"><i class="fa-solid fa-trash"></i></button>
            </div>
        ` : '';

        let isWished = wishlist.includes(prod.id);
        let heartClass = isWished ? 'fa-solid fa-heart' : 'fa-regular fa-heart';
        let btnClass = isWished ? 'btn-wishlist active' : 'btn-wishlist';

        let isLowStock = (prod.id % 3 === 0); 
        let fomoOptions = [1, 2, 5, 10];
        let unitsLeft = fomoOptions[prod.id % fomoOptions.length]; 
        let fomoHtml = isLowStock ? `<p class="fomo-text"><i class="fa-solid fa-fire"></i> ¡Últimas ${unitsLeft} unidades!</p>` : '';

        div.innerHTML = `
            ${adminHtml}
            <button class="${btnClass}" onclick="toggleWishlist(${prod.id}); event.stopPropagation();" title="Guardar Secreto">
                <i class="${heartClass}"></i>
            </button>
            <img src="${prod.img}" alt="${prod.nombre}" class="product-img" onclick="abrirDetalles(${prod.id})" onerror="this.src='https://via.placeholder.com/200?text=Sin+Imagen'">
            <div style="flex-grow: 1;">
                <h4>${prod.nombre}</h4>
                <p class="product-desc">${prod.desc}</p>
            </div>
            <p class="price">$${prod.precio.toLocaleString('es-CO')}</p>
            ${fomoHtml}
            <button class="btn btn-primary w-100" onclick="agregarAlCarrito(${prod.id})">Añadir Discretamente</button>
        `;
        productGrid.appendChild(div);
    });
}

window.filtrar = function(categoria) {
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    categoriaActual = categoria;
    aplicarFiltros();
};

function aplicarFiltros() {
    let textoBusqueda = document.getElementById('searchInput').value.toLowerCase();
    let orden = document.getElementById('sortSelect').value;

    let filtrados = products.filter(p => {
        let coincideCategoria = categoriaActual === 'todos' || p.categoria === categoriaActual;
        let coincideTexto = p.nombre.toLowerCase().includes(textoBusqueda) || p.desc.toLowerCase().includes(textoBusqueda);
        return coincideCategoria && coincideTexto;
    });

    if (orden === 'low-high') filtrados.sort((a, b) => a.precio - b.precio);
    else if (orden === 'high-low') filtrados.sort((a, b) => b.precio - a.precio);

    renderProducts(filtrados);
}

// ==========================================
// 6. TOASTS Y ALERTAS
// ==========================================
window.mostrarToast = function(mensaje, tipo = 'normal') {
    const contenedor = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.classList.add('toast');
    if(tipo === 'success') toast.classList.add('success');
    
    let icono = tipo === 'success' ? '<i class="fa-solid fa-check-circle" style="color:#4cd137"></i>' : '<i class="fa-solid fa-heart" style="color:var(--neon-pink)"></i>';
    toast.innerHTML = `${icono} <span>${mensaje}</span>`;
    contenedor.appendChild(toast);
    setTimeout(() => { toast.remove(); }, 3000);
}

window.mostrarAlertaPersonalizada = function(tipo, titulo, mensaje) {
    const modal = document.getElementById('customAlertModal');
    const iconDiv = document.getElementById('alertIcon');
    if(tipo === 'error') iconDiv.innerHTML = '<i class="fa-solid fa-circle-exclamation" style="color: #ff2a75;"></i>';
    else if (tipo === 'success') iconDiv.innerHTML = '<i class="fa-solid fa-circle-check" style="color: #4cd137;"></i>';
    
    document.getElementById('alertTitle').innerText = titulo;
    document.getElementById('alertMessage').innerHTML = mensaje;
    modal.classList.add('active');
    document.body.classList.add('no-scroll');
};

window.cerrarAlertaPersonalizada = () => {
    document.getElementById('customAlertModal').classList.remove('active');
    document.body.classList.remove('no-scroll');
};

// ==========================================
// 7. CARRITO Y DETALLES DE PRODUCTO
// ==========================================
const cartSidebar = document.getElementById('cartSidebar');

// EL CARRITO YA NO BLOQUEA EL SCROLL
document.getElementById('btnCartToggle').onclick = () => { 
    cartSidebar.classList.add('open'); 
};
document.getElementById('closeCart').onclick = () => { 
    cartSidebar.classList.remove('open'); 
};

window.abrirDetalles = function(id) {
    const prod = products.find(p => p.id === id);
    if(!prod) return;
    
    document.body.classList.add('no-scroll');
    
    document.getElementById('detailImg').src = prod.img;
    document.getElementById('detailName').innerText = prod.nombre;
    document.getElementById('detailDesc').innerText = prod.desc;
    document.getElementById('detailPrice').innerText = `$${prod.precio.toLocaleString('es-CO')}`;
    
    const bancoOpiniones = [
        "Excelente calidad, la entrega fue súper discreta.",
        "Me encantó, el material es muy premium. 10/10.",
        "Llegó rapidísimo, nadie en mi casa se dio cuenta del paquete.",
        "Superó mis expectativas, volveré a comprar sin duda.",
        "Exactamente lo que pedí. Muy seguro y confiable.",
        "Funciona perfecto. Empaque 100% sellado y ciego."
    ];
    let rev1 = bancoOpiniones[prod.id % bancoOpiniones.length];
    let rev2 = bancoOpiniones[(prod.id + 3) % bancoOpiniones.length];
    let agent1 = `Agent_${(prod.id * 123) % 9000 + 1000}`;
    let agent2 = `Agent_${(prod.id * 321) % 9000 + 1000}`;

    document.getElementById('detailReviews').innerHTML = `
        <div class="review-item">
            <div class="star-rating"><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i></div>
            <strong>${agent1}:</strong> "${rev1}"
        </div>
        <div class="review-item">
            <div class="star-rating"><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star-half-stroke"></i></div>
            <strong>${agent2}:</strong> "${rev2}"
        </div>
    `;
    
    document.getElementById('detailBtnAdd').onclick = function() {
        agregarAlCarrito(prod.id);
        document.getElementById('productModal').classList.remove('active');
        document.body.classList.remove('no-scroll');
    };
    document.getElementById('productModal').classList.add('active');
};

window.agregarAlCarrito = function(id) {
    const producto = products.find(p => p.id === id);
    const itemEnCarrito = cart.find(item => item.id === id);
    if (itemEnCarrito) itemEnCarrito.cantidad++;
    else cart.push({ ...producto, cantidad: 1 });
    
    guardarYActualizarCarrito();
    mostrarToast(`${producto.nombre} añadido.`, 'normal');
};

window.cambiarCantidad = function(id, delta) {
    const item = cart.find(i => i.id === id);
    if(item) { item.cantidad += delta; if(item.cantidad <= 0) cart = cart.filter(i => i.id !== id); guardarYActualizarCarrito(); }
};

window.eliminarDelCarrito = function(id) {
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
        subtotal += item.precio * item.cantidad;
        cantidadTotal += item.cantidad;
        cartItemsCont.innerHTML += `
            <div class="cart-item fade-in">
                <img src="${item.img}" onerror="this.src='https://via.placeholder.com/60'">
                <div class="cart-item-info">
                    <h4>${item.nombre}</h4>
                    <p style="color:var(--neon-pink); font-weight:bold;">$${item.precio.toLocaleString('es-CO')}</p>
                    <div style="margin-top:5px; display:flex; gap:10px; align-items:center;">
                        <button onclick="cambiarCantidad(${item.id}, -1)" class="btn-icon"><i class="fa-solid fa-minus"></i></button>
                        <span>${item.cantidad}</span>
                        <button onclick="cambiarCantidad(${item.id}, 1)" class="btn-icon"><i class="fa-solid fa-plus"></i></button>
                    </div>
                </div>
                <div class="cart-item-actions"><button onclick="eliminarDelCarrito(${item.id})"><i class="fa-solid fa-trash"></i></button></div>
            </div>
        `;
    });

    document.getElementById('cartCount').innerText = cantidadTotal;
    
    const metaEnvio = 150000;
    let shipping = 0;
    const txtEnvio = document.getElementById('shippingText');
    const fillEnvio = document.getElementById('shippingFill');

    if (subtotal === 0) {
        txtEnvio.innerHTML = `Faltan <strong>$${metaEnvio.toLocaleString('es-CO')}</strong> para envío gratis`;
        fillEnvio.style.width = '0%';
        fillEnvio.style.background = 'linear-gradient(90deg, var(--neon-purple), var(--neon-pink))';
        shipping = 0;
    } else if (subtotal >= metaEnvio) {
        txtEnvio.innerHTML = `<i class="fa-solid fa-gift"></i> ¡Envío Discreto <strong>GRATIS</strong>!`;
        fillEnvio.style.width = '100%';
        fillEnvio.style.background = 'linear-gradient(90deg, #4cd137, #20bf6b)';
        shipping = 0;
    } else {
        let faltante = metaEnvio - subtotal;
        let porcentaje = (subtotal / metaEnvio) * 100;
        txtEnvio.innerHTML = `Faltan <strong>$${faltante.toLocaleString('es-CO')}</strong> para envío gratis`;
        fillEnvio.style.width = `${porcentaje}%`;
        fillEnvio.style.background = 'linear-gradient(90deg, var(--neon-purple), var(--neon-pink))';
        shipping = 15000;
    }
    
    let taxes = subtotal > 0 ? (subtotal * 0.10) : 0;
    
    document.getElementById('cartSubtotal').innerText = subtotal.toLocaleString('es-CO');
    document.getElementById('cartTax').innerText = taxes.toLocaleString('es-CO');
    document.getElementById('cartShipping').innerText = shipping.toLocaleString('es-CO');
    document.getElementById('cartTotal').innerText = (subtotal + taxes + shipping).toLocaleString('es-CO');
}

window.abrirCheckout = function() {
    if(cart.length === 0) { mostrarAlertaPersonalizada('error', 'Carrito Vacío', 'Por favor, añade productos al carrito antes de proceder al pago.'); return; }
    document.getElementById('checkoutTotal').innerText = document.getElementById('cartTotal').innerText;
    cartSidebar.classList.remove('open');
    document.getElementById('checkoutModal').classList.add('active');
    document.body.classList.add('no-scroll'); 
};

window.selectPayment = function(element) { document.querySelectorAll('.payment-card').forEach(el => el.classList.remove('active')); element.classList.add('active'); };

document.getElementById('paymentForm').onsubmit = function(e) {
    e.preventDefault(); 
    let direccionInput = document.getElementById('checkoutAddress').value;
    let emailInput = document.getElementById('checkoutEmail').value;
    
    let codigoRastreo = "PD-" + (Math.floor(Math.random() * 90000000) + 10000000);
    
    document.getElementById('checkoutModal').classList.remove('active');
    
    mostrarAlertaPersonalizada('success', '¡Pago Exitoso!', `Se ha procesado tu pago de <strong>$${document.getElementById('checkoutTotal').innerText} COP</strong> de forma segura.<br><br>📦 El paquete ciego será enviado a:<br><strong>${direccionInput}</strong><br><br>🔍 Tu código de rastreo es:<br><strong style="color:var(--neon-pink); font-size:1.15rem;">${codigoRastreo}</strong><br><br>📧 Recibo anónimo enviado a:<br><strong>${emailInput}</strong>`);
    
    cart = []; guardarYActualizarCarrito();
    document.getElementById('paymentForm').reset();
};

// ==========================================
// 8. ADMIN
// ==========================================
const adminModal = document.getElementById('adminModal');
window.abrirAdminModal = function() { 
    document.getElementById('adminModalTitle').innerText = "Nuevo Producto"; 
    document.getElementById('adminForm').reset(); 
    document.getElementById('prodId').value = ''; 
    adminModal.classList.add('active'); 
    document.body.classList.add('no-scroll');
};

document.getElementById('adminForm').onsubmit = function(e) {
    e.preventDefault();
    const idProd = document.getElementById('prodId').value;
    const nuevoProducto = { id: idProd ? parseInt(idProd) : Date.now(), nombre: document.getElementById('prodName').value, desc: document.getElementById('prodDesc').value, precio: parseFloat(document.getElementById('prodPrice').value), categoria: document.getElementById('prodCategory').value, img: document.getElementById('prodImg').value };
    if (idProd) products[products.findIndex(p => p.id == idProd)] = nuevoProducto; else products.push(nuevoProducto);
    localStorage.setItem('pd_products_cop', JSON.stringify(products));
    renderProducts(products); 
    adminModal.classList.remove('active'); 
    document.body.classList.remove('no-scroll');
    mostrarToast("Producto guardado", "success"); iniciarCarrusel();
};

window.editarProducto = function(id) {
    const prod = products.find(p => p.id === id); if(!prod) return;
    document.getElementById('adminModalTitle').innerText = "Editar Producto"; 
    document.getElementById('prodId').value = prod.id; 
    document.getElementById('prodName').value = prod.nombre; 
    document.getElementById('prodDesc').value = prod.desc || ''; 
    document.getElementById('prodPrice').value = prod.precio; 
    document.getElementById('prodCategory').value = prod.categoria; 
    document.getElementById('prodImg').value = prod.img; 
    adminModal.classList.add('active');
    document.body.classList.add('no-scroll');
};

window.eliminarProducto = function(id) {
    if(confirm("¿Seguro que deseas eliminar este producto?")) { products = products.filter(p => p.id !== id); localStorage.setItem('pd_products_cop', JSON.stringify(products)); renderProducts(products); mostrarToast("Producto eliminado", "success"); iniciarCarrusel(); }
};