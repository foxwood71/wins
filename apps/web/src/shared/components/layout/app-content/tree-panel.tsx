"use client";

import React, {
  useMemo,
  useRef,
  useState,
  useEffect,
  createContext,
  useContext,
} from "react";
import { Tree, NodeRendererProps } from "react-arborist";
import {
  Maximize2,
  Plus,
  Pencil, // 🟢 편집 아이콘 추가
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
import { Badge, badgeVariants } from "@/shared/components/ui/badge";
import {
  SidePanel,
  ToolbarButton,
} from "@/shared/components/layout/app-content";
import { VariantProps } from "class-variance-authority";

// ----------------------------------------------------------------------
// 1. 타입 정의 (Any 0% 달성)
// ----------------------------------------------------------------------
export interface TreeNodeData {
  id: string;
  name: string;
  children?: TreeNodeData[];
  data?: {
    type?: "facility" | "space" | string;
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

type BadgeVariant = VariantProps<typeof badgeVariants>["variant"];

interface BadgeConfig {
  label: string;
  variant?: BadgeVariant;
  className?: string;
}

interface TreePanelContextValue {
  getItemBadge?: (item: TreeNodeData) => BadgeConfig | null;
  getItemIcon?: (
    item: TreeNodeData,
    isOpen: boolean,
  ) => React.ElementType | null;
  renderItemActions?: (item: TreeNodeData) => React.ReactNode;
}

const TreePanelContext = createContext<TreePanelContextValue | null>(null);

// ----------------------------------------------------------------------
// 2. NodeRenderer (아이콘 및 액션 버튼 복구)
// ----------------------------------------------------------------------
const NodeRenderer = ({
  node,
  style,
  dragHandle,
}: NodeRendererProps<TreeNodeData>) => {
  const item = node.data;
  const isSelected = node.isSelected;
  const isOpen = node.isOpen;
  const hasChildren = !node.isLeaf;

  const context = useContext(TreePanelContext);
  const { getItemIcon, getItemBadge, renderItemActions } = context || {};

  // 아이콘 결정
  let resolvedIcon: React.ElementType | null = getItemIcon
    ? getItemIcon(item, isOpen)
    : null;
  if (!resolvedIcon) {
    const type = item.data?.type;
    if (type === "facility") resolvedIcon = Factory;
    else if (type === "space")
      resolvedIcon = hasChildren ? (isOpen ? FolderOpen : Folder) : Box;
    else resolvedIcon = hasChildren ? (isOpen ? FolderOpen : Folder) : File;
  }

  const badge = getItemBadge?.(item);

  return (
    <div style={style} className="pr-2">
      <div
        ref={dragHandle}
        onClick={(e) => node.handleClick(e)}
        className={cn(
          "flex items-center w-full h-full cursor-pointer px-2 rounded-sm transition-colors outline-none group", // 🟢 group 클래스 유지
          isSelected
            ? "bg-indigo-50 text-indigo-700"
            : "hover:bg-slate-50/80 text-slate-600",
        )}
      >
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

        <div className="flex items-center flex-1 min-w-0 py-1 gap-2">
          {resolvedIcon &&
            React.createElement(resolvedIcon, {
              className: cn(
                "h-4 w-4 shrink-0",
                isSelected ? "text-indigo-600" : "text-slate-400",
              ),
            })}

          <span className="truncate text-sm font-medium flex-1">
            {item.name}
          </span>

          {badge && (
            <Badge
              variant={badge.variant || "outline"}
              className={cn(
                "text-[10px] px-1.5 h-4 font-normal shrink-0",
                badge.className,
              )}
            >
              {badge.label}
            </Badge>
          )}

          {/* 🟢 행 액션 버튼 복구 (호버 시 표시) */}
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
    </div>
  );
};

// ----------------------------------------------------------------------
// 3. TreePanel 컴포넌트 (툴바 아이콘 복구)
// ----------------------------------------------------------------------
export interface TreePanelProps {
  title?: string;
  data: TreeNodeData[];
  selectedId: string | null;
  className?: string;
  onSearch?: (term: string) => void;
  onSelect: (nodeId: string) => void;
  onToggleExpand?: () => void;
  onCreate?: () => void;
  onUpdate?: () => void; // 🟢 편집 프롭 추가
  onDelete?: () => void;
  disableDelete?: boolean;
  getItemBadge?: (item: TreeNodeData) => BadgeConfig | null;
  getItemIcon?: (
    item: TreeNodeData,
    isOpen: boolean,
  ) => React.ElementType | null;
  renderItemActions?: (item: TreeNodeData) => React.ReactNode;
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
  onUpdate,
  onDelete,
  disableDelete = false,
  getItemBadge,
  getItemIcon,
  renderItemActions,
}: TreePanelProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dim, setDim] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        if (width > 0 && height > 0) setDim({ width, height });
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const treeData = useMemo(() => {
    const format = (items: TreeNodeData[]): TreeNodeData[] =>
      items.map((i) => ({
        ...i,
        id: String(i.id),
        children: i.children ? format(i.children) : undefined,
      }));
    return format(data || []);
  }, [data]);

  const ToolbarActions = (
    <div className="flex items-center gap-0.5">
      {onToggleExpand && (
        <ToolbarButton
          icon={Maximize2}
          onClick={onToggleExpand}
          title="Toggle"
          className="h-7 w-7"
        />
      )}
      <div className="w-px h-3 bg-slate-200 mx-1" />
      {onCreate && (
        <ToolbarButton
          icon={Plus}
          onClick={onCreate}
          title="Add"
          className="text-indigo-600 h-7 w-7"
        />
      )}
      {onUpdate && (
        <ToolbarButton
          icon={Pencil}
          onClick={onUpdate}
          title="Edit"
          className="text-slate-600 h-7 w-7"
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
      className={cn(
        "w-full h-full flex flex-col",
        "[&>div:nth-child(2)]:overflow-hidden [&>div:nth-child(2)]:flex [&>div:nth-child(2)]:flex-col [&>div:nth-child(2)]:flex-1",
        className,
      )}
      onSearch={onSearch}
      actions={ToolbarActions}
    >
      <div className="flex-1 w-full min-h-0 mt-2 relative overflow-hidden">
        <div ref={containerRef} className="absolute inset-0">
          {treeData.length > 0 && dim.height > 0 ? (
            <TreePanelContext.Provider
              value={{ getItemBadge, getItemIcon, renderItemActions }}
            >
              <Tree
                data={treeData}
                selection={selectedId || undefined}
                width={dim.width}
                height={dim.height}
                indent={20}
                rowHeight={34}
                onSelect={(nodes) => nodes.length > 0 && onSelect(nodes[0].id)}
                className="outline-none scrollbar-thin scrollbar-thumb-slate-200"
                disableDrag
                disableEdit
              >
                {NodeRenderer}
              </Tree>
            </TreePanelContext.Provider>
          ) : treeData.length === 0 ? (
            <div className="flex items-center justify-center h-40 text-slate-400 text-sm">
              데이터가 없습니다.
            </div>
          ) : null}
        </div>
      </div>
    </SidePanel>
  );
}
