/* ============================================================
   똑심 마음연구소 — Main JavaScript
   ============================================================ */

const STORE_URL = 'https://open.kakao.com/o/sPbZfmsi';

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
  Q2_OPTIONS: {
    self: [
      { value: 'emotion',      label: '😤 감정 조절이 어렵고 힘들어요' },
      { value: 'personality',  label: '🤔 내 성격·기질이 궁금해요' },
      { value: 'stress',       label: '😮‍💨 번아웃·스트레스가 심해요' },
      { value: 'strength',     label: '⭐ 나만의 강점을 찾고 싶어요' }
    ],
    relation: [
      { value: 'pattern',  label: '🔁 반복되는 관계 패턴이 있어요' },
      { value: 'conflict', label: '💥 성격 차이로 갈등이 잦아요' },
      { value: 'fear',     label: '💔 친밀한 관계가 두렵거나 힘들어요' },
      { value: 'couple',   label: '💑 파트너·커플 관계가 어려워요' }
    ],
    learn: [
      { value: 'focus',   label: '😴 집중력·동기가 부족해요' },
      { value: 'method',  label: '📖 내게 맞는 공부법을 모르겠어요' },
      { value: 'anxiety', label: '😰 시험 불안·긴장이 심해요' },
      { value: 'career',  label: '🧭 진로·전공 방향이 막막해요' }
    ],
    child: [
      { value: 'infant',     label: '🍼 영아·유아 자녀 (0 ~ 7세)' },
      { value: 'child_age',  label: '👧 아동 자녀 (8 ~ 12세)' },
      { value: 'teen_child', label: '🎒 청소년 자녀 (13 ~ 18세)' }
    ]
  },

  TESTS: {
    tci: {
      young:   { emoji:'🧬', title:'JTCI 유아·아동 기질검사',  desc:'아이의 타고난 기질을 7차원으로 분석해 행동과 감정의 뿌리를 이해합니다.',  href:'pages/tci.html' },
      teen:    { emoji:'🧬', title:'JTCI 12-18 기질검사',      desc:'청소년기 기질과 성격을 7차원으로 분석해 반복 패턴의 원인을 파악합니다.', href:'pages/tci.html' },
      college: { emoji:'🧬', title:'TCI 기질 및 성격검사',     desc:'타고난 기질과 성장한 성격을 7차원으로 입체 분석합니다.',                  href:'pages/tci.html' },
      adult:   { emoji:'🧬', title:'TCI 기질 및 성격검사',     desc:'타고난 기질과 성장한 성격을 7차원으로 입체 분석합니다.',                  href:'pages/tci.html' }
    },
    kocean: { _: { emoji:'🌊', title:'K-OCEAN 5요인 성격검사',   desc:'현재 드러나는 성격을 개방성·성실성·외향성·친화성·신경증 5차원으로 측정합니다.', href:'pages/kocean.html' } },
    golden: { _: { emoji:'✨', title:'GOLDEN 골든성격유형검사',   desc:'4가지 성격 유형 선호로 나의 심리 에너지와 의사결정 방식을 파악합니다.',      href:'pages/golden.html' } },
    rs:     { _: { emoji:'💚', title:'RS 회복탄력성검사',         desc:'역경을 이겨내는 심리적 회복 능력을 측정하고 강화 방법을 찾습니다.',          href:'pages/rs.html' } },
    kiri:   { _: { emoji:'🤝', title:'KiRi 통합적 대인관계검사',  desc:'나의 대인관계 패턴과 핵심 욕구를 통합적으로 분석합니다.',                   href:'pages/kiri.html' } },
    pai: {
      young:   { emoji:'🔬', title:'PAI-A 청소년 성격평가', desc:'청소년 성격 전반과 임상적 특성을 정밀 측정합니다.', href:'pages/pai.html' },
      teen:    { emoji:'🔬', title:'PAI-A 청소년 성격평가', desc:'청소년 성격 전반과 임상적 특성을 정밀 측정합니다.', href:'pages/pai.html' },
      college: { emoji:'🔬', title:'PAI 성격평가 질문지',   desc:'성인 성격 전반과 임상적 특성을 정밀 측정합니다.',   href:'pages/pai.html' },
      adult:   { emoji:'🔬', title:'PAI 성격평가 질문지',   desc:'성인 성격 전반과 임상적 특성을 정밀 측정합니다.',   href:'pages/pai.html' }
    },
    cst:   { _: { emoji:'⭐', title:'CST 성격강점검사',      desc:'VIA 강점 모델로 나만의 고유한 강점을 발견하고 활용 방법을 찾습니다.',      href:'pages/cst.html' } },
    sct:   { _: { emoji:'💬', title:'SCT 문장완성검사',       desc:'미완성 문장을 완성하며 무의식적 욕구와 감정을 탐색합니다.',                href:'pages/sct.html' } },
    mlst:  { _: { emoji:'📚', title:'MLST-II 학습전략검사',  desc:'동기·인지·행동·정서 4대 학습 전략을 과학적으로 진단합니다.',             href:'pages/mlst.html' } },
    kcmii: { _: { emoji:'🎓', title:'KCMII-2 전공선택검사', desc:'Holland 적성이론으로 나에게 맞는 전공·직업 방향을 탐색합니다.',          href:'pages/kcmii.html' } },
    sts: {
      young: { emoji:'🦎', title:'STS 6요인 기질검사 (영아·유아)', desc:'0~7세 자녀의 타고난 기질을 6요인·동물 유형으로 직관적으로 이해합니다.',  href:'pages/sts.html' },
      _:     { emoji:'🦎', title:'STS 6요인 기질검사',             desc:'타고난 기질을 6가지 요인과 동물 유형으로 직관적으로 이해합니다.',          href:'pages/sts.html' }
    }
  },

  PRIMARY: {
    'self+emotion':'tci',   'self+personality':'tci',  'self+stress':'rs',    'self+strength':'cst',
    'relation+pattern':'kiri','relation+conflict':'tci','relation+fear':'kiri','relation+couple':'tci',
    'learn+focus':'mlst',   'learn+method':'mlst',     'learn+anxiety':'rs',  'learn+career':'kcmii',
    'child+behavior':'tci', 'child+comm':'tci',        'child+school':'tci',  'child+emotion_child':'tci'
  },

  SECONDARY: {
    tci:   { deep:'kocean', action:'cst',    precise:'pai',    strength:'cst'    },
    rs:    { deep:'tci',    action:'mlst',   precise:'pai',    strength:'cst'    },
    cst:   { deep:'tci',    action:'golden', precise:'tci',    strength:'golden' },
    kiri:  { deep:'tci',    action:'golden', precise:'pai',    strength:'cst'    },
    mlst:  { deep:'tci',    action:'cst',    precise:'kocean', strength:'cst'    },
    kcmii: { deep:'tci',    action:'cst',    precise:'kocean', strength:'cst'    }
  },

  SEC_OVERRIDE: {
    'self+emotion':       { deep:'pai',  action:'rs',     precise:'pai',    strength:'cst'    },
    'self+stress':        { deep:'tci',  action:'tci',    precise:'pai',    strength:'cst'    },
    'relation+fear':      { deep:'pai',  action:'tci',    precise:'pai',    strength:'rs'     },
    'relation+couple':    { deep:'kiri', action:'golden', precise:'kiri',   strength:'cst'    },
    'learn+anxiety':      { deep:'tci',  action:'mlst',   precise:'pai',    strength:'cst'    },
    'learn+career':       { deep:'tci',  action:'cst',    precise:'kocean', strength:'cst'    },
    'child+behavior':     { deep:'pai',  action:'kiri',   precise:'pai',    strength:'cst'    },
    'child+comm':         { deep:'kiri', action:'kiri',   precise:'pai',    strength:'golden' },
    'child+school':       { deep:'mlst', action:'mlst',   precise:'pai',    strength:'cst'    },
    'child+emotion_child':{ deep:'pai',  action:'rs',     precise:'pai',    strength:'cst'    }
  },

  PACKAGE: {
    'self+emotion':'pkg_mental',      'self+personality':'pkg_personality',
    'self+stress':'pkg_mental',       'self+strength':'pkg_personality',
    'relation+pattern':'pkg_relation','relation+conflict':'pkg_relation',
    'relation+fear':'pkg_relation',   'relation+couple':'pkg_couple',
    'learn+focus':'pkg_exam',         'learn+method':'pkg_exam',
    'learn+anxiety':'pkg_exam',       'learn+career':'pkg_career',
    'child+behavior':'pkg_parenting', 'child+comm':'pkg_parenting',
    'child+school':'pkg_parenting',   'child+emotion_child':'pkg_parenting'
  },

  q1:null, q2:null, q3:null, _lastPkgKey:null,

  getTest(key) {
    const t = this.TESTS[key]; if (!t) return null;
    const age = this.q1 === 'child' ? 'young' : 'adult';
    return t[age] || t._ || null;
  },

  lookup() {
    // 자녀 이해: q2 = 자녀 나이 → 나이별 검사 직접 매핑
    if (this.q1 === 'child') {
      const age = this.q2;
      let t1, t2;
      if (age === 'infant') {
        t1 = this.TESTS.sts.young;
        t2 = this.TESTS.pai.young;
      } else if (age === 'child_age') {
        t1 = this.TESTS.tci.young;
        t2 = this.TESTS.pai.young;
      } else { // teen_child
        t1 = this.TESTS.tci.teen;
        t2 = this.TESTS.pai.teen;
      }
      return { t1, t2, pkgKey: 'pkg_parenting' };
    }
    const path = `${this.q1}+${this.q2}`;
    const pKey = this.PRIMARY[path]; if (!pKey) return null;
    const ov   = this.SEC_OVERRIDE[path] || {};
    const sKey = ov[this.q3] || (this.SECONDARY[pKey] || {})[this.q3];
    const pkgKey = this.PACKAGE[path];
    return { t1: this.getTest(pKey), t2: this.getTest(sKey), pkgKey };
  },

  init() {
    document.querySelectorAll('[data-quiz-open]').forEach(b => b.addEventListener('click', () => this.open()));
    const ov = document.getElementById('quizOverlay');
    document.getElementById('quizClose')?.addEventListener('click', () => this.close());
    ov?.addEventListener('click', e => { if (e.target === ov) this.close(); });

    document.querySelectorAll('.quiz-step[data-step="0"] .quiz-option').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.quiz-step[data-step="0"] .quiz-option').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected'); this.q1 = btn.dataset.value;
        setTimeout(() => { this.renderQ2(); this.goStep(1); }, 280);
      });
    });
    document.querySelectorAll('.quiz-step[data-step="2"] .quiz-option').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.quiz-step[data-step="2"] .quiz-option').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected'); this.q3 = btn.dataset.value;
        setTimeout(() => this.showResult(), 280);
      });
    });
    document.getElementById('quizRetry')?.addEventListener('click', () => this.reset());
    document.getElementById('result1Link')?.addEventListener('click', () => this.close());
    document.getElementById('result2Link')?.addEventListener('click', () => this.close());
    document.getElementById('resultPkgBtn')?.addEventListener('click', () => {
      this.close();
      if (this._lastPkgKey) setTimeout(() => openPkgModal(this._lastPkgKey), 120);
    });
  },

  open()  { this.reset(); document.getElementById('quizOverlay').classList.add('open'); },
  close() { document.getElementById('quizOverlay').classList.remove('open'); },

  reset() {
    this.q1 = this.q2 = this.q3 = this._lastPkgKey = null;
    document.querySelectorAll('.quiz-step[data-step="0"] .quiz-option, .quiz-step[data-step="2"] .quiz-option').forEach(b => b.classList.remove('selected'));
    const q2c = document.getElementById('q2Options'); if (q2c) q2c.innerHTML = '';
    document.getElementById('quizResult').classList.remove('show');
    this.goStep(0);
  },

  goStep(idx) {
    document.querySelectorAll('.quiz-step').forEach((s,i) => s.classList.toggle('active', i === idx));
    document.querySelectorAll('.quiz-progress span').forEach((b,i) => b.classList.toggle('done', i < idx));
  },

  renderQ2() {
    const opts = this.Q2_OPTIONS[this.q1] || [];
    const c = document.getElementById('q2Options'); if (!c) return;
    c.innerHTML = opts.map(o => `<button class="quiz-option" data-value="${o.value}">${o.label}</button>`).join('');
    c.querySelectorAll('.quiz-option').forEach(btn => {
      btn.addEventListener('click', () => {
        c.querySelectorAll('.quiz-option').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected'); this.q2 = btn.dataset.value;
        if (this.q1 === 'child') {
          // 자녀 나이만으로 바로 결과 표시 (q3 생략)
          this.q3 = 'deep';
          setTimeout(() => this.showResult(), 280);
        } else {
          setTimeout(() => this.goStep(2), 280);
        }
      });
    });
  },

  showResult() {
    const r = this.lookup();
    if (!r || !r.t1 || !r.t2) return;
    this._lastPkgKey = r.pkgKey;
    document.getElementById('result1Emoji').textContent = r.t1.emoji;
    document.getElementById('result1Title').textContent = r.t1.title;
    document.getElementById('result1Desc').textContent  = r.t1.desc;
    document.getElementById('result1Link').href = r.t1.href;
    document.getElementById('result2Emoji').textContent = r.t2.emoji;
    document.getElementById('result2Title').textContent = r.t2.title;
    document.getElementById('result2Desc').textContent  = r.t2.desc;
    document.getElementById('result2Link').href = r.t2.href;
    const pkg = PKG_INFO[r.pkgKey];
    if (pkg) {
      document.getElementById('resultPkgEmoji').textContent = pkg.icon;
      document.getElementById('resultPkgTitle').textContent = pkg.title;
      document.getElementById('resultPkgDesc').textContent  = (pkg.why || '').slice(0, 55) + '…';
    }
    document.querySelectorAll('.quiz-step').forEach(s => s.classList.remove('active'));
    document.getElementById('quizResult').classList.add('show');
    document.querySelectorAll('.quiz-progress span').forEach(b => b.classList.add('done'));
  }

};

/* ─── Package Price Calculator ─── */
function computePkgPrice(testKeys) {
  const saved  = JSON.parse(localStorage.getItem('ttok_live_prices') || 'null');
  const prices = saved || (typeof TEST_PRICES !== 'undefined' ? TEST_PRICES : {});
  const total  = testKeys.reduce((sum, k) => sum + (prices[k]?.price || 0), 0);
  return { total, discounted: Math.round(total * 0.9) };
}

/* ─── Package Modal Data ─── */
const PKG_INFO = {
  pkg_personality: {
    icon: '🌟', title: '종합 성격 패키지',
    tags: ['TCI', 'K-OCEAN'],
    testKeys: ['tci', 'kocean'],
    why: 'TCI는 "타고난 기질"을, K-OCEAN은 "현재 드러나는 행동 특성"을 측정합니다. 하나는 내 안의 하드웨어, 하나는 소프트웨어—두 렌즈를 함께 쓸 때 나를 가장 입체적으로 이해할 수 있습니다.',
    steps: [
      { icon: '🧬', name: 'TCI 기질 및 성격검사', desc: '유전적으로 타고난 기질 4차원 + 성장한 성격 3차원을 분석합니다.' },
      { icon: '🌊', name: 'K-OCEAN 5요인 성격검사', desc: '현재 나의 행동 방식—개방성·성실성·외향성·친화성·신경증을 측정합니다.' }
    ]
  },
  pkg_mental: {
    icon: '💚', title: '멘탈 회복 패키지',
    tags: ['TCI', 'RS 회복탄력성', 'SCT'],
    testKeys: ['tci', 'rs', 'sct'],
    why: 'TCI로 기질적 취약성(왜 나는 이렇게 반응하는가)을 이해하고, RS로 현재의 회복 능력을 점검하며, SCT로 무의식 속의 내면 목소리까지 탐색합니다. 심리 치유의 완전한 지도를 그려주는 조합입니다.',
    steps: [
      { icon: '🧬', name: 'TCI 기질 및 성격검사', desc: '내가 유독 힘든 상황의 기질적 원인을 이해합니다.' },
      { icon: '💚', name: 'RS 회복탄력성검사', desc: '현재 나의 심리적 회복 능력 수준을 객관적으로 파악합니다.' },
      { icon: '💬', name: 'SCT 문장완성검사', desc: '무의식의 욕구·감정·갈등을 자유롭게 탐색합니다.' }
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
  pkg_parenting: {
    icon: '👨‍👩‍👧', title: '부모-자녀 양육 패키지',
    tags: ['STS / JTCI', 'PAI-A', 'PAT-2'],
    testKeys: ['tci', 'pai'],
    why: '자녀 나이에 따라 최적의 기질검사를 선택합니다. 영아·유아(0~7세)는 STS로, 아동·청소년(8~18세)은 JTCI로 기질을 파악하고, PAI-A와 PAT-2로 가족 전체의 역동을 이해합니다. 갈등을 오해가 아닌 "차이"로 이해하게 됩니다.',
    steps: [
      { icon: '🦎', name: 'STS 6요인 기질검사 (영아·유아, 0~7세)', desc: '영아·유아의 타고난 기질을 6요인과 동물 유형으로 직관적으로 파악합니다.' },
      { icon: '🐣', name: 'JTCI 기질검사 (아동·청소년, 8~18세)', desc: '아동·청소년의 기질을 7차원으로 분석해 맞춤 양육의 출발점을 잡습니다.' },
      { icon: '🔬', name: 'PAI-A 성격평가', desc: '아이의 성격 전반과 심리적 특성을 정밀하게 측정합니다.' },
      { icon: '🏠', name: 'PAT-2 부모양육태도검사', desc: '부모의 양육 방식을 점검하고 가족 역동을 함께 이해합니다.' }
    ]
  },
  pkg_career: {
    icon: '🧭', title: '진로 탐색 패키지',
    tags: ['KCMII-2', 'CST', 'TCI'],
    testKeys: ['kcmii', 'cst', 'tci'],
    why: 'KCMII-2로 Holland 이론에 기반한 적성 방향을, CST로 나만의 고유한 강점을, TCI로 기질에 맞는 일의 스타일을 종합적으로 탐색합니다. 세 검사가 만나면 "내가 잘할 수 있는 일"과 "내가 즐길 수 있는 일"이 명확해집니다.',
    steps: [
      { icon: '🎓', name: 'KCMII-2 전공선택검사', desc: 'Holland 적성이론으로 나에게 맞는 전공·직업 방향을 탐색합니다.' },
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
  }
};

/* ─── Package Modal Logic ─── */
const pkgOverlay = document.getElementById('pkgModalOverlay');

function openPkgModal(key) {
  const d = PKG_INFO[key];
  if (!d || !pkgOverlay) return;

  document.getElementById('pkgMIcon').textContent  = d.icon;
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
  if (ctaEl) ctaEl.href = (typeof CONTACT_URL !== 'undefined') ? CONTACT_URL : STORE_URL;

  const priceEl = document.getElementById('pkgMPrice');
  if (priceEl && d.testKeys) {
    const { total, discounted } = computePkgPrice(d.testKeys);
    if (total > 0) {
      priceEl.style.display = 'flex';
      priceEl.innerHTML =
        `<span class="pkg-price-original">정가 ₩${total.toLocaleString('ko-KR')}</span>` +
        `<span class="pkg-price-discount">₩${discounted.toLocaleString('ko-KR')}</span>` +
        `<span class="pkg-price-badge">패키지 10% 할인</span>`;
    }
  }

  pkgOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closePkgModal() {
  if (pkgOverlay) pkgOverlay.classList.remove('open');
  document.body.style.overflow = '';
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
});

/* ─── Store / Contact Link Injector ─── */
function applyStoreLinks() {
  if (typeof STORE_LINKS === 'undefined') return;

  // 1. [data-store] 속성 링크 일괄 적용
  document.querySelectorAll('[data-store]').forEach(el => {
    const key = el.dataset.store;
    const url = STORE_LINKS[key] || STORE_LINKS.store;
    if (el.tagName === 'A') {
      el.href = url;
    } else {
      el.style.cursor = 'pointer';
      el.onclick = () => window.open(url, '_blank');
    }
  });

  // 2. .btn-store → 현재 파일명으로 자동 감지하여 링크 적용
  const page = location.pathname.split('/').pop().replace('.html', '') || 'index';
  const pageUrl = STORE_LINKS[page] || STORE_LINKS.store;
  document.querySelectorAll('.btn-store').forEach(el => { el.href = pageUrl; });
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
  const badge = document.createElement('div');
  badge.className = 'price-hero-badge';
  badge.innerHTML =
    `<span class="ph-label">검사 가격</span>` +
    `<span class="ph-amount">₩${fmtPrice}</span>` +
    `<span class="ph-note">1인 기준 · 8P PDF 리포트 포함</span>`;
  specGrid.after(badge);
}

/* ─── Smooth Anchor Scroll ─── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if (el) { e.preventDefault(); el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});
