document.addEventListener("DOMContentLoaded", () => {
    // ───────────────────────────────────────
    // 1. Scroll Progress Bar
    // ───────────────────────────────────────
    const progBar = document.createElement('div');
    progBar.id = 'scroll-progress';
    document.body.prepend(progBar);

    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const total = document.body.scrollHeight - window.innerHeight;
        progBar.style.width = `${(scrolled / total) * 100}%`;
    }, { passive: true });

    // ───────────────────────────────────────
    // 2. Hero Stagger Load
    // ───────────────────────────────────────
    const heroHeadline = document.querySelector('.hero-headline');
    const heroPara     = document.querySelector('.hero .body-md');
    const heroButtons  = document.querySelectorAll('.hero .btn');
    const portrait     = document.querySelector('.hero-portrait');

    const setHidden = (el, y = 30) => {
        if (!el) return;
        el.style.opacity = '0';
        el.style.transform = `translateY(${y}px)`;
        el.style.transition = 'opacity 0.8s ease-out, transform 0.8s cubic-bezier(0.16,1,0.3,1)';
    };
    const reveal = (el, delay = 0) => {
        if (!el) return;
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'none';
        }, delay);
    };

    setHidden(heroHeadline, 50);
    setHidden(heroPara, 30);
    heroButtons.forEach(b => setHidden(b, 20));
    if (portrait) {
        portrait.style.opacity = '0';
        portrait.style.transform = 'translateY(-46%) scale(0.95)';
        portrait.style.transition = 'opacity 1s ease, transform 1.2s cubic-bezier(0.16,1,0.3,1)';
    }

    setTimeout(() => reveal(heroHeadline), 200);
    setTimeout(() => reveal(heroPara), 450);
    setTimeout(() => heroButtons.forEach((b, i) => reveal(b, i * 100)), 650);
    setTimeout(() => {
        if (portrait) {
            portrait.style.opacity = '1';
            portrait.style.transform = 'translateY(-50%) scale(1)';
        }
    }, 300);

    // ───────────────────────────────────────
    // 3. data-anim Intersection Observer
    // ───────────────────────────────────────
    const animObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                animObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    document.querySelectorAll('[data-anim]').forEach(el => animObserver.observe(el));

    // ───────────────────────────────────────
    // 4. Line-by-line text reveals
    // ───────────────────────────────────────
    const textRevealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const inners = entry.target.querySelectorAll('.text-reveal-inner');
                inners.forEach((inner, i) => {
                    setTimeout(() => inner.classList.add('is-visible'), i * 120);
                });
                textRevealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('.text-reveal-wrap').forEach(el => {
        // Wrap each word span's parent
        textRevealObserver.observe(el.closest('h2') || el.parentElement);
    });

    // ───────────────────────────────────────
    // 5. Chip stagger
    // ───────────────────────────────────────
    const chipObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const chips = entry.target.querySelectorAll('.chip');
                chips.forEach((chip, i) => {
                    setTimeout(() => chip.classList.add('is-visible'), i * 80);
                });
                chipObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.chip-container').forEach(el => {
        const badges = el.querySelectorAll('.skill-badge');
        badges.forEach((badge, i) => {
            setTimeout(() => badge.classList.add('is-visible'), i * 80);
        });
        chipObserver.observe(el);
    });

    // ───────────────────────────────────────
    // 6. Project cards fly in
    // ───────────────────────────────────────
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'none';
                cardObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.project-card').forEach((card, i) => {
        card.style.opacity = '0';
        card.style.transform = i % 2 === 0 ? 'translateY(60px) rotate(-1deg)' : 'translateY(60px) rotate(1deg)';
        card.style.transitionDelay = `${i * 0.1}s`;
        cardObserver.observe(card);
    });

    // ───────────────────────────────────────
    // 7. Experience rows slide in alternately
    // ───────────────────────────────────────
    const expObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'none';
                expObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('.exp-row').forEach((row, i) => {
        row.style.opacity = '0';
        row.style.transform = i % 2 === 0 ? 'translateX(-50px)' : 'translateX(50px)';
        expObserver.observe(row);
    });

    // ───────────────────────────────────────
    // 8. Contact cards fly in bottom
    // ───────────────────────────────────────
    const contactObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const cards = entry.target.querySelectorAll('.contact-card');
                cards.forEach((card, i) => {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(40px)';
                    card.style.transition = `opacity 0.6s ease ${i * 0.12}s, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 0.12}s`;
                    // Trigger
                    requestAnimationFrame(() => {
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'none';
                        }, 10);
                    });
                });
                contactObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    const contactSection = document.querySelector('.contact-cards');
    if (contactSection) contactObserver.observe(contactSection);

    // ───────────────────────────────────────
    // 9. Glow on section headings
    // ───────────────────────────────────────
    const glowObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                glowObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.glow-on-reveal').forEach(el => glowObserver.observe(el));

    // ───────────────────────────────────────
    // 10. Line draws
    // ───────────────────────────────────────
    const lineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                lineObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.line-draw').forEach(el => lineObserver.observe(el));

    // ───────────────────────────────────────
    // 11. Smooth nav shrink on scroll
    // ───────────────────────────────────────
    const nav = document.querySelector('.nav-glass');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
            nav.style.height = '52px';
            nav.style.backdropFilter = 'blur(32px)';
        } else {
            nav.style.height = '64px';
            nav.style.backdropFilter = 'blur(20px)';
        }
    }, { passive: true });

    // ───────────────────────────────────────
    // 12. Smooth scroll
    // ───────────────────────────────────────
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        });
    });
});
