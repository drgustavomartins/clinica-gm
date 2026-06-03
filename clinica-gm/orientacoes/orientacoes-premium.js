/* orientacoes-premium.js
   Fade-in suave em scroll para titulos e secoes da area de Orientacoes.
   Sem dependencias. Nao interfere no orientacoes-seletor.js.
   Respeita prefers-reduced-motion. */
(function () {
  'use strict';
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function markTargets() {
    var sels = [
      '.orient-header h1',
      '.orient-header .lead',
      '.orient-section > h2',
      '.orient-card',
      '.combinadas-banner'
    ];
    var nodes = document.querySelectorAll(sels.join(','));
    nodes.forEach(function (n) {
      if (!n.hasAttribute('data-reveal')) n.setAttribute('data-reveal', '');
    });
    return nodes;
  }

  function run() {
    var nodes = markTargets();
    if (reduce || !('IntersectionObserver' in window)) {
      nodes.forEach(function (n) { n.classList.add('is-revealed'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('is-revealed');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.05, rootMargin: '0px 0px -6% 0px' });
    nodes.forEach(function (n) { io.observe(n); });

    // Seguranca: revela tudo que ainda nao apareceu apos 1.6s
    // (evita qualquer bloco em branco se o observer nao disparar).
    setTimeout(function () {
      document.querySelectorAll('[data-reveal]').forEach(function (n) {
        n.classList.add('is-revealed');
      });
    }, 1600);

    // Conteudo gerado dinamicamente (pagina combinada): observa novas secoes.
    var resultado = document.getElementById('resultadoConteudo');
    if (resultado) {
      var mo = new MutationObserver(function () {
        markTargets().forEach(function (n) {
          if (!n.classList.contains('is-revealed')) io.observe(n);
        });
      });
      mo.observe(resultado, { childList: true, subtree: true });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();
