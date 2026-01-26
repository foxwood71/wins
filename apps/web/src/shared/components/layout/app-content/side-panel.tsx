"use client";

import React, { useState } from "react";
import { Search, ChevronsDownUp, ChevronsUpDown } from "lucide-react";

import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";

// ✨ FilterBadges 추가 임포트
import {
  DynamicFilter,
  FilterBadges,
  FilterConfig,
  FilterValues,
} from "@/shared/components/dynamic-filter";

interface SidePanelProps {
  title?: string;
  className?: string;
  children: React.ReactNode;
  filterConfigs?: FilterConfig[];
  onSearch?: (term: string) => void;
  onFilterChange?: (filters: FilterValues) => void;
  isExpanded?: boolean;
  onToggleExpand?: () => void;
  actions?: React.ReactNode;
}

export function SidePanel({
  title,
  className,
  children,
  filterConfigs = [],
  onSearch,
  onFilterChange,
  isExpanded = false,
  onToggleExpand,
  actions,
}: SidePanelProps) {
  const [activeFilters, setActiveFilters] = useState<FilterValues>({});

  const handleFilterApply = (newFilters: FilterValues) => {
    setActiveFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  return (
    <aside
      className={cn(
        "flex flex-col h-full bg-white border-r border-slate-100 font-sans w-full",
        className,
      )}
    >
      {/* --- Header Area --- */}
      <div className="p-3 border-b border-slate-50 shrink-0 bg-white flex flex-col gap-0">
        {title && (
          <div className="font-bold text-sm text-slate-800 mb-3 px-1">
            {title}
          </div>
        )}

        {/* 1. 상단 라인: 검색창 + 버튼들 */}
        <div className="flex items-center gap-1">
          {/* 검색창 (가장 넓게 차지) */}
          <div className="relative flex-1 min-w-0">
            <Search className="absolute left-2 top-2 h-3.5 w-3.5 text-slate-400" />
            <Input
              placeholder="검색"
              className="pl-8 h-8 text-xs bg-slate-50 focus:bg-white transition-colors pr-2 w-full shadow-none border-slate-200"
              onChange={(e) => onSearch?.(e.target.value)}
            />
          </div>

          {/* ✨ 버튼 순서 변경: 검색 -> [토글] -> [필터] -> [액션] */}

          {/* (1) 축소/확대 버튼 */}
          {onToggleExpand && (
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "h-7 w-7 p-0 shrink-0",
                isExpanded
                  ? "text-indigo-600 bg-indigo-50 hover:bg-indigo-100"
                  : "text-slate-400 hover:text-slate-600 hover:bg-slate-100",
              )}
              onClick={onToggleExpand}
              title={isExpanded ? "전체 축소" : "전체 확장"}
            >
              {isExpanded ? (
                <ChevronsDownUp className="h-4 w-4" />
              ) : (
                <ChevronsUpDown className="h-4 w-4" />
              )}
            </Button>
          )}

          {/* (2) 필터 버튼 (설정이 있을 때만 표시, 글자 없음) */}
          {filterConfigs.length > 0 && (
            <DynamicFilter
              configs={filterConfigs}
              activeFilters={activeFilters}
              onApply={handleFilterApply}
            />
          )}

          {/* (3) 추가 액션 (User prop) */}
          {actions && <div className="shrink-0 flex gap-1 ml-1">{actions}</div>}
        </div>

        {/* 2. 하단 라인: 필터 뱃지 (활성화 시에만 공간 차지) */}
        {filterConfigs.length > 0 && (
          <FilterBadges
            configs={filterConfigs}
            activeFilters={activeFilters}
            onApply={handleFilterApply}
          />
        )}
      </div>

      {/* --- Content Area --- */}
      <div className="flex-1 overflow-y-auto p-2 space-y-0.5 custom-scrollbar">
        {children}
      </div>
    </aside>
  );
}
