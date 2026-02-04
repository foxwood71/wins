// src/app/(domain)/loc/lib/loc.repository.ts

import {
  Location,
  CreateLocationDto,
  UpdateLocationDto,
} from "@/loc/model/types";

// API Route의 주소
const BASE_URL = "/api/v1/loc";

/**
 * [조회] GET 요청
 */
export const fetchLocations = async (
  parentId?: number | null,
): Promise<Location[]> => {
  const url = parentId ? `${BASE_URL}?parentId=${parentId}` : BASE_URL;

  const res = await fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    cache: "no-store", // 최신 데이터 유지를 위해 캐시 끔 (필요시 변경)
  });

  if (!res.ok) {
    throw new Error("데이터 조회에 실패했습니다.");
  }

  return res.json();
};

/**
 * [생성] POST 요청
 */
export const createLocation = async (
  data: CreateLocationDto,
): Promise<Location> => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorBody = await res.json();
    throw new Error(errorBody.error || "생성에 실패했습니다.");
  }

  return res.json();
};

/**
 * [수정] PUT 요청
 * (API Route에 PUT 메서드가 구현되어 있다고 가정)
 */
export const updateLocation = async (
  id: number,
  data: UpdateLocationDto,
): Promise<Location> => {
  const res = await fetch(BASE_URL, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, ...data }),
  });

  if (!res.ok) {
    throw new Error("수정에 실패했습니다.");
  }

  return res.json();
};

/**
 * [삭제] DELETE 요청
 */
export const deleteLocation = async (id: number): Promise<void> => {
  const res = await fetch(`${BASE_URL}?id=${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("삭제에 실패했습니다.");
  }
};
