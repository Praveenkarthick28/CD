/* ==========================================
   CRAVINGS DESTINY
   Vanilla JavaScript
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const header = document.querySelector(".header");
    const cards = document.querySelectorAll(".menu-card");

    // Header shadow on scroll
    window.addEventListener("scroll", () => {
        if (window.scrollY > 20) {
            header.style.boxShadow = "0 12px 30px rgba(0,0,0,.10)";
        } else {
            header.style.boxShadow = "";
        }
    });

    // Fade-in animation for menu cards
    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                observer.unobserve(entry.target);

            }

        });

    }, {
        threshold: 0.1
    });

    cards.forEach(card => {

        card.style.opacity = "0";
        card.style.transform = "translateY(30px)";
        card.style.transition = "opacity 0.6s ease, transform 0.6s ease";

        observer.observe(card);

    });

    // Footer copyright year
    const copyright = document.querySelector(".copyright");

    if (copyright) {
        copyright.innerHTML =
            `© ${new Date().getFullYear()} Cravings Destiny. All Rights Reserved.`;
    }

    // Button click feedback
    document.querySelectorAll(".hero-btn, .whatsapp-btn").forEach(button => {

        button.addEventListener("click", () => {

            button.style.transform = "scale(0.98)";

            setTimeout(() => {
                button.style.transform = "";
            }, 150);

        });

    });

});
