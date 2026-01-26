"use client";

import * as React from "react";
import { Filter, X, RotateCcw } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Badge } from "@/shared/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { FilterConfig, FilterValues } from "./types";

interface CommonProps {
  configs: FilterConfig[];
  activeFilters: FilterValues;
  onApply: (filters: FilterValues) => void;
}

// 1. [수정] 버튼과 팝업만 담당하는 컴포넌트 (글자 삭제됨)
export function DynamicFilter({
  configs,
  activeFilters,
  onApply,
}: CommonProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [tempFilters, setTempFilters] =
    React.useState<FilterValues>(activeFilters);

  React.useEffect(() => {
    if (isOpen) {
      setTempFilters({ ...activeFilters });
    }
  }, [isOpen, activeFilters]);

  const handleChange = (key: string, value: string) => {
    setTempFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleApply = () => {
    onApply(tempFilters);
    setIsOpen(false);
  };

  const handleReset = () => {
    const emptyFilters: FilterValues = {};
    configs.forEach((c) => {
      emptyFilters[c.key] = "";
    });
    setTempFilters(emptyFilters);
    onApply(emptyFilters); // 즉시 적용
    setIsOpen(false);
  };

  // 활성화된 필터 개수 (숫자 뱃지용)
  const activeCount = Object.values(activeFilters).filter(
    (v) => v !== "" && v !== undefined && v !== "all_clear_value",
  ).length;

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={activeCount > 0 ? "secondary" : "ghost"} // 스타일 조정
          size="sm"
          className={`h-7 w-7 p-0 ${activeCount > 0 ? "text-indigo-600 bg-indigo-50" : "text-slate-400 hover:text-slate-600"}`}
          title="상세 필터"
        >
          {/* ✨ [수정] 텍스트 제거하고 아이콘만 남김 */}
          <Filter className="h-4 w-4" />
          {/* 활성 개수가 있으면 작은 점으로 표시하거나 생략 가능 */}
          {activeCount > 0 && (
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-indigo-600 ring-1 ring-white" />
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-80 p-0" align="end">
        {/* ... (팝오버 내부 내용은 기존과 동일) ... */}
        <div className="flex items-center justify-between border-b px-4 py-3 bg-slate-50/50">
          <h4 className="font-semibold text-sm">상세 필터 설정</h4>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            className="h-6 px-2 text-xs text-slate-500 hover:text-red-600 hover:bg-red-50"
          >
            <RotateCcw className="mr-1 h-3 w-3" /> 초기화
          </Button>
        </div>

        <div className="p-4 space-y-4 max-h-[300px] overflow-y-auto custom-scrollbar">
          {configs.map((config) => (
            <div key={config.key} className="space-y-1.5">
              <label className="text-xs font-medium text-slate-600 flex items-center gap-1">
                {config.label}
              </label>
              {config.type === "text" && (
                <Input
                  placeholder={config.placeholder || "입력하세요"}
                  value={tempFilters[config.key] || ""}
                  onChange={(e) => handleChange(config.key, e.target.value)}
                  className="h-8 text-xs"
                />
              )}
              {config.type === "select" && config.options && (
                <Select
                  value={tempFilters[config.key] || "all_clear_value"}
                  onValueChange={(val) =>
                    handleChange(
                      config.key,
                      val === "all_clear_value" ? "" : val,
                    )
                  }
                >
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue placeholder="전체" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem
                      value="all_clear_value"
                      className="text-slate-500 text-xs"
                    >
                      전체 (All)
                    </SelectItem>
                    {config.options.map((opt) => (
                      <SelectItem
                        key={opt.value}
                        value={opt.value}
                        className="text-xs"
                      >
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
          ))}
        </div>

        <div className="p-4 border-t bg-slate-50/30">
          <Button
            onClick={handleApply}
            className="w-full h-8 text-xs font-medium"
          >
            적용하기
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

// 2. [신규] 필터 뱃지(Chips)만 따로 그리는 컴포넌트
export function FilterBadges({ configs, activeFilters, onApply }: CommonProps) {
  const handleRemoveSingle = (key: string) => {
    const newFilters = { ...activeFilters, [key]: "" };
    onApply(newFilters);
  };

  const handleReset = () => {
    const emptyFilters: FilterValues = {};
    configs.forEach((c) => (emptyFilters[c.key] = ""));
    onApply(emptyFilters);
  };

  const activeCount = Object.values(activeFilters).filter(
    (v) => v !== "" && v !== undefined && v !== "all_clear_value",
  ).length;

  if (activeCount === 0) return null;

  return (
    <div className="flex flex-wrap gap-1.5 pt-2 px-1">
      {configs.map((config) => {
        const val = activeFilters[config.key];
        if (!val || val === "all_clear_value") return null;

        let displayValue = val;
        if (config.type === "select" && config.options) {
          const foundOption = config.options.find((o) => o.value === val);
          if (foundOption) displayValue = foundOption.label;
        }

        return (
          <Badge
            key={config.key}
            variant="outline"
            className="h-6 px-2 bg-indigo-50 text-indigo-700 border-indigo-200 gap-1 text-[11px] font-normal"
          >
            <span className="font-semibold text-indigo-500">
              {config.label}:
            </span>
            {displayValue}
            <button
              onClick={() => handleRemoveSingle(config.key)}
              className="ml-1 rounded-full p-0.5 hover:bg-indigo-200 transition-colors"
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        );
      })}
      <button
        onClick={handleReset}
        className="text-[10px] text-slate-400 hover:text-slate-600 underline decoration-slate-300 underline-offset-2 ml-1 self-center"
      >
        전체 해제
      </button>
    </div>
  );
}
