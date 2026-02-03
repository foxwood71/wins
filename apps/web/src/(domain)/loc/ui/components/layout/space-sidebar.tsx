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
  Trash2, // 삭제 아이콘
  PlusCircle, // 빈 화면일 때 추가 아이콘
} from "lucide-react";

import { Button } from "@/shared/components/ui/button";
import {
  SidePanel,
  ToolbarButton,
} from "@/shared/components/layout/app-content";
import { NavTree, TreeNode } from "@/shared/components/navigation/nav-tree";
import { NavListItem } from "@/shared/components/navigation/nav-list-item";
import { LocData, Space, Facility } from "@/(domain)/loc/model/types";

interface SpaceSidebarProps {
  selectedKey: string;
  treeNodes: TreeNode<LocData>[];
  onSearch: (term: string) => void;
  onSelect: (node: TreeNode<LocData>) => void;

  // ✨ [수정] 시설 추가도 가능하도록 타입 확장
  onCreate: (mode: "facility" | "child" | "sibling") => void;

  // ✨ [개별 삭제] 트리 항목 마우스 오버 시 삭제
  onDelete: (node: TreeNode<LocData>) => void;

  // ✨ [선택 삭제] 상단 툴바 삭제 버튼용
  onDeleteSelected: () => void;
  hasChildren: boolean; // 선택된 항목이 자식이 있는지 (비활성화용)

  openItems: Record<string, boolean>;
  onToggle: (id: string) => void;
}

export function SpaceSidebar({
  selectedKey,
  treeNodes,
  onSearch,
  onSelect,
  onCreate,
  onDelete,
  onDeleteSelected,
  hasChildren,
  openItems,
  onToggle,
}: SpaceSidebarProps) {
  // ----------------------------------------------------------------------
  // 1. 트리 노드 렌더링 (개별 아이템 모양 정의)
  // ----------------------------------------------------------------------
  const renderNodeContent = (node: TreeNode<LocData>) => {
    const isSelected = node.id === selectedKey;
    const isFac = String(node.id).startsWith("fac-");

    let spaceData: Space | null = null;
    let facilityData: Facility | null = null;
    let Icon = MapPin;

    // 데이터 타입에 따른 아이콘 및 정보 추출
    if (isFac) {
      Icon = Factory;
      facilityData = node.data as Facility;
    } else {
      spaceData = node.data as Space;
      switch (spaceData?.space_type_id) {
        case 1:
          Icon = Building2;
          break;
        case 2:
          Icon = Layers;
          break;
        case 3:
          Icon = DoorOpen;
          break;
        case 4:
          Icon = Cylinder;
          break;
        default:
          Icon = MapPin;
          break;
      }
    }

    // 현재 노드가 자식을 가지고 있는지 확인 (개별 삭제 방지용)
    const nodeHasChildren = node.children && node.children.length > 0;

    return (
      <div className="group relative">
        <NavListItem
          title={node.label}
          icon={Icon}
          // 선택되었거나 시설인 경우에만 코드 표시 (깔끔함을 위해)
          subInfo={
            isSelected
              ? [isFac ? facilityData?.code || "" : spaceData?.code || ""]
              : []
          }
          isSelected={isSelected}
          onClick={() => onSelect(node)}
          rightElement={
            <div className="flex items-center gap-1">
              {/* A. 잠금 아이콘 (통제 구역인 경우) */}
              {!isFac && spaceData?.is_restricted && (
                <Lock className="h-3 w-3 text-rose-400" />
              )}

              {/* B. 개별 삭제 버튼 (Hover 시에만 표시) */}
              {/* ✨ 중요: NavListItem이 button이므로 div를 사용하여 HTML 중첩 오류 방지 */}
              <div
                role="button"
                tabIndex={0}
                className={`
                  flex items-center justify-center h-6 w-6 rounded-md
                  transition-opacity duration-200 cursor-pointer
                  ${isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"}
                  ${
                    nodeHasChildren
                      ? "opacity-30 cursor-not-allowed text-slate-300"
                      : "text-slate-400 hover:text-red-500 hover:bg-red-50"
                  }
                `}
                title={nodeHasChildren ? "하위 항목이 있어 삭제 불가" : "삭제"}
                onClick={(e) => {
                  e.stopPropagation(); // 부모(선택 이벤트) 전파 방지
                  if (!nodeHasChildren) onDelete(node);
                }}
              >
                {!nodeHasChildren && <Trash2 className="h-3.5 w-3.5" />}
              </div>
            </div>
          }
        />
      </div>
    );
  };

  // ----------------------------------------------------------------------
  // 2. 메인 렌더링 (사이드 패널 + 툴바)
  // ----------------------------------------------------------------------
  return (
    <SidePanel
      title="시설 및 공간"
      onSearch={onSearch}
      isExpanded={false}
      onToggleExpand={() => {}}
      actions={
        <div className="flex items-center ml-1">
          {/* A. 생성 버튼 그룹 */}
          <ToolbarButton
            icon={Plus}
            // 목록이 비어있으면 시설 추가로 동작하게 유도 가능하지만,
            // 여기선 기본적으로 '형제 추가' 호출 (로직에서 처리됨)
            onClick={() => onCreate("sibling")}
            title="형제 추가 (동일 레벨)"
            className="hover:bg-slate-100 hover:text-slate-700"
          />
          <ToolbarButton
            icon={CornerDownRight}
            onClick={() => onCreate("child")}
            title="하위 추가 (자식 레벨)"
            className="ml-1 hover:bg-slate-100 hover:text-slate-700"
          />

          {/* B. 구분선 (생성과 삭제 분리) */}
          <div className="mx-2 h-3 w-[1px] bg-slate-300" />

          {/* C. 삭제 버튼 (현재 선택된 항목 삭제) */}
          <ToolbarButton
            icon={Trash2}
            onClick={onDeleteSelected}
            disabled={hasChildren}
            title={
              hasChildren ? "하위 항목이 있어 삭제 불가" : "선택 항목 삭제"
            }
            className={
              hasChildren
                ? "text-slate-300 cursor-not-allowed"
                : "text-red-500 hover:bg-red-50 hover:text-red-600"
            }
          />
        </div>
      }
    >
      {/* 3. Empty State 처리 (데이터가 하나도 없을 때) */}
      {treeNodes.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 text-slate-400 gap-3 px-4 text-center">
          <Factory className="h-10 w-10 text-slate-300 mb-2" />
          <p className="text-sm">등록된 시설이 없습니다.</p>
          <Button
            variant="outline"
            className="gap-2 border-dashed border-slate-300 hover:border-indigo-400 hover:text-indigo-600"
            onClick={() => onCreate("facility")} // ✨ "시설" 모드로 생성 요청
          >
            <PlusCircle className="h-4 w-4" />첫 번째 시설 등록하기
          </Button>
        </div>
      ) : (
        // 4. 트리 목록 렌더링
        <NavTree
          nodes={treeNodes}
          openItems={openItems}
          onToggle={onToggle}
          selectedId={selectedKey}
          onSelect={onSelect}
          renderItem={renderNodeContent}
        />
      )}
    </SidePanel>
  );
}
