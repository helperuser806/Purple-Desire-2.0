// ==========================================
// APP.JS - ORQUESTADOR GLOBAL
// ==========================================

/**
 * Este archivo se encarga de inicializar todos los módulos
 * una vez que el DOM está completamente cargado.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Resetear el scroll a la parte superior
    window.scrollTo(0, 0);

    // 2. Verificación de seguridad/edad
    if (!sessionStorage.getItem('isAdultVerified')) {
        const ageModal = document.getElementById('ageModal');
        if (ageModal) {
            ageModal.classList.add('active');
            document.body.classList.add('no-scroll');
        }
    }

    // 3. Renderizado inicial de la base de datos
    // 'products' viene de config.js
    if (typeof renderProducts === 'function') {
        renderProducts(products); 
    }

    // 4. Sincronización de Interfaz de Usuario
    if (typeof actualizarCarritoUI === 'function') {
        actualizarCarritoUI();
    }
    
    if (typeof actualizarWishlistUI === 'function') {
        actualizarWishlistUI();
    }

    // 5. Encendido de componentes visuales
    if (typeof iniciarCarrusel === 'function') {
        iniciarCarrusel(); 
    }

    console.log("🚀 Aplicación 'Adulto Funcional' inicializada correctamente.");
});

// ==========================================
// LISTENERS GLOBALES (FALLBACKS)
// ==========================================

// Asegurar que el buscador responda si el script de productos cargó correctamente
const searchInput = document.getElementById('searchInput');
if (searchInput) {
    searchInput.addEventListener('input', () => {
        if (typeof aplicarFiltros === 'function') aplicarFiltros();
    });
}

const sortSelect = document.getElementById('sortSelect');
if (sortSelect) {
    sortSelect.addEventListener('change', () => {
        if (typeof aplicarFiltros === 'function') aplicarFiltros();
    });
}