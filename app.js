(function(){
var d=document;
var top=d.querySelector('.top');function sc(){top.classList.toggle('mala',window.scrollY>30)}sc();window.addEventListener('scroll',sc,{passive:true});
var rok=d.getElementById('rok');if(rok)rok.textContent=new Date().getFullYear();
/* menu mobilne */
var b=d.querySelector('.burger'),p=d.getElementById('panel');
function zamknij(){p.classList.remove('on');b.setAttribute('aria-expanded','false');b.setAttribute('aria-label','Otwórz menu');d.body.style.overflow=''}
b.addEventListener('click',function(){if(p.classList.contains('on'))return zamknij();p.classList.add('on');b.setAttribute('aria-expanded','true');b.setAttribute('aria-label','Zamknij menu');d.body.style.overflow='hidden'});
p.addEventListener('click',function(e){if(e.target.closest('a'))zamknij()});
d.addEventListener('keydown',function(e){if(e.key==='Escape'){zamknij();lbZamknij()}});
/* galeria przesuwana myszą */
d.querySelectorAll('.tor').forEach(function(tor){
 var x0=0,s0=0,ciag=false;tor._ruch=0;
 tor.addEventListener('pointerdown',function(e){if(e.pointerType!=='mouse')return;ciag=true;tor._ruch=0;x0=e.clientX;s0=tor.scrollLeft;tor.classList.add('drag')});
 window.addEventListener('pointermove',function(e){if(!ciag)return;var dx=e.clientX-x0;tor._ruch=Math.max(tor._ruch,Math.abs(dx));tor.scrollLeft=s0-dx});
 window.addEventListener('pointerup',function(){if(!ciag)return;ciag=false;tor.classList.remove('drag')});
 tor.addEventListener('dragstart',function(e){e.preventDefault()});
 var s=tor.parentNode.querySelector('.strz');
 if(s)s.querySelectorAll('button').forEach(function(btn){btn.addEventListener('click',function(){var it=tor.querySelector('button');var st=it?it.getBoundingClientRect().width+18:300;tor.scrollBy({left:+btn.getAttribute('data-k')*st,behavior:'smooth'})})});
});
/* powiększanie zdjęć */
var lb=d.getElementById('lb');
if(lb){
 var lbi=lb.querySelector('img'),licz=lb.querySelector('.licz'),el=[].slice.call(d.querySelectorAll('[data-full]')),idx=0;
 function pokaz(i){idx=(i+el.length)%el.length;lbi.src=el[idx].getAttribute('data-full');lbi.alt=el[idx].querySelector('img').alt;licz.textContent=(idx+1)+' / '+el.length}
 el.forEach(function(it,i){it.addEventListener('click',function(e){var t=it.closest('.tor');if(t&&t._ruch>6){e.preventDefault();return}pokaz(i);lb.classList.add('on');d.body.style.overflow='hidden';lb.querySelector('.x').focus()})});
 window.lbZamknij=function(){if(!lb.classList.contains('on'))return;lb.classList.remove('on');d.body.style.overflow='';el[idx].focus()};
 lb.querySelector('.x').addEventListener('click',lbZamknij);
 lb.querySelector('.p').addEventListener('click',function(){pokaz(idx-1)});
 lb.querySelector('.n').addEventListener('click',function(){pokaz(idx+1)});
 lb.addEventListener('click',function(e){if(e.target===lb)lbZamknij()});
 var tx=0;lb.addEventListener('touchstart',function(e){tx=e.touches[0].clientX},{passive:true});
 lb.addEventListener('touchend',function(e){var dx=e.changedTouches[0].clientX-tx;if(Math.abs(dx)>50)pokaz(idx+(dx<0?1:-1))});
}
function lbZamknij(){if(window.lbZamknij)window.lbZamknij()}
/* formularz w podglądzie nie wysyła wiadomości */
var f=d.getElementById('form');
if(f)f.addEventListener('submit',function(e){e.preventDefault();d.getElementById('ok').style.display='block';d.getElementById('ok').focus()});
})();
