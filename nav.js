const hamburgerButton = document.getElementById("hamburger-button");
const hamburgerMenu = document.querySelector(".hamburger-navigation");
const nav = document.querySelector('.nav-wrapper');
let lastScrollY = window.scrollY;

hamburgerButton.addEventListener('click', () => {
    const isOpen = hamburgerMenu.classList.toggle('is-open');
    hamburgerButton.setAttribute('aria-expanded', isOpen);
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 1040) {
        hamburgerMenu.classList.remove('is-open');
        hamburgerButton.setAttribute('aria-expanded', 'false');
    }
});

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY && currentScrollY > 100) {
        nav.classList.add('nav-hidden');
        hamburgerMenu.classList.remove('is-open');
        hamburgerButton.setAttribute('aria-expanded', 'false');
    } else {
        nav.classList.remove('nav-hidden');
    }

    lastScrollY = currentScrollY;
});
