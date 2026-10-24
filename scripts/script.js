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

    // FAQ accordion: allow one open item and animate answer height.
    const faqItems = document.querySelectorAll('.faq__item');
    const faqAnimations = new WeakMap();

    const closeFaqItem = (item) => {
        const answer = item.querySelector('.faq__answer');
        if (!item.open || !answer) return;

        const previousAnimation = faqAnimations.get(item);
        if (previousAnimation) previousAnimation.cancel();

        const currentHeight = answer.getBoundingClientRect().height;
        const animation = answer.animate(
            [{ height: `${currentHeight}px`, opacity: 1 }, { height: '0px', opacity: 0 }],
            { duration: 240, easing: 'ease', fill: 'forwards' }
        );
        faqAnimations.set(item, animation);

        animation.onfinish = () => {
            if (faqAnimations.get(item) !== animation) return;
            item.open = false;
            answer.style.height = '';
            answer.style.opacity = '';
            animation.cancel();
            faqAnimations.delete(item);
        };
    };

    const openFaqItem = (item) => {
        const answer = item.querySelector('.faq__answer');
        if (!answer) return;

        const previousAnimation = faqAnimations.get(item);
        if (previousAnimation) previousAnimation.cancel();

        item.open = true;
        answer.style.height = '0px';
        answer.style.opacity = '0';

        requestAnimationFrame(() => {
            const targetHeight = answer.scrollHeight;
            const animation = answer.animate(
                [{ height: '0px', opacity: 0 }, { height: `${targetHeight}px`, opacity: 1 }],
                { duration: 260, easing: 'ease', fill: 'forwards' }
            );
            faqAnimations.set(item, animation);

            animation.onfinish = () => {
                if (faqAnimations.get(item) !== animation) return;
                answer.style.height = '';
                answer.style.opacity = '';
                animation.cancel();
                faqAnimations.delete(item);
            };
        });
    };

    faqItems.forEach(item => {
        const question = item.querySelector('.faq__question');
        if (!question) return;

        question.addEventListener('click', event => {
            event.preventDefault();

            if (item.open) {
                closeFaqItem(item);
                return;
            }

            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.open) closeFaqItem(otherItem);
            });
            openFaqItem(item);
        });
    });

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