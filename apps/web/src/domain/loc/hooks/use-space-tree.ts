import { useMemo } from "react";
import { TreeNode } from "@/shared/components/navigation/nav-tree";
import { Location } from "@/loc/model/types";
import { Facility, Space } from "./use-space-logic";

export function useSpaceTreeNodes(
  searchTerm: string,
  facilities: Facility[],
  spaces: Space[],
) {
  return useMemo(() => {
    const lowerTerm = searchTerm.toLowerCase();

    const filteredFacs = searchTerm
      ? facilities.filter((f) => f.name.toLowerCase().includes(lowerTerm))
      : facilities;

    const spacesByParent: Record<number, Space[]> = {};
    const rootSpacesByFacility: Record<number, Space[]> = {};

    spaces.forEach((s) => {
      // null check를 통해 number 타입 보장
      if (s.parent_id !== null) {
        const isParentFacility = facilities.some((f) => f.id === s.parent_id);

        if (isParentFacility) {
          if (!rootSpacesByFacility[s.parent_id])
            rootSpacesByFacility[s.parent_id] = [];
          rootSpacesByFacility[s.parent_id].push(s);
        } else {
          if (!spacesByParent[s.parent_id]) spacesByParent[s.parent_id] = [];
          spacesByParent[s.parent_id].push(s);
        }
      }
    });

    const createSpaceNode = (space: Space): TreeNode<Location> => {
      const childrenNodes = (spacesByParent[space.id] || []).map(
        createSpaceNode,
      );

      return {
        id: `space-${space.id}`,
        label: space.name,
        // subInfo는 string[] 타입이므로 존재 여부 체크 후 할당
        subInfo: space.type ? [space.type] : undefined,
        data: space, // Space는 Location을 상속받으므로 호환됨
        children: childrenNodes,
      };
    };

    return filteredFacs.map((fac) => {
      const facilityRootSpaces = rootSpacesByFacility[fac.id] || [];
      const childrenNodes = facilityRootSpaces.map(createSpaceNode);

      return {
        id: `fac-${fac.id}`,
        label: fac.name,
        subInfo: fac.type ? [fac.type] : undefined,
        data: fac, // Facility도 Location 상속
        children: childrenNodes,
      };
    });
  }, [searchTerm, facilities, spaces]);
}
