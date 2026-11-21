// 21/nov/2026 — O Caçador (Órion): transição mágica do universo Skillarium. Pedido do dono:
// tudo se apaga → as estrelas de Órion surgem → as linhas desenham o Caçador → o cinturão (Alnitak, Alnilam, Mintaka) brilha →
// tudo vira uma luz só → pisca e some → aparece o conteúdo. ~1,9 s; um toque pula; "Reduzir movimento" pula sempre.
// Uso: SkillariumOrion.revelar(() => abrirAlgo(), 'A caça de hoje')   (o texto é opcional)
const SkillariumOrion = (function () {
  const NS = 'http://www.w3.org/2000/svg';
  // Posições aproximadas de Órion como se vê no céu (x, y de 0 a 100), nome e brilho (raio).
  const E = { meissa: [50, 9, 2.2], betelgeuse: [31, 21, 4.2], bellatrix: [67, 25, 3.2], mintaka: [58, 51, 2.8], alnilam: [50, 54, 3.1], alnitak: [42, 57, 2.9], saiph: [37, 88, 2.8], rigel: [71, 84, 4.4] };
  const LINHAS = [['meissa', 'betelgeuse'], ['meissa', 'bellatrix'], ['betelgeuse', 'alnitak'], ['bellatrix', 'mintaka'], ['alnitak', 'alnilam'], ['alnilam', 'mintaka'], ['alnitak', 'saiph'], ['mintaka', 'rigel']];
  const ORDEM = ['alnilam', 'alnitak', 'mintaka', 'betelgeuse', 'rigel', 'bellatrix', 'saiph', 'meissa'];   // o cinturão acende primeiro
  let css = false;
  function estilos() {
    if (css) return; css = true;
    const s = document.createElement('style');
    s.textContent = `
.orion{position:fixed;inset:0;z-index:2147483000;display:grid;place-items:center;background:radial-gradient(70% 60% at 50% 45%,#0d2030 0%,#050b12 70%);opacity:0;transition:opacity .22s ease;cursor:pointer}
.orion.on{opacity:1}.orion.sai{opacity:0;transition:opacity .35s ease}
.orion svg{width:min(78vmin,560px);height:auto;overflow:visible}
.orion .o-est{fill:#f4e7c3;opacity:0;transform-box:fill-box;transform-origin:center;transform:scale(.1);transition:opacity .25s ease,transform .45s cubic-bezier(.2,.9,.25,1.4)}
.orion .o-est.on{opacity:1;transform:scale(1)}
.orion .o-lin{stroke:#e6d3a3;stroke-opacity:.55;stroke-width:.45;fill:none;stroke-dasharray:var(--c);stroke-dashoffset:var(--c);transition:stroke-dashoffset .38s ease}
.orion .o-lin.on{stroke-dashoffset:0}
.orion .o-cinto{fill:none;stroke:#ffe9b0;stroke-width:.6;opacity:0;transition:opacity .3s ease}
.orion .o-cinto.on{opacity:.9}
.orion .o-luz{fill:#fff6dc;opacity:0;transform-box:fill-box;transform-origin:center;transform:scale(.2)}
.orion .o-luz.on{animation:o-luz .5s ease forwards}
@keyframes o-luz{0%{opacity:0;transform:scale(.2)}45%{opacity:1;transform:scale(2.6)}100%{opacity:0;transform:scale(5)}}
.orion .o-tudo{transform-origin:50% 54%;transition:transform .32s cubic-bezier(.6,0,.4,1),opacity .32s ease}
.orion .o-tudo.junta{transform:scale(.02);opacity:.2}
.orion .o-txt{position:absolute;bottom:12vh;left:0;right:0;text-align:center;color:#dbc293;font:500 12px ui-monospace,Menlo,monospace;letter-spacing:.32em;text-transform:uppercase;opacity:0;transition:opacity .3s ease}
.orion .o-txt.on{opacity:.9}`;
    document.head.appendChild(s);
  }
  const mk = (tag, at) => { const e = document.createElementNS(NS, tag); for (const k in at) e.setAttribute(k, at[k]); return e; };
  const estrela4 = (x, y, r) => `M${x} ${y - r}Q${x + r * .16} ${y - r * .16} ${x + r} ${y}Q${x + r * .16} ${y + r * .16} ${x} ${y + r}Q${x - r * .16} ${y + r * .16} ${x - r} ${y}Q${x - r * .16} ${y - r * .16} ${x} ${y - r}Z`;
  function revelar(depois, texto) {
    const fim = () => { try { if (typeof depois === 'function') depois(); } catch (e) { console.error(e); } };
    if (matchMedia('(prefers-reduced-motion: reduce)').matches || document.querySelector('.orion')) { fim(); return; }
    estilos();
    const capa = document.createElement('div'); capa.className = 'orion'; capa.setAttribute('role', 'presentation');
    const svg = mk('svg', { viewBox: '0 0 100 100', 'aria-hidden': 'true' }), tudo = mk('g', { class: 'o-tudo' });
    const linhas = LINHAS.map(([a, b]) => { const [x1, y1] = E[a], [x2, y2] = E[b], c = Math.hypot(x2 - x1, y2 - y1).toFixed(1);
      const l = mk('path', { class: 'o-lin', d: `M${x1} ${y1}L${x2} ${y2}`, style: `--c:${c}` }); tudo.append(l); return l; });
    const cinto = mk('ellipse', { class: 'o-cinto', cx: 50, cy: 54, rx: 13, ry: 5.5, transform: 'rotate(-17 50 54)' }); tudo.append(cinto);
    const est = {}; for (const k in E) { const [x, y, r] = E[k]; est[k] = mk('path', { class: 'o-est', d: estrela4(x, y, r) }); tudo.append(est[k]); }
    const luz = mk('circle', { class: 'o-luz', cx: 50, cy: 54, r: 3 });
    svg.append(tudo, luz); capa.append(svg);
    const t = document.createElement('div'); t.className = 'o-txt'; t.textContent = texto || ''; capa.append(t);
    document.body.append(capa);
    const timers = []; let acabou = false;
    const em = (ms, f) => timers.push(setTimeout(f, ms));
    const encerrar = () => { if (acabou) return; acabou = true; timers.forEach(clearTimeout); fim(); capa.classList.add('sai'); setTimeout(() => capa.remove(), 380); };
    capa.addEventListener('click', encerrar); addEventListener('keydown', function esc(e) { if (e.key === 'Escape') { removeEventListener('keydown', esc); encerrar(); } });
    requestAnimationFrame(() => capa.classList.add('on'));                                // 1. tudo se apaga
    ORDEM.forEach((k, i) => em(180 + i * 70, () => est[k].classList.add('on')));          // 2. as estrelas surgem (cinturão primeiro)
    linhas.forEach((l, i) => em(620 + i * 55, () => l.classList.add('on')));             // 3. as linhas desenham o Caçador
    em(1080, () => { cinto.classList.add('on'); if (texto) t.classList.add('on'); });     // 4. o cinturão brilha
    em(1380, () => tudo.classList.add('junta'));                                          // 5. tudo vira uma luz só
    em(1560, () => luz.classList.add('on'));                                              // 6. pisca
    em(1900, encerrar);                                                                   // 7. some e mostra o conteúdo
  }
  return { revelar };
})();
if (typeof window !== 'undefined') window.SkillariumOrion = SkillariumOrion;
