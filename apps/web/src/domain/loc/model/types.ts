export interface FacilityCategory {
  id: number;
  name: string;
  code: string;
  description?: string;
}

export interface Facility {
  id: number;
  code: string;
  name: string;
  category_id: number;
  address?: string;
  description?: string;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface SpaceType {
  id: number;
  code: string; // 'BLD', 'FLR', 'ROOM', 'TANK'
  name: string;
  description?: string; // 설명
  is_active?: boolean; // 사용 여부
}

export interface SpaceFunction {
  id: number;
  code: string; // 'SED', 'AER', 'PUMP'
  name: string;
  description?: string; // 설명
  is_active?: boolean; // 사용 여부
}

export interface Space {
  id: number;
  facility_id: number;
  space_type_id: number;
  space_function_id?: number | null;
  parent_id?: number | null;
  code: string;
  name: string;
  area_size?: number;
  is_restricted: boolean;
  description?: string;
  // UI 헬퍼 속성 (DB에는 없지만 조인된 정보)
  type_info?: SpaceType;
  function_info?: SpaceFunction;

  created_at?: string;
  updated_at?: string;
}

// 트리 노드용 유니온 타입
// export type LocData = Facility | Space | FacilityCategory;
export type LocData =
  | (Facility & { type: "facility" })
  | (Space & { type: "space" })
  | (FacilityCategory & { type: "category" });
