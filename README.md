**Documentación Técnica y Funcional del Proyecto**


**Sistema de E-Commerce: "Purple Desire"**


**Tipo de Proyecto:** Aplicación Web de Comercio Electrónico (Boutique Sensual Anónima)
**Tecnologías:** HTML5, CSS3, Vanilla JavaScript (DOM & LocalStorage).


**1. Introducción y Justificación del Proyecto**


"Purple Desire" es el prototipo funcional de una tienda en línea orientada a la venta de productos de
bienestar adulto, lencería y juguetes.


**Problema a resolver:** El principal obstáculo en la industria del bienestar adulto es la fricción
generada por la vergüenza, la falta de privacidad y el miedo al escrutinio social.
**Solución propuesta:** Se diseñó una plataforma bajo la premisa de "Privacidad Extrema". Desde la
navegación anónima hasta la garantía de empaque ciego, la interfaz está pensada para reducir la
fricción de compra mediante el anonimato y generar confianza a través de una Experiencia de Usuario
(UX) inmersiva y discreta.


**2. Tecnologías Utilizadas**


El proyecto se desarrolló bajo el paradigma de _Vanilla Web Development_ (sin frameworks ni librerías
pesadas) para garantizar un rendimiento óptimo y demostrar el dominio absoluto de los fundamentos
de la web:


  - **HTML5:** Estructuración semántica de la información y modales (ventanas emergentes).


  - **CSS3:** Diseño responsivo (Mobile-First), animaciones fluidas (keyframes), variables
globales (:root) para un esquema de colores Dark Mode/Neón y efectos visuales de cristal
( _Glassmorphism_ ).


  - **JavaScript (ES6+):** Lógica de negocio, manipulación dinámica del DOM, gestión de
eventos y almacenamiento persistente del lado del cliente.


  - **FontAwesome:** Sistema de iconografía vectorial para mejorar la interfaz visual.


**3. Arquitectura de Almacenamiento (Persistencia de Datos)**


Para simular una base de datos real sin necesidad de un backend o servidor, el sistema utiliza la API
de **LocalStorage** del navegador. Los datos se almacenan en formato JSON y se
serializan/deserializan de forma síncrona.


  - pd_products_cop: Almacena el catálogo de productos (CRUD de administrador).


  - pd_cart_cop: Almacena el estado del carrito de compras (productos, cantidades).


  - pd_wishlist: Guarda un array con los IDs de los productos favoritos del usuario.


  - isAdultVerified: Variable de sessionStorage que guarda el estado de la verificación de
mayoría de edad (se reinicia al cerrar el navegador).


**4. Módulos y Funcionalidades Principales**


**A. Módulo de Autenticación y Privacidad**

  - **Verificación de Edad (+18):** Modal restrictivo al inicio. Bloquea el scroll y obliga al usuario
a confirmar su edad. Si rechaza, es redirigido fuera del sitio por seguridad.


  - **Navegación de Incógnito:** Sistema que permite crear "Perfiles Desechables" (Alias
generados aleatoriamente vía JS) o navegar como Invitado, evitando la solicitud de datos
personales invasivos.

**B. Módulo de Catálogo y Búsqueda**

  - **Renderizado Dinámico:** Los productos se inyectan dinámicamente en el DOM leyendo el
array principal.


  - **Filtros en Tiempo Real:** Barra _sticky_ que permite filtrar productos por categoría (Juguetes,
Lencería, Bienestar), búsqueda por texto (nombre/descripción) y ordenamiento por precio.


  - **Vista Rápida:** Modal que amplía la información del producto, mostrando precio, descripción
detallada y permitiendo la adición directa al carrito.

**C. Módulo E-Commerce (Carrito y Wishlist)**

  - **Carrito de Compras Lateral:** Panel tipo _Off-canvas_ que calcula en tiempo real subtotal,
impuestos (10%) y envío.


  - **Barra Dinámica de Envío Gratis (Gamificación):** Calcula la diferencia entre el subtotal y
la meta ($150.000 COP). Muestra una barra de progreso visual (CSS) que se torna verde al
alcanzar el objetivo, incentivando el aumento del ticket promedio.


  - **Wishlist (Tus Secretos):** Sistema de favoritos donde el usuario puede guardar productos
discretamente para una compra futura.

**D. Módulo de Checkout y Rastreo**


  - **Modal de Pago Seguro:** Formulario de pago simulado que destaca visualmente la promesa
de "Empaque Ciego Garantizado".


  - **Simulador de Rastreo (Fake Tracker):** Herramienta en el footer que permite ingresar un
código de guía (generado tras la compra) y simula, mediante eventos asíncronos
(setTimeout), los estados de entrega segura de un paquete anónimo.

**E. Módulo de Administración (CRUD)**

  - Panel oculto que se activa al iniciar sesión con la palabra clave "admin". Permite crear, editar
y eliminar productos directamente desde la interfaz, actualizando el localStorage en tiempo
real.


**5. Estrategias de Psicología de Ventas Integradas**


El código no solo cumple funciones técnicas, sino que incorpora "Gatillos Mentales" (Mental
Triggers) fundamentales en el marketing digital:


1. **Efecto FOMO (Fear Of Missing Out):** Un algoritmo matemático en JavaScript calcula

ciertos IDs de productos para mostrarles aleatoriamente etiquetas parpadeantes de _"¡Últimas_
_X unidades!"_, creando sentido de urgencia en el comprador.


2. **Prueba Social (Social Proof):** En la vista detallada de los productos, JS genera

dinámicamente estrellas ( ⭐⭐⭐⭐⭐ ) y reseñas con perfiles anónimos ( _Ej:_
_Agent_4091_ ) que confirman la calidad y discreción del envío, lo que destruye las objeciones
de compra.


3. **Aseguramiento de Expectativas:** Notificaciones visuales (Toasts y Alertas Personalizadas)

que felicitan al usuario por su acción y le reafirman que su envío llegará sin logotipos y a una
dirección secreta.


**6. Diseño Responsivo y Accesibilidad**

  - El diseño está construido con Flexbox y CSS Grid, adaptándose perfectamente a pantallas
móviles, tablets y monitores de escritorio.


  - El sistema incluye un botón flotante de WhatsApp pre-configurado para soporte anónimo
inmediato.


  - Gestión de Z-index y overflow: hidden para que los modales (ventanas emergentes) bloqueen
el scroll del fondo, focalizando la atención del usuario al 100% en la acción actual (pago,
edad, detalles).


**7. Conclusión**


El proyecto "Purple Desire" demuestra una implementación integral de desarrollo Front-end.
Resuelve un problema de negocio real combinando algoritmos técnicos limpios (manipulación del
DOM, filtrado de arrays, LocalStorage) con una comprensión profunda del viaje del usuario (UX) y
embudos de conversión (estrategias de venta).
