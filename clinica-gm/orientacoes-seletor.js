/* ============================================
   ORIENTACOES COMBINADAS, logica do seletor
   Clinica Dr. Gustavo Martins
   ============================================ */

/* Categorias do seletor, na ordem de exibicao */
var CATEGORIAS = [
  { id: 'injetavel', titulo: 'Procedimentos injetáveis', codigos: ['toxina', 'lipolise', 'preenchimento'] },
  { id: 'colageno', titulo: 'Procedimentos para estímulo de colágeno', codigos: ['bioestimulador', 'microagulhamento', 'pdrn'] },
  { id: 'plaquetas', titulo: 'Procedimentos com plaquetas', codigos: ['iprf', 'plasma-gel'] },
  { id: 'fios', titulo: 'Fios', codigos: ['fios-lisos', 'fios-tracao'] },
  { id: 'cirurgico', titulo: 'Procedimentos cirúrgicos', codigos: ['lipo-platisma', 'blefaro-superior', 'blefaro-inferior', 'brow-lift', 'lip-lift', 'bichectomia', 'lobuloplastia', 'mini-lifting', 'gengivais'] }
];

/* Peso de categoria para ordenacao, cirurgia primeiro */
var PESO_CATEGORIA = { cirurgico: 6, fios: 5, plaquetas: 4, colageno: 3, injetavel: 1 };

var NOTA_PLACEHOLDER = 'Para orientações detalhadas deste procedimento, entre em contato com a equipe da clínica pelo WhatsApp.';
var FRASE_INDIVIDUAL = 'As orientações podem variar conforme avaliação individual do Dr. Gustavo Martins.';

/* Horizontes temporais da timeline unificada, em ordem */
var HORIZONTES = [
  'Primeiras 6 horas',
  'Primeiras 24 horas',
  'Primeiros 7 dias',
  '7 a 14 dias',
  '2 a 4 semanas',
  '1 a 3 meses',
  '3 a 6 meses'
];

/* ============================================
   BASE DE DADOS DOS PROCEDIMENTOS
   ============================================ */
var PROCEDIMENTOS = {

  /* ---------- TOXINA BOTULINICA (literal da pagina publicada) ---------- */
  'toxina': {
    nome: 'Toxina Botulínica',
    desc: 'Aplicação de toxina botulínica por injeção.',
    categoria: 'injetavel',
    placeholder: false,
    pode: [
      'Maquiagem, corretivos e filtro solar após 24 horas',
      'Aplicar HIRUDOID gel 500mg se aparecerem manchas roxas',
      'Usar analgésico se sentir dor de cabeça',
      'Manter rotina normal de trabalho e alimentação',
      'Aplicar protetor solar FPS 50 de 3 em 3 horas enquanto houver hematomas'
    ],
    evite: [
      'Massagear a região por 24 horas',
      'Deitar nas primeiras 6 horas, mantenha-se em posição vertical',
      'Exercícios físicos por 24 horas',
      'Sol direto na região aplicada nas primeiras 24 horas'
    ],
    timeline: {
      'Primeiras 6 horas': 'Manter posição vertical e não se deitar. Evite massagear a região.',
      'Primeiras 24 horas': 'Sem exercícios físicos. Não tomar sol direto na região aplicada. Maquiagem e filtro solar liberados a partir de 24 horas. É comum ocorrer dores de cabeça, podendo usar qualquer analgésico.',
      'Primeiros 7 dias': 'A partir do 3º dia o efeito da toxina pode começar a aparecer. Hematomas (manchas roxas) podem surgir nos locais de aplicação.',
      '7 a 14 dias': 'Aos 14 dias o efeito atinge sua estabilidade, com máxima efetividade. Retorno aos 15 dias para avaliação dos resultados.'
    },
    prazos: {
      exercicio: { dias: 1, label: '24 horas' },
      sol: { dias: 1, label: '24 horas' },
      maquiagem: { dias: 1, label: '24 horas' }
    },
    sinaisAlerta: [
      'Reação alérgica intensa (inchaço de lábios, língua ou garganta, dificuldade para respirar)',
      'Fraqueza muscular fora da região aplicada',
      'Queda acentuada de pálpebra ou assimetria importante que cause preocupação'
    ],
    cuidados: {
      higiene: 'Não massagear a região por 24 horas.',
      atividade: 'Não realizar exercícios físicos por 24 horas.',
      sol: 'Não tomar sol direto na região aplicada nas primeiras 24 horas. Utilizar protetor solar FPS 50 de 3 em 3 horas, principalmente caso apareçam hematomas.',
      maquiagem: 'Maquiagem, corretivos e filtro solar sobre o local poderão ser aplicados normalmente após 24 horas.',
      medicacao: 'É comum ocorrer dores de cabeça nos primeiros dias, podendo usar qualquer analgésico. Para hematomas, aplicar HIRUDOID gel 500mg sobre as manchas.',
      posicao: 'Manter-se em posição vertical e não se deitar nas primeiras 6 horas.',
      retorno: 'O efeito pode iniciar a partir do terceiro dia, com estabilidade em 14 dias. Retornar 15 dias após para avaliação dos resultados.'
    },
    faq: [
      { q: 'Posso me deitar depois de aplicar a toxina?', a: 'Mantenha-se em posição vertical e evite deitar nas primeiras 6 horas após a aplicação.' },
      { q: 'Quando posso voltar a treinar após a toxina?', a: 'Não realizar exercícios físicos por 24 horas após a aplicação.' },
      { q: 'Quanto tempo demora para o efeito da toxina aparecer?', a: 'O efeito pode iniciar a partir do terceiro dia, atingindo estabilidade com máxima efetividade em 14 dias. O retorno para avaliação é feito 15 dias após.' },
      { q: 'Quando posso passar maquiagem após a toxina?', a: 'Maquiagem, corretivos e filtro solar sobre o local poderão ser aplicados normalmente após 24 horas.' },
      { q: 'É normal sentir dor de cabeça depois da toxina?', a: 'Sim, é comum nos primeiros dias após a aplicação. Você pode usar qualquer analgésico.' },
      { q: 'E se aparecerem manchas roxas após a toxina?', a: 'Hematomas podem surgir nos locais de aplicação. Aplicar HIRUDOID gel 500mg sobre as manchas. Não tomar sol direto na região nas primeiras 24 horas e usar protetor solar FPS 50 de 3 em 3 horas.' }
    ]
  },

  /* ---------- LIP LIFT ---------- */
  'lip-lift': {
    nome: 'Lifting de Lábio (Lip Lift)',
    desc: 'Cirurgia que eleva o lábio superior.',
    categoria: 'cirurgico',
    placeholder: false,
    pode: [
      'Lavar o rosto com movimentos suaves, respeitando a região da incisão',
      'Aplicar hidratante labial suave conforme orientação do Dr. Gustavo',
      'Alimentar-se de alimentos pastosos e macios nas primeiras semanas',
      'Dormir com a cabeça levemente elevada para reduzir o edema',
      'Usar protetor solar FPS 50 normalmente após a cicatrização completa da sutura',
      'Aplicar compressas frias indiretas nas primeiras 48 horas para conforto'
    ],
    evite: [
      'Fumar por pelo menos 4 semanas no pós-operatório',
      'Movimentos exagerados da boca por pelo menos 2 semanas',
      'Exposição solar direta na cicatriz por no mínimo 6 meses',
      'Maquiagem na região da incisão até a retirada dos pontos e liberação',
      'Atividade física de impacto ou esforço intenso por pelo menos 2 semanas',
      'Manipular, coçar ou pressionar a cicatriz'
    ],
    timeline: {
      'Primeiras 24 horas': 'Edema e vermelhidão ao redor da incisão são esperados. Repouso recomendado. A sutura estará com curativo ou micropore.',
      'Primeiros 7 dias': 'O inchaço atinge o pico por volta do 2º dia; compressas frias indiretas ajudam. Mantenha alimentação pastosa. Os pontos seguem presentes, com crostas finas normais.',
      '7 a 14 dias': 'A retirada dos pontos ocorre geralmente entre 7 e 10 dias, conforme avaliação. A cicatriz fica rosada e sensível. Momento crítico para iniciar a fotoproteção.',
      '2 a 4 semanas': 'A cicatriz passa por maturação, com cor avermelhada normal. As restrições vão sendo liberadas conforme avaliação do Dr. Gustavo.',
      '1 a 3 meses': 'A cicatriz tende a clarear. O resultado começa a ficar mais evidente com a resolução do edema residual.',
      '3 a 6 meses': 'A cicatriz atinge a maturação final e o resultado estável pode ser avaliado. Preenchimento labial, se desejado, pode ser considerado a partir de 3 a 6 meses, conforme avaliação. Mantenha a fotoproteção rigorosa.'
    },
    prazos: {
      exercicio: { dias: 14, label: '2 semanas' },
      sol: { dias: 180, label: '6 meses' },
      maquiagem: { dias: null, label: 'após retirada dos pontos e liberação' },
      tabagismo: { dias: 28, label: '4 semanas' },
      pontos: { dias: 10, label: '7 a 10 dias' }
    },
    sinaisAlerta: [
      'Febre acima de 38°C',
      'Sangramento ativo ou abundante na região da incisão',
      'Dor intensa que não cede com a medicação prescrita pelo Dr. Gustavo',
      'Secreção com odor fétido, pus ou coloração amarelada ou esverdeada na cicatriz',
      'Vermelhidão muito intensa, calor local excessivo ou endurecimento ao redor da sutura',
      'Abertura espontânea da sutura (deiscência)',
      'Inchaço muito assimétrico, crescente e desproporcional após as primeiras 48 horas'
    ],
    cuidados: {
      higiene: 'Limpeza da incisão com suavidade: soro fisiológico nos primeiros 7 dias, depois sabonete suave. Movimentos gentis com gaze estéril ou cotonete. Evite banhos muito quentes.',
      medicacao: 'Siga rigorosamente a prescrição do Dr. Gustavo (analgésicos, anti-inflamatórios e, quando indicado, antibiótico e pomada). Não substitua, adicione ou suspenda nenhum medicamento sem consultar o Dr. Gustavo. Evite aspirina não prescrita.',
      alimentacao: 'Prefira alimentos pastosos, macios e frios ou em temperatura ambiente. Evite alimentos que exijam abertura ampla da boca por 1 a 2 semanas. Mantenha boa hidratação.',
      posicao: 'Durma com a cabeça elevada nas primeiras 48 a 72 horas. Evite pressionar a região da incisão durante o sono.',
      atividade: 'Repouso nas primeiras 48 horas. Atividades leves após a primeira semana, conforme orientação. Exercício de alta intensidade só após 2 semanas, conforme avaliação do Dr. Gustavo.',
      sol: 'A cicatriz na base do nariz é muito suscetível à hiperpigmentação. Use protetor solar FPS 50 normalmente, com fotoproteção rigorosa por pelo menos 6 meses. Chapéu de aba larga ajuda.',
      maquiagem: 'Maquiagem na região da incisão somente após a retirada dos pontos e liberação do Dr. Gustavo. Evite ácidos e retinol na região até liberação.',
      retorno: 'Retirada dos pontos geralmente entre 7 e 10 dias, conforme avaliação. Compareça a todas as consultas de acompanhamento.'
    },
    faq: [
      { q: 'Quando a cicatriz do lip lift vai sumir?', a: 'A cicatriz não desaparece completamente, mas tende a clarear e se tornar muito discreta ao longo dos meses. A proteção solar rigorosa é fundamental para o resultado final.' },
      { q: 'Posso usar batom durante a recuperação do lip lift?', a: 'Não até que o Dr. Gustavo libere, após a retirada dos pontos. Depois, prefira fórmulas sem mentol ou fragrância intensa nas primeiras semanas.' },
      { q: 'Senti meu lábio dormente após o lip lift. É normal?', a: 'Sim, a dormência ao redor da incisão é comum e a sensibilidade retorna progressivamente. Caso seja muito intensa ou persistente, mencione ao Dr. Gustavo.' },
      { q: 'Posso fazer preenchimento labial depois do lip lift?', a: 'Sim, após a estabilização da cicatriz, geralmente a partir de 3 a 6 meses, conforme avaliação do Dr. Gustavo.' }
    ]
  },

  /* ---------- BROW LIFT ---------- */
  'brow-lift': {
    nome: 'Técnica de Castanhares (Brow Lift Cirúrgico)',
    desc: 'Elevação cirúrgica da sobrancelha.',
    categoria: 'cirurgico',
    placeholder: false,
    pode: [
      'Dormir com a cabeça elevada nas primeiras 48 a 72 horas',
      'Aplicar compressas frias indiretas sobre a região nas primeiras 48 horas',
      'Lavar o rosto com suavidade, evitando a região da sutura',
      'Retornar às atividades leves e sedentárias conforme evolução',
      'Usar óculos de sol para proteção e conforto',
      'Usar protetor solar FPS 50 normalmente após a cicatrização completa da sutura'
    ],
    evite: [
      'Expressões faciais exageradas (franzir a testa, levantar as sobrancelhas) por pelo menos 2 semanas',
      'Maquiagem na região até a retirada dos pontos e liberação',
      'Atividade física de impacto ou esforço intenso por pelo menos 2 semanas',
      'Exposição solar direta na cicatriz por no mínimo 6 meses',
      'Fumar por pelo menos 4 semanas no pós-operatório',
      'Manipular, coçar ou pressionar a região da sutura'
    ],
    timeline: {
      'Primeiras 24 horas': 'Edema e equimose ao redor da sobrancelha e dos olhos são esperados. A região estará com sutura e curativo. Repouso com cabeça elevada.',
      'Primeiros 7 dias': 'O inchaço atinge o pico por volta do 2º dia; equimose abaixo dos olhos é normal. Crostas finas na linha de sutura. Evite expressões forçadas.',
      '7 a 14 dias': 'A retirada dos pontos ocorre geralmente entre 7 e 10 dias, conforme avaliação. A cicatriz fica rosada. A equimose tende a desaparecer. Inicie a fotoproteção.',
      '2 a 4 semanas': 'A dormência ou formigamento na testa pode persistir, o que é normal. O edema residual diminui. Atividades leves liberadas conforme o Dr. Gustavo.',
      '1 a 3 meses': 'A cicatriz passa por maturação, com coloração rosada normal. O resultado fica mais evidente. Mantenha a fotoproteção rigorosa.',
      '3 a 6 meses': 'A cicatriz atinge a maturação final. O resultado estável pode ser avaliado. Sobrancelhas escuras camuflam melhor a cicatriz.'
    },
    prazos: {
      exercicio: { dias: 14, label: '2 semanas' },
      sol: { dias: 180, label: '6 meses' },
      maquiagem: { dias: null, label: 'após retirada dos pontos e liberação' },
      tabagismo: { dias: 28, label: '4 semanas' },
      pontos: { dias: 10, label: '7 a 10 dias' }
    },
    sinaisAlerta: [
      'Alteração visual de qualquer natureza: visão turva, dupla ou reduzida, mesmo que leve',
      'Febre acima de 38°C',
      'Sangramento ativo ou abundante na região da sutura',
      'Dor intensa que não cede com a medicação prescrita pelo Dr. Gustavo',
      'Secreção com odor fétido, pus ou coloração amarelada ou esverdeada na cicatriz',
      'Vermelhidão muito intensa com calor local e endurecimento crescente',
      'Abertura espontânea da sutura (deiscência)',
      'Queda acentuada da pálpebra superior após o procedimento'
    ],
    cuidados: {
      higiene: 'Lave o rosto com movimentos suaves, sem esfregar sobre a sutura. Soro fisiológico nos primeiros 7 dias, depois sabonete suave. Seque com toque delicado.',
      medicacao: 'Siga rigorosamente a prescrição do Dr. Gustavo. Não adicione, substitua ou suspenda medicação sem consultar o Dr. Gustavo. Evite aspirina e anticoagulantes não prescritos.',
      alimentacao: 'Não há restrição específica. Prefira alimentos leves e nutritivos que favoreçam a cicatrização. Mantenha boa hidratação. Evite álcool em excesso durante o uso de medicações.',
      posicao: 'Durma com a cabeça elevada nas primeiras 48 a 72 horas. Evite pressionar o rosto contra o travesseiro, especialmente o lado operado.',
      atividade: 'Repouso nas primeiras 48 horas. Atividades leves após os primeiros dias. Exercício de alta intensidade só após 2 semanas, conforme avaliação do Dr. Gustavo.',
      sol: 'A cicatriz acima da sobrancelha é vulnerável à hiperpigmentação. Use protetor solar FPS 50 normalmente, com fotoproteção rigorosa por pelo menos 6 meses. Óculos de sol e chapéu de aba larga ajudam.',
      maquiagem: 'Maquiagem na testa e sobrancelha somente após a retirada dos pontos e liberação do Dr. Gustavo. Evite ácidos e retinol na região até liberação.',
      retorno: 'Retirada dos pontos geralmente entre 7 e 10 dias, conforme avaliação. Compareça a todas as consultas de acompanhamento.'
    },
    faq: [
      { q: 'A cicatriz do brow lift vai ficar muito aparente?', a: 'A cicatriz fica acima da sobrancelha, parcialmente coberta pelos pelos do supercílio. Com os cuidados de fotoproteção, tende a clarear e se tornar muito discreta.' },
      { q: 'Vou sentir a testa dormente por muito tempo após o brow lift?', a: 'A dormência ou formigamento na testa é comum e pode durar semanas a meses. Em geral, a sensibilidade retorna progressivamente. Casos persistentes devem ser avaliados pelo Dr. Gustavo.' },
      { q: 'O que é a sensação de aperto na testa após o brow lift?', a: 'É normal sentir tensão na região nas primeiras semanas, resultado da remoção da faixa de pele e da adaptação dos tecidos. Diminui progressivamente.' }
    ]
  },

  /* ---------- BLEFAROPLASTIA SUPERIOR ---------- */
  'blefaro-superior': {
    nome: 'Blefaroplastia Superior',
    desc: 'Cirurgia das pálpebras superiores.',
    categoria: 'cirurgico',
    placeholder: false,
    pode: [
      'Dormir com a cabeça elevada nas primeiras 48 a 72 horas',
      'Aplicar compressas frias indiretas (nunca gelo direto) nas primeiras 48 horas',
      'Usar colírio ou lágrima artificial quando indicado pelo Dr. Gustavo',
      'Usar óculos de sol para proteção e conforto',
      'Assistir televisão e usar celular de forma moderada, com pausas frequentes',
      'Usar protetor solar FPS 50 normalmente após a cicatrização completa da sutura'
    ],
    evite: [
      'Esforço visual prolongado nas primeiras semanas, especialmente nos primeiros 5 dias',
      'Lentes de contato por no mínimo 14 dias, conforme avaliação',
      'Maquiagem nos olhos até a retirada dos pontos e liberação',
      'Atividade física de impacto ou esforço intenso por pelo menos 4 semanas',
      'Coçar, esfregar ou pressionar os olhos',
      'Fumar por pelo menos 4 semanas no pós-operatório'
    ],
    timeline: {
      'Primeiras 24 horas': 'Edema e início de equimose ao redor dos olhos. Os olhos podem parecer pesados e a visão levemente turva pelo edema. Repouso com cabeça elevada.',
      'Primeiros 7 dias': 'Inchaço e equimose atingem o pico nas primeiras 48 horas. Os pontos seguem na prega da pálpebra. Sensibilidade à luz e olho seco são comuns.',
      '7 a 14 dias': 'A retirada dos pontos ocorre geralmente entre 7 e 10 dias, conforme avaliação. A equimose fica mais discreta. Maior conforto para atividades sociais.',
      '2 a 4 semanas': 'As restrições vão sendo liberadas. Lentes de contato e maquiagem podem ser liberadas conforme avaliação. Edema fino residual pode persistir, especialmente nas manhãs.',
      '1 a 3 meses': 'A cicatriz passa por maturação e o resultado fica mais evidente. Edema residual fino pode persistir algumas semanas.',
      '3 a 6 meses': 'Avaliação do resultado estável. A cicatriz na prega da pálpebra torna-se muito discreta na maioria dos casos.'
    },
    prazos: {
      exercicio: { dias: 28, label: '4 semanas' },
      sol: { dias: 180, label: '6 meses' },
      maquiagem: { dias: null, label: 'após retirada dos pontos e liberação' },
      tabagismo: { dias: 28, label: '4 semanas' },
      pontos: { dias: 10, label: '7 a 10 dias' },
      lentes: { dias: 14, label: 'no mínimo 14 dias' }
    },
    sinaisAlerta: [
      'Qualquer alteração visual: visão turva, dupla, reduzida, sombras ou flashes de luz',
      'Febre acima de 38°C',
      'Sangramento ativo, abundante ou que não cessa na região dos olhos',
      'Dor intensa nos olhos ou ao redor deles, que não cede com a medicação prescrita',
      'Vermelhidão intensa dentro do olho (não apenas ao redor)',
      'Secreção purulenta ou com odor fétido na cicatriz',
      'Inchaço muito assimétrico, crescente e progressivo após as primeiras 48 horas',
      'Incapacidade de fechar completamente os olhos'
    ],
    cuidados: {
      higiene: 'Higienize as pálpebras com soro fisiológico nos primeiros 7 dias, depois sabonete suave, com gaze estéril em movimentos muito suaves, da parte interna para a externa do olho. Não esfregue. Evite shampoo ou sabonete nos olhos durante o banho.',
      medicacao: 'Siga rigorosamente a prescrição do Dr. Gustavo. Use lágrima artificial quando indicado pelo Dr. Gustavo, especialmente se sentir olho seco. Não substitua ou suspenda medicação sem consultar o Dr. Gustavo. Evite aspirina não prescrita.',
      alimentacao: 'Não há restrição específica na blefaroplastia superior isolada. Reduza o sal nas primeiras semanas para diminuir o edema. Mantenha boa hidratação.',
      posicao: 'Durma com a cabeça bem elevada nas primeiras 48 a 72 horas. Evite dormir com o rosto pressionado contra o travesseiro.',
      atividade: 'Repouso nas primeiras 48 horas. Atividades leves após os primeiros dias. Exercício de alta intensidade só após 4 semanas, conforme avaliação do Dr. Gustavo.',
      sol: 'Proteja a cicatriz do sol por pelo menos 6 meses. Use protetor solar FPS 50 normalmente, com aplicação cuidadosa para evitar contato com os olhos. Óculos de sol com proteção UV são recomendados.',
      maquiagem: 'Maquiagem nos olhos somente após a retirada dos pontos e liberação do Dr. Gustavo. Evite ácidos e retinol na região palpebral por período prolongado.',
      retorno: 'Retirada dos pontos geralmente entre 7 e 10 dias, conforme avaliação. Compareça a todas as consultas de acompanhamento.'
    },
    faq: [
      { q: 'Vou ficar com cicatriz visível na blefaroplastia superior?', a: 'A cicatriz fica na prega natural da pálpebra superior, onde é muito discreta após a maturação. Com os cuidados adequados, torna-se quase invisível na maioria dos casos.' },
      { q: 'Por que meu olho está seco após a blefaroplastia?', a: 'O olho seco é comum após a cirurgia, por alterações temporárias no filme lacrimal. A lágrima artificial alivia bastante e o quadro melhora progressivamente.' },
      { q: 'Quando posso usar lentes de contato após a blefaroplastia superior?', a: 'A liberação é individual, geralmente no mínimo 14 dias, conforme avaliação do Dr. Gustavo. O uso precoce pode irritar olhos sensíveis.' }
    ]
  },

  /* ---------- BLEFAROPLASTIA INFERIOR (apenas subciliar) ---------- */
  'blefaro-inferior': {
    nome: 'Blefaroplastia Inferior',
    desc: 'Cirurgia das pálpebras inferiores, via subciliar.',
    categoria: 'cirurgico',
    placeholder: false,
    pode: [
      'Dormir com a cabeça muito elevada nas primeiras 48 a 72 horas',
      'Aplicar compressas frias indiretas (nunca gelo direto) nas primeiras 48 a 72 horas',
      'Usar lágrima artificial quando indicado pelo Dr. Gustavo',
      'Usar óculos de sol para proteção e conforto',
      'Lavar o rosto com muita suavidade, evitando a região das pálpebras',
      'Usar óculos de grau se necessário para enxergar'
    ],
    evite: [
      'Esforço que aumente a pressão ocular: agachar, levantar peso, tosse intensa, por pelo menos 2 semanas',
      'Fazer força para evacuar (evitar manobra de Valsalva) por 2 semanas',
      'Coçar, esfregar ou pressionar os olhos',
      'Lentes de contato por no mínimo 14 dias, conforme avaliação',
      'Maquiagem nos olhos até a retirada dos pontos e liberação',
      'Atividade física de impacto ou esforço intenso por pelo menos 4 semanas',
      'Fumar por pelo menos 4 semanas no pós-operatório'
    ],
    timeline: {
      'Primeiras 24 horas': 'Edema, início de equimose e sensação de peso ao redor dos olhos. A visão pode estar levemente alterada pelo edema. Repouso com cabeça muito elevada.',
      'Primeiros 7 dias': 'O edema e a equimose atingem o pico nas primeiras 48 a 72 horas, podendo ser mais intensos que na blefaroplastia superior. A equimose muda de cor, sinal de resolução normal. Olho seco é comum.',
      '7 a 14 dias': 'A equimose fica mais discreta. A retirada dos pontos da incisão subciliar ocorre geralmente entre 7 e 10 dias, conforme avaliação. Maior conforto para atividades sociais.',
      '2 a 4 semanas': 'Atividades leves liberadas conforme o Dr. Gustavo. Edema residual pode persistir, especialmente nas manhãs. Maquiagem e lentes liberadas conforme avaliação.',
      '1 a 3 meses': 'O resultado fica mais evidente. A cicatriz subciliar vai clareando. Mantenha a fotoproteção rigorosa.',
      '3 a 6 meses': 'Avaliação do resultado estável. O olhar rejuvenescido se consolida. A cicatriz subciliar torna-se muito discreta.'
    },
    prazos: {
      exercicio: { dias: 28, label: '4 semanas' },
      sol: { dias: 180, label: '6 meses' },
      maquiagem: { dias: null, label: 'após retirada dos pontos e liberação' },
      tabagismo: { dias: 28, label: '4 semanas' },
      pontos: { dias: 10, label: '7 a 10 dias' },
      lentes: { dias: 14, label: 'no mínimo 14 dias' }
    },
    sinaisAlerta: [
      'Qualquer alteração visual: visão dupla, turva, sombras, flashes de luz, perda parcial ou total da visão. Este é o sinal mais crítico e pode indicar hematoma retrobulbar',
      'Febre acima de 38°C',
      'Sangramento ativo, abundante ou que não cessa ao redor dos olhos',
      'Dor intensa nos olhos que não cede com a medicação prescrita',
      'Pressão ou tensão ocular muito intensa, sensação de olho pressionando para fora',
      'Vermelhidão intensa dentro do olho (não apenas ao redor da pálpebra)',
      'Inchaço muito assimétrico, crescente e progressivo após as primeiras 48 horas',
      'Incapacidade de fechar os olhos completamente'
    ],
    cuidados: {
      higiene: 'Higienize a região com soro fisiológico nos primeiros 7 dias, depois sabonete suave, com gaze estéril em movimentos muito delicados. Não esfregue. Evite shampoo ou sabonete nos olhos durante o banho. A incisão subciliar fica logo abaixo dos cílios.',
      medicacao: 'Siga rigorosamente a prescrição do Dr. Gustavo. Use lágrima artificial quando indicado pelo Dr. Gustavo. Não substitua ou suspenda medicação sem consultar o Dr. Gustavo. Evite aspirina e anticoagulantes não prescritos.',
      alimentacao: 'Não há restrição específica na blefaroplastia inferior isolada. Reduza o sal nas primeiras semanas para evitar retenção e edema. Prefira alimentos ricos em vitaminas e proteínas. Mantenha boa hidratação.',
      posicao: 'Durma com a cabeça muito elevada nas primeiras 72 horas. Evite dormir de bruços ou com o rosto pressionado por 1 a 2 semanas.',
      atividade: 'Repouso rigoroso nas primeiras 48 horas. Evite qualquer esforço que aumente a pressão intraocular por 2 semanas, inclusive força para evacuar. Exercício de alta intensidade só após 4 semanas, conforme avaliação do Dr. Gustavo.',
      sol: 'A região periorbital é muito sensível à hiperpigmentação. Use protetor solar FPS 50 normalmente e óculos de sol com proteção UV por pelo menos 6 meses.',
      maquiagem: 'Maquiagem nos olhos somente após a retirada dos pontos e liberação do Dr. Gustavo. Evite ácidos e retinol na região periorbital por período prolongado.',
      retorno: 'Retirada dos pontos da incisão subciliar geralmente entre 7 e 10 dias, conforme avaliação. Compareça a todas as consultas de acompanhamento.'
    },
    faq: [
      { q: 'Por que o hematoma na blefaroplastia inferior é maior do que na superior?', a: 'A pálpebra inferior tem tecido mais delicado e maior comunicação com espaços de gordura ao redor do olho, o que pode resultar em equimose mais extensa. É completamente esperado.' },
      { q: 'O que é o hematoma retrobulbar?', a: 'É um acúmulo de sangue atrás do globo ocular, raro mas sério. Sinais incluem dor ocular intensa crescente, visão turva ou dupla e pressão no olho. Qualquer alteração visual exige contato imediato com o Dr. Gustavo ou pronto-socorro.' },
      { q: 'Quando posso usar lentes de contato após a blefaroplastia inferior?', a: 'Geralmente no mínimo 14 dias, conforme avaliação do Dr. Gustavo. O uso precoce pode irritar olhos sensíveis e dificultar a cicatrização.' }
    ]
  },

  /* ---------- LIPO DE PAPADA COM PLATISMOPLASTIA (consolidado) ---------- */
  'lipo-platisma': {
    nome: 'Lipo de Papada com Platismoplastia',
    desc: 'Lipoaspiração da papada associada ao tratamento do músculo platisma.',
    categoria: 'cirurgico',
    placeholder: false,
    pode: [
      'Usar a cinta ou faixa compressiva cervical conforme orientação, com redução progressiva',
      'Dormir com a cabeça elevada nas primeiras 48 a 72 horas',
      'Realizar drenagem linfática conforme protocolo, a partir do 3º dia, com profissional qualificado',
      'Lavar o rosto e o pescoço com suavidade, evitando as incisões',
      'Alimentar-se de alimentos macios e leves nos primeiros dias',
      'Manter boa hidratação durante toda a recuperação'
    ],
    evite: [
      'Retirar a cinta compressiva por períodos não autorizados pelo Dr. Gustavo',
      'Movimentos bruscos do pescoço por pelo menos 2 a 4 semanas',
      'Atividade física de impacto ou esforço intenso por pelo menos 4 a 6 semanas',
      'Exposição solar direta na região e nas cicatrizes por no mínimo 6 meses',
      'Maquiagem e cosméticos nas incisões até a retirada dos pontos e liberação',
      'Fumar por pelo menos 4 semanas no pós-operatório',
      'Carregar peso ou esforço que aumente a pressão na região cervical'
    ],
    timeline: {
      'Primeiras 24 horas': 'Edema, equimose e sensação de tensão no queixo e pescoço são esperados. As incisões estarão com curativo e sutura, e a faixa compressiva colocada. Repouso com cabeça elevada.',
      'Primeiros 7 dias': 'O edema atinge o pico nas primeiras 48 a 72 horas, podendo se estender ao queixo, pescoço e colo. A drenagem linfática pode iniciar a partir do 3º dia, conforme protocolo. Mantenha a faixa conforme orientação.',
      '7 a 14 dias': 'A retirada dos pontos ocorre geralmente entre 7 e 10 dias, conforme avaliação. A equimose fica mais discreta. A faixa pode ser flexibilizada com redução progressiva. A drenagem linfática continua.',
      '2 a 4 semanas': 'O edema residual diminui. Pequenas irregularidades ou áreas endurecidas são comuns e se resolvem com a drenagem e o tempo. A mobilidade do pescoço se normaliza progressivamente.',
      '1 a 3 meses': 'O resultado fica mais evidente. A pele se adapta ao novo contorno. As irregularidades vão se resolvendo. Mantenha a fotoproteção nas cicatrizes.',
      '3 a 6 meses': 'Avaliação do resultado estável, com melhor definição do contorno cervical e mandibular. As cicatrizes ficam muito discretas. O resultado depende também da qualidade e elasticidade da pele.'
    },
    prazos: {
      exercicio: { dias: 42, label: '4 a 6 semanas' },
      sol: { dias: 180, label: '6 meses' },
      maquiagem: { dias: null, label: 'após retirada dos pontos e liberação' },
      tabagismo: { dias: 28, label: '4 semanas' },
      pontos: { dias: 10, label: '7 a 10 dias' }
    },
    sinaisAlerta: [
      'Dificuldade para respirar ou sensação de sufocamento, ligue imediatamente para o SAMU (192)',
      'Aumento rápido de volume no pescoço, especialmente próximo à via aérea',
      'Febre acima de 38°C',
      'Sangramento ativo, abundante ou progressivo nas incisões',
      'Dor intensa no pescoço que não cede com a medicação prescrita',
      'Secreção purulenta, com odor fétido ou coloração esverdeada ou amarelada nas incisões',
      'Vermelhidão muito intensa, calor local e endurecimento crescente ao redor das suturas',
      'Abertura espontânea das suturas (deiscência)',
      'Dormência muito intensa ou progressiva no pescoço, queixo ou lóbulos das orelhas'
    ],
    cuidados: {
      higiene: 'Higienize as incisões com soro fisiológico nos primeiros 7 dias, depois sabonete suave, com gaze estéril em movimentos suaves. Evite jatos de água quente sobre as incisões. Lavar o cabelo pode requerer auxílio. Mantenha a cinta limpa conforme orientação.',
      medicacao: 'Siga rigorosamente a prescrição do Dr. Gustavo. Não substitua, adicione ou suspenda medicação sem consultar o Dr. Gustavo. Evite aspirina e anticoagulantes não prescritos. Informe qualquer medicação de uso contínuo.',
      alimentacao: 'Prefira alimentos macios e de fácil deglutição nos primeiros dias. Evite alimentos que forcem movimentos amplos da mandíbula. Mantenha boa hidratação. Evite álcool em excesso durante o uso de medicações.',
      posicao: 'Durma com a cabeça e o pescoço bem elevados nas primeiras semanas. Evite dormir de bruços ou em posições que comprometam o pescoço.',
      atividade: 'Repouso rigoroso nas primeiras 48 horas. Caminhadas leves após os primeiros dias. Exercício de alta intensidade e movimentos do pescoço só após 4 a 6 semanas, conforme avaliação do Dr. Gustavo.',
      sol: 'Use protetor solar FPS 50 normalmente nas cicatrizes após a cicatrização completa, por pelo menos 6 meses. Gola alta, lenço e chapéu de aba larga ajudam.',
      maquiagem: 'Cosméticos nas incisões somente após a retirada dos pontos e liberação do Dr. Gustavo. Evite ácidos e ativos irritantes nas cicatrizes por período prolongado.',
      retorno: 'Retirada dos pontos geralmente entre 7 e 10 dias, conforme avaliação. A drenagem linfática é parte fundamental da recuperação, a partir do 3º dia, com profissional qualificado. A clínica pode indicar profissionais, mas a paciente pode escolher outro profissional qualificado de sua confiança.'
    },
    faq: [
      { q: 'Por quanto tempo preciso usar a cinta após a lipo de papada com platismoplastia?', a: 'O tempo é determinado individualmente pelo Dr. Gustavo, em geral por várias semanas com redução progressiva. Não retire a cinta antes do prazo, pois ela é fundamental para o resultado.' },
      { q: 'A drenagem linfática é obrigatória?', a: 'Sim, é parte fundamental do protocolo de recuperação. Pode iniciar a partir do 3º dia, com profissional qualificado. A clínica pode indicar profissionais, mas você pode escolher outro de sua confiança.' },
      { q: 'É normal sentir o pescoço tenso e endurecido?', a: 'Sim. A sensação de tensão e pequenas irregularidades são esperadas nas primeiras semanas e se resolvem com a drenagem e o tempo. Se persistirem por mais de 1 a 2 meses, informe ao Dr. Gustavo.' }
    ]
  },

  /* ---------- BICHECTOMIA ---------- */
  'bichectomia': {
    nome: 'Bichectomia',
    desc: 'Remoção parcial das bolsas de gordura de Bichat.',
    categoria: 'cirurgico',
    placeholder: false,
    pode: [
      'Usar a faixa compressiva conforme orientação do Dr. Gustavo',
      'Aplicar compressas de gelo externamente, com pano entre o gelo e a pele, nas primeiras 24 horas',
      'Dormir com a cabeça elevada nas primeiras 48 horas e evitar deitar de lado',
      'Alimentar-se de alimentos pastosos e frios ou em temperatura ambiente nas primeiras 48 horas',
      'Fazer higiene oral suave com escova de cerdas macias e enxaguante suave',
      'Movimentos leves de abertura e fechamento da boca para manter a mobilidade'
    ],
    evite: [
      'Alimentos quentes nas primeiras 48 horas',
      'Alimentos duros, crocantes ou que exijam mastigação intensa por pelo menos 7 dias',
      'Uso de canudo nas primeiras 48 horas',
      'Bochechos vigorosos por pelo menos 7 a 14 dias',
      'Atividade física por pelo menos 2 semanas',
      'Exposição ao sol e ao calor por pelo menos 7 dias',
      'Fumar por pelo menos 4 semanas no pós-operatório'
    ],
    timeline: {
      'Primeiras 24 horas': 'Edema nas bochechas e região malar é esperado e pode ser significativo. A anestesia local vai perdendo efeito, podendo surgir desconforto. Compressas de gelo externo ajudam. Repouso com cabeça elevada, sem deitar de lado. Alimentação pastosa e fria.',
      'Primeiros 7 dias': 'O edema atinge o pico por volta de 48 horas; as bochechas podem parecer mais cheias, o que é normal. Mantenha a faixa compressiva e a alimentação macia. Higiene oral cuidadosa. Evite atividade física, sol e calor.',
      '7 a 14 dias': 'A retirada dos pontos intraorais ocorre em 7 dias, pois é utilizado fio não reabsorvível. O edema continua diminuindo. A alimentação pode ser gradualmente normalizada conforme o conforto.',
      '2 a 4 semanas': 'A restrição de alimentos duros vai sendo flexibilizada. O edema continua reduzindo. A aparência facial se aproxima do resultado final.',
      '1 a 3 meses': 'O edema está praticamente resolvido. O resultado começa a ficar mais evidente, com a redefinição dos contornos faciais.',
      '3 a 6 meses': 'Avaliação do resultado estável, com possível melhora de contorno em pacientes bem indicados. A retração natural dos tecidos se completa.'
    },
    prazos: {
      exercicio: { dias: 14, label: '2 semanas' },
      sol: { dias: 7, label: '7 dias' },
      tabagismo: { dias: 28, label: '4 semanas' },
      pontos: { dias: 7, label: '7 dias (fio não reabsorvível)' }
    },
    sinaisAlerta: [
      'Dificuldade para respirar ou engolir',
      'Febre acima de 38°C',
      'Sangramento ativo, abundante ou que não cessa dentro da boca',
      'Dor intensa que não cede com a medicação prescrita',
      'Inchaço muito assimétrico, crescente e progressivo após as primeiras 48 horas',
      'Secreção purulenta ou com odor fétido na boca ou nas suturas internas',
      'Dificuldade progressiva para abrir a boca (trismo)',
      'Sensação de que algo está abrindo dentro da boca (deiscência das suturas internas)'
    ],
    cuidados: {
      higiene: 'A higiene oral é fundamental para evitar infecção nas suturas internas. Escove com cerdas macias e movimentos suaves, sem pressionar as suturas internas. Use enxaguante antisséptico suave conforme orientação. Após cada refeição, enxágue suavemente com água.',
      medicacao: 'Siga rigorosamente a prescrição do Dr. Gustavo. Complete o ciclo de antibiótico mesmo que se sinta bem antes do fim. Não substitua, adicione ou suspenda medicação sem consultar o Dr. Gustavo.',
      alimentacao: 'Nas primeiras 48 horas, apenas alimentos pastosos, macios e frios ou em temperatura ambiente, sem canudo (iogurte, purês frios, gelatina, sopas frias). Por pelo menos 7 dias, evite alimentos duros, crocantes ou fibrosos. Normalize gradualmente conforme o conforto.',
      posicao: 'Durma com a cabeça elevada nas primeiras 48 horas. Evite deitar de lado nas primeiras 24 a 48 horas para não aumentar a assimetria do edema.',
      atividade: 'Evite qualquer atividade física por pelo menos 2 semanas. O esforço aumenta a pressão na face e o risco de sangramento nas suturas internas. Atenção: o excesso de emagrecimento pós-procedimento pode comprometer o resultado estético.',
      sol: 'Evite exposição ao sol e ao calor por pelo menos 7 dias. Depois, use protetor solar FPS 50 normalmente. Sauna e ambientes muito quentes devem ser evitados nas primeiras semanas.',
      maquiagem: 'Maquiagem externa na face pode ser usada assim que confortável, sem pressionar as bochechas. Evite produtos que entrem em contato com a mucosa oral.',
      retorno: 'A retirada dos pontos intraorais ocorre em 7 dias, pois é utilizado fio não reabsorvível. Compareça a todas as consultas de retorno.'
    },
    faq: [
      { q: 'Minha bochecha está mais inchada do que antes da bichectomia. É normal?', a: 'Sim, é completamente normal. O edema pode deixar as bochechas mais cheias nos primeiros dias e diminui progressivamente. O resultado só pode ser avaliado entre 3 e 6 meses.' },
      { q: 'Os pontos da bichectomia precisam ser retirados?', a: 'Sim. É utilizado fio não reabsorvível, com retirada em 7 dias na consulta de retorno.' },
      { q: 'O resultado da bichectomia é permanente?', a: 'A gordura de Bichat removida não retorna, então o resultado é permanente. No entanto, variações de peso e o envelhecimento podem influenciar a aparência. O excesso de emagrecimento pode comprometer o resultado estético.' },
      { q: 'Posso usar canudo após a bichectomia?', a: 'Nas primeiras 48 horas o canudo é contraindicado, pois a pressão negativa pode prejudicar a cicatrização. Depois, pode ser retomado com cuidado.' }
    ]
  },

  'lobuloplastia': {
    nome: 'Lobuloplastia Cirúrgica',
    desc: 'Reconstrução cirúrgica do lóbulo da orelha rasgado, alargado ou com fenda.',
    categoria: 'cirurgico',
    placeholder: false,
    pode: [
      'Fazer a limpeza da região com soro fisiológico de 2 a 3 vezes ao dia, conforme orientação',
      'Aplicar pomada antibiótica sobre a cicatriz conforme orientação da equipe clínica',
      'Manter a região seca e protegida nas primeiras 24 horas',
      'Dormir de maneira que não pressione nem trace a orelha operada',
      'Usar protetor solar FPS 50 sobre a cicatriz após a retirada dos pontos'
    ],
    evite: [
      'Molhar a região nas primeiras 24 horas',
      'Usar brincos por pelo menos 30 dias, e depois apenas brincos leves',
      'Qualquer tração, puxão ou pressão sobre o lóbulo durante a cicatrização',
      'Exercício físico intenso por pelo menos 7 dias',
      'Manipular, coçar ou retirar as crostas que se formam sobre a cicatriz',
      'Fumar durante o período de recuperação'
    ],
    timeline: {
      'Primeiras 24 horas': 'Mantenha a região seca e protegida, sem molhar o local. A anestesia local vai perdendo efeito progressivamente, podendo surgir leve desconforto. Repouse e evite qualquer tração sobre a orelha.',
      'Primeiros dias': 'Inicie a limpeza com soro fisiológico de 2 a 3 vezes ao dia e aplique a pomada antibiótica conforme orientação. Pode haver leve inchaço e vermelhidão local, o que é esperado. Evite dormir sobre o lado operado.',
      '7 a 10 dias': 'A retirada dos pontos ocorre entre 7 e 10 dias, pois é utilizado fio não reabsorvível. Evite exercício físico intenso ao longo desse período.',
      'Até 30 dias': 'Após a retirada dos pontos, mantenha o protetor solar FPS 50 sobre a cicatriz. Não use brincos. A cicatriz pode apresentar mancha avermelhada e sensação de endurecimento, o que faz parte do processo.',
      'Após 30 dias': 'O uso de brincos leves pode ser retomado conforme a avaliação do Dr. Gustavo. Continue protegendo a cicatriz do sol.',
      '60 a 90 dias': 'Avaliação do resultado estável após maturação da cicatriz. A coloração e a textura tendem a se aproximar da pele ao redor, com aparência mais discreta.'
    },
    prazos: {
      exercicio: { dias: 7, label: '7 dias' },
      sol: { dias: 0, label: 'FPS 50 na cicatriz após os pontos' },
      tabagismo: { dias: 0, label: 'durante a recuperação' },
      pontos: { dias: 10, label: '7 a 10 dias (fio não reabsorvível)' }
    },
    sinaisAlerta: [
      'Febre acima de 38°C',
      'Sangramento ativo, abundante ou que não cessa na região operada',
      'Dor intensa que não cede com a medicação prescrita',
      'Inchaço crescente e progressivo após as primeiras 48 horas',
      'Secreção purulenta ou com odor fétido na cicatriz',
      'Vermelhidão muito intensa e calor local que pioram progressivamente',
      'Sensação de que a sutura está se abrindo (deiscência dos pontos)'
    ],
    cuidados: {
      higiene: 'Evite molhar a região nas primeiras 24 horas. Depois, faça a limpeza da cicatriz com soro fisiológico de 2 a 3 vezes ao dia, com movimentos suaves, e aplique a pomada antibiótica conforme orientação. Não retire nem manipule as crostas que se formam sobre a cicatriz.',
      medicacao: 'Siga rigorosamente a prescrição do Dr. Gustavo. Podem ser indicados analgésicos, anti-inflamatórios e pomada antibiótica de uso local. Não substitua, adicione ou suspenda medicação sem consultar a equipe clínica.',
      posicao: 'Evite dormir sobre o lado operado nos primeiros dias para não pressionar nem tracionar o lóbulo.',
      atividade: 'Evite exercício físico intenso por pelo menos 7 dias. A retomada das atividades deve ser gradual e conforme a liberação do Dr. Gustavo.',
      sol: 'Após a retirada dos pontos, use protetor solar FPS 50 sobre a cicatriz sempre que houver exposição, para prevenir o escurecimento e favorecer um resultado mais discreto.',
      retorno: 'A retirada dos pontos ocorre entre 7 e 10 dias, pois é utilizado fio não reabsorvível. Compareça a todas as consultas de retorno.'
    },
    faq: [
      { q: 'Quando posso usar brincos novamente após a lobuloplastia?', a: 'Recomenda-se aguardar pelo menos 30 dias e, ao retomar, optar por brincos leves. A liberação para um novo furo e brincos mais pesados é avaliada individualmente pelo Dr. Gustavo.' },
      { q: 'Os pontos da lobuloplastia precisam ser retirados?', a: 'Sim. É utilizado fio não reabsorvível, com retirada entre 7 e 10 dias na consulta de retorno.' },
      { q: 'É normal o lóbulo ficar avermelhado e endurecido?', a: 'Sim. Mancha avermelhada e sensação de endurecimento podem ocorrer nos primeiros 60 dias e fazem parte da cicatrização, suavizando progressivamente.' },
      { q: 'Quando vou ver o resultado estável?', a: 'O resultado estável após maturação da cicatriz é avaliado entre 60 e 90 dias após o procedimento.' }
    ]
  },

  /* ---------- PREENCHIMENTO FACIAL (com sub-selecao de regiao) ---------- */
  'preenchimento': {
    nome: 'Preenchimento Facial',
    desc: 'Aplicação de ácido hialurônico injetável.',
    categoria: 'preenchimento',
    placeholder: false,
    temRegioes: true,
    regioes: {
      'labial': {
        nome: 'Labial',
        pode: [
          'Hidratante labial suave após 24 horas (sem mentol, sem ácidos)',
          'Alimentar-se normalmente, evitando alimentos muito quentes nas primeiras horas'
        ],
        evite: [
          'Beijar ou pressionar os lábios nas primeiras 48 a 72 horas',
          'Usar canudo nas primeiras 48 a 72 horas',
          'Fazer biquinho ou movimentos exagerados com a boca nas primeiras 48 a 72 horas',
          'Fumar nas primeiras 48 horas (compromete a cicatrização e pode desencadear herpes labial)'
        ],
        cuidados: 'Em pacientes com histórico de herpes labial, informe a equipe antes do procedimento, pode haver profilaxia indicada. Evite movimentos labiais exagerados e pressão direta nos lábios por 48 a 72 horas.'
      },
      'nasal': {
        nome: 'Nasal (rinomodelação)',
        alertaAbsoluto: true,
        pode: [
          'Usar protetor solar FPS 50 normalmente após 24 horas'
        ],
        evite: [
          'Usar óculos (de grau, sol ou natação) por 14 dias',
          'Pressionar, esfregar ou apoiar a mão no nariz',
          'Maquiagem pesada na região do nariz por 7 dias',
          'Atividades que aumentem muito o fluxo sanguíneo facial nas primeiras 24 horas'
        ],
        cuidados: 'ATENÇÃO REDOBRADA: qualquer alteração de cor na pele do nariz (palidez, manchas brancas, arroxeadas ou avermelhadas com dor intensa) exige contato IMEDIATO com o Dr. Gustavo, mesmo de madrugada. Dor desproporcional ao esperado também é sinal de alerta urgente.'
      },
      'mandibula': {
        nome: 'Mandíbula',
        pode: [
          'Mastigação normal, preferindo alimentos mais macios nos primeiros 2 a 3 dias',
          'Analgésico simples se necessário, conforme orientação'
        ],
        evite: [
          'Pressionar, apoiar a mão ou dormir com pressão direta na região da mandíbula',
          'Mastigação de alimentos muito duros nos primeiros dias'
        ],
        cuidados: 'Desconforto, sensação de peso e dor leve a moderada são esperados nos primeiros dias. Pode haver sensação de rigidez ao toque por algumas semanas, faz parte da integração do produto. Edema pode parecer assimétrico nas primeiras 72 horas, isso é normal.'
      },
      'mento': {
        nome: 'Mento',
        pode: [
          'Analgésico simples se necessário, conforme orientação'
        ],
        evite: [
          'Pressionar a região do queixo',
          'Apoiar o queixo na mão nas primeiras 48 a 72 horas'
        ],
        cuidados: 'Desconforto e sensação de peso são esperados. Pode haver sensação de rigidez ao toque por algumas semanas, faz parte da integração do produto.'
      },
      'malar': {
        nome: 'Malar / Zigomas',
        pode: [
          'Dormir de barriga para cima nos primeiros 3 dias'
        ],
        evite: [
          'Deitar de lado nos primeiros 3 dias',
          'Pressionar a região com fones de ouvido, óculos pesados ou máscara apertada',
          'Tratamentos faciais (limpeza, massagem facial) por 14 dias'
        ],
        cuidados: 'Edema na região malar pode descer e parecer que está na bochecha ou na pálpebra inferior nas primeiras 48 horas, isso é normal. O sorriso pode ficar levemente diferente nos primeiros dias até o edema resolver.'
      },
      'olheiras': {
        nome: 'Olheiras',
        pode: [
          'Aplicar gelo de forma intermitente (compressa fria com pano limpo) nas primeiras 24 horas'
        ],
        evite: [
          'Pressionar a região das olheiras',
          'Esfregar ou massagear a área aplicada'
        ],
        cuidados: 'A região das olheiras é delicada. Use gelo intermitente nas primeiras 24 horas e não pressione a área. É possível ocorrer hematoma na região, que costuma se resolver em 7 a 14 dias.'
      },
      'fullface': {
        nome: 'Full Face',
        pode: [
          'Seguir os cuidados gerais de todas as regiões aplicadas'
        ],
        evite: [
          'Pressionar ou massagear qualquer região aplicada',
          'Deitar de lado nos primeiros 3 dias'
        ],
        cuidados: 'O Full Face é a técnica de preenchimento global da face e combina os cuidados de todas as regiões aplicadas. Siga, em conjunto, as orientações específicas de cada área tratada (labial, nasal, mandíbula, mento, malar e olheiras), conforme o que foi realizado.'
      },
      'topmodel': {
        nome: 'Top Model Look',
        pode: [
          'Dormir de barriga para cima nos primeiros 3 dias'
        ],
        evite: [
          'Dormir de lado por 3 dias',
          'Exercício físico por 48 horas',
          'Pressionar a região malar e o arco zigomático'
        ],
        cuidados: 'O Top Model Look trabalha a região malar e o arco zigomático. Evite dormir de lado por 3 dias e exercício físico por 48 horas. O edema pode ser mais intenso na região malar nas primeiras 48 a 72 horas, o que é esperado.'
      }
    },
    pode: [
      'Aplicar compressas frias com pano limpo nas primeiras 24 a 48 horas, sem gelo direto',
      'Maquiagem leve após 24 horas, com aplicação suave',
      'Usar protetor solar FPS 50 normalmente',
      'Voltar à rotina sedentária no mesmo dia'
    ],
    evite: [
      'Massagear a região aplicada',
      'Realizar limpeza de pele, peeling, laser ou outros tratamentos faciais por 14 dias',
      'Calor intenso (sauna, banho muito quente, exposição solar direta) por 48 horas',
      'Exercícios físicos intensos por 24 a 48 horas',
      'Gelo direto sobre a pele (apenas compressa fria com pano limpo)',
      'Bebidas alcoólicas em excesso nas primeiras 24 horas'
    ],
    timeline: {
      'Primeiras 24 horas': 'Edema, hematomas leves e sensibilidade local são esperados. Compressas frias com pano limpo nas primeiras horas. Posição vertical preferencial. Sem exercícios intensos.',
      'Primeiros 7 dias': 'Edema reduz gradualmente. Hematomas, se presentes, começam a clarear. Manter os cuidados específicos da região aplicada.',
      '7 a 14 dias': 'Sensibilidade ao toque diminui. Aspecto se torna mais natural à medida que o edema residual se resolve.',
      '2 a 4 semanas': 'Resultado mais próximo do final. Sensação de rigidez ao toque, quando presente em mandíbula, mento ou malar, vai integrando progressivamente.',
      '1 a 3 meses': 'Resultado estável após maturação. Avaliação de retoques, se necessários, é feita pelo Dr. Gustavo nesta fase.'
    },
    prazos: {
      exercicio: { dias: 2, label: '24 a 48 horas' },
      sol: { dias: 2, label: '48 horas (sol direto e calor intenso)' },
      maquiagem: { dias: 1, label: '24 horas' }
    },
    sinaisAlerta: [
      'Dor intensa e crescente que não responde a analgésico',
      'Alteração de cor da pele (palidez, manchas brancas, arroxeadas), especialmente urgente no nariz',
      'Bolhas, feridas ou áreas escurecidas na pele',
      'Visão alterada, dor ocular ou perda de visão (raro, mas grave)',
      'Febre, calafrios ou secreção na área aplicada'
    ],
    sinaisAlertaNasal: [
      'Alteração de cor da pele do nariz (palidez, manchas brancas, arroxeadas ou avermelhadas com dor intensa): contato IMEDIATO com o Dr. Gustavo, mesmo de madrugada',
      'Dor desproporcional ao esperado na região do nariz'
    ],
    cuidados: {
      higiene: 'Limpeza suave da pele com água e sabonete neutro. Evite massagear ou esfregar a região aplicada.',
      medicacao: 'Analgésico simples (paracetamol ou dipirona) pode ser usado se houver desconforto. Não tomar anti-inflamatórios não prescritos. Não usar aspirina por conta própria nas primeiras 24 horas.',
      atividade: 'Atividades sedentárias liberadas no mesmo dia. Exercícios físicos intensos somente após 24 a 48 horas.',
      sol: 'Evite sol direto e calor intenso (sauna, banho muito quente) nas primeiras 48 horas. Use protetor solar FPS 50 normalmente após 24 horas.',
      maquiagem: 'Maquiagem leve liberada após 24 horas, com aplicação suave. Evite ácidos e retinol na região por 7 dias.',
      retorno: 'O resultado pode levar até 30 dias para estabilizar com a completa resolução do edema. Avaliação de retoque, se indicado, é feita pelo Dr. Gustavo após 30 dias.'
    },
    faq: [
      { q: 'É normal sentir que a região aplicada está rígida?', a: 'Sim, principalmente em mandíbula, mento e malar pode haver sensação de rigidez ao toque por algumas semanas. Faz parte da integração do produto e melhora progressivamente.' },
      { q: 'Posso fazer outros tratamentos faciais depois do preenchimento?', a: 'Limpeza de pele, peeling, laser e tratamentos faciais devem aguardar 14 dias. Outros injetáveis e procedimentos específicos serão avaliados pelo Dr. Gustavo.' },
      { q: 'Quanto tempo para o resultado final aparecer?', a: 'O resultado começa a ficar evidente após 7 a 14 dias, com estabilidade em torno de 30 dias após a aplicação, com a completa resolução do edema.' },
      { q: 'Hematomas após o preenchimento são normais?', a: 'Sim, pequenos hematomas (manchas roxas) podem ocorrer e desaparecem em 7 a 14 dias. HIRUDOID gel 500mg pode ser aplicado nas manchas, evitando a região da incisão.' }
    ]
  },
  /* ---------- BIOESTIMULADOR (Radiesse) ---------- */
  'bioestimulador': {
    nome: 'Bioestimulador (Radiesse)',
    desc: 'Estímulo de colágeno injetável.',
    categoria: 'colageno',
    placeholder: false,
    pode: [
      'Realizar a massagem orientada pela equipe clínica nos primeiros 5 dias, com a técnica demonstrada na consulta',
      'Aplicar compressas frias com pano limpo nas primeiras horas, se houver desconforto',
      'Usar protetor solar FPS 50 diariamente',
      'Voltar à rotina sedentária no mesmo dia',
      'Usar analgésico simples se necessário, conforme orientação da equipe clínica'
    ],
    evite: [
      'Exercício físico intenso por 48 horas',
      'Calor intenso (sauna, banho muito quente, exposição solar direta) nas primeiras 48 horas',
      'Massagear a região fora da técnica e do período orientados pela equipe clínica',
      'Limpeza de pele, peeling, laser ou outros tratamentos faciais por 14 dias',
      'Bebidas alcoólicas em excesso nas primeiras 24 horas'
    ],
    timeline: {
      'Primeiras 24 horas': 'Inchaço e sensibilidade local são esperados. Compressas frias com pano limpo ajudam no conforto. Prefira atividades leves e evite exercício intenso.',
      'Primeiros 7 dias': 'Realize a massagem orientada pela equipe clínica conforme a técnica demonstrada na consulta nos primeiros 5 dias. O inchaço e a sensibilidade reduzem gradualmente. Aguarde 14 dias para retomar tratamentos faciais como limpeza de pele e laser.',
      '1 a 3 meses': 'O estímulo de colágeno é progressivo. O resultado estável aparece após maturação, em torno de 60 a 90 dias, com melhora de qualidade e sustentação da pele. A avaliação de nova sessão, se indicada, é feita pelo Dr. Gustavo.'
    },
    prazos: {
      exercicio: { dias: 2, label: '48 horas' },
      sol: { dias: 2, label: '48 horas (calor e sol direto)' }
    },
    sinaisAlerta: [
      'Dor intensa e crescente que não responde a analgésico',
      'Inchaço muito assimétrico e progressivo após os primeiros dias',
      'Nódulos endurecidos, dolorosos ou que aumentam de tamanho',
      'Alteração de cor da pele, bolhas ou áreas escurecidas',
      'Febre, calafrios ou secreção na área aplicada'
    ],
    cuidados: {
      higiene: 'Higiene suave da pele, sem esfregar a região aplicada nos primeiros dias.',
      medicacao: 'Analgésico simples pode ser usado se houver desconforto, conforme orientação da equipe clínica.',
      atividade: 'Atividades sedentárias liberadas no mesmo dia. Exercício físico intenso somente após 48 horas.',
      sol: 'Use protetor solar FPS 50 diariamente. Evite calor intenso e sol direto nas primeiras 48 horas.',
      retorno: 'A produção de colágeno é progressiva, com resultado estável após 60 a 90 dias. A massagem orientada nos primeiros 5 dias ajuda na distribuição uniforme do produto.'
    },
    faq: [
      { q: 'Preciso mesmo fazer a massagem após o bioestimulador?', a: 'Quando indicada, a massagem ajuda na distribuição uniforme do produto. Siga a técnica, a frequência e a duração orientadas pela equipe clínica nos primeiros 5 dias.' },
      { q: 'Quando vejo o resultado do bioestimulador?', a: 'A produção de colágeno é progressiva. O resultado estável aparece após a maturação, em torno de 60 a 90 dias.' }
    ]
  },

  /* ---------- LIPOLISE QUIMICA ---------- */
  'lipolise': {
    nome: 'Lipólise Química',
    desc: 'Aplicação injetável para redução de gordura localizada.',
    categoria: 'injetavel',
    placeholder: false,
    pode: [
      'Aplicar compressas frias com pano limpo nas primeiras horas, se houver desconforto',
      'Realizar drenagem linfática a partir do 3º dia, com profissional qualificado de escolha do paciente',
      'Manter boa hidratação e alimentação equilibrada',
      'Usar analgésico simples se necessário, conforme orientação da equipe clínica',
      'Voltar à rotina sedentária no mesmo dia'
    ],
    evite: [
      'Exercício físico intenso por 72 horas',
      'Calor intenso (sauna, banho muito quente) nas primeiras 48 horas',
      'Pressionar fortemente ou massagear a região fora da drenagem orientada',
      'Bebidas alcoólicas em excesso nas primeiras 24 horas',
      'Esperar resultado imediato em sessão única (o resultado é progressivo)'
    ],
    timeline: {
      'Primeiras 24 horas': 'Inchaço e endurecimento local são esperados e fazem parte do processo. Compressas frias com pano limpo ajudam no conforto. Evite calor intenso.',
      'Primeiros 7 dias': 'A drenagem linfática pode ser iniciada a partir do 3º dia, com profissional qualificado de escolha do paciente. O inchaço e o endurecimento começam a reduzir.',
      '7 a 14 dias': 'O inchaço e o endurecimento local reduzem progressivamente. A região vai ficando mais confortável.',
      '1 a 3 meses': 'As sessões costumam ser feitas com intervalo de 30 dias, em geral de 4 a 6 sessões. O resultado é progressivo e fica mais perceptível ao longo das sessões. A avaliação é feita pelo Dr. Gustavo a cada etapa.'
    },
    prazos: {
      exercicio: { dias: 3, label: '72 horas' },
      sol: { dias: 2, label: '48 horas (calor intenso)' }
    },
    sinaisAlerta: [
      'Dor intensa e crescente que não responde a analgésico',
      'Vermelhidão intensa, calor local, secreção ou pus na região aplicada',
      'Endurecimento muito doloroso, crescente ou com áreas escurecidas na pele',
      'Febre ou mal-estar geral',
      'Qualquer sintoma diferente do esperado ou que cause preocupação'
    ],
    cuidados: {
      higiene: 'Evite pressionar fortemente ou massagear a região fora da drenagem orientada.',
      medicacao: 'Analgésico simples pode ser usado se houver desconforto, conforme orientação da equipe clínica.',
      atividade: 'Evite exercício físico intenso por 72 horas, pois o esforço pode aumentar o inchaço na fase inicial.',
      retorno: 'O tratamento costuma exigir de 4 a 6 sessões, com intervalo de 30 dias entre elas. A drenagem linfática pode iniciar a partir do 3º dia, com profissional qualificado de escolha do paciente.'
    },
    faq: [
      { q: 'É normal a região ficar inchada e endurecida após a lipólise química?', a: 'Sim, inchaço e endurecimento local são esperados e costumam durar de 7 a 14 dias, fazendo parte do processo. Reduzem progressivamente.' },
      { q: 'Quando posso fazer drenagem linfática após a lipólise química?', a: 'A drenagem pode começar a partir do 3º dia, realizada por profissional qualificado de escolha do paciente.' },
      { q: 'Quantas sessões de lipólise química são necessárias?', a: 'Geralmente de 4 a 6 sessões, com intervalo de 30 dias, conforme a área e a resposta individual.' }
    ]
  },

  /* ---------- MICROAGULHAMENTO ---------- */
  'microagulhamento': {
    nome: 'Microagulhamento',
    desc: 'Estímulo de colágeno com microagulhas.',
    categoria: 'colageno',
    placeholder: false,
    pode: [
      'Trocar a fronha do travesseiro diariamente',
      'Usar toalha limpa e exclusiva para lavar e secar o rosto',
      'Lavar o rosto com água e sabonete neutro de glicerinha (Granado Bebê amarelo), com movimentos suaves',
      'Hidratar 2x ao dia com Cicalfate ou Cicaplast Baume B5',
      'Usar protetor solar FPS 50 por cima do hidratante (após absorção), a partir do 2º dia, de forma obrigatória',
      'Beber bastante água e manter a pele hidratada',
      'Usar analgésico simples se houver desconforto, conforme orientação da equipe clínica'
    ],
    evite: [
      'Maquiagem nas primeiras 24 horas',
      'Exercício físico intenso por 48 horas',
      'Exposição solar direta por 7 dias',
      'Esfoliantes e ácidos por 7 dias',
      'Coçar, esfregar ou descamar a pele manualmente',
      'Sauna, banho muito quente e calor intenso nas primeiras 48 horas'
    ],
    timeline: {
      'Primeiras 24 horas': 'A pele fica sensível e avermelhada, o que é esperado. Não use maquiagem neste período. Aplique o hidratante reparador conforme orientação e mantenha a pele limpa com movimentos suaves.',
      'Primeiros 7 dias': 'A vermelhidão e a sensibilidade reduzem gradualmente. A partir do 2º dia, o protetor solar FPS 50 é obrigatório. Pode haver leve descamação, que não deve ser removida manualmente. Evite exposição solar direta, esfoliantes e ácidos.',
      '2 a 4 semanas': 'O estímulo de colágeno está em andamento. A textura e o viço da pele começam a melhorar de forma progressiva. O microagulhamento costuma ser feito em sessões, conforme o planejamento do Dr. Gustavo.'
    },
    prazos: {
      exercicio: { dias: 2, label: '48 horas' },
      sol: { dias: 7, label: '7 dias (sol direto)' },
      maquiagem: { dias: 1, label: '24 horas' }
    },
    sinaisAlerta: [
      'Vermelhidão muito intensa que piora após 72 horas',
      'Inchaço importante, bolhas ou feridas na pele',
      'Sinais de infecção: dor intensa, calor local, secreção ou pus',
      'Febre ou mal-estar geral',
      'Qualquer reação na pele diferente do esperado ou que cause preocupação'
    ],
    cuidados: {
      higiene: 'Lave o rosto com água e sabonete neutro de glicerinha (Granado Bebê amarelo), com movimentos suaves. Troque a fronha do travesseiro diariamente e use uma toalha limpa e exclusiva para lavar e secar o rosto. Hidrate 2x ao dia com Cicalfate ou Cicaplast Baume B5. Após a absorção do hidratante, aplique o protetor solar FPS 50. Não coce, esfregue ou descame a pele manualmente.',
      medicacao: 'Analgésico simples pode ser usado se houver desconforto, conforme orientação da equipe clínica.',
      atividade: 'Evite exercício físico intenso por 48 horas.',
      sol: 'Protetor solar FPS 50 obrigatório a partir do 2º dia. Evite exposição solar direta por 7 dias.',
      maquiagem: 'Evite maquiagem nas primeiras 24 horas. Depois, prefira produtos suaves. Sem ácidos e esfoliantes por 7 dias.'
    },
    faq: [
      { q: 'Quando começo a usar protetor solar após o microagulhamento?', a: 'A partir do 2º dia o protetor solar FPS 50 é obrigatório, e a exposição solar direta deve ser evitada por 7 dias.' },
      { q: 'Posso usar maquiagem depois do microagulhamento?', a: 'Evite maquiagem nas primeiras 24 horas. Depois desse período, prefira produtos suaves.' }
    ]
  },

  /* ---------- PDRN ---------- */
  'pdrn': {
    nome: 'PDRN',
    desc: 'Estimulador biológico de regeneração tecidual.',
    categoria: 'colageno',
    placeholder: false,
    pode: [
      'Aplicar compressas frias com pano limpo de forma intermitente nas primeiras 24 horas, sem gelo direto',
      'Higiene suave da pele, sem esfregar a região aplicada',
      'Usar protetor solar FPS 50 desde o primeiro dia',
      'Manter boa hidratação',
      'Usar analgésico simples se necessário, conforme orientação da equipe clínica'
    ],
    evite: [
      'Massagear a região aplicada nos primeiros dias',
      'Exercício físico intenso por 48 horas',
      'Calor intenso (sauna, banho muito quente, exposição solar direta) nas primeiras 48 horas',
      'Maquiagem nas primeiras 24 horas (forma por microagulhamento)',
      'Esfoliantes e ácidos por 7 dias (forma por microagulhamento)'
    ],
    timeline: {
      'Primeiras 24 horas': 'Inchaço local de 24 a 72 horas e sensibilidade são esperados. Use compressas frias intermitentes nas primeiras 24 horas. Não massageie a região. Proteção solar FPS 50 desde o primeiro dia.',
      'Primeiros 7 dias': 'A sensibilidade reduz gradualmente. Na forma por microagulhamento, mantenha hidratante reparador (Cicaplast ou Cicalfate), fotoproteção FPS 50 a partir do 2º dia, sem maquiagem por 24 horas e sem ácidos por 7 dias.',
      '2 a 4 semanas': 'O resultado é progressivo. O PDRN costuma exigir múltiplas sessões para o resultado completo, conforme o planejamento do Dr. Gustavo.'
    },
    prazos: {
      exercicio: { dias: 2, label: '48 horas' },
      sol: { dias: 1, label: 'FPS 50 desde o 1º dia' }
    },
    sinaisAlerta: [
      'Dor intensa e crescente que não responde a analgésico',
      'Vermelhidão intensa, calor local, secreção ou pus na região aplicada',
      'Inchaço muito assimétrico e progressivo após as primeiras 72 horas',
      'Bolhas, feridas ou áreas escurecidas na pele',
      'Febre ou mal-estar geral'
    ],
    cuidados: {
      higiene: 'Higiene suave da pele, sem esfregar a região aplicada. Na forma por microagulhamento, use hidratante reparador (Cicaplast ou Cicalfate).',
      medicacao: 'Analgésico simples pode ser usado se necessário, conforme orientação da equipe clínica.',
      atividade: 'Evite exercício físico intenso por 48 horas.',
      sol: 'Use protetor solar FPS 50 desde o primeiro dia na forma injetada, e a partir do 2º dia na forma por microagulhamento.',
      retorno: 'O PDRN pode ser aplicado de forma injetada ou por microagulhamento, conforme decisão clínica caso a caso. O resultado é progressivo e costuma exigir múltiplas sessões.'
    },
    faq: [
      { q: 'O PDRN é aplicado injetado ou por microagulhamento?', a: 'O PDRN pode ser aplicado das duas formas. A escolha é feita caso a caso, conforme decisão clínica do Dr. Gustavo.' },
      { q: 'Quantas sessões de PDRN são necessárias?', a: 'O PDRN costuma exigir múltiplas sessões para o resultado completo, que é progressivo, conforme o planejamento do Dr. Gustavo.' }
    ]
  },

  /* ---------- iPRF / PRF ---------- */
  'iprf': {
    nome: 'iPRF / PRF (Plaquetas)',
    desc: 'Plaquetas autólogas, injetada ou por microagulhamento.',
    categoria: 'plaquetas',
    placeholder: false,
    pode: [
      'Aplicar compressas frias com pano limpo de forma intermitente nas primeiras 48 horas, sem gelo direto',
      'Higiene suave da pele, sem esfregar a região aplicada',
      'Usar protetor solar FPS 50 normalmente',
      'Manter boa hidratação',
      'Usar analgésico simples se necessário, conforme orientação da equipe clínica'
    ],
    evite: [
      'Massagear a região aplicada nos primeiros dias',
      'Exercício físico intenso por 48 horas',
      'Calor intenso (sauna, banho muito quente, exposição solar direta) nas primeiras 48 horas',
      'Esfregar ou pressionar fortemente a região tratada',
      'Bebidas alcoólicas em excesso nas primeiras 24 horas'
    ],
    timeline: {
      'Primeiras 24 horas': 'Inchaço leve e sensibilidade local podem ocorrer. Os cuidados dependem da forma de aplicação. Na forma por microagulhamento, mantenha a fotoproteção a partir do 2º dia.',
      'Primeiros 7 dias': 'A sensibilidade reduz gradualmente. A pele segue se recuperando. Na aplicação por microagulhamento, mantenha a fotoproteção e evite ácidos.',
      '2 a 4 semanas': 'O resultado de qualidade da pele é progressivo. O iPRF costuma ser feito em sessões, conforme o planejamento do Dr. Gustavo.'
    },
    prazos: {
      exercicio: { dias: 2, label: '48 horas' },
      sol: { dias: 2, label: '48 horas (sol direto)' }
    },
    sinaisAlerta: [
      'Dor intensa e crescente que não responde a analgésico',
      'Vermelhidão intensa, calor local, secreção ou pus na região tratada',
      'Inchaço muito assimétrico e progressivo após as primeiras 72 horas',
      'Bolhas, feridas ou áreas escurecidas na pele',
      'Febre ou mal-estar geral'
    ],
    cuidados: {
      higiene: 'Higiene suave da pele, sem esfregar a região aplicada. Não pressione fortemente a região tratada.',
      medicacao: 'Analgésico simples pode ser usado se necessário, conforme orientação da equipe clínica.',
      atividade: 'Evite exercício físico intenso por 48 horas.',
      sol: 'Use protetor solar FPS 50 normalmente. Na forma por microagulhamento, a fotoproteção é ainda mais importante a partir do 2º dia.',
      retorno: 'O iPRF pode ser aplicado de forma injetada ou por microagulhamento. O resultado de qualidade da pele é progressivo e costuma exigir sessões, conforme o planejamento do Dr. Gustavo.'
    },
    faq: [
      { q: 'Posso tomar sol depois do iPRF?', a: 'Evite exposição solar direta nas primeiras 48 horas e use protetor solar FPS 50. Na aplicação por microagulhamento, a fotoproteção é ainda mais importante a partir do 2º dia.' },
      { q: 'Quantas sessões de iPRF são necessárias?', a: 'O resultado de qualidade da pele é progressivo ao longo das semanas e costuma exigir sessões, conforme o planejamento do Dr. Gustavo.' }
    ]
  },

  /* ---------- PLASMA GEL ---------- */
  'plasma-gel': {
    nome: 'Plasma Gel',
    desc: 'Aplicação de plasma gel autólogo.',
    categoria: 'plaquetas',
    placeholder: false,
    pode: [
      'Aplicar compressas frias com pano limpo de forma intermitente nas primeiras 24 horas, sem gelo direto',
      'Manter a cabeça elevada ao dormir nas primeiras noites',
      'Higiene suave da pele, sem esfregar a região aplicada',
      'Usar protetor solar FPS 50 normalmente após 24 horas',
      'Usar analgésico simples se necessário, conforme orientação da equipe clínica'
    ],
    evite: [
      'Massagear a região aplicada por 5 dias',
      'Pressionar a região aplicada por 5 dias',
      'Exercício físico intenso por 48 horas',
      'Calor intenso (sauna, banho muito quente, exposição solar direta) nas primeiras 48 horas',
      'Maquiagem pesada sobre a região nas primeiras 24 horas'
    ],
    timeline: {
      'Primeiras 24 horas': 'Inchaço e sensibilidade local são esperados. Use compressas frias com pano limpo de forma intermitente. Prefira a posição com a cabeça elevada e não pressione a região.',
      'Primeiros 7 dias': 'O inchaço e a sensibilidade reduzem gradualmente. Não massageie nem pressione a região aplicada por 5 dias, para preservar o posicionamento do gel.',
      '1 a 3 meses': 'Na maioria das regiões, o efeito é de curta duração. Na região das olheiras, o resultado tende a durar mais tempo. O Plasma Gel pode ser repetido para manutenção, conforme a avaliação do Dr. Gustavo.'
    },
    prazos: {
      exercicio: { dias: 2, label: '48 horas' },
      sol: { dias: 2, label: '48 horas (calor e sol direto)' },
      maquiagem: { dias: 1, label: '24 horas (maquiagem pesada)' }
    },
    sinaisAlerta: [
      'Dor intensa e crescente que não responde a analgésico',
      'Alteração de cor da pele, bolhas ou áreas escurecidas na região aplicada',
      'Inchaço muito assimétrico e progressivo após as primeiras 72 horas',
      'Vermelhidão intensa, calor local, secreção ou pus',
      'Febre ou mal-estar geral'
    ],
    cuidados: {
      higiene: 'Higiene suave da pele, sem esfregar a região aplicada. Não massageie nem pressione a região por 5 dias.',
      medicacao: 'Analgésico simples pode ser usado se necessário, conforme orientação da equipe clínica.',
      atividade: 'Evite exercício físico intenso por 48 horas.',
      sol: 'Use protetor solar FPS 50 normalmente após 24 horas. Evite calor e sol direto nas primeiras 48 horas.',
      maquiagem: 'Evite maquiagem pesada sobre a região nas primeiras 24 horas.'
    },
    faq: [
      { q: 'Posso massagear a região após o Plasma Gel?', a: 'Não massageie nem pressione a região aplicada por 5 dias, para preservar o posicionamento do gel.' },
      { q: 'Quanto tempo dura o resultado do Plasma Gel?', a: 'A duração é variável: curta na maioria das regiões e mais prolongada na região das olheiras. O Plasma Gel pode ser repetido para manutenção.' }
    ]
  },

  /* ---------- FIOS PDO LISOS ---------- */
  'fios-lisos': {
    nome: 'Fios PDO Lisos',
    desc: 'Bioestimulação com fios lisos.',
    categoria: 'fios',
    placeholder: false,
    pode: [
      'Aplicar compressas frias com pano limpo nas primeiras horas, se houver desconforto',
      'Alimentar-se normalmente, sem restrição específica',
      'Higiene facial suave, sem esfregar a região tratada',
      'Dormir com a cabeça elevada nas primeiras noites',
      'Usar protetor solar FPS 50 normalmente',
      'Usar analgésico simples se necessário, conforme orientação da equipe clínica'
    ],
    evite: [
      'Massagem facial por 7 dias',
      'Exercício físico intenso por 48 horas',
      'Calor intenso (sauna, banho muito quente, exposição solar direta) nas primeiras 48 horas',
      'Pressionar, apoiar a mão ou manipular a região tratada nos primeiros dias',
      'Outros tratamentos faciais por 14 dias'
    ],
    timeline: {
      'Primeiras 24 horas': 'Edema discreto e leve sensibilidade podem ocorrer. Compressas frias com pano limpo ajudam no conforto. Prefira atividades leves.',
      'Primeiros 7 dias': 'O edema discreto, quando presente, tende a se resolver. Evite massagem facial. Mantenha a higiene suave e a fotoproteção.',
      '2 a 4 semanas': 'Aguarde até 14 dias para retomar outros tratamentos faciais. O estímulo de colágeno é progressivo, com melhora de qualidade e firmeza da pele ao longo das semanas.'
    },
    prazos: {
      exercicio: { dias: 2, label: '48 horas' },
      sol: { dias: 2, label: '48 horas (calor e sol direto)' }
    },
    sinaisAlerta: [
      'Dor intensa e crescente que não responde a analgésico',
      'Vermelhidão intensa, calor local ou secreção na região tratada',
      'Nódulos dolorosos ou irregularidades progressivas',
      'Febre ou mal-estar geral',
      'Qualquer sintoma diferente do esperado ou que cause preocupação'
    ],
    cuidados: {
      higiene: 'Higiene facial suave, sem esfregar a região tratada. Não pressione nem manipule a região nos primeiros dias.',
      medicacao: 'Analgésico simples pode ser usado se necessário, conforme orientação da equipe clínica.',
      atividade: 'Evite exercício físico intenso por 48 horas e massagem facial por 7 dias.',
      sol: 'Use protetor solar FPS 50 normalmente. Evite calor e sol direto nas primeiras 48 horas.',
      retorno: 'O estímulo de colágeno é progressivo, com melhora de qualidade e firmeza da pele ao longo das semanas.'
    },
    faq: [
      { q: 'Posso me alimentar normalmente após os fios lisos?', a: 'Sim, não há restrição alimentar específica para os fios lisos. Você pode se alimentar normalmente.' },
      { q: 'Quando posso fazer massagem facial após os fios lisos?', a: 'Evite massagem facial por 7 dias.' }
    ]
  },

  /* ---------- FIOS PDO DE TRACAO ---------- */
  'fios-tracao': {
    nome: 'Fios PDO Tração',
    desc: 'Fios para sustentação e lifting.',
    categoria: 'fios',
    placeholder: false,
    pode: [
      'Aplicar compressas frias com pano limpo nas primeiras 24 a 48 horas, sem gelo direto',
      'Dormir de barriga para cima por 7 dias, com a cabeça elevada',
      'Alimentar-se com alimentos macios nos primeiros dias',
      'Higiene facial suave, sem esfregar a região tratada',
      'Usar protetor solar FPS 50 normalmente',
      'Usar analgésico simples se necessário, conforme orientação da equipe clínica'
    ],
    evite: [
      'Mastigar alimentos duros por 7 dias',
      'Movimentos faciais amplos (rir gargalhando, abrir muito a boca) por 7 dias',
      'Dormir de lado ou de bruços por 7 dias',
      'Massagem facial por 30 dias',
      'Outros procedimentos faciais por 30 dias',
      'Exercício físico intenso por 48 a 72 horas',
      'Pressionar, apoiar a mão ou manipular a região tratada'
    ],
    timeline: {
      'Primeiras 24 horas': 'Edema e sensibilidade são esperados. Use compressas frias com pano limpo. Durma de barriga para cima com a cabeça elevada. Evite movimentos faciais amplos.',
      'Primeiros 7 dias': 'Mantenha as restrições principais: não mastigue alimentos duros, evite movimentos faciais amplos e durma de barriga para cima. O edema reduz gradualmente.',
      '7 a 14 dias': 'Hematomas, se presentes, vão clareando. A região fica mais confortável. Continue evitando massagem facial.',
      '2 a 4 semanas': 'Evite massagem facial e outros procedimentos faciais por 30 dias, para não interferir na acomodação dos fios e na estabilização do resultado.',
      '1 a 3 meses': 'Os tecidos estão mais acomodados. O resultado se torna mais natural. A avaliação de retoque ou nova sessão, se indicada, é feita pelo Dr. Gustavo.'
    },
    prazos: {
      exercicio: { dias: 3, label: '48 a 72 horas' },
      sol: { dias: 2, label: '48 horas (calor e sol direto)' }
    },
    sinaisAlerta: [
      'Dor intensa e crescente que não responde a analgésico',
      'Assimetria importante, ondulações ou irregularidades visíveis e progressivas',
      'Extrusão (sensação de que o fio está aparecendo ou saindo pela pele)',
      'Sinais de infecção: vermelhidão intensa, calor local, secreção ou pus',
      'Febre ou mal-estar geral'
    ],
    cuidados: {
      higiene: 'Higiene facial suave, sem esfregar a região tratada. Não pressione nem manipule a região.',
      alimentacao: 'Prefira alimentos macios nos primeiros dias. Não mastigue alimentos duros por 7 dias.',
      posicao: 'Durma de barriga para cima por 7 dias, com a cabeça elevada. Evite dormir de lado ou de bruços.',
      atividade: 'Evite exercício físico intenso por 48 a 72 horas, massagem facial e outros procedimentos faciais por 30 dias.',
      sol: 'Use protetor solar FPS 50 normalmente.',
      retorno: 'Os tecidos se acomodam ao longo das semanas. A avaliação de retoque ou nova sessão, se indicada, é feita pelo Dr. Gustavo após 30 dias.'
    },
    faq: [
      { q: 'Por que preciso comer alimentos macios após os fios de tração?', a: 'A mastigação intensa pode tracionar os fios antes da estabilização. Por isso, prefira alimentos macios por 7 dias.' },
      { q: 'Posso dormir de lado após os fios de tração?', a: 'Evite dormir de lado ou de bruços por 7 dias. Durma de barriga para cima com a cabeça elevada.' }
    ]
  },

  /* ---------- MINI-LIFTING FACIAL ---------- */
  'mini-lifting': {
    nome: 'Mini-Lifting Facial',
    desc: 'Lifting facial cirúrgico de recuperação reduzida.',
    categoria: 'cirurgico',
    placeholder: false,
    pode: [
      'Dormir com a cabeça elevada por 7 dias',
      'Aplicar compressas frias com pano limpo conforme orientação nas primeiras horas',
      'Realizar drenagem linfática a partir do 5º dia, com profissional qualificado de escolha do paciente',
      'Higiene suave da face, respeitando a região das suturas',
      'Usar protetor solar FPS 50 diariamente',
      'Tomar as medicações conforme orientação da equipe clínica'
    ],
    evite: [
      'Exercício físico intenso por 4 semanas',
      'Exposição solar direta por 4 semanas',
      'Fumar por 4 semanas após o procedimento (compromete a cicatrização)',
      'Dormir de lado ou pressionar a região operada nos primeiros dias',
      'Movimentos faciais amplos e esforço excessivo na primeira semana',
      'Manipular, coçar ou molhar excessivamente a região das suturas antes da liberação'
    ],
    timeline: {
      'Primeiras 24 horas': 'Edema e desconforto são esperados. Durma com a cabeça elevada e use compressas frias com pano limpo conforme orientação. Repouso é fundamental.',
      'Primeiros 7 dias': 'A drenagem linfática pode ser iniciada a partir do 5º dia, com profissional qualificado de escolha do paciente. A retirada dos pontos ocorre entre 7 e 10 dias, conforme avaliação. O edema continua reduzindo.',
      '2 a 4 semanas': 'Edema e hematoma vão se resolvendo. Liberação gradual de exercício físico e exposição solar após 4 semanas, conforme avaliação do Dr. Gustavo. Mantenha a abstinência de tabagismo por 4 semanas.',
      '1 a 3 meses': 'Resultado estável após maturação, em torno de 60 a 90 dias. Os tecidos estão acomodados e o contorno facial se apresenta de forma mais natural.'
    },
    prazos: {
      exercicio: { dias: 28, label: '4 semanas' },
      sol: { dias: 28, label: '4 semanas' },
      tabagismo: { dias: 28, label: '4 semanas' },
      pontos: { dias: 10, label: '7 a 10 dias' }
    },
    sinaisAlerta: [
      'Febre acima de 38°C',
      'Sangramento ativo ou abundante na região operada',
      'Dor intensa e desproporcional que não cede com a medicação orientada',
      'Inchaço muito assimétrico, crescente e progressivo após as primeiras 48 horas',
      'Secreção purulenta, odor fétido ou abertura das suturas',
      'Áreas de pele muito pálidas, arroxeadas ou escurecidas',
      'Qualquer sintoma que cause preocupação ou que seja diferente do esperado'
    ],
    cuidados: {
      higiene: 'Higiene suave da face, respeitando a região das suturas. Não manipule, coce ou molhe excessivamente a região antes da liberação.',
      medicacao: 'Tome as medicações conforme orientação da equipe clínica.',
      posicao: 'Durma com a cabeça elevada por 7 dias. Evite dormir de lado ou pressionar a região operada nos primeiros dias.',
      atividade: 'Evite exercício físico intenso por 4 semanas, com retomada gradual conforme liberação do Dr. Gustavo.',
      sol: 'Use protetor solar FPS 50 diariamente. Evite exposição solar direta por 4 semanas.',
      retorno: 'A retirada dos pontos ocorre entre 7 e 10 dias. A drenagem linfática pode iniciar a partir do 5º dia, com profissional qualificado de escolha do paciente.'
    },
    faq: [
      { q: 'Quando posso fazer drenagem linfática após o mini-lifting facial?', a: 'A drenagem pode começar a partir do 5º dia, realizada por profissional qualificado de escolha do paciente.' },
      { q: 'Quando posso voltar a fazer exercício e tomar sol após o mini-lifting?', a: 'Evite exercício físico intenso e exposição solar direta por 4 semanas, com retomada gradual conforme liberação do Dr. Gustavo.' }
    ]
  },

  /* ---------- CIRURGIAS ESTETICAS GENGIVAIS ---------- */
  'gengivais': {
    nome: 'Cirurgias Estéticas Gengivais',
    desc: 'Gengivoplastia, gengivectomia e aumento de coroa clínica.',
    categoria: 'cirurgico',
    placeholder: false,
    pode: [
      'Manter dieta líquida e fria nas primeiras 24 horas',
      'Manter dieta pastosa e fria por 3 a 5 dias',
      'Fazer limpeza da região operada com gaze umedecida em clorexidina 0,12%, conforme orientação da equipe clínica',
      'Fazer bochechos com clorexidina 0,12% duas vezes ao dia por 7 dias',
      'Aplicar compressas frias externas no rosto nas primeiras horas, se houver desconforto',
      'Tomar as medicações conforme orientação da equipe clínica'
    ],
    evite: [
      'Escovar a região operada por 7 dias (faça a limpeza com gaze e clorexidina, conforme orientação)',
      'Cuspir ou sugar nas primeiras 48 horas',
      'Alimentos quentes, duros, crocantes ou condimentados nos primeiros dias',
      'Bebidas alcoólicas durante o uso das medicações',
      'Fumar durante o período de recuperação (compromete a cicatrização gengival)',
      'Esforço físico intenso nos primeiros dias'
    ],
    timeline: {
      'Primeiras 24 horas': 'Pode haver sangramento leve, o que é normal. Mantenha dieta líquida e fria. Não cuspa nem sugue. Compressas frias externas no rosto ajudam no conforto.',
      'Primeiros 7 dias': 'Após 48 horas, inicie os bochechos com clorexidina 0,12% duas vezes ao dia. Mantenha dieta pastosa e fria por 3 a 5 dias. Faça a limpeza da região operada com gaze e clorexidina, sem escovar diretamente. Retorno de acompanhamento em 7 dias.',
      '2 a 4 semanas': 'Retorno de acompanhamento em 30 dias. A gengiva segue em processo de maturação.',
      '1 a 3 meses': 'Resultado estável após a maturação gengival, em torno de 30 a 60 dias. O contorno da gengiva se apresenta de forma mais definida e harmoniosa.'
    },
    prazos: {
      exercicio: { dias: 7, label: 'primeiros dias, conforme liberação' }
    },
    sinaisAlerta: [
      'Febre acima de 38°C',
      'Sangramento ativo, abundante ou que não cessa na região operada',
      'Dor intensa e desproporcional que não cede com a medicação orientada',
      'Secreção purulenta ou odor fétido na região operada',
      'Inchaço importante e progressivo após as primeiras 48 horas',
      'Qualquer sintoma que cause preocupação ou que seja diferente do esperado'
    ],
    cuidados: {
      higiene: 'Faça a limpeza da região operada com gaze umedecida em clorexidina 0,12%, sem escovar diretamente por 7 dias. Bochechos com clorexidina 0,12% duas vezes ao dia por 7 dias.',
      medicacao: 'Tome as medicações conforme orientação da equipe clínica. Evite bebidas alcoólicas durante o uso das medicações.',
      alimentacao: 'Dieta líquida e fria nas primeiras 24 horas, depois pastosa e fria por 3 a 5 dias. Evite alimentos quentes, duros, crocantes ou condimentados nos primeiros dias.',
      atividade: 'Evite esforço físico intenso nos primeiros dias.',
      retorno: 'Os retornos costumam ser agendados em 7 e 30 dias. O resultado fica estável após 30 a 60 dias, com a maturação gengival. Estas orientações não se aplicam a enxerto gengival.'
    },
    faq: [
      { q: 'É normal sangrar após a cirurgia gengival?', a: 'Sim, pode haver sangramento leve nas primeiras 24 horas, o que é normal. Sangramento ativo ou abundante que não cessa exige contato com a clínica.' },
      { q: 'Quando posso voltar a escovar a região operada?', a: 'Evite escovar a região operada por 7 dias. Faça a limpeza com gaze e clorexidina, conforme orientação, até a liberação no retorno.' }
    ]
  }
};

/* Rotulos amigaveis dos prazos numericos */
var PRAZO_ROTULOS = {
  exercicio: 'Exercício físico intenso',
  sol: 'Sol direto e fotoproteção rigorosa',
  maquiagem: 'Maquiagem na região operada',
  tabagismo: 'Tabagismo (abstinência no pós)',
  pontos: 'Retirada dos pontos',
  lentes: 'Lentes de contato',
  deitar: 'Manter posição vertical'
};

/* ============================================
   FUNCOES AUXILIARES
   ============================================ */

function normaliza(txt) {
  return txt.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9 ]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function dedupLista(itens) {
  var visto = {};
  var saida = [];
  for (var i = 0; i < itens.length; i++) {
    var chave = normaliza(itens[i]);
    if (!visto[chave]) {
      visto[chave] = true;
      saida.push(itens[i]);
    }
  }
  return saida;
}

/* Lista de codigos reais selecionados (sem placeholders) ordenada por categoria */
function ordenarPorCategoria(codigos) {
  return codigos.slice().sort(function (a, b) {
    var pa = PESO_CATEGORIA[PROCEDIMENTOS[a].categoria] || 0;
    var pb = PESO_CATEGORIA[PROCEDIMENTOS[b].categoria] || 0;
    return pb - pa;
  });
}

function consolidaPodeEvite(reais, mapaRegioes) {
  /* mapaRegioes: objeto opcional { 'preenchimento': ['labial','nasal'], ... } */
  mapaRegioes = mapaRegioes || {};
  var pode = [];
  var evite = [];
  reais.forEach(function (cod) {
    var p = PROCEDIMENTOS[cod];
    (p.pode || []).forEach(function (x) { pode.push(x); });
    (p.evite || []).forEach(function (x) { evite.push(x); });
    /* Adiciona itens regionais com prefixo identificador */
    if (p.temRegioes && p.regioes && mapaRegioes[cod] && mapaRegioes[cod].length) {
      mapaRegioes[cod].forEach(function (regCod) {
        var reg = p.regioes[regCod];
        if (!reg) return;
        var prefixo = '[' + reg.nome + '] ';
        (reg.pode || []).forEach(function (x) { pode.push(prefixo + x); });
        (reg.evite || []).forEach(function (x) { evite.push(prefixo + x); });
      });
    }
  });
  return { pode: dedupLista(pode), evite: dedupLista(evite) };
}

function consolidaTimeline(reais) {
  var resultado = [];
  HORIZONTES.forEach(function (h) {
    var partes = [];
    reais.forEach(function (cod) {
      var p = PROCEDIMENTOS[cod];
      if (p.timeline && p.timeline[h]) {
        if (reais.length > 1) {
          partes.push(p.timeline[h] + ' (' + p.nome + ')');
        } else {
          partes.push(p.timeline[h]);
        }
      }
    });
    if (partes.length) {
      resultado.push({ quando: h, texto: partes.join(' ') });
    }
  });
  return resultado;
}

/* Prazo mais restritivo por chave. dias null = sem prazo numerico (texto) */
function consolidaPrazos(reais) {
  var saida = [];
  var chaves = Object.keys(PRAZO_ROTULOS);
  chaves.forEach(function (chave) {
    var melhor = null;
    var valores = [];
    var temTexto = false;
    var labelTexto = '';
    reais.forEach(function (cod) {
      var pr = PROCEDIMENTOS[cod].prazos;
      if (pr && pr[chave]) {
        var item = pr[chave];
        if (item.dias === null || typeof item.dias === 'undefined') {
          temTexto = true;
          labelTexto = item.label;
        } else {
          valores.push(item.dias);
          if (!melhor || item.dias > melhor.dias) { melhor = item; }
        }
      }
    });
    if (melhor || temTexto) {
      if (temTexto) {
        /* Prazo condicionado a liberacao (sem dia fixo) e o mais restritivo:
           o paciente so libera com avaliacao do Dr. Gustavo. Vence o numerico. */
        var conflitoT = (melhor !== null) || (valores.length > 1);
        saida.push({ chave: chave, rotulo: PRAZO_ROTULOS[chave], label: labelTexto, conflito: conflitoT });
      } else {
        var conflito = false;
        for (var i = 0; i < valores.length; i++) {
          if (valores[i] !== melhor.dias) { conflito = true; break; }
        }
        saida.push({ chave: chave, rotulo: PRAZO_ROTULOS[chave], label: melhor.label, conflito: conflito });
      }
    }
  });
  return saida;
}

function consolidaSinaisAlerta(reais, mapaRegioes) {
  /* mapaRegioes: objeto opcional { 'preenchimento': ['labial','nasal'], ... } */
  mapaRegioes = mapaRegioes || {};
  var absolutos = [];  /* alertas absolutos (nasal) ficam no topo */
  var normais = [];
  reais.forEach(function (cod) {
    var p = PROCEDIMENTOS[cod];
    /* Se preenchimento com nasal selecionado, coloca sinais absolutos no topo */
    if (p.temRegioes && p.sinaisAlertaNasal && mapaRegioes[cod] &&
        mapaRegioes[cod].indexOf('nasal') !== -1) {
      p.sinaisAlertaNasal.forEach(function (s) {
        absolutos.push('ATENCAO REDOBRADA (Nasal): ' + s);
      });
    }
    (p.sinaisAlerta || []).forEach(function (s) { normais.push(s); });
  });
  return dedupLista(absolutos.concat(normais));
}

function consolidaFAQ(reais) {
  var todos = [];
  reais.forEach(function (cod) {
    (PROCEDIMENTOS[cod].faq || []).forEach(function (f) { todos.push(f); });
  });
  return todos;
}

/* ============================================
   RENDER
   ============================================ */

var CUIDADO_ROTULOS = {
  higiene: 'Higiene e limpeza',
  medicacao: 'Medicações',
  alimentacao: 'Alimentação',
  posicao: 'Sono e posição',
  atividade: 'Atividade física',
  sol: 'Sol e proteção solar',
  maquiagem: 'Maquiagem e cosméticos',
  retorno: 'Retorno e consultas'
};

var CUIDADO_ORDEM = ['higiene', 'medicacao', 'alimentacao', 'posicao', 'atividade', 'sol', 'maquiagem', 'retorno'];

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/* Subgrupo: cirurgias da regiao dos olhos, agrupadas dentro de cirurgico */
var CIRURGIAS_OLHOS = ['blefaro-superior', 'blefaro-inferior', 'brow-lift'];

function montarSeletor() {
  var alvo = document.getElementById('seletorCategorias');
  var html = '';
  CATEGORIAS.forEach(function (cat) {
    html += '<div class="seletor-categoria"><h3>' + cat.titulo + '</h3><div class="seletor-grid">';
    var subgrupoOlhosAberto = false;
    cat.codigos.forEach(function (cod) {
      var p = PROCEDIMENTOS[cod];
      if (!p) return;
        /* Subgrupo: cirurgias da regiao dos olhos - fecha grid, abre bloco, reabre grid ao sair */
        if (cat.id === 'cirurgico' && CIRURGIAS_OLHOS.indexOf(cod) !== -1 && !subgrupoOlhosAberto) {
          html += '</div><div class="seletor-subgrupo-bloco"><p class="seletor-subgrupo">Cirurgias da região dos olhos</p><div class="seletor-grid">';
          subgrupoOlhosAberto = true;
        } else if (cat.id === 'cirurgico' && CIRURGIAS_OLHOS.indexOf(cod) === -1 && subgrupoOlhosAberto) {
          html += '</div></div><div class="seletor-grid">';
          subgrupoOlhosAberto = false;
        });
        subselecaoHtml += '</div>';
      html += '<label class="seletor-card" data-cod="' + cod + '">' +
        '<input type="checkbox" value="' + cod + '">' +
        '<span class="check-visual"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>' +
        '<span class="card-text"><span class="card-nome">' + esc(p.nome) + '</span>' +
        '<span class="card-desc">' + esc(p.desc) + '</span>' +
        (p.placeholder ? '<span class="card-tag-placeholder">Consulte a equipe</span>' : '') +
        subselecaoHtml +
        '</span></label>';
    });
    html += '</div></div>';
  });
  alvo.innerHTML = html;
}

function getSelecionados() {
  /* Retorna apenas os codigos dos cards principais marcados (sem sub-checkboxes) */
  var inputs = document.querySelectorAll('#seletorCategorias input[type="checkbox"]:checked');
  var arr = [];
  inputs.forEach(function (i) {
    /* Sub-checkboxes possuem atributo data-pai; ignorar aqui */
    if (!i.hasAttribute('data-pai')) {
      arr.push(i.value);
    }
  });
  return arr;
}

function getRegioesSelecionadas(codigoPai) {
  /* Retorna array de codigos de regioes marcadas para um procedimento com temRegioes */
  var inputs = document.querySelectorAll(
    '#seletorCategorias input[type="checkbox"][data-pai="' + codigoPai + '"]:checked'
  );
  var regioes = [];
  inputs.forEach(function (i) { regioes.push(i.value); });
  return regioes;
}

function atualizarEstadoBotao() {
  var sel = getSelecionados();
  var btn = document.getElementById('btnVerOrientacoes');
  var contador = document.getElementById('seletorContador');
  btn.disabled = sel.length === 0;
  if (sel.length === 0) {
    contador.textContent = 'Nenhum procedimento selecionado';
  } else if (sel.length === 1) {
    contador.innerHTML = '<strong>1</strong> procedimento selecionado';
  } else {
    contador.innerHTML = '<strong>' + sel.length + '</strong> procedimentos selecionados';
  }
}

function renderResultado(selecionados, mapaRegioes) {
  /* mapaRegioes: objeto opcional { 'preenchimento': ['labial','nasal'], ... } */
  mapaRegioes = mapaRegioes || {};

  var reais = selecionados.filter(function (c) { return PROCEDIMENTOS[c] && !PROCEDIMENTOS[c].placeholder; });
  var placeholders = selecionados.filter(function (c) { return PROCEDIMENTOS[c] && PROCEDIMENTOS[c].placeholder; });
  reais = ordenarPorCategoria(reais);

  /* Tags, incluindo regioes do preenchimento se selecionadas */
  var tagsHtml = '';
  ordenarPorCategoria(selecionados.slice()).forEach(function (c) {
    var p = PROCEDIMENTOS[c];
    if (!p) return;
    var nomeExibir = p.nome;
    if (p.temRegioes && mapaRegioes[c] && mapaRegioes[c].length) {
      var nomesRegioes = mapaRegioes[c].map(function (rCod) {
        return p.regioes[rCod] ? p.regioes[rCod].nome : rCod;
      });
      nomeExibir += ' (' + nomesRegioes.join(', ') + ')';
    }
    tagsHtml += '<span class="proc-tag"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>' + esc(nomeExibir) + '</span>';
  });
  document.getElementById('procTags').innerHTML = tagsHtml;

  var html = '';

  if (reais.length === 0) {
    html += '<div class="placeholder-nota"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg><span>' + esc(NOTA_PLACEHOLDER) + '</span></div>';
  } else {
    /* 1. Pode / Evite */
    var pe = consolidaPodeEvite(reais, mapaRegioes);
    html += '<div class="orient-section"><h2>Resumo: o essencial</h2><div class="dual-box">';
    html += '<div class="box box-do"><h4>Pode</h4><ul>';
    pe.pode.forEach(function (x) { html += '<li>' + esc(x) + '</li>'; });
    html += '</ul></div><div class="box box-dont"><h4>Evite</h4><ul>';
    pe.evite.forEach(function (x) { html += '<li>' + esc(x) + '</li>'; });
    html += '</ul></div></div></div>';

    /* 2. Prazos mais restritivos */
    var prazos = consolidaPrazos(reais);
    if (prazos.length) {
      var temConflito = prazos.some(function (p) { return p.conflito; });
      html += '<div class="orient-section"><h2>Prazos a respeitar</h2>';
      if (temConflito) {
        html += '<div class="prazo-conflito"><strong>Atenção:</strong> Como você fez procedimentos com prazos diferentes, aplicamos sempre o prazo mais seguro (o mais restritivo). Conforme avaliação do Dr. Gustavo.</div>';
      }
      html += '<ul class="prazo-lista">';
      prazos.forEach(function (p) {
        html += '<li><span class="prazo-label">' + esc(p.rotulo) + (p.conflito ? ' <em>(prazo mais restritivo)</em>' : '') + '</span><span class="prazo-valor">' + esc(p.label) + '</span></li>';
      });
      html += '</ul></div>';
    }

    /* 3. Timeline unificada */
    var tl = consolidaTimeline(reais);
    if (tl.length) {
      html += '<div class="orient-section"><h2>Linha do tempo da recuperação</h2><div class="timeline">';
      tl.forEach(function (t) {
        html += '<div class="timeline-item"><h4>' + esc(t.quando) + '</h4><p>' + esc(t.texto) + '</p></div>';
      });
      html += '</div></div>';
    }

    /* 4. Cuidados detalhados por procedimento */
    html += '<div class="orient-section"><h2>Cuidados detalhados</h2>';
    reais.forEach(function (cod) {
      var p = PROCEDIMENTOS[cod];
      html += '<div class="cuidado-grupo"><h3>' + esc(p.nome) + '</h3>';
      CUIDADO_ORDEM.forEach(function (chave) {
        if (p.cuidados && p.cuidados[chave]) {
          html += '<div class="cuidado-item"><h4>' + CUIDADO_ROTULOS[chave] + '</h4><p>' + esc(p.cuidados[chave]) + '</p></div>';
        }
      });
      /* Sub-secao de cuidados por regiao, se aplicavel */
      if (p.temRegioes && p.regioes && mapaRegioes[cod] && mapaRegioes[cod].length) {
        html += '<div class="cuidados-regionais"><h4>Cuidados por região aplicada</h4>';
        mapaRegioes[cod].forEach(function (regCod) {
          var reg = p.regioes[regCod];
          if (!reg) return;
          html += '<div class="regiao-bloco">';
          html += '<h5>' + esc(reg.nome) + '</h5>';
          if (reg.cuidados) {
            var classeBloco = reg.alertaAbsoluto ? ' class="sinal-absoluto"' : '';
            html += '<p' + classeBloco + '>' + esc(reg.cuidados) + '</p>';
          }
          html += '</div>';
        });
        html += '</div>';
      }
      html += '<p class="frase-individual">' + esc(FRASE_INDIVIDUAL) + '</p></div>';
    });
    html += '</div>';

    /* 5. Sinais de alerta */
    var sinais = consolidaSinaisAlerta(reais, mapaRegioes);
    /* Verifica se ha sinais absolutos (nasal) para destaque */
    var temNasal = reais.some(function (cod) {
      return PROCEDIMENTOS[cod].temRegioes && mapaRegioes[cod] &&
             mapaRegioes[cod].indexOf('nasal') !== -1;
    });
    if (sinais.length) {
      html += '<div class="orient-section"><div class="sinais-alerta-box">' +
        '<div class="sinais-header"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>' +
        '<h3>Sinais de alerta</h3></div>' +
        '<p class="sinais-intro">Esses sinais são incomuns, mas exigem contato imediato com a clínica:</p><ul>';
      sinais.forEach(function (s) {
        /* Aplica destaque visual nos sinais absolutos (nasal) */
        var ehAbsoluto = temNasal && s.indexOf('ATENCAO REDOBRADA') === 0;
        if (ehAbsoluto) {
          html += '<li class="sinal-absoluto">' + esc(s) + '</li>';
        } else {
          html += '<li>' + esc(s) + '</li>';
        }
      });
      html += '</ul><p class="sinais-rodape">Em caso de dúvida, sempre prefira entrar em contato. WhatsApp da clínica: +55 21 99552-3509.</p></div></div>';
    }
  }

  /* Nota dos placeholders selecionados junto com reais */
  if (placeholders.length && reais.length > 0) {
    html += '<div class="orient-section"><h2>Procedimentos com orientações sob consulta</h2>';
    placeholders.forEach(function (c) {
      html += '<div class="placeholder-nota"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg><span><strong>' + esc(PROCEDIMENTOS[c].nome) + ':</strong> ' + esc(NOTA_PLACEHOLDER) + '</span></div>';
    });
    html += '</div>';
  }

  /* 6. FAQ unificada */
  var faq = consolidaFAQ(reais);
  if (faq.length) {
    html += '<div class="orient-section"><h2>Perguntas frequentes</h2><div class="orient-faq">';
    faq.forEach(function (f) {
      html += '<div class="orient-faq-item"><button class="orient-faq-question" aria-expanded="false">' + esc(f.q) + '</button><div class="orient-faq-answer"><p>' + esc(f.a) + '</p></div></div>';
    });
    html += '</div></div>';
  }

  /* Frase de individualizacao geral */
  html += '<p class="frase-individual" style="text-align:center;max-width:640px;margin:0 auto;">Estas orientações são gerais e podem ser ajustadas conforme o procedimento realizado, associação de técnicas, resposta individual e avaliação do Dr. Gustavo Martins.</p>';

  document.getElementById('resultadoConteudo').innerHTML = html;

  ativarFAQ();
  configurarSaida(selecionados, mapaRegioes);
}

function ativarFAQ() {
  document.querySelectorAll('.orient-faq-question').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.parentElement;
      var isActive = item.classList.contains('active');
      item.classList.toggle('active');
      btn.setAttribute('aria-expanded', String(!isActive));
    });
  });
}

/* ============================================
   SAIDA, query string, WhatsApp, impressao
   ============================================ */

/* Monta um resumo em texto puro das orientações combinadas, em linguagem neutra,
   para envio pelo WhatsApp. Usa Pode, Evite, Prazos e Sinais de alerta. */
function montarTextoOrientacoes(reais, mapaRegioes) {
  mapaRegioes = mapaRegioes || {};
  if (!reais || !reais.length) { return ''; }
  var partes = [];

  var pe = consolidaPodeEvite(reais, mapaRegioes);
  if (pe.pode.length) {
    partes.push('PODE:\n' + pe.pode.map(function (x) { return '- ' + x; }).join('\n'));
  }
  if (pe.evite.length) {
    partes.push('EVITE:\n' + pe.evite.map(function (x) { return '- ' + x; }).join('\n'));
  }

  var prazos = consolidaPrazos(reais);
  if (prazos.length) {
    partes.push('PRAZOS A RESPEITAR:\n' + prazos.map(function (p) {
      return '- ' + p.rotulo + ': ' + p.label + (p.conflito ? ' (prazo mais restritivo)' : '');
    }).join('\n'));
  }

  var sinais = consolidaSinaisAlerta(reais, mapaRegioes);
  if (sinais.length) {
    partes.push('SINAIS DE ALERTA (contato imediato com a clínica):\n' + sinais.map(function (s) {
      return '- ' + s;
    }).join('\n'));
  }

  return partes.join('\n\n') + '\n\n';
}

function configurarSaida(selecionados, mapaRegioes) {
  /* mapaRegioes: objeto opcional { 'preenchimento': ['labial','nasal'], ... } */
  mapaRegioes = mapaRegioes || {};
  var ordenados = ordenarPorCategoria(selecionados.slice());
  var nomes = ordenados.map(function (c) {
    var p = PROCEDIMENTOS[c];
    var nome = p.nome;
    if (p.temRegioes && mapaRegioes[c] && mapaRegioes[c].length) {
      var nomesRegioes = mapaRegioes[c].map(function (rCod) {
        return p.regioes[rCod] ? p.regioes[rCod].nome : rCod;
      });
      nome += ' (' + nomesRegioes.join(', ') + ')';
    }
    return nome;
  });
  /* Monta codigos: procedimentos com regioes ficam como 'preenchimento:labial,nasal' */
  var codigosParts = ordenados.map(function (c) {
    var p = PROCEDIMENTOS[c];
    if (p.temRegioes && mapaRegioes[c] && mapaRegioes[c].length) {
      return c + ':' + mapaRegioes[c].join(',');
    }
    return c;
  });
  var codigos = codigosParts.join(',');
  var urlBase = 'https://www.clinicagustavomartins.com.br/orientacoes/minhas-orientacoes';
  var urlComQuery = urlBase + '?p=' + codigos;

  var listaTexto = nomes.join(', ');

  /* Considera apenas procedimentos com orientações reais (sem placeholders) */
  var reais = ordenados.filter(function (c) { return PROCEDIMENTOS[c] && !PROCEDIMENTOS[c].placeholder; });

  /* Monta o corpo com o conteúdo das orientações combinadas, em texto neutro,
     para que possa ser usado tanto pelo paciente quanto pela equipe da clínica. */
  var corpo = montarTextoOrientacoes(reais, mapaRegioes);

  var msg = 'Olá! Aqui seguem as orientações pós-procedimento referentes ao(s) procedimento(s) realizado(s): ' + listaTexto + '.\n\n' +
    corpo +
    'Consulte a versão completa em: ' + urlComQuery + '\n\n' +
    'Em caso de dúvidas, entre em contato com a equipe da clínica.';
  var btnWhats = document.getElementById('btnWhatsApp');
  btnWhats.href = 'https://wa.me/5521995523509?text=' + encodeURIComponent(msg);

  /* Atualiza a URL do navegador sem recarregar, para facilitar compartilhamento */
  if (window.history && window.history.replaceState) {
    window.history.replaceState(null, '', '?p=' + codigos);
  }
}

function parseQueryString() {
  /* Retorna { codigos: [], mapaRegioes: {} }
     Aceita formato 'toxina,preenchimento:labial,nasal,lip-lift'
     onde 'preenchimento:labial,nasal' usa ':' como separador de regioes */
  var params = new URLSearchParams(window.location.search);
  var p = params.get('p');
  if (!p) return { codigos: [], mapaRegioes: {} };

  var codigos = [];
  var mapaRegioes = {};
  var segmentos = p.split(',');
  var i = 0;
  while (i < segmentos.length) {
    var seg = segmentos[i].trim();
    /* Verifica se tem ':' indicando codigo:regiao */
    if (seg.indexOf(':') !== -1) {
      var partes = seg.split(':');
      var codigoPai = partes[0].trim();
      var primeiraRegiao = partes[1].trim();
      if (PROCEDIMENTOS[codigoPai] && PROCEDIMENTOS[codigoPai].temRegioes) {
        codigos.push(codigoPai);
        mapaRegioes[codigoPai] = [primeiraRegiao];
        /* Regioes seguintes vem como segmentos simples ate encontrar outro codigo valido */
        i++;
        while (i < segmentos.length) {
          var proximo = segmentos[i].trim();
          /* Se eh um codigo de procedimento valido, para de coletar regioes */
          if (PROCEDIMENTOS[proximo] || proximo.indexOf(':') !== -1) break;
          /* Verifica se eh uma regiao valida do procedimento pai */
          if (PROCEDIMENTOS[codigoPai].regioes && PROCEDIMENTOS[codigoPai].regioes[proximo]) {
            mapaRegioes[codigoPai].push(proximo);
          }
          i++;
        }
        continue;
      }
    }
    /* Codigo simples (sem regioes) */
    if (PROCEDIMENTOS[seg]) {
      codigos.push(seg);
    }
    i++;
  }
  return { codigos: codigos, mapaRegioes: mapaRegioes };
}

function marcarCheckboxes(codigos, mapaRegioes) {
  /* mapaRegioes: objeto opcional { 'preenchimento': ['labial','nasal'], ... } */
  mapaRegioes = mapaRegioes || {};
  codigos.forEach(function (cod) {
    /* Marca o card principal (sem data-pai) */
    var input = document.querySelector('#seletorCategorias input[value="' + cod + '"]:not([data-pai])');
    if (input) {
      input.checked = true;
      input.closest('.seletor-card').classList.add('is-checked');
    }
    /* Marca as sub-regioes, se houver */
    if (mapaRegioes[cod] && mapaRegioes[cod].length) {
      mapaRegioes[cod].forEach(function (regCod) {
        var subInput = document.querySelector(
          '#seletorCategorias input[data-pai="' + cod + '"][value="' + regCod + '"]'
        );
        if (subInput) {
          subInput.checked = true;
        }
      });
    }
  });
}

function mostrarResultado(selecionados, viaQuery, mapaRegioes) {
  /* mapaRegioes: objeto opcional { 'preenchimento': ['labial','nasal'], ... } */
  mapaRegioes = mapaRegioes || {};
  renderResultado(selecionados, mapaRegioes);
  var bloco = document.getElementById('resultadoBloco');
  bloco.classList.add('is-visible');
  document.getElementById('notaPrePreenchido').style.display = viaQuery ? 'flex' : 'none';
  /* rola ate o resultado */
  setTimeout(function () {
    bloco.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 80);
}

/* Coleta mapaRegioes do DOM para todos os procedimentos com temRegioes */
function coletarMapaRegioesDom(selecionados) {
  var mapa = {};
  selecionados.forEach(function (cod) {
    var p = PROCEDIMENTOS[cod];
    if (p && p.temRegioes) {
      mapa[cod] = getRegioesSelecionadas(cod);
    }
  });
  return mapa;
}

/* ============================================
   INICIALIZACAO
   ============================================ */
document.addEventListener('DOMContentLoaded', function () {
  montarSeletor();

  /* sincroniza estado visual do card ao marcar;
     usa delegacao para cobrir sub-checkboxes criados dinamicamente */
  document.getElementById('seletorCategorias').addEventListener('change', function (e) {
    var input = e.target;
    if (input.type !== 'checkbox') return;
    /* Sub-checkboxes (data-pai) nao alteram is-checked do card */
    if (!input.hasAttribute('data-pai')) {
      input.closest('.seletor-card').classList.toggle('is-checked', input.checked);
      atualizarEstadoBotao();
    }
    /* Subcheck: nao precisa mudar o botao, mas nao quebra nada */
  });

  document.getElementById('btnVerOrientacoes').addEventListener('click', function () {
    var sel = getSelecionados();
    if (sel.length) {
      var mapa = coletarMapaRegioesDom(sel);
      mostrarResultado(sel, false, mapa);
    }
  });

  document.getElementById('btnImprimir').addEventListener('click', function () {
    window.print();
  });

  /* Query string pre-preenchida */
  var fromQuery = parseQueryString();
  if (fromQuery.codigos.length) {
    marcarCheckboxes(fromQuery.codigos, fromQuery.mapaRegioes);
    atualizarEstadoBotao();
    mostrarResultado(fromQuery.codigos, true, fromQuery.mapaRegioes);
  } else {
    atualizarEstadoBotao();
  }
});
