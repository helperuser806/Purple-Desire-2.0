// =========================================================
// PRODUCTOS.JS - RENDER Y LÓGICA DE PRODUCTOS
// ---------------------------------------------------------
// Este archivo controla:
// - Renderizado de productos
// - Filtros (búsqueda + categoría + orden)
// - Wishlist visual
// - Panel de administrador (CRUD)
// =========================================================



// =========================================================
// REFERENCIAS DEL DOM
// =========================================================

const productGrid = document.getElementById('productGrid');



// =========================================================
// RENDERIZADO DE PRODUCTOS
// ---------------------------------------------------------
// Recibe un array de productos y los pinta en pantalla
// =========================================================

function renderProducts(arrayProductos) {

    // Limpiar grid antes de renderizar
    productGrid.innerHTML = '';



    // =====================================================
    // CASO: NO HAY RESULTADOS
    // =====================================================
    if (arrayProductos.length === 0) {

        productGrid.innerHTML = `
            <h3 style="color:var(--text-muted); grid-column: 1/-1; text-align:center;">
                No hay productos que coincidan.
            </h3>`;

        return;
    }



    // =====================================================
    // RECORRER PRODUCTOS Y CREAR TARJETAS
    // =====================================================
    arrayProductos.forEach(prod => {

        const div = document.createElement('div');

        div.classList.add('product-card', 'fade-in');



        // =================================================
        // CONTROLES DE ADMIN
        // -------------------------------------------------
        // Solo visibles si el usuario es admin
        // =================================================
        let adminHtml = currentUserRole === 'admin' ? `
            <div class="admin-controls">
                <button class="btn-icon"
                    onclick="editarProducto(${prod.id}); event.stopPropagation();">
                    <i class="fa-solid fa-pen"></i>
                </button>

                <button class="btn-icon"
                    onclick="eliminarProducto(${prod.id}); event.stopPropagation();">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>` : '';



        // =================================================
        // ESTADO WISHLIST
        // =================================================
        let isWished = wishlist.includes(prod.id);

        let heartClass = isWished
            ? 'fa-solid fa-heart'
            : 'fa-regular fa-heart';

        let btnClass = isWished
            ? 'btn-wishlist active'
            : 'btn-wishlist';



        // =================================================
        // FOMO (SIMULACIÓN DE STOCK BAJO)
        // =================================================
        let isLowStock = (prod.id % 3 === 0);

        let unitsLeft = [1, 2, 5, 10][prod.id % 4];

        let fomoHtml = isLowStock
            ? `<p class="fomo-text">
                <i class="fa-solid fa-fire"></i>
                ¡Últimas ${unitsLeft} unidades!
               </p>`
            : '';



        // =================================================
        // TEMPLATE HTML DEL PRODUCTO
        // =================================================
        div.innerHTML = `
            ${adminHtml}

            <button class="${btnClass}"
                onclick="toggleWishlist(${prod.id}); event.stopPropagation();">
                <i class="${heartClass}"></i>
            </button>

            <img src="${prod.img}" class="product-img"
                onclick="abrirDetalles(${prod.id})"
                onerror="this.src='https://via.placeholder.com/200?text=Sin+Imagen'">

            <div style="flex-grow: 1;">
                <h4>${prod.nombre}</h4>
                <p class="product-desc">${prod.desc}</p>
            </div>

            <p class="price">$${prod.precio.toLocaleString('es-CO')}</p>

            ${fomoHtml}

            <button class="btn btn-primary w-100"
                onclick="agregarAlCarrito(${prod.id})">
                Añadir Discretamente
            </button>
        `;



        // Insertar en el DOM
        productGrid.appendChild(div);
    });
}



// =========================================================
// FILTRO POR CATEGORÍA (BOTONES)
// =========================================================

window.filtrar = function(categoria) {

    // Quitar estado activo de todos los botones
    document.querySelectorAll('.filter-btn')
        .forEach(btn => btn.classList.remove('active'));

    // Activar botón actual
    event.target.classList.add('active');

    // Guardar categoría seleccionada
    categoriaActual = categoria;

    // Aplicar filtros
    aplicarFiltros();
};



// =========================================================
// FILTROS GENERALES
// ---------------------------------------------------------
// Combina:
// - búsqueda
// - categoría
// - orden
// =========================================================

function aplicarFiltros() {

    let textoBusqueda =
        document.getElementById('searchInput')
            .value.toLowerCase();

    let orden =
        document.getElementById('sortSelect').value;



    // =====================================================
    // FILTRADO
    // =====================================================
    let filtrados = products.filter(p => {

        let coincideCategoria =
            categoriaActual === 'todos' ||
            p.categoria === categoriaActual;

        let coincideTexto =
            p.nombre.toLowerCase().includes(textoBusqueda) ||
            p.desc.toLowerCase().includes(textoBusqueda);

        return coincideCategoria && coincideTexto;
    });



    // =====================================================
    // ORDENAMIENTO
    // =====================================================
    if (orden === 'low-high') {
        filtrados.sort((a, b) => a.precio - b.precio);
    }
    else if (orden === 'high-low') {
        filtrados.sort((a, b) => b.precio - a.precio);
    }



    // Render final
    renderProducts(filtrados);
}



// =========================================================
// LISTENERS DE FILTROS
// =========================================================

document.getElementById('searchInput')
    .addEventListener('input', aplicarFiltros);

document.getElementById('sortSelect')
    .addEventListener('change', aplicarFiltros);



// =========================================================
// ADMIN - CRUD DE PRODUCTOS
// =========================================================

const adminModal = document.getElementById('adminModal');



// =========================================================
// ABRIR MODAL (NUEVO PRODUCTO)
// =========================================================

window.abrirAdminModal = () => {

    document.getElementById('adminModalTitle').innerText = "Nuevo Producto";

    document.getElementById('adminForm').reset();

    document.getElementById('prodId').value = '';

    adminModal.classList.add('active');

    document.body.classList.add('no-scroll');
};



// =========================================================
// GUARDAR PRODUCTO (CREATE / UPDATE)
// =========================================================

document.getElementById('adminForm').onsubmit = function(e) {

    e.preventDefault();



    const idProd = document.getElementById('prodId').value;



    // Crear objeto producto
    const nuevoProducto = {

        id: idProd ? parseInt(idProd) : Date.now(),

        nombre: document.getElementById('prodName').value,

        desc: document.getElementById('prodDesc').value,

        precio: parseFloat(document.getElementById('prodPrice').value),

        categoria: document.getElementById('prodCategory').value,

        img: document.getElementById('prodImg').value
    };



    // =====================================================
    // UPDATE o CREATE
    // =====================================================
    if (idProd) {

        products[products.findIndex(p => p.id == idProd)] = nuevoProducto;

    } else {

        products.push(nuevoProducto);
    }



    // Guardar en localStorage
    localStorage.setItem('pd_products_cop', JSON.stringify(products));



    // Actualizar UI
    renderProducts(products);

    adminModal.classList.remove('active');

    document.body.classList.remove('no-scroll');



    mostrarToast("Producto guardado", "success");

    iniciarCarrusel();
};



// =========================================================
// EDITAR PRODUCTO
// =========================================================

window.editarProducto = (id) => {

    const prod = products.find(p => p.id === id);

    if (!prod) return;



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



// =========================================================
// ELIMINAR PRODUCTO
// =========================================================

window.eliminarProducto = (id) => {

    if (confirm("¿Seguro que deseas eliminar este producto?")) {

        products = products.filter(p => p.id !== id);

        localStorage.setItem('pd_products_cop', JSON.stringify(products));

        renderProducts(products);

        mostrarToast("Producto eliminado", "success");

        iniciarCarrusel();
    }
};