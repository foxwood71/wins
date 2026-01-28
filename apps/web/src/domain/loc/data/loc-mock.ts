import { Facility, Space, SpaceType, SpaceFunction } from "../model/types";

export const FACILITIES: Facility[] = [
  {
    id: 1,
    name: "광주 제1하수처리장",
    code: "GJ-STP-01",
    category: "STP",
    address: "광주광역시...",
  },
  {
    id: 2,
    name: "용인 사업소",
    code: "YI-WTP-01",
    category: "WTP",
    address: "경기도 용인시...",
  },
];

export const SPACE_TYPES: SpaceType[] = [
  { id: 1, code: "BLD", name: "건축물" },
  { id: 2, code: "FLR", name: "층" },
  { id: 3, code: "ROOM", name: "실 (Room)" },
  { id: 4, code: "TANK", name: "수조 (Tank)" },
  { id: 5, code: "ZONE", name: "구역 (Zone)" },
];

export const SPACE_FUNCTIONS: SpaceFunction[] = [
  { id: 1, code: "ADMIN", name: "관리/행정", category: "지원시설" },
  { id: 2, code: "PUMP", name: "펌프/이송", category: "수처리공정" },
  { id: 3, code: "SED", name: "침전", category: "수처리공정" },
  { id: 4, code: "BIO", name: "생물반응", category: "수처리공정" },
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
