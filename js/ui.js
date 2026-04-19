// =========================================================
// UI.JS - INTERFAZ Y EFECTOS VISUALES
// ---------------------------------------------------------
// Este archivo controla:
// - Interacciones visuales
// - Modales
// - Toasts
// - Carrusel
// - Modo SFW
// =========================================================



// =========================================================
// CONTROL DE SCROLL AL RECARGAR
// ---------------------------------------------------------
// Siempre fuerza la página a iniciar arriba
// =========================================================

window.onbeforeunload = () => window.scrollTo(0, 0);



// =========================================================
// INICIALIZACIÓN GENERAL (DOMContentLoaded)
// ---------------------------------------------------------
// Se ejecuta cuando el HTML está completamente cargado
// =========================================================

document.addEventListener('DOMContentLoaded', () => {

    // Forzar scroll arriba
    window.scrollTo(0, 0);


    // =====================================================
    // VERIFICACIÓN DE EDAD
    // -----------------------------------------------------
    // Si el usuario no ha confirmado, se bloquea la app
    // =====================================================
    if (!sessionStorage.getItem('isAdultVerified')) {

        document.getElementById('ageModal').classList.add('active');

        document.body.classList.add('no-scroll');
    }


    // =====================================================
    // RENDER INICIAL
    // -----------------------------------------------------
    // Carga productos y sincroniza UI
    // =====================================================
    renderProducts(products);

    actualizarCarritoUI();

    actualizarWishlistUI();


    // =====================================================
    // INICIAR COMPONENTES
    // =====================================================
    iniciarCarrusel();
});



// =========================================================
// BOTONES DEL MODAL DE EDAD
// =========================================================

/*
   Usuario confirma que es mayor de edad
*/
document.getElementById('btnYes').onclick = () => {

    sessionStorage.setItem('isAdultVerified', 'true');

    document.getElementById('ageModal').classList.remove('active');

    document.body.classList.remove('no-scroll');
};


/*
   Usuario NO es mayor de edad
   → redirección externa
*/
document.getElementById('btnNo').onclick = () =>

    window.location.href = "https://www.google.com/search?q=imagenes+de+gatitos+tiernos+jugando&tbm=isch";



// =========================================================
// MODO SFW (DISCRETO)
// ---------------------------------------------------------
// Oculta imágenes sensibles usando CSS
// =========================================================

let sfwEnabled = false;

window.toggleSFW = function() {

    // Cambia estado
    sfwEnabled = !sfwEnabled;

    // Aplica clase al body
    document.body.classList.toggle('sfw-mode', sfwEnabled);

    const icon = document.getElementById('sfwIcon');


    // =====================================================
    // ESTADO ACTIVADO
    // =====================================================
    if (sfwEnabled) {

        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');

        mostrarToast("Modo Discreto Activado 👁️‍🗨️", "normal");
    }


    // =====================================================
    // ESTADO DESACTIVADO
    // =====================================================
    else {

        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');

        mostrarToast("Imágenes Visibles", "normal");
    }
};



// =========================================================
// TOASTS (NOTIFICACIONES)
// ---------------------------------------------------------
// Mensajes flotantes temporales
// =========================================================

window.mostrarToast = function(mensaje, tipo = 'normal') {

    const contenedor = document.getElementById('toast-container');

    const toast = document.createElement('div');

    toast.classList.add('toast');


    // Tipo de toast (éxito)
    if (tipo === 'success') {
        toast.classList.add('success');
    }


    // Icono dinámico
    let icono =
        tipo === 'success'
            ? '<i class="fa-solid fa-check-circle" style="color:#4cd137"></i>'
            : '<i class="fa-solid fa-heart" style="color:var(--neon-pink)"></i>';


    // Contenido del toast
    toast.innerHTML = `${icono} <span>${mensaje}</span>`;


    // Insertar en el DOM
    contenedor.appendChild(toast);


    // Eliminar automáticamente
    setTimeout(() => {
        toast.remove();
    }, 3000);
};



// =========================================================
// ALERTA PERSONALIZADA (MODAL)
// =========================================================

window.mostrarAlertaPersonalizada = function(tipo, titulo, mensaje) {

    const modal = document.getElementById('customAlertModal');

    const iconDiv = document.getElementById('alertIcon');


    // Tipo de icono
    if (tipo === 'error') {
        iconDiv.innerHTML = '<i class="fa-solid fa-circle-exclamation" style="color: #ff2a75;"></i>';
    }
    else if (tipo === 'success') {
        iconDiv.innerHTML = '<i class="fa-solid fa-circle-check" style="color: #4cd137;"></i>';
    }


    // Contenido
    document.getElementById('alertTitle').innerText = titulo;

    document.getElementById('alertMessage').innerHTML = mensaje;


    // Mostrar modal
    modal.classList.add('active');

    document.body.classList.add('no-scroll');
};



// =========================================================
// CERRAR ALERTA PERSONALIZADA
// =========================================================

window.cerrarAlertaPersonalizada = () => {

    document.getElementById('customAlertModal').classList.remove('active');

    document.body.classList.remove('no-scroll');
};



// =========================================================
// CARRUSEL (SLIDER)
// ---------------------------------------------------------
// Muestra productos destacados automáticamente
// =========================================================

let currentSlide = 0;

let slideInterval;



function iniciarCarrusel() {

    const track = document.getElementById('sliderTrack');


    // IDs de productos destacados
    const featuredIds = [15, 22, 7, 11];


    // Etiquetas visuales
    const etiquetas = [
        "🔥 Oferta Top",
        "✨ Novedad",
        "💎 Premium",
        "🤫 Más Vendido"
    ];


    // Limpiar contenido previo
    track.innerHTML = '';



    // =====================================================
    // GENERAR SLIDES DINÁMICAMENTE
    // =====================================================
    featuredIds.forEach((id, index) => {

        let p = products.find(prod => prod.id === id);

        if (p) {

            track.innerHTML += `
                <div class="slide-card">
                    <div class="slide-img-container">
                        <img src="${p.img}" class="slide-img"
                        onerror="this.src='https://via.placeholder.com/200?text=Sin+Imagen'">
                    </div>

                    <div class="slide-info">
                        <span class="slide-badge">${etiquetas[index]}</span>

                        <h3 class="slide-title">${p.nombre}</h3>

                        <p class="slide-desc">${p.desc}</p>

                        <p class="slide-price">$${p.precio.toLocaleString('es-CO')}</p>

                        <button class="btn btn-primary btn-small"
                        onclick="agregarAlCarrito(${p.id})">
                            <i class="fa-solid fa-cart-plus"></i> Lo Quiero
                        </button>
                    </div>
                </div>`;
        }
    });



    // =====================================================
    // FUNCIÓN INTERNA DEL SLIDER AUTOMÁTICO
    // =====================================================
    const arrancarSlider = () => {

        slideInterval = setInterval(() => {

            currentSlide = (currentSlide + 1) % featuredIds.length;

            track.style.transform = `translateX(-${currentSlide * 100}%)`;

        }, 6000);
    };



    // Iniciar carrusel
    arrancarSlider();



    // =====================================================
    // PAUSAR AL PASAR EL MOUSE
    // =====================================================
    document.getElementById('sliderContainer')
        .addEventListener('mouseenter', () => clearInterval(slideInterval));



    // =====================================================
    // REANUDAR AL SALIR
    // =====================================================
    document.getElementById('sliderContainer')
        .addEventListener('mouseleave', arrancarSlider);
}