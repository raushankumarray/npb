// script.js
document.addEventListener('DOMContentLoaded', function() {

    // Header Menu Toggle Logic
    const menuToggleButton = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (menuToggleButton && navMenu) {
        menuToggleButton.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            const isExpanded = menuToggleButton.getAttribute('aria-expanded') === 'true';
            menuToggleButton.setAttribute('aria-expanded', !isExpanded);
        });
    }

    // Image Slider Logic
    const sliderWrapper = document.querySelector('.slider-wrapper');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dotsContainer = document.querySelector('.slider-dots');
    const sliderContainer = document.querySelector('.slider-container');

    if (sliderWrapper && slides.length > 0 && prevBtn && nextBtn && dotsContainer && sliderContainer) {
        let currentIndex = 0;
        const slideCount = slides.length;
        let slideWidth = slides[0].clientWidth;
        let intervalId = null;
        const autoSlideInterval = 4000;

        function createDots() {
            dotsContainer.innerHTML = '';
            for (let i = 0; i < slideCount; i++) {
                const dot = document.createElement('span');
                dot.classList.add('dot');
                dot.dataset.index = i;
                dotsContainer.appendChild(dot);
            }
            dotsContainer.addEventListener('click', (e) => {
                if (e.target.classList.contains('dot')) {
                    const index = parseInt(e.target.dataset.index);
                    goToSlide(index);
                    resetAutoSlide();
                }
            });
        }

        function updateDots() {
            const dots = dotsContainer.querySelectorAll('.dot');
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        }

        function goToSlide(index) {
            if (index < 0) {
                currentIndex = slideCount - 1;
            } else if (index >= slideCount) {
                currentIndex = 0;
            } else {
                currentIndex = index;
            }
            const offset = -currentIndex * slideWidth;
            sliderWrapper.style.transform = `translateX(${offset}px)`;
            updateDots();
        }

        function showNextSlide() {
            goToSlide(currentIndex + 1);
        }

        function showPrevSlide() {
            goToSlide(currentIndex - 1);
        }

        function startAutoSlide() {
            if (intervalId) clearInterval(intervalId);
            intervalId = setInterval(showNextSlide, autoSlideInterval);
        }

        function stopAutoSlide() {
            clearInterval(intervalId);
            intervalId = null;
        }

        function resetAutoSlide() {
            stopAutoSlide();
            startAutoSlide();
        }

        function handleResize() {
            slideWidth = sliderContainer.clientWidth;
            const offset = -currentIndex * slideWidth;
            sliderWrapper.style.transition = 'none';
            sliderWrapper.style.transform = `translateX(${offset}px)`;
            void sliderWrapper.offsetWidth;
            sliderWrapper.style.transition = 'transform 0.6s ease-in-out';
        }

        function initSlider() {
            slideWidth = sliderContainer.clientWidth;
            createDots();
            goToSlide(0);
            startAutoSlide();
            nextBtn.addEventListener('click', () => {
                showNextSlide();
                resetAutoSlide();
            });
            prevBtn.addEventListener('click', () => {
                showPrevSlide();
                resetAutoSlide();
            });
            sliderContainer.addEventListener('mouseenter', stopAutoSlide);
            sliderContainer.addEventListener('mouseleave', startAutoSlide);
            window.addEventListener('resize', handleResize);
        }

        initSlider();

    } else {
        console.warn("Slider elements not found. Could not initialize image slider.");
    }

    // Services Section Intersection Observer
    const serviceItems = document.querySelectorAll('.service-item');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    });

    serviceItems.forEach(item => {
        observer.observe(item);
    });

});
