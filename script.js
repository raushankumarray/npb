// Wait for the HTML document to be fully loaded and parsed
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM fully loaded and parsed"); // DEBUG: Check if script starts

    // Get references to the button and the menu
    const menuToggleButton = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    // DEBUG: Check if elements were found
    if (!menuToggleButton) {
        console.error("Error: Menu toggle button with id 'menu-toggle' not found!");
    } else {
        console.log("Menu toggle button found:", menuToggleButton);
    }

    if (!navMenu) {
        console.error("Error: Navigation menu with id 'nav-menu' not found!");
    } else {
        console.log("Navigation menu found:", navMenu);
    }

    // Proceed only if both elements exist
    if (menuToggleButton && navMenu) {
        // Add a click event listener to the button
        menuToggleButton.addEventListener('click', function() {
            console.log("Menu toggle button clicked!"); // DEBUG: Check if click event fires

            // Toggle the 'active' class on the navigation menu
            navMenu.classList.toggle('active');
            console.log("Toggled 'active' class on nav menu. Current classes:", navMenu.className); // DEBUG: See classes change

            // Toggle the aria-expanded attribute for accessibility
            // Use getAttribute to check current state reliably before setting
            const isExpanded = menuToggleButton.getAttribute('aria-expanded') === 'true';
            menuToggleButton.setAttribute('aria-expanded', !isExpanded); // Set to the opposite state
            console.log("Toggled aria-expanded to:", !isExpanded); // DEBUG: Check ARIA state change

        });

        console.log("Click event listener added to menu toggle button."); // DEBUG: Confirm listener setup
    } else {
        console.error("Could not add event listener because one or both elements were not found.");
    }

});

// Wait for the DOM to be ready
document.addEventListener('DOMContentLoaded', function() {

    // --- Header Menu Toggle Logic (Keep the existing code from previous response) ---
    const menuToggleButton = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    // ... (rest of the header toggle code) ...


    // --- Image Slider Logic ---
    const sliderWrapper = document.querySelector('.slider-wrapper');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dotsContainer = document.querySelector('.slider-dots');
    const sliderContainer = document.querySelector('.slider-container'); // Get container for hover effect

    if (sliderWrapper && slides.length > 0 && prevBtn && nextBtn && dotsContainer && sliderContainer) {
        let currentIndex = 0;
        const slideCount = slides.length;
        let slideWidth = slides[0].clientWidth; // Get initial width
        let intervalId = null; // For auto-sliding interval
        const autoSlideInterval = 4000; // Time in ms (e.g., 4 seconds)

        // --- Create Dots ---
        function createDots() {
            dotsContainer.innerHTML = ''; // Clear existing dots if any
            for (let i = 0; i < slideCount; i++) {
                const dot = document.createElement('span');
                dot.classList.add('dot');
                dot.dataset.index = i; // Store index in data attribute
                dotsContainer.appendChild(dot);
            }
            // Add click listener to dots container (event delegation)
             dotsContainer.addEventListener('click', (e) => {
                if (e.target.classList.contains('dot')) {
                    const index = parseInt(e.target.dataset.index);
                     goToSlide(index);
                     resetAutoSlide(); // Reset timer when dot is clicked
                }
             });
        }

        // --- Update Dots ---
        function updateDots() {
            const dots = dotsContainer.querySelectorAll('.dot');
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        }

        // --- Go To Slide ---
        function goToSlide(index) {
            // Handle index wrapping
            if (index < 0) {
                currentIndex = slideCount - 1;
            } else if (index >= slideCount) {
                currentIndex = 0;
            } else {
                currentIndex = index;
            }

            // Calculate the translation
            const offset = -currentIndex * slideWidth;
            sliderWrapper.style.transform = `translateX(${offset}px)`;
            updateDots();
        }

        // --- Show Next/Prev ---
        function showNextSlide() {
            goToSlide(currentIndex + 1);
        }

        function showPrevSlide() {
            goToSlide(currentIndex - 1);
        }

        // --- Auto Sliding ---
        function startAutoSlide() {
            if (intervalId) clearInterval(intervalId); // Clear existing interval if any
            intervalId = setInterval(showNextSlide, autoSlideInterval);
            console.log("Autoslide started, Interval ID:", intervalId);
        }

        function stopAutoSlide() {
            clearInterval(intervalId);
            intervalId = null; // Clear the stored ID
             console.log("Autoslide stopped");
        }

         function resetAutoSlide() {
             stopAutoSlide();
             startAutoSlide();
         }

        // --- Handle Window Resize ---
        function handleResize() {
            // Recalculate slide width based on container
            slideWidth = sliderContainer.clientWidth;
            // Update transform immediately without transition for resize
            const offset = -currentIndex * slideWidth;
            sliderWrapper.style.transition = 'none'; // Disable transition during resize adjustment
            sliderWrapper.style.transform = `translateX(${offset}px)`;
            // Force reflow/repaint might be needed in some browsers
             void sliderWrapper.offsetWidth; // Read offsetWidth to trigger reflow
            // Re-enable transition
            sliderWrapper.style.transition = 'transform 0.6s ease-in-out';
            console.log("Resized, new slideWidth:", slideWidth);
        }

        // --- Initialize Slider ---
        function initSlider() {
            console.log("Initializing slider...");
            slideWidth = sliderContainer.clientWidth; // Initial width calculation
            createDots();
            goToSlide(0); // Start at the first slide
            startAutoSlide(); // Start automatic sliding

            // Add event listeners
            nextBtn.addEventListener('click', () => {
                showNextSlide();
                resetAutoSlide(); // Reset timer on manual navigation
            });
            prevBtn.addEventListener('click', () => {
                showPrevSlide();
                resetAutoSlide(); // Reset timer on manual navigation
            });

             // Pause on hover
             sliderContainer.addEventListener('mouseenter', stopAutoSlide);
             sliderContainer.addEventListener('mouseleave', startAutoSlide);

             // Recalculate width on resize
             window.addEventListener('resize', handleResize);

            console.log("Slider Initialized. Slide count:", slideCount);
        }

        // Start the slider initialization
        initSlider();

    } else {
        console.warn("Slider elements not found. Could not initialize image slider.");
        // Log which elements might be missing
        if (!sliderWrapper) console.warn("- Slider wrapper (.slider-wrapper) not found.");
        if (!slides.length > 0) console.warn("- No slides (.slide) found.");
        if (!prevBtn) console.warn("- Previous button (.prev-btn) not found.");
        if (!nextBtn) console.warn("- Next button (.next-btn) not found.");
        if (!dotsContainer) console.warn("- Dots container (.slider-dots) not found.");
        if (!sliderContainer) console.warn("- Slider container (.slider-container) not found.");
    }

}); // End DOMContentLoaded listener


// Services Sectiom
const serviceItems = document.querySelectorAll('.service-item');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } else {
            //entry.target.classList.remove('show'); //Optional: remove show when out of view.
        }
    });
});

serviceItems.forEach(item => {
    observer.observe(item);
});


// --- Contact Form Submission (database + email) ---
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    const formStatus = document.getElementById('form-status');
    const submitButton = document.getElementById('submit-button');

    contactForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        // Basic validation
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const message = document.getElementById('message');
        const nameError = document.getElementById('name-error');
        const emailError = document.getElementById('email-error');
        const messageError = document.getElementById('message-error');

        // Clear previous errors
        [nameError, emailError, messageError].forEach(el => { if (el) el.textContent = ''; });
        [name, email, message].forEach(el => { if (el) el.classList.remove('error-border'); });
        if (formStatus) {
            formStatus.className = '';
            formStatus.textContent = '';
        }

        let isValid = true;
        if (!name || !name.value.trim()) {
            if (nameError) nameError.textContent = 'Name is required.';
            if (name) name.classList.add('error-border');
            isValid = false;
        }
        if (!email || !email.value.trim()) {
            if (emailError) emailError.textContent = 'Email is required.';
            if (email) email.classList.add('error-border');
            isValid = false;
        }
        if (!message || !message.value.trim()) {
            if (messageError) messageError.textContent = 'Message is required.';
            if (message) message.classList.add('error-border');
            isValid = false;
        }
        if (!isValid) return;

        // Disable button during submit
        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
        }

        const formData = {
            name: name.value.trim(),
            email: email.value.trim(),
            subject: document.getElementById('subject') ? document.getElementById('subject').value.trim() : '',
            message: message.value.trim(),
        };

        try {
            const apiUrl = window.API_BASE_URL ? `${window.API_BASE_URL}/api/contact` : '/api/contact';
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (result.success) {
                if (formStatus) {
                    formStatus.className = 'success';
                    formStatus.textContent = result.message || 'Thank you! Your message has been received.';
                }
                contactForm.reset();
            } else {
                if (formStatus) {
                    formStatus.className = 'error';
                    formStatus.textContent = result.error || 'Something went wrong. Please try again.';
                }
            }
        } catch (err) {
            if (formStatus) {
                formStatus.className = 'error';
                formStatus.textContent = 'Unable to send. Make sure the server is running (npm start).';
            }
        } finally {
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = 'Send Message';
            }
        }
    });
}






