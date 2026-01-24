"use client";

import React from "react";
import { ChevronsDownUp, ChevronsUpDown } from "lucide-react"; // 아이콘 확인
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/components/ui/button";

interface SidePanelProps {
  searchBar: React.ReactNode;
  actions?: React.ReactNode;
  children: React.ReactNode;

  // ✨ [수정] 토글 방식으로 변경
  isExpanded?: boolean; // 현재 전체 확장 여부
  onToggleExpand?: () => void; // 토글 핸들러

  className?: string;
}

export function SidePanel({
  searchBar,
  actions,
  children,
  isExpanded = false,
  onToggleExpand,
  className,
}: SidePanelProps) {
  return (
    <aside
      className={cn(
        "flex flex-col h-full bg-white border-r border-slate-100 font-sans",
        className,
      )}
    >
      {/* Header Area */}
      <div className="p-3 border-b border-slate-50 shrink-0 flex items-center gap-2">
        <div className="relative flex-1">{searchBar}</div>

        {/* ✨ [수정] 토글 버튼 하나로 통합 */}
        <div className="flex items-center gap-1">
          {onToggleExpand && (
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "h-7 w-7 p-0 hover:bg-white hover:shadow-sm transition-all",
                isExpanded
                  ? "text-indigo-600 bg-indigo-50" // 확장 상태일 때 강조
                  : "text-slate-400 hover:text-slate-600",
              )}
              onClick={onToggleExpand}
              title={isExpanded ? "전체 축소" : "전체 확장"}
            >
              {isExpanded ? (
                // 확장된 상태 -> 축소 아이콘 표시
                <ChevronsDownUp className="h-3.5 w-3.5" />
              ) : (
                // 축소된 상태 -> 확장 아이콘 표시
                <ChevronsUpDown className="h-3.5 w-3.5" />
              )}
            </Button>
          )}

          {actions && <div className="shrink-0">{actions}</div>}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-2 space-y-0.5 custom-scrollbar">
        {children}
      </div>
    </aside>
  );
}
