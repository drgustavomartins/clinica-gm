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

/* Botao WhatsApp nas paginas individuais de orientacao
   Injeta automaticamente um botao "Enviar orientacoes por WhatsApp" no CTA
   de cada pagina, com o resumo dos cuidados do procedimento correspondente. */
(function () {
  'use strict';

  var RESUMOS = {
    'toxina-botulinica': {
      nome: 'Toxina Botulinica',
      resumo: 'Nao deitar nas primeiras 6h\nSem exercicios por 24h\nEvitar sol direto por 24h\nMaquiagem liberada apos 24h\nEfeito aparece em 3 a 14 dias'
    },
    'preenchimento-facial': {
      nome: 'Preenchimento Facial',
      resumo: 'Compressas frias nas primeiras 24h\nSem exercicios por 24h\nEvitar calor e sol forte por 48h\nSem massagear a regiao por 7 dias\nResultado visivel em ate 30 dias'
    },
    'intradermoterapia': {
      nome: 'Intradermoterapia com Biorregeneradores',
      resumo: 'Nao lavar o rosto por 12h\nSem maquiagem por 24h\nSem exercicios intensos por 48h\nEvitar sol direto por 48h\nPapulas no local somem em poucas horas'
    },
    'bioestimulador-radiesse': {
      nome: 'Bioestimulador (Radiesse)',
      resumo: 'Massagem protocolada conforme orientacao\nSem exercicios por 24 a 48h\nEdema e nodulos esperados nas primeiras semanas\nResultado progressivo em 4 a 6 meses'
    },
    'iprf-plaquetas': {
      nome: 'iPRF (Plaquetas)',
      resumo: 'Sem exercicios por 24h\nEvitar sol direto e calor por 48h\nPossivel edema e vermelhidao nos primeiros dias\nResultado progressivo em semanas'
    },
    'lipolise-quimica': {
      nome: 'Lipolise Quimica',
      resumo: 'Drenagem linfatica recomendada\nEdema esperado por ate 4 semanas\nSem exercicios intensos por 48h\nMultiplas sessoes podem ser necessarias'
    },
    'microagulhamento': {
      nome: 'Microagulhamento',
      resumo: 'Protetor solar FPS 50 obrigatorio\nCicaplast nos primeiros dias\nSem maquiagem por 24 a 48h\nEvitar sol e calor por 72h\nPele pode ficar avermelhada por 2 a 3 dias'
    },
    'pdrn': {
      nome: 'PDRN',
      resumo: 'Evitar sol e calor por 24 a 48h\nHidratacao caprichada\nPossivel edema leve nos locais de aplicacao\nResultado gradual ao longo das sessoes'
    },
    'plasma-gel': {
      nome: 'Plasma Gel',
      resumo: 'Evitar toque e massagem na regiao\nPossivel edema e vermelhidao nos primeiros dias\nProtetor solar diario obrigatorio\nResultado progressivo em semanas'
    },
    'fios-pdo-tracao': {
      nome: 'Fios PDO Espiculados',
      resumo: 'Sem movimentos exagerados por 30 dias\nAlimentacao pastosa por 2 semanas\nSem exercicios por 7 a 14 dias\nPossivel assimetria temporaria nas primeiras semanas'
    },
    'fios-pdo-lisos': {
      nome: 'Fios PDO Lisos',
      resumo: 'Evitar massagem na regiao por 7 dias\nSem exercicios intensos por 48h\nPossivel edema leve nos pontos de entrada\nResultado de bioestimulacao em 4 a 8 semanas'
    },
    'lipo-papada-platismoplastia': {
      nome: 'Lipo de Papada com Platismoplastia',
      resumo: 'Cinta compressiva conforme orientacao\nDrenagem linfatica a partir do 3o dia\nRepouso nas primeiras 48h\nRetorno gradual as atividades em 2 a 4 semanas'
    },
    'blefaroplastia-superior': {
      nome: 'Blefaroplastia Superior',
      resumo: 'Compressas frias nas primeiras 48h\nCuidado com olho seco (colirio lubrificante)\nCabeceira elevada para dormir\nRetirada de pontos em 7 a 10 dias'
    },
    'blefaroplastia-inferior': {
      nome: 'Blefaroplastia Inferior',
      resumo: 'Compressas frias nas primeiras 48h\nCuidado com olho seco (colirio lubrificante)\nEvitar esforco fisico por 2 semanas\nRetirada de pontos em 7 a 10 dias'
    },
    'brow-lift': {
      nome: 'Tecnica de Castanhares (Brow Lift)',
      resumo: 'Edema periorbital esperado nos primeiros dias\nCuidado com a cicatriz acima da sobrancelha\nProtetor solar na cicatriz apos liberacao\nRetorno gradual em 2 a 4 semanas'
    },
    'mini-lifting-facial': {
      nome: 'Mini-Lifting Facial',
      resumo: 'Repouso nas primeiras 48h\nCabeceira elevada para dormir\nRetirada de pontos em 7 a 10 dias\nRetorno gradual as atividades em 2 a 3 semanas'
    },
    'liplift': {
      nome: 'Lifting de Labio (Lip Lift)',
      resumo: 'Alimentacao pastosa por 2 semanas\nEvitar movimentos exagerados da boca\nCuidado com cicatriz na base do nariz\nFotoproteção rigorosa por 6 meses'
    },
    'bichectomia': {
      nome: 'Bichectomia',
      resumo: 'Higienizacao oral com antisseptico bucal\nAlimentacao fria e pastosa por 7 dias\nEdema nas bochechas e normal\nRetirada de pontos nao reabsorviveis em 7 dias'
    },
    'cirurgias-gengivais': {
      nome: 'Cirurgias Esteticas Gengivais',
      resumo: 'Higienizacao oral suave com curativo\nAlimentacao fria e pastosa nos primeiros dias\nEvitar pressao na regiao operada\nRetorno para avaliacao conforme agendado'
    },
    'lobuloplastia-cirurgica': {
      nome: 'Lobuloplastia Cirurgica',
      resumo: 'Cuidado com a cicatriz no lobulo\nRetirada de pontos nao reabsorviveis em 7 dias\nEvitar brincos por pelo menos 30 dias\nProtetor solar na cicatriz apos liberacao'
    }
  };

  var WPP_NUMBER = '5521995523509';
  var BASE_URL = 'https://www.clinicagustavomartins.com.br/orientacoes/';

  var WPP_SVG = '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>';

  function injetarBotaoWpp() {
    // Detecta o slug a partir da URL da pagina
    var match = window.location.pathname.match(/\/orientacoes\/([^/?#]+)/);
    if (!match) return;
    var slug = match[1];
    var dados = RESUMOS[slug];
    if (!dados) return;

    // Monta a mensagem
    var link = BASE_URL + slug;
    var msg = 'Orientacoes Pos-' + dados.nome + '\n\n' + dados.resumo + '\n\nPara ver as orientacoes completas, acesse:\n' + link;
    var url = 'https://wa.me/' + WPP_NUMBER + '?text=' + encodeURIComponent(msg);

    // Verifica se o bloco CTA existe e se o botao ainda nao foi adicionado
    var ctaBlock = document.querySelector('.orient-cta-block');
    if (!ctaBlock) return;
    if (ctaBlock.querySelector('.btn-wpp-enviar-orient')) return;

    // Cria o botao
    var btn = document.createElement('a');
    btn.href = url;
    btn.target = '_blank';
    btn.rel = 'noopener noreferrer';
    btn.className = 'btn-wpp-enviar-orient';
    btn.innerHTML = WPP_SVG + ' Enviar orientacoes por WhatsApp';
    btn.style.cssText = [
      'display:flex', 'align-items:center', 'justify-content:center', 'gap:8px',
      'background:#25D366', 'color:#fff', 'font-size:15px', 'font-weight:600',
      'padding:14px 22px', 'border-radius:10px', 'text-decoration:none',
      'border:none', 'cursor:pointer', 'width:100%', 'box-sizing:border-box',
      'margin-top:10px', 'transition:background .2s'
    ].join(';');
    btn.addEventListener('mouseenter', function () { btn.style.background = '#1ebe5a'; });
    btn.addEventListener('mouseleave', function () { btn.style.background = '#25D366'; });

    // Insere como primeiro botao do bloco CTA
    var ctaButtons = ctaBlock.querySelector('.orient-cta-buttons');
    if (ctaButtons) {
      ctaButtons.insertBefore(btn, ctaButtons.firstChild);
    } else {
      ctaBlock.appendChild(btn);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injetarBotaoWpp);
  } else {
    injetarBotaoWpp();
  }
})();
