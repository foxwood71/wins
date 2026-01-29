import {
  FacilityCategory,
  Facility,
  Space,
  SpaceType,
  SpaceFunction,
} from "@loc/model/types";

export const FACILITY_CATEGORIES: FacilityCategory[] = [
  { id: 1, name: "공조 설비 (HVAC)", code: "CAT-HVAC" },
  { id: 2, name: "전력 설비 (Power)", code: "CAT-PWR" },
  { id: 3, name: "센서/IoT (Sensor)", code: "CAT-IOT" },
  { id: 4, name: "기타 (Etc)", code: "CAT-ETC" },
];

export const FACILITIES: Facility[] = [
  // ✨ [수정] category_id로 매핑
  {
    id: 1,
    name: "본관 공조기 #1",
    code: "HVAC-01",
    category_id: 1,
    is_active: true,
  },
  {
    id: 2,
    name: "변전실 메인 차단기",
    code: "PWR-MAIN",
    category_id: 2,
    is_active: true,
  },
];

export const SPACE_TYPES: SpaceType[] = [
  { id: 1, name: "실내 (Indoor)", code: "TYPE-IN" },
  { id: 2, name: "실외 (Outdoor)", code: "TYPE-OUT" },
  { id: 3, name: "준실내 (Semi-Indoor)", code: "TYPE-SEMI" },
];

export const SPACE_FUNCTIONS: SpaceFunction[] = [
  {
    id: 1,
    name: "일반 사무실",
    code: "FUNC-001",
    description: "행정 및 업무를 위한 일반 공간",
    is_active: true,
  },
  {
    id: 2,
    name: "기계실",
    code: "FUNC-002",
    description: "공조기, 펌프 등 주요 설비가 설치된 공간",
    is_active: true,
  },
  {
    id: 3,
    name: "전기실",
    code: "FUNC-003",
    description: "배전반, 변압기 등이 설치된 위험 구역",
    is_active: true,
  },
  {
    id: 4,
    name: "창고",
    code: "FUNC-004",
    description: "자재 및 물품 보관소",
    is_active: true,
  },
  {
    id: 5,
    name: "공용 공간",
    code: "FUNC-005",
    description: "복도, 로비, 휴게실 등",
    is_active: true,
  },
  {
    id: 6,
    name: "서버/전산실",
    code: "FUNC-006",
    description: "IT 인프라 및 서버 랙 설치 공간",
    is_active: true,
  },
];
export const SPACES: Space[] = [
  // --- 광주 처리장 (ID: 1) ---
  // 1. 관리동 (건물)
  {
    id: 10,
    facility_id: 1,
    space_type_id: 1,
    space_function_id: 1,
    code: "BLD-01",
    name: "관리동",
    is_restricted: false,
    type_info: SPACE_TYPES[0],
  },
  // 1-1. 관리동 1층
  {
    id: 11,
    facility_id: 1,
    space_type_id: 2,
    parent_id: 10,
    code: "BLD-01-1F",
    name: "지상 1층",
    is_restricted: false,
    type_info: SPACE_TYPES[1],
  },
  // 1-1-1. 중앙제어실
  {
    id: 12,
    facility_id: 1,
    space_type_id: 3,
    space_function_id: 1,
    parent_id: 11,
    code: "RM-101",
    name: "중앙제어실",
    area_size: 120.5,
    is_restricted: true,
    type_info: SPACE_TYPES[2],
  },

  // 2. 침전지 (수조)
  {
    id: 20,
    facility_id: 1,
    space_type_id: 4,
    space_function_id: 3,
    code: "TANK-01",
    name: "1차 침전지",
    area_size: 500,
    is_restricted: true,
    type_info: SPACE_TYPES[3],
  },
];
