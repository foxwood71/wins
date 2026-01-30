"use client";

import React from "react";
import { cn } from "@/shared/lib/utils";
import { LucideIcon, Settings } from "lucide-react"; // ✨ Settings 아이콘 추가
import { Label } from "@/shared/components/ui/label";
import { Button } from "@/shared/components/ui/button"; // ✨ Button 컴포넌트 추가
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
  label?: string; // ✨ 선택적으로 변경 (FormSelectWithTool 등에서 유연하게 쓰기 위함)
  children: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
}) {
  return (
    <div className={cn("space-y-1", fullWidth && "col-span-2", className)}>
      {label && (
        <Label className="text-[11px] font-bold text-slate-500 ml-0.5">
          {label}
        </Label>
      )}
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

// ✨ export를 추가하여 외부에서 타입을 쓸 수 있게 함
export interface FormSelectProps {
  label?: string;
  value?: string;
  onValueChange: (value: string) => void;
  options: { label: string; value: string }[];
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
          // ✨ [스타일 수정]
          // 1. h-9: 높이 고정 (Input과 동일)
          // 2. text-sm: 폰트 크기 14px (Input과 동일)
          // 3. font-normal: 굵기 보통 (Input과 동일 -> 기존 font-medium 제거)
          // 4. px-3: 좌우 여백 (Input과 동일)
          "w-full h-9 px-3 py-1 bg-white border-slate-200 rounded-md font-normal text-sm text-left focus:bg-white transition-colors shadow-sm",
          // disabled 상태일 때 스타일 (Input의 disabled와 비슷하게)
          disabled &&
            "bg-slate-50/50 text-slate-500 opacity-100 cursor-not-allowed",
          className,
        )}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="rounded-md border-slate-200 shadow-md">
        {options.map((opt) => (
          <SelectItem
            key={opt.value}
            value={opt.value}
            className="text-sm font-normal py-2 cursor-pointer"
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

/**
 * 5. ✨ FormSelectWithTool: 설정(관리) 버튼이 포함된 드롭다운
 * - FormSelect 옆에 작은 아이콘 버튼을 붙여서 렌더링합니다.
 * - 기능 역할, 공간 유형 등 관리 기능이 필요한 곳에 사용합니다.
 */
interface FormSelectWithToolProps extends Omit<FormSelectProps, "label"> {
  label?: string; // 라벨 (FormField용)
  onToolClick?: () => void; // 설정 버튼 클릭 시 동작
  showTool?: boolean; // 설정 버튼 표시 여부
}

export function FormSelectWithTool({
  label,
  onToolClick,
  showTool = false,
  className,
  ...props // FormSelectProps (options, value 등)
}: FormSelectWithToolProps) {
  return (
    <FormField label={label} className={className}>
      <div className="flex items-center gap-1">
        {/* 드롭다운 영역 (flex-1로 남은 공간 꽉 채움) */}
        <div className="flex-1 min-w-0">
          <FormSelect {...props} />{" "}
          {/* label은 위에서 처리했으므로 여기엔 전달 안 됨 */}
        </div>

        {/* 도구 버튼 (조건부 렌더링) */}
        {showTool && onToolClick && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="shrink-0 h-9 w-9 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md"
            onClick={onToolClick}
            title="목록 관리"
          >
            <Settings className="h-4.5 w-4.5" />
          </Button>
        )}
      </div>
    </FormField>
  );
}
