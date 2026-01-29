import { useState, useMemo } from "react";
import {
  FACILITIES as INITIAL_FACILITIES,
  SPACES as INITIAL_SPACES,
  SPACE_FUNCTIONS,
  SPACE_TYPES as INITIAL_TYPES,
  FACILITY_CATEGORIES as INITIAL_CATEGORIES, // ✨ import 추가
} from "@loc/data/loc-mock";
import { useSpaceTreeNodes } from "./use-space-tree";
import { TreeNode } from "@/shared/components/navigation/nav-tree";
import {
  LocData,
  Space,
  Facility,
  SpaceType,
  FacilityCategory,
} from "@loc/model/types"; // ✨ import 추가

// 조상 찾기
const getAncestors = (
  currentSpace: Space | null,
  allSpaces: Space[],
): Space[] => {
  const ancestors: Space[] = [];
  let current = currentSpace;
  while (current && current.parent_id) {
    const parent = allSpaces.find((s) => s.id === current!.parent_id);
    if (parent) {
      ancestors.unshift(parent);
      current = parent;
    } else {
      break;
    }
  }
  return ancestors;
};

export function useSpaceLogic() {
  // [State] 데이터
  const [facilities, setFacilities] = useState<Facility[]>(INITIAL_FACILITIES);
  const [spaces, setSpaces] = useState<Space[]>(INITIAL_SPACES);
  const [spaceTypes, setSpaceTypes] = useState<SpaceType[]>(INITIAL_TYPES);
  const [spaceFunctions, setSpaceFunctions] = useState(SPACE_FUNCTIONS);

  // ✨ [State 추가] 시설 분류 상태 관리 (이게 없어서 에러가 났습니다)
  const [facilityCategories, setFacilityCategories] =
    useState<FacilityCategory[]>(INITIAL_CATEGORIES);

  // [State] UI 상태
  const [selectedKey, setSelectedKey] = useState<string>(
    `fac-${INITIAL_FACILITIES[0].id}`,
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isAllExpanded, setIsAllExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [creationMode, setCreationMode] = useState<
    "facility" | "child" | "sibling" | null
  >(null);

  // [Derived] 선택된 데이터 계산
  const isFacilitySelected = selectedKey.startsWith("fac-");
  const selectedIdNum = Number(selectedKey.split("-")[1]);

  const selectedFacility = isFacilitySelected
    ? facilities.find((f) => f.id === selectedIdNum)
    : facilities.find(
        (f) => f.id === spaces.find((s) => s.id === selectedIdNum)?.facility_id,
      );

  const selectedSpace = !isFacilitySelected
    ? spaces.find((s) => s.id === selectedIdNum)
    : null;

  const parentSpace = selectedSpace?.parent_id
    ? spaces.find((s) => s.id === selectedSpace.parent_id)
    : null;

  const hasChildren = useMemo(() => {
    if (!selectedSpace) return false;
    return spaces.some((s) => s.parent_id === selectedSpace.id);
  }, [selectedSpace, spaces]);

  const ancestorPath = useMemo(() => {
    if (!selectedSpace) return [];
    return getAncestors(selectedSpace, spaces);
  }, [selectedSpace, spaces]);

  const treeNodes = useSpaceTreeNodes(searchTerm, facilities, spaces);

  // [Actions] CRUD 핸들러
  const handleSaveFacility = (data: Partial<Facility>) => {
    if (creationMode === "facility") {
      const newId = Math.max(...facilities.map((f) => f.id), 0) + 1;
      const newFac: Facility = {
        id: newId,
        name: data.name || "새 시설",
        code: data.code || `FAC-${newId}`,
        address: data.address || "",
        description: data.description,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        category_id: Number(data.category_id) || 4, // 기본값 etc(4)
        is_active: true,
      };
      setFacilities([...facilities, newFac]);
      setSelectedKey(`fac-${newId}`);
    } else if (selectedFacility) {
      setFacilities(
        facilities.map((f) =>
          f.id === selectedFacility.id ? { ...f, ...data } : f,
        ),
      );
    }
    setIsEditing(false);
    setCreationMode(null);
  };

  const handleSaveSpace = (data: Partial<Space>) => {
    if (creationMode) {
      const newId = Math.max(...spaces.map((s) => s.id), 0) + 1;
      let parentId: number | undefined;

      if (creationMode === "child") {
        parentId = selectedSpace ? selectedSpace.id : undefined;
      } else {
        parentId = parentSpace ? parentSpace.id : undefined;
      }

      const newSpace: Space = {
        id: newId,
        facility_id: selectedFacility!.id,
        parent_id: parentId,
        name: data.name || "새 공간",
        code: data.code || `SP-${newId}`,
        space_type_id: Number(data.space_type_id) || 1,
        space_function_id: Number(data.space_function_id) || 0,
        area_size: Number(data.area_size) || 0,
        is_restricted: Boolean(data.is_restricted),
        description: data.description,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      setSpaces([...spaces, newSpace]);
      setSelectedKey(`space-${newId}`);

      // 폴더 열기
      if (parentId)
        setOpenItems((prev) => ({ ...prev, [`space-${parentId}`]: true }));
      else
        setOpenItems((prev) => ({
          ...prev,
          [`fac-${selectedFacility!.id}`]: true,
        }));
    } else if (selectedSpace) {
      setSpaces(
        spaces.map((s) => (s.id === selectedSpace.id ? { ...s, ...data } : s)),
      );
    }
    setIsEditing(false);
    setCreationMode(null);
  };

  const handleDelete = (targetId?: string) => {
    const deleteKey = targetId || selectedKey;
    const isFac = deleteKey.startsWith("fac-");
    const idNum = Number(deleteKey.split("-")[1]);

    let targetName = "";
    let hasChild = false;

    if (isFac) {
      const fac = facilities.find((f) => f.id === idNum);
      if (!fac) return;
      targetName = fac.name;
      hasChild = spaces.some((s) => s.facility_id === idNum);
    } else {
      const sp = spaces.find((s) => s.id === idNum);
      if (!sp) return;
      targetName = sp.name;
      hasChild = spaces.some((s) => s.parent_id === idNum);
    }

    if (hasChild) return alert("하위 항목이 있어 삭제할 수 없습니다.");
    if (!confirm(`[${targetName}] 항목을 정말 삭제하시겠습니까?`)) return;

    if (isFac) {
      setFacilities(facilities.filter((f) => f.id !== idNum));
      if (selectedKey === deleteKey)
        setSelectedKey(`fac-${facilities[0]?.id || 0}`);
    } else {
      setSpaces(spaces.filter((s) => s.id !== idNum));
      if (selectedKey === deleteKey) {
        const deletedSpace = spaces.find((s) => s.id === idNum);
        if (deletedSpace?.parent_id)
          setSelectedKey(`space-${deletedSpace.parent_id}`);
        else setSelectedKey(`fac-${deletedSpace?.facility_id}`);
      }
    }
  };

  const handleToggle = (id: string) =>
    setOpenItems((prev) => ({ ...prev, [id]: !prev[id] }));

  const handleSelectNode = (node: TreeNode<LocData>) => {
    setSelectedKey(String(node.id));
    setCreationMode(null);
    setIsEditing(false);
  };

  const handleCreate = (mode: "facility" | "child" | "sibling") => {
    if (mode === "facility") {
      setCreationMode("facility");
      setIsEditing(true);
      return;
    }

    if (!selectedFacility?.id) return alert("시설을 먼저 선택해주세요.");

    if (isFacilitySelected && mode === "sibling") {
      setCreationMode("facility");
    } else {
      setCreationMode(mode);
      if (mode === "child") {
        setOpenItems((prev) => ({ ...prev, [selectedKey]: true }));
      }
    }
    setIsEditing(true);
  };

  return {
    state: {
      selectedKey,
      searchTerm,
      openItems,
      isEditing,
      creationMode,
      selectedFacility,
      selectedSpace,
      parentSpace,
      hasChildren,
      ancestorPath,
      treeNodes,
      spaceFunctions,
      spaceTypes,
      facilityCategories, // ✨ [Return 추가]
    },
    actions: {
      setSearchTerm,
      handleToggle,
      handleSelectNode,
      handleCreate,
      setIsEditing,
      cancelEdit: () => {
        setIsEditing(false);
        setCreationMode(null);
      },
      handleSaveFacility,
      handleSaveSpace,
      handleDelete,
      setSpaceFunctions,
      setSpaceTypes,
      setFacilityCategories, // ✨ [Return 추가]
    },
  };
}
