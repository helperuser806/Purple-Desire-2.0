// =========================================================
// APP.JS - ORQUESTADOR GLOBAL
// ---------------------------------------------------------
// Este archivo controla la inicialización de TODA la app.
// No contiene lógica compleja, solo coordina módulos.
// =========================================================



// =========================================================
// EVENTO PRINCIPAL: DOMContentLoaded
// ---------------------------------------------------------
// Se ejecuta cuando TODO el HTML ya está cargado.
// Aquí se inicializa toda la aplicación.
// =========================================================

document.addEventListener('DOMContentLoaded', () => {

    // =====================================================
    // 1. RESET DE SCROLL
    // -----------------------------------------------------
    // Asegura que la página siempre empiece arriba.
    // Evita bugs cuando el navegador recuerda posición.
    // =====================================================
    window.scrollTo(0, 0);



    // =====================================================
    // 2. VERIFICACIÓN DE EDAD / SEGURIDAD
    // -----------------------------------------------------
    // Se revisa si el usuario ya pasó la verificación.
    // Si no, se muestra un modal bloqueando la app.
    // =====================================================
    if (!sessionStorage.getItem('isAdultVerified')) {

        const ageModal = document.getElementById('ageModal');

        // Validación por si el elemento no existe
        if (ageModal) {

            // Activa el modal
            ageModal.classList.add('active');

            // Bloquea el scroll del body
            document.body.classList.add('no-scroll');
        }
    }



    // =====================================================
    // 3. RENDERIZADO INICIAL DE PRODUCTOS
    // -----------------------------------------------------
    // 'products' viene de config.js (fuente de datos)
    // Se valida que la función exista antes de usarla.
    // =====================================================
    if (typeof renderProducts === 'function') {

        renderProducts(products);
    }



    // =====================================================
    // 4. SINCRONIZACIÓN DE INTERFAZ (UI)
    // -----------------------------------------------------
    // Actualiza estados visuales al iniciar:
    // - Carrito
    // - Wishlist
    // =====================================================

    // Actualizar carrito
    if (typeof actualizarCarritoUI === 'function') {
        actualizarCarritoUI();
    }

    // Actualizar wishlist
    if (typeof actualizarWishlistUI === 'function') {
        actualizarWishlistUI();
    }



    // =====================================================
    // 5. COMPONENTES VISUALES
    // -----------------------------------------------------
    // Inicializa elementos interactivos:
    // - Carrusel / slider
    // =====================================================
    if (typeof iniciarCarrusel === 'function') {
        iniciarCarrusel();
    }



    // =====================================================
    // LOG DE INICIO
    // -----------------------------------------------------
    // Confirmación en consola de que todo cargó correctamente
    // =====================================================
    console.log("🚀 Aplicación 'Adulto Funcional' inicializada correctamente.");
});



// =========================================================
// LISTENERS GLOBALES (FALLBACKS)
// ---------------------------------------------------------
// Estos listeners aseguran que ciertas funciones respondan,
// incluso si otros scripts cargan en distinto orden.
// =========================================================



// =========================================================
// BUSCADOR (SEARCH INPUT)
// ---------------------------------------------------------
// Detecta cambios en el input de búsqueda.
// =========================================================

const searchInput = document.getElementById('searchInput');

if (searchInput) {

    searchInput.addEventListener('input', () => {

        // Verifica que la función exista antes de usarla
        if (typeof aplicarFiltros === 'function') {
            aplicarFiltros();
        }
    });
}



// =========================================================
// ORDENAMIENTO (SORT SELECT)
// ---------------------------------------------------------
// Detecta cambios en el selector de orden.
// =========================================================

const sortSelect = document.getElementById('sortSelect');

if (sortSelect) {

    sortSelect.addEventListener('change', () => {

        // Verifica que la función exista antes de usarla
        if (typeof aplicarFiltros === 'function') {
            aplicarFiltros();
        }
    });
}