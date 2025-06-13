let ultimoScroll = 0;
let ignorarScrollTemporariamente = false;
const header = document.querySelector("header");

document.querySelectorAll("nav ul li a").forEach(link => {
  link.addEventListener("click", () => {
    ignorarScrollTemporariamente = true;

    setTimeout(() => {
      ignorarScrollTemporariamente = false;
    }, 800); 
  });
});

window.addEventListener("scroll", () => {
  const scrollAtual = window.scrollY;

  if (!ignorarScrollTemporariamente && scrollAtual > ultimoScroll && scrollAtual > 100) {
    header.classList.add("header-animation");
  } else {
    header.classList.remove("header-animation");
  }

  ultimoScroll = scrollAtual;

  const links = document.querySelectorAll("nav ul li a");
  const scrollYComOffset = scrollAtual + 150;

  links.forEach((link) => {
    const section = document.querySelector(link.getAttribute("href"));
    if (section) {
      const top = section.offsetTop;
      const bottom = top + section.offsetHeight;

      if (scrollYComOffset >= top && scrollYComOffset < bottom) {
        links.forEach((l) => l.classList.remove("active"));
        link.classList.add("active");
      }
    }
  });
});

window.addEventListener("DOMContentLoaded", function () {
  const logo = document.getElementById("logo-recarregar");
  if (logo) {
    logo.addEventListener("click", function () {
      window.location.href = window.location.origin + window.location.pathname;
    });
  }
});
