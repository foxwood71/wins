"use client";

import React from "react";
import { Plus } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { DataTable, ColumnDef } from "@/shared/components/table/data-table";
import { Equipment, Inspection as InspectionType } from "../../model/types"; // 타입 import

export const Inspection = ({ data }: { data: Equipment }) => {
  const inspectionData = data.inspections || [];

  const BADGE_STYLES = {
    PASS: "bg-emerald-50 text-emerald-700 border-emerald-100",
    FAIL: "bg-rose-50 text-rose-700 border-rose-100",
    INTERNAL: "bg-blue-50 text-blue-700 border-blue-100",
    EXTERNAL: "bg-purple-50 text-purple-700 border-purple-100",
    CYCLE: "bg-slate-50 text-slate-600 border-slate-200",
  };

  // ✨ 제네릭을 사용하여 타입 안전성 확보
  const columns: ColumnDef<InspectionType>[] = [
    {
      header: "검사일자",
      accessorKey: "date", // ✨ 숫자 인덱스 대신 키 사용
      width: "w-[8%]",
      align: "center",
      contentClassName: "font-mono text-slate-500 text-[11px]",
    },
    {
      header: "구분",
      accessorKey: "type",
      width: "w-[6%]",
      align: "center",
      type: "badge",
      badgeColors: {
        내부: BADGE_STYLES.INTERNAL,
        외부: BADGE_STYLES.EXTERNAL,
      },
    },
    {
      header: "주기",
      accessorKey: "cycle",
      width: "w-[8%]",
      align: "center",
      type: "badge",
      badgeColors: {
        월간: BADGE_STYLES.CYCLE,
        분기: BADGE_STYLES.CYCLE,
        연간: BADGE_STYLES.CYCLE,
      },
    },
    {
      header: "검사명",
      accessorKey: "name",
      width: "w-[12%]",
      align: "left",
      contentClassName: "font-bold text-slate-700",
    },
    {
      header: "판정",
      accessorKey: "result",
      width: "w-[6%]",
      align: "center",
      type: "badge",
      badgeColors: {
        Pass: BADGE_STYLES.PASS,
        "Cond. Pass": BADGE_STYLES.PASS,
        Fail: BADGE_STYLES.FAIL,
      },
    },
    {
      header: "담당자",
      accessorKey: "worker",
      width: "w-[12%]",
      align: "center",
      contentClassName: "text-slate-600",
    },
    {
      header: "기준값",
      accessorKey: "standard",
      width: "w-[8%]",
      align: "right",
      contentClassName: "font-mono font-bold text-slate-700",
    },
    {
      header: "측정(전)",
      accessorKey: "before",
      width: "w-[8%]",
      align: "right",
      contentClassName: "font-mono text-slate-600",
    },
    {
      header: "측정(후)",
      accessorKey: "after",
      width: "w-[8%]",
      align: "right",
      contentClassName: "font-mono font-bold text-indigo-600",
    },
    {
      header: "편차",
      accessorKey: "deviation",
      width: "w-[6%]",
      align: "right",
      contentClassName: "font-mono font-bold text-emerald-600",
    },
    {
      header: "검사의견",
      accessorKey: "note",
      width: "w-[14%]",
      align: "left",
      contentClassName: "text-slate-400 text-[11px]",
    },
  ];

  return (
    <div className="flex flex-col h-full gap-2 overflow-hidden">
      {/* (헤더 부분은 동일) */}
      <div className="flex items-center justify-between mb-2 shrink-0">
        <h3 className="text-[13px] font-bold text-slate-700 flex items-center gap-2">
          <span className="w-1.5 h-3.5 bg-indigo-500 rounded-full" />
          시험 및 검사 이력
        </h3>
        <Button
          variant="outline"
          size="sm"
          className="h-7 text-[11px] font-bold rounded-lg shadow-sm  gap-1.5 text-indigo-600 bg-indigo-50 border border-indigo-200  hover:text-indigo-600 hover:bg-indigo-100"
        >
          <Plus className="h-3.5 w-3.5" /> 검사등록
        </Button>
      </div>

      <div className="flex-1 min-h-0">
        <DataTable
          columns={columns}
          data={inspectionData}
          minRows={10}
          indexHeader="No"
          indexWidth="4%"
        />
      </div>
    </div>
  );
};
