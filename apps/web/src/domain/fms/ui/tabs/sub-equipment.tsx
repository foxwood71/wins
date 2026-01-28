"use client";

import React from "react";
import { Plus, ArrowRight, Settings } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import {
  FormGrid,
  FormSectionHeader,
} from "@/shared/components/layout/app-content";
import { DataTable, ColumnDef } from "@/shared/components/table/data-table";
import { Equipment, SubEquipment } from "../../model/types";

export const SubEquipmentList = ({ data }: { data: Equipment }) => {
  // ✨ 타입에서 정의된 subEquipments 배열 사용
  const subEquipments = data.subEquipments || [];

  const columns: ColumnDef<SubEquipment>[] = [
    {
      header: "상태",
      accessorKey: "status",
      width: "w-24",
      align: "center",
      cell: (item) => (
        <Badge
          variant="outline"
          className={`
            h-5 px-1.5 text-[10px] font-bold border shrink-0
            ${
              item.status === "Active"
                ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                : "bg-amber-50 text-amber-700 border-amber-100"
            }
          `}
        >
          {item.status === "Active" ? "정상" : "점검중"}
        </Badge>
      ),
    },
    {
      header: "설비구분",
      accessorKey: "category",
      width: "w-28",
      align: "center",
    },
    {
      header: "부속 설비명",
      accessorKey: "name", // ✨ Key 접근
      align: "left",
      cell: (item) => (
        <div className="flex flex-col">
          <span className="font-bold text-slate-700">{item.name}</span>
          <span className="text-[10px] text-slate-400">Code: {item.code}</span>
        </div>
      ),
    },
    {
      header: "모델명",
      accessorKey: "model",
      width: "w-32",
      align: "left",
    },
    {
      header: "설치일자",
      accessorKey: "installDate",
      width: "w-28",
      align: "center",
    },
    {
      header: "관리",
      width: "w-24",
      align: "center",
      cell: (item) => (
        <Button
          variant="ghost"
          size="sm"
          className="h-7 text-[11px] text-indigo-600 hover:bg-indigo-50 hover:text-indigo-700 gap-1"
          onClick={() => alert(`${item.name} 상세 페이지로 이동`)}
        >
          상세 이동 <ArrowRight className="h-3 w-3" />
        </Button>
      ),
    },
  ];

  return (
    <div className="h-full flex flex-col gap-6 overflow-hidden">
      {/* (요약 섹션은 기존과 동일하되 subEquipments 변수만 사용하면 됨) */}
      <div className="shrink-0">
        <FormGrid>
          <FormSectionHeader title="구성 설비 요약" icon={Settings} />
          <div className="col-span-2 bg-slate-50/50 border border-slate-200 rounded-lg p-4 flex items-center gap-8">
            <div className="flex flex-col">
              <span className="text-[11px] text-slate-500 font-bold">
                총 구성 설비
              </span>
              <span className="text-lg font-bold text-slate-800">
                {subEquipments.length}{" "}
                <span className="text-xs font-normal text-slate-400">ea</span>
              </span>
            </div>
            <div className="w-px h-8 bg-slate-200" />
            <div className="flex flex-col">
              <span className="text-[11px] text-slate-500 font-bold">
                가동중
              </span>
              <span className="text-lg font-bold text-emerald-600">
                {subEquipments.filter((s) => s.status === "Active").length}{" "}
                <span className="text-xs font-normal text-slate-400">ea</span>
              </span>
            </div>
          </div>
        </FormGrid>
      </div>

      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex items-center justify-between mb-2 shrink-0">
          <h3 className="text-[13px] font-bold text-slate-700 flex items-center gap-2">
            <span className="w-1.5 h-3.5 bg-indigo-600 rounded-full" />
            등록된 하위 설비 목록
          </h3>
          <Button
            variant="outline"
            size="sm"
            className="h-7 text-[11px] bg-indigo-50 border-indigo-100 text-indigo-600 hover:bg-indigo-100 gap-1.5"
          >
            <Plus className="h-3.5 w-3.5" /> 설비등록
          </Button>
        </div>
        <div className="flex-1 min-h-0">
          <DataTable columns={columns} data={subEquipments} minRows={6} />
        </div>
      </div>
    </div>
  );
};
