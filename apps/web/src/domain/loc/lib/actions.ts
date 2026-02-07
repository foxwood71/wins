// location domain api program
"use server";

import { db } from "@/shared/lib/db";
import { getErrorMessage } from "@/shared/lib/utils";
import { Facility, Space, CreateLocationDto } from "@/loc/model/types";

// DB 에러 타입 정의
interface PostgresError extends Error {
  code?: string;
}

// =============================================================================
// 1. 조회 로직 (Get)
// =============================================================================

/**
 * 시설과 공간을 모두 가져와서 하나의 배열로 반환합니다.
 * 반환 타입: (Facility | Space)[]
 */
export async function getLocationList(): Promise<(Facility | Space)[]> {
  // 1. 시설(Facilities) 조회 쿼리
  // - type: 'facility'로 고정
  // - parent_id: NULL로 고정 (시설은 부모가 없음)
  const facilitiesQuery = `
    SELECT 
      f.id, 
      f.name, 
      f.code, 
      f.address, 
      NULL::int as parent_id, 
      'facility' as type,
      f.category_id,
      f.description,
      f.sort_order,
      f.is_active,
      f.created_at, 
      f.updated_at,
      json_build_object(
        'id', c.id, 
        'name', c.name, 
        'code', c.code
      ) as category_info
    FROM loc.facilities f
    LEFT JOIN loc.facility_categories c ON f.category_id = c.id
    WHERE f.is_active = true
    ORDER BY f.sort_order ASC, f.id ASC
  `;

  // 2. 공간(Spaces) 조회 쿼리
  // - type: 'space'로 고정
  const spacesQuery = `
    SELECT 
      s.id, 
      s.name, 
      s.code, 
      s.parent_id, 
      'space' as type,
      s.facility_id,
      s.space_type_id,
      s.space_function_id,
      s.area_size,
      s.is_restricted,
      s.description,
      s.sort_order,
      s.is_active,
      s.created_at,
      s.updated_at,
      json_build_object(
        'id', t.id, 
        'name', t.name, 
        'code', t.code
      ) as type_info,
      json_build_object(
        'id', fn.id, 
        'name', fn.name, 
        'code', fn.code
      ) as function_info
    FROM loc.spaces s
    LEFT JOIN loc.space_types t ON s.space_type_id = t.id
    LEFT JOIN loc.space_functions fn ON s.space_function_id = fn.id
    WHERE s.is_active = true
    ORDER BY s.sort_order ASC, s.id ASC
  `;

  try {
    // 두 쿼리를 병렬로 실행
    const [facilitiesRes, spacesRes] = await Promise.all([
      db.query<Facility>(facilitiesQuery),
      db.query<Space>(spacesQuery),
    ]);

    // ✨ [핵심] 두 배열을 합칠 때 타입을 (Facility | Space)[]로 명시
    const result: (Facility | Space)[] = [
      ...facilitiesRes.rows,
      ...spacesRes.rows,
    ];

    return result;
  } catch (error: unknown) {
    console.error("🔥 [DB 조회 실패]:", error);
    throw new Error(`목록 조회 실패: ${getErrorMessage(error)}`);
  }
}

// =============================================================================
// 2. 상세 조회
// =============================================================================

export async function getLocationById(
  id: number,
  type: "facility" | "space",
): Promise<Facility | Space | null> {
  if (type === "facility") {
    const query = `
      SELECT *, 'facility' as type, NULL::int as parent_id
      FROM loc.facilities WHERE id = $1
    `;
    const res = await db.query<Facility>(query, [id]);
    return res.rows[0] ?? null;
  } else {
    const query = `
      SELECT *, 'space' as type 
      FROM loc.spaces WHERE id = $1
    `;
    const res = await db.query<Space>(query, [id]);
    return res.rows[0] ?? null;
  }
}

// =============================================================================
// 3. 생성 로직 (Create)
// =============================================================================

export async function createLocation(
  data: CreateLocationDto,
): Promise<Facility | Space> {
  const {
    name,
    code,
    type,
    parent_id,
    facility_id,
    category_id,
    address,
    space_type_id,
    space_function_id,
    description,
    area_size,
    is_restricted,
  } = data;

  const finalCode =
    code || (type === "facility" ? `FAC-${Date.now()}` : `SPC-${Date.now()}`);

  try {
    // [Case A] 시설 생성
    // type이 facility이거나, 부모 정보(parentId, facility_id)가 모두 없는 경우
    if (type === "facility" || (!parent_id && !facility_id)) {
      const query = `
        INSERT INTO loc.facilities (
            name, code, category_id, address, description, is_active
        )
        VALUES ($1, $2, $3, $4, $5, true)
        RETURNING *, 'facility' as type, NULL::int as parent_id
      `;
      const params = [
        name,
        finalCode,
        category_id || null,
        address || null,
        description || null,
      ];

      const res = await db.query<Facility>(query, params);
      if (!res.rows[0]) throw new Error("시설 생성 실패");

      return res.rows[0];
    }

    // [Case B] 공간 생성
    else {
      const query = `
        INSERT INTO loc.spaces (
          name, code, facility_id, parent_id, 
          space_type_id, space_function_id, 
          area_size, is_restricted, description, is_active
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, true)
        RETURNING *, 'space' as type
      `;

      // 공간은 facility_id가 필수이므로 없으면 0(또는 에러) 처리
      const safeFacilityId = facility_id ?? 0;

      const params = [
        name,
        finalCode,
        safeFacilityId,
        parent_id || null,
        space_type_id || null,
        space_function_id || null,
        area_size || 0,
        is_restricted || false,
        description || null,
      ];

      const res = await db.query<Space>(query, params);
      if (!res.rows[0]) throw new Error("공간 생성 실패");
      return res.rows[0];
    }
  } catch (error: unknown) {
    console.error("Database Error in createLocation:", error);
    if (isPostgresError(error) && error.code === "23505") {
      throw new Error(`이미 존재하는 코드입니다: ${getErrorMessage(error)}`);
    }
    throw error;
  }
}

// =============================================================================
// 4. 삭제 로직
// =============================================================================

export async function deleteLocation(
  id: number,
  type: "facility" | "space",
): Promise<void> {
  let query = "";
  // 시설/공간은 별도 테이블이므로 반드시 type 분기 필요
  if (type === "facility") {
    query = "DELETE FROM loc.facilities WHERE id = $1";
  } else {
    query = "DELETE FROM loc.spaces WHERE id = $1";
  }
  await db.query(query, [id]);
}

// Error Guard
function isPostgresError(error: unknown): error is PostgresError {
  return typeof error === "object" && error !== null && "code" in error;
}
