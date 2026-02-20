document.querySelectorAll('.card').forEach(card => {
    const carousel = card.querySelector('.product-carousel');
    const images = card.querySelectorAll('.product-carousel img');
    let index = 0;

    const nextBtn = card.querySelector('.next');
    const prevBtn = card.querySelector('.prev');

    function updateSlide() {
        const shift = index * (100 / images.length); // % que debe moverse
        carousel.style.transform = `translateX(-${shift}%)`;
    }

    nextBtn.addEventListener('click', () => {
        index = (index + 1) % images.length;
        updateSlide();
    });

    prevBtn.addEventListener('click', () => {
        index = (index - 1 + images.length) % images.length;
        updateSlide();
    });

    // Auto-play cada 3 segundos
    setInterval(() => {
        index = (index + 1) % images.length;
        updateSlide();
    }, 3000);

    // Inicializar
    updateSlide();

    // Si cambian tamaños de ventana, se ajusta
    window.addEventListener('resize', updateSlide);
});