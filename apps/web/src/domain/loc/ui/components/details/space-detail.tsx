"use client";

import React, { useState, useEffect } from "react";
import {
  Factory,
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
import {
  Facility,
  Space,
  SpaceFunction,
  SpaceType,
  FacilityCategory,
} from "@loc/model/types";
import { FunctionManagerDialog } from "@loc/ui/dialogs/function-manager-dialog";
import { TypeManagerDialog } from "@loc/ui/dialogs/type-manager-dialog";
import { FacilityCategoryDialog } from "@loc/ui/dialogs/facility-category-dialog";

// ----------------------------------------------------------------------------
// 1. FacilityDetail (시설 상세)
// ----------------------------------------------------------------------------
interface FacilityDetailProps {
  facility: Facility;
  isEditing: boolean;
  onEdit: () => void;
  onSave: (data: Facility) => void;
  onCancel: () => void;
  onDelete: () => void;
  facilityCategories?: FacilityCategory[];
  onUpdateFacilityCategories?: (cats: FacilityCategory[]) => void;
}

export function FacilityDetail({
  facility,
  isEditing,
  onEdit,
  onSave,
  onCancel,
  onDelete,
  facilityCategories = [],
  onUpdateFacilityCategories = () => {},
}: FacilityDetailProps) {
  const [data, setData] = useState<Facility>(facility);
  const [isCategoryManagerOpen, setIsCategoryManagerOpen] = useState(false);

  useEffect(() => {
    setData(facility);
  }, [facility]);

  return (
    <>
      <DetailPanel
        icon={Factory}
        title={facility.name}
        subTitle={
          <div className="flex items-center gap-2">
            <Badge variant="outline">{facility.code || ""}</Badge>
          </div>
        }
        mode={isEditing ? "edit" : "view"}
        onEdit={onEdit}
        onCancel={onCancel}
        onSave={() => onSave(data)}
      >
        <FormGrid>
          <FormSectionHeader title="기본 정보" icon={Settings} />
          <FormField label="시설 명칭">
            <Input
              value={data.name || ""}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              disabled={!isEditing}
            />
          </FormField>
          <FormField label="시설 분류">
            <FormSelectWithTool
              value={String(data.category_id || "")}
              options={facilityCategories.map((c) => ({
                label: c.name,
                value: String(c.id),
              }))}
              disabled={!isEditing}
              onValueChange={(v) =>
                setData({ ...data, category_id: Number(v) })
              }
              showTool={isEditing}
              onToolClick={() => setIsCategoryManagerOpen(true)}
            />
          </FormField>
          <FormField label="설명 / 메모" fullWidth>
            <Textarea
              value={data.description || ""}
              onChange={(e) =>
                setData({ ...data, description: e.target.value })
              }
              disabled={!isEditing}
            />
          </FormField>
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

// ----------------------------------------------------------------------------
// 2. SpaceDetail (공간 상세)
// ----------------------------------------------------------------------------
interface SpaceDetailProps {
  space: Space;
  facility: Facility | null;
  ancestors: Space[];
  hasChildren: boolean;
  isEditing: boolean;
  onEdit: () => void;
  onSave: (data: any) => void;
  onCancel: () => void;
  onDelete: () => void;
  spaceFunctions: SpaceFunction[];
  onUpdateFunctions: (funcs: SpaceFunction[]) => void;
  spaceTypes: SpaceType[];
  onUpdateTypes: (types: SpaceType[]) => void;
  facilityCategories?: FacilityCategory[];
  onUpdateFacilityCategories?: (cats: FacilityCategory[]) => void;
}

export function SpaceDetail({
  space,
  facility,
  ancestors,
  hasChildren,
  isEditing,
  onEdit,
  onSave,
  onCancel,
  onDelete,
  spaceFunctions = [],
  onUpdateFunctions,
  spaceTypes = [],
  onUpdateTypes,
  facilityCategories = [],
  onUpdateFacilityCategories,
}: SpaceDetailProps) {
  if (facility) {
    return (
      <FacilityDetail
        facility={facility}
        isEditing={isEditing}
        onEdit={onEdit}
        onCancel={onCancel}
        onSave={onSave}
        onDelete={onDelete}
        facilityCategories={facilityCategories}
        onUpdateFacilityCategories={onUpdateFacilityCategories}
      />
    );
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [data, setData] = useState<Space>(space);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isFuncManagerOpen, setIsFuncManagerOpen] = useState(false);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isTypeManagerOpen, setIsTypeManagerOpen] = useState(false);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    setData(space);
  }, [space]);

  const functionName = spaceFunctions.find(
    (f) => f.id === data.space_function_id,
  )?.name;

  return (
    <>
      <DetailPanel
        icon={MapPin}
        title={space.name}
        subTitle={
          <div className="flex items-center flex-wrap gap-2">
            <Badge
              variant="outline"
              className="bg-slate-50 text-slate-700 border-slate-300 font-mono font-medium"
            >
              {space.code || `SP-${space.id}`}
            </Badge>
            <span className="text-slate-300 h-3 border-l border-slate-300 mx-1"></span>
            <div className="flex items-center flex-wrap gap-1">
              {ancestors.map((anc) => (
                <React.Fragment key={anc.id}>
                  <Badge
                    variant="outline"
                    className="bg-white text-slate-600 border-slate-200"
                  >
                    {anc.name}
                  </Badge>
                  <ChevronRight className="h-3 w-3 text-slate-300" />
                </React.Fragment>
              ))}
              <Badge
                variant="secondary"
                className="bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border-indigo-200"
              >
                {space.name}
              </Badge>
            </div>
            {functionName && (
              <>
                <span className="text-slate-300 h-3 border-l border-slate-300 mx-1"></span>
                <Badge className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border-emerald-200 gap-1 pl-1.5">
                  <Tag className="h-3 w-3" />
                  {functionName}
                </Badge>
              </>
            )}
            {!isEditing && (
              <div className="flex items-center pl-3 border-l border-slate-200 h-4 ml-auto">
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "h-6 w-6 p-0 hover:bg-red-50 hover:text-red-600",
                    hasChildren
                      ? "text-slate-300 cursor-not-allowed"
                      : "text-slate-400",
                  )}
                  disabled={hasChildren}
                  title={
                    hasChildren ? "하위 공간이 있어 삭제 불가" : "공간 삭제"
                  }
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete();
                  }}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            )}
          </div>
        }
        mode={isEditing ? "edit" : "view"}
        onEdit={onEdit}
        onCancel={onCancel}
        onSave={() => onSave(data)}
      >
        <FormGrid>
          <FormSectionHeader title="공간 정보" icon={Settings} />
          <FormField label="명칭">
            {/* ✨ [수정] || "" 추가 */}
            <Input
              value={data.name || ""}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              disabled={!isEditing}
            />
          </FormField>
          <FormField label="관리 코드">
            <Input
              value={data.code || ""}
              disabled
              className="bg-slate-100/50 font-mono text-slate-500"
            />
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
            disabled={!isEditing}
            onValueChange={(v) =>
              setData({ ...data, space_function_id: Number(v) })
            }
            showTool={isEditing}
            onToolClick={() => setIsFuncManagerOpen(true)}
          />

          <FormSectionHeader title="물리적 속성" icon={Maximize} />

          <FormSelectWithTool
            label="유형"
            value={String(data.space_type_id)}
            options={spaceTypes.map((t) => ({
              label: t.name,
              value: String(t.id),
            }))}
            disabled={!isEditing}
            onValueChange={(v) =>
              setData({ ...data, space_type_id: Number(v) })
            }
            showTool={isEditing}
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
                disabled={!isEditing}
                className="pr-8"
              />
              <span className="absolute right-3 top-2.5 text-xs text-slate-400">
                m²
              </span>
            </div>
          </FormField>

          <FormField label="통제 구역">
            <div
              className={`flex items-center justify-between h-9 px-3 rounded-md border ${!isEditing ? "bg-slate-50" : "bg-white"}`}
            >
              <span className="text-sm text-slate-600">
                {data.is_restricted ? "통제 구역" : "일반 구역"}
              </span>
              {isEditing && (
                <Switch
                  checked={data.is_restricted}
                  onCheckedChange={(v) =>
                    setData({ ...data, is_restricted: v })
                  }
                />
              )}
            </div>
          </FormField>

          <FormField label="설명 / 메모" fullWidth>
            {/* ✨ [수정] || "" 추가 */}
            <Textarea
              value={data.description || ""}
              onChange={(e) =>
                setData({ ...data, description: e.target.value })
              }
              disabled={!isEditing}
              className="resize-none min-h-[80px]"
            />
          </FormField>
        </FormGrid>
      </DetailPanel>

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
