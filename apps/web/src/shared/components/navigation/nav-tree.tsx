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

// ✨ [핵심 1] T의 기본값 제거. T는 반드시 객체(object)여야 한다고 제약.
// 이제 TreeNode를 쓸 때는 반드시 타입을 명시하거나 추론되게 해야 합니다.
export interface TreeNode<T> {
  id: string | number;
  label: string;
  icon?: LucideIcon;
  subInfo?: string[];
  children?: TreeNode<T>[]; // 자식도 부모와 같은 T 타입 데이터를 가짐
  data?: T; // 원본 데이터 (Generic)
}

interface NavTreeProps<T> {
  title?: string;
  nodes: TreeNode<T>[]; // 여기서 T가 결정됨
  openItems: Record<string, boolean>;
  onToggle: (id: string) => void;
  selectedId: string | number;
  onSelect: (node: TreeNode<T>) => void; // 선택 시 반환되는 노드도 T 타입을 유지
  className?: string;
}

// ✨ [핵심 2] 컴포넌트 선언 시 제네릭 <T>만 선언
// extends object: T는 원시타입(숫자, 문자)이 아닌 객체여야 함을 명시 (안전장치)
export function NavTree<T extends object>({
  title = "NavTree",
  nodes,
  openItems,
  onToggle,
  selectedId,
  onSelect,
  className,
}: NavTreeProps<T>) {
  // 재귀 렌더링 함수
  const renderNode = (node: TreeNode<T>, depth: number = 0) => {
    const hasChildren = node.children && node.children.length > 0;
    const isOpen = !!openItems[String(node.id)];
    const indentClass =
      depth === 0 ? "" : "ml-4 border-l border-slate-100 pl-2 mt-0.5";

    const IconComponent = node.icon;

    return (
      <div key={node.id} className={cn(indentClass, depth === 0 && "mb-1")}>
        {hasChildren ? (
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
        ) : (
          <NavListItem
            icon={IconComponent!}
            title={node.label}
            subInfo={node.subInfo || []}
            isSelected={selectedId === node.id}
            onClick={() => onSelect(node)}
            className="h-10"
          />
        )}
      </div>
    );
  };

  return (
    <div className={cn("px-1 pb-4", className)}>
      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3 px-2">
        {title}
      </p>
      {nodes.map((node) => renderNode(node))}
    </div>
  );
}
