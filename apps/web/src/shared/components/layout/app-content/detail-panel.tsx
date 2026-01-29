"use client";

import React from "react";
import { LucideIcon, Pencil, Save, X } from "lucide-react";
import { Button } from "@/shared/components/ui/button";

interface DetailPanelProps {
  icon: LucideIcon;
  title: string;
  subTitle?: React.ReactNode;
  tabs?: React.ReactNode;
  children: React.ReactNode;
  mode?: "view" | "edit";
  onEdit?: () => void;
  onCancel?: () => void;
  onSave?: () => void;
}

export function DetailPanel({
  icon: Icon,
  title,
  subTitle,
  tabs,
  children,
  mode = "view",
  onEdit,
  onCancel,
  onSave,
}: DetailPanelProps) {
  return (
    <div className="flex flex-col h-full gap-4 animate-in fade-in duration-300 font-sans min-w-0">
      {/* 상단 프로필 카드 */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm px-6 py-5 shrink-0 flex items-center gap-5 text-slate-900">
        <div className="h-16 w-16 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-center text-slate-300 shadow-inner">
          <Icon className="h-8 w-8" />
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-xl font-bold mb-1 truncate leading-tight">
            {title}
          </h2>
          <div className="flex items-center gap-2 text-[12px] text-slate-500 font-bold flex-wrap">
            {subTitle}
          </div>
        </div>
      </div>

      {/* 하단 상세 정보 및 버튼 영역 */}
      <div className="flex-1 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col min-w-0">
        {tabs && (
          <div className="flex items-end h-14 border-b border-slate-100 px-6 shrink-0 bg-slate-50/30">
            {tabs}
          </div>
        )}

        <div className="flex-1 p-6 overflow-y-auto custom-scrollbar">
          <div className="w-full ">{children}</div>
        </div>

        {(onEdit || onSave) && (
          <div className="shrink-0 p-4 border-t border-slate-100 bg-white flex justify-end gap-3">
            {mode === "view" ? (
              <Button
                onClick={onEdit}
                className="h-9 px-6 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 font-bold rounded-lg text-[13px] shadow-sm border border-indigo-200"
              >
                <Pencil className="h-3.5 w-3.5 mr-2" /> 정보 수정
              </Button>
            ) : (
              <>
                <Button
                  onClick={onCancel}
                  variant="ghost"
                  className="h-9 px-6 rounded-lg text-slate-500 font-bold text-[13px] hover:bg-slate-100"
                >
                  <X className="h-3.5 w-3.5 mr-2" /> 취소
                </Button>
                <Button
                  onClick={onSave}
                  className="h-9 px-8 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-md transition-all active:scale-95 text-[13px]"
                >
                  <Save className="h-3.5 w-3.5 mr-2" /> 저장
                </Button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
