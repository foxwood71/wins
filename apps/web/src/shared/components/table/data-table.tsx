"use client";

import React from "react";
import { cn } from "@/shared/lib/utils";
import { Badge } from "@/shared/components/ui/badge"; // shadcn/ui 배지 컴포넌트
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";

/**
 * ✨ 컬럼 정의 인터페이스
 * T는 데이터 객체의 타입을 의미합니다.
 */
export interface ColumnDef<T> {
  header: string;
  accessorKey?: keyof T | number; // 데이터 객체의 키 또는 배열 인덱스
  width?: string; // Tailwind 클래스 (예: w-[10%])
  align?: "left" | "center" | "right";
  contentClassName?: string; // ✨ 에러 해결: 셀 내부 텍스트 스타일 클래스

  // 배지 렌더링 설정
  type?: "text" | "badge";
  badgeColors?: Record<string, string>; // { "값": "클래스명" } 구조

  // 커스텀 렌더링이 필요한 경우
  cell?: (item: T, index: number) => React.ReactNode;
}

interface DataTableProps<T> {
  columns: ColumnDef<T>[];
  data: T[];
  minRows?: number;
  onRowClick?: (item: T) => void;
  className?: string;
  indexWidth?: string; // 순번 컬럼 너비 (CSS 값: 예 '50px', '4%')
  indexHeader?: string; // 순번 컬럼 헤더 텍스트 (No, # 등)
}

export function DataTable<T>({
  columns,
  data,
  minRows = 5,
  onRowClick,
  className,
  indexWidth = "50px", // 기본값 50px
  indexHeader = "#", // 기본값 #
}: DataTableProps<T>) {
  return (
    <div
      className={cn(
        "border border-slate-200 rounded-lg overflow-hidden bg-white shadow-sm flex flex-col h-full",
        className,
      )}
    >
      <div className="flex-1 overflow-x-auto overflow-y-auto custom-scrollbar relative">
        <Table className="w-full table-fixed">
          <TableHeader className="bg-slate-50/80 sticky top-0 z-10 shadow-sm">
            <TableRow className="hover:bg-transparent border-b border-slate-200">
              {/* 🔒 순번(Index) 컬럼: 삼중 잠금으로 크기 고정 */}
              <TableHead
                style={{
                  width: indexWidth,
                  minWidth: indexWidth,
                  maxWidth: indexWidth,
                }}
                className="text-center text-[11px] font-bold text-slate-700 h-9 bg-slate-50/80 p-0"
              >
                {indexHeader}
              </TableHead>

              {/* 데이터 컬럼 헤더 */}
              {columns.map((col, i) => (
                <TableHead
                  key={i}
                  className={cn(
                    "h-9 text-[11px] font-bold text-slate-700 whitespace-nowrap bg-slate-50/80",
                    col.width,
                    col.align === "center" && "text-center",
                    col.align === "right" && "text-right",
                    col.align === "left" && "text-left",
                  )}
                >
                  {col.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.map((row, idx) => (
              <TableRow
                key={idx}
                onClick={() => onRowClick?.(row)}
                className={cn(
                  "border-b border-slate-100 last:border-0 hover:bg-indigo-50/30 transition-colors group",
                  onRowClick && "cursor-pointer",
                )}
              >
                {/* 순번 셀 */}
                <TableCell className="text-center text-slate-400 font-medium text-[11px] py-2.5 group-hover:text-indigo-500 truncate">
                  {idx + 1}
                </TableCell>

                {/* 데이터 셀 루프 */}
                {columns.map((col, cIdx) => {
                  // ✨ any 제거 및 타입 안전한 값 추출
                  const rawValue =
                    col.accessorKey !== undefined
                      ? row[col.accessorKey as keyof T]
                      : undefined;

                  const displayValue =
                    rawValue !== undefined && rawValue !== null
                      ? String(rawValue)
                      : "";

                  return (
                    <TableCell
                      key={cIdx}
                      title={displayValue} // 마우스 오버 시 전체 내용 표시
                      className={cn(
                        "py-2.5 text-[12px] text-slate-600 truncate",
                        col.align === "center" && "text-center",
                        col.align === "right" && "text-right",
                        col.align === "left" && "text-left",
                      )}
                    >
                      {/* 렌더링 로직 분기 */}
                      {col.cell ? (
                        col.cell(row, idx)
                      ) : col.type === "badge" ? (
                        <Badge
                          variant="outline"
                          className={cn(
                            "h-5 px-2 text-[10px] font-bold border justify-center min-w-[50px]",
                            col.badgeColors?.[displayValue] ||
                              "bg-slate-100 text-slate-600 border-slate-200",
                          )}
                        >
                          {displayValue || "-"}
                        </Badge>
                      ) : (
                        <span
                          className={cn("truncate block", col.contentClassName)}
                        >
                          {displayValue}
                        </span>
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}

            {/* 최소 행(minRows)을 채우기 위한 빈 행 처리 */}
            {Array.from({ length: Math.max(0, minRows - data.length) }).map(
              (_, i) => (
                <TableRow
                  key={`empty-${i}`}
                  className="hover:bg-transparent border-b border-slate-50 last:border-0 h-9"
                >
                  <TableCell className="py-2" />
                  {columns.map((_, j) => (
                    <TableCell key={j} className="py-2" />
                  ))}
                </TableRow>
              ),
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
