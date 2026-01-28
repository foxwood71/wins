import { useMemo } from "react";
import { TreeNode } from "@/shared/components/navigation/nav-tree";
import { LocData, Facility, Space } from "../model/types";
import { FACILITIES, SPACES, SPACE_TYPES } from "../data/loc-mock";

export function useSpaceTreeNodes(searchTerm: string) {
  return useMemo<TreeNode<LocData>[]>(() => {
    const lowerTerm = searchTerm.toLowerCase();

    // 1. 공간(Space)을 재귀적으로 트리 노드로 변환하는 함수
    const buildSpaceTree = (
      facilityId: number,
      parentId: number | null,
    ): TreeNode<LocData>[] => {
      const children = SPACES.filter(
        (s) =>
          s.facility_id === facilityId && (s.parent_id ?? null) === parentId,
      );

      return children
        .map((space) => {
          const childNodes = buildSpaceTree(facilityId, space.id);
          const hasChildren = childNodes.length > 0;

          // 검색 필터링: 검색어가 있으면, 자신이 검색되거나 자식 중에 검색된게 있어야 함
          const matches =
            !searchTerm ||
            space.name.toLowerCase().includes(lowerTerm) ||
            space.code.toLowerCase().includes(lowerTerm);

          if (!matches && !hasChildren && searchTerm) return null;

          // 타입 정보 매핑 (아이콘 결정용)
          const typeInfo = SPACE_TYPES.find(
            (t) => t.id === space.space_type_id,
          );
          const enrichedSpace = { ...space, type_info: typeInfo };

          return {
            id: `space-${space.id}`,
            label: space.name,
            data: enrichedSpace,
            children: childNodes,
          } as TreeNode<LocData>;
        })
        .filter((node): node is TreeNode<LocData> => node !== null);
    };

    // 2. 시설(Facility)을 루트 노드로 생성
    return FACILITIES.map((facility) => {
      // 해당 시설의 최상위 공간(parent_id가 없는 공간)들 조회
      const rootSpaces = buildSpaceTree(facility.id, null);

      const matches =
        !searchTerm || facility.name.toLowerCase().includes(lowerTerm);

      if (!matches && rootSpaces.length === 0 && searchTerm) return null;

      return {
        id: `fac-${facility.id}`,
        label: facility.name,
        data: facility, // Facility 타입
        children: rootSpaces,
        // isExpanded: true, // 필요시 기본 펼침
      } as TreeNode<LocData>;
    }).filter((node): node is TreeNode<LocData> => node !== null);
  }, [searchTerm]);
}
