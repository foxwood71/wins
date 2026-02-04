// src/app/(domain)/loc/lib/loc.utils.ts
import { Location, Facility, Space } from "@/loc/model/types";

// 화면에 보여줄 트리 노드 타입 (기본 Location에 children 추가)
export interface LocationTreeNode extends Location {
  children: LocationTreeNode[];
}

/**
 * 평평한 DB 데이터(List)를 트리 구조로 변환하는 함수
 */
export function buildLocationTree(locations: Location[]): LocationTreeNode[] {
  const map = new Map<number, LocationTreeNode>();
  const roots: LocationTreeNode[] = [];

  // 1. 모든 노드를 Map에 등록 (children 배열 초기화)
  locations.forEach((loc) => {
    map.set(loc.id, { ...loc, children: [] });
  });

  // 2. 부모-자식 관계 연결
  locations.forEach((loc) => {
    const node = map.get(loc.id);
    if (!node) return;

    if (loc.parent_id) {
      const parent = map.get(loc.parent_id);
      if (parent) {
        parent.children.push(node);
      }
    } else {
      // 부모가 없으면 최상위 루트(Root)
      roots.push(node);
    }
  });

  return roots;
}

export function generateNextCode(
  type: "facility" | "child" | "sibling",
  parent: Space | null,
  siblings: (Space | Facility)[],
): string {
  let prefix = "LOC";

  if (type === "facility") {
    prefix = "FAC";
  } else if (parent) {
    switch (parent.space_type_id) {
      case 1:
        prefix = "FLR";
        break; // 건물 -> 층
      case 2:
        prefix = "RM";
        break; // 층 -> 호실
      default:
        prefix = "SP";
        break;
    }
  } else {
    prefix = "BLD"; // 시설 바로 아래 -> 건물
  }

  const nextNum = siblings.length + 1;
  const numStr = String(nextNum).padStart(3, "0");

  return `${prefix}-${numStr}`;
}
