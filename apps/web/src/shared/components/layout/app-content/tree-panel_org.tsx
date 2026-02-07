"use client";

import React, { useMemo } from "react";
import { Tree } from "react-arborist";
import {
  Maximize2,
  Plus,
  Trash2,
  Folder,
  FolderOpen,
  File,
  ChevronRight,
  ChevronDown,
  Factory,
  Box,
} from "lucide-react";

import { cn } from "@/shared/lib/utils";
import { Badge } from "@/shared/components/ui/badge";
import {
  SidePanel,
  ToolbarButton,
} from "@/shared/components/layout/app-content";

// ----------------------------------------------------------------------
// 1. NodeRenderer (컴포넌트 외부로 분리하여 useMemo 에러 방지)
// ----------------------------------------------------------------------

const NodeRenderer = ({ node, style, dragHandle, tree }: any) => {
  const item = node.data;
  const isSelected = node.isSelected;
  const isOpen = node.isOpen;
  const hasChildren = !node.isLeaf;

  // Tree의 context prop을 통해 전달된 커스텀 함수들
  const context = (tree as any).props.context;
  const getItemIcon = context?.getItemIcon;
  const getItemBadge = context?.getItemBadge;
  const renderItemActions = context?.renderItemActions;

  // 아이콘 결정 (커스텀 -> 시설타입 -> 기본값 순)
  let Icon = getItemIcon ? getItemIcon(item, isOpen) : null;
  if (!Icon) {
    if (item.data?.type === "facility") Icon = Factory;
    else if (item.data?.type === "space")
      Icon = hasChildren ? (isOpen ? FolderOpen : Folder) : Box;
    else Icon = hasChildren ? (isOpen ? FolderOpen : Folder) : File;
  }

  const badge = getItemBadge?.(item);

  return (
    <div
      style={style}
      ref={dragHandle}
      onClick={(e) => node.handleClick(e)} // 🔴 metaKey 에러 방지용 e 전달
      className={cn(
        "flex items-center w-full cursor-pointer pr-2 group outline-none rounded-sm transition-colors",
        isSelected ? "bg-indigo-50" : "hover:bg-slate-50/80",
      )}
    >
      {/* 화살표 공간 */}
      <div
        className="flex items-center justify-center w-6 h-6 shrink-0 text-slate-400"
        onClick={(e) => {
          e.stopPropagation();
          node.toggle();
        }}
      >
        {hasChildren ? (
          isOpen ? (
            <ChevronDown className="w-3.5 h-3.5" />
          ) : (
            <ChevronRight className="w-3.5 h-3.5" />
          )
        ) : (
          <div className="w-3.5 h-3.5" />
        )}
      </div>

      <div className="flex items-center flex-1 min-w-0 py-1.5 gap-2">
        <Icon
          className={cn(
            "h-4 w-4 shrink-0",
            isSelected ? "text-indigo-600" : "text-slate-400",
          )}
        />

        <span
          className={cn(
            "truncate text-sm font-medium flex-1",
            isSelected ? "text-indigo-800" : "text-slate-600",
          )}
        >
          {item.name}
        </span>

        {badge && (
          <Badge
            variant={badge.variant || "outline"}
            className={cn(
              "ml-1 text-[10px] px-1.5 h-4 font-normal shrink-0",
              badge.className,
            )}
          >
            {badge.label}
          </Badge>
        )}

        {renderItemActions && (
          <div
            className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity gap-1"
            onClick={(e) => e.stopPropagation()}
          >
            {renderItemActions(item)}
          </div>
        )}
      </div>
    </div>
  );
};

// ----------------------------------------------------------------------
// 2. TreePanel Main Component
// ----------------------------------------------------------------------

export interface TreePanelProps {
  title?: string;
  data: any[];
  selectedId: string | null;
  className?: string;
  onSearch?: (term: string) => void;
  onSelect: (nodeId: string) => void;
  onToggleExpand?: () => void;
  onCreate?: () => void;
  onDelete?: () => void;
  disableDelete?: boolean;
  getItemBadge?: (
    item: any,
  ) => { label: string; variant?: any; className?: string } | null;
  getItemIcon?: (item: any, isOpen: boolean) => React.ElementType | null;
  renderItemActions?: (item: any) => React.ReactNode;
}

export function TreePanel({
  title = "Explorer",
  data,
  selectedId,
  className,
  onSearch,
  onSelect,
  onToggleExpand,
  onCreate,
  onDelete,
  disableDelete = false,
  getItemBadge,
  getItemIcon,
  renderItemActions,
}: TreePanelProps) {
  // 데이터 가공 (id 문자열화)
  const treeData = useMemo(() => {
    const formatData = (items: any[]): any[] => {
      return items.map((item) => ({
        ...item,
        id: String(item.id),
        children: item.children ? formatData(item.children) : undefined,
      }));
    };
    return formatData(data || []);
  }, [data]);

  const ToolbarActions = (
    <div className="flex items-center gap-0.5">
      {onToggleExpand && (
        <ToolbarButton
          icon={Maximize2}
          onClick={onToggleExpand}
          title="Toggle All"
          className="h-7 w-7"
        />
      )}
      {onCreate && (
        <ToolbarButton
          icon={Plus}
          onClick={onCreate}
          title="Add"
          className="text-indigo-600 h-7 w-7"
        />
      )}
      {onDelete && (
        <ToolbarButton
          icon={Trash2}
          onClick={onDelete}
          disabled={disableDelete}
          title="Delete"
          className="text-red-500 h-7 w-7"
        />
      )}
    </div>
  );

  return (
    <SidePanel
      title={title}
      className={cn("w-full h-full flex flex-col", className)}
      onSearch={onSearch}
      actions={ToolbarActions}
    >
      {/* 🔴 AutoSizer 없이 가기 위해 flex-1과 overflow-hidden을 설정합니다. */}
      <div className="flex-1 w-full min-h-0 mt-2 overflow-hidden">
        {treeData.length > 0 ? (
          <Tree
            data={treeData}
            selection={selectedId || undefined}
            width="100%"
            // 🔴 AutoSizer 대신 부모 flex-1 공간을 채우기 위해 1000px를 주고
            // CSS로 부모 높이만큼만 보이게 제한합니다.
            // (가상화 라이브러리의 특성상 숫자 값이 필요합니다.)
            height={1000}
            indent={20}
            rowHeight={34}
            onSelect={(nodes) => nodes.length > 0 && onSelect(nodes[0].id)}
            // 외부 NodeRenderer에 함수 전달
            context={{ getItemBadge, getItemIcon, renderItemActions }}
            className="outline-none scrollbar-thin scrollbar-thumb-slate-200"
            disableDrag
            disableEdit
          >
            {NodeRenderer}
          </Tree>
        ) : (
          <div className="flex flex-col items-center justify-center h-40 text-slate-400 text-sm">
            <span>데이터가 없습니다.</span>
          </div>
        )}
      </div>
    </SidePanel>
  );
}
