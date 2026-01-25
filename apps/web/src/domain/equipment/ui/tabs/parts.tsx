"use client";

import React from "react";
import { Plus } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { cn } from "@/shared/lib/utils";
import { DataTable, ColumnDef } from "@/shared/components/table/data-table";
import { Equipment, Part } from "../../model/types";

export const Parts = ({ data }: { data: Equipment }) => {
  const partsData = data.parts || [];

  const columns: ColumnDef<Part>[] = [
    {
      header: "상태",
      accessorKey: "status",
      width: "w-[80px]",
      align: "center",
      cell: (item) => (
        <Badge
          variant="outline"
          className={cn(
            "h-5 px-1.5 text-[10px] font-bold border shrink-0",
            item.status === "Normal"
              ? "bg-emerald-50 text-emerald-700 border-emerald-100"
              : "bg-amber-50 text-amber-700 border-amber-100",
          )}
        >
          {item.status}
        </Badge>
      ),
    },
    {
      header: "부품명",
      accessorKey: "name",
      align: "left",
      cell: (item) => (
        <span className="font-bold text-slate-700">{item.name}</span>
      ),
    },
    {
      header: "규격",
      accessorKey: "spec",
      align: "left",
      cell: (item) => <span className="text-slate-600">{item.spec}</span>,
    },
    {
      header: "교체주기",
      accessorKey: "cycle",
      width: "w-[100px]",
      align: "center",
      cell: (item) => (
        <span className="text-slate-500 text-[11px]">{item.cycle}</span>
      ),
    },
    {
      header: "수량",
      accessorKey: "quantity",
      width: "w-[80px]",
      align: "center",
      cell: (item) => (
        <span className="font-mono text-slate-600">{item.quantity}</span>
      ),
    },
    {
      header: "비고",
      accessorKey: "note",
      align: "left",
      cell: (item) => <span className="text-slate-500">{item.note}</span>,
    },
  ];

  return (
    <div className="flex flex-col h-full gap-2 overflow-hidden">
      <div className="flex items-center justify-between mb-2 shrink-0">
        <h3 className="text-[13px] font-bold text-slate-700 flex items-center gap-2">
          <span className="w-1.5 h-3.5 bg-slate-500 rounded-full" />
          주요 부품 목록
        </h3>
        <Button
          variant="outline"
          size="sm"
          className="h-7 text-[11px] font-bold rounded-lg shadow-sm  gap-1.5 text-indigo-600 bg-indigo-50 border border-indigo-200  hover:text-indigo-600 hover:bg-indigo-100"
        >
          <Plus className="h-3.5 w-3.5" /> 부품등록
        </Button>
      </div>
      <div className="flex-1 min-h-0">
        <DataTable columns={columns} data={partsData} minRows={10} />
      </div>
    </div>
  );
};
