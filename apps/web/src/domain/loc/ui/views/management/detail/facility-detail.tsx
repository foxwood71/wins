"use client";

import React, { useState, useEffect } from "react";
import { Factory, Settings, MapPin, Trash2 } from "lucide-react";
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
import { Facility, FacilityCategory } from "@/loc/model/types";
import { FacilityCategoryDialog } from "@/loc/ui/dialogs/facility-category-dialog";

interface FacilityDetailProps {
  // 🟢 [핵심] 생성 시에는 id가 없으므로 Partial로 변경
  facility?: Partial<Facility>;

  // 모드 명시 ('create' | 'view' | 'edit')
  mode?: "create" | "view" | "edit";

  onEdit?: () => void;
  onSave: (data: Facility) => void;
  onCancel: () => void;
  onDelete?: () => void;

  facilityCategories?: FacilityCategory[];
  onUpdateFacilityCategories?: (cats: FacilityCategory[]) => void;
}

export function FacilityDetail({
  facility = {}, // 기본값 빈 객체
  mode = "view",
  onEdit,
  onSave,
  onCancel,
  onDelete,
  facilityCategories = [],
  onUpdateFacilityCategories = () => {},
}: FacilityDetailProps) {
  // 로컬 상태
  const [data, setData] = useState<Partial<Facility>>(facility);
  const [isCategoryManagerOpen, setIsCategoryManagerOpen] = useState(false);

  // 모드가 바뀌거나 데이터가 바뀌면 리셋
  useEffect(() => {
    setData(facility);
  }, [facility]);

  // 생성 모드이거나 편집 모드이면 수정 가능
  const isEditable = mode === "create" || mode === "edit";
  const isCreating = mode === "create";

  return (
    <>
      <DetailPanel
        icon={Factory}
        title={data.name || (isCreating ? "새 시설 등록" : "시설 정보")}
        subTitle={
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="font-mono text-slate-600">
                {data.code || "AUTO"}
              </Badge>
              {data.category_info && (
                <Badge
                  variant="secondary"
                  className="bg-slate-100 text-slate-700"
                >
                  {data.category_info.name}
                </Badge>
              )}
            </div>

            {/* 🟢 삭제 버튼은 '수정/조회' 모드일 때만 노출 */}
            {!isCreating && data.id && onDelete && (
              <Button
                variant="ghost"
                size="sm"
                className="h-7 w-7 p-0 text-slate-400 hover:text-red-600 hover:bg-red-50"
                onClick={(e) => {
                  e.stopPropagation();
                  if (confirm("시설을 삭제하시겠습니까?")) onDelete();
                }}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        }
        mode={isEditable ? "edit" : "view"}
        // 생성 모드일 때는 Edit 버튼 숨김 처리 등을 위해 onEdit을 비움
        onEdit={isCreating ? undefined : onEdit}
        onCancel={() => {
          setData(facility);
          onCancel();
        }}
        onSave={() => onSave(data as Facility)} // 저장 시에는 완전한 타입이라고 가정
      >
        <FormGrid>
          <FormSectionHeader title="기본 정보" icon={Settings} />
          <FormField label="시설 명칭 *">
            <Input
              value={data.name || ""}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              disabled={!isEditable}
              autoFocus={isCreating} // 생성 시 자동 포커스
            />
          </FormField>

          <FormField label="시설 코드 *">
            <Input
              value={data.code || ""}
              onChange={(e) => setData({ ...data, code: e.target.value })}
              disabled={!isEditable}
              placeholder="자동 생성 (입력 시 덮어쓰기)"
              className={cn(!isEditable && "bg-slate-100/50")}
            />
          </FormField>

          <FormField label="시설 분류">
            <FormSelectWithTool
              value={String(data.category_id || "")}
              options={facilityCategories.map((c) => ({
                label: c.name,
                value: String(c.id),
              }))}
              disabled={!isEditable}
              onValueChange={(val: string) => {
                const newId = Number(val);
                const info = facilityCategories.find((c) => c.id === newId);
                setData({ ...data, category_id: newId, category_info: info });
              }}
              showTool={isEditable}
              onToolClick={() => setIsCategoryManagerOpen(true)}
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

          <FormSectionHeader title="위치 및 상세" icon={MapPin} />
          <FormGrid className="grid-cols-1">
            <FormField label="주소">
              <Input
                value={data.address || ""}
                onChange={(e) => setData({ ...data, address: e.target.value })}
                disabled={!isEditable}
              />
            </FormField>
            <FormField label="설명">
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

      <FacilityCategoryDialog
        open={isCategoryManagerOpen}
        onOpenChange={setIsCategoryManagerOpen}
        categories={facilityCategories}
        onUpdate={onUpdateFacilityCategories}
      />
    </>
  );
}
