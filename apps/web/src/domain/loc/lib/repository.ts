import {
  Location,
  CreateLocationDto,
  UpdateLocationDto,
} from "@/loc/model/types";

// API 기본 주소
const BASE_URL = "/api/v1/loc";

/**
 * [Type Definition] 서버에서 들어오는 Raw Data의 모든 가능성을 열어둔 인터페이스
 * DB 스키마(wins.loc.pgsql)의 모든 컬럼을 포함합니다.
 */
interface RawLocationData {
  // 공통 필드
  id: number;
  code: string;
  name: string;
  description?: string;
  is_active: boolean;
  sort_order?: number;
  created_at?: string | Date;
  updated_at?: string | Date;

  // 식별자 (Facility / Space 구분용)
  facility_id?: number | null;
  parent_id?: number | null;

  // Facility 전용 필드
  category_id?: number | null;
  address?: string;

  // Space 전용 필드
  space_type_id?: number | null;
  space_function_id?: number | null;
  area_size?: number;
  is_restricted?: boolean;

  // 기타 미정의 필드
  [key: string]: unknown;
}

/**
 * [Helper] API 응답 에러 처리 및 타입 캐스팅
 */
const handleResponse = async <T>(res: Response): Promise<T> => {
  if (!res.ok) {
    const errorBody = (await res.json().catch(() => ({}))) as {
      error?: string;
    };
    throw new Error(errorBody.error || "API 요청에 실패했습니다.");
  }
  return res.json() as Promise<T>;
};

/**
 * 1. 전체 위치 데이터 조회 (GET)
 * - Raw Data를 받아 Frontend Model(Location)로 완벽하게 매핑합니다.
 */
export const fetchLocations = async (): Promise<Location[]> => {
  const res = await fetch(BASE_URL, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
  });

  const rawData = await handleResponse<RawLocationData[]>(res);

  return rawData.map((item): Location => {
    // 식별 로직: facility_id가 숫자형으로 존재하면 Space입니다.
    const isSpace = typeof item.facility_id === "number";

    if (isSpace) {
      // ---------------------------------------------------------
      // [Space] 매핑 (DB: loc.spaces)
      // ---------------------------------------------------------
      return {
        // 1. 공통 필드
        id: item.id,
        code: item.code,
        name: item.name,
        description: item.description,
        is_active: item.is_active,
        sort_order: item.sort_order,
        created_at: item.created_at,
        updated_at: item.updated_at,

        // 2. 타입 식별자
        type: "space",

        // 3. 관계 ID
        facility_id: item.facility_id!, // 위에서 체크했으므로 확정 할당
        parent_id: typeof item.parent_id === "number" ? item.parent_id : null,

        // 4. Space 전용 데이터 (모두 매핑)
        space_type_id:
          typeof item.space_type_id === "number" ? item.space_type_id : null,
        space_function_id:
          typeof item.space_function_id === "number"
            ? item.space_function_id
            : null,
        area_size:
          typeof item.area_size === "number" ? item.area_size : undefined,
        // DB가 boolean을 주겠지만, 혹시 모를 null/undefined 대비하여 기본값 false 처리
        is_restricted: !!item.is_restricted,
      };
    } else {
      // ---------------------------------------------------------
      // [Facility] 매핑 (DB: loc.facilities)
      // ---------------------------------------------------------
      return {
        // 1. 공통 필드
        id: item.id,
        code: item.code,
        name: item.name,
        description: item.description,
        is_active: item.is_active,
        sort_order: item.sort_order,
        created_at: item.created_at,
        updated_at: item.updated_at,

        // 2. 타입 식별자
        type: "facility",

        // 3. 관계 ID (시설은 부모가 없음)
        parent_id: null,

        // 4. Facility 전용 데이터 (모두 매핑)
        category_id:
          typeof item.category_id === "number" ? item.category_id : null,
        address: item.address,
      };
    }
  });
};

/**
 * 2. 위치 생성 (POST)
 */
export const createLocation = async (
  data: CreateLocationDto,
): Promise<Location> => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return handleResponse<Location>(res);
};

/**
 * 3. 위치 수정 (PUT)
 */
export const updateLocation = async (
  id: number,
  data: UpdateLocationDto,
): Promise<Location> => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return handleResponse<Location>(res);
};

/**
 * 4. 위치 삭제 (DELETE)
 */
export const deleteLocation = async (
  id: number,
  type: "facility" | "space",
): Promise<void> => {
  const res = await fetch(`${BASE_URL}/${id}?type=${type}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    const errorBody = (await res.json().catch(() => ({}))) as {
      error?: string;
    };
    throw new Error(errorBody.error || "삭제에 실패했습니다.");
  }
};
