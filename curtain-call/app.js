const slides = [...document.querySelectorAll('.slide')];
const dots = [...document.querySelectorAll('.slide-dots button')];
const counter = document.querySelector('#slide-count');
let current = 0;
function showSlide(index) {
  current = (index + slides.length) % slides.length;
  slides.forEach((slide, i) => { slide.hidden = i !== current; slide.classList.toggle('active', i === current); });
  dots.forEach((dot, i) => { dot.classList.toggle('active', i === current); if (i === current) dot.setAttribute('aria-current', 'true'); else dot.removeAttribute('aria-current'); });
  counter.textContent = `${current + 1} / ${slides.length}`;
}
document.querySelector('#slide-prev').addEventListener('click', () => showSlide(current - 1));
document.querySelector('#slide-next').addEventListener('click', () => showSlide(current + 1));
dots.forEach(dot => dot.addEventListener('click', () => showSlide(Number(dot.dataset.go))));
document.querySelector('#slide-track').addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft') { event.preventDefault(); showSlide(current - 1); }
  if (event.key === 'ArrowRight') { event.preventDefault(); showSlide(current + 1); }
});
