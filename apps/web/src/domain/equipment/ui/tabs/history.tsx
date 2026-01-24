"use client";

import React from "react";
import { cn } from "@/shared/lib/utils";
import { Plus } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";

interface HistoryProps {
  data: {
    history?: {
      maintenance?: string[][];
      materials?: string[][];
    };
  };
}

export function History({ data }: HistoryProps) {
  const maintenanceData = data.history?.maintenance || [];
  const materialsData = data.history?.materials || [];

  const TOTAL_ROWS = 5;

  // 헬퍼 함수: 데이터 다음에 추가 행을 넣고 남은 칸을 빈 행으로 채움
  const renderTableRows = (
    currentData: string[][],
    colCount: number,
    type: "maintenance" | "materials",
  ) => {
    const rows = [];
    const dataToShow = currentData.slice(0, TOTAL_ROWS - 1); // 최대 4개 데이터

    // 1. 실제 데이터 행 추가
    dataToShow.forEach((item, index) => {
      if (type === "maintenance") {
        rows.push(
          <TableRow
            key={`data-${index}`}
            className="h-9 border-slate-50 hover:bg-slate-50/50"
          >
            <TableCell className="text-[12px] border-r border-slate-100 text-center">
              {item[1]}
            </TableCell>
            <TableCell className="border-r border-slate-100 text-center">
              <span
                className={cn(
                  "px-1.5 py-0.5 rounded text-[10px] font-bold",
                  item[0] === "수리"
                    ? "bg-red-50 text-red-700"
                    : "bg-blue-50 text-blue-700",
                )}
              >
                {item[0]}
              </span>
            </TableCell>
            <TableCell className="text-[12px] text-slate-500 border-r border-slate-100 truncate max-w-[200px]">
              {item[2]}
            </TableCell>
            <TableCell className="text-right font-mono text-[12px] border-r border-slate-100">
              {item[5]}
            </TableCell>
            <TableCell className="text-center font-bold text-[11px] text-emerald-600">
              {item[6]}
            </TableCell>
          </TableRow>,
        );
      } else {
        rows.push(
          <TableRow
            key={`data-${index}`}
            className="h-9 border-slate-50 hover:bg-slate-50/50"
          >
            <TableCell className="text-[12px] border-r border-slate-100 text-center">
              {item[0]}
            </TableCell>
            <TableCell className="text-[12px] border-r border-slate-100 text-center truncate max-w-[120px]">
              {item[1]}
            </TableCell>
            <TableCell className="text-[12px] font-semibold text-slate-700 border-r border-slate-100 truncate max-w-[200px]">
              {item[2]}
            </TableCell>
            <TableCell className="text-right font-mono text-[12px] border-r border-slate-100">
              {item[3]}
            </TableCell>
            <TableCell className="text-right font-mono text-[12px]">
              {item[5]}
            </TableCell>
          </TableRow>,
        );
      }
    });

    // 2. 데이터 바로 다음에 "추가" 행 삽입
    if (rows.length < TOTAL_ROWS) {
      rows.push(
        <TableRow
          key="add-row"
          className="bg-slate-50/30 hover:bg-blue-50/50 cursor-pointer group h-9 border-slate-100"
        >
          <TableCell
            colSpan={colCount}
            className="text-center text-slate-400 text-xs italic"
          >
            <div className="flex items-center justify-center gap-2 group-hover:text-blue-600 transition-colors font-semibold">
              <Plus className="h-3 w-3" />
              새로운 {type === "maintenance" ? "수리" : "자재"} 이력 추가
            </div>
          </TableCell>
        </TableRow>,
      );
    }

    // 3. 남은 칸을 빈 행으로 채움
    while (rows.length < TOTAL_ROWS) {
      rows.push(
        <TableRow key={`empty-${rows.length}`} className="h-9 border-slate-50">
          {Array.from({ length: colCount }).map((_, j) => (
            <TableCell
              key={j}
              className="border-r border-slate-100 last:border-r-0"
            />
          ))}
        </TableRow>,
      );
    }

    return rows;
  };

  return (
    /* 높이를 줄이기 위해 gap-4로 조정하고 h-full 유지 */
    <div className="flex flex-col gap-4 h-full min-h-0 overflow-hidden">
      <div className="flex flex-col min-h-0">
        <div className="flex items-center mb-1.5 shrink-0">
          <h3 className="text-[13px] font-bold text-slate-700 flex items-center gap-2">
            <span className="w-1.5 h-3.5 bg-blue-600 rounded-full" />
            수리 및 정비 이력
          </h3>
        </div>
        <div className="border border-slate-200 rounded-lg overflow-hidden bg-white shadow-sm">
          <Table className="border-collapse">
            <TableHeader className="bg-slate-50 z-10 shadow-sm">
              <TableRow className="hover:bg-transparent border-none h-9">
                <TableHead className="w-[110px] font-bold border-r border-slate-200 text-center text-[11px]">
                  일자
                </TableHead>
                <TableHead className="w-[80px] font-bold border-r border-slate-200 text-center text-[11px]">
                  구분
                </TableHead>
                <TableHead className="font-bold border-r border-slate-200 text-[11px]">
                  내용
                </TableHead>
                <TableHead className="w-[100px] font-bold border-r border-slate-200 text-right text-[11px]">
                  비용
                </TableHead>
                <TableHead className="w-[80px] font-bold text-center text-[11px]">
                  상태
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {renderTableRows(maintenanceData, 5, "maintenance")}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="flex flex-col min-h-0">
        <div className="flex items-center mb-1.5 shrink-0">
          <h3 className="text-[13px] font-bold text-slate-700 flex items-center gap-2">
            <span className="w-1.5 h-3.5 bg-amber-500 rounded-full" />
            자재 및 부품 이력
          </h3>
        </div>
        <div className="border border-slate-200 rounded-lg overflow-hidden bg-white shadow-sm">
          <Table className="border-collapse">
            <TableHeader className="bg-slate-50 z-10 shadow-sm">
              <TableRow className="hover:bg-transparent border-none h-9">
                <TableHead className="w-[90px] font-bold border-r border-slate-200 text-center text-[11px]">
                  구분
                </TableHead>
                <TableHead className="w-[130px] font-bold border-r border-slate-200 text-center text-[11px]">
                  구매처
                </TableHead>
                <TableHead className="font-bold border-r border-slate-200 text-[11px]">
                  품명/규격
                </TableHead>
                <TableHead className="w-[80px] font-bold border-r border-slate-200 text-right text-[11px]">
                  수량
                </TableHead>
                <TableHead className="w-[100px] font-bold text-right text-[11px]">
                  금액
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {renderTableRows(materialsData, 5, "materials")}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
