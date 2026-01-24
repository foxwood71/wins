"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Landmark,
  Plus,
  Pencil,
  Trash2,
  Check,
  Info,
  AlertCircle,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { NavListItem } from "@/shared/components/navigation/nav-list-item";
import { ConfirmDialog } from "@/shared/components/dialog/confirm";
import { Sector } from "../../../model/types"; // 경로 확인 필요

interface SectorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  units: Sector[];
  onUnitsChange: React.Dispatch<React.SetStateAction<Sector[]>>;
}

export function SectorDialog({
  open,
  onOpenChange,
  units,
  onUnitsChange,
}: SectorDialogProps) {
  // ✨ [수정] ID 타입은 number여야 하므로 null | number 로 변경
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Sector | null>(null);
  // ✨ [수정] 삭제 대상 ID도 number
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);

  const listRef = useRef<HTMLDivElement>(null);

  // ✨ [수정] 신규 추가(음수 ID) 감지 시 스크롤 이동
  useEffect(() => {
    // editingId가 존재하고 0보다 작으면(신규) 스크롤 이동
    if (editingId && editingId < 0 && listRef.current) {
      setTimeout(() => {
        listRef.current?.scrollTo({
          top: listRef.current.scrollHeight,
          behavior: "smooth",
        });
      }, 100);
    }
  }, [editingId]);

  const startEditing = (unit: Sector) => {
    setEditingId(unit.id);
    setEditForm({ ...unit });
  };

  const cancelEditing = () => {
    // ✨ [수정] 신규 아이템(음수 ID) 취소 시 리스트에서 제거
    if (editingId && editingId < 0) {
      onUnitsChange((prev) => prev.filter((u) => u.id !== editingId));
    }
    setEditingId(null);
    setEditForm(null);
  };

  const saveEditing = () => {
    if (!editForm || !editForm.name.trim()) return;
    onUnitsChange((prev) =>
      prev.map((u) => (u.id === editingId ? editForm : u)),
    );
    setEditingId(null);
    setEditForm(null);
  };

  const handleAddNew = () => {
    // ✨ [수정] number 타입을 맞추기 위해 임시 ID를 음수로 생성 (-timestamp)
    const newId = -Date.now();
    const newUnit: Sector = {
      id: newId,
      name: "",
      code: "", // 초기값 빈 문자열
      // ✨ [수정] Sector 인터페이스에 맞는 sort_order 사용
      sort_order: units.length + 1,
    };
    onUnitsChange((prev) => [...prev, newUnit]);
    setEditingId(newId);
    setEditForm(newUnit);
  };

  const handleDeleteConfirm = () => {
    if (deleteTargetId !== null) {
      // 0일 수도 있으므로 !== null 체크
      onUnitsChange((prev) => prev.filter((u) => u.id !== deleteTargetId));
      setDeleteTargetId(null);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-[520px] p-0 overflow-hidden border-none shadow-2xl rounded-[32px] font-sans">
          <DialogHeader className="p-8 pb-6 bg-white shrink-0">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm border border-indigo-100">
                <Landmark className="h-6 w-6" />
              </div>
              <div>
                <DialogTitle className="text-xl font-bold text-slate-900 tracking-tight">
                  본부 관리
                </DialogTitle>
                <DialogDescription className="text-[13px] text-slate-500 font-medium mt-1">
                  시스템 최상위 본부 정보를 관리하고 편집합니다.
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <div className="mx-6 mb-2 bg-slate-50/80 border border-slate-100 rounded-[24px] overflow-hidden flex flex-col min-h-0">
            <div className="px-5 py-4 flex items-center justify-between border-b border-white/60 bg-white/40">
              <span className="text-[12px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <AlertCircle className="h-3.5 w-3.5" /> 등록된 본부 목록 (
                {units.length})
              </span>
            </div>

            <div
              ref={listRef}
              className="p-3 max-h-[380px] overflow-y-auto space-y-2.5 custom-scrollbar"
            >
              {units.map((unit) => (
                <div key={unit.id} className="group">
                  {editingId === unit.id ? (
                    <div className="flex flex-col gap-4 p-5 bg-white border border-indigo-200 rounded-2xl animate-in fade-in slide-in-from-top-2 duration-300 shadow-lg">
                      <div className="flex items-center gap-1.5 border-b border-indigo-50 pb-2 mb-1">
                        <Info className="h-3.5 w-3.5 text-indigo-500" />
                        <span className="text-[11px] font-bold text-indigo-400 uppercase tracking-tighter">
                          {/* ✨ [수정] ID가 음수이면 신규 항목임 */}
                          {unit.id < 0 ? "New Item" : "Editing Item"}
                        </span>
                        <span className="text-[11px] font-bold text-slate-600 truncate">
                          {unit.name || "신규 본부 등록"}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-[11px] font-bold text-slate-500 ml-1">
                            본부명
                          </Label>
                          <Input
                            value={editForm?.name || ""}
                            onChange={(e) =>
                              setEditForm((prev) =>
                                prev ? { ...prev, name: e.target.value } : null,
                              )
                            }
                            className="h-10 bg-slate-50/50 border-slate-200 rounded-xl font-bold shadow-none focus:bg-white"
                            autoFocus
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-[11px] font-bold text-slate-500 ml-1">
                            본부코드
                          </Label>
                          {/* ✨ [수정] value에 null이 들어가지 않도록 || "" 처리 */}
                          <Input
                            value={editForm?.code || ""}
                            onChange={(e) =>
                              setEditForm((prev) =>
                                prev ? { ...prev, code: e.target.value } : null,
                              )
                            }
                            className="h-10 bg-slate-50/50 border-slate-200 rounded-xl font-mono uppercase focus:bg-white"
                          />
                        </div>
                      </div>

                      <div className="flex justify-end gap-2 pt-1">
                        <Button
                          onClick={cancelEditing}
                          variant="ghost"
                          className="h-9 px-4 text-slate-400 font-bold text-[12px]"
                        >
                          취소
                        </Button>
                        <Button
                          onClick={saveEditing}
                          className="h-9 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[12px] rounded-xl shadow-md flex gap-2"
                        >
                          <Check className="h-4 w-4" /> 저장하기
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="relative">
                      <NavListItem
                        icon={Landmark}
                        title={unit.name || "(이름 없음)"}
                        subInfo={[
                          unit.code || "NO_CODE",
                          // ✨ [수정] order -> sort_order 변경
                          `순서: ${unit.sort_order ?? "-"}`,
                        ]}
                        isSelected={false}
                        onClick={() => {}}
                        className="bg-white hover:border-indigo-100 pr-12 transition-all"
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all scale-95 group-hover:scale-100">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-slate-400 hover:text-indigo-600"
                          onClick={() => startEditing(unit)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-slate-400 hover:text-red-500"
                          onClick={() => setDeleteTargetId(unit.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <DialogFooter className="p-6 pt-2 bg-white flex items-center justify-between sm:justify-between shrink-0">
            <Button
              variant="ghost"
              onClick={handleAddNew}
              disabled={editingId !== null} // editingId가 있으면(null이 아니면) 비활성
              className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 font-bold gap-2 pl-3 rounded-xl"
            >
              <Plus className="h-4 w-4" /> 새로운 본부 추가
            </Button>
            <Button
              onClick={() => onOpenChange(false)}
              className="bg-slate-900 hover:bg-slate-800 text-white px-8 rounded-xl font-bold shadow-lg transition-all active:scale-95"
            >
              닫기
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={deleteTargetId !== null} // null이 아니면 open
        onOpenChange={(open) => !open && setDeleteTargetId(null)}
        title="본부 삭제 확인"
        description="이 본부를 삭제하시겠습니까? 관련 데이터가 모두 삭제됩니다."
        onConfirm={handleDeleteConfirm}
      />
    </>
  );
}
