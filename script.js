document.addEventListener("DOMContentLoaded", () => {
    
    /* =============================================================
       1. LIGHTBOX (ZOOM)
       ============================================================= */
    
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.className = 'lightbox-overlay';
    lightbox.innerHTML = '<img id="lightbox-img" src="" alt="Imagem Ampliada">';
    document.body.appendChild(lightbox);

    const lightboxImg = document.getElementById('lightbox-img');

   
    const images = document.querySelectorAll('.hero-img img, .project-img, .project-content img');

    images.forEach(img => {
        img.style.cursor = 'zoom-in'; // Força o cursor de lupa
        img.addEventListener('click', () => {
            lightboxImg.src = img.src;
            lightbox.classList.add('active');
        });
    });

    // Fechar ao clicar fora da imagem
    lightbox.addEventListener('click', (e) => {
        if (e.target !== lightboxImg) {
            lightbox.classList.remove('active');
        }
    });


    /* =============================================================
       2. CARROSSEL AUTO-SCROLL 
       ============================================================= */
    const container = document.querySelector('.projects-container');
    
    if (container) {
        const intervalTime = 3000; 
        let scrollInterval;

        const autoScroll = () => {
            const card = container.querySelector('.card');
            if (!card) return;
            
            const cardWidth = card.offsetWidth + 20
            const maxScroll = container.scrollWidth - container.clientWidth;

            if (container.scrollLeft >= maxScroll - 10) {
                container.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                container.scrollBy({ left: cardWidth, behavior: 'smooth' });
            }
        };

        const startScroll = () => {
            scrollInterval = setInterval(autoScroll, intervalTime);
        };

        const stopScroll = () => {
            clearInterval(scrollInterval);
        };

        container.addEventListener('mouseenter', stopScroll);
        container.addEventListener('mouseleave', startScroll);
        container.addEventListener('touchstart', stopScroll);
        container.addEventListener('touchend', startScroll);
        
        startScroll();
    }
});

