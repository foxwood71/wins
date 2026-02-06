// src/app/(domain)/loc/model/types.ts

// =============================================================================
// 1. Common Code Entities
// =============================================================================
export interface FacilityCategory {
  id: number;
  code: string;
  name: string;
  description?: string;
  is_active?: boolean;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface SpaceType {
  id: number;
  code: string;
  name: string;
  description?: string;
  is_active?: boolean;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface SpaceFunction {
  id: number;
  code: string;
  name: string;
  category?: string;
  description?: string;
  is_active?: boolean;
  created_at?: Date | string;
  updated_at?: Date | string;
}

// =============================================================================
// 2. Main Entities (Facility & Space)
// =============================================================================

interface LocationBase {
  id: number;
  code: string;
  name: string;
  description?: string;
  is_active: boolean;
  sort_order?: number;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface Facility extends LocationBase {
  type: "facility";

  // Facility 전용 필드
  category_id?: number | null;
  address?: string;

  // UI Helper (Relation)
  category_info?: FacilityCategory;

  // 트리 구조 호환성을 위한 가상 필드 (시설은 항상 루트이므로 null)
  parent_id: null;
}

export interface Space extends LocationBase {
  type: "space";

  // Space 전용 필드
  // 1. 소속 정보 (어느 시설 소속인지)
  facility_id: number;
  // 2. 계층 정보 (상위 공간이 어디인지)
  parent_id: number | null;
  space_type_id?: number | null;
  space_function_id?: number | null;
  area_size?: number;
  is_restricted: boolean;

  // UI Helper (Relation)
  type_info?: SpaceType;
  function_info?: SpaceFunction;
}

/**
 * [Union Type] 위치 (Location)
 * - Repository나 Hook에서 반환 타입으로 사용할 통합 타입입니다.
 * - 이 타입을 쓰면 location.type 체크 시 자동으로 Facility나 Space로 좁혀집니다.
 */
export type Location = Facility | Space;

// =============================================================================
// 3. DTOs (Data Transfer Objects)
// =============================================================================

// 생성 DTO (공통 부분 + 개별 부분)
export interface CreateLocationDto {
  type: "facility" | "space";
  name: string;
  code: string;
  description?: string;
  is_active?: boolean;
  parent_id?: number | null; // Space인 경우 상위 공간 ID

  // Facility fields
  category_id?: number | null;
  address?: string;

  // Space fields
  facility_id?: number; // Space 생성 시 필수
  space_type_id?: number | null;
  space_function_id?: number | null;
  area_size?: number;
  is_restricted?: boolean;
}

// 수정 DTO
export interface UpdateLocationDto {
  id?: number; // PUT 요청 시 body에 포함될 수도 있음
  name?: string;
  code?: string;
  description?: string;
  is_active?: boolean;

  // 필요한 경우 type별 필드 추가
  area_size?: number;
  is_restricted?: boolean;
}
