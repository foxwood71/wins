"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { TreeNode } from "@/shared/components/navigation/nav-tree";
import { Location } from "@/loc/model/types";
import {
  fetchLocations,
  createLocation,
  updateLocation,
  deleteLocation,
} from "@/loc/lib/repository";

// [Type Definition] unknown 제거 -> 구체적인 인터페이스 정의
// DB의 JSON 컬럼이나 추가 정보에 들어갈 예상 필드들을 명시합니다.
export interface ExtraInfo {
  name: string;
  code?: string;
  description?: string;
  // 만약 정말 동적인 필드가 필요하다면, unknown 대신 원시 타입 유니온을 사용
  // [key: string]: string | number | boolean | undefined;
}

// Location 타입을 확장하여 UI 전용 타입 정의
export interface Facility extends Location {
  category_info?: ExtraInfo; // unknown 제거됨
}

export interface Space extends Location {
  type_info?: ExtraInfo; // unknown 제거됨
  function_info?: ExtraInfo; // unknown 제거됨
  facility_id?: number;
}

// 드롭다운 메뉴용 타입
export interface SelectOption {
  id: number | string;
  name: string;
  code?: string;
}

// 트리 생성 로직
import { useSpaceTreeNodes } from "./use-space-tree";

export interface SpaceState {
  facilities: Facility[];
  spaces: Space[];
  treeNodes: TreeNode<Location>[];
  selectedKey: string | number | null;
  openItems: Record<string, boolean>;
  searchTerm: string;
  isEditing: boolean;
  isLoading: boolean;

  selectedFacility: Facility | null;
  selectedSpace: Space | null;
  ancestorPath: Space[];
  hasChildren: boolean;

  spaceFunctions: SelectOption[];
  spaceTypes: SelectOption[];
  facilityCategories: SelectOption[];
}

export function useSpaceLogic() {
  // 1. 상태 관리
  const [allLocations, setAllLocations] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // UI 상태
  const [selectedKey, setSelectedKey] = useState<string | number | null>(null);
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isAllExpanded, setIsAllExpanded] = useState(false);

  // 2. 데이터 로딩
  const loadData = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await fetchLocations();
      // 🚨 [수정] 받아온 데이터 중복 제거 로직 추가
      // (ID가 같은 데이터가 있으면 하나만 남김)
      const uniqueData = Array.from(
        new Map(data.map((item) => [item.id, item])).values(),
      );
      setAllLocations(uniqueData);
    } catch (error) {
      // catch(error)의 error는 TS 스펙상 무조건 unknown입니다.
      // 따라서 여기서만 instanceof로 타입을 좁혀서 처리합니다.
      const msg = error instanceof Error ? error.message : "알 수 없는 오류";
      console.error("데이터 로딩 실패:", msg);
      alert("데이터를 불러오는 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // 3. 데이터 가공 (ExtraInfo 타입 준수)
  const facilities = useMemo<Facility[]>(() => {
    return allLocations
      .filter((loc) => loc.parent_id === null)
      .map((loc) => ({
        ...loc,
        // 명시적으로 ExtraInfo 인터페이스 구조를 맞춤
        category_info: { name: loc.type, code: "FAC" },
      }));
  }, [allLocations]);

  const spaces = useMemo<Space[]>(() => {
    return allLocations
      .filter((loc) => loc.parent_id !== null)
      .map((loc) => ({
        ...loc,
        facility_id: findRootId(loc, allLocations),
        // 명시적으로 ExtraInfo 인터페이스 구조를 맞춤
        type_info: { name: loc.type, code: "SPC" },
      }));
  }, [allLocations]);

  const treeNodes = useSpaceTreeNodes(searchTerm, facilities, spaces);

  // 4. 선택 로직
  const { selectedFacility, selectedSpace, ancestorPath, hasChildren } =
    useMemo(() => {
      if (!selectedKey) {
        return {
          selectedFacility: null,
          selectedSpace: null,
          ancestorPath: [],
          hasChildren: false,
        };
      }

      const keyStr = String(selectedKey);

      // Case A: 시설 선택
      if (keyStr.startsWith("fac-")) {
        const id = Number(keyStr.replace("fac-", ""));
        const foundFac = facilities.find((f) => f.id === id) || null;
        const hasChild = spaces.some((s) => s.facility_id === id);

        return {
          selectedFacility: foundFac,
          selectedSpace: null,
          ancestorPath: [],
          hasChildren: hasChild,
        };
      }

      // Case B: 공간 선택
      if (keyStr.startsWith("space-")) {
        const id = Number(keyStr.replace("space-", ""));
        const foundSpace = spaces.find((s) => s.id === id) || null;

        if (foundSpace) {
          const foundFac =
            facilities.find((f) => f.id === foundSpace.facility_id) || null;

          const path: Space[] = [];
          let curr = foundSpace;
          let loop = 0;

          while (curr.parent_id && loop < 10) {
            const parent = spaces.find((s) => s.id === curr.parent_id);
            if (parent) {
              path.unshift(parent);
              curr = parent;
            } else {
              break;
            }
            loop++;
          }

          const hasChild = spaces.some((s) => s.parent_id === id);
          return {
            selectedFacility: foundFac,
            selectedSpace: foundSpace,
            ancestorPath: path,
            hasChildren: hasChild,
          };
        }
      }

      return {
        selectedFacility: null,
        selectedSpace: null,
        ancestorPath: [],
        hasChildren: false,
      };
    }, [selectedKey, facilities, spaces]);

  // 5. 액션 핸들러
  const handleSelectNode = useCallback((node: TreeNode<Location>) => {
    setSelectedKey(node.id);
    setIsEditing(false);
  }, []);

  // const handleToggle = useCallback((id: string) => {
  //   setOpenItems((prev) => ({ ...prev, [id]: !prev[id] }));
  // }, []);
  const handleToggleAll = useCallback(() => {
    setIsAllExpanded((prev) => {
      const nextState = !prev; // true <-> false 반전

      if (nextState) {
        // [펼치기 로직]
        const allOpen: Record<string, boolean> = {};
        treeNodes.forEach((node) => {
          allOpen[String(node.id)] = true;
          // 자식 노드들도 재귀적으로 찾아야 완벽하지만, 1차적으로는 이렇게
          if (node.children) {
            const openChildren = (nodes: any[]) => {
              nodes.forEach((child) => {
                allOpen[String(child.id)] = true;
                if (child.children) openChildren(child.children);
              });
            };
            openChildren(node.children);
          }
        });
        setOpenItems(allOpen);
      } else {
        // [접기 로직]
        setOpenItems({});
      }
      return nextState; // 상태 업데이트
    });
  }, [treeNodes]);

  const handleSaveFacility = async (updated: Facility) => {
    try {
      if (updated.id < 0) {
        const newLoc = await createLocation({
          name: updated.name,
          type: updated.type || "building",
          parentId: null,
        });
        await loadData();
        setSelectedKey(`fac-${newLoc.id}`);
      } else {
        await updateLocation(updated.id, {
          name: updated.name,
          type: updated.type,
        });
        await loadData();
      }
      setIsEditing(false);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "알 수 없는 오류";
      alert("시설 저장 실패: " + msg);
      console.error(err);
    }
  };

  const handleSaveSpace = async (updated: Space) => {
    try {
      const realParentId = updated.parent_id ?? updated.facility_id ?? null;

      if (updated.id < 0) {
        const newLoc = await createLocation({
          name: updated.name,
          parentId: realParentId,
          type: updated.type || "room",
        });
        await loadData();

        const parentKey = newLoc.parent_id
          ? `space-${newLoc.parent_id}`
          : `fac-${realParentId}`;

        setOpenItems((prev) => ({ ...prev, [parentKey]: true }));
        setSelectedKey(`space-${newLoc.id}`);
      } else {
        await updateLocation(updated.id, {
          name: updated.name,
          type: updated.type,
        });
        await loadData();
      }
      setIsEditing(false);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "알 수 없는 오류";
      alert("공간 저장 실패: " + msg);
      console.error(err);
    }
  };

  const handleDelete = async () => {
    const targetId = selectedSpace ? selectedSpace.id : selectedFacility?.id;
    const targetName = selectedSpace
      ? selectedSpace.name
      : selectedFacility?.name;

    // undefined 체크를 통해 타입 가드 강화
    if (targetId === undefined) return;

    if (hasChildren) {
      alert("하위 요소가 존재하여 삭제할 수 없습니다.");
      return;
    }

    if (!confirm(`'${targetName}'을(를) 정말 삭제하시겠습니까?`)) return;

    try {
      await deleteLocation(targetId);
      await loadData();
      setSelectedKey(null);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "알 수 없는 오류";
      alert("삭제 실패: " + msg);
      console.error(err);
    }
  };

  return {
    state: {
      facilities,
      spaces,
      treeNodes,
      selectedKey,
      openItems,
      isAllExpanded,
      searchTerm,
      isEditing,
      isLoading,
      selectedFacility,
      selectedSpace,
      ancestorPath,
      hasChildren,
      spaceFunctions: [],
      spaceTypes: [],
      facilityCategories: [],
    },
    actions: {
      setSearchTerm,
      setIsEditing,
      handleSelectNode,
      handleToggleAll,
      setOpenItems,
      handleSaveFacility,
      handleSaveSpace,
      handleDelete,
      cancelEdit: () => setIsEditing(false),
      setSpaceFunctions: () => {},
      setSpaceTypes: () => {},
      setFacilityCategories: () => {},
    },
  };
}

// 헬퍼 함수
function findRootId(current: Location, all: Location[]): number {
  if (!current.parent_id) return current.id;

  let parent = all.find((l) => l.id === current.parent_id);
  let loop = 0;

  // parent! 단언 제거하고 안전하게 체크
  while (parent && parent.parent_id !== null && loop < 50) {
    const nextId = parent.parent_id; // number 타입
    const nextParent = all.find((l) => l.id === nextId);

    if (!nextParent) break;
    parent = nextParent;
    loop++;
  }
  return parent ? parent.id : current.id;
}
