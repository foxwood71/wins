"use client";

import {
  Factory,
  FolderPlus,
  MapPin,
  MoreHorizontal,
  Plus,
  Search,
} from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { NavTree } from "@/shared/components/navigation/nav-tree";
import { SpaceDetail } from "@loc/ui/components/details/space-detail";
import { useSpaceLogic } from "@loc/hooks/use-space-logic";
import { LocData, Space } from "@loc/model/types";

// 빈 공간 객체 생성 헬퍼
const createEmptySpace = (
  facilityId: number = 0,
  parentId: number | null = null,
): Space =>
  ({
    id: 0,
    name: "",
    code: "",
    facility_id: facilityId,
    parent_id: parentId,
    space_type_id: 1,
    area_size: 0,
    is_restricted: false,
  }) as Space;

export function SpaceManagementView() {
  const { state, actions } = useSpaceLogic();

  return (
    <div className="flex h-full bg-slate-50/30 overflow-hidden">
      {/* 왼쪽 트리 패널 */}
      <div className="w-72 shrink-0 h-full flex flex-col bg-white border-r border-slate-200">
        <div className="p-4 border-b border-slate-100 space-y-3">
          <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2">
            <MapPin className="h-4 w-4 text-indigo-600" />
            공간 관리
          </h2>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-400" />
              <Input
                placeholder="시설/공간 검색..."
                className="pl-8 h-8 text-xs bg-slate-50 border-slate-200"
                value={state.searchTerm}
                onChange={(e) => actions.setSearchTerm(e.target.value)}
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  size="icon"
                  variant="outline"
                  className="h-8 w-8 border-slate-200"
                >
                  <Plus className="h-3.5 w-3.5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40 text-xs">
                <DropdownMenuItem
                  onClick={() => actions.handleCreate("facility")}
                  className="gap-2"
                >
                  <Factory className="h-3.5 w-3.5" /> 시설 추가
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => actions.handleCreate("sibling")}
                  className="gap-2"
                >
                  <MoreHorizontal className="h-3.5 w-3.5" /> 형제 추가
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => actions.handleCreate("child")}
                  className="gap-2"
                >
                  <FolderPlus className="h-3.5 w-3.5" /> 하위 추가
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-1">
          <NavTree<LocData>
            nodes={state.treeNodes}
            selectedId={state.selectedKey}
            onSelect={actions.handleSelectNode}
            openItems={state.openItems}
            onToggle={actions.handleToggle}
          />
        </div>
      </div>

      {/* 오른쪽 상세 패널 */}
      <div className="flex-1 h-full min-w-0">
        {state.selectedKey ? (
          <SpaceDetail
            facility={
              state.selectedKey.startsWith("fac-")
                ? state.selectedFacility || null
                : null
            }
            space={
              !state.selectedKey.startsWith("fac-")
                ? state.selectedSpace || createEmptySpace()
                : createEmptySpace()
            }
            ancestors={state.ancestorPath}
            hasChildren={state.hasChildren}
            isEditing={state.isEditing}
            onEdit={() => actions.setIsEditing(true)}
            onCancel={actions.cancelEdit}
            onSave={
              state.selectedKey.startsWith("fac-")
                ? actions.handleSaveFacility
                : actions.handleSaveSpace
            }
            onDelete={actions.handleDelete}
            spaceFunctions={state.spaceFunctions}
            onUpdateFunctions={actions.setSpaceFunctions}
            spaceTypes={state.spaceTypes}
            onUpdateTypes={actions.setSpaceTypes}
            facilityCategories={state.facilityCategories}
            onUpdateFacilityCategories={actions.setFacilityCategories}
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-slate-400 gap-2">
            <MapPin className="h-10 w-10 text-slate-100" />
            <p className="text-sm">선택된 항목이 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
}
