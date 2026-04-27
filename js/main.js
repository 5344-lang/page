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
  // [situation][age] → { single, pkg }
  results: {
    pattern: {
      young: {
        single: { emoji:'🧬', title:'JTCI 아동 기질검사', desc:'아이의 반복되는 행동 패턴 뒤에는 타고난 기질이 있습니다. JTCI로 뿌리를 이해하세요.', href:'pages/tci.html' },
        pkg:    { emoji:'🏠', title:'부모-자녀 양육 패키지', desc:'JTCI + PAI-A + PAT-2로 아이 기질과 양육 방식을 함께 분석합니다.', href:'index.html#packages' }
      },
      teen: {
        single: { emoji:'🧬', title:'JTCI 12-18 기질검사', desc:'청소년기 반복되는 감정·행동 패턴의 뿌리, 타고난 기질에서 찾아보세요.', href:'pages/tci.html' },
        pkg:    { emoji:'🌱', title:'청소년 성장 패키지', desc:'JTCI + GOLDEN + CST로 기질·성격·강점을 입체적으로 분석합니다.', href:'index.html#packages' }
      },
      adult: {
        single: { emoji:'🧬', title:'TCI 기질 및 성격검사', desc:'반복되는 패턴의 원인, 타고난 기질(TCI-RS)에서 찾아보세요.', href:'pages/tci.html' },
        pkg:    { emoji:'🌟', title:'종합 성격 패키지', desc:'TCI + K-OCEAN으로 기질과 현재 성격을 동시에 심층 분석합니다.', href:'index.html#packages' }
      }
    },
    relation: {
      young: {
        single: { emoji:'🤝', title:'KiRi 통합적 대인관계검사', desc:'아이의 관계 패턴을 분석해 친구·가족과의 소통 방식을 이해합니다.', href:'pages/kiri.html' },
        pkg:    { emoji:'🏠', title:'부모-자녀 양육 패키지', desc:'JTCI + PAI-A + PAT-2로 아이의 기질과 가족 역동을 함께 파악합니다.', href:'index.html#packages' }
      },
      teen: {
        single: { emoji:'🤝', title:'KiRi 통합적 대인관계검사', desc:'친구·가족과의 반복되는 관계 패턴을 과학적으로 분석합니다.', href:'pages/kiri.html' },
        pkg:    { emoji:'🤝', title:'대인관계 패키지', desc:'KiRi + PAI-A로 대인관계 방식과 성격 전반을 함께 분석합니다.', href:'index.html#packages' }
      },
      adult: {
        single: { emoji:'🤝', title:'KiRi 통합적 대인관계검사', desc:'반복되는 관계 상처의 패턴, KiRi로 객관적으로 파악하세요.', href:'pages/kiri.html' },
        pkg:    { emoji:'🤝', title:'대인관계 패키지', desc:'KiRi + PAI로 관계 방식과 성격 전반을 함께 심층 분석합니다.', href:'index.html#packages' }
      }
    },
    study: {
      young: {
        single: { emoji:'📚', title:'MLST-II 초등 학습전략검사', desc:'기초 학습 습관과 공부 흥미를 진단해 올바른 학습 출발점을 찾습니다.', href:'pages/mlst.html' },
        pkg:    { emoji:'📚', title:'수험생 케어 패키지', desc:'JTCI + MLST-II + RS + CST로 학습 전략과 강점을 함께 점검합니다.', href:'index.html#packages' }
      },
      teen: {
        single: { emoji:'📚', title:'MLST-II 청소년 학습전략검사', desc:'입시 부담 속 자기조절·시험 불안·학습 전략을 정밀 진단합니다.', href:'pages/mlst.html' },
        pkg:    { emoji:'📚', title:'수험생 케어 패키지', desc:'JTCI + MLST-II + RS + CST로 학습·멘탈·강점을 종합 점검합니다.', href:'index.html#packages' }
      },
      adult: {
        single: { emoji:'📚', title:'MLST-II 대학생 학습전략검사', desc:'자기주도 학습과 목표 관리 전략을 진단하고 구체적으로 개선합니다.', href:'pages/mlst.html' },
        pkg:    { emoji:'📚', title:'수험생 케어 패키지', desc:'JTCI + MLST-II + RS + CST로 학습 역량을 종합 분석합니다.', href:'index.html#packages' }
      }
    },
    career: {
      young: {
        single: { emoji:'⭐', title:'CST 성격강점검사', desc:'아이만의 고유한 강점을 발견해 진로 씨앗을 심어주세요.', href:'pages/cst.html' },
        pkg:    { emoji:'🌱', title:'청소년 성장 패키지', desc:'JTCI + GOLDEN + CST로 기질·성격·강점을 함께 탐색합니다.', href:'index.html#packages' }
      },
      teen: {
        single: { emoji:'🎓', title:'KCMII-2 대학전공선택검사', desc:'Holland 적성이론으로 나에게 맞는 전공 방향을 과학적으로 탐색합니다.', href:'pages/kcmii.html' },
        pkg:    { emoji:'📚', title:'수험생 케어 패키지', desc:'JTCI + MLST-II + RS + CST로 진로·학습·강점을 종합 점검합니다.', href:'index.html#packages' }
      },
      adult: {
        single: { emoji:'🎓', title:'KCMII-2 대학전공선택검사', desc:'전과·재수·취업 전환 시 적성에 맞는 방향을 과학적으로 탐색합니다.', href:'pages/kcmii.html' },
        pkg:    { emoji:'🌟', title:'종합 성격 패키지', desc:'TCI + K-OCEAN + CST로 기질·성격·강점 세 가지를 종합 분석합니다.', href:'index.html#packages' }
      }
    },
    child: {
      young: {
        single: { emoji:'🧬', title:'JTCI 유아·아동 기질검사', desc:'아이의 타고난 기질을 이해하면 갈등 없는 양육이 시작됩니다.', href:'pages/tci.html' },
        pkg:    { emoji:'🏠', title:'부모-자녀 양육 패키지', desc:'JTCI + PAI-A + PAT-2로 아이 기질과 양육 방식을 함께 분석합니다.', href:'index.html#packages' }
      },
      teen: {
        single: { emoji:'🧬', title:'JTCI 12-18 청소년 기질검사', desc:'청소년 자녀의 기질을 이해하면 대화와 관계가 달라집니다.', href:'pages/tci.html' },
        pkg:    { emoji:'🏠', title:'부모-자녀 양육 패키지', desc:'JTCI + PAI-A + PAT-2로 청소년 자녀와의 관계를 깊이 이해합니다.', href:'index.html#packages' }
      },
      adult: {
        single: { emoji:'🔬', title:'PAI 성격평가 질문지', desc:'자녀의 성격 전반을 임상적으로 이해하고 싶을 때 가장 적합합니다.', href:'pages/pai.html' },
        pkg:    { emoji:'🏠', title:'부모-자녀 양육 패키지', desc:'JTCI + PAI-A + PAT-2로 가족 역동 전체를 입체적으로 분석합니다.', href:'index.html#packages' }
      }
    },
    self: {
      young: {
        single: { emoji:'🧬', title:'JTCI 기질검사', desc:'아이의 타고난 성품을 가장 정확하게 보여주는 검사입니다.', href:'pages/tci.html' },
        pkg:    { emoji:'🌱', title:'청소년 성장 패키지', desc:'JTCI + GOLDEN + CST로 아이를 입체적으로 이해합니다.', href:'index.html#packages' }
      },
      teen: {
        single: { emoji:'✨', title:'GOLDEN 골든 성격유형검사', desc:'나의 성격 유형을 직관적이고 입체적으로 파악할 수 있습니다.', href:'pages/golden.html' },
        pkg:    { emoji:'🌱', title:'청소년 성장 패키지', desc:'JTCI + GOLDEN + CST로 기질·성격·강점을 함께 탐색합니다.', href:'index.html#packages' }
      },
      adult: {
        single: { emoji:'🌊', title:'K-OCEAN 5요인 성격검사', desc:'현재 드러나는 내 성격을 빅파이브 5가지 요인으로 분석합니다.', href:'pages/kocean.html' },
        pkg:    { emoji:'🌟', title:'종합 성격 패키지', desc:'TCI + K-OCEAN으로 타고난 기질과 현재 성격을 동시에 분석합니다.', href:'index.html#packages' }
      }
    }
  },

  situation: null,
  age: null,

  init() {
    document.querySelectorAll('[data-quiz-open]').forEach(btn =>
      btn.addEventListener('click', () => this.open())
    );
    const closeBtn = document.getElementById('quizClose');
    const overlay  = document.getElementById('quizOverlay');
    if (closeBtn) closeBtn.addEventListener('click', () => this.close());
    if (overlay)  overlay.addEventListener('click', e => { if (e.target === overlay) this.close(); });

    document.querySelectorAll('.quiz-option').forEach(btn => {
      btn.addEventListener('click', () => {
        const step = btn.closest('.quiz-step');
        step.querySelectorAll('.quiz-option').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        if (step.dataset.step === '0') {
          this.situation = btn.dataset.value;
          setTimeout(() => this.goStep(1), 300);
        } else {
          this.age = btn.dataset.value;
          setTimeout(() => this.showResult(), 300);
        }
      });
    });

    document.getElementById('quizRetry')?.addEventListener('click', () => this.reset());
    document.getElementById('quizResultLink')?.addEventListener('click', () => this.close());
    document.getElementById('quizPkgLink')?.addEventListener('click', () => this.close());
  },

  open()  { this.reset(); document.getElementById('quizOverlay').classList.add('open'); },
  close() { document.getElementById('quizOverlay').classList.remove('open'); },

  reset() {
    this.situation = null; this.age = null;
    document.querySelectorAll('.quiz-option').forEach(b => b.classList.remove('selected'));
    document.getElementById('quizResult').classList.remove('show');
    this.goStep(0);
  },

  goStep(idx) {
    document.querySelectorAll('.quiz-step').forEach((s, i) =>
      s.classList.toggle('active', i === idx)
    );
    document.querySelectorAll('.quiz-progress span').forEach((b, i) =>
      b.classList.toggle('done', i < idx)
    );
  },

  showResult() {
    const r = this.results[this.situation]?.[this.age];
    if (!r) return;
    document.getElementById('resultEmoji').textContent   = r.single.emoji;
    document.getElementById('resultTitle').textContent   = r.single.title;
    document.getElementById('resultDesc').textContent    = r.single.desc;
    const sLink = document.getElementById('quizResultLink');
    if (sLink) sLink.href = r.single.href;

    document.getElementById('resultPkgEmoji').textContent = r.pkg.emoji;
    document.getElementById('resultPkgTitle').textContent  = r.pkg.title;
    document.getElementById('resultPkgDesc').textContent   = r.pkg.desc;
    const pLink = document.getElementById('quizPkgLink');
    if (pLink) pLink.href = r.pkg.href;

    document.querySelectorAll('.quiz-step').forEach(s => s.classList.remove('active'));
    document.getElementById('quizResult').classList.add('show');
    document.querySelectorAll('.quiz-progress span').forEach(b => b.classList.add('done'));
  }
};

/* ─── Package Modal Data ─── */
const PKG_INFO = {
  pkg_personality: {
    icon: '🌟', title: '종합 성격 패키지',
    tags: ['TCI', 'K-OCEAN'],
    why: 'TCI는 "타고난 기질"을, K-OCEAN은 "현재 드러나는 행동 특성"을 측정합니다. 하나는 내 안의 하드웨어, 하나는 소프트웨어—두 렌즈를 함께 쓸 때 나를 가장 입체적으로 이해할 수 있습니다.',
    steps: [
      { icon: '🧬', name: 'TCI 기질 및 성격검사', desc: '유전적으로 타고난 기질 4차원 + 성장한 성격 3차원을 분석합니다.' },
      { icon: '🌊', name: 'K-OCEAN 5요인 성격검사', desc: '현재 나의 행동 방식—개방성·성실성·외향성·친화성·신경증을 측정합니다.' }
    ]
  },
  pkg_mental: {
    icon: '💚', title: '멘탈 회복 패키지',
    tags: ['TCI', 'RS 회복탄력성', 'SCT'],
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
    why: 'KiRi는 나의 관계 패턴과 대인 욕구를, PAI는 성격 전반과 임상적 특성을 심층 분석합니다. 왜 같은 상황에서 같은 반응이 반복되는지—그 뿌리까지 이해할 수 있습니다.',
    steps: [
      { icon: '🤝', name: 'KiRi 통합적 대인관계검사', desc: '나의 대인관계 패턴과 핵심 욕구를 통합적으로 분석합니다.' },
      { icon: '🔬', name: 'PAI / PAI-A 성격평가 질문지', desc: '성격 전반과 임상적 특성을 정밀하게 측정합니다.' }
    ]
  },
  pkg_teen: {
    icon: '🌱', title: '청소년 성장 패키지',
    tags: ['JTCI 12-18', 'GOLDEN 청소년', 'CST-A'],
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
    why: '두 사람이 같은 검사를 받고 결과를 비교할 때 진짜 이해가 시작됩니다. TCI로 기질의 차이를, KiRi로 각자의 관계 패턴을 비교해 "왜 우리는 이런 방식으로 갈등하는가"를 과학적으로 이해하세요.',
    steps: [
      { icon: '🧬', name: 'TCI 기질 및 성격검사 × 2인', desc: '두 사람의 기질 차이와 상호작용 방식을 비교 분석합니다.' },
      { icon: '🤝', name: 'KiRi 대인관계검사 × 2인', desc: '각자의 관계 패턴을 파악하고 갈등의 구조를 이해합니다.' }
    ]
  },
  pkg_exam: {
    icon: '📚', title: '수험생 케어 패키지',
    tags: ['JTCI 12-18', 'MLST-II', 'RS 회복탄력성', 'CST-A'],
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
    tags: ['JTCI 3-11', 'PAI-A', 'PAT-2'],
    why: '아이의 타고난 기질(JTCI)을 이해하고, 아이의 성격·임상적 특성(PAI-A)을 파악하며, 부모의 양육 태도(PAT-2)까지 함께 분석해 가족 전체의 역동을 이해합니다. 갈등을 오해가 아닌 "차이"로 이해하게 됩니다.',
    steps: [
      { icon: '🐣', name: 'JTCI 유아·아동 기질검사', desc: '아이의 타고난 기질을 이해해 맞춤 양육의 출발점을 잡습니다.' },
      { icon: '🔬', name: 'PAI-A 성격평가', desc: '아이의 성격 전반과 심리적 특성을 정밀하게 측정합니다.' },
      { icon: '🏠', name: 'PAT-2 부모양육태도검사', desc: '부모의 양육 방식을 점검하고 가족 역동을 함께 이해합니다.' }
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
