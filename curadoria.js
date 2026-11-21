// 21/nov/2026 — Curadoria: o funil verdadeiro, da varredura até a skill testada. Números de site/novidades-dados.js
// (gerados dos arquivos do projeto). Toque em cada etapa para ver o que ela corta. Respeita "Reduzir movimento".
document.addEventListener('DOMContentLoaded', function () {
  const N = window.SKILLARIUM_NOVIDADES, raiz = document.getElementById('curadoria-vivo');
  if (!N || !N.curadoria || !raiz) return;
  const C = N.curadoria, V = C.varredura;
  const parado = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const L = () => ((document.documentElement.lang || '').toLowerCase().startsWith('en') ? 'en' : 'pt');
  const X = (pt, en) => (L() === 'en' ? en : pt);
  const fmt = (n) => n.toLocaleString(L() === 'en' ? 'en-GB' : 'pt-BR');
  const dataBR = V.data.split('-').reverse().join('/');
  const ETAPAS = () => [
    { n: V.skillsNoDiretorio, t: X('na caça do dia', 'in the daily hunt'), caca: true, d: X(`O Caçador percorre as skills públicas do maior diretório aberto (${V.diretorio}), na varredura de ${dataBR}. É o ponto de partida, não o que entregamos.`, `The Hunter goes through the public skills of the largest open directory (${V.diretorio}), scanned on ${dataBR}. The starting point, not what we deliver.`) },
    { n: V.skillsEncontradas, t: X('ligadas ao seu trabalho', 'relevant to your work'), d: X(`${V.buscas} buscas, uma por profissão e por tema (vendas, finanças, vídeo, contratos…). Ficam ${fmt(V.skillsEncontradas)} skills em ${fmt(V.repositoriosEncontrados)} projetos.`, `${V.buscas} searches, one per profession and topic (sales, finance, video, contracts…). That leaves ${fmt(V.skillsEncontradas)} skills in ${fmt(V.repositoriosEncontrados)} projects.`) },
    { n: V.skillsBoas, t: X('com licença limpa e projeto vivo', 'with a clean licence and an active project'), d: X(`Cortamos ${fmt(V.cortes.semLicenca)} projetos sem licença (não podem ser copiados), ${fmt(V.cortes.parados)} parados há mais de 6 meses, ${fmt(V.cortes.licencaNaoAceita)} com licença que não permite e ${fmt(V.cortes.arquivados)} arquivados.`, `We cut ${fmt(V.cortes.semLicenca)} projects with no licence (cannot be copied), ${fmt(V.cortes.parados)} idle for over 6 months, ${fmt(V.cortes.licencaNaoAceita)} with a licence that does not allow it and ${fmt(V.cortes.arquivados)} archived.`) },
    { n: C.reserva, t: X('em quarentena, esperando teste', 'in quarantine, awaiting test'), d: X('Passaram na triagem de segurança e utilidade: sem frase escondida que manda na IA, sem comando arriscado, sem código vazio, sem cópia repetida, úteis a quem não programa.', 'Passed the safety and usefulness screen: no hidden instructions to the AI, no risky commands, no empty code, no duplicates, useful to non-programmers.') },
    { n: C.aprovadas, t: X('testadas e aprovadas', 'tested and approved'), d: X(`Cada uma é traduzida (PT e EN), recebe 3 critérios antes do teste e é usada numa tarefa real. Das ${fmt(C.testadas)} testadas até hoje, ${fmt(C.reprovadas)} foram reprovadas. Só as aprovadas chegam a você, com categoria, selo e data do teste.`, `Each is translated (PT and EN), gets 3 criteria before the test and is used on a real task. Of ${fmt(C.testadas)} tested so far, ${fmt(C.reprovadas)} were rejected. Only approved ones reach you, with category, seal and test date.`) },
  ];
  const PORTAS = () => [
    [X('Segura', 'Safe'), X('Sem instrução escondida, sem comando que apague ou instale nada.', 'No hidden instructions, no command that deletes or installs anything.')],
    [X('Licenciada', 'Licensed'), X('Só entra o que a licença permite copiar, com crédito ao autor.', 'Only what the licence allows us to copy, with credit to the author.')],
    [X('Útil', 'Useful'), X('Serve a uma profissão de verdade e a quem não programa.', 'Serves a real profession and people who do not code.')],
    [X('Funciona', 'Works'), X('Testada numa tarefa real, com 3 critérios escritos antes.', 'Tested on a real task, with 3 criteria written beforehand.')],
    [X('Classificada', 'Classified'), X('Categoria, profissão, selo de qualidade e data do teste.', 'Category, profession, quality seal and test date.')],
    [X('Supervisionada', 'Supervised'), X('O Merlin, nosso supervisor, confere à noite uma amostra do que foi aprovado e avisa o curador se algo estiver errado. Ele não aprova nada sozinho.', 'Merlin, our supervisor, checks a sample of the approvals every night and alerts the curator if anything is wrong. He never approves anything on his own.')],
  ];
  const css = document.createElement('style');
  css.textContent = `
.cu{display:grid;gap:18px}
.cu-funil{display:grid;gap:8px}
.cu-etapa{display:grid;grid-template-columns:minmax(0,1fr);gap:4px;text-align:left;border:0;background:none;color:inherit;font:inherit;cursor:pointer;padding:6px 0}
.cu-barra{height:clamp(46px,7vw,64px);border-radius:14px;display:flex;align-items:center;gap:14px;padding:0 18px;min-width:max-content;background:linear-gradient(90deg,color-mix(in srgb,var(--accent) 34%,transparent),color-mix(in srgb,var(--accent) 12%,transparent));border:1px solid color-mix(in srgb,var(--accent) 45%,var(--line));transition:width .9s cubic-bezier(.2,.8,.2,1),box-shadow .2s}
.cu-etapa[aria-pressed=true] .cu-barra{box-shadow:0 0 0 3px color-mix(in srgb,var(--accent) 35%,transparent)}
.cu-num{font:400 clamp(28px,5vw,46px)/1 var(--display);color:var(--fg);font-variant-numeric:tabular-nums}
.cu-rot{font-size:clamp(13px,1.6vw,15px);color:var(--muted)}
.cu-detalhe{margin:0;min-height:4.6em;font-size:1.02rem;line-height:1.55;padding:14px 16px;border-left:3px solid var(--accent);background:var(--panel);border-radius:0 12px 12px 0}
.cu-portas{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:10px}
.cu-porta{border:1px solid var(--line);border-radius:14px;padding:12px 14px;background:var(--panel);text-align:left;color:inherit;font:inherit;cursor:pointer;display:grid;gap:4px}
.cu-porta b{font:400 1.2rem var(--display)}.cu-porta span{font-size:.86rem;color:var(--muted);line-height:1.4}
.cu-porta[aria-pressed=true]{border-color:var(--accent)}
.cu-ritmo{display:flex;flex-wrap:wrap;align-items:baseline;gap:10px;padding:16px 18px;border-radius:16px;border:1px solid color-mix(in srgb,var(--accent) 50%,var(--line))}
.cu-ritmo b{font:400 clamp(34px,6vw,54px)/1 var(--display);color:var(--accent)}
@media (max-width:560px){.cu-barra{min-width:0;padding:0 12px}.cu-rot{font-size:12px}}
@media (prefers-reduced-motion:reduce){.cu-barra{transition:none}}`;
  document.head.appendChild(css);
  let sel = 0, portaSel = -1, contou = false;
  function render() {
    const E = ETAPAS(), max = Math.log10(E[0].n);
    const box = document.createElement('div'); box.className = 'cu';
    const funil = document.createElement('div'); funil.className = 'cu-funil'; funil.setAttribute('role', 'group'); funil.setAttribute('aria-label', X('Funil da curadoria', 'Curation funnel'));
    E.forEach((e, i) => {
      const b = document.createElement('button'); b.type = 'button'; b.className = 'cu-etapa'; b.setAttribute('aria-pressed', String(i === sel));
      const barra = document.createElement('div'); barra.className = 'cu-barra';
      const w = Math.max(34, Math.round((Math.log10(Math.max(10, e.n)) / max) * 100));   // escala logarítmica: 273 ainda aparece ao lado de 1,5 milhão
      barra.style.width = contou || parado ? w + '%' : '34%'; barra.dataset.w = w;
      const num = document.createElement('span'); num.className = 'cu-num'; num.textContent = contou || parado ? fmt(e.n) : '0'; num.dataset.n = e.n;
      const rot = document.createElement('span'); rot.className = 'cu-rot'; rot.textContent = e.t;
      barra.append(num, rot); b.append(barra); b.onclick = () => { sel = i; if (e.caca && window.SkillariumOrion) SkillariumOrion.revelar(render, X('A caça de hoje', "Today's hunt")); else render(); }; funil.append(b);
    });
    const det = document.createElement('p'); det.className = 'cu-detalhe'; det.setAttribute('aria-live', 'polite'); det.textContent = E[sel].d;
    const portas = document.createElement('div'); portas.className = 'cu-portas';
    PORTAS().forEach(([t, d], i) => { const p = document.createElement('button'); p.type = 'button'; p.className = 'cu-porta'; p.setAttribute('aria-pressed', String(i === portaSel));
      const bt = document.createElement('b'); bt.textContent = t; const sp = document.createElement('span'); sp.textContent = d; p.append(bt, sp);
      p.onclick = () => { portaSel = i; render(); }; portas.append(p); });
    const ritmo = document.createElement('div'); ritmo.className = 'cu-ritmo';
    const rb = document.createElement('b'); rb.textContent = String(C.porSemana); const rs = document.createElement('span');
    rs.textContent = X('skills novas por semana depois da estreia, saídas da quarentena e testadas, sem pagar de novo.', 'new skills a week after launch, out of quarantine and tested, at no extra cost.');
    ritmo.append(rb, rs);
    box.append(funil, det, portas, ritmo); raiz.replaceChildren(box);
  }
  function contar() {   // anima uma vez, quando a seção aparece
    if (contou || parado) return; contou = true;
    const nums = raiz.querySelectorAll('.cu-num'), barras = raiz.querySelectorAll('.cu-barra'), t0 = performance.now(), dur = 1400;
    barras.forEach((b) => { b.style.width = b.dataset.w + '%'; });
    const passo = (t) => { const k = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - k, 3);
      nums.forEach((n) => { n.textContent = fmt(Math.round(+n.dataset.n * e)); }); if (k < 1) requestAnimationFrame(passo); };
    requestAnimationFrame(passo);
  }
  render();
  if ('IntersectionObserver' in window && !parado) { const io = new IntersectionObserver((es) => { if (es.some((e) => e.isIntersecting)) { contar(); io.disconnect(); } }, { threshold: 0.3 }); io.observe(raiz); } else { contou = true; render(); }
  new MutationObserver(render).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
});
