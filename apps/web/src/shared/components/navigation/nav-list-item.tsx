"use client";

import React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/shared/lib/utils";

interface NavListItemProps {
  icon: LucideIcon;
  title: string;
  subInfo: (string | undefined | null)[];
  isSelected: boolean;
  onClick: () => void;
  className?: string;
}

export function NavListItem({
  icon: Icon,
  title,
  subInfo,
  isSelected,
  onClick,
}: NavListItemProps) {
  const validSubInfo = subInfo.filter((info): info is string => Boolean(info));

  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-start gap-3 p-3 rounded-xl text-left transition-all border outline-none",
        isSelected
          ? "bg-indigo-50/50 border-indigo-200 ring-1 ring-indigo-100 shadow-sm"
          : "bg-transparent border-transparent hover:bg-slate-50",
      )}
    >
      <div
        className={cn(
          "h-9 w-9 rounded-full flex items-center justify-center shrink-0 mt-0.5 transition-colors",
          isSelected
            ? "bg-indigo-100 text-indigo-600"
            : "bg-slate-100 text-slate-400",
        )}
      >
        <Icon className="h-5 w-5" />
      </div>

      <div className="flex flex-col min-w-0 flex-1">
        <div
          className={cn(
            "text-[13px] font-bold truncate",
            isSelected ? "text-indigo-700" : "text-slate-800",
          )}
        >
          {title}
        </div>
        <div className="text-[10px] text-slate-400 font-medium truncate flex items-center gap-1 mt-0.5">
          {validSubInfo.map((info, index) => (
            <React.Fragment key={index}>
              <span
                className={cn(
                  index === validSubInfo.length - 1 &&
                    "font-mono font-bold uppercase tracking-wider",
                )}
              >
                {info}
              </span>
              {index < validSubInfo.length - 1 && (
                <span className="text-slate-300">·</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </button>
  );
}
