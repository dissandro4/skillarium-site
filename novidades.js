// 21/nov/2026 — "Novo no app" interativo: Berçário (profissão → constelação de skills testadas), Arsenal e Top 40.
// Dados reais de site/novidades-dados.js (gerado dos arquivos do app). Sem dependências; respeita "Reduzir movimento".
(function () {
  const D = window.SKILLARIUM_NOVIDADES, raiz = document.getElementById('novo-vivo');
  if (!D || !raiz) return;
  const parado = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const L = () => (document.documentElement.lang || '').toLowerCase().startsWith('en') ? 'en' : 'pt';
  const X = (pt, en) => (L() === 'en' ? en : pt);
  const el = (tag, cls, txt) => { const e = document.createElement(tag); if (cls) e.className = cls; if (txt != null) e.textContent = txt; return e; };
  const norm = (s) => String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  let aba = 'bercario', prof = D.bercario[0], tipoArs = 'prompts', topSel = 0, timers = [];
  const limpar = () => { timers.forEach(clearTimeout); timers = []; };

  const css = el('style');
  css.textContent = `
.nv{border:1px solid var(--line);border-radius:20px;background:var(--panel);padding:clamp(14px,3vw,26px);display:grid;gap:16px;margin-top:8px}
.nv-abas,.nv-chips{display:flex;flex-wrap:wrap;gap:8px}
.nv-abas button,.nv-chips button{font:600 .88rem var(--body);color:var(--fg);background:transparent;border:1px solid var(--line);border-radius:999px;padding:9px 15px;min-height:42px;cursor:pointer}
.nv-chips button{font-weight:500;padding:7px 13px;min-height:38px}
.nv-abas button[aria-selected=true],.nv-chips button[aria-pressed=true]{background:var(--accent);color:var(--on-accent);border-color:var(--accent)}
.nv-busca{width:100%;min-height:46px;border-radius:12px;border:1px solid var(--line);background:var(--bg);color:var(--fg);font:inherit;padding:10px 14px}
.nv-busca:focus{outline:2px solid var(--accent);outline-offset:1px}
.nv-ceu{position:relative;border-radius:16px;background:radial-gradient(120% 90% at 50% 0%,rgba(219,194,147,.16),transparent 70%),radial-gradient(60% 60% at 80% 100%,rgba(90,120,160,.18),transparent 70%),#0b1824;overflow:hidden;min-height:clamp(300px,46vw,420px)}
.nv-ceu svg{display:block;width:100%;height:100%;position:absolute;inset:0}
.nv-ceu .lin{stroke:#e6d6aa;stroke-opacity:.45;stroke-width:.9;fill:none;stroke-dasharray:var(--c,400);stroke-dashoffset:var(--c,400);transition:stroke-dashoffset .9s ease}
.nv-ceu .lin.on{stroke-dashoffset:0}
.nv-ceu .est{fill:#f0e2be;opacity:0;transform-box:fill-box;transform-origin:center;transform:scale(.2);transition:opacity .5s ease,transform .6s cubic-bezier(.2,.8,.2,1.3)}
.nv-ceu .est.on{opacity:1;transform:scale(1)}
.nv-ceu .nome{fill:#f3ead7;font:500 12.5px var(--body);opacity:0;transition:opacity .6s ease .2s;paint-order:stroke;stroke:rgba(0,0,0,.55);stroke-width:3px}
.nv-ceu .nome.on{opacity:.92}
.nv-ceu .titulo{position:absolute;left:16px;top:12px;right:16px;color:#f3ead7;font:400 clamp(20px,3vw,28px)/1.15 var(--display)}
.nv-ceu .titulo small{display:block;font:500 12px var(--mono);letter-spacing:.16em;text-transform:uppercase;color:#dbc293;margin-top:6px}
.nv-ceu .poeira{fill:#fff;opacity:.35}
.nv-lista{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:10px}
.nv-card{border:1px solid var(--line);border-radius:14px;padding:12px 14px;background:var(--bg);display:grid;gap:4px}
.nv-card b{font:400 1.15rem var(--display)}.nv-card span{color:var(--muted);font-size:.9rem;line-height:1.45}
.nv-cmd{display:flex;flex-wrap:wrap;gap:8px;align-items:center;border:1px dashed color-mix(in srgb,var(--accent) 60%,var(--line));border-radius:14px;padding:10px 12px}
.nv-cmd code{font:500 .92rem var(--mono);color:var(--fg)}
.nv-cmd button{margin-left:auto;font:600 .85rem var(--body);border:0;border-radius:999px;background:var(--accent);color:var(--on-accent);padding:8px 14px;min-height:38px;cursor:pointer}
.nv-podio{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;align-items:end}
.nv-podio button{border:1px solid var(--line);border-radius:16px;background:var(--bg);color:var(--fg);padding:14px 10px;cursor:pointer;display:grid;gap:6px;justify-items:center;text-align:center;font:inherit}
.nv-podio button[aria-pressed=true]{border-color:var(--accent);box-shadow:0 0 0 3px color-mix(in srgb,var(--accent) 25%,transparent)}
.nv-podio .selo{width:46px;height:46px;border-radius:50%;display:grid;place-items:center;font:700 1.05rem var(--mono);color:var(--on-accent);background:var(--accent)}
.nv-podio .p1{min-height:150px}.nv-podio .p2{min-height:126px}.nv-podio .p3{min-height:112px}
.nv-podio b{font:400 1.02rem/1.2 var(--display)}
.nv-resto{display:flex;flex-wrap:wrap;gap:6px;max-height:170px;overflow:auto;padding:2px}
.nv-resto button{font:500 .8rem var(--body);color:var(--muted);background:transparent;border:1px solid var(--line);border-radius:999px;padding:6px 10px;min-height:34px;cursor:pointer}
.nv-resto button[aria-pressed=true]{color:var(--fg);border-color:var(--accent)}
.nv-frase{margin:0;min-height:1.6em;font-size:1rem}
.nv-nota{margin:0;color:var(--muted);font-size:.85rem}
@media (max-width:520px){.nv-ceu .nome{font-size:10.5px}.nv-podio b{font-size:.9rem}}
@media (prefers-reduced-motion:reduce){.nv-ceu .lin,.nv-ceu .est,.nv-ceu .nome{transition:none}}`;
  document.head.appendChild(css);

  const caixa = el('div', 'nv');
  const abas = el('div', 'nv-abas'); abas.setAttribute('role', 'tablist');
  const corpo = el('div');
  caixa.append(abas, corpo);
  raiz.replaceChildren(caixa);

  function desenharAbas() {
    abas.replaceChildren(...[['bercario', 'Berçário de Skills', 'Skill Nursery'], ['arsenal', 'Nebulosa', 'Nebula'], ['top', 'Top 40', 'Top 40']].map(([k, pt, en]) => {
      const b = el('button', null, X(pt, en)); b.type = 'button'; b.setAttribute('role', 'tab');
      b.setAttribute('aria-selected', String(aba === k)); b.onclick = () => { aba = k; render(); };
      return b;
    }));
  }

  // ---------- Berçário: a profissão vira uma constelação de skills testadas ----------
  const SVGNS = 'http://www.w3.org/2000/svg';
  const sv = (tag, at) => { const e = document.createElementNS(SVGNS, tag); for (const k in at) e.setAttribute(k, at[k]); return e; };
  const estrela = (x, y, r) => `M${x} ${y - r}Q${x + r * .18} ${y - r * .18} ${x + r} ${y}Q${x + r * .18} ${y + r * .18} ${x} ${y + r}Q${x - r * .18} ${y + r * .18} ${x - r} ${y}Q${x - r * .18} ${y - r * .18} ${x} ${y - r}Z`;
  function semente(txt) { let h = 2166136261; for (const c of txt) h = Math.imul(h ^ c.charCodeAt(0), 16777619); return () => ((h = Math.imul(h ^ (h >>> 13), 1274126177)) >>> 0) / 4294967296; }

  function bercario() {
    const wrap = el('div'); wrap.style.cssText = 'display:grid;gap:12px';
    const busca = el('input', 'nv-busca'); busca.type = 'search'; busca.autocomplete = 'off';
    busca.placeholder = X(`Digite a sua profissão (${D.profissoes} na lista)`, `Type your profession (${D.profissoes} on the list)`);
    busca.setAttribute('aria-label', X('Sua profissão', 'Your profession'));
    const chips = el('div', 'nv-chips');
    const ceu = el('div', 'nv-ceu'); ceu.setAttribute('aria-live', 'polite');
    const nota = el('p', 'nv-nota');
    const nomeP = (p) => (L() === 'en' ? p.en : p.pt);
    function mostrarChips(lista) {
      chips.replaceChildren(...lista.slice(0, innerWidth < 600 ? 6 : 8).map((p) => {
        const b = el('button', null, `${nomeP(p)} · ${p.n}`); b.type = 'button'; b.setAttribute('aria-pressed', String(p === prof));
        b.onclick = () => { prof = p; mostrarChips(lista); desenhar(); }; return b;
      }));
    }
    busca.oninput = () => {
      const q = norm(busca.value.trim());
      // acha também pelo começo da palavra: "contador" encontra "Contabilidade", "advogado" encontra "Advocacia"
      const raiz5 = q.slice(0, Math.max(4, Math.min(5, q.length)));
      const casa = (p) => [p.pt, p.en].some((n) => norm(n).includes(q)) || norm(nomeP(p)).split(/[^a-z0-9]+/).some((w) => w.startsWith(raiz5));
      const achou = q ? D.bercario.filter(casa) : D.bercario;
      if (q && !achou.length) { chips.replaceChildren(el('span', 'nv-nota', X('Ainda não há skill testada para essa profissão. O Farejador está procurando.', 'No tested skill for that profession yet. The Scout is looking.'))); return; }
      if (achou[0] !== prof && q) { prof = achou[0]; desenhar(); }
      mostrarChips(achou);
    };
    function desenhar() {
      limpar();
      const W = 800, H = 420, rnd = semente(prof.pt);
      const svg = sv('svg', { viewBox: `0 0 ${W} ${H}`, preserveAspectRatio: 'xMidYMid slice', role: 'img', 'aria-label': X(`Constelação de ${prof.pt}: ${prof.s.join(', ')}`, `${prof.en} constellation: ${prof.s.join(', ')}`) });
      for (let i = 0; i < 70; i++) svg.appendChild(sv('circle', { class: 'poeira', cx: rnd() * W, cy: rnd() * H, r: rnd() * 1.1 + .2 }));
      // pontos espalhados em volta de um centro, sem se encostar
      const n = prof.s.length, pts = [];
      for (let i = 0; i < n; i++) {
        let p, tent = 0;
        do { const ang = (i / n) * Math.PI * 2 + rnd() * .8, raio = 95 + rnd() * 120; p = [W / 2 + Math.cos(ang) * raio * 1.55, H * .56 + Math.sin(ang) * raio * .62]; tent++; }
        while (tent < 30 && pts.some((q) => Math.hypot(q[0] - p[0], q[1] - p[1]) < 120));
        pts.push(p);
      }
      const ordem = pts.map((p, i) => i).sort((a, b) => Math.atan2(pts[a][1] - H * .56, pts[a][0] - W / 2) - Math.atan2(pts[b][1] - H * .56, pts[b][0] - W / 2));
      const linhas = [], estrelas = [], nomes = [];
      for (let k = 0; k < ordem.length - 1; k++) {
        const a = pts[ordem[k]], b = pts[ordem[k + 1]], c = Math.hypot(b[0] - a[0], b[1] - a[1]);
        const l = sv('path', { class: 'lin', d: `M${a[0]} ${a[1]}L${b[0]} ${b[1]}`, style: `--c:${c}` }); svg.appendChild(l); linhas.push(l);
      }
      ordem.forEach((i, k) => {
        const [x, y] = pts[i], r = k === 0 ? 11 : 7 + rnd() * 2.5;
        const s = sv('path', { class: 'est', d: estrela(x, y, r) }); svg.appendChild(s); estrelas.push(s);
        const t = sv('text', { class: 'nome', x, y: y + r + 15, 'text-anchor': x > W * .8 ? 'end' : x < W * .2 ? 'start' : 'middle' });
        const txt = prof.s[i]; t.textContent = txt.length > 34 ? txt.slice(0, 32) + '…' : txt; svg.appendChild(t); nomes.push(t);
      });
      const tit = el('div', 'titulo', nomeP(prof));
      tit.appendChild(el('small', null, X(`${prof.n} skills testadas · mostrando ${n}`, `${prof.n} tested skills · showing ${n}`)));
      ceu.replaceChildren(svg, tit);
      const acender = (k) => { estrelas[k] && estrelas[k].classList.add('on'); nomes[k] && nomes[k].classList.add('on'); if (k > 0 && linhas[k - 1]) linhas[k - 1].classList.add('on'); };
      if (parado) estrelas.forEach((_, k) => acender(k));
      else estrelas.forEach((_, k) => timers.push(setTimeout(() => acender(k), 250 + k * 380)));
      nota.textContent = X('No app, o Berçário mostra a equipe inteira buscando, provando e entregando. Toque nos robôs, no código e nas estrelas.', 'In the app, the Nursery shows the whole team finding, proving and delivering. Tap the robots, the code and the stars.');
    }
    mostrarChips(D.bercario); desenhar();
    wrap.append(busca, chips, ceu, nota);
    return wrap;
  }

  // ---------- Arsenal ----------
  function arsenal() {
    const A = D.arsenal, wrap = el('div'); wrap.style.cssText = 'display:grid;gap:12px';
    const tipos = [['skills', 'Skills', 'Skills'], ['prompts', 'Prompts', 'Prompts'], ['comandos', 'Comandos', 'Commands'], ['conectores', 'Conectores', 'Connectors'], ['repositorios', 'Repositórios', 'Repositories']];
    const chips = el('div', 'nv-chips'), lista = el('div', 'nv-lista');
    const qtd = (k) => (k === 'skills' ? A.skills : A[k].length);
    function mostrar() {
      chips.replaceChildren(...tipos.map(([k, pt, en]) => { const b = el('button', null, `${X(pt, en)} · ${qtd(k)}`); b.type = 'button'; b.setAttribute('aria-pressed', String(k === tipoArs)); b.onclick = () => { tipoArs = k; mostrar(); }; return b; }));
      let itens;
      if (tipoArs === 'skills') itens = [{ n: X(`${A.skills} skills testadas`, `${A.skills} tested skills`), d: X('Cada uma passou por licença, segurança e um teste de verdade. Copie e cole na sua IA.', 'Each passed licence, safety and a real test. Copy and paste into your AI.') }];
      else if (!A[tipoArs].length) itens = [{ n: X('Em teste', 'In testing'), d: X('O Farejador já trouxe candidatos; só entram quando o Alquimista aprovar.', 'The Scout has found candidates; they only get in once the Alchemist approves.') }];
      else itens = A[tipoArs].map((x) => ({ n: L() === 'en' ? x.ne : x.n, d: L() === 'en' ? x.de : x.d }));
      lista.replaceChildren(...itens.map((x) => { const c = el('div', 'nv-card'); c.append(el('b', null, x.n), el('span', null, x.d)); return c; }));
    }
    const cmd = el('div', 'nv-cmd'), frase = X('Skillarium, me dê o pacote Founder OS.', 'Skillarium, give me the Founder OS pack.');
    const bt = el('button', null, X('Copiar', 'Copy')); bt.type = 'button';
    bt.onclick = async () => { try { await navigator.clipboard.writeText(frase); bt.textContent = X('Copiado ✓', 'Copied ✓'); } catch (_) { bt.textContent = X('Selecione e copie', 'Select and copy'); } setTimeout(() => (bt.textContent = X('Copiar', 'Copy')), 1800); };
    cmd.append(el('span', 'nv-nota', X('Um pacote inteiro numa frase (com o MCP):', 'A whole pack in one sentence (with MCP):')), el('code', null, frase), bt);
    mostrar();
    wrap.append(chips, lista, cmd);
    return wrap;
  }

  // ---------- Top 40 ----------
  function top40() {
    const T = D.top40, wrap = el('div'); wrap.style.cssText = 'display:grid;gap:14px';
    const podio = el('div', 'nv-podio'), resto = el('div', 'nv-resto'), frase = el('p', 'nv-frase'); frase.setAttribute('aria-live', 'polite');
    function mostrar() {
      const ordem = [1, 0, 2];
      podio.replaceChildren(...ordem.map((i) => { const b = el('button', 'p' + (i + 1)); b.type = 'button'; b.setAttribute('aria-pressed', String(topSel === i)); b.append(el('span', 'selo', String(i + 1)), el('b', null, T[i].t)); b.onclick = () => { topSel = i; mostrar(); }; return b; }));
      resto.replaceChildren(...T.slice(3).map((s, k) => { const b = el('button', null, `${k + 4} · ${s.t}`); b.type = 'button'; b.setAttribute('aria-pressed', String(topSel === k + 3)); b.onclick = () => { topSel = k + 3; mostrar(); }; return b; }));
      frase.textContent = `${topSel + 1}º · ${T[topSel].t}: ${T[topSel].d}`;
    }
    mostrar();
    wrap.append(podio, frase, el('p', 'nv-nota', X('Toque numa skill para ver para que serve. No app, cada uma tem o botão Copiar.', 'Tap a skill to see what it does. In the app, each has a Copy button.')), resto);
    return wrap;
  }

  function render() {
    limpar(); desenharAbas();
    corpo.replaceChildren(aba === 'bercario' ? bercario() : aba === 'arsenal' ? arsenal() : top40());
  }
  render();
  new MutationObserver(render).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
})();
