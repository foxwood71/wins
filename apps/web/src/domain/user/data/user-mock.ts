import { Sector, Center, Department, User, UserRole } from "../model/types";

/**
 * ✨ 1. 부문(Sector) 데이터
 */
export const SECTORS: Sector[] = [
  { id: 1, name: "환경사업부문", code: "SEC01", sort_order: 1 },
  { id: 2, name: "인프라사업부문", code: "SEC02", sort_order: 2 },
  { id: 3, name: "경영지원부문", code: "SEC03", sort_order: 3 },
  { id: 4, name: "안전보건부문", code: "SEC04", sort_order: 4 },
];

/**
 * ✨ 2. 센터(Center) 데이터
 * 지역 거점 조직으로, 부문 산하에 존재하며 시설(Facility)들을 관리합니다.
 */
export const CENTERS: Center[] = [
  {
    id: 1,
    sector_id: 1,
    name: "광주 통합 센터",
    code: "CTR01",
    facility_ids: [1, 2, 3, 4, 5],
  },
  {
    id: 2,
    sector_id: 1,
    name: "용인 사업 센터",
    code: "CTR02",
    facility_ids: [10, 11, 12],
  },
  {
    id: 3,
    sector_id: 2,
    name: "인천 신공항 센터",
    code: "CTR03",
    facility_ids: [20, 21, 22, 23],
  },
  {
    id: 4,
    sector_id: 2,
    name: "부산항만 센터",
    code: "CTR04",
    facility_ids: [30, 31],
  },
];

/**
 * ✨ 3. 부서(Department) 데이터
 * 부문 직영(본사형)과 센터 산하(현장형) 조직이 공존합니다.
 */
export const DEPARTMENTS: Department[] = [
  // 🏢 본사 직영 부서 (경영지원/안전보건부문 직속)
  {
    id: 1,
    name: "인사기획팀",
    code: "D001",
    sector_id: 3,
    center_id: null,
    facility_ids: [],
  },
  {
    id: 2,
    name: "재무관리팀",
    code: "D002",
    sector_id: 3,
    center_id: null,
    facility_ids: [],
  },
  {
    id: 3,
    name: "IT전략팀",
    code: "D003",
    sector_id: 3,
    center_id: null,
    facility_ids: [],
  },
  {
    id: 4,
    name: "안전감사팀",
    code: "D004",
    sector_id: 4,
    center_id: null,
    facility_ids: [],
  },

  // 📍 센터 산하 부서 (현장 실무 조직)
  {
    id: 10,
    name: "광주 운영1팀",
    code: "D101",
    sector_id: 1,
    center_id: 1,
    facility_ids: [1, 2],
  },
  {
    id: 11,
    name: "광주 운영2팀",
    code: "D102",
    sector_id: 1,
    center_id: 1,
    facility_ids: [3, 4],
  },
  {
    id: 12,
    name: "광주 정비팀",
    code: "D103",
    sector_id: 1,
    center_id: 1,
    facility_ids: [1, 2, 3, 4, 5],
  },
  {
    id: 20,
    name: "용인 운영팀",
    code: "D201",
    sector_id: 1,
    center_id: 2,
    facility_ids: [10, 11],
  },
  {
    id: 21,
    name: "용인 기술지원팀",
    code: "D202",
    sector_id: 1,
    center_id: 2,
    facility_ids: [12],
  },
  {
    id: 30,
    name: "인천 공정관리팀",
    code: "D301",
    sector_id: 2,
    center_id: 3,
    facility_ids: [20, 21],
  },
  {
    id: 40,
    name: "부산 시설관리팀",
    code: "D401",
    sector_id: 2,
    center_id: 4,
    facility_ids: [30, 31],
  },
];

/**
 * ✨ 4. 사용자(User) 데이터 (50명)
 * 각 조직별로 골고루 배정되었습니다.
 */
export const USERS: User[] = [
  // --- 본사 직영 부서 (1~10) ---
  {
    id: 1,
    login_id: "admin",
    name: "최고관리자",
    email: "admin@wins.com",
    phone: "010-0000-0000",
    department_id: 1,
    role: UserRole.SUPER_ADMIN,
    code: "HQ-001",
    profile_image_id: null,
    is_active: true,
  },
  {
    id: 2,
    login_id: "hr_manager",
    name: "이지원",
    email: "jw.lee@wins.com",
    phone: "010-1111-2222",
    department_id: 1,
    role: UserRole.ADMIN,
    code: "HQ-002",
    profile_image_id: null,
    is_active: true,
  },
  {
    id: 3,
    login_id: "it_specialist",
    name: "김정보기",
    email: "jb.kim@wins.com",
    phone: "010-1234-5678",
    department_id: 3,
    role: UserRole.USER,
    code: "HQ-010",
    profile_image_id: null,
    is_active: true,
  },
  {
    id: 4,
    login_id: "finance_01",
    name: "박회계",
    email: "hk.park@wins.com",
    phone: "010-2222-3333",
    department_id: 2,
    role: UserRole.USER,
    code: "HQ-021",
    profile_image_id: null,
    is_active: true,
  },
  {
    id: 5,
    login_id: "safety_auditor",
    name: "최안전",
    email: "aj.choi@wins.com",
    phone: "010-3333-4444",
    department_id: 4,
    role: UserRole.ADMIN,
    code: "HQ-050",
    profile_image_id: null,
    is_active: true,
  },
  ...Array.from({ length: 5 }).map((_, i) => ({
    id: 6 + i,
    login_id: `hq_user_${i + 1}`,
    name: `본사직원${i + 1}`,
    email: `hq${i + 1}@wins.com`,
    phone: `010-1000-100${i}`,
    department_id: (i % 4) + 1,
    role: UserRole.USER,
    code: `HQ-10${i}`,
    profile_image_id: null,
    is_active: true,
  })),

  // --- 광주 통합 센터 (11~30) ---
  {
    id: 11,
    login_id: "gj_center_mgr",
    name: "강센터",
    email: "center.gj@wins.com",
    phone: "010-5555-6666",
    department_id: 10,
    role: UserRole.ADMIN,
    code: "GJ-001",
    profile_image_id: null,
    is_active: true,
  },
  ...Array.from({ length: 19 }).map((_, i) => ({
    id: 12 + i,
    login_id: `gj_staff_${i + 1}`,
    name: `광주요원${i + 1}`,
    email: `gj${i + 1}@wins.com`,
    phone: `010-5000-50${i < 10 ? "0" + i : i}`,
    department_id: 10 + (i % 3), // 10, 11, 12 부서 분배
    role: UserRole.USER,
    code: `GJ-1${i < 10 ? "0" + i : i}`,
    profile_image_id: null,
    is_active: Math.random() > 0.1, // 10% 확률로 비활성
  })),

  // --- 용인/인천/부산 센터 (31~50) ---
  {
    id: 31,
    login_id: "yi_lead",
    name: "윤용인",
    email: "yi@wins.com",
    phone: "010-7777-8888",
    department_id: 20,
    role: UserRole.ADMIN,
    code: "YI-001",
    profile_image_id: null,
    is_active: true,
  },
  ...Array.from({ length: 19 }).map((_, i) => ({
    id: 32 + i,
    login_id: `field_user_${i + 1}`,
    name: `현장담당${i + 1}`,
    email: `field${i + 1}@wins.com`,
    phone: `010-7000-70${i < 10 ? "0" + i : i}`,
    department_id: [20, 21, 30, 40][i % 4], // 여러 센터 부서 분배
    role: UserRole.USER,
    code: `FLD-2${i < 10 ? "0" + i : i}`,
    profile_image_id: null,
    is_active: true,
  })),
];
