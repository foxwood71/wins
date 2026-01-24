/**
 * ✨ WINS 시스템 통합 조직 및 사용자 모델
 * DB 스키마(usr.sectors, usr.centers, usr.departments, usr.users)와 동기화됨
 */

// 1. 권한 열거형 (DB의 integer role 매핑)
export enum UserRole {
  SUPER_ADMIN = 1, // 최고관리자
  ADMIN = 10, // 관리자
  USER = 100, // 일반사용자
}

// 2. 부문 (Sector): 최상위 위계
export interface Sector {
  id: number;
  name: string; // 예: 환경사업부문, 경영지원부문
  code: string | null;
  sort_order?: number;
}

// 3. 센터 (Center): 지역 거점 조직
export interface Center {
  id: number;
  sector_id: number; // 소속 부문 참조
  name: string; // 예: 광주 통합 센터
  code: string | null;
  facility_ids: number[]; // ✨ 관할 시설(loc.wastewater_plants) ID 목록
}

// 4. 부서 (Department): 실무 조직
export interface Department {
  id: number;
  name: string;
  code: string | null;
  sector_id: number | null; // 본사 직업 부서일 경우 존재
  center_id: number | null; // 센터 산하 부서일 경우 존재
  facility_ids: number[]; // ✨ 부서 실무 관할 시설 ID 목록
}

// 5. 사용자 (User)
export interface User {
  id: number;
  login_id: string; // DB: login_id (UI: loginId와 매핑)
  name: string; // DB: name (UI: userName과 매핑)
  password_hash?: string; // 클라이언트에서는 주로 생략
  email: string | null;
  phone: string | null; // 연락처 (비상망)
  department_id: number | null;
  role: UserRole; // 1, 10, 100
  code: string | null; // 사번 등
  profile_image_id: number | null;
  is_active: boolean; // 계정 활성 상태
  last_login_at?: string;
}
