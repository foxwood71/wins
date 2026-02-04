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

export type CodeItem = FacilityCategory | SpaceType | SpaceFunction;

// =============================================================================
// 2. Main Entities (Facility & Space)
// =============================================================================

export interface Location {
  id: number;
  code: string;
  name: string;
  parent_id: number | null;
  type: string;
  address: string;
  description?: string;
  is_active: boolean;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface Facility extends Location {
  // DB Columns
  category_id?: number | null;
  sort_order?: number;

  // [삭제됨] address, contact_person, contact_phone 제거

  // UI Helper (Relation)
  category_info?: FacilityCategory;
}

export interface Space extends Location {
  facility_id: number;

  // DB Columns
  space_type_id?: number | null;
  space_function_id?: number | null;
  area_size?: number;
  is_restricted: boolean;
  sort_order?: number;

  // UI Helper (Relation)
  type_info?: SpaceType;
  function_info?: SpaceFunction;
}

export type LocData = Facility | Space | FacilityCategory;

// =============================================================================
// 3. DTOs (API Request Body)
// =============================================================================

export interface CreateFacilityDto {
  name: string;
  code: string;
  category_id?: number | null;
  address?: string;
  description?: string;
  is_active?: boolean;
}

export interface CreateSpaceDto {
  name: string;
  code: string;
  facility_id: number;
  parent_id?: number | null;
  space_type_id?: number | null;
  space_function_id?: number | null;
  area_size?: number;
  is_restricted?: boolean;
  description?: string;
  is_active?: boolean;
}

export interface UpdateLocationDto {
  name?: string;
  code?: string;
  description?: string;
  type?: string;
  is_active?: boolean;
}

// =============================================================================
// 4. Utilities
// =============================================================================
export interface SelectOption {
  id: number | string;
  name: string;
  code?: string;
}

export type SqlParam = string | number | boolean | null;
