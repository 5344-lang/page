/* ============================================================
   똑심마인드 — 스토어 링크 설정 파일
   이 파일만 수정하면 사이트 전체 링크가 한 번에 바뀝니다.

   [개별 검사] 각 검사 키에 크몽 개별 상품 URL을 입력하세요.
               값이 비어 있거나 없으면 자동으로 CONTACT_URL로 연결됩니다.

   [패키지]    각 패키지마다 고유 크몽 상품 URL을 입력하세요.
               마찬가지로 값이 없으면 CONTACT_URL로 자동 연결됩니다.
   ============================================================ */

const CONTACT_URL = 'https://kmong.com/gig/766983';

const STORE_LINKS = {
  /* ── 기본(공통) 문의 URL ── */
  store: CONTACT_URL,

  /* ── 개별 검사 (각 키에 크몽 개별 상품 URL 입력) ── */
  tci:     CONTACT_URL,
  kocean:  CONTACT_URL,
  golden:  CONTACT_URL,
  rs:      CONTACT_URL,
  kiri:    CONTACT_URL,
  pai:     CONTACT_URL,
  cst:     CONTACT_URL,
  sct:     CONTACT_URL,
  mlst:    CONTACT_URL,
  kcmii:   CONTACT_URL,
  sts:     CONTACT_URL,
  pat:     CONTACT_URL,
  neo:     CONTACT_URL,
  mindfit: CONTACT_URL,
  cat:     CONTACT_URL,
  ieej:    CONTACT_URL,

  /* ── 패키지 (패키지마다 고유 URL 입력) ── */
  pkg_personality:     CONTACT_URL,
  pkg_mental:          CONTACT_URL,
  pkg_relation:        CONTACT_URL,
  pkg_relation1:       CONTACT_URL,
  pkg_teen:            CONTACT_URL,
  pkg_couple:          CONTACT_URL,
  pkg_exam:            CONTACT_URL,
  pkg_parenting:       CONTACT_URL,
  pkg_parenting_infant:CONTACT_URL,
  pkg_parenting_school:CONTACT_URL,
  pkg_career:          CONTACT_URL,
  pkg_univ:            CONTACT_URL,
  pkg_burnout:         CONTACT_URL,
  pkg_neo:             CONTACT_URL,
  pkg_deepdive:        CONTACT_URL,
  pkg_work:            CONTACT_URL,
};

/* ============================================================
   가격 설정 — active: true = 판매중 / false = 판매중지
   ============================================================ */
const TEST_PRICES = {
  tci    : { price:  27000, active: true },
  kocean : { price:  12000, active: true },
  golden : { price:  27000, active: true },
  rs     : { price:  12000, active: true },
  kiri   : { price:  14000, active: true },
  pai    : { price:  15000, active: true },
  cst    : { price:  14000, active: true },
  sct    : { price:   5000, active: true, free: true },
  mlst   : { price:  14000, active: true },
  kcmii  : { price:  17000, active: true },
  sts    : { price:  12000, active: true },
  pat    : { price:  15000, active: true },
  neo    : { price:  15000, active: true },
  mindfit: { price:  14000, active: true },
  cat    : { price:  12000, active: true },
  ieej   : { price:  15000, active: true },
};
