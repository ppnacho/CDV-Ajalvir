document.addEventListener("DOMContentLoaded", () => {
    const navToggle = document.querySelector("[data-nav-toggle]");
    const navLinks = document.querySelector("[data-nav-links]");

    if (navToggle && navLinks) {
        navToggle.addEventListener("click", () => {
            navLinks.classList.toggle("open");
        });
    }
});
