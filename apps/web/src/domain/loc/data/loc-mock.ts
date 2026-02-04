import {
  Facility,
  FacilityCategory,
  Space,
  SpaceFunction,
  SpaceType,
} from "@/loc/model/types";

// 1. 카테고리
export const FACILITY_CATEGORIES: FacilityCategory[] = [
  { id: 10, code: "CUL", name: "문화/집회 시설" },
  { id: 20, code: "ENV", name: "환경 기초 시설" },
  { id: 30, code: "SPT", name: "체육/운동 시설" },
];

// 2. 공간 유형 (아이콘 매핑용)
export const SPACE_TYPES: SpaceType[] = [
  { id: 1, code: "BLD", name: "건물 (Building)" },
  { id: 2, code: "FLR", name: "층 (Floor)" },
  { id: 3, code: "ROOM", name: "실 (Room)" },
  { id: 4, code: "EQ", name: "설비/장비 (Equipment)" },
  { id: 5, code: "ZONE", name: "구역 (Zone)" },
];

// 3. 공간 기능
export const SPACE_FUNCTIONS: SpaceFunction[] = [
  { id: 1, code: "OFFICE", name: "사무/행정" },
  { id: 2, code: "HVAC", name: "공조/기계" },
  { id: 3, code: "ELEC", name: "전기/배전" },
  { id: 4, code: "PUB", name: "공용/통로" },
  { id: 5, code: "PROC", name: "생산/처리" },
];

// 4. 시설 목록 (요청하신 3곳)
export const FACILITIES: Facility[] = [
  {
    id: 100,
    code: "CUL-001",
    name: "시민 문화센터",
    category_id: 10,
    address: "서울시 문화구 예술로 123",
    description: "공연장 및 전시장 복합 시설",
    is_active: true,
    category_info: FACILITY_CATEGORIES[0],
  },
  {
    id: 200,
    code: "ENV-001",
    name: "제1 하수처리장",
    category_id: 20,
    address: "경기도 맑은물시 정화로 77",
    description: "생활 하수 고도 처리 시설",
    is_active: true,
    category_info: FACILITY_CATEGORIES[1],
  },
  {
    id: 300,
    code: "SPT-001",
    name: "국민 체육센터",
    category_id: 30,
    address: "서울시 건강구 튼튼로 88",
    description: "수영장 및 실내 체육관",
    is_active: false, // 리모델링 중 가정
    category_info: FACILITY_CATEGORIES[2],
  },
];

// 5. 공간 목록 (시설별 계층 데이터)
export const SPACES: Space[] = [
  // --- [100] 시민 문화센터 ---
  {
    id: 101,
    facility_id: 100,
    parent_id: null,
    code: "CUL-MAIN",
    name: "본관동",
    space_type_id: 1,
    space_function_id: 4,
    area_size: 5000,
    is_restricted: false,
    is_active: true,
    type_info: SPACE_TYPES[0],
    function_info: SPACE_FUNCTIONS[3],
  },
  {
    id: 102,
    facility_id: 100,
    parent_id: 101,
    code: "CUL-1F",
    name: "1층",
    space_type_id: 2,
    space_function_id: 4,
    area_size: 1200,
    is_restricted: false,
    is_active: true,
    type_info: SPACE_TYPES[1],
    function_info: SPACE_FUNCTIONS[3],
  },
  {
    id: 103,
    facility_id: 100,
    parent_id: 102,
    code: "CUL-101",
    name: "대공연장",
    space_type_id: 3,
    space_function_id: 1,
    area_size: 800,
    is_restricted: true,
    is_active: true,
    type_info: SPACE_TYPES[2],
    function_info: SPACE_FUNCTIONS[0],
  },
  {
    id: 104,
    facility_id: 100,
    parent_id: 102,
    code: "CUL-102",
    name: "안내데스크",
    space_type_id: 3,
    space_function_id: 1,
    area_size: 50,
    is_restricted: false,
    is_active: true,
    type_info: SPACE_TYPES[2],
    function_info: SPACE_FUNCTIONS[0],
  },

  // --- [200] 제1 하수처리장 ---
  {
    id: 201,
    facility_id: 200,
    parent_id: null,
    code: "ENV-TRT",
    name: "수처리동",
    space_type_id: 1,
    space_function_id: 5,
    area_size: 3000,
    is_restricted: true,
    is_active: true,
    type_info: SPACE_TYPES[0],
    function_info: SPACE_FUNCTIONS[4],
  },
  {
    id: 202,
    facility_id: 200,
    parent_id: 201,
    code: "ENV-B1",
    name: "지하 1층 펌프실",
    space_type_id: 2,
    space_function_id: 2,
    area_size: 800,
    is_restricted: true,
    is_active: true,
    type_info: SPACE_TYPES[1],
    function_info: SPACE_FUNCTIONS[1],
  },
  {
    id: 203,
    facility_id: 200,
    parent_id: 202,
    code: "PUMP-01",
    name: "오수 유입 펌프 #1",
    space_type_id: 4,
    space_function_id: 2, // 장비
    area_size: 10,
    is_restricted: true,
    is_active: true,
    type_info: SPACE_TYPES[3],
    function_info: SPACE_FUNCTIONS[1],
  },
  {
    id: 204,
    facility_id: 200,
    parent_id: 201,
    code: "ENV-CTL",
    name: "중앙 제어실",
    space_type_id: 3,
    space_function_id: 3,
    area_size: 120,
    is_restricted: true,
    is_active: true,
    type_info: SPACE_TYPES[2],
    function_info: SPACE_FUNCTIONS[2],
  },

  // --- [300] 국민 체육센터 ---
  {
    id: 301,
    facility_id: 300,
    parent_id: null,
    code: "SPT-MAIN",
    name: "센터 본관",
    space_type_id: 1,
    space_function_id: 4,
    area_size: 2500,
    is_restricted: false,
    is_active: false, // 공사중
    type_info: SPACE_TYPES[0],
    function_info: SPACE_FUNCTIONS[3],
  },
  {
    id: 302,
    facility_id: 300,
    parent_id: 301,
    code: "SPT-POOL",
    name: "실내 수영장",
    space_type_id: 5,
    space_function_id: 4, // 구역
    area_size: 800,
    is_restricted: false,
    is_active: false,
    type_info: SPACE_TYPES[4],
    function_info: SPACE_FUNCTIONS[3],
  },
  {
    id: 303,
    facility_id: 300,
    parent_id: 301,
    code: "SPT-GYM",
    name: "다목적 체육관",
    space_type_id: 3,
    space_function_id: 4,
    area_size: 600,
    is_restricted: false,
    is_active: false,
    type_info: SPACE_TYPES[2],
    function_info: SPACE_FUNCTIONS[3],
  },
];
