import React from "react";
import { Hammer, CheckCircle2, AlertCircle } from "lucide-react";
import { NavListItem } from "@/shared/components/navigation/nav-list-item"; // 기존 공통 컴포넌트 재사용
import { Equipment } from "../../model/types";

interface EquipmentListProps {
  data: Equipment[];
  selectedId: number | null;
  onSelect: (id: number) => void;
}

export function EquipmentList({
  data,
  selectedId,
  onSelect,
}: EquipmentListProps) {
  return (
    <div className="px-1 pb-4">
      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3 px-2">
        Equipment List
      </p>
      {data.map((item) => {
        const isActive = item.status === "Active";
        return (
          <NavListItem
            key={item.id}
            icon={Hammer}
            title={item.name}
            subInfo={[
              item.model,
              // item.status === "Active" ? "정상 가동" : "점검 필요",
            ]}
            isSelected={selectedId === item.id}
            onClick={() => onSelect(item.id)}
            className="h-auto py-2" // 높이 자동 조절
            rightElement={
              isActive ? (
                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
              ) : (
                <AlertCircle className="h-5 w-5 text-amber-500" />
              )
            }
          />
        );
      })}
      ;
    </div>
  );
}
