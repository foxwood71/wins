export interface Facility {
  id: number;
  code: string;
  name: string;
  category: string; // 'STP' | 'WTP' | 'ETC'
  address?: string;
  description?: string;
}

export interface SpaceType {
  id: number;
  code: string; // 'BLD', 'FLR', 'ROOM', 'TANK'
  name: string;
}

export interface SpaceFunction {
  id: number;
  code: string; // 'SED', 'AER', 'PUMP'
  name: string;
  category: string;
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
}

// 트리 노드용 유니온 타입
export type LocData = Facility | Space;
