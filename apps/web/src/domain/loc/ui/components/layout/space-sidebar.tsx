"use client";

import React from "react";
import {
  Factory,
  Building2,
  Layers,
  DoorOpen,
  Cylinder,
  MapPin,
  Lock,
  Plus,
  CornerDownRight,
  Trash2,
  PlusCircle,
  Search,
} from "lucide-react";

import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import {
  SidePanel,
  ToolbarButton,
} from "@/shared/components/layout/app-content";
import { NavTree, TreeNode } from "@/shared/components/navigation/nav-tree";
// ✅ 원본 그대로 import
import { NavListItem } from "@/shared/components/navigation/nav-list-item";
import { LocData, Space } from "@/loc/model/types";

interface SpaceSidebarProps {
  selectedKey: string | number | null;
  treeNodes: TreeNode<LocData>[];
  searchTerm: string;
  onSearch: (term: string) => void;
  openItems: Record<string, boolean>;
  onToggle: (id: string) => void;
  onSelect: (node: TreeNode<LocData>) => void;
  onCreate: (mode: "facility" | "child" | "sibling") => void;
  onDeleteSelected: () => void;
  hasChildren: boolean;
}

// 아이콘 결정 헬퍼 함수
function getIconForNode(node: TreeNode<LocData>) {
  const isFac = String(node.id).startsWith("fac-");

  if (isFac) return Factory;

  const space = node.data as Space;
  const typeStr = space.type?.toLowerCase() || "";
  // number | null | undefined 처리를 위해 옵셔널 체이닝 사용
  const typeId = space.space_type_id;

  if (typeStr === "building" || typeId === 1) return Building2;
  if (typeStr === "floor" || typeId === 2) return Layers;
  if (typeStr === "room" || typeId === 3) return DoorOpen;
  if (typeStr === "tank" || typeId === 4) return Cylinder;

  return MapPin;
}

export function SpaceSidebar({
  selectedKey,
  treeNodes,
  searchTerm,
  onSearch,
  openItems,
  onToggle,
  onSelect,
  onCreate,
  onDeleteSelected,
  hasChildren,
}: SpaceSidebarProps) {
  // 트리 노드 렌더링
  const renderNodeContent = (node: TreeNode<LocData>) => {
    const isSelected = String(node.id) === String(selectedKey);
    const data = node.data as Space | undefined;

    // 아이콘 가져오기
    const Icon = getIconForNode(node);
    const isRestricted =
      !String(node.id).startsWith("fac-") && data?.is_restricted;

    // ✅ [핵심 수정] NavListItemProps 인터페이스에 맞춰서 전달
    // 1. isActive -> isSelected
    // 2. children -> title
    // 3. hasChildren, isOpen, onToggle 제거 (NavListItem은 순수 뷰 컴포넌트이며, 토글 기능은 NavTree가 처리함)
    return (
      <NavListItem
        title={node.label} // children 대신 title 사용
        icon={Icon}
        isSelected={isSelected} // isActive 대신 isSelected 사용
        onClick={() => onSelect(node)}
        subInfo={node.subInfo}
        rightElement={
          isRestricted ? <Lock className="h-3 w-3 text-amber-500" /> : undefined
        }
      />
    );
  };

  const hasSelection = !!selectedKey;

  return (
    <SidePanel title="공간 탐색" className="w-[320px] border-r flex flex-col">
      {/* A. 검색 영역 */}
      <div className="p-3 border-b bg-slate-50">
        <div className="relative">
          <Input
            placeholder="공간 명칭 검색..."
            value={searchTerm}
            onChange={(e) => onSearch(e.target.value)}
            className="pl-9 h-9 bg-white"
          />
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
        </div>
      </div>

      {/* B. 툴바 영역 */}
      <div className="flex items-center p-2 border-b gap-1 bg-white">
        <ToolbarButton
          icon={Plus}
          onClick={() => onCreate("facility")}
          title="새 시설 추가"
          className="hover:bg-indigo-50 text-indigo-600"
        />

        <div className="w-px h-4 bg-slate-200 mx-1" />

        <ToolbarButton
          icon={CornerDownRight}
          onClick={() => onCreate("child")}
          disabled={!hasSelection}
          title={hasSelection ? "하위 공간 추가" : "상위 항목을 선택하세요"}
          className="hover:bg-slate-100 text-slate-600"
        />

        <div className="flex-1" />

        <ToolbarButton
          icon={Trash2}
          onClick={onDeleteSelected}
          disabled={!hasSelection || hasChildren}
          title={
            !hasSelection
              ? "선택된 항목 없음"
              : hasChildren
                ? "하위 항목이 있어 삭제 불가"
                : "삭제"
          }
          className={
            hasChildren
              ? "text-slate-300 cursor-not-allowed"
              : "text-red-500 hover:bg-red-50 hover:text-red-600"
          }
        />
      </div>

      {/* C. 트리 영역 */}
      <div className="flex-1 overflow-y-auto p-2">
        {treeNodes.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-slate-400 gap-3 px-4 text-center">
            <Factory className="h-10 w-10 text-slate-300 mb-2" />
            <p className="text-sm">등록된 데이터가 없습니다.</p>
            <Button
              variant="outline"
              className="gap-2 border-dashed border-slate-300 hover:border-indigo-400 hover:text-indigo-600"
              onClick={() => onCreate("facility")}
            >
              <PlusCircle className="h-4 w-4" />첫 시설 등록하기
            </Button>
          </div>
        ) : (
          <NavTree
            nodes={treeNodes}
            openItems={openItems}
            onToggle={onToggle}
            selectedId={selectedKey ? String(selectedKey) : ""}
            onSelect={onSelect}
            renderItem={renderNodeContent}
          />
        )}
      </div>
    </SidePanel>
  );
}
