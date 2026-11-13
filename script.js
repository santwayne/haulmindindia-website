const toggle=document.querySelector('.menu-toggle');
const links=document.querySelector('.nav-links');
toggle?.addEventListener('click',()=>{links.classList.toggle('open');toggle.textContent=links.classList.contains('open')?'×':'☰'});
links?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{links.classList.remove('open');toggle.textContent='☰'}));
// Subtle pointer-driven 3D tilt for capability cards on fine-pointer devices.
if(window.matchMedia('(pointer:fine)').matches){document.querySelectorAll('.flow-card,.role-card').forEach(card=>{card.addEventListener('pointermove',e=>{const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;card.style.transform=`perspective(900px) rotateY(${x*5}deg) rotateX(${-y*4}deg) translateY(-5px)`});card.addEventListener('pointerleave',()=>card.style.transform='')})}
