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
  Q3_OPTIONS: {
    pattern: [
      { value: 'emotion',  label: '😤 감정 조절이 어렵고 충동적으로 행동해요' },
      { value: 'curious',  label: '🤔 내 성격이 왜 이런지 근본적으로 궁금해요' },
      { value: 'strength', label: '⭐ 나만의 강점을 찾고 싶어요' }
    ],
    stress: [
      { value: 'burnout',         label: '😮‍💨 번아웃·무기력이 심해요' },
      { value: 'relation_stress', label: '😰 관계·환경 때문에 스트레스를 받아요' },
      { value: 'anxiety',         label: '😟 불안·걱정이 많고 회복이 느려요' }
    ],
    relation: [
      { value: 'pattern_rel', label: '🔍 나의 관계 패턴을 파악하고 싶어요' },
      { value: 'conflict',    label: '💥 성격 차이로 갈등이 반복돼요' },
      { value: 'fear',        label: '💔 친밀한 관계에서 상처받는 게 두려워요' }
    ],
    study: [
      { value: 'motivation',   label: '😴 집중력·동기 부족이 문제예요' },
      { value: 'method',       label: '📖 학습 방법·전략을 모르겠어요' },
      { value: 'anxiety_exam', label: '😰 시험 불안·긴장이 너무 심해요' }
    ],
    career: [
      { value: 'major',     label: '🏫 전공·학과 선택이 막막해요' },
      { value: 'aptitude',  label: '💡 내 강점과 적성을 모르겠어요' },
      { value: 'direction', label: '🧭 진로 방향이 전혀 감이 안 잡혀요' }
    ],
    child: [
      { value: 'behavior',      label: '❓ 아이가 왜 그런 행동을 하는지 모르겠어요' },
      { value: 'communication', label: '💬 아이와의 소통·관계가 힘들어요' },
      { value: 'school',        label: '📚 아이의 학습·학교생활이 걱정돼요' }
    ],
    self: [
      { value: 'temperament',   label: '🧬 기질과 성격 전반을 알고 싶어요' },
      { value: 'strength_self', label: '⭐ 나만의 강점과 긍정 자원을 찾고 싶어요' },
      { value: 'inner',         label: '🌊 무의식·내면 깊은 곳을 탐색하고 싶어요' }
    ]
  },

  MAP: {
    pattern: {
      young: { _default: [
        { emoji:'🧬', title:'JTCI 기질검사', desc:'아이의 반복 행동 뒤에는 타고난 기질이 있습니다. JTCI로 뿌리를 이해하세요.', href:'pages/tci.html' },
        { emoji:'✨', title:'GOLDEN 성격유형검사', desc:'성격 유형으로 아이의 행동 방식을 입체적으로 이해합니다.', href:'pages/golden.html' }
      ]},
      teen: {
        emotion: [
          { emoji:'🧬', title:'TCI 기질 및 성격검사', desc:'감정 조절의 어려움은 타고난 기질에서 시작됩니다.', href:'pages/tci.html' },
          { emoji:'🔬', title:'PAI-A 성격평가', desc:'청소년 성격 전반과 감정·충동 조절을 정밀 측정합니다.', href:'pages/pai.html' }
        ],
        curious: [
          { emoji:'🧬', title:'TCI 기질 및 성격검사', desc:'타고난 기질과 성장한 성격을 7차원으로 분석합니다.', href:'pages/tci.html' },
          { emoji:'🌊', title:'K-OCEAN 5요인 성격검사', desc:'현재 드러나는 행동 패턴을 5가지 차원으로 측정합니다.', href:'pages/kocean.html' }
        ],
        strength: [
          { emoji:'🧬', title:'TCI 기질 및 성격검사', desc:'기질을 알아야 강점을 올바르게 활용할 수 있습니다.', href:'pages/tci.html' },
          { emoji:'⭐', title:'CST 성격강점검사', desc:'나만의 대표 강점 24가지 중 상위 강점을 발견합니다.', href:'pages/cst.html' }
        ]
      },
      adult: {
        emotion: [
          { emoji:'🧬', title:'TCI 기질 및 성격검사', desc:'감정 조절 어려움의 기질적 원인을 파악합니다.', href:'pages/tci.html' },
          { emoji:'🔬', title:'PAI 성격평가 질문지', desc:'성인 성격 전반과 임상적 특성을 정밀 측정합니다.', href:'pages/pai.html' }
        ],
        curious: [
          { emoji:'🧬', title:'TCI 기질 및 성격검사', desc:'타고난 기질과 성장한 성격을 7차원으로 분석합니다.', href:'pages/tci.html' },
          { emoji:'🌊', title:'K-OCEAN 5요인 성격검사', desc:'현재 드러나는 행동 패턴을 5가지 차원으로 측정합니다.', href:'pages/kocean.html' }
        ],
        strength: [
          { emoji:'🧬', title:'TCI 기질 및 성격검사', desc:'기질을 알아야 강점을 올바르게 활용할 수 있습니다.', href:'pages/tci.html' },
          { emoji:'⭐', title:'CST 성격강점검사', desc:'나만의 대표 강점을 발견하고 삶에서 더 많이 활용하세요.', href:'pages/cst.html' }
        ]
      }
    },
    stress: {
      young: { _default: [
        { emoji:'🧬', title:'JTCI 기질검사', desc:'스트레스에 취약한 기질적 특성을 파악합니다.', href:'pages/tci.html' },
        { emoji:'💚', title:'RS 회복탄력성검사', desc:'심리적 회복 능력을 점검하고 강화 방법을 찾습니다.', href:'pages/rs.html' }
      ]},
      teen: {
        burnout: [
          { emoji:'💚', title:'RS 회복탄력성검사', desc:'번아웃 상태의 회복 능력을 객관적으로 파악합니다.', href:'pages/rs.html' },
          { emoji:'🧬', title:'TCI 기질 및 성격검사', desc:'번아웃에 취약한 기질적 원인을 이해합니다.', href:'pages/tci.html' }
        ],
        relation_stress: [
          { emoji:'💚', title:'RS 회복탄력성검사', desc:'관계 스트레스를 이겨내는 회복 능력을 점검합니다.', href:'pages/rs.html' },
          { emoji:'🤝', title:'KiRi 통합적 대인관계검사', desc:'관계 스트레스의 원인이 되는 대인관계 패턴을 파악합니다.', href:'pages/kiri.html' }
        ],
        anxiety: [
          { emoji:'💚', title:'RS 회복탄력성검사', desc:'불안 속에서 회복하는 심리적 탄력성을 측정합니다.', href:'pages/rs.html' },
          { emoji:'🔬', title:'PAI-A 성격평가', desc:'불안·긴장의 성격적 원인을 정밀하게 분석합니다.', href:'pages/pai.html' }
        ]
      },
      adult: {
        burnout: [
          { emoji:'💚', title:'RS 회복탄력성검사', desc:'번아웃 상태의 회복 능력을 객관적으로 파악합니다.', href:'pages/rs.html' },
          { emoji:'🧬', title:'TCI 기질 및 성격검사', desc:'번아웃에 취약한 기질적 원인을 이해합니다.', href:'pages/tci.html' }
        ],
        relation_stress: [
          { emoji:'💚', title:'RS 회복탄력성검사', desc:'관계 스트레스를 이겨내는 회복 능력을 점검합니다.', href:'pages/rs.html' },
          { emoji:'🤝', title:'KiRi 통합적 대인관계검사', desc:'관계 스트레스의 원인이 되는 대인관계 패턴을 파악합니다.', href:'pages/kiri.html' }
        ],
        anxiety: [
          { emoji:'💚', title:'RS 회복탄력성검사', desc:'불안 속에서 회복하는 심리적 탄력성을 측정합니다.', href:'pages/rs.html' },
          { emoji:'🔬', title:'PAI 성격평가 질문지', desc:'불안·긴장의 성격적 원인을 정밀하게 분석합니다.', href:'pages/pai.html' }
        ]
      }
    },
    relation: {
      young: { _default: [
        { emoji:'🧬', title:'JTCI 기질검사', desc:'아이의 기질을 이해하면 관계 갈등의 원인이 보입니다.', href:'pages/tci.html' },
        { emoji:'🤝', title:'KiRi 통합적 대인관계검사', desc:'아이의 관계 패턴과 대인 욕구를 파악합니다.', href:'pages/kiri.html' }
      ]},
      teen: {
        pattern_rel: [
          { emoji:'🤝', title:'KiRi 통합적 대인관계검사', desc:'나의 대인관계 패턴과 핵심 욕구를 통합적으로 분석합니다.', href:'pages/kiri.html' },
          { emoji:'🧬', title:'TCI 기질 및 성격검사', desc:'관계 패턴의 기질적 뿌리를 이해합니다.', href:'pages/tci.html' }
        ],
        conflict: [
          { emoji:'🧬', title:'TCI 기질 및 성격검사', desc:'기질 차이가 갈등의 핵심 원인일 수 있습니다.', href:'pages/tci.html' },
          { emoji:'✨', title:'GOLDEN 성격유형검사', desc:'성격 유형의 차이로 갈등 구조를 이해합니다.', href:'pages/golden.html' }
        ],
        fear: [
          { emoji:'🤝', title:'KiRi 통합적 대인관계검사', desc:'친밀감 회피 패턴과 대인 욕구의 핵심을 분석합니다.', href:'pages/kiri.html' },
          { emoji:'🔬', title:'PAI-A 성격평가', desc:'관계 두려움의 성격적 원인을 정밀하게 파악합니다.', href:'pages/pai.html' }
        ]
      },
      adult: {
        pattern_rel: [
          { emoji:'🤝', title:'KiRi 통합적 대인관계검사', desc:'나의 대인관계 패턴과 핵심 욕구를 통합적으로 분석합니다.', href:'pages/kiri.html' },
          { emoji:'🧬', title:'TCI 기질 및 성격검사', desc:'관계 패턴의 기질적 뿌리를 이해합니다.', href:'pages/tci.html' }
        ],
        conflict: [
          { emoji:'🧬', title:'TCI 기질 및 성격검사', desc:'기질 차이가 갈등의 핵심 원인일 수 있습니다.', href:'pages/tci.html' },
          { emoji:'🌊', title:'K-OCEAN 5요인 성격검사', desc:'성격 차원의 차이로 갈등 구조를 입체적으로 이해합니다.', href:'pages/kocean.html' }
        ],
        fear: [
          { emoji:'🤝', title:'KiRi 통합적 대인관계검사', desc:'친밀감 회피 패턴과 대인 욕구의 핵심을 분석합니다.', href:'pages/kiri.html' },
          { emoji:'🔬', title:'PAI 성격평가 질문지', desc:'관계 두려움의 성격적 원인을 정밀하게 파악합니다.', href:'pages/pai.html' }
        ]
      }
    },
    study: {
      young: { _default: [
        { emoji:'📚', title:'MLST-II 학습전략검사', desc:'학습 습관과 동기 수준을 진단합니다.', href:'pages/mlst.html' },
        { emoji:'🧬', title:'JTCI 기질검사', desc:'기질별 최적 학습 방식을 파악합니다.', href:'pages/tci.html' }
      ]},
      teen: {
        motivation: [
          { emoji:'📚', title:'MLST-II 학습전략검사', desc:'학습 동기·집중력 문제를 4대 전략으로 정밀 진단합니다.', href:'pages/mlst.html' },
          { emoji:'🧬', title:'TCI 기질 및 성격검사', desc:'동기 부족의 기질적 원인을 파악합니다.', href:'pages/tci.html' }
        ],
        method: [
          { emoji:'📚', title:'MLST-II 학습전략검사', desc:'나에게 맞는 학습 전략을 과학적으로 진단합니다.', href:'pages/mlst.html' },
          { emoji:'⭐', title:'CST 성격강점검사', desc:'강점 기반으로 나만의 공부법을 찾습니다.', href:'pages/cst.html' }
        ],
        anxiety_exam: [
          { emoji:'💚', title:'RS 회복탄력성검사', desc:'시험 스트레스에 버티는 심리적 회복력을 측정합니다.', href:'pages/rs.html' },
          { emoji:'📚', title:'MLST-II 학습전략검사', desc:'불안이 학습 전략에 미치는 영향을 함께 점검합니다.', href:'pages/mlst.html' }
        ]
      },
      adult: {
        motivation: [
          { emoji:'📚', title:'MLST-II 학습전략검사', desc:'자기주도 학습 동기와 집중력을 진단합니다.', href:'pages/mlst.html' },
          { emoji:'🧬', title:'TCI 기질 및 성격검사', desc:'동기 부족의 기질적 원인을 파악합니다.', href:'pages/tci.html' }
        ],
        method: [
          { emoji:'📚', title:'MLST-II 학습전략검사', desc:'나에게 맞는 학습 전략을 과학적으로 진단합니다.', href:'pages/mlst.html' },
          { emoji:'⭐', title:'CST 성격강점검사', desc:'강점 기반으로 나만의 공부법을 찾습니다.', href:'pages/cst.html' }
        ],
        anxiety_exam: [
          { emoji:'💚', title:'RS 회복탄력성검사', desc:'시험 스트레스에 버티는 심리적 회복력을 측정합니다.', href:'pages/rs.html' },
          { emoji:'📚', title:'MLST-II 학습전략검사', desc:'불안이 학습 전략에 미치는 영향을 함께 점검합니다.', href:'pages/mlst.html' }
        ]
      }
    },
    career: {
      young: { _default: [
        { emoji:'⭐', title:'CST 성격강점검사', desc:'아이만의 고유한 강점을 발견해 진로 씨앗을 심어줍니다.', href:'pages/cst.html' },
        { emoji:'🧬', title:'JTCI 기질검사', desc:'기질에 맞는 진로 방향의 뿌리를 파악합니다.', href:'pages/tci.html' }
      ]},
      teen: {
        major: [
          { emoji:'🎓', title:'KCMII-2 대학전공선택검사', desc:'Holland 이론으로 나에게 맞는 전공을 과학적으로 탐색합니다.', href:'pages/kcmii.html' },
          { emoji:'🧬', title:'TCI 기질 및 성격검사', desc:'기질에 맞는 전공 방향을 함께 이해합니다.', href:'pages/tci.html' }
        ],
        aptitude: [
          { emoji:'⭐', title:'CST 성격강점검사', desc:'나만의 고유한 강점과 적성을 발견합니다.', href:'pages/cst.html' },
          { emoji:'🧬', title:'TCI 기질 및 성격검사', desc:'기질로 자연스럽게 드러나는 적성을 파악합니다.', href:'pages/tci.html' }
        ],
        direction: [
          { emoji:'🎓', title:'KCMII-2 대학전공선택검사', desc:'전공·직업 방향을 Holland 적성이론으로 탐색합니다.', href:'pages/kcmii.html' },
          { emoji:'⭐', title:'CST 성격강점검사', desc:'강점 기반으로 진로 방향의 힌트를 찾습니다.', href:'pages/cst.html' }
        ]
      },
      adult: {
        major: [
          { emoji:'🎓', title:'KCMII-2 대학전공선택검사', desc:'전과·재수·진로 전환 시 적합한 전공을 탐색합니다.', href:'pages/kcmii.html' },
          { emoji:'🌊', title:'K-OCEAN 5요인 성격검사', desc:'현재 성격으로 맞는 직종·환경을 파악합니다.', href:'pages/kocean.html' }
        ],
        aptitude: [
          { emoji:'⭐', title:'CST 성격강점검사', desc:'나만의 고유한 강점과 적성을 발견합니다.', href:'pages/cst.html' },
          { emoji:'🧬', title:'TCI 기질 및 성격검사', desc:'기질로 자연스럽게 드러나는 적성을 파악합니다.', href:'pages/tci.html' }
        ],
        direction: [
          { emoji:'🎓', title:'KCMII-2 대학전공선택검사', desc:'직업·진로 방향을 Holland 적성이론으로 탐색합니다.', href:'pages/kcmii.html' },
          { emoji:'⭐', title:'CST 성격강점검사', desc:'강점 기반으로 진로 방향의 힌트를 찾습니다.', href:'pages/cst.html' }
        ]
      }
    },
    child: {
      young: {
        behavior: [
          { emoji:'🧬', title:'JTCI 유아·아동 기질검사', desc:'아이의 반복 행동 뒤에는 타고난 기질이 있습니다.', href:'pages/tci.html' },
          { emoji:'🔬', title:'PAI-A 성격평가', desc:'아이의 성격 전반과 행동 특성을 정밀 측정합니다.', href:'pages/pai.html' }
        ],
        communication: [
          { emoji:'🧬', title:'JTCI 유아·아동 기질검사', desc:'아이 기질을 이해하면 소통 방식이 달라집니다.', href:'pages/tci.html' },
          { emoji:'🤝', title:'KiRi 통합적 대인관계검사', desc:'아이의 관계 패턴과 대인 욕구를 파악합니다.', href:'pages/kiri.html' }
        ],
        school: [
          { emoji:'🧬', title:'JTCI 유아·아동 기질검사', desc:'기질별 학습 성향과 교우관계 방식을 이해합니다.', href:'pages/tci.html' },
          { emoji:'📚', title:'MLST-II 학습전략검사', desc:'학습 습관과 동기 수준을 진단합니다.', href:'pages/mlst.html' }
        ]
      },
      teen: {
        behavior: [
          { emoji:'🧬', title:'JTCI 12-18 기질검사', desc:'청소년 자녀의 반복 행동의 기질적 원인을 이해합니다.', href:'pages/tci.html' },
          { emoji:'🔬', title:'PAI-A 성격평가', desc:'청소년 성격 전반과 행동 특성을 정밀 측정합니다.', href:'pages/pai.html' }
        ],
        communication: [
          { emoji:'🧬', title:'JTCI 12-18 기질검사', desc:'청소년 자녀의 기질을 이해하면 대화가 달라집니다.', href:'pages/tci.html' },
          { emoji:'🤝', title:'KiRi 통합적 대인관계검사', desc:'자녀의 관계 패턴과 대인 욕구를 파악합니다.', href:'pages/kiri.html' }
        ],
        school: [
          { emoji:'🧬', title:'JTCI 12-18 기질검사', desc:'기질별 학습 성향을 파악합니다.', href:'pages/tci.html' },
          { emoji:'📚', title:'MLST-II 학습전략검사', desc:'학습 전략과 공부 습관을 진단합니다.', href:'pages/mlst.html' }
        ]
      },
      adult: {
        behavior: [
          { emoji:'🧬', title:'TCI 기질 및 성격검사', desc:'성인 자녀의 기질을 이해해 관계 역동을 파악합니다.', href:'pages/tci.html' },
          { emoji:'🔬', title:'PAI 성격평가 질문지', desc:'성인 자녀의 성격 전반을 임상적으로 이해합니다.', href:'pages/pai.html' }
        ],
        communication: [
          { emoji:'🧬', title:'TCI 기질 및 성격검사', desc:'성인 자녀의 기질을 이해하면 소통이 달라집니다.', href:'pages/tci.html' },
          { emoji:'🤝', title:'KiRi 통합적 대인관계검사', desc:'성인 자녀의 관계 패턴과 대인 욕구를 파악합니다.', href:'pages/kiri.html' }
        ],
        school: [
          { emoji:'🧬', title:'TCI 기질 및 성격검사', desc:'성인 자녀의 기질과 학습 성향을 파악합니다.', href:'pages/tci.html' },
          { emoji:'📚', title:'MLST-II 학습전략검사', desc:'자기주도 학습 전략을 진단합니다.', href:'pages/mlst.html' }
        ]
      }
    },
    self: {
      young: { _default: [
        { emoji:'🧬', title:'JTCI 기질검사', desc:'아이의 타고난 성품을 가장 정확하게 보여주는 검사입니다.', href:'pages/tci.html' },
        { emoji:'✨', title:'GOLDEN 성격유형검사', desc:'성격 유형으로 아이를 입체적으로 이해합니다.', href:'pages/golden.html' }
      ]},
      teen: {
        temperament: [
          { emoji:'🧬', title:'TCI 기질 및 성격검사', desc:'타고난 기질과 성장한 성격을 7차원으로 분석합니다.', href:'pages/tci.html' },
          { emoji:'🌊', title:'K-OCEAN 5요인 성격검사', desc:'현재 드러나는 성격을 5가지 차원으로 측정합니다.', href:'pages/kocean.html' }
        ],
        strength_self: [
          { emoji:'⭐', title:'CST 성격강점검사', desc:'나만의 대표 강점을 발견하고 활용하는 방법을 찾습니다.', href:'pages/cst.html' },
          { emoji:'🧬', title:'TCI 기질 및 성격검사', desc:'기질에서 드러나는 자연스러운 강점을 이해합니다.', href:'pages/tci.html' }
        ],
        inner: [
          { emoji:'🧬', title:'TCI 기질 및 성격검사', desc:'내면의 기질적 특성을 깊이 탐색합니다.', href:'pages/tci.html' },
          { emoji:'💬', title:'SCT 문장완성검사', desc:'무의식의 욕구와 감정을 자유롭게 탐색합니다.', href:'pages/sct.html' }
        ]
      },
      adult: {
        temperament: [
          { emoji:'🧬', title:'TCI 기질 및 성격검사', desc:'타고난 기질과 성장한 성격을 7차원으로 분석합니다.', href:'pages/tci.html' },
          { emoji:'🌊', title:'K-OCEAN 5요인 성격검사', desc:'현재 드러나는 성격을 5가지 차원으로 측정합니다.', href:'pages/kocean.html' }
        ],
        strength_self: [
          { emoji:'⭐', title:'CST 성격강점검사', desc:'나만의 대표 강점을 발견하고 활용하는 방법을 찾습니다.', href:'pages/cst.html' },
          { emoji:'🧬', title:'TCI 기질 및 성격검사', desc:'기질에서 드러나는 자연스러운 강점을 이해합니다.', href:'pages/tci.html' }
        ],
        inner: [
          { emoji:'🧬', title:'TCI 기질 및 성격검사', desc:'내면의 기질적 특성을 깊이 탐색합니다.', href:'pages/tci.html' },
          { emoji:'💬', title:'SCT 문장완성검사', desc:'무의식의 욕구와 감정을 자유롭게 탐색합니다.', href:'pages/sct.html' }
        ]
      }
    }
  },

  situation: null,
  age: null,
  detail: null,

  init() {
    document.querySelectorAll('[data-quiz-open]').forEach(btn =>
      btn.addEventListener('click', () => this.open())
    );
    const closeBtn = document.getElementById('quizClose');
    const overlay  = document.getElementById('quizOverlay');
    if (closeBtn) closeBtn.addEventListener('click', () => this.close());
    if (overlay)  overlay.addEventListener('click', e => { if (e.target === overlay) this.close(); });

    document.querySelectorAll('.quiz-step[data-step="0"] .quiz-option').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.quiz-step[data-step="0"] .quiz-option').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        this.situation = btn.dataset.value;
        setTimeout(() => this.goStep(1), 300);
      });
    });

    document.querySelectorAll('.quiz-step[data-step="1"] .quiz-option').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.quiz-step[data-step="1"] .quiz-option').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        this.age = btn.dataset.value;
        setTimeout(() => { this.renderQ3(); this.goStep(2); }, 300);
      });
    });

    document.getElementById('quizRetry')?.addEventListener('click', () => this.reset());
    document.getElementById('result1Link')?.addEventListener('click', () => this.close());
    document.getElementById('result2Link')?.addEventListener('click', () => this.close());
  },

  open()  { this.reset(); document.getElementById('quizOverlay').classList.add('open'); },
  close() { document.getElementById('quizOverlay').classList.remove('open'); },

  reset() {
    this.situation = null; this.age = null; this.detail = null;
    document.querySelectorAll('.quiz-step[data-step="0"] .quiz-option, .quiz-step[data-step="1"] .quiz-option').forEach(b => b.classList.remove('selected'));
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

  renderQ3() {
    const opts = this.Q3_OPTIONS[this.situation] || [];
    const container = document.getElementById('q3Options');
    if (!container) return;
    container.innerHTML = opts.map(o =>
      `<button class="quiz-option" data-value="${o.value}">${o.label}</button>`
    ).join('');
    container.querySelectorAll('.quiz-option').forEach(btn => {
      btn.addEventListener('click', () => {
        container.querySelectorAll('.quiz-option').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        this.detail = btn.dataset.value;
        setTimeout(() => this.showResult(), 300);
      });
    });
  },

  lookup() {
    const block = this.MAP[this.situation]?.[this.age];
    if (!block) return null;
    return block[this.detail] || block._default || null;
  },

  showResult() {
    const r = this.lookup();
    if (!r || r.length < 2) return;
    document.getElementById('result1Emoji').textContent = r[0].emoji;
    document.getElementById('result1Title').textContent = r[0].title;
    document.getElementById('result1Desc').textContent  = r[0].desc;
    const link1 = document.getElementById('result1Link');
    if (link1) link1.href = r[0].href;
    document.getElementById('result2Emoji').textContent = r[1].emoji;
    document.getElementById('result2Title').textContent = r[1].title;
    document.getElementById('result2Desc').textContent  = r[1].desc;
    const link2 = document.getElementById('result2Link');
    if (link2) link2.href = r[1].href;
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
    tags: ['JTCI 3-11', 'PAI-A', 'PAT-2'],
    testKeys: ['tci', 'pai'],
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
