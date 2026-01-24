"use client";

import React from "react";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/components/ui/button"; // ButtonProps 임포트 제거
import { LucideIcon } from "lucide-react";

// ButtonProps 대신 React 기본 버튼 속성을 사용합니다.
interface ToolbarButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: LucideIcon;
  iconClassName?: string;
  variant?: "ghost" | "outline" | "default" | "destructive"; // 필요한 속성만 추가
}

export function ToolbarButton({
  icon: Icon,
  iconClassName,
  className,
  variant = "ghost",
  ...props
}: ToolbarButtonProps) {
  return (
    <Button
      variant={variant}
      size="sm"
      className={cn(
        "h-7 w-7 p-0 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 transition-colors",
        className,
      )}
      {...props}
    >
      <Icon className={cn("h-4 w-4", iconClassName)} />
    </Button>
  );
}

/**
 * Toolbar: 버튼들을 일정한 간격으로 배치하는 컨테이너입니다.
 */
export function Toolbar({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-1 bg-white border border-slate-200 rounded-lg p-1 shadow-sm",
        className,
      )}
    >
      {children}
    </div>
  );
}
