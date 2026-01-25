"use client";

import React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/shared/lib/utils";

interface NavListItemProps {
  icon?: LucideIcon;
  title: string;
  subInfo?: string[];
  isSelected?: boolean;
  onClick?: () => void;
  className?: string;
  // ✨ [추가] 우측에 배지나 아이콘 등을 넣기 위한 속성
  rightElement?: React.ReactNode;
}

export function NavListItem({
  icon: Icon,
  title,
  subInfo,
  isSelected,
  onClick,
  className,
  rightElement, // ✨ [추가] 구조 분해 할당
}: NavListItemProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center w-full p-2 rounded-xl transition-all group text-left relative", // relative 추가
        isSelected
          ? "bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] ring-1 ring-slate-200"
          : "hover:bg-slate-100/80 hover:shadow-sm",
        className,
      )}
    >
      {/* 1. 아이콘 영역 */}
      {Icon && (
        <div
          className={cn(
            "flex items-center justify-center w-8 h-8 rounded-lg mr-3 shrink-0 transition-colors",
            isSelected
              ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
              : "bg-white text-slate-400 border border-slate-100 group-hover:border-indigo-200 group-hover:text-indigo-500",
          )}
        >
          <Icon className="h-4 w-4" />
        </div>
      )}

      {/* 2. 텍스트 정보 영역 (flex-1로 남은 공간 차지) */}
      <div className="flex-1 min-w-0 pr-2">
        <div
          className={cn(
            "text-[13px] font-bold truncate transition-colors",
            isSelected
              ? "text-slate-800"
              : "text-slate-600 group-hover:text-slate-900",
          )}
        >
          {title}
        </div>
        {subInfo && subInfo.length > 0 && (
          <div className="flex items-center gap-1.5 mt-0.5 truncate">
            {subInfo.map((info, idx) => (
              <React.Fragment key={idx}>
                <span className="text-[11px] font-medium text-slate-400 truncate">
                  {info}
                </span>
                {idx < subInfo.length - 1 && (
                  <span className="text-[9px] text-slate-300">|</span>
                )}
              </React.Fragment>
            ))}
          </div>
        )}
      </div>

      {/* 3. ✨ [추가] 우측 요소 렌더링 영역 */}
      {rightElement && (
        <div className="shrink-0 ml-auto pl-2 flex items-center">
          {rightElement}
        </div>
      )}
    </button>
  );
}
