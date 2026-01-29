import { useMemo } from "react";
import { TreeNode } from "@/shared/components/navigation/nav-tree";
import { LocData, Facility, Space } from "../model/types";

function buildSpaceTree(
  facilities: Facility[],
  spaces: Space[],
  searchTerm: string,
): TreeNode<LocData>[] {
  const lowerTerm = searchTerm.toLowerCase();

  // 1. 시설 필터링
  const filteredFacilities = searchTerm
    ? facilities.filter((f) => f.name.toLowerCase().includes(lowerTerm))
    : facilities;

  // 2. 공간 관계 정리
  const spacesByParent: Record<string, Space[]> = {};
  const rootSpacesByFacility: Record<number, Space[]> = {};

  spaces.forEach((s) => {
    if (s.parent_id) {
      if (!spacesByParent[s.parent_id]) spacesByParent[s.parent_id] = [];
      spacesByParent[s.parent_id].push(s);
    } else {
      if (!rootSpacesByFacility[s.facility_id])
        rootSpacesByFacility[s.facility_id] = [];
      rootSpacesByFacility[s.facility_id].push(s);
    }
  });

  // 3. 재귀적 공간 노드 생성
  const createSpaceNode = (space: Space): TreeNode<LocData> => {
    const childrenNodes = (spacesByParent[space.id] || []).map(createSpaceNode);

    return {
      id: `space-${space.id}`,
      label: space.name,
      data: { ...space, type: "space" } as LocData,
      children: childrenNodes,
      subInfo: [space.code],
    };
  };

  // 4. 시설 노드 생성 (카테고리 그룹 없이 바로 리턴)
  return filteredFacilities.map((fac) => {
    const facilityRootSpaces = rootSpacesByFacility[fac.id] || [];
    const childrenNodes = facilityRootSpaces.map(createSpaceNode);

    return {
      id: `fac-${fac.id}`,
      label: fac.name,
      data: { ...fac, type: "facility" } as LocData,
      children: childrenNodes,
      subInfo: [fac.code],
    };
  });
}

export function useSpaceTreeNodes(
  searchTerm: string,
  facilities: Facility[],
  spaces: Space[],
) {
  return useMemo(() => {
    return buildSpaceTree(facilities, spaces, searchTerm);
  }, [searchTerm, facilities, spaces]);
}
