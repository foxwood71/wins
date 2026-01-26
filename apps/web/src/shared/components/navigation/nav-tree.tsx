"use client";

import React from "react";
import { ChevronDown, ChevronRight, LucideIcon } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/shared/components/ui/collapsible";
import { NavListItem } from "@/shared/components/navigation/nav-list-item";
import { cn } from "@/shared/lib/utils";

export interface TreeNode<T> {
  id: string | number;
  label: string;
  icon?: LucideIcon;
  subInfo?: string[];
  children?: TreeNode<T>[];
  data?: T;
}

interface NavTreeProps<T> {
  title?: string;
  nodes: TreeNode<T>[];
  openItems: Record<string, boolean>;
  onToggle: (id: string) => void;
  selectedId: string | number;
  onSelect: (node: TreeNode<T>) => void;
  className?: string;

  // ✨ [추가] 커스텀 디자인을 위한 렌더러 함수 prop
  renderItem?: (node: TreeNode<T>) => React.ReactNode;
}

export function NavTree<T extends object>({
  title = "NavTree",
  nodes,
  openItems,
  onToggle,
  selectedId,
  onSelect,
  className,
  renderItem, // ✨ 구조 분해 할당
}: NavTreeProps<T>) {
  const renderNode = (node: TreeNode<T>, depth: number = 0) => {
    const hasChildren = node.children && node.children.length > 0;
    const isOpen = !!openItems[String(node.id)];
    const indentClass =
      depth === 0 ? "" : "ml-4 border-l border-slate-100 pl-2 mt-0.5";

    const IconComponent = node.icon;

    return (
      <div key={node.id} className={cn(indentClass, depth === 0 && "mb-1")}>
        {hasChildren ? (
          // 1. 그룹(폴더)인 경우: 기존 로직 유지
          <Collapsible
            open={isOpen}
            onOpenChange={() => onToggle(String(node.id))}
          >
            <CollapsibleTrigger
              className={cn(
                "flex items-center w-full h-10 px-3 rounded-xl transition-all",
                depth === 0
                  ? "text-[13px] font-bold text-indigo-600 hover:bg-indigo-50"
                  : "text-[12.5px] font-bold text-slate-600 hover:bg-slate-50",
              )}
            >
              {isOpen ? (
                <ChevronDown className="h-3.5 w-3.5 mr-2" />
              ) : (
                <ChevronRight className="h-3.5 w-3.5 mr-2" />
              )}
              {IconComponent && (
                <IconComponent
                  className={cn(
                    "h-4 w-4 mr-2",
                    depth === 0 ? "text-indigo-600" : "text-indigo-400",
                  )}
                />
              )}
              <span className="flex-1 text-left truncate">{node.label}</span>
            </CollapsibleTrigger>

            <CollapsibleContent>
              {node.children!.map((child) => renderNode(child, depth + 1))}
            </CollapsibleContent>
          </Collapsible>
        ) : // 2. 아이템(부서)인 경우: ✨ renderItem이 있으면 그것을 사용!
        renderItem ? (
          <div onClick={() => onSelect(node)}>{renderItem(node)}</div>
        ) : (
          // 없으면 기존 NavListItem 사용
          <NavListItem
            icon={IconComponent!}
            title={node.label}
            subInfo={node.subInfo || []}
            isSelected={String(selectedId) === String(node.id)}
            onClick={() => onSelect(node)}
            className="h-10"
          />
        )}
      </div>
    );
  };

  return (
    <div className={cn("px-1 pb-4", className)}>
      {/* title prop이 있을 때만 헤더 렌더링 */}
      {title && (
        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3 px-2">
          {title}
        </p>
      )}
      {nodes.map((node) => renderNode(node))}
    </div>
  );
}
