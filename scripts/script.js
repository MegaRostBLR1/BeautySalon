document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Menu Toggle
    const burgerBtn = document.getElementById('burger-btn');
    const navMenu = document.getElementById('nav-menu');

    if (burgerBtn && navMenu) {
        burgerBtn.addEventListener('click', () => {
            const isOpen = navMenu.classList.toggle('is-open');
            burgerBtn.setAttribute('aria-expanded', isOpen);
        });

        // Close mobile menu on menu link click
        navMenu.querySelectorAll('.beauty-header__link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('is-open');
                burgerBtn.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // Booking Modal Logic
    const openModalBtn = document.getElementById('open-booking');
    const modal = document.getElementById('booking-modal');
    const bookingForm = document.getElementById('booking-form');

    const openModal = () => {
        if (modal) {
            modal.classList.add('is-open');
            modal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        }
    };

    const closeModal = () => {
        if (modal) {
            modal.classList.remove('is-open');
            modal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }
    };

    if (openModalBtn) {
        openModalBtn.addEventListener('click', openModal);
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target.hasAttribute('data-close')) {
                closeModal();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('is-open')) {
                closeModal();
            }
        });
    }

    // Handle Form Submission
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Спасибо! Ваша заявка принята. Администратор свяжется с вами в ближайшее время.');
            bookingForm.reset();
            closeModal();
        });
    }
});