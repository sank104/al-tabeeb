const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const IDX=CC.idx;
CC.p.sort((a,b)=>a.n-b.n).forEach(p=>$('main').insertAdjacentHTML('beforeend',p.view+p.units));
let read={};try{read=JSON.parse(localStorage.getItem('cc_read')||'{}')}catch(e){}
function show(id){$$('.view').forEach(v=>v.hidden=v.id!==id);const v=$('#'+id);if(!v)return show('home');
 const p=v.classList.contains('unit')?v.querySelector('.back').dataset.p:(/^p\d+$/.test(id)?id.slice(1):'');
 $$('.pb').forEach(b=>b.classList.toggle('on',b.dataset.p===p));
 if(v.classList.contains('unit')){read[id]=1;try{localStorage.setItem('cc_read',JSON.stringify(read))}catch(e){}}
 $$('.card').forEach(c=>c.classList.toggle('read',!!read[c.dataset.u]));
 $('main').scrollTop=0;$('#sb').classList.remove('open');if(location.hash!=='#'+id)history.replaceState(null,'','#'+id)}
document.addEventListener('click',e=>{const t=e.target.closest('[data-p],[data-u]');if(!t||t.tagName==='A')return;
 if(t.dataset.u)show(t.dataset.u);else show('p'+t.dataset.p)});
$('#menu').onclick=()=>$('#sb').classList.toggle('open');
$('.brand').onclick=()=>show('home');
$('#q').oninput=e=>{const s=e.target.value.trim().toLowerCase();if(!s)return show('home');
 const r=IDX.filter(x=>(x[2]+' '+x[3]).toLowerCase().includes(s)).slice(0,60);
 $('#resg').innerHTML=r.map(x=>{const c=$('#p'+x[1]).style.getPropertyValue('--c');return `<div class="card" style="--c:${c}"><button class="open" data-u="${x[0]}"><b>${x[2]}</b><span>${x[3]}</span></button><a class="g" target="_blank" rel="noopener" href="https://www.google.com/search?q=${encodeURIComponent(x[3])}">G</a></div>`}).join('')||'<p class="lead">No matches.</p>';
 show('res')};
show((location.hash||'#home').slice(1));
