"use client";

import React, { useState } from "react";
import {
  Plus,
  CornerDownRight,
  Printer,
  Factory,
  Building2,
  Layers,
  DoorOpen,
  Cylinder,
  MapPin,
  Settings,
  Lock,
  Filter,
  ChevronsUpDown,
  Trash2,
  FolderOpen,
  Folder,
} from "lucide-react";

import { cn } from "@/shared/lib/utils";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";

import {
  AppContent,
  SidePanel,
  DetailPanel,
  Toolbar,
  ToolbarButton,
  FormGrid,
  FormField,
  FormSectionHeader,
} from "@/shared/components/layout/app-content";

import { NavTree, TreeNode } from "@/shared/components/navigation/nav-tree";
import { NavListItem } from "@/shared/components/navigation/nav-list-item";

import { useSpaceLogic } from "@loc/hooks/use-space-logic";
import { LocData, Space, Facility } from "@loc/model/types";
import { SpaceDetail } from "@loc/ui/components/details/space-detail";

export function SpaceManagementView() {
  const { state, actions } = useSpaceLogic();

  const [creationMode, setCreationMode] = useState<
    "facility" | "child" | "sibling" | null
  >(null);

  const [isAllExpanded, setIsAllExpanded] = useState(false);

  // 1. 선택 상태 분석
  const selectedKey = state.selectedKey || "";
  const isCategorySelected = selectedKey.toString().startsWith("group-");
  const isFacilitySelected = selectedKey.toString().startsWith("fac-");
  const isSpaceSelected = selectedKey.toString().startsWith("space-");

  const selectedFacility = state.selectedFacility;
  const selectedSpace = state.selectedSpace;

  // 전체 펼침/축소 로직
  const getAllNodeIds = (nodes: TreeNode<LocData>[]): string[] => {
    let ids: string[] = [];
    nodes.forEach((node) => {
      ids.push(String(node.id));
      if (node.children && node.children.length > 0) {
        ids = [...ids, ...getAllNodeIds(node.children)];
      }
    });
    return ids;
  };

  const handleToggleExpandAll = () => {
    const nextState = !isAllExpanded;
    setIsAllExpanded(nextState);
    if (nextState) {
      const allIds = getAllNodeIds(state.treeNodes);
      const newOpenItems: Record<string, boolean> = {};
      allIds.forEach((id) => (newOpenItems[id] = true));
      actions.setOpenItems(newOpenItems);
    } else {
      actions.setOpenItems({});
    }
  };

  // 2. 핸들러
  const handleCreate = (mode: "child" | "sibling") => {
    if (
      (isFacilitySelected && mode === "sibling") ||
      (isCategorySelected && mode === "child")
    ) {
      setCreationMode("facility");
      return;
    }
    if (isSpaceSelected || (isFacilitySelected && mode === "child")) {
      setCreationMode(mode);
      actions.setIsEditing(true);
      return;
    }
    alert("항목을 선택해주세요.");
  };

  const handleSaveCreation = () => {
    // 실제 저장은 Detail 컴포넌트의 onSave에서 useSpaceLogic을 호출하며 처리됨
    // 여기서는 모드 종료만 처리
    setCreationMode(null);
    actions.setIsEditing(false);
  };

  const handleCancelCreation = () => {
    setCreationMode(null);
    actions.setIsEditing(false);
  };

  // 3. 트리 노드 렌더링
  const renderNodeContent = (node: TreeNode<LocData>) => {
    const isSelected = node.id === state.selectedKey;
    const data = node.data;

    let Icon = MapPin;
    let subInfos: string[] = [];
    let isRestricted = false;
    let isActive = true;

    if (data && "is_active" in data) {
      isActive = (data as Facility | Space).is_active;
    }

    if (data?.type === "category") {
      const isExpanded = state.openItems[node.id];
      Icon = isExpanded ? FolderOpen : Folder;
    } else if (data?.type === "facility") {
      const fac = data as Facility;
      Icon = Factory;
      subInfos = [fac.code];
    } else if (data?.type === "space") {
      const space = data as Space;
      subInfos = [space.code];
      isRestricted = space.is_restricted;
      switch (space.space_type_id) {
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

    return (
      <NavListItem
        title={node.label}
        icon={Icon}
        subInfo={subInfos}
        isSelected={isSelected}
        className="h-[50px] w-full text-sm group"
        onClick={() => {
          actions.handleSelectNode(node);
          setCreationMode(null);
        }}
        rightElement={
          <div className="flex items-center gap-2">
            {data?.type === "space" && isRestricted && (
              <Lock className="h-3.5 w-3.5 text-rose-400" />
            )}

            {data?.type !== "category" && (
              <div
                className={cn(
                  "w-2 h-2 rounded-full ring-1 ring-white shrink-0",
                  isActive ? "bg-emerald-500" : "bg-slate-300",
                )}
                title={isActive ? "운영 중" : "중지됨"}
              />
            )}
          </div>
        }
      />
    );
  };

  // 4. 우측 패널 렌더링
  const renderRightPanelContent = () => {
    // 공통: 시설을 경로의 최상위 노드로 변환
    const facilityNode = selectedFacility
      ? ({
          id: -9999,
          name: selectedFacility.name,
          code: selectedFacility.code,
        } as Space)
      : null;

    // (A) 시설 생성 모드 (✨ SpaceDetail 사용으로 전격 교체!)
    if (creationMode === "facility") {
      // 초기값 설정
      const blankFacility: Facility = {
        id: -1,
        code: "",
        name: "",
        // 선택된 카테고리가 있으면 그걸 쓰고, 없으면 첫 번째 카테고리 사용
        category_id: isCategorySelected
          ? Number(selectedKey.toString().replace("group-", ""))
          : state.facilityCategories[0]?.id || 10,
        description: "",
        address: "",
        is_active: true,
      } as Facility;

      return (
        <SpaceDetail
          facility={blankFacility} // 시설 객체 전달
          space={{} as Space}
          ancestors={[]}
          hasChildren={false}
          isEditing={true} // 항상 편집 모드
          onEdit={() => {}}
          onCancel={handleCancelCreation}
          onSave={(data) => {
            actions.handleSaveFacility(data as Facility);
            handleSaveCreation(); // 모드 종료
          }}
          onDelete={() => {}}
          facilityCategories={state.facilityCategories}
          onUpdateFacilityCategories={actions.setFacilityCategories}
          spaceFunctions={[]}
          onUpdateFunctions={() => {}}
          spaceTypes={[]}
          onUpdateTypes={() => {}}
        />
      );
    }

    // (B) 공간 생성 모드
    if (creationMode === "child" || creationMode === "sibling") {
      const blankSpace: Space = {
        id: -1,
        code: "",
        name: "",
        description: "",
        is_active: true,
        is_restricted: false,
        area_size: 0,
        space_type_id: null,
        space_function_id: null,
        facility_id: selectedFacility?.id || selectedSpace?.facility_id || 0,
        parent_id:
          creationMode === "child"
            ? selectedSpace?.id || null
            : selectedSpace?.parent_id || null,
        created_at: "",
        updated_at: "",
      } as Space;

      let creationAncestors =
        creationMode === "child" && selectedSpace
          ? [...state.ancestorPath, selectedSpace]
          : state.ancestorPath;

      if (facilityNode) {
        creationAncestors = [facilityNode, ...creationAncestors];
      }

      return (
        <SpaceDetail
          facility={null}
          space={blankSpace}
          ancestors={creationAncestors}
          hasChildren={false}
          isEditing={true}
          onEdit={() => {}}
          onCancel={handleCancelCreation}
          onSave={(data) => {
            actions.handleSaveSpace(data as Space);
            handleSaveCreation();
          }}
          onDelete={() => {}}
          spaceFunctions={state.spaceFunctions}
          onUpdateFunctions={actions.setSpaceFunctions}
          spaceTypes={state.spaceTypes}
          onUpdateTypes={actions.setSpaceTypes}
          facilityCategories={state.facilityCategories}
          onUpdateFacilityCategories={actions.setFacilityCategories}
        />
      );
    }

    // (C) 조회/수정 모드
    if (selectedKey) {
      if (isCategorySelected) {
        return (
          <div className="flex flex-col items-center justify-center h-full text-slate-400 bg-slate-50/50">
            <FolderOpen className="h-12 w-12 mb-3 text-indigo-200" />
            <h3 className="text-lg font-medium text-slate-600">
              시설 분류:{" "}
              {state.treeNodes.find((n) => n.id === selectedKey)?.label}
            </h3>
          </div>
        );
      }

      if (isFacilitySelected && selectedFacility) {
        return (
          <SpaceDetail
            facility={selectedFacility}
            space={{} as Space}
            ancestors={[]}
            hasChildren={state.hasChildren}
            isEditing={state.isEditing}
            onEdit={() => actions.setIsEditing(true)}
            onCancel={actions.cancelEdit}
            onSave={(data) => actions.handleSaveFacility(data as Facility)}
            onDelete={actions.handleDelete}
            facilityCategories={state.facilityCategories}
            onUpdateFacilityCategories={actions.setFacilityCategories}
            spaceFunctions={[]}
            onUpdateFunctions={() => {}}
            spaceTypes={[]}
            onUpdateTypes={() => {}}
          />
        );
      }

      if (isSpaceSelected && selectedSpace) {
        const viewAncestors = facilityNode
          ? [facilityNode, ...state.ancestorPath]
          : state.ancestorPath;

        return (
          <SpaceDetail
            facility={null}
            space={selectedSpace}
            ancestors={viewAncestors}
            hasChildren={state.hasChildren}
            isEditing={state.isEditing}
            onEdit={() => actions.setIsEditing(true)}
            onCancel={actions.cancelEdit}
            onSave={(data) => actions.handleSaveSpace(data as Space)}
            onDelete={actions.handleDelete}
            spaceFunctions={state.spaceFunctions}
            onUpdateFunctions={actions.setSpaceFunctions}
            spaceTypes={state.spaceTypes}
            onUpdateTypes={actions.setSpaceTypes}
            facilityCategories={state.facilityCategories}
            onUpdateFacilityCategories={actions.setFacilityCategories}
          />
        );
      }
    }

    // (D) 미선택
    return (
      <div className="flex flex-col items-center justify-center h-full text-slate-400 bg-slate-50/50">
        <MapPin className="h-10 w-10 text-slate-300 mb-4" />
        <p>왼쪽 목록에서 항목을 선택하세요.</p>
      </div>
    );
  };

  const leftPanel = (
    <SidePanel
      title="시설 및 공간"
      onSearch={actions.setSearchTerm}
      actions={
        <div className="flex items-center gap-0.5 ml-1">
          <ToolbarButton
            icon={Filter}
            title="필터 설정"
            className="text-slate-400 hover:text-slate-600"
          />
          <div className="w-px h-3 bg-slate-200 mx-1" />

          <ToolbarButton
            icon={Plus}
            onClick={() => handleCreate("sibling")}
            title="추가"
            className="hover:bg-slate-100 text-slate-600"
          />
          <ToolbarButton
            icon={CornerDownRight}
            onClick={() => handleCreate("child")}
            title="하위 추가"
            className="hover:bg-slate-100 text-slate-600"
          />

          <ToolbarButton
            icon={Trash2}
            onClick={actions.handleDelete}
            title="선택 항목 삭제"
            className="hover:bg-red-50 text-slate-400 hover:text-red-500"
          />

          <div className="w-px h-3 bg-slate-200 mx-1" />

          <ToolbarButton
            icon={ChevronsUpDown}
            onClick={handleToggleExpandAll}
            title={isAllExpanded ? "모두 축소" : "모두 펼침"}
            className={cn(isAllExpanded && "text-indigo-600 bg-indigo-50")}
          />
        </div>
      }
    >
      <div className="h-full px-2 py-2">
        <NavTree
          nodes={state.treeNodes}
          openItems={state.openItems}
          onToggle={actions.handleToggle}
          selectedId={state.selectedKey ?? ""}
          onSelect={(node) => {
            actions.handleSelectNode(node);
            setCreationMode(null);
          }}
          renderItem={renderNodeContent}
        />
      </div>
    </SidePanel>
  );

  return (
    <AppContent
      title="공간 관리"
      toolbar={
        <Toolbar>
          <ToolbarButton icon={Printer} />
          <ToolbarButton icon={Settings} />
        </Toolbar>
      }
      leftPanel={leftPanel}
      rightPanel={renderRightPanelContent()}
      className="h-[calc(100vh-57px)] overflow-hidden"
    />
  );
}
