



fetch('Img/treelove.svg')
  .then(res => res.text())
  .then(svgText => {
    const container = document.getElementById('tree-container');
    container.innerHTML = svgText;
    const svg = container.querySelector('svg');
    if (!svg) return;

    
    const allPaths = Array.from(svg.querySelectorAll('path'));
    allPaths.forEach(path => {
      path.style.stroke = '#222';
      path.style.strokeWidth = '2.5';
      path.style.fillOpacity = '0';
      const length = path.getTotalLength();
      path.style.strokeDasharray = length;
      path.style.strokeDashoffset = length;
      path.style.transition = 'none';
    });

   
    setTimeout(() => {
      allPaths.forEach((path, i) => {
        path.style.transition = `stroke-dashoffset 1.2s cubic-bezier(.77,0,.18,1) ${i * 0.08}s, fill-opacity 0.5s ${0.9 + i * 0.08}s`;
        path.style.strokeDashoffset = 0;
        setTimeout(() => {
          path.style.fillOpacity = '1';
          path.style.stroke = '';
          path.style.strokeWidth = '';
        }, 1200 + i * 80);
      });

     
      const totalDuration = 1200 + (allPaths.length - 1) * 80 + 500;
      setTimeout(() => {
        svg.classList.add('move-and-scale');
        // Mostrar texto con efecto typing
        setTimeout(() => {
          showDedicationText();
          // Mostrar petalos flotando
          startFloatingObjects();
          // Mostrar cuenta regresiva
          showCountdown();
          // Iniciar música de fondo
          playBackgroundMusic();
        }, 1200); //Tiempo para agrandar el SVG
      }, totalDuration);
    }, 50);

   
    const heartPaths = allPaths.filter(el => {
      const style = el.getAttribute('style') || '';
      return style.includes('#FC6F58') || style.includes('#C1321F');
    });
    heartPaths.forEach(path => {
      path.classList.add('animated-heart');
    });
  });


function getURLParam(name) {
  const url = new URL(window.location.href);
  return url.searchParams.get(name);
}

function showDedicationText() { 
  let text = getURLParam('text');
  if (!text) {
    text = `Para mi chica:\n\nMomento cursi p. Desde el primer momento que te vi me pareciste muy linda pero no pense que me iba enamorar tanto de ti, me gustas en todos los sentidos, me siento muy en paz cuando estoy contigo y un poquito hormonal jajaj\n\nYa oficialmente 3 mesesitos juntos, ya pasamos la disque prueba de 3 meses que tanto hablan, ya puedo decir y sentir que seras el amor mas bonito o el dolor mas grande, pero para grande la de abajo, a pesar de tener 23 añitos y tu 21, estoy experimentando cosas nuevas y me enseñas cosas nuevas casi siempre, y eso me encanta, tu me encantas.\n\nLiteralmente cada dia contigo es una aventura, no se cuantas veces te lo he dicho, pero te lo seguire diciendo hasta que quede grabado en esa cabecita,te quiero muchisimooo. Feliz 3er mesario Mi Vida!`;  } else {
    text = decodeURIComponent(text).replace(/\\n/g, '\n');
  }
  const container = document.getElementById('dedication-text');
  container.classList.add('typing');
  let i = 0;
  function type() {
    if (i <= text.length) {
      container.textContent = text.slice(0, i);
      i++;
      setTimeout(type, text[i - 2] === '\n' ? 350 : 45);
    } else {
      
      setTimeout(showSignature, 600);
    }
  }
  type();
}


function showSignature() {
  
  const dedication = document.getElementById('dedication-text');
  let signature = dedication.querySelector('#signature');
  if (!signature) {
    signature = document.createElement('div');
    signature.id = 'signature';
    signature.className = 'signature';
    dedication.appendChild(signature);
  }
  let firma = getURLParam('firma');
  signature.textContent = firma ? decodeURIComponent(firma) : "Con amor, Fino";
  signature.classList.add('visible');
}




function startFloatingObjects() {
  const container = document.getElementById('floating-objects');
  let count = 0;
  function spawn() {
    let el = document.createElement('div');
    el.className = 'floating-petal';
    // Posición inicial
    el.style.left = `${Math.random() * 90 + 2}%`;
    el.style.top = `${100 + Math.random() * 10}%`;
    el.style.opacity = 0.7 + Math.random() * 0.3;
    container.appendChild(el);

    // Animación flotante
    const duration = 6000 + Math.random() * 4000;
    const drift = (Math.random() - 0.5) * 60;
    setTimeout(() => {
      el.style.transition = `transform ${duration}ms linear, opacity 1.2s`;
      el.style.transform = `translate(${drift}px, -110vh) scale(${0.8 + Math.random() * 0.6}) rotate(${Math.random() * 360}deg)`;
      el.style.opacity = 0.2;
    }, 30);

   
    setTimeout(() => {
      if (el.parentNode) el.parentNode.removeChild(el);
    }, duration + 2000);

   
    if (count++ < 32) setTimeout(spawn, 350 + Math.random() * 500);
    else setTimeout(spawn, 1200 + Math.random() * 1200);
  }
  spawn();
}


function showCountdown() {
  const container = document.getElementById('countdown');
  let startParam = getURLParam('start');
  let startDate = startParam ? new Date(startParam + 'T00:00:00') : new Date('2025-02-16T00:00:00');

  function update() {
    const now = new Date();
    let diff = now - startDate;
    let days = Math.floor(diff / (1000 * 60 * 60 * 24));

    // 🔄 Se mueven dentro para ser recalculadas en cada actualización
    let eventParam = getURLParam('event');
    let extraEventParam = getURLParam('extraevent');

    let eventDate = eventParam ? new Date(eventParam + 'T00:00:00') : new Date('2025-07-16T00:00:00');
    let extraEventDate = extraEventParam ? new Date(extraEventParam + 'T00:00:00') : new Date('2025-09-11T00:00:00');

    // Evento principal
    let eventDiff = eventDate - now;
    let eventDays = Math.max(0, Math.floor(eventDiff / (1000 * 60 * 60 * 24)));
    let eventHours = Math.max(0, Math.floor((eventDiff / (1000 * 60 * 60)) % 24));
    let eventMinutes = Math.max(0, Math.floor((eventDiff / (1000 * 60)) % 60));
    let eventSeconds = Math.max(0, Math.floor((eventDiff / 1000) % 60));

    // Evento extra
    let extraDiff = extraEventDate - now;
    let extraDays = Math.max(0, Math.floor(extraDiff / (1000 * 60 * 60 * 24)));
    let extraHours = Math.max(0, Math.floor((extraDiff / (1000 * 60 * 60)) % 24));
    let extraMinutes = Math.max(0, Math.floor((extraDiff / (1000 * 60)) % 60));
    let extraSeconds = Math.max(0, Math.floor((extraDiff / 1000) % 60));

    container.innerHTML =
      `Llevamos juntos: <b>${days}</b> días<br>` +
      `Próximo mesario: <b>${eventDays}d ${eventHours}h ${eventMinutes}m ${eventSeconds}s</b><br>` +
      `Kimetsu: <b>${extraDays}d ${extraHours}h ${extraMinutes}m ${extraSeconds}s</b>`;
    
    container.classList.add('visible');
  }

  update();
  setInterval(update, 1000);
}


function playBackgroundMusic() {
  const audio = document.getElementById('bg-music');
  if (!audio) return;
  let btn = document.getElementById('music-btn');
  if (!btn) {
    btn = document.createElement('button');
    btn.id = 'music-btn';
    btn.textContent = '🔊 Música';
    btn.style.position = 'fixed';
    btn.style.bottom = '18px';
    btn.style.right = '18px';
    btn.style.zIndex = 99;
    btn.style.background = 'rgba(255,255,255,0.85)';
    btn.style.border = 'none';
    btn.style.borderRadius = '24px';
    btn.style.padding = '10px 18px';
    btn.style.fontSize = '1.1em';
    btn.style.cursor = 'pointer';
    document.body.appendChild(btn);
  }
  audio.volume = 0.7;
  audio.loop = true;
 
  audio.play().then(() => {
    btn.textContent = '🔊 Música';
  }).catch(() => {
    
    btn.textContent = '▶️ Música';
  });
  btn.onclick = () => {
    if (audio.paused) {
      audio.play();
      btn.textContent = '🔊 Música';
    } else {
      audio.pause();
      btn.textContent = '🔈 Música';
    }
  };
}


window.addEventListener('DOMContentLoaded', () => {
  playBackgroundMusic();
});
