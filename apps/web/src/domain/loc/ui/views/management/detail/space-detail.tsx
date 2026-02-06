"use client";

import React, { useState, useEffect } from "react";
import {
  MapPin,
  Settings,
  Maximize,
  Trash2,
  ChevronRight,
  Tag,
} from "lucide-react";
import {
  DetailPanel,
  FormGrid,
  FormField,
  FormSectionHeader,
  FormSelectWithTool,
} from "@/shared/components/layout/app-content";
import { Input } from "@/shared/components/ui/input";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Textarea } from "@/shared/components/ui/textarea";
import { Switch } from "@/shared/components/ui/switch";
import { cn } from "@/shared/lib/utils";
import { Space, SpaceFunction, SpaceType } from "@/loc/model/types";
import { FunctionManagerDialog } from "@/loc/ui/dialogs/function-manager-dialog";
import { TypeManagerDialog } from "@/loc/ui/dialogs/type-manager-dialog";

interface SpaceDetailProps {
  // 🟢 [핵심] Partial 적용
  space?: Partial<Space>;
  ancestors?: Space[]; // 생성 시에는 부모 목록만 들어옴

  mode?: "create" | "view" | "edit";

  onEdit?: () => void;
  onSave: (data: Space) => void;
  onCancel: () => void;
  onDelete?: () => void;

  spaceFunctions?: SpaceFunction[];
  onUpdateFunctions: (funcs: SpaceFunction[]) => void;
  spaceTypes?: SpaceType[];
  onUpdateTypes: (types: SpaceType[]) => void;
}

export function SpaceDetail({
  space = {},
  ancestors = [],
  mode = "view",
  onEdit,
  onSave,
  onCancel,
  onDelete,
  spaceFunctions = [],
  onUpdateFunctions,
  spaceTypes = [],
  onUpdateTypes,
}: SpaceDetailProps) {
  const [data, setData] = useState<Partial<Space>>(space);
  const [isFuncManagerOpen, setIsFuncManagerOpen] = useState(false);
  const [isTypeManagerOpen, setIsTypeManagerOpen] = useState(false);

  useEffect(() => {
    setData(space);
  }, [space]);

  const isEditable = mode === "create" || mode === "edit";
  const isCreating = mode === "create";

  return (
    <>
      <DetailPanel
        icon={MapPin}
        title={data.name || (isCreating ? "새 공간 등록" : "공간 정보")}
        subTitle={
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center flex-wrap gap-2 text-sm">
              <Badge variant="outline" className="font-mono text-slate-600">
                {data.code || "AUTO"}
              </Badge>
              <span className="text-slate-300 h-3 border-l border-slate-300 mx-1"></span>
              {ancestors.map((anc, index) => (
                <div key={anc.id} className="flex items-center">
                  <span
                    className={cn(
                      "text-xs hover:underline cursor-default",
                      index === 0
                        ? "text-slate-700 font-medium"
                        : "text-slate-500",
                    )}
                  >
                    {anc.name}
                  </span>
                  <ChevronRight className="h-3 w-3 text-slate-300 mx-1" />
                </div>
              ))}
              {data.function_info && (
                <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 gap-1 ml-1">
                  <Tag className="h-3 w-3" />
                  {data.function_info.name}
                </Badge>
              )}
            </div>

            {!isCreating && data.id && onDelete && (
              <Button
                variant="ghost"
                size="sm"
                className="h-7 w-7 p-0 text-slate-400 hover:text-red-600 hover:bg-red-50 ml-2"
                onClick={(e) => {
                  e.stopPropagation();
                  if (confirm("정말 이 공간을 삭제하시겠습니까?")) onDelete();
                }}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        }
        mode={isEditable ? "edit" : "view"}
        onEdit={isCreating ? undefined : onEdit}
        onCancel={() => {
          setData(space);
          onCancel();
        }}
        onSave={() => onSave(data as Space)}
      >
        <FormGrid>
          <FormSectionHeader title="공간 정보" icon={Settings} />
          <FormField label="명칭 *">
            <Input
              value={data.name || ""}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              disabled={!isEditable}
              autoFocus={isCreating}
            />
          </FormField>

          <FormField label="관리 코드 *">
            <Input
              value={data.code || ""}
              onChange={(e) => setData({ ...data, code: e.target.value })}
              disabled={!isEditable}
              placeholder="자동 생성"
              className={cn(!isEditable && "bg-slate-100/50 font-mono")}
            />
          </FormField>

          <FormField label="운영 상태">
            <div
              className={`flex items-center justify-between h-9 px-3 rounded-md border ${!isEditable ? "bg-slate-50" : "bg-white"}`}
            >
              <span
                className={`text-sm font-medium ${data.is_active ? "text-emerald-600" : "text-slate-500"}`}
              >
                {data.is_active ? "운영 중" : "중지됨"}
              </span>
              {isEditable && (
                <Switch
                  checked={!!data.is_active}
                  onCheckedChange={(v) => setData({ ...data, is_active: v })}
                />
              )}
            </div>
          </FormField>

          <FormSelectWithTool
            label="기능 역할"
            value={String(data.space_function_id || "none")}
            options={[
              { label: "선택 안함", value: "none" },
              ...spaceFunctions.map((f) => ({
                label: f.name,
                value: String(f.id),
              })),
            ]}
            disabled={!isEditable}
            onValueChange={(v) => {
              if (v === "none")
                setData({
                  ...data,
                  space_function_id: null,
                  function_info: undefined,
                });
              else {
                const newId = Number(v);
                const info = spaceFunctions.find((f) => f.id === newId);
                setData({
                  ...data,
                  space_function_id: newId,
                  function_info: info,
                });
              }
            }}
            showTool={isEditable}
            onToolClick={() => setIsFuncManagerOpen(true)}
          />

          <FormSectionHeader title="상세 속성" icon={Maximize} />
          <FormSelectWithTool
            label="공간 유형"
            value={String(data.space_type_id || "none")}
            options={[
              { label: "선택 안함", value: "none" },
              ...spaceTypes.map((t) => ({
                label: t.name,
                value: String(t.id),
              })),
            ]}
            disabled={!isEditable}
            onValueChange={(v) => {
              if (v === "none")
                setData({ ...data, space_type_id: null, type_info: undefined });
              else {
                const newId = Number(v);
                const info = spaceTypes.find((t) => t.id === newId);
                setData({ ...data, space_type_id: newId, type_info: info });
              }
            }}
            showTool={isEditable}
            onToolClick={() => setIsTypeManagerOpen(true)}
          />

          <FormField label="면적 (m²)">
            <div className="relative">
              <Input
                type="number"
                value={data.area_size || 0}
                onChange={(e) =>
                  setData({ ...data, area_size: Number(e.target.value) })
                }
                disabled={!isEditable}
                className="pr-8"
              />
              <span className="absolute right-3 top-2.5 text-xs text-slate-400">
                m²
              </span>
            </div>
          </FormField>

          <FormField label="통제 구역">
            <div
              className={`flex items-center justify-between h-9 px-3 rounded-md border ${!isEditable ? "bg-slate-50" : "bg-white"}`}
            >
              <span className="text-sm text-slate-600">
                {data.is_restricted ? "통제 구역" : "일반 구역"}
              </span>
              {isEditable && (
                <Switch
                  checked={!!data.is_restricted}
                  onCheckedChange={(v) =>
                    setData({ ...data, is_restricted: v })
                  }
                  className="data-[state=checked]:bg-rose-500"
                />
              )}
            </div>
          </FormField>

          <FormGrid className="grid-cols-1">
            <FormField label="설명 / 메모">
              <Textarea
                value={data.description || ""}
                onChange={(e) =>
                  setData({ ...data, description: e.target.value })
                }
                disabled={!isEditable}
                className="resize-none min-h-[80px]"
              />
            </FormField>
          </FormGrid>
        </FormGrid>
      </DetailPanel>

      {/* Dialogs... */}
      <FunctionManagerDialog
        open={isFuncManagerOpen}
        onOpenChange={setIsFuncManagerOpen}
        functions={spaceFunctions}
        onUpdate={onUpdateFunctions}
      />
      <TypeManagerDialog
        open={isTypeManagerOpen}
        onOpenChange={setIsTypeManagerOpen}
        types={spaceTypes}
        onUpdate={onUpdateTypes}
      />
    </>
  );
}
