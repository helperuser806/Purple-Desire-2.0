🟣 Purple Desire
Sistema de E-Commerce – Boutique Sensual Anónima
📌 1. Introducción y Justificación del Proyecto

"Purple Desire" es el prototipo funcional de una tienda en línea orientada a la venta de productos de bienestar adulto, lencería y juguetes.

❗ Problema a resolver

El principal obstáculo en la industria del bienestar adulto es la fricción generada por:

La vergüenza
La falta de privacidad
El miedo al escrutinio social
💡 Solución propuesta

Se diseñó una plataforma bajo la premisa de "Privacidad Extrema":

Navegación anónima
Empaque ciego garantizado
Interfaz enfocada en reducir la fricción de compra
Experiencia de Usuario (UX) inmersiva y discreta
🛠️ 2. Tecnologías Utilizadas

El proyecto se desarrolló bajo el paradigma de Vanilla Web Development (sin frameworks ni librerías pesadas), garantizando rendimiento óptimo y dominio de fundamentos web:

HTML5
Estructuración semántica
Uso de modales (ventanas emergentes)
CSS3
Diseño responsivo (Mobile-First)
Animaciones (keyframes)
Variables globales (:root)
Estética Dark Mode / Neón
Efectos Glassmorphism
JavaScript (ES6+)
Lógica de negocio
Manipulación del DOM
Gestión de eventos
Persistencia del lado del cliente
FontAwesome
Sistema de iconografía vectorial
💾 3. Arquitectura de Almacenamiento (Persistencia de Datos)

Para simular una base de datos sin backend, el sistema utiliza la API de LocalStorage.

Los datos se almacenan en formato JSON y se serializan/deserializan de forma síncrona:

pd_products_cop
→ Catálogo de productos (CRUD administrador)
pd_cart_cop
→ Estado del carrito (productos y cantidades)
pd_wishlist
→ Array con IDs de productos favoritos
isAdultVerified (sessionStorage)
→ Estado de verificación de mayoría de edad
⚙️ 4. Módulos y Funcionalidades Principales
🔐 A. Módulo de Autenticación y Privacidad
Verificación de Edad (+18)
Modal restrictivo al inicio
Bloqueo de scroll
Redirección si se rechaza
Navegación de Incógnito
Perfiles desechables (alias generados con JS)
Opción de usuario invitado
Sin recolección de datos personales
🛍️ B. Módulo de Catálogo y Búsqueda
Renderizado dinámico de productos (DOM)
Filtros en tiempo real:
Categoría (Juguetes, Lencería, Bienestar)
Búsqueda por texto
Ordenamiento por precio
Vista Rápida
Modal con información ampliada
Precio
Descripción
Añadir al carrito
🛒 C. Módulo E-Commerce (Carrito y Wishlist)
Carrito lateral (Off-canvas)
Cálculo en tiempo real:
Subtotal
Impuestos (10%)
Envío
Barra dinámica de envío gratis (Gamificación)
Meta: $150.000 COP
Barra de progreso visual
Cambio a color verde al alcanzar el objetivo
Wishlist (Tus Secretos)
Guardado discreto de productos
Persistencia local
💳 D. Módulo de Checkout y Rastreo
Modal de pago seguro
Formulario simulado
Enfatiza el empaque ciego
Simulador de rastreo (Fake Tracker)
Código de guía
Simulación de estados con setTimeout
Flujo asíncrono de entrega
🛠️ E. Módulo de Administración (CRUD)
Panel oculto activado con keyword: admin

Permite:

Crear productos
Editar productos
Eliminar productos

Actualiza el localStorage en tiempo real.

🧠 5. Estrategias de Psicología de Ventas Integradas

El sistema incorpora gatillos mentales del marketing digital:

⚡ 1. Efecto FOMO
Algoritmo en JS que muestra:
“¡Últimas X unidades!”
Genera urgencia de compra
🌟 2. Prueba Social
Reseñas generadas dinámicamente
Usuarios anónimos (ej: Agent_4091)
Sistema de estrellas ⭐⭐⭐⭐⭐
🔒 3. Aseguramiento de Expectativas
Notificaciones visuales (Toasts y Alertas)
Refuerzan:
Discreción del envío
Seguridad de la compra
📱 6. Diseño Responsivo y Accesibilidad
Construido con:
Flexbox
CSS Grid
Adaptable a:
Móviles
Tablets
Escritorio
Funcionalidades adicionales:
Botón flotante de WhatsApp
Gestión de z-index
overflow: hidden para modales
Enfoque total en la acción del usuario
🎯 7. Conclusión

El proyecto "Purple Desire" demuestra una implementación integral de desarrollo Front-end.

Integra:

Algoritmos técnicos sólidos
Manipulación del DOM
Filtrado de arrays
Uso de LocalStorage

Y los combina con:

Experiencia de usuario (UX)
Embudos de conversión
Estrategias de marketing digital

Resolviendo así un problema real mediante tecnología y diseño centrado en el usuario.
