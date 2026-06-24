document.querySelector('[data-nav-toggle]')?.addEventListener('click',()=>{document.querySelector('[data-nav-links]')?.classList.toggle('open')});
const current=location.pathname.split('/').pop()||'index.html';
document.querySelectorAll('.nav-links a,.side-panel a').forEach(a=>{if(a.getAttribute('href')?.endsWith(current))a.classList.add('active')});
function protectArea(area){
  const sessionKey=`club_${area}_ok`;
  if(sessionStorage.getItem(sessionKey)==='1') return true;
  const passwords={socios:'socio2026',directiva:'directiva2026'};
  const pass=prompt(`Acceso ${area}. Contraseña demo:`);
  if(pass===passwords[area]){sessionStorage.setItem(sessionKey,'1');return true;}
  document.body.innerHTML=`<main class="lock"><section class="card login-card"><h1>Acceso no autorizado</h1><p>Esta protección es solo demostrativa. Para datos reales hay que implementar autenticación segura.</p><a class="btn btn-primary" href="../index.html">Volver al inicio</a></section></main>`;
  return false;
}
window.protectArea=protectArea;
