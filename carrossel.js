const slides = document.querySelectorAll(".carrossel-slide");
const indicadores = document.querySelectorAll(".indicador");
const prevBtn = document.querySelector(".destaque-prev");
const nextBtn = document.querySelector(".destaque-next");
const container = document.querySelector(".carrossel-container"); 
let index = 0;
let autoTroca;
let timeoutRetomarAutoTroca;

function mostrarSlide(i) {
  slides.forEach(slide => slide.classList.remove("ativo"));
  indicadores.forEach(ind => ind.classList.remove("ativo"));
  slides[i].classList.add("ativo");
  indicadores[i].classList.add("ativo");
}

function isModalAberto() {
  return document.body.classList.contains("modal-aberto");
}

function iniciarAutoTroca() {
  if (isModalAberto()) return; 
  autoTroca = setInterval(() => {
    index = (index + 1) % slides.length;
    mostrarSlide(index);
  }, 8000);
}
function pararAutoTroca() {
  clearInterval(autoTroca);
}

function reiniciarAutoTroca() {
  pararAutoTroca();
  iniciarAutoTroca();
}

function agendarAutoTroca() {
  clearTimeout(timeoutRetomarAutoTroca);
  
  if (isModalAberto()) return;

  timeoutRetomarAutoTroca = setTimeout(() => {
    iniciarAutoTroca();
  }, 10000); 
}


prevBtn.addEventListener("click", () => {
  index = (index - 1 + slides.length) % slides.length;
  mostrarSlide(index);
  pararAutoTroca();
  agendarAutoTroca();
});

nextBtn.addEventListener("click", () => {
  index = (index + 1) % slides.length;
  mostrarSlide(index);
  pararAutoTroca();
  agendarAutoTroca();
});

iniciarAutoTroca();

container.addEventListener("mouseenter", pararAutoTroca);
container.addEventListener("mouseleave", iniciarAutoTroca);


function abrirModal(img) {
  const modal = document.getElementById("modal-projeto");
  const modalImg = document.getElementById("modal-img");
  const modalTitulo = document.getElementById("modal-titulo");
  const modalDescricao = document.getElementById("modal-descricao");

  modalImg.src = img.src;
  modalTitulo.textContent = img.getAttribute("data-title");
  modalDescricao.innerHTML = img.getAttribute("data-description").replace(/\n/g, '<br>');

  modal.style.display = "flex";
  document.body.classList.add("modal-aberto");
  pararAutoTroca();

  header.classList.add("header-oculto");
}

function fecharModal(event) {
  if (!event || event.target.id === "modal-projeto") {
    document.getElementById("modal-projeto").style.display = "none";
    document.body.classList.remove("modal-aberto");
    iniciarAutoTroca();
    document.querySelector("header").classList.remove("header-oculto");
  }
}

function fecharModalDireto() {
  document.getElementById("modal-projeto").style.display = "none";
  document.body.classList.remove("modal-aberto");
  iniciarAutoTroca();
  document.querySelector("header").classList.remove("header-oculto");
}


function irParaSlide(i) {
  index = i;
  mostrarSlide(index);
  reiniciarAutoTroca(); 
}
