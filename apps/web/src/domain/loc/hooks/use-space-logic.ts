"use client";

import { useState, useMemo, useCallback } from "react";
import { TreeNode } from "@/shared/components/navigation/nav-tree";
import {
  LocData,
  Facility,
  Space,
  SpaceFunction,
  SpaceType,
  FacilityCategory,
} from "../model/types";

// 목업 데이터 (Raw Data)
import {
  FACILITIES as MOCK_FACILITIES,
  SPACES as MOCK_SPACES,
  SPACE_FUNCTIONS as MOCK_FUNCTIONS,
  SPACE_TYPES as MOCK_TYPES,
  FACILITY_CATEGORIES as MOCK_CATEGORIES,
} from "../data/loc-mock";

// 트리 생성 로직
import { useSpaceTreeNodes } from "./use-space-tree";

// 상태 인터페이스 정의
export interface SpaceState {
  // 데이터 상태
  facilities: Facility[];
  spaces: Space[];

  // UI 상태
  treeNodes: TreeNode<LocData>[];
  selectedKey: string | number | null;
  openItems: Record<string, boolean>;
  searchTerm: string;
  isEditing: boolean;

  // 선택된 데이터 상세 (계산된 결과)
  selectedFacility: Facility | null;
  selectedSpace: Space | null;

  // 경로 및 관계
  ancestorPath: Space[];
  hasChildren: boolean;

  // 옵션 데이터 (드롭다운용)
  spaceFunctions: SpaceFunction[];
  spaceTypes: SpaceType[];
  facilityCategories: FacilityCategory[];
}

export function useSpaceLogic() {
  // ----------------------------------------------------------------------
  // 1. 데이터 초기화 (ID 기반 매핑 -> 객체 연결)
  // ----------------------------------------------------------------------

  // (1) 시설 데이터 조립 (category_id -> category_info 연결)
  const [facilities, setFacilities] = useState<Facility[]>(() => {
    return MOCK_FACILITIES.map((fac) => ({
      ...fac,
      category_info: MOCK_CATEGORIES.find((c) => c.id === fac.category_id),
    }));
  });

  // (2) 공간 데이터 조립 (type_id -> type_info 연결 등)
  const [spaces, setSpaces] = useState<Space[]>(() => {
    return MOCK_SPACES.map((sp) => ({
      ...sp,
      type_info: MOCK_TYPES.find((t) => t.id === sp.space_type_id),
      function_info: sp.space_function_id
        ? MOCK_FUNCTIONS.find((f) => f.id === sp.space_function_id)
        : undefined,
    }));
  });

  const [spaceFunctions, setSpaceFunctions] =
    useState<SpaceFunction[]>(MOCK_FUNCTIONS);
  const [spaceTypes, setSpaceTypes] = useState<SpaceType[]>(MOCK_TYPES);
  const [facilityCategories, setFacilityCategories] =
    useState<FacilityCategory[]>(MOCK_CATEGORIES);

  // UI 상태
  const [selectedKey, setSelectedKey] = useState<string | number | null>(null);
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  // ----------------------------------------------------------------------
  // 2. 파생 데이터 계산
  // ----------------------------------------------------------------------

  // (1) 트리 노드 생성
  const treeNodes = useSpaceTreeNodes(searchTerm, facilities, spaces);

  // (2) 선택된 항목 찾기 (ID 파싱 및 부모/경로 찾기)
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
      let foundFac: Facility | null = null;
      let foundSpace: Space | null = null;

      // A. 시설 선택 (fac-100)
      if (keyStr.startsWith("fac-")) {
        const id = Number(keyStr.replace("fac-", ""));
        foundFac = facilities.find((f) => f.id === id) || null;

        // 시설 하위에 공간이 하나라도 있으면 자식 있음
        const hasChild = spaces.some((s) => s.facility_id === id);

        return {
          selectedFacility: foundFac,
          selectedSpace: null,
          ancestorPath: [],
          hasChildren: hasChild,
        };
      }

      // B. 공간 선택 (space-101)
      if (keyStr.startsWith("space-")) {
        const id = Number(keyStr.replace("space-", ""));
        foundSpace = spaces.find((s) => s.id === id) || null;

        if (foundSpace) {
          // 공간의 부모 시설 찾기
          foundFac =
            facilities.find((f) => f.id === foundSpace!.facility_id) || null;

          // 조상 경로(Breadcrumbs) 계산
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

          // 하위 공간 존재 여부
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

  // ----------------------------------------------------------------------
  // 3. 내부 헬퍼 함수
  // ----------------------------------------------------------------------

  // 하위 공간 일괄 상태 변경 (재귀, 켜기/끄기 모두 지원)
  const updateChildrenStatus = (
    parentId: number,
    allSpaces: Space[],
    status: boolean,
  ): Space[] => {
    const children = allSpaces.filter((s) => s.parent_id === parentId);
    if (children.length === 0) return allSpaces;

    let updatedSpaces = [...allSpaces];

    children.forEach((child) => {
      // 상태가 다를 경우에만 업데이트
      if (child.is_active !== status) {
        updatedSpaces = updatedSpaces.map((s) =>
          s.id === child.id ? { ...s, is_active: status } : s,
        );
        // 재귀 호출
        updatedSpaces = updateChildrenStatus(child.id, updatedSpaces, status);
      }
    });

    return updatedSpaces;
  };

  // ----------------------------------------------------------------------
  // 4. 액션 핸들러
  // ----------------------------------------------------------------------

  const handleSelectNode = useCallback((node: TreeNode<LocData>) => {
    setSelectedKey(node.id);
    setIsEditing(false);
  }, []);

  const handleToggle = useCallback((id: string) => {
    setOpenItems((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  // [CRUD] 시설 저장
  const handleSaveFacility = (updated: Facility) => {
    // 1. 카테고리 정보 연결 (중요: 이거 없으면 트리에 안 나옴)
    const categoryInfo = facilityCategories.find(
      (c) => c.id === updated.category_id,
    );
    const newData = { ...updated, category_info: categoryInfo };

    if (updated.id < 0) {
      // [신규 생성]
      const newId = Math.max(...facilities.map((f) => f.id), 0) + 1;
      const finalCode = newData.code || `FAC-${newId}`;
      const newFacility = { ...newData, id: newId, code: finalCode };

      setFacilities((prev) => [...prev, newFacility]);

      // ✨ [UX] 부모 카테고리 펼치기 & 새 시설 선택
      const parentKey = `group-${newFacility.category_id}`;
      setOpenItems((prev) => ({ ...prev, [parentKey]: true }));
      setSelectedKey(`fac-${newId}`);
    } else {
      // [수정]
      setFacilities((prev) =>
        prev.map((f) => (f.id === updated.id ? newData : f)),
      );

      // 상태 변경 시 하위 공간 전파 (켜기/끄기 모두)
      setSpaces((prevSpaces) => {
        const rootSpaces = prevSpaces.filter(
          (s) => s.facility_id === updated.id,
        );
        let nextSpaces = [...prevSpaces];

        rootSpaces.forEach((root) => {
          // 루트 공간 상태 동기화
          if (root.is_active !== updated.is_active) {
            nextSpaces = nextSpaces.map((s) =>
              s.id === root.id ? { ...s, is_active: updated.is_active } : s,
            );
            // 그 하위 공간들도 재귀적으로 동기화
            nextSpaces = updateChildrenStatus(
              root.id,
              nextSpaces,
              updated.is_active,
            );
          }
        });
        return nextSpaces;
      });
    }
    setIsEditing(false);
  };

  // [CRUD] 공간 저장
  const handleSaveSpace = (updated: Space) => {
    // 1. 타입/기능 정보 연결 (중요)
    const typeInfo = spaceTypes.find((t) => t.id === updated.space_type_id);
    const funcInfo = updated.space_function_id
      ? spaceFunctions.find((f) => f.id === updated.space_function_id)
      : undefined;
    const newData = {
      ...updated,
      type_info: typeInfo,
      function_info: funcInfo,
    };

    if (updated.id < 0) {
      // [신규 생성]
      const newId = Math.max(...spaces.map((s) => s.id), 0) + 1;
      const finalCode = newData.code || `SPC-${newId}`;
      const newSpace = { ...newData, id: newId, code: finalCode };

      setSpaces((prev) => [...prev, newSpace]);

      // ✨ [UX] 부모 노드 펼치기 (시설이 부모일 수도, 공간이 부모일 수도 있음)
      const parentKey = newSpace.parent_id
        ? `space-${newSpace.parent_id}`
        : `fac-${newSpace.facility_id}`;

      setOpenItems((prev) => ({ ...prev, [parentKey]: true }));

      // ✨ [UX] 새 공간 선택
      setSelectedKey(`space-${newId}`);
    } else {
      // [수정]
      setSpaces((prevSpaces) => {
        let nextSpaces = prevSpaces.map((s) =>
          s.id === updated.id ? newData : s,
        );

        // 상태 변경 시 하위 공간 전파
        nextSpaces = updateChildrenStatus(
          updated.id,
          nextSpaces,
          updated.is_active,
        );

        return nextSpaces;
      });
    }
    setIsEditing(false);
  };

  // [CRUD] 삭제 (방어 로직 포함)
  const handleDelete = () => {
    if (selectedSpace) {
      // 하위 공간 존재 여부 확인
      const hasChild = spaces.some((s) => s.parent_id === selectedSpace.id);
      if (hasChild) {
        alert(
          "하위 공간이 존재하여 삭제할 수 없습니다.\n먼저 하위 공간을 삭제해주세요.",
        );
        return;
      }

      if (!confirm(`'${selectedSpace.name}' 공간을 정말 삭제하시겠습니까?`))
        return;

      setSpaces((prev) => prev.filter((s) => s.id !== selectedSpace.id));
      setSelectedKey(null);
    } else if (selectedFacility) {
      // 소속 공간 존재 여부 확인
      const hasChild = spaces.some(
        (s) => s.facility_id === selectedFacility.id,
      );
      if (hasChild) {
        alert(
          "이 시설에 소속된 공간이 존재합니다.\n공간을 모두 삭제한 후 시설을 삭제할 수 있습니다.",
        );
        return;
      }

      if (!confirm(`'${selectedFacility.name}' 시설을 정말 삭제하시겠습니까?`))
        return;

      setFacilities((prev) => prev.filter((f) => f.id !== selectedFacility.id));
      setSelectedKey(null);
    }
  };

  const cancelEdit = () => {
    setIsEditing(false);
  };

  // 5. Return State & Actions
  const state: SpaceState = {
    facilities,
    spaces,
    treeNodes,
    selectedKey,
    openItems,
    searchTerm,
    isEditing,
    selectedFacility,
    selectedSpace,
    ancestorPath,
    hasChildren,
    spaceFunctions,
    spaceTypes,
    facilityCategories,
  };

  const actions = {
    setSearchTerm,
    setIsEditing,
    handleSelectNode,
    handleToggle,
    setOpenItems, // 전체 펼침/축소 및 자동 펼침용
    handleSaveFacility,
    handleSaveSpace,
    handleDelete,
    cancelEdit,
    setSpaceFunctions,
    setSpaceTypes,
    setFacilityCategories,
  };

  return { state, actions };
}
