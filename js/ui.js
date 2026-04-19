// ==========================================
// INICIALIZACIÓN Y EFECTOS VISUALES
// ==========================================
window.onbeforeunload = () => window.scrollTo(0, 0);

document.addEventListener('DOMContentLoaded', () => {
    window.scrollTo(0, 0);
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

// MODO SFW
let sfwEnabled = false;
window.toggleSFW = function() {
    sfwEnabled = !sfwEnabled;
    document.body.classList.toggle('sfw-mode', sfwEnabled);
    const icon = document.getElementById('sfwIcon');
    if(sfwEnabled) {
        icon.classList.remove('fa-eye'); icon.classList.add('fa-eye-slash');
        mostrarToast("Modo Discreto Activado 👁️‍🗨️", "normal");
    } else {
        icon.classList.remove('fa-eye-slash'); icon.classList.add('fa-eye');
        mostrarToast("Imágenes Visibles", "normal");
    }
};

// TOASTS Y ALERTAS
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

// CARRUSEL
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
                    <div class="slide-img-container"><img src="${p.img}" class="slide-img" onerror="this.src='https://via.placeholder.com/200?text=Sin+Imagen'"></div>
                    <div class="slide-info">
                        <span class="slide-badge">${etiquetas[index]}</span>
                        <h3 class="slide-title">${p.nombre}</h3>
                        <p class="slide-desc">${p.desc}</p>
                        <p class="slide-price">$${p.precio.toLocaleString('es-CO')}</p>
                        <button class="btn btn-primary btn-small" onclick="agregarAlCarrito(${p.id})"><i class="fa-solid fa-cart-plus"></i> Lo Quiero</button>
                    </div>
                </div>`;
        }
    });
    const arrancarSlider = () => {
        slideInterval = setInterval(() => {
            currentSlide = (currentSlide + 1) % featuredIds.length;
            track.style.transform = `translateX(-${currentSlide * 100}%)`;
        }, 6000); 
    };
    arrancarSlider();
    document.getElementById('sliderContainer').addEventListener('mouseenter', () => clearInterval(slideInterval));
    document.getElementById('sliderContainer').addEventListener('mouseleave', arrancarSlider);
}