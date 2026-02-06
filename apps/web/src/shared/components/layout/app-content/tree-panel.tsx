"use client";

import React from "react";
import {
  Maximize2,
  Minimize2,
  Plus,
  Trash2,
  Folder,
  FolderOpen,
  File,
} from "lucide-react";

import { cn } from "@/shared/lib/utils";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import {
  SidePanel,
  ToolbarButton,
} from "@/shared/components/layout/app-content";

import {
  TreeView,
  TreeDataItem,
  TreeRenderItemParams,
} from "@/shared/components/ui/tree-view";

// ----------------------------------------------------------------------
// Types
// ----------------------------------------------------------------------

export interface TreePanelProps {
  // 1. 기본 데이터
  title?: string;
  data: TreeDataItem[];
  selectedId: string | null;
  className?: string;

  // 2. 검색 및 필터
  onSearch?: (term: string) => void;

  // 3. 트리 동작
  onSelect: (nodeId: string) => void;
  onToggleExpand?: () => void;
  isAllExpanded?: boolean;

  // 4. CRUD 액션 (툴바)
  onCreate?: () => void;
  onDelete?: () => void;
  disableDelete?: boolean;

  // 5. 커스텀 렌더링 (옵션)
  /** 노드 우측에 표시할 배지 정보를 반환하는 함수 */
  // 🔴 [수정] BadgeProps["variant"] 대신 React.ComponentProps<typeof Badge>["variant"] 사용
  getItemBadge?: (item: TreeDataItem) => {
    label: string;
    variant?: React.ComponentProps<typeof Badge>["variant"];
    className?: string;
  } | null;

  /** 노드 호버 시 우측에 나타날 액션 버튼들을 반환하는 함수 */
  renderItemActions?: (item: TreeDataItem) => React.ReactNode;
}

// ... (이하 코드는 동일합니다)

export function TreePanel({
  title = "Explorer",
  data,
  selectedId,
  className,
  onSearch,
  onSelect,
  onToggleExpand,
  isAllExpanded = false,
  onCreate,
  onDelete,
  disableDelete = false,
  getItemBadge,
  renderItemActions,
}: TreePanelProps) {
  const renderCardItem = ({
    item,
    isSelected,
    isOpen,
    hasChildren,
  }: TreeRenderItemParams) => {
    const Icon =
      item.icon || (hasChildren ? (isOpen ? FolderOpen : Folder) : File);
    const badge = getItemBadge?.(item);

    return (
      <div
        className={cn(
          "flex items-center justify-between w-full py-2 px-3 rounded-md border transition-all group select-none",
          isSelected
            ? "bg-indigo-50 border-indigo-200 text-indigo-700 shadow-sm"
            : "bg-white border-transparent hover:border-slate-200 hover:bg-slate-50",
        )}
      >
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <Icon
            className={cn(
              "h-4 w-4 shrink-0",
              isSelected ? "text-indigo-600" : "text-slate-400",
            )}
          />
          <span className="truncate text-sm font-medium">{item.name}</span>

          {badge && (
            <Badge
              variant={badge.variant || "outline"}
              className={cn(
                "ml-1 text-[10px] px-1.5 py-0 h-4 leading-none font-normal shrink-0",
                badge.className,
              )}
            >
              {badge.label}
            </Badge>
          )}
        </div>

        {renderItemActions && (
          <div
            className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity gap-1 ml-2"
            onClick={(e) => e.stopPropagation()}
          >
            {renderItemActions(item)}
          </div>
        )}
      </div>
    );
  };

  const ToolbarActions = (
    <>
      {onToggleExpand && (
        <ToolbarButton
          icon={isAllExpanded ? Minimize2 : Maximize2}
          onClick={onToggleExpand}
          title={isAllExpanded ? "전체 접기" : "전체 펼치기"}
          className="hover:bg-slate-100 text-slate-600 h-7 w-7"
        />
      )}

      {onToggleExpand && (onCreate || onDelete) && (
        <div className="w-px h-3 bg-slate-200 mx-1 self-center" />
      )}

      {onCreate && (
        <ToolbarButton
          icon={Plus}
          onClick={onCreate}
          title="새 항목 추가"
          className="hover:bg-indigo-50 text-indigo-600 h-7 w-7"
        />
      )}

      {onDelete && (
        <ToolbarButton
          icon={Trash2}
          onClick={onDelete}
          disabled={disableDelete}
          title="삭제"
          className="text-red-500 hover:bg-red-50 disabled:opacity-30 h-7 w-7"
        />
      )}
    </>
  );

  return (
    <SidePanel
      title={title}
      className={cn("w-full h-full flex flex-col", className)}
      onSearch={onSearch}
      actions={ToolbarActions}
    >
      <div className="h-full pr-2">
        {data.length > 0 ? (
          <TreeView
            data={data}
            initialSelectedItemId={selectedId || undefined}
            onSelectChange={(item) => item && onSelect(item.id)}
            expandAll={isAllExpanded}
            className="h-full"
            renderItem={renderCardItem}
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-40 text-slate-400 text-sm">
            <span>데이터가 없습니다.</span>
          </div>
        )}
      </div>
    </SidePanel>
  );
}
