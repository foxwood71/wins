"use client";

import { useState, useEffect } from "react";
import {
  Plus,
  Trash2,
  Edit2,
  Check,
  X,
  Tag,
  GripVertical,
  Save,
  Ban,
} from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/shared/components/ui/dialog";
import { Badge } from "@/shared/components/ui/badge";
import { cn } from "@/shared/lib/utils";
import { SpaceFunction } from "@/loc/model/types";

interface FunctionManagerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  functions: SpaceFunction[];
  onUpdate: (newFunctions: SpaceFunction[]) => void;
}

const MAX_CODE_LEN = 20;
const MAX_NAME_LEN = 30;

export function FunctionManagerDialog({
  open,
  onOpenChange,
  functions: initialFunctions,
  onUpdate,
}: FunctionManagerDialogProps) {
  const [tempFunctions, setTempFunctions] =
    useState<SpaceFunction[]>(initialFunctions);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [editCode, setEditCode] = useState("");
  const [newName, setNewName] = useState("");
  const [newCode, setNewCode] = useState("");

  const isCodeError = (code: string) => code.length > MAX_CODE_LEN;
  const isNameError = (name: string) => name.length > MAX_NAME_LEN;

  useEffect(() => {
    if (open) {
      setTempFunctions(initialFunctions);
    } else {
      setEditingId(null);
      setNewName("");
      setNewCode("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const handleDelete = (id: number) => {
    setTempFunctions(tempFunctions.filter((f) => f.id !== id));
  };

  const startEdit = (f: SpaceFunction) => {
    setEditingId(f.id);
    setEditName(f.name);
    setEditCode(f.code);
  };

  const saveEdit = () => {
    if (!editName.trim() || !editCode.trim())
      return alert("코드와 명칭은 필수입니다.");
    if (isCodeError(editCode) || isNameError(editName))
      return alert("입력 길이를 확인해주세요.");

    setTempFunctions(
      tempFunctions.map((f) =>
        f.id === editingId ? { ...f, name: editName, code: editCode } : f,
      ),
    );
    setEditingId(null);
  };

  const handleAdd = () => {
    if (!newName.trim() || !newCode.trim())
      return alert("코드와 명칭은 필수입니다.");
    if (isCodeError(newCode) || isNameError(newName))
      return alert("입력 길이를 확인해주세요.");

    const currentIds = tempFunctions.map((f) => f.id);
    const newId = currentIds.length > 0 ? Math.max(...currentIds) + 1 : 1;

    const newFunction: SpaceFunction = {
      id: newId,
      name: newName,
      code: newCode.trim(),
      description: "",
      is_active: true,
    };

    setTempFunctions([...tempFunctions, newFunction]);
    setNewName("");
    setNewCode("");
  };

  const handleFinalSave = () => {
    onUpdate(tempFunctions);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl p-0 overflow-hidden gap-0">
        <DialogHeader className="px-5 py-3 border-b bg-white">
          <DialogTitle className="flex items-center gap-2 text-base">
            <div className="flex items-center justify-center h-7 w-7 rounded-md bg-indigo-50 text-indigo-600">
              <Tag className="h-3.5 w-3.5" />
            </div>
            공간 기능(용도) 관리
          </DialogTitle>
        </DialogHeader>

        <div className="flex items-center px-6 py-2 bg-slate-100/50 border-b text-xs font-medium text-slate-500">
          <span className="w-10 text-center">ID</span>
          <span className="w-28 ml-6">코드</span>
          <span className="flex-1 ml-3">기능 명칭</span>
          <span className="w-16 text-center">관리</span>
        </div>

        <div className="bg-slate-50 p-4 h-[400px] overflow-y-auto">
          <div className="space-y-1.5">
            {tempFunctions.map((f) => (
              <div
                key={f.id}
                className={`
                  group flex items-start p-2 rounded-lg border transition-all duration-200
                  ${
                    editingId === f.id
                      ? "bg-indigo-50 border-indigo-200 shadow-inner"
                      : "bg-white border-slate-200 shadow-sm hover:border-indigo-300"
                  }
                `}
              >
                <div className="flex items-center gap-2 w-14 shrink-0 mt-1.5">
                  <GripVertical className="h-3.5 w-3.5 text-slate-300" />
                  <Badge
                    variant="secondary"
                    className="font-mono text-[10px] px-1.5 py-0 h-5 bg-slate-100 text-slate-500 hover:bg-slate-200"
                  >
                    #{f.id}
                  </Badge>
                </div>

                {editingId === f.id ? (
                  <>
                    <div className="flex flex-col gap-1 mx-2">
                      <Input
                        value={editCode}
                        onChange={(e) =>
                          setEditCode(e.target.value.toUpperCase())
                        }
                        className={cn(
                          "h-7 w-28 text-xs font-mono bg-white uppercase ime-mode-disabled",
                          isCodeError(editCode) &&
                            "border-red-500 focus-visible:ring-red-500",
                        )}
                        placeholder="CODE"
                      />
                      {isCodeError(editCode) && (
                        <span className="text-[10px] text-red-500 leading-none">
                          최대 {MAX_CODE_LEN}자
                        </span>
                      )}
                    </div>

                    <div className="flex-1 flex flex-col gap-1">
                      <Input
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className={cn(
                          "h-7 text-xs bg-white",
                          isNameError(editName) &&
                            "border-red-500 focus-visible:ring-red-500",
                        )}
                        autoFocus
                        onKeyDown={(e) => e.key === "Enter" && saveEdit()}
                      />
                      {isNameError(editName) && (
                        <span className="text-[10px] text-red-500 leading-none">
                          최대 {MAX_NAME_LEN}자
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1 ml-2 mt-0.5">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={saveEdit}
                        disabled={
                          isCodeError(editCode) || isNameError(editName)
                        }
                        className="h-7 w-7 text-green-600 hover:bg-green-50 rounded-full disabled:opacity-30"
                        title="수정 반영"
                      >
                        <Check className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => setEditingId(null)}
                        className="h-7 w-7 text-slate-400 hover:bg-slate-100 rounded-full"
                        title="수정 취소"
                      >
                        <X className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-28 mx-2 mt-0.5">
                      <Badge
                        variant="outline"
                        className="w-full justify-center font-mono text-[10px] text-slate-600 bg-slate-50 h-6 border-slate-300"
                      >
                        {f.code}
                      </Badge>
                    </div>

                    <div className="flex-1 font-medium text-slate-700 text-sm truncate pl-1 mt-1">
                      {f.name}
                    </div>

                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity mt-0.5">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => startEdit(f)}
                        className="h-7 w-7 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-full"
                        title="수정"
                      >
                        <Edit2 className="h-3 w-3" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleDelete(f.id)}
                        className="h-7 w-7 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-full"
                        title="삭제"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </>
                )}
              </div>
            ))}

            {tempFunctions.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-slate-400 text-xs gap-2 pb-10">
                <Tag className="h-8 w-8 text-slate-200" />
                <span>데이터가 없습니다. 아래에서 추가해주세요.</span>
              </div>
            )}
          </div>
        </div>

        <div className="p-3 bg-white border-t">
          <div className="flex items-start gap-2 pl-2">
            <div className="flex flex-col gap-1">
              <Input
                placeholder="CODE"
                value={newCode}
                onChange={(e) => setNewCode(e.target.value.toUpperCase())}
                className={cn(
                  "h-8 w-28 text-xs font-mono bg-slate-50 focus-visible:ring-indigo-500 uppercase",
                  isCodeError(newCode) &&
                    "border-red-500 ring-1 ring-red-500 bg-red-50",
                )}
              />
              {isCodeError(newCode) && (
                <span className="text-[10px] text-red-500 pl-1">
                  최대 {MAX_CODE_LEN}자
                </span>
              )}
            </div>

            <div className="relative flex-1 flex flex-col gap-1">
              <Input
                placeholder="새 기능 명칭 (예: 서버실)"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAdd()}
                className={cn(
                  "h-8 text-xs bg-slate-50 focus-visible:ring-indigo-500",
                  isNameError(newName) &&
                    "border-red-500 ring-1 ring-red-500 bg-red-50",
                )}
              />
              {isNameError(newName) && (
                <span className="text-[10px] text-red-500 pl-1">
                  최대 {MAX_NAME_LEN}자
                </span>
              )}
            </div>

            <Button
              onClick={handleAdd}
              disabled={
                !newName.trim() ||
                !newCode.trim() ||
                isCodeError(newCode) ||
                isNameError(newName)
              }
              size="icon"
              className="h-8 w-8 bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm rounded-md shrink-0"
              title="목록에 추가"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* ✨ [하단 버튼] 취소(Rose) 강조 + 저장(Indigo) */}
        <DialogFooter className="p-3 border-t bg-slate-50 sm:justify-end gap-3">
          <Button
            // ✨ 취소: 붉은색(Rose) 강조 (Destructive 느낌)
            className="bg-slate-400 hover:bg-slate-700 text-white w-20 border-0"
            onClick={() => onOpenChange(false)}
          >
            <Ban className="h-3.5 w-3.5 mr-1.5" />
            취소
          </Button>
          <Button
            // ✨ 저장: 기존 Indigo 유지
            onClick={handleFinalSave}
            className="bg-indigo-400 hover:bg-indigo-700 text-white w-20"
          >
            <Save className="h-4 w-4 mr-1.5" />
            저장
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
