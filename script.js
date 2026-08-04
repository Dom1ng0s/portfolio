document.addEventListener("DOMContentLoaded", () => {

    /* =============================================================
       1. HAMBURGER MENU
       ============================================================= */
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('open');
            navLinks.classList.toggle('open');
        });
        navLinks.querySelectorAll('a').forEach(a => {
            a.addEventListener('click', () => {
                hamburger.classList.remove('open');
                navLinks.classList.remove('open');
            });
        });
    }

    /* =============================================================
       2. TEMA CLARO / ESCURO
       ============================================================= */
    const toggle = document.createElement('button');
    toggle.className = 'theme-toggle';
    toggle.setAttribute('aria-label', 'Alternar tema claro/escuro');

    function applyTheme(theme) {
        if (theme === 'light') {
            document.documentElement.setAttribute('data-theme', 'light');
            toggle.textContent = '🌙';
        } else {
            document.documentElement.removeAttribute('data-theme');
            toggle.textContent = '☀';
        }
    }

    // Apply saved preference (anti-flash script in <head> already set the attribute,
    // this just syncs the button icon)
    applyTheme(localStorage.getItem('theme') || 'dark');

    toggle.addEventListener('click', () => {
        const isLight = document.documentElement.getAttribute('data-theme') === 'light';
        const next = isLight ? 'dark' : 'light';
        localStorage.setItem('theme', next);
        applyTheme(next);
    });

    // Insert toggle at the end of the nav (visible on desktop + inside mobile dropdown)
    const nav = document.querySelector('.nav-links');
    if (nav) nav.appendChild(toggle);

    /* =============================================================
       3. LIGHTBOX (ZOOM)
       ============================================================= */
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.className = 'lightbox-overlay';
    lightbox.innerHTML = '<img id="lightbox-img" src="" alt="Imagem Ampliada">';
    document.body.appendChild(lightbox);

    const lightboxImg = document.getElementById('lightbox-img');

    const images = document.querySelectorAll('.hero-img img, .project-img, .project-content img');
    images.forEach(img => {
        img.style.cursor = 'zoom-in';
        img.addEventListener('click', () => {
            lightboxImg.src = img.src;
            lightbox.classList.add('active');
        });
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target !== lightboxImg) {
            lightbox.classList.remove('active');
        }
    });


});
