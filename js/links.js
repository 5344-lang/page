/* ============================================================
   똑심마인드 — 스토어 링크 설정 파일
   이 파일만 수정하면 사이트 전체 링크가 한 번에 바뀝니다.
   ============================================================ */

const CONTACT_URL = 'https://open.kakao.com/o/sPbZfmsi';

/* ============================================================
   가격 설정 — 이 파일에서만 수정하면 전체 페이지에 반영됩니다.
   active: true = 판매중 / false = 판매중지 (페이지에서 숨김)
   ============================================================ */
const TEST_PRICES = {
  tci:    { price: 27000, active: true },
  kocean: { price: 12000, active: true },
  golden: { price: 28000, active: true },
  rs:     { price: 12000, active: true },
  kiri:   { price: 14000, active: true },
  pai:    { price: 15000, active: true },
  cst:    { price: 14000, active: true },
  sct:    { price:  5000, active: true },
  mlst:   { price: 14000, active: true },
  kcmii:  { price: 17000, active: true },
};

const STORE_LINKS = {

  /* ── 문의하기 링크 (네비, 푸터, 모바일 메뉴, 각 검사 버튼) ── */
  store: CONTACT_URL,

  /* ── 개별 검사 문의 링크 ── */
  tci:    CONTACT_URL,
  kocean: CONTACT_URL,
  golden: CONTACT_URL,
  rs:     CONTACT_URL,
  kiri:   CONTACT_URL,
  pai:    CONTACT_URL,
  cst:    CONTACT_URL,
  sct:    CONTACT_URL,
  mlst:   CONTACT_URL,
  kcmii:  CONTACT_URL,

  /* ── 패키지 문의 링크 ── */
  pkg_personality: CONTACT_URL,
  pkg_mental:      CONTACT_URL,
  pkg_relation:    CONTACT_URL,
  pkg_teen:        CONTACT_URL,
  pkg_couple:      CONTACT_URL,
  pkg_exam:        CONTACT_URL,
  pkg_parenting:   CONTACT_URL,

};
