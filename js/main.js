/* ============================================================
   똑심 마음연구소 — Main JavaScript
   ============================================================ */

const STORE_URL = 'https://kmong.com/gig/766983';

/* ─── Mobile Menu ─── */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
  document.addEventListener('click', e => {
    if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
      mobileMenu.classList.remove('open');
    }
  });
}

/* ─── Scroll Reveal ─── */
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
revealEls.forEach(el => observer.observe(el));

/* ─── Quiz Modal ─── */
const QUIZ = {
  NAMES: { tci:'TCI 기질·성격', kocean:'K-OCEAN 5요인 성격', golden:'GOLDEN 성격유형', rs:'RS 회복탄력성', kiri:'KiRi 대인관계', pai:'PAI 성격평가', cst:'CST 성격강점', sct:'SCT 문장완성', mlst:'MLST-II 학습전략', kcmii:'KCMII-2 전공선택', sts:'STS 6요인 기질', pat:'PAT-2 부모양육태도', neo:'NEO 성격', mindfit:'MindFit 적응역량', cat:'CAT-2 대학적응력', ieej:'IEEJ 직무스트레스' },
  HREF: { tci:'tci', kocean:'kocean', golden:'golden', rs:'rs', kiri:'kiri', pai:'pai', cst:'cst', sct:'sct', mlst:'mlst', kcmii:'kcmii', sts:'sts', pat:'pat', neo:'neo', mindfit:'mindfit', cat:'cat', ieej:'ieej' },

  Q1: [
    { v:'self',    label:'나 자신' },
    { v:'couple',  label:'커플 · 부부' },
    { v:'child',   label:'우리 아이' },
    { v:'student', label:'학생 (진로·학업)' },
  ],
  Q2: {
    self: { q:'지금 가장 큰 고민은 무엇인가요?', opts:[
      { v:'personality', label:'내 성격과 타고난 기질이 궁금해요' },
      { v:'mind',        label:'마음이 지치고 감정 조절이 힘들어요' },
      { v:'relation',    label:'사람 관계가 자꾸 비슷하게 꼬여요' },
      { v:'work',        label:'직장 스트레스·번아웃이 심해요' },
      { v:'career',      label:'진로·이직 방향을 다시 잡고 싶어요' },
      { v:'univ',        label:'대학 생활 적응이 어려워요' },
    ]},
    couple: { q:'어떤 상황인가요?', opts:[
      { v:'fight',   label:'같은 일로 자주 다퉈요' },
      { v:'marry',   label:'결혼 전에 서로를 알고 싶어요' },
      { v:'check',   label:'지금 관계를 점검하고 싶어요' },
    ]},
    child: { q:'아이가 몇 살인가요?', opts:[
      { v:'infant', label:'0~7세 (영유아)' },
      { v:'school', label:'8~12세 (초등)' },
      { v:'teen',   label:'13~18세 (청소년)' },
    ]},
    student: { q:'무엇이 가장 고민인가요?', opts:[
      { v:'career', label:'전공·진로를 못 정하겠어요' },
      { v:'study',  label:'공부법·집중력이 고민이에요' },
      { v:'mental', label:'시험 때마다 멘탈이 흔들려요' },
    ]},
  },
  // 경로별 [가볍게, 기본, 깊게] — 문자열: 패키지 키(pkg_) 또는 단품 키, 객체: 맞춤 조합(단품 여러 개로 담김)
  // 깊이가 올라갈수록 같은 고민 안에서 검사가 더해지도록(가격도 올라가도록) 구성
  MAP: {
    'self+personality': ['kocean', 'pkg_personality', 'pkg_neo'],
    'self+mind':        ['rs', 'pkg_mental', { title:'마음 회복 심층 패키지', tests:['tci','rs','pai','sct'], why:'기질(TCI)과 회복탄력성(RS)에 PAI 성격평가를 더해 지금의 정서 상태까지 함께 살핍니다. SCT는 무료로 포함돼요.' }],
    'self+relation':    ['kiri', 'pkg_relation1', { title:'관계 패턴 심층 패키지', tests:['tci','kiri','pai','sct'], why:'타고난 기질(TCI)과 관계 패턴(KiRi)에 PAI를 더해, 관계에서 반복되는 반응의 뿌리까지 봅니다. SCT는 무료로 포함돼요.' }],
    'self+work':        ['ieej', { title:'번아웃 기본 케어', tests:['ieej','rs'], why:'직무 스트레스(IEEJ)가 얼마나 쌓였는지와 버틸 힘(RS 회복탄력성)이 얼마나 남았는지를 함께 봅니다.' }, 'pkg_burnout'],
    'self+career':      ['kcmii', { title:'진로 기본 패키지', tests:['kcmii','cst'], why:'흥미에 맞는 전공·직무 방향(KCMII-2)과 나의 성격 강점(CST)을 함께 봅니다.' }, 'pkg_career'],
    'self+univ':        ['cat', 'pkg_univ', { title:'대학생 적응 심층 패키지', tests:['cat','mindfit','rs','tci'], why:'대학 적응력, 적응 역량, 회복탄력성에 타고난 기질(TCI)까지 더해 어려움의 원인을 함께 봅니다.' }],
    'couple+fight':     [{ title:'커플 기질 비교', tests:['tci','tci'], why:'두 사람이 각자 TCI를 받아 타고난 기질 차이와 부딪히는 지점을 비교합니다.' }, 'pkg_couple', null],
    'couple+marry':     [{ title:'커플 기질 비교', tests:['tci','tci'], why:'두 사람이 각자 TCI를 받아 타고난 기질 차이와 부딪히는 지점을 비교합니다.' }, 'pkg_couple', null],
    'couple+check':     [{ title:'커플 기질 비교', tests:['tci','tci'], why:'두 사람이 각자 TCI를 받아 타고난 기질 차이와 부딪히는 지점을 비교합니다.' }, 'pkg_couple', null],
    'child+infant':     ['sts', 'pkg_parenting_infant', { title:'영유아 가족 기질 패키지', tests:['sts','pat','tci'], why:'아이 기질(STS)과 양육태도(PAT-2)에 부모의 타고난 기질(TCI)까지 더해 아이와 부모의 기질 조합을 봅니다.' }],
    'child+school':     ['tci', 'pkg_parenting_school', { title:'학령기 가족 기질 패키지', tests:['tci','pai','pat','tci'], why:'자녀 검사에 부모의 TCI까지 더해 아이와 부모의 기질이 어떻게 맞물리는지 봅니다.' }],
    'child+teen':       ['tci', 'pkg_teen', { title:'청소년 + 부모 양육 패키지', tests:['tci','golden','cst','pat'], why:'청소년 성장 패키지에 부모 양육태도(PAT-2)를 더해 아이와 부모 양쪽을 함께 봅니다.' }],
    'student+career':   ['kcmii', 'pkg_career', { title:'진로·멘탈 풀케어', tests:['kcmii','tci','cst','rs','sct'], why:'전공 방향, 기질, 강점에 회복탄력성까지 더해 진로와 멘탈을 함께 봅니다. SCT는 무료로 포함돼요.' }],
    'student+study':    ['mlst', { title:'학습 기본 패키지', tests:['mlst','tci'], why:'공부 습관과 전략(MLST-II)에 타고난 기질(TCI)을 더해 나에게 맞는 공부 방식을 찾습니다.' }, 'pkg_exam'],
    'student+mental':   ['rs', { title:'시험 멘탈 기본 패키지', tests:['rs','tci'], why:'회복탄력성(RS)과 기질(TCI)로 시험 때 흔들리는 이유와 버틸 힘을 함께 봅니다.' }, 'pkg_exam'],
  },
  LEVELS: [
    { label:'가볍게', sub:'검사 1개로 핵심만' },
    { label:'기본',   sub:'2~3개 묶음으로 원인까지' },
    { label:'깊게',   sub:'더 넓게, 더 깊이' },
  ],

  init() {
    document.querySelectorAll('[data-quiz-open]').forEach(b => b.addEventListener('click', e => { e.preventDefault(); this.open(); }));
    const ov = document.getElementById('quizOverlay');
    document.getElementById('quizClose')?.addEventListener('click', () => this.close());
    ov?.addEventListener('click', e => { if (e.target === ov) this.close(); });
  },
  open()  { this.q1 = this.q2 = null; this.level = 1; this.step1(); document.getElementById('quizOverlay').classList.add('open'); },
  close() { document.getElementById('quizOverlay').classList.remove('open'); },

  progress(n) { return `<div class="quiz-progress">${[0,1,2].map(i => `<span class="${i < n ? 'done' : ''}"></span>`).join('')}</div>`; },
  options(list, fn) {
    return `<div class="quiz-options">${list.map(o => `<button class="quiz-option" data-v="${o.v}">${o.label}${o.sub ? `<small style="display:block;font-weight:400;opacity:.7">${o.sub}</small>` : ''}</button>`).join('')}</div>`;
  },
  render(html, onPick) {
    const body = document.getElementById('quizBody'); body.innerHTML = html;
    body.querySelectorAll('.quiz-option').forEach(b => b.addEventListener('click', () => { b.classList.add('selected'); setTimeout(() => onPick(b.dataset.v), 180); }));
    body.querySelector('[data-back]')?.addEventListener('click', () => this[body.querySelector('[data-back]').dataset.back]());
  },
  back(to) { return `<button type="button" class="quiz-back" data-back="${to}">← 이전</button>`; },

  step1() {
    this.render(this.progress(0) + `<div class="quiz-step active"><h4>누구를 위한 검사인가요?</h4>${this.options(this.Q1)}</div>`,
      v => { this.q1 = v; this.step2(); });
  },
  step2() {
    const q = this.Q2[this.q1];
    this.render(this.progress(1) + `<div class="quiz-step active"><h4>${q.q}</h4>${this.options(q.opts)}${this.back('step1')}</div>`,
      v => { this.q2 = v; this.step3(); });
  },
  avail() { return (this.MAP[`${this.q1}+${this.q2}`] || []).map((k, i) => k ? i : -1).filter(i => i >= 0); },
  step3() {
    const av = this.avail();
    if (av.length === 1) { this.level = av[0]; return this.result(); }
    const opts = av.map(i => ({ v: i, label: this.LEVELS[i].label, sub: this.LEVELS[i].sub }));
    this.render(this.progress(2) + `<div class="quiz-step active"><h4>얼마나 자세히 보고 싶으세요?</h4>${this.options(opts)}${this.back('step2')}</div>`,
      v => { this.level = +v; this.result(); });
  },

  item(key) {
    const prices = JSON.parse(localStorage.getItem('ttok_live_prices') || 'null') || (typeof TEST_PRICES !== 'undefined' ? TEST_PRICES : {});
    const uniq = keys => [...new Set(keys)].map(k => this.NAMES[k] + (keys.filter(x => x === k).length > 1 ? ' ×' + keys.filter(x => x === k).length : '') + (k === 'sct' ? ' (무료)' : ''));
    if (typeof key === 'object') {
      const { total, discounted, rate } = computePkgPrice(key.tests);
      return { type:'combo', key, title:key.title, tests:uniq(key.tests), why:key.why, total, price:discounted, rate };
    }
    if (key.startsWith('pkg_')) {
      const p = PKG_INFO[key]; const { total, discounted, rate } = computePkgPrice(p.testKeys);
      return { type:'pkg', key, title:p.title.replace(/^[^가-힣A-Za-z]+/, ''), tests:uniq(p.testKeys), why:p.why || '', total, price:discounted, rate };
    }
    const price = prices[key]?.price || 0;
    return { type:'unit', key, title:this.NAMES[key] + ' 검사', tests:[this.NAMES[key]], why:'', total:price, price, rate:0 };
  },
  won(n) { return '₩' + n.toLocaleString('ko-KR'); },

  result() {
    const map = this.MAP[`${this.q1}+${this.q2}`];
    const av = this.avail();
    const r = this.item(map[this.level]);
    const tabs = av.length > 1 ? `<div class="qr-tabs">${av.map(i => { const it = this.item(map[i]); return `<button type="button" class="qr-tab${i === this.level ? ' on' : ''}" data-lv="${i}"><b>${this.LEVELS[i].label}</b><span>${this.won(it.price)}</span></button>`; }).join('')}</div>` : '';
    const priceHtml = r.rate > 0
      ? `<span class="qr-old">${this.won(r.total)}</span> <b class="qr-price">${this.won(r.price)}</b> <span class="qr-badge">${Math.round(r.rate * 100)}% 할인</span>`
      : `<b class="qr-price">${this.won(r.price)}</b>`;
    const detail = r.type === 'pkg'
      ? `<button type="button" class="btn btn-outline qr-btn" id="qrDetail">구성 자세히</button>`
      : r.type === 'unit' ? `<a class="btn btn-outline qr-btn" href="pages/${this.HREF[r.key]}.html">검사 자세히</a>` : '';
    this.render(this.progress(3) + `
      <div class="quiz-result show">
        ${tabs}
        <p class="qr-kicker">${this.LEVELS[this.level].label} · ${this.LEVELS[this.level].sub}</p>
        <div class="qr-card">
          <h4 class="qr-title">${r.title}</h4>
          <div class="qr-tests">${r.tests.map(t => `<span>${t}</span>`).join('')}</div>
          ${r.why ? `<p class="qr-why">${r.why.length > 90 ? r.why.slice(0, 90) + '…' : r.why}</p>` : ''}
          <div class="qr-pricebox">${priceHtml}</div>
          <p class="qr-note">결과지 + 종합 해석 보고서 + AI 해석 프롬프트 포함</p>
        </div>
        <div class="qr-actions" style="${detail ? '' : 'grid-template-columns:1fr'}">
          <button type="button" class="btn btn-primary qr-btn" id="qrAdd">장바구니에 담기</button>
          ${detail}
        </div>
        ${this.back('step2')}
      </div>`, () => {});
    const body = document.getElementById('quizBody');
    body.querySelector('#qrAdd').addEventListener('click', () => {
      if (r.type === 'pkg') quickAddCart(r.key, 'pkg');
      else if (r.type === 'unit') quickAddCart(r.key, 'unit');
      else r.key.tests.forEach(k => quickAddCart(k, 'unit'));
      setTimeout(() => { location.href = 'pages/cart.html'; }, 500);
    });
    body.querySelector('#qrDetail')?.addEventListener('click', () => { this.close(); setTimeout(() => openPkgModal(r.key), 120); });
    body.querySelectorAll('.qr-tab').forEach(b => b.addEventListener('click', () => { this.level = +b.dataset.lv; this.result(); }));
  }
};

/* ─── Package Price Calculator ─── */
function charmPrice(n) {
  return Math.floor(n / 1000) * 1000; // 천원 미만 절삭
}

function getDiscount(paidCount, hasTci) {
  let rate = 0;
  if (paidCount >= 4) rate = 0.15;
  else if (paidCount === 3) rate = 0.10;
  else if (paidCount === 2) rate = 0.05;
  if (hasTci && rate > 0) rate -= 0.03; // TCI 포함 시 3%p 덜 할인 (원가 부담)
  return rate;
}

function computePkgPrice(testKeys) {
  const saved  = JSON.parse(localStorage.getItem('ttok_live_prices') || 'null');
  const prices = saved || (typeof TEST_PRICES !== 'undefined' ? TEST_PRICES : {});
  const paidKeys = testKeys.filter(k => k !== 'sct' && !(prices[k]?.free));
  const hasTci   = paidKeys.includes('tci');
  const total    = paidKeys.reduce((sum, k) => sum + (prices[k]?.price || 0), 0);
  const rate     = getDiscount(paidKeys.length, hasTci);
  const raw      = Math.round(total * (1 - rate));
  return { total, discounted: charmPrice(raw), rate };
}

/* ─── Package Modal Data ─── */
const PKG_INFO = {
  pkg_personality: {
    icon: '🌟', title: '기질·성격 기본 패키지',
    tags: ['TCI', 'K-OCEAN'],
    testKeys: ['tci', 'kocean'],
    why: 'TCI는 "타고난 기질"을, K-OCEAN은 "현재 드러나는 성격"을 측정합니다. 하나는 내 안의 하드웨어, 하나는 소프트웨어—두 렌즈를 함께 쓸 때 나를 가장 입체적으로 이해할 수 있습니다.',
    steps: [
      { icon: '🧬', name: 'TCI 기질 및 성격검사', desc: '유전적으로 타고난 기질 4차원 + 성장한 성격 3차원을 분석합니다.' },
      { icon: '🌊', name: 'K-OCEAN 5요인 성격검사', desc: '현재 나의 행동 방식—개방성·성실성·외향성·친화성·신경증을 측정합니다.' }
    ]
  },
  pkg_mental: {
    icon: '💚', title: '마음 회복 패키지',
    tags: ['TCI', 'RS 회복탄력성', 'SCT 🎁무료'],
    testKeys: ['tci', 'rs', 'sct'],
    why: 'TCI로 기질적 취약성(왜 나는 이렇게 반응하는가)을 이해하고, RS로 현재의 회복 능력을 점검하며, SCT로 무의식 속의 내면 목소리까지 탐색합니다. SCT는 이 패키지에 무료로 포함됩니다.',
    steps: [
      { icon: '🧬', name: 'TCI 기질 및 성격검사', desc: '내가 유독 힘든 상황의 기질적 원인을 이해합니다.' },
      { icon: '💚', name: 'RS 회복탄력성검사', desc: '현재 나의 심리적 회복 능력 수준을 객관적으로 파악합니다.' },
      { icon: '💬', name: 'SCT 문장완성검사 (무료 포함)', desc: '무의식의 욕구·감정·갈등을 자유롭게 탐색합니다.' }
    ]
  },
  pkg_relation: {
    icon: '🤝', title: '대인관계 패키지',
    tags: ['KiRi', 'PAI / PAI-A'],
    testKeys: ['kiri', 'pai'],
    why: 'KiRi는 나의 관계 패턴과 대인 욕구를, PAI는 성격 전반과 임상적 특성을 심층 분석합니다. 왜 같은 상황에서 같은 반응이 반복되는지—그 뿌리까지 이해할 수 있습니다.',
    steps: [
      { icon: '🤝', name: 'KiRi 통합적 대인관계검사', desc: '나의 대인관계 패턴과 핵심 욕구를 통합적으로 분석합니다.' },
      { icon: '🔬', name: 'PAI / PAI-A 성격평가 질문지', desc: '성격 전반과 임상적 특성을 정밀하게 측정합니다.' }
    ]
  },
  pkg_teen: {
    icon: '🌱', title: '청소년 성장 패키지',
    tags: ['JTCI 12-18', 'GOLDEN 청소년', 'CST-A'],
    testKeys: ['tci', 'golden', 'cst'],
    why: 'JTCI로 타고난 기질의 뿌리를, GOLDEN으로 현재 성격 유형의 선호를, CST로 고유한 강점을 발견합니다. 청소년이 자기 자신을 가장 입체적으로 이해하고 미래를 설계할 수 있는 조합입니다.',
    steps: [
      { icon: '🧬', name: 'JTCI 12-18 기질검사', desc: '타고난 기질 4차원으로 나의 뿌리를 이해합니다.' },
      { icon: '✨', name: 'GOLDEN 골든성격유형검사', desc: '현재 성격 유형 선호도로 나의 행동 방식을 파악합니다.' },
      { icon: '⭐', name: 'CST 성격강점검사', desc: '24가지 강점 중 나만의 대표 강점을 발견합니다.' }
    ]
  },
  pkg_couple: {
    icon: '💑', title: '커플 핏 패키지',
    tags: ['TCI × 2인', 'KiRi × 2인'],
    testKeys: ['tci', 'tci', 'kiri', 'kiri'],
    why: '두 사람이 같은 검사를 받고 결과를 비교할 때 진짜 이해가 시작됩니다. TCI로 기질의 차이를, KiRi로 각자의 관계 패턴을 비교해 "왜 우리는 이런 방식으로 갈등하는가"를 과학적으로 이해하세요.',
    steps: [
      { icon: '🧬', name: 'TCI 기질 및 성격검사 × 2인', desc: '두 사람의 기질 차이와 상호작용 방식을 비교 분석합니다.' },
      { icon: '🤝', name: 'KiRi 대인관계검사 × 2인', desc: '각자의 관계 패턴을 파악하고 갈등의 구조를 이해합니다.' }
    ]
  },
  pkg_exam: {
    icon: '📚', title: '수험생 케어 패키지',
    tags: ['JTCI 12-18', 'MLST-II', 'RS 회복탄력성', 'CST-A'],
    testKeys: ['tci', 'mlst', 'rs', 'cst'],
    why: '기질(JTCI)로 나에게 맞는 학습 방식을 이해하고, 학습 전략(MLST-II)으로 공부법의 강점과 약점을 점검하며, 회복탄력성(RS)으로 번아웃을 예방하고, 강점(CST)으로 나만의 공부 에너지를 찾습니다.',
    steps: [
      { icon: '🧬', name: 'JTCI 12-18 기질검사', desc: '기질별 최적 학습 방식과 스트레스 취약점을 파악합니다.' },
      { icon: '📚', name: 'MLST-II 학습전략검사', desc: '동기·인지·행동·정서 4대 학습 전략을 정밀 진단합니다.' },
      { icon: '💚', name: 'RS 회복탄력성검사', desc: '시험 스트레스에 버티는 심리적 회복 능력을 측정합니다.' },
      { icon: '⭐', name: 'CST 성격강점검사', desc: '나만의 강점을 활용한 공부 에너지를 찾아줍니다.' }
    ]
  },
  pkg_parenting_infant: {
    icon: '🍼', title: '영유아 자녀 이해 패키지',
    tags: ['STS', 'PAT-2'],
    testKeys: ['sts', 'pat'],
    why: '0~7세 미취학 자녀를 위한 패키지입니다. STS 6요인 기질검사는 영아·유아의 타고난 기질을 6가지 요인과 직관적인 동물 유형으로 분석해, 아이의 행동·정서 반응의 뿌리를 이해하도록 돕습니다. 여기에 PAT-2 부모양육태도검사를 더하면 아이의 기질과 부모의 양육 방식이 서로 잘 맞는지, 어디에서 기질 불일치가 생기는지를 과학적으로 확인하고 맞춤 양육법을 찾을 수 있습니다.',
    steps: [
      { icon: '🦎', name: 'STS 6요인 기질검사 (미취학 아동용)', desc: '0~7세 자녀의 타고난 기질을 6요인(활동성·규칙성·접근성·적응성·반응강도·기분)과 동물 유형으로 직관적으로 파악합니다.' },
      { icon: '🏠', name: 'PAT-2 부모양육태도검사', desc: '부모의 양육 방식(온정·자율·성취압력·거부·과보호·일관성)을 점검하고 아이의 기질에 맞는 양육 방향을 찾습니다.' }
    ]
  },
  pkg_parenting_school: {
    icon: '📚', title: '학령기 자녀 이해 패키지',
    tags: ['JTCI', 'PAI-A', 'PAT-2'],
    testKeys: ['tci', 'pai', 'pat'],
    why: '8~18세 자녀의 기질(JTCI)과 성격 전반(PAI-A)을 파악하고, PAT-2로 부모의 양육 방식까지 진단합니다. 갈등을 "나쁜 아이"가 아닌 "기질 차이"로 이해하게 되는 조합입니다.',
    steps: [
      { icon: '🧬', name: 'JTCI 기질검사 (8~18세)', desc: '아동·청소년의 기질을 7차원으로 분석해 맞춤 양육의 출발점을 잡습니다.' },
      { icon: '🔬', name: 'PAI-A 성격평가', desc: '자녀의 성격 전반과 심리적 특성을 정밀하게 측정합니다.' },
      { icon: '🏠', name: 'PAT-2 부모양육태도검사', desc: '부모의 양육 방식을 점검하고 가족 역동을 함께 이해합니다.' }
    ]
  },
  pkg_career: {
    icon: '🧭', title: '진로·전공 설계 패키지',
    tags: ['KCMII-2', 'CST', 'TCI'],
    testKeys: ['kcmii', 'cst', 'tci'],
    why: 'KCMII-2로 활동·직업·전공교과 선호도를, CST로 나만의 고유한 강점을, TCI로 기질에 맞는 일의 스타일을 종합 탐색합니다. 흥미·강점·기질 세 가지가 만나면 "내가 잘할 수 있는 일"과 "내가 즐길 수 있는 일"이 명확해집니다.',
    steps: [
      { icon: '🎓', name: 'KCMII-2 전공선택검사', desc: '활동·직업·전공교과 3가지 선호도로 흥미·적성에 맞는 전공과 직업 방향을 탐색합니다.' },
      { icon: '⭐', name: 'CST 성격강점검사', desc: '나만의 고유한 강점 24가지 중 상위 강점을 발견하고 진로에 연결합니다.' },
      { icon: '🧬', name: 'TCI 기질 및 성격검사', desc: '타고난 기질에 맞는 직업 환경과 일의 스타일을 이해합니다.' }
    ]
  },
  pkg_work: {
    icon: '💼', title: '직장인 성장 패키지',
    tags: ['TCI', 'K-OCEAN', 'KiRi'],
    testKeys: ['tci', 'kocean', 'kiri'],
    why: 'TCI로 직장 내 반복 패턴의 기질적 원인을, K-OCEAN으로 현재 나의 행동 방식을, KiRi로 대인관계 패턴과 갈등 구조를 이해합니다. 조직 안에서 나를 가장 입체적으로 파악할 수 있는 조합입니다.',
    steps: [
      { icon: '🧬', name: 'TCI 기질 및 성격검사', desc: '직장에서 반복되는 행동·감정 패턴의 기질적 뿌리를 이해합니다.' },
      { icon: '🌊', name: 'K-OCEAN 5요인 성격검사', desc: '현재 나의 업무 방식—성실성·외향성·친화성 등을 객관적으로 측정합니다.' },
      { icon: '🤝', name: 'KiRi 통합적 대인관계검사', desc: '직장 내 관계 패턴과 갈등의 핵심 욕구를 통합적으로 분석합니다.' }
    ]
  },
  pkg_neo: {
    icon: '🔭', title: '심층 성격 탐색 패키지',
    tags: ['TCI', 'NEO 네오'],
    testKeys: ['tci', 'neo'],
    why: 'TCI는 "타고난 기질"을, NEO는 "현재의 성격 특성"을 5요인 30하위요인으로 정밀 측정합니다. 두 검사 모두 Big Five 이론을 기반으로 하지만 측정 방식이 달라, 함께 받으면 가장 깊고 정확한 자기이해를 완성할 수 있습니다.',
    steps: [
      { icon: '🧬', name: 'TCI 기질 및 성격검사', desc: '유전적으로 타고난 기질 4차원 + 성장한 성격 3차원을 분석합니다.' },
      { icon: '🔭', name: 'NEO 네오 성격검사', desc: '신경질·외향성·개방성·우호성·성실성 5요인을 각 6개 하위요인으로 세분화해 30개 지표로 정밀 분석합니다.' }
    ]
  },
  pkg_univ: {
    icon: '🏛️', title: '대학생 적응 패키지',
    tags: ['CAT-2', 'MindFit', 'RS 회복탄력성'],
    testKeys: ['cat', 'mindfit', 'rs'],
    why: 'CAT-2로 대학 적응 수준과 중도탈락 위험도를 진단하고, MindFit으로 심리적 자원과 스트레스 원인을 파악하며, RS로 역경에서 회복하는 힘을 점검합니다. 대학생활 전반의 심리적 상태를 한번에 이해할 수 있는 최적의 조합입니다.',
    steps: [
      { icon: '🏛️', name: 'CAT-2 대학적응력검사 2판', desc: '학업적·심리적·사회적·기관적 측면에서 대학 적응 수준과 중도탈락 위험을 진단합니다.' },
      { icon: '🧩', name: 'MindFit 마인드핏 적응역량검사', desc: '적응지수·적응역량·스트레스 3개 영역으로 심리적 자원과 취약점을 파악합니다.' },
      { icon: '💚', name: 'RS 회복탄력성검사', desc: '7가지 요인으로 심리적 회복 능력을 측정하고 강화 방법을 찾습니다.' }
    ]
  },
  pkg_burnout: {
    icon: '🔥', title: '직장인 번아웃 케어 패키지',
    tags: ['IEEJ', 'TCI', 'RS 회복탄력성'],
    testKeys: ['ieej', 'tci', 'rs'],
    why: 'IEEJ로 감정노동·번아웃의 현재 수준과 원인 척도를 진단하고, TCI로 기질적으로 어떤 스트레스에 취약한지 이해하며, RS로 번아웃에서 회복하는 힘을 측정합니다. 번아웃의 진단부터 원인 이해·회복까지 완결되는 조합입니다.',
    steps: [
      { icon: '💼', name: 'IEEJ 통합직무스트레스검사', desc: '감정노동·일의 의미 소실·업무 능력 저하·자기 불신 4개 척도로 번아웃 수준을 정밀 진단합니다.' },
      { icon: '🧬', name: 'TCI 기질 및 성격검사', desc: '기질적으로 어떤 직무 스트레스에 취약한지 근본 원인을 이해합니다.' },
      { icon: '💚', name: 'RS 회복탄력성검사', desc: '7가지 요인으로 번아웃 회복 가능성과 강화 방법을 찾습니다.' }
    ]
  },
  pkg_deepdive: {
    icon: '🔬', title: '심층 성격 분석 패키지',
    tags: ['TCI', 'PAI'],
    testKeys: ['tci', 'pai'],
    why: 'TCI로 타고난 기질의 구조와 성장한 성격을 파악하고, PAI로 성격 전반·임상적 특성·심리적 자원까지 22개 척도로 심층 분석합니다. 일상적인 자기이해를 넘어 심리적 취약성과 강점의 가장 깊은 층위까지 도달하는 전문가 추천 조합입니다.',
    steps: [
      { icon: '🧬', name: 'TCI 기질 및 성격검사', desc: '유전적으로 타고난 기질 4차원 + 성장한 성격 3차원을 분석합니다.' },
      { icon: '🔬', name: 'PAI 성격평가 질문지', desc: '성격 전반·임상적 특성·치료 고려 변인까지 22개 척도로 정밀 측정합니다.' }
    ]
  },
  pkg_relation1: {
    icon: '🤝', title: '관계 패턴 분석 패키지',
    tags: ['TCI', 'KiRi'],
    testKeys: ['tci', 'kiri'],
    why: 'TCI로 대인관계에서 반복되는 기질적 패턴(왜 이런 상황에서 이렇게 반응하는가)을 이해하고, KiRi로 나의 관계 욕구와 갈등 구조를 13개 척도로 통합 분석합니다. 혼자서도 관계 문제의 뿌리까지 과학적으로 접근할 수 있는 최적의 1인 조합입니다.',
    steps: [
      { icon: '🧬', name: 'TCI 기질 및 성격검사', desc: '대인관계에 영향을 주는 기질적 특성과 성격 구조를 분석합니다.' },
      { icon: '🤝', name: 'KiRi 통합적 대인관계검사', desc: '나의 대인관계 패턴과 핵심 욕구를 13개 척도로 통합적으로 분석합니다.' }
    ]
  }
};

/* ─── Package Modal Logic ─── */
const pkgOverlay = document.getElementById('pkgModalOverlay');

function openPkgModal(key) {
  const d = PKG_INFO[key];
  if (!d || !pkgOverlay) return;

  const _ic = document.getElementById('pkgMIcon'); if (_ic) _ic.textContent = d.icon;
  document.getElementById('pkgMTitle').textContent = d.title;
  document.getElementById('pkgMTags').innerHTML    = d.tags.map(t => `<span class="tag">${t}</span>`).join('');
  document.getElementById('pkgMWhy').textContent   = d.why;
  document.getElementById('pkgMSteps').innerHTML   = d.steps.map((s, i) => `
    <div class="pkg-step" style="animation-delay:${i * .1}s">
      <div class="pkg-step-num">${i + 1}</div>
      <div class="pkg-step-content">
        <h5>${s.icon} ${s.name}</h5>
        <p>${s.desc}</p>
      </div>
    </div>`).join('');

  const ctaEl = document.getElementById('pkgMCta');
  const pkgUrl = (typeof STORE_LINKS !== 'undefined' && STORE_LINKS[key])
    ? STORE_LINKS[key]
    : (typeof CONTACT_URL !== 'undefined' ? CONTACT_URL : STORE_URL);
  if (ctaEl) ctaEl.href = pkgUrl;

  // 복사+문의 버튼 (기존 버튼 제거 후 재삽입)
  const existingCopyBtn = document.getElementById('pkgMCopyBtn');
  if (existingCopyBtn) existingCopyBtn.remove();
  if (ctaEl) {
    const copyBtn = document.createElement('button');
    copyBtn.id = 'pkgMCopyBtn';
    copyBtn.className = 'btn-copy-inquiry';
    copyBtn.innerHTML = '📋 문의 내용 복사 후 크몽 가기';
    copyBtn.onclick = () => {
      const msg = `${d.title} 문의드립니다.`;
      const openStore = () => window.open(pkgUrl, '_blank');
      const afterCopy = () => {
        copyBtn.textContent = '✅ 복사 완료! 크몽으로 이동합니다…';
        copyBtn.classList.add('copied');
        setTimeout(openStore, 800);
      };
      if (navigator.clipboard) {
        navigator.clipboard.writeText(msg).then(afterCopy).catch(() => {
          const ta = document.createElement('textarea');
          ta.value = msg; document.body.appendChild(ta);
          ta.select(); document.execCommand('copy'); ta.remove();
          afterCopy();
        });
      } else {
        const ta = document.createElement('textarea');
        ta.value = msg; document.body.appendChild(ta);
        ta.select(); document.execCommand('copy'); ta.remove();
        afterCopy();
      }
    };
    ctaEl.before(copyBtn);
  }

  const priceEl = document.getElementById('pkgMPrice');
  if (priceEl && d.testKeys) {
    const { total, discounted, rate } = computePkgPrice(d.testKeys);
    if (total > 0) {
      priceEl.style.display = 'flex';
      const pct = Math.round(rate * 100);
      priceEl.innerHTML =
        `<span class="pkg-price-original">정가 ₩${total.toLocaleString('ko-KR')}</span>` +
        `<span class="pkg-price-discount">₩${discounted.toLocaleString('ko-KR')}</span>` +
        `<span class="pkg-price-badge">패키지 ${pct}% 할인</span>`;
    }
  }

  pkgOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closePkgModal() {
  if (pkgOverlay) pkgOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

/* ─── Quick Cart Add ─── */
function quickAddCart(key, type) {
  const storageKey = type === 'pkg' ? 'ttok_quick_cart_pkg' : 'ttok_quick_cart';
  const cart = JSON.parse(localStorage.getItem(storageKey) || '{}');
  cart[key] = (cart[key] || 0) + 1;
  localStorage.setItem(storageKey, JSON.stringify(cart));

  // Toast
  let toast = document.getElementById('cart-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'cart-toast';
    document.body.appendChild(toast);
  }
  toast.textContent = '🛒 장바구니에 담겼어요!';
  toast.style.opacity = '1';
  toast.style.transform = 'translateX(-50%) translateY(0)';
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(20px)';
  }, 2000);
}

/* ─── Inject Quick-Cart Buttons into test/package cards ─── */
function injectCartButtons() {
  // 검사 카드 (tests.html의 .test-card)
  document.querySelectorAll('.test-card').forEach(card => {
    if (card.querySelector('.btn-quick-cart')) return;
    const link = card.querySelector('a.btn');
    if (!link) return;
    const href = link.getAttribute('href') || '';
    const key = href.replace(/^.*\//, '').replace('.html', '');
    if (!key) return;
    const btn = document.createElement('button');
    btn.className = 'btn-quick-cart';
    btn.innerHTML = '🛒 담기';
    btn.addEventListener('click', e => { e.preventDefault(); e.stopPropagation(); quickAddCart(key, 'test'); });
    card.appendChild(btn);
  });

  // 패키지 카드 (packages.html의 .pkg-hero-card, .pkg-small-card)
  document.querySelectorAll('.pkg-hero-card[data-pkg], .pkg-small-card[data-pkg], .package-card[data-pkg]').forEach(card => {
    if (card.querySelector('.btn-quick-cart')) return;
    const key = card.dataset.pkg;
    if (!key) return;
    const btn = document.createElement('button');
    btn.className = 'btn-quick-cart btn-quick-cart-pkg';
    btn.innerHTML = '🛒 담기';
    btn.addEventListener('click', e => { e.preventDefault(); e.stopPropagation(); quickAddCart(key, 'pkg'); });
    card.appendChild(btn);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  QUIZ.init();
  applyStoreLinks();

  applyPrices();

  /* package card clicks */
  document.querySelectorAll('[data-pkg]').forEach(el =>
    el.addEventListener('click', () => openPkgModal(el.dataset.pkg))
  );

  const pkgClose = document.getElementById('pkgModalClose');
  if (pkgClose)   pkgClose.addEventListener('click', closePkgModal);
  if (pkgOverlay) pkgOverlay.addEventListener('click', e => { if (e.target === pkgOverlay) closePkgModal(); });

  injectCartButtons();
});

/* ─── Store / Contact Link Injector ─── */
function applyStoreLinks() {
  if (typeof STORE_LINKS === 'undefined') return;

  // 특정 키의 URL — 없거나 비어 있으면 CONTACT_URL(기본 페이지)로 fallback
  function resolveUrl(key) {
    const url = STORE_LINKS[key];
    return (url && url.trim()) ? url : (CONTACT_URL || STORE_LINKS.store);
  }

  // 1. [data-store] 속성 링크 일괄 적용
  document.querySelectorAll('[data-store]').forEach(el => {
    const url = resolveUrl(el.dataset.store);
    if (el.tagName === 'A') {
      el.href = url;
    } else {
      el.style.cursor = 'pointer';
      el.onclick = () => window.open(url, '_blank');
    }
  });

  // 2. .btn-store → 현재 파일명으로 자동 감지하여 링크 적용
  const page = location.pathname.split('/').pop().replace('.html', '') || 'index';
  document.querySelectorAll('.btn-store').forEach(el => { el.href = resolveUrl(page); });
}

/* ─── Price Injector ─── */
function applyPrices() {
  const page = location.pathname.split('/').pop().replace('.html', '');

  // localStorage 저장값 우선, 없으면 links.js 기본값 사용
  const lsSaved = JSON.parse(localStorage.getItem('ttok_live_prices') || 'null');
  const prices  = lsSaved || (typeof TEST_PRICES !== 'undefined' ? TEST_PRICES : {});

  const info = prices[page];
  if (!info) return;

  // 판매중지 처리
  if (!info.active) {
    document.querySelectorAll('.btn-store').forEach(btn => {
      btn.style.pointerEvents = 'none';
      btn.style.opacity = '.45';
      btn.textContent = '판매 중지';
    });
    const hero = document.querySelector('.test-hero');
    if (hero) {
      const bar = document.createElement('div');
      bar.style.cssText = 'background:#d44;color:#fff;text-align:center;padding:10px 16px;font-weight:700;font-size:.9rem;';
      bar.textContent = '⚠️ 현재 판매 중지된 검사입니다.';
      hero.prepend(bar);
    }
    return;
  }

  // 가격 표시 — 히어로 내 .test-spec-grid 바로 아래 삽입
  const specGrid = document.querySelector('.test-spec-grid');
  if (!specGrid || document.querySelector('.price-hero-badge')) return;

  const fmtPrice = info.price.toLocaleString('ko-KR');
  const pdfNote = page === 'tci' ? '1인 기준 · 8P PDF 리포트 포함' : '1인 기준 · PDF 리포트 포함';
  const badge = document.createElement('div');
  badge.className = 'price-hero-badge';
  badge.innerHTML =
    `<span class="ph-label">검사 가격</span>` +
    `<span class="ph-amount">₩${fmtPrice}</span>` +
    `<span class="ph-note">${pdfNote}</span>`;
  const versionGrid = document.querySelector('.version-grid');
  (versionGrid || specGrid).after(badge);
}

/* ─── Smooth Anchor Scroll ─── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if (el) { e.preventDefault(); el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});
