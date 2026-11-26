# 🐻 똑심 마음연구소 — 사이트 소스

> 크몽 연동 심리검사 소개 사이트 (아이 학습·공부법 검사는 별도 사이트 똑심마인드 키즈)  
> GitHub Pages 배포 기준으로 제작됨

## 🔗 링크

- **GitHub Pages URL**: `https://5344-lang.github.io/page/`
- **크몽 문의**: https://kmong.com/gig/766983
- **똑심마인드 키즈**: https://5344-lang.github.io/kids/

## 📁 파일 구조

```
site제작/
├── index.html          ← 메인 홈 (전체 검사 라인업 + 패키지 + 퀴즈 팝업)
├── css/
│   └── style.css       ← 공통 스타일시트 (어스 톤, 반응형)
├── js/
│   └── main.js         ← 퀴즈 모달 + 스크롤 리빌 + 모바일 메뉴
└── pages/
    ├── tci.html         ← TCI 기질 및 성격검사 (대표 검사)
    ├── kocean.html      ← K-OCEAN 5요인 성격검사
    ├── golden.html      ← GOLDEN 골든성격유형검사
    ← rs.html           ← RS 회복탄력성검사
    ├── kiri.html        ← KiRi 통합적 대인관계검사
    ├── pai.html         ← PAI / PAI-A 성격평가 질문지
    ├── cst.html         ← CST 성격강점검사
    ├── sct.html         ← SCT 문장완성검사 (리뷰 이벤트)
    ├── mlst.html        ← MLST-II 학습전략검사 (초등/청소년/대학생)
    └── kcmii.html       ← KCMII-2 대학전공선택검사 (Holland 이론)
```

## 🚀 GitHub Pages 배포 방법

1. `https://github.com/5344-lang/page` 레포에 이 폴더 내용을 push
2. Settings → Pages → Branch: `main`, Folder: `/ (root)` 선택 후 Save
3. 약 1~2분 후 `https://5344-lang.github.io/page/` 에서 확인

## ✏️ 커스터마이징 메모

- **스토어 개별 상품 링크**: 각 `pages/*.html` 하단 CTA 버튼의 href를 상품별 URL로 교체
  - 현재: `https://smartstore.naver.com/talk_sim_mind` (스토어 홈)
  - 교체: 각 상품 페이지 URL로 변경
- **원장님 사진**: `expert-avatar-wrap` 내 SVG를 `<img src="..." />` 로 교체
- **색상 변경**: `css/style.css` 상단 `:root {}` CSS 변수만 수정하면 전체 색상 변경

## 📦 포함된 패키지 (7종)

| 패키지 | 구성 | 타겟 |
|--------|------|------|
| 종합 성격 | TCI + K-OCEAN | 성인 자기이해 |
| 멘탈 회복 | TCI + RS + SCT | 심리 치유 |
| 대인관계 | KiRi + PAI | 관계 어려움 |
| 청소년 성장 | JTCI + GOLDEN + CST | 청소년 |
| 커플 핏 | TCI×2 + KiRi×2 | 커플 |
| 수험생 케어 | JTCI + MLST-II + RS + CST | 수험생 |
| 부모-자녀 양육 | JTCI + PAI-A + PAT-2 | 양육 |


## 가격·링크 수정
- 관리자 페이지는 없앴습니다. 가격·판매 여부·크몽 링크는 `js/links.js` 한 파일만 고치면 됩니다.
- 저장소에 토큰·비밀번호를 올리지 마세요.

## 🧒 키즈 연동
- 메뉴·홈 카드·맞춤 검사 결과·검사 상세·패키지 페이지에서 키즈로 안내합니다.
- 역할 구분: 이 사이트는 아이 기질 + 부모 양육태도(부모 이해), 키즈는 학년별 학습검사·공부법.
