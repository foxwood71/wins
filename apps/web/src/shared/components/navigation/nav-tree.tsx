"use client";

import React from "react";
import { ChevronDown, ChevronRight, LucideIcon } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
} from "@/shared/components/ui/collapsible";
import { NavListItem } from "@/shared/components/navigation/nav-list-item";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/components/ui/button";

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
  renderItem?: (node: TreeNode<T>) => React.ReactNode;
}

export function NavTree<T extends object>({
  title,
  nodes,
  openItems,
  onToggle,
  selectedId,
  onSelect,
  className,
  renderItem,
}: NavTreeProps<T>) {
  const renderNode = (node: TreeNode<T>, depth: number = 0) => {
    const hasChildren = node.children && node.children.length > 0;
    const isOpen = !!openItems[String(node.id)];
    const isSelected = String(selectedId) === String(node.id);

    return (
      <div key={node.id}>
        <div
          className={cn(
            "flex items-center group mb-0.5",
            // 깊이에 따라 전체 줄을 들여쓰기 합니다.
            depth > 0 && "ml-3",
          )}
        >
          {/* [1] 왼쪽 화살표 (Toggle) 영역 */}
          <div className="shrink-0 w-6 h-full flex items-center justify-center mr-1">
            {hasChildren ? (
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 hover:bg-slate-200 rounded-md text-slate-400 hover:text-indigo-600"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggle(String(node.id));
                }}
              >
                {isOpen ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </Button>
            ) : (
              // 자식이 없으면 공간만 차지 (라인 맞추기용)
              <div className="w-6 h-6" />
            )}
          </div>

          {/* [2] 콘텐츠 영역 (Select) */}
          <div className="flex-1 min-w-0" onClick={() => onSelect(node)}>
            {renderItem ? (
              renderItem(node)
            ) : (
              <NavListItem
                title={node.label}
                icon={node.icon}
                subInfo={node.subInfo}
                isSelected={isSelected}
                className="h-9" // 높이 살짝 줄여서 트리 느낌 내기
              />
            )}
          </div>
        </div>

        {/* 자식 노드 렌더링 */}
        {hasChildren && (
          <Collapsible open={isOpen}>
            <CollapsibleContent>
              {/* 자식들은 왼쪽 화살표 너비만큼 들여쓰기 하지 않고, 
                  위의 depth 로직에 의해 자연스럽게 밀려납니다.
                  다만, 시각적 연결선을 원하시면 border-l을 추가할 수 있습니다.
               */}
              <div className="border-l border-slate-100 ml-3 pl-0">
                {node.children!.map((child) => renderNode(child, depth + 1))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        )}
      </div>
    );
  };

  return (
    <div className={cn("px-1 pb-4", className)}>
      {title && (
        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3 px-2">
          {title}
        </p>
      )}
      {nodes.map((node) => renderNode(node))}
    </div>
  );
}
