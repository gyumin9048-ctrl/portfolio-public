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

const pageTabs=[...document.querySelectorAll('.page-tabs [role="tab"]')];
const pagePanels={project:document.querySelector('#panel-project'),work:document.querySelector('#panel-work'),test:document.querySelector('#panel-test')};
function selectPage(name,updateHash=true){if(!pagePanels[name])name='project';pageTabs.forEach(tab=>{const active=tab.dataset.panel===name;tab.setAttribute('aria-selected',String(active));tab.tabIndex=active?0:-1});Object.entries(pagePanels).forEach(([key,panel])=>{panel.hidden=key!==name});if(updateHash)history.replaceState(null,'','#'+name);window.scrollTo({top:0,behavior:'instant'});}
pageTabs.forEach((tab,index)=>{tab.addEventListener('click',()=>selectPage(tab.dataset.panel));tab.addEventListener('keydown',event=>{let target;if(event.key==='ArrowRight')target=pageTabs[(index+1)%pageTabs.length];else if(event.key==='ArrowLeft')target=pageTabs[(index+pageTabs.length-1)%pageTabs.length];else if(event.key==='Home')target=pageTabs[0];else if(event.key==='End')target=pageTabs.at(-1);if(target){event.preventDefault();selectPage(target.dataset.panel);target.focus()}})});
function selectFromHash(){const id=location.hash.slice(1);selectPage(['m1','m2','m3','role','evidence','craft'].includes(id)?'work':id,false);if(['m1','m2','m3','role','evidence','craft'].includes(id))document.getElementById(id)?.scrollIntoView()}
window.addEventListener('hashchange',selectFromHash);selectFromHash();
