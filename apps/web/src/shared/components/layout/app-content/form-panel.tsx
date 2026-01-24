"use client";

import React from "react";
import { cn } from "@/shared/lib/utils";
import { LucideIcon } from "lucide-react";
import { Label } from "@/shared/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";

/**
 * 1. FormGrid: 폼 요소들을 2열로 배치하는 그리드 컨테이너
 * ✨ Full HD 최적화: gap-y를 6에서 3으로, gap-x를 12에서 6으로 축소
 */
export function FormGrid({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("grid grid-cols-2 gap-x-6 gap-y-3", className)}>
      {children}
    </div>
  );
}

/**
 * 2. FormSectionHeader: 섹션 구분선과 제목
 * ✨ Full HD 최적화: mt, pt 간격을 줄이고 텍스트 밀도를 높임
 */
export function FormSectionHeader({
  title,
  icon: Icon,
  className,
}: {
  title: string;
  icon?: LucideIcon;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "col-span-2 flex items-center gap-2 pt-3 border-t border-slate-100 mt-1 mb-1",
        className,
      )}
    >
      {Icon && <Icon className="h-4 w-4 text-indigo-500/80" />}
      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
        {title}
      </span>
    </div>
  );
}

/**
 * 3. FormField: 레이블과 입력 요소를 수직으로 배치
 * ✨ Full HD 최적화: space-y를 2에서 1로 축소
 */
export function FormField({
  label,
  children,
  className,
  fullWidth = false,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
}) {
  return (
    <div className={cn("space-y-1", fullWidth && "col-span-2", className)}>
      <Label className="text-[11px] font-bold text-slate-500 ml-0.5">
        {label}
      </Label>
      {children}
    </div>
  );
}

/**
 * 4. FormSelect: 공용 드롭다운 컴포넌트
 * ✨ Full HD 최적화: h-11을 h-9로, rounded-xl을 rounded-lg로 변경
 */
interface SelectOption {
  label: string;
  value: string;
}

interface FormSelectProps {
  label?: string;
  value?: string;
  onValueChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export function FormSelect({
  label,
  value,
  onValueChange,
  options,
  placeholder = "선택하세요",
  disabled = false,
  className,
}: FormSelectProps) {
  const content = (
    <Select value={value} onValueChange={onValueChange} disabled={disabled}>
      <SelectTrigger
        className={cn(
          "h-9 bg-slate-50/50 border-slate-200 rounded-lg font-bold text-[13px] focus:bg-white transition-colors shadow-none",
          className,
        )}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="rounded-lg border-slate-200 shadow-xl">
        {options.map((opt) => (
          <SelectItem
            key={opt.value}
            value={opt.value}
            className="text-[13px] font-medium py-2"
          >
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );

  if (label) {
    return <FormField label={label}>{content}</FormField>;
  }
  return content;
}
