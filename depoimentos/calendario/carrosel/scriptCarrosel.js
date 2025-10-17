const slides = document.querySelector('.slides');
const images = document.querySelectorAll('.slides img');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const dotsContainer = document.querySelector('.dots');
let index = 0;
let startX = 0;
let isDragging = false;

// ====== Cria as bolinhas dinamicamente ======
images.forEach((_, i) => {
  const dot = document.createElement('span');
  dot.addEventListener('click', () => goToSlide(i));
  dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.dots span');
updateDots();

function showSlide() {
  slides.style.transform = `translateX(-${index * 100}%)`;
  updateDots();
}

function nextSlide() {
  index = (index + 1) % images.length;
  showSlide();
}

function prevSlide() {
  index = (index - 1 + images.length) % images.length;
  showSlide();
}

function goToSlide(i) {
  index = i;
  showSlide();
}

function updateDots() {
  dots.forEach(dot => dot.classList.remove('active'));
  dots[index].classList.add('active');
}

nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

// ====== Função de arrastar (mouse e touch) ======
slides.addEventListener('mousedown', startDrag);
slides.addEventListener('touchstart', startDrag);

slides.addEventListener('mousemove', drag);
slides.addEventListener('touchmove', drag);

slides.addEventListener('mouseup', endDrag);
slides.addEventListener('mouseleave', endDrag);
slides.addEventListener('touchend', endDrag);

function startDrag(e) {
  isDragging = true;
  startX = e.touches ? e.touches[0].clientX : e.clientX;
}

function drag(e) {
  if (!isDragging) return;
  const currentX = e.touches ? e.touches[0].clientX : e.clientX;
  const diff = startX - currentX;

  if (Math.abs(diff) > 50) {
    if (diff > 0) nextSlide(); // arrastou pra esquerda
    else prevSlide();          // arrastou pra direita
    isDragging = false;
  }
}

function endDrag() {
  isDragging = false;
}

// ====== Autoplay (opcional) ======
setInterval(nextSlide, 5000);
