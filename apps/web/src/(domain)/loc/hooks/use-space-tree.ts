import { useMemo } from "react";
import { TreeNode } from "@/shared/components/navigation/nav-tree";
import { LocData, Facility, Space } from "../model/types";

export function useSpaceTreeNodes(
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

    // 2. 공간 계층 구조 정리 (ID 기반 연결)
    const spacesByParent: Record<number, Space[]> = {};
    const rootSpacesByFacility: Record<number, Space[]> = {};

    spaces.forEach((s) => {
      // (1) 부모가 있는 공간 (하위 공간)
      if (s.parent_id) {
        if (!spacesByParent[s.parent_id]) spacesByParent[s.parent_id] = [];
        spacesByParent[s.parent_id].push(s);
      }
      // (2) 부모가 없는 공간 (시설 바로 아래 최상위 공간)
      else {
        if (!rootSpacesByFacility[s.facility_id])
          rootSpacesByFacility[s.facility_id] = [];
        rootSpacesByFacility[s.facility_id].push(s);
      }
    });

    // 3. 재귀 함수: 공간 노드 생성
    const createSpaceNode = (space: Space): TreeNode<LocData> => {
      const childrenNodes = (spacesByParent[space.id] || []).map(
        createSpaceNode,
      );

      return {
        id: `space-${space.id}`,
        label: space.name,
        // 공간 코드를 보조 정보로 표시
        subInfo: [space.code],
        data: { ...space, type: "space" } as LocData,
        children: childrenNodes,
      };
    };

    // 4. [핵심 변경] 시설 노드 생성 (그룹핑 없이 바로 반환)
    return filteredFacs.map((fac) => {
      // 시설에 속한 최상위 공간들 찾기
      const facilityRootSpaces = rootSpacesByFacility[fac.id] || [];
      const childrenNodes = facilityRootSpaces.map(createSpaceNode);

      // 보조 정보: 시설코드 + (있다면) 카테고리 이름
      const subInfos = [fac.code];
      if (fac.category_info) {
        subInfos.push(fac.category_info.name);
      }

      return {
        id: `fac-${fac.id}`,
        label: fac.name,
        subInfo: subInfos,
        data: { ...fac, type: "facility" } as LocData,
        children: childrenNodes,
        // 기본적으로 펼쳐두고 싶다면 true (선택 사항)
        // isExpanded: true
      };
    });
  }, [searchTerm, facilities, spaces]);
}
