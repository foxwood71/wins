"use client";

import { useMemo } from "react";
import { Location, Facility, Space } from "@/loc/model/types";

// ✅ [변경 1] id -> nodeId로 변경하여 의미를 명확히 함
export interface LocationNode {
  nodeId: string; // 예: "fac-1", "space-101"
  label: string;
  icon?: React.ElementType;
  data: Location | Facility | Space;
  children?: LocationNode[];
}

export function useLocationTree(
  searchTerm: string,
  facilities: Facility[],
  spaces: Space[],
) {
  return useMemo(() => {
    const lowerTerm = searchTerm.toLowerCase();

    // 1. 시설 필터링
    const filteredFacs = searchTerm
      ? facilities.filter((f) => f.name.toLowerCase().includes(lowerTerm))
      : facilities;

    // 2. 공간 그룹화 (ID 충돌 방지 로직)
    const spacesByParentSpace: Record<number, Space[]> = {};
    const rootSpacesByFacility: Record<number, Space[]> = {};

    spaces.forEach((s) => {
      // Logic Fix: parent_id가 있으면 상위 공간 소속, 없으면 시설 소속
      if (typeof s.parent_id === "number" && s.parent_id > 0) {
        if (!spacesByParentSpace[s.parent_id])
          spacesByParentSpace[s.parent_id] = [];
        spacesByParentSpace[s.parent_id].push(s);
      } else {
        if (!rootSpacesByFacility[s.facility_id])
          rootSpacesByFacility[s.facility_id] = [];
        rootSpacesByFacility[s.facility_id].push(s);
      }
    });

    // 3. 재귀적으로 공간 노드 생성
    const createSpaceNode = (space: Space): LocationNode | null => {
      const childrenSpaces = spacesByParentSpace[space.id] || [];

      const validChildren = childrenSpaces
        .map(createSpaceNode)
        .filter((node): node is LocationNode => node !== null);

      const matchesSearch = space.name.toLowerCase().includes(lowerTerm);
      const hasMatchingChildren = validChildren.length > 0;

      if (searchTerm && !matchesSearch && !hasMatchingChildren) {
        return null;
      }

      return {
        // ✅ [변경 2] nodeId에 할당
        nodeId: `space-${space.id}`,
        label: space.name,
        data: space,
        children: validChildren.length > 0 ? validChildren : undefined,
      };
    };

    // 4. 최종 트리 조립
    return filteredFacs
      .map((fac): LocationNode | null => {
        const rootSpaces = rootSpacesByFacility[fac.id] || [];

        const validChildren = rootSpaces
          .map(createSpaceNode)
          .filter((node): node is LocationNode => node !== null);

        const matchesSearch = fac.name.toLowerCase().includes(lowerTerm);
        const hasMatchingChildren = validChildren.length > 0;

        if (searchTerm && !matchesSearch && !hasMatchingChildren) {
          return null;
        }

        return {
          // ✅ [변경 3] nodeId에 할당
          nodeId: `fac-${fac.id}`,
          label: fac.name,
          data: fac,
          children: validChildren.length > 0 ? validChildren : undefined,
        };
      })
      .filter((node): node is LocationNode => node !== null);
  }, [searchTerm, facilities, spaces]);
}
