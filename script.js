/* ======================================
   SCRIPT: NAVEGACIÓN MENÚS Y SUBMENÚS
====================================== */
document.addEventListener('DOMContentLoaded', function () {
    console.log('🔧 Navegación iniciada');

    // FUNCIÓN: OCULTAR TODAS LAS SECCIONES Y MOSTRAR SOLO HOME
    function showOnlyHomeOnLoad() {
        document.querySelectorAll('.main-section, .subsection').forEach(section => {
            section.style.display = 'none';
        });

        const homeSection = document.getElementById('home');
        if (homeSection) {
            homeSection.style.display = 'block';
        }
       
        document.querySelectorAll('[id^="home-"]').forEach(subsection => {
           subsection.style.display = 'block';
        });
    
        // Quitar la clase is-section al volver a Home
        document.body.classList.remove('is-section');
    }

    // FUNCIÓN: NAVEGAR A UNA SECCIÓN
    function showOnlyOneSection(sectionId) {
        console.log('Mostrando SOLO:', sectionId);
       
        document.querySelectorAll('.main-section, .subsection').forEach(section => {
            section.style.display = 'none';
        });
      
        const mainSection = document.getElementById(sectionId);
        if (mainSection) {
            mainSection.style.display = 'block';

            document.querySelectorAll(`[id^="${sectionId}-"]`).forEach(subsection => {
                subsection.style.display = 'block';
            });

            mainSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

            // Si NO es home, activar is-section; si es home, quitarla
            if (sectionId === 'home') {
                document.body.classList.remove('is-section');
            } else {
                document.body.classList.add('is-section');
            }
        }
    }   
    // FUNCIÓN: NAVEGAR A UNA SUBSECCIÓN
    function goToSubsection(subsectionId) {
        console.log('Yendo a subsección:', subsectionId);

        const mainSectionId = subsectionId.split('-')[0];
        showOnlyOneSection(mainSectionId);

        setTimeout(() => {
            const subsection = document.getElementById(subsectionId);
            if (subsection) {
                subsection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 100);
    }

    // EVENTOS PARA BOTONES DEL MENÚ PRINCIPAL
    document.querySelectorAll('.menu-nav a, .menu-mobile-nav a').forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').replace('#', '');
            showOnlyOneSection(targetId);
            history.pushState(null, null, `#${targetId}`);
        });
    });

    // EVENTOS PARA BOTONES DE SUBMENÚ
    document.querySelectorAll('.menu-nav-submenu a, .menu-mobile-nav-submenu a').forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').replace('#', '');
            goToSubsection(targetId);
            history.pushState(null, null, `#${targetId}`);
        });
    });

    // VERIFICAR HASH AL CARGAR LA PÁGINA
    function checkInitialHash() {
        const hash = window.location.hash.replace('#', '');

        if (hash) {
            if (hash.includes('-')) {
                goToSubsection(hash);
            } else {
                showOnlyOneSection(hash);
            }
        } else {
            showOnlyHomeOnLoad();
        }
    }

    // NAVEGACIÓN DEL NAVEGADOR (atrás/adelante)
    function handleBrowserNavigation() {
        const hash = window.location.hash.replace('#', '');

        if (hash) {
            if (hash.includes('-')) {
                goToSubsection(hash);
            } else {
                showOnlyOneSection(hash);
            }
        } else {
            showOnlyHomeOnLoad();
        }
    }

    window.addEventListener('popstate', handleBrowserNavigation);

    // INICIALIZACIÓN
    checkInitialHash();
    console.log('✅ Navegación configurada correctamente');
});







/* ======================================
   SCRIPT: NAVEGACIÓN MOBILE
====================================== */
document.addEventListener('DOMContentLoaded', function () {
    console.log('📱 Navegación mobile iniciada');

    // ======================================
    // ABRIR / CERRAR MENÚ HAMBURGUESA
    // ======================================
    const botonMobile = document.querySelector('.menu-mobile-toggle');
    const menuMobile = document.querySelector('.menu-mobile-nav');

    if (botonMobile && menuMobile) {
        botonMobile.addEventListener('click', function () {
            menuMobile.classList.toggle('active');
        });
    }

    // FUNCIÓN: CERRAR MENÚ MOBILE
    function cerrarMenuMobile() {
        if (menuMobile) {
            menuMobile.classList.remove('active');
        }
    }

    // FUNCIÓN: OCULTAR TODAS LAS SECCIONES Y MOSTRAR SOLO HOME
    function showOnlyHomeOnLoad() {
        document.querySelectorAll('.main-section-mobile, .subsection-mobile').forEach(section => {
            section.style.display = 'none';
        });

        const homeSection = document.getElementById('home-mobile');
        if (homeSection) {
            homeSection.style.display = 'block';
        }

        document.querySelectorAll('[id^="home-mobile-"]').forEach(subsection => {
            subsection.style.display = 'block';
        });
    }

    // FUNCIÓN: NAVEGAR A UNA SECCIÓN
    function showOnlyOneSection(sectionId) {
        console.log('Mostrando SOLO:', sectionId);

        document.querySelectorAll('.main-section-mobile, .subsection-mobile').forEach(section => {
            section.style.display = 'none';
        });

        const mainSection = document.getElementById(sectionId);
        if (mainSection) {
            mainSection.style.display = 'block';

            document.querySelectorAll(`[id^="${sectionId}-"]`).forEach(subsection => {
                subsection.style.display = 'block';
            });

            mainSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    // FUNCIÓN: NAVEGAR A UNA SUBSECCIÓN
    function goToSubsection(subsectionId) {
        console.log('Yendo a subsección:', subsectionId);

        const mainSectionId = subsectionId.split('-')[0] + '-mobile';
        showOnlyOneSection(mainSectionId);

        setTimeout(() => {
            const subsection = document.getElementById(subsectionId);
            if (subsection) {
                subsection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 100);
    }

    // EVENTOS PARA BOTONES DEL MENÚ MOBILE
    document.querySelectorAll('.menu-mobile-nav a').forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').replace('#', '');
            showOnlyOneSection(targetId);
            history.pushState(null, null, `#${targetId}`);
            cerrarMenuMobile();
        });
    });

    // EVENTOS PARA BOTONES DE SUBMENÚ MOBILE
    document.querySelectorAll('.menu-mobile-nav-submenu a').forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').replace('#', '');
            goToSubsection(targetId);
            history.pushState(null, null, `#${targetId}`);
            cerrarMenuMobile();
        });
    });

    // VERIFICAR HASH AL CARGAR LA PÁGINA
    function checkInitialHash() {
        const hash = window.location.hash.replace('#', '');

        if (hash) {
            if (hash.includes('-') && hash !== 'home-mobile') {
                goToSubsection(hash);
            } else {
                showOnlyOneSection(hash);
            }
        } else {
            showOnlyHomeOnLoad();
        }
    }

    // NAVEGACIÓN DEL NAVEGADOR (atrás/adelante)
    function handleBrowserNavigation() {
        const hash = window.location.hash.replace('#', '');

        if (hash) {
            if (hash.includes('-') && hash !== 'home-mobile') {
                goToSubsection(hash);
            } else {
                showOnlyOneSection(hash);
            }
        } else {
            showOnlyHomeOnLoad();
        }
    }

    window.addEventListener('popstate', handleBrowserNavigation);

    // INICIALIZACIÓN
    checkInitialHash();
    console.log('✅ Navegación mobile configurada correctamente');
});



/* ======================================
   SCRIPT: NOTIFICACIÓN PROJECTDETAILS - PC
====================================== */
document.addEventListener('DOMContentLoaded', function () {
    const closeBtn        = document.getElementById('projectdetails-button-close');
    const notification    = document.getElementById('projectdetails-notification');
    const notificationBtn = document.getElementById('projectdetails-button-stay');
    if (closeBtn && notification && notificationBtn) {
        // Al hacer clic en la X → mostrar notificación
        closeBtn.addEventListener('click', () => {
            notification.classList.add('show');
        });
        // Al hacer clic en STAY → ocultar notificación
        notificationBtn.addEventListener('click', () => {
            notification.classList.remove('show');
        });
    }
});

/* ======================================
   SCRIPT: NOTIFICACIÓN PROJECTDETAILS - MOBILE
====================================== */
document.addEventListener('DOMContentLoaded', function () {
    const closeBtnMobile        = document.getElementById('projectdetails-button-close-mobile');
    const notificationMobile    = document.getElementById('projectdetails-notification-mobile');
    const notificationBtnMobile = document.getElementById('projectdetails-button-stay-mobile');
    if (closeBtnMobile && notificationMobile && notificationBtnMobile) {
        // Al hacer clic en la X → mostrar notificación
        closeBtnMobile.addEventListener('click', () => {
            notificationMobile.classList.add('show');
        });
        // Al hacer clic en STAY → ocultar notificación
        notificationBtnMobile.addEventListener('click', () => {
            notificationMobile.classList.remove('show');
        });
    }
});












/* ======================================
   SCRIPT: TEXTURES - PC
====================================== */
document.addEventListener('DOMContentLoaded', function () {
    const closeBtn        = document.getElementById('textures-button-close');
    const notification    = document.getElementById('textures-notification');
    const notificationBtn = document.getElementById('textures-button-stay');
    if (closeBtn && notification && notificationBtn) {
        // Al hacer clic en la X → mostrar notificación
        closeBtn.addEventListener('click', () => {
            notification.classList.add('show');
        });
        // Al hacer clic en STAY → ocultar notificación
        notificationBtn.addEventListener('click', () => {
            notification.classList.remove('show');
        });
    }

    // Carrusel PC
    const images  = document.querySelectorAll('#collection-textures .textures-image');
    const prevBtn = document.getElementById('textures-button-prev');
    const nextBtn = document.getElementById('textures-button-next');
    const counter = document.getElementById('textures-counter');
    let currentIndex = 0;

    function updateCarousel(index) {
        if (!images.length) return;
        currentIndex = (index + images.length) % images.length;

        images.forEach((img, i) => {
            img.classList.toggle('active', i === currentIndex);
        });

        if (counter) {
            counter.textContent = `${currentIndex + 1} OF ${images.length}`;
        }
    }

    if (prevBtn && nextBtn && images.length > 0) {
        prevBtn.addEventListener('click', () => {
            updateCarousel(currentIndex - 1);
        });
        nextBtn.addEventListener('click', () => {
            updateCarousel(currentIndex + 1);
        });
        updateCarousel(0);
    }
});

/* ======================================
   SCRIPT: TEXTURES - MOBILE
====================================== */
document.addEventListener('DOMContentLoaded', function () {
    const closeBtnMobile        = document.getElementById('textures-button-close-mobile');
    const notificationMobile    = document.getElementById('textures-notification-mobile');
    const notificationBtnMobile = document.getElementById('textures-button-stay-mobile');
    if (closeBtnMobile && notificationMobile && notificationBtnMobile) {
        // Al hacer clic en la X → mostrar notificación
        closeBtnMobile.addEventListener('click', () => {
            notificationMobile.classList.add('show');
        });
        // Al hacer clic en STAY → ocultar notificación
        notificationBtnMobile.addEventListener('click', () => {
            notificationMobile.classList.remove('show');
        });
    }

    // Carrusel Mobile
    const imagesMobile  = document.querySelectorAll('#collection-mobile-textures .textures-image-mobile');
    const prevBtnMobile = document.getElementById('textures-button-prev-mobile');
    const nextBtnMobile = document.getElementById('textures-button-next-mobile');
    const counterMobile = document.getElementById('textures-counter-mobile');
    let currentIndexMobile = 0;

    function updateCarouselMobile(index) {
        if (!imagesMobile.length) return;
        currentIndexMobile = (index + imagesMobile.length) % imagesMobile.length;

        imagesMobile.forEach((img, i) => {
            img.classList.toggle('active', i === currentIndexMobile);
        });

        if (counterMobile) {
            counterMobile.textContent = `${currentIndexMobile + 1} OF ${imagesMobile.length}`;
        }
    }

    if (prevBtnMobile && nextBtnMobile && imagesMobile.length > 0) {
        prevBtnMobile.addEventListener('click', () => {
            updateCarouselMobile(currentIndexMobile - 1);
        });
        nextBtnMobile.addEventListener('click', () => {
            updateCarouselMobile(currentIndexMobile + 1);
        });
        updateCarouselMobile(0);
    }
});









