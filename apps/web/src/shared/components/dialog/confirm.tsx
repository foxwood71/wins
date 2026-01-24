"use client";

import React from "react";
import { AlertTriangle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";

interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
  variant?: "destructive" | "warning";
}

export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  onConfirm,
  confirmText = "삭제",
  cancelText = "취소",
  variant = "destructive",
}: ConfirmDialogProps) {
  const isDestructive = variant === "destructive";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[360px] p-0 overflow-hidden border-none shadow-xl rounded-2xl font-sans">
        {/* 1. 내용 영역: 하단 여백을 pb-5에서 pb-2로 축소 */}
        <div className="pt-5 px-5 pb-2 flex gap-4 items-start bg-white">
          <div
            className={`shrink-0 h-10 w-10 ${isDestructive ? "bg-red-50 text-red-500" : "bg-amber-50 text-amber-500"} rounded-xl flex items-center justify-center border shadow-sm`}
          >
            <AlertTriangle className="h-5 w-5" />
          </div>

          <div className="flex-1 min-w-0">
            <DialogHeader className="text-left">
              <DialogTitle className="text-[15px] font-bold text-slate-900 leading-none">
                {title}
              </DialogTitle>
              <DialogDescription className="text-[12.5px] text-slate-500 font-medium mt-1.5 leading-normal break-keep">
                {description}
              </DialogDescription>
            </DialogHeader>
          </div>
        </div>

        {/* 2. 푸터 영역: 상단 여백을 pt-3에서 pt-2로 축소하여 전체 간격 최적화 */}
        <DialogFooter className="px-4 pt-2 pb-4 bg-slate-50/80 flex gap-2 sm:justify-end border-t border-slate-100">
          <Button
            variant="ghost"
            onClick={() => onOpenChange(false)}
            className="h-9 px-4 rounded-lg font-bold text-[12px] text-slate-500 hover:bg-white"
          >
            {cancelText}
          </Button>
          <Button
            onClick={() => {
              onConfirm();
              onOpenChange(false);
            }}
            className={`h-9 px-5 rounded-lg font-bold text-[12px] shadow-sm transition-all active:scale-95 ${isDestructive ? "bg-red-600 hover:bg-red-700 text-white" : "bg-slate-900 hover:bg-slate-800 text-white"}`}
          >
            {confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
