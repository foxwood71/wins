"use server";

import { db } from "@/shared/lib/db";
import { LocData, Facility, Space, SqlParam } from "@/loc/model/types";

// DB 에러 타입 정의 (PostgresError 형태)
interface PostgresError extends Error {
  code?: string;
}

// =============================================================================
// 1. 조회 로직 (Get)
// =============================================================================

/**
 * 시설/공간 전체 리스트 조회
 * 반환 타입: Promise<LocData[]> (any[] 아님)
 */
export async function getLocationList(
  parentId: number | null = null, // 사용되지 않더라도 시그니처 유지
): Promise<LocData[]> {
  // 1. 시설(Facilities) 조회
  const facilitiesQuery = `
    SELECT 
      f.id, 
      f.name, 
      f.code, 
      NULL::int as parent_id, 
      'facility' as type,
      f.category_id,
      f.description,
      f.sort_order,
      f.is_active,
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

  // 2. 공간(Spaces) 조회
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
    // 제네릭을 사용하여 결과 타입을 명시 (Facility[], Space[])
    const [facilitiesRes, spacesRes] = await Promise.all([
      db.query<Facility>(facilitiesQuery),
      db.query<Space>(spacesQuery),
    ]);

    // 타입 단언 없이도 LocData[] 호환됨
    const result: LocData[] = [...facilitiesRes.rows, ...spacesRes.rows];

    // 성공 로그
    console.log(
      `✅ DB 조회 성공: 시설 ${facilitiesRes.rowCount}개, 공간 ${spacesRes.rowCount}개`,
    );

    return result;
  } catch (error: unknown) {
    // 🚨 여기가 핵심입니다! 터미널에 빨간색으로 에러를 찍어줍니다.
    console.error("\n========================================");
    console.error("🔥 [DB 연결 실패] 진짜 에러 원인:");
    console.error(error);
    console.error("========================================\n");
    throw new Error("데이터 목록을 불러오지 못했습니다.");
  }
}

// =============================================================================
// 2. 상세 조회
// =============================================================================

export async function getLocationById(
  id: number,
  type: "facility" | "space",
): Promise<LocData | null> {
  let query = "";

  // 쿼리 분기
  if (type === "facility") {
    query = "SELECT *, 'facility' as type FROM loc.facilities WHERE id = $1";
    const res = await db.query<Facility>(query, [id]);
    return res.rows[0] ?? null;
  } else {
    query = "SELECT *, 'space' as type FROM loc.spaces WHERE id = $1";
    const res = await db.query<Space>(query, [id]);
    return res.rows[0] ?? null;
  }
}

// =============================================================================
// 3. 생성 로직 (Create)
// =============================================================================

// 생성 시 필요한 파라미터 타입 정의 (any 제거를 위해 명시)
interface CreateLocationParams {
  name: string;
  code?: string;
  type?: string; // 'facility' | 'space'
  parentId?: number | null;

  // 추가 필드
  facility_id?: number;
  category_id?: number;
  space_type_id?: number;
  space_function_id?: number;
  description?: string;
  area_size?: number;
  is_restricted?: boolean;
  latitude?: number;
  longitude?: number;
}

export async function createLocation(
  data: CreateLocationParams,
): Promise<LocData> {
  const {
    name,
    code,
    type,
    parentId,
    facility_id,
    category_id,
    space_type_id,
    space_function_id,
    description,
    area_size,
    is_restricted,
    latitude,
    longitude,
  } = data;

  let query = "";
  let params: SqlParam[] = [];

  // 코드 자동 생성 로직
  const finalCode =
    code || (type === "facility" ? `FAC-${Date.now()}` : `SPC-${Date.now()}`);

  try {
    // [Case A] 시설 생성
    if (type === "facility" || (!parentId && !facility_id)) {
      query = `
        INSERT INTO loc.facilities (
            name, code, category_id, description, latitude, longitude, is_active
        )
        VALUES ($1, $2, $3, $4, $5, $6, true)
        RETURNING *, 'facility' as type
      `;
      params = [
        name,
        finalCode,
        category_id || null,
        description || null,
        latitude || null,
        longitude || null,
      ];

      const res = await db.query<Facility>(query, params);
      if (!res.rows[0]) throw new Error("시설 생성 실패");
      return res.rows[0];
    }

    // [Case B] 공간 생성
    else {
      query = `
        INSERT INTO loc.spaces (
          name, code, facility_id, parent_id, 
          space_type_id, space_function_id, 
          area_size, is_restricted, description, is_active
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, true)
        RETURNING *, 'space' as type
      `;

      // 공간은 facility_id가 필수지만, 로직상 없을 경우 에러 처리 필요
      const safeFacilityId = facility_id ?? 0; // 혹은 throw Error

      params = [
        name,
        finalCode,
        safeFacilityId,
        parentId || null,
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

    // error를 안전하게 타입 좁히기 (Type Narrowing)
    if (isPostgresError(error)) {
      if (error.code === "23505") {
        throw new Error("이미 존재하는 코드입니다.");
      }
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
  if (type === "facility") {
    query = "DELETE FROM loc.facilities WHERE id = $1";
  } else {
    query = "DELETE FROM loc.spaces WHERE id = $1";
  }
  await db.query(query, [id]);
}

// -----------------------------------------------------------------------------
// Helper: Error Type Guard
// -----------------------------------------------------------------------------
function isPostgresError(error: unknown): error is PostgresError {
  return typeof error === "object" && error !== null && "code" in error;
}
