/* =============================================================
   SMART LAB — SHARED SCRIPT (works on every page)
   Each block checks if its elements exist, so the same file
   is safe to include on pages that don't have a slider, etc.
   ============================================================= */

/* ---------- Sticky header ---------- */
const header=document.getElementById('header');
if(header && !header.classList.contains('solid')){
  addEventListener('scroll',()=>header.classList.toggle('scrolled',scrollY>40));
}

/* ---------- Mobile menu ---------- */
const burger=document.getElementById('burger'),menu=document.getElementById('menu');
if(burger&&menu){
  burger.addEventListener('click',()=>menu.classList.toggle('open'));
  menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>menu.classList.remove('open')));
}

/* ---------- Hero slider (home only) ---------- */
const slides=[...document.querySelectorAll('.slide')];
const dotsWrap=document.getElementById('dots');
if(slides.length && dotsWrap){
  let cur=0,timer;
  slides.forEach((_,i)=>{
    const b=document.createElement('button');
    if(i===0)b.classList.add('active');
    b.addEventListener('click',()=>go(i));
    dotsWrap.appendChild(b);
  });
  const dots=[...dotsWrap.children];
  function go(i){
    slides[cur].classList.remove('active');dots[cur].classList.remove('active');
    cur=(i+slides.length)%slides.length;
    slides[cur].classList.add('active');dots[cur].classList.add('active');
    restart();
  }
  const next=()=>go(cur+1);
  function restart(){clearInterval(timer);timer=setInterval(next,6000);}
  const nb=document.getElementById('next'),pb=document.getElementById('prev');
  if(nb)nb.addEventListener('click',next);
  if(pb)pb.addEventListener('click',()=>go(cur-1));
  restart();
}

/* ---------- Scroll reveal ---------- */
const reveals=document.querySelectorAll('.reveal');
if(reveals.length){
  const io=new IntersectionObserver((es)=>{
    es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});
  },{threshold:.15});
  reveals.forEach(el=>io.observe(el));
}

/* ---------- Tabs (about / story) ---------- */
const tabBtns=document.querySelectorAll('#tabs button');
if(tabBtns.length){
  tabBtns.forEach(btn=>{
    btn.addEventListener('click',()=>{
      document.querySelectorAll('#tabs button').forEach(b=>b.classList.remove('active'));
      document.querySelectorAll('.tab-panel').forEach(p=>p.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById(btn.dataset.tab).classList.add('active');
    });
  });
}

/* ---------- Animated counters ---------- */
const counters=document.querySelectorAll('.num');
if(counters.length){
  const cObs=new IntersectionObserver((es)=>{
    es.forEach(e=>{
      if(e.isIntersecting){
        const el=e.target,target=+el.dataset.count,plus=el.querySelector('.plus');
        let n=0;const step=Math.max(1,Math.round(target/60));
        const t=setInterval(()=>{
          n+=step;if(n>=target){n=target;clearInterval(t);}
          el.childNodes[0].nodeValue=n;
          if(plus&&target>=50)el.appendChild(plus);
        },24);
        cObs.unobserve(el);
      }
    });
  },{threshold:.5});
  counters.forEach(c=>cObs.observe(c));
}

/* ---------- Contact form (demo handler) ---------- */
const cform=document.getElementById('cform');
if(cform){
  cform.addEventListener('submit',e=>{
    e.preventDefault();cform.reset();
    const s=document.getElementById('sent');if(s)s.style.display='block';
  });
}

/* ---------- Year ---------- */
const yr=document.getElementById('yr');
if(yr)yr.textContent=new Date().getFullYear();
