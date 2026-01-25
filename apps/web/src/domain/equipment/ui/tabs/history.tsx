"use client";

import React from "react";
import { Plus } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { cn } from "@/shared/lib/utils";
import { DataTable, ColumnDef } from "@/shared/components/table/data-table";
import {
  Equipment,
  MaintenanceRecord,
  MaterialRecord,
} from "../../model/types";

interface HistoryProps {
  data: Equipment;
}

export function History({ data }: HistoryProps) {
  const maintenanceData = data.history?.maintenance || [];
  const materialsData = data.history?.materials || [];

  // 1. 유지보수 이력 컬럼
  const maintColumns: ColumnDef<MaintenanceRecord>[] = [
    {
      header: "일자",
      accessorKey: "date", // ✨ 키 접근
      width: "w-28",
      align: "center",
      cell: (item) => (
        <span className="font-mono text-slate-600">{item.date}</span>
      ),
    },
    {
      header: "구분",
      accessorKey: "type",
      width: "w-20",
      align: "center",
      cell: (item) => (
        <Badge
          variant="secondary"
          className={cn(
            "h-5 px-1.5 text-[10px] font-bold border rounded-md",
            item.type === "Repair"
              ? "bg-rose-50 text-rose-700 border-rose-100"
              : "bg-blue-50 text-blue-700 border-blue-100",
          )}
        >
          {item.type}
        </Badge>
      ),
    },
    {
      header: "작업내용",
      accessorKey: "content",
      align: "left",
      cell: (item) => (
        <span className="font-medium text-slate-700">{item.content}</span>
      ),
    },
    {
      header: "비용",
      accessorKey: "cost",
      width: "w-24",
      align: "right",
      cell: (item) => (
        <span className="font-mono text-slate-600">{item.cost}</span>
      ),
    },
    {
      header: "상태",
      accessorKey: "status",
      width: "w-20",
      align: "center",
      cell: (item) => (
        <span className="text-[11px] font-bold text-emerald-600">
          {item.status}
        </span>
      ),
    },
    {
      header: "비고",
      accessorKey: "note",
      width: "w-40",
      align: "left",
      cell: (item) => (
        <span className="text-slate-400 text-[11px] truncate">{item.note}</span>
      ),
    },
  ];

  // 2. 자재 이력 컬럼
  const matColumns: ColumnDef<MaterialRecord>[] = [
    { header: "구분", accessorKey: "type", width: "w-20", align: "center" },
    { header: "구매처", accessorKey: "vendor", width: "w-32", align: "center" },
    {
      header: "품명/규격",
      accessorKey: "name",
      align: "left",
      cell: (item) => (
        <span className="font-medium text-slate-700">{item.name}</span>
      ),
    },
    { header: "수량", accessorKey: "quantity", width: "w-20", align: "right" },
    {
      header: "금액",
      accessorKey: "totalPrice",
      width: "w-24",
      align: "right",
      cell: (item) => (
        <span className="font-bold text-slate-700">{item.totalPrice}</span>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-4 h-full overflow-hidden">
      {/* 상단: 유지보수 */}
      <div className="flex-1 flex flex-col min-h-0 border-b border-slate-100 pb-2">
        <div className="flex items-center justify-between mb-2 shrink-0">
          <h3 className="text-[13px] font-bold text-slate-700 flex items-center gap-2">
            <span className="w-1.5 h-3.5 bg-indigo-600 rounded-full" />
            수리 및 정비 이력
          </h3>
          <Button
            variant="outline"
            size="sm"
            className="h-7 text-[11px] font-bold rounded-lg shadow-sm  gap-1.5 text-indigo-600 bg-indigo-50 border border-indigo-200  hover:text-indigo-600 hover:bg-indigo-100"
          >
            <Plus className="h-3.5 w-3.5" /> 이력등록
          </Button>
        </div>
        <div className="flex-1 min-h-0">
          <DataTable
            columns={maintColumns}
            data={maintenanceData}
            minRows={5}
          />
        </div>
      </div>

      {/* 하단: 자재 */}
      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex items-center justify-between mb-2 shrink-0">
          <h3 className="text-[13px] font-bold text-slate-700 flex items-center gap-2">
            <span className="w-1.5 h-3.5 bg-amber-500 rounded-full" />
            자재 사용 내역
          </h3>
          <Button
            variant="outline"
            size="sm"
            className="h-7 text-[11px] font-bold rounded-lg shadow-sm gap-1.5 text-amber-600 bg-amber-50 border border-amber-200  hover:text-amber-600 hover:bg-amber-100"
          >
            <Plus className="h-3.5 w-3.5" /> 자재등록
          </Button>
        </div>
        <div className="flex-1 min-h-0">
          <DataTable columns={matColumns} data={materialsData} minRows={4} />
        </div>
      </div>
    </div>
  );
}
