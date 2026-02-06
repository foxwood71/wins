"use client";

import {
  useState,
  useCallback,
  useEffect,
  useMemo,
  ComponentType,
} from "react";
import {
  fetchLocations,
  deleteLocation,
  createLocation,
} from "@/loc/lib/repository";
import { Facility, Space } from "@/loc/model/types";
import { useLocationTree, LocationNode } from "./use-location-tree";
import { TreeDataItem } from "@/shared/components/ui/tree-view";

export function useLocationManagement() {
  // 1. [State] 데이터와 UI 상태
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [spaces, setSpaces] = useState<Space[]>([]);
  const [selectedNodeId, setSelectedKey] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAllExpanded, setIsAllExpanded] = useState(false);

  // 2. [Fetch] 데이터 로딩
  const loadData = useCallback(async () => {
    try {
      const data = await fetchLocations();
      setFacilities(data.filter((d) => d.type === "facility") as Facility[]);
      setSpaces(data.filter((d) => d.type === "space") as Space[]);
    } catch (err) {
      console.error("데이터 로딩 실패:", err);
    }
  }, []);

  useEffect(() => {
    const initData = async () => {
      await loadData();
    };
    initData();
  }, [loadData]);

  // 3. [Tree Build] 트리 생성
  const rawTreeNodes = useLocationTree(searchTerm, facilities, spaces);

  // 4. [Adapter] UI용 데이터 변환
  const treeData = useMemo(() => {
    const toTreeData = (nodes: LocationNode[]): TreeDataItem[] => {
      return nodes.map((node) => ({
        id: node.nodeId,
        name: node.label,
        icon: node.icon as ComponentType<{ className?: string }> | undefined,
        children: node.children ? toTreeData(node.children) : undefined,
        data: node.data,
      }));
    };
    return toTreeData(rawTreeNodes);
  }, [rawTreeNodes]);

  // 5. [Helper] 현재 선택된 실제 데이터 찾기
  const selectedData = useMemo(() => {
    if (!selectedNodeId) return null;
    if (selectedNodeId.startsWith("fac-")) {
      return facilities.find((f) => `fac-${f.id}` === selectedNodeId) || null;
    }
    return spaces.find((s) => `space-${s.id}` === selectedNodeId) || null;
  }, [selectedNodeId, facilities, spaces]);

  // 6. [Actions] 비즈니스 로직 핸들러
  const actions = {
    setSearchTerm,

    handleSelectNode: (id: string) => setSelectedKey(id),

    handleToggleAll: () => setIsAllExpanded((prev) => !prev),

    handleDelete: async () => {
      if (!selectedNodeId || !selectedData) return;
      if (!confirm("정말 삭제하시겠습니까? 하위 항목도 모두 삭제됩니다."))
        return;

      try {
        // Repository 정의: deleteLocation(id: number, type: "facility" | "space")
        await deleteLocation(selectedData.id, selectedData.type);

        await loadData();
        setSelectedKey(null);
      } catch (e) {
        console.error(e);
        alert("삭제 실패");
      }
    },

    saveFacility: async (data: Facility) => {
      // createLocation은 DTO를 받으므로 필요한 데이터만 추출해서 전달하거나 그대로 전달
      // (타입 호환성 확인 필요, 여기서는 예시로 data 전달)
      await createLocation({ ...data, type: "facility" });
      await loadData();
    },

    saveSpace: async (data: Space) => {
      await createLocation({ ...data, type: "space" });
      await loadData();
    },
  };

  return {
    state: {
      treeData,
      selectedNodeId,
      selectedData,
      searchTerm,
      isAllExpanded,
    },
    actions,
  };
}
