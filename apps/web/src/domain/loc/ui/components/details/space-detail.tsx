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

// 1. FacilityDetail
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
  facilityCategories = [],
  onUpdateFacilityCategories = () => {},
}: FacilityDetailProps) {
  const [data, setData] = useState<Facility>(facility);
  const [isCategoryManagerOpen, setIsCategoryManagerOpen] = useState(false);

  useEffect(() => {
    setData(facility);
  }, [facility]);

  const handleCategoryChange = (val: string) => {
    const newId = Number(val);
    const newInfo = facilityCategories.find((c) => c.id === newId);
    setData({ ...data, category_id: newId, category_info: newInfo });
  };

  return (
    <>
      <DetailPanel
        icon={Factory}
        title={data.name || "새 시설"}
        subTitle={
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="font-mono">
              {data.code || "NEW"}
            </Badge>
            {data.category_info && (
              <Badge variant="secondary">{data.category_info.name}</Badge>
            )}
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

          {/* ✨ [수정] 코드 입력 가능하도록 변경 */}
          <FormField label="시설 코드">
            <Input
              value={data.code || ""}
              onChange={(e) => setData({ ...data, code: e.target.value })}
              disabled={!isEditing}
              placeholder="코드 입력"
              className={cn(!isEditing && "bg-slate-100/50")}
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
              onValueChange={handleCategoryChange}
              showTool={isEditing}
              onToolClick={() => setIsCategoryManagerOpen(true)}
            />
          </FormField>

          <FormField label="운영 상태">
            <div
              className={`flex items-center justify-between h-9 px-3 rounded-md border ${!isEditing ? "bg-slate-50" : "bg-white"}`}
            >
              <span
                className={`text-sm font-medium ${data.is_active ? "text-emerald-600" : "text-slate-500"}`}
              >
                {data.is_active ? "운영 중 (Active)" : "중지됨 (Inactive)"}
              </span>
              {isEditing && (
                <Switch
                  checked={data.is_active}
                  onCheckedChange={(v) => setData({ ...data, is_active: v })}
                  className="data-[state=checked]:bg-emerald-500"
                />
              )}
            </div>
          </FormField>

          <FormSectionHeader title="위치 및 상세" icon={MapPin} />
          <FormField label="주소 / 위치" fullWidth>
            <Input
              value={data.address || ""}
              onChange={(e) => setData({ ...data, address: e.target.value })}
              disabled={!isEditing}
            />
          </FormField>
          <FormField label="설명 / 메모" fullWidth>
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

      <FacilityCategoryDialog
        open={isCategoryManagerOpen}
        onOpenChange={setIsCategoryManagerOpen}
        categories={facilityCategories}
        onUpdate={onUpdateFacilityCategories}
      />
    </>
  );
}

// 2. SpaceForm
interface SpaceFormProps {
  space: Space;
  ancestors: Space[];
  isEditing: boolean;
  onEdit: () => void;
  onSave: (data: Space) => void;
  onCancel: () => void;
  onDelete: () => void;
  spaceFunctions: SpaceFunction[];
  onUpdateFunctions: (funcs: SpaceFunction[]) => void;
  spaceTypes: SpaceType[];
  onUpdateTypes: (types: SpaceType[]) => void;
}

function SpaceForm({
  space,
  ancestors,
  isEditing,
  onEdit,
  onSave,
  onCancel,
  onDelete,
  spaceFunctions,
  onUpdateFunctions,
  spaceTypes,
  onUpdateTypes,
}: SpaceFormProps) {
  const [data, setData] = useState<Space>(space);
  const [isFuncManagerOpen, setIsFuncManagerOpen] = useState(false);
  const [isTypeManagerOpen, setIsTypeManagerOpen] = useState(false);

  useEffect(() => {
    setData(space);
  }, [space]);

  const handleTypeChange = (val: string) => {
    const newId = Number(val);
    const newInfo = spaceTypes.find((t) => t.id === newId);
    setData({ ...data, space_type_id: newId, type_info: newInfo });
  };

  const handleFunctionChange = (val: string) => {
    const newId = Number(val);
    const newInfo = spaceFunctions.find((f) => f.id === newId);
    setData({ ...data, space_function_id: newId, function_info: newInfo });
  };

  return (
    <>
      <DetailPanel
        icon={MapPin}
        title={data.name || "새 공간"}
        subTitle={
          <div className="flex items-center flex-wrap gap-2">
            <Badge variant="outline" className="font-mono">
              {data.code || "NEW"}
            </Badge>
            <span className="text-slate-300 h-3 border-l border-slate-300 mx-1"></span>
            {ancestors.map((anc) => (
              <React.Fragment key={anc.id}>
                <span
                  className={cn(
                    "text-xs",
                    anc.id === -9999
                      ? "text-slate-700 font-semibold"
                      : "text-slate-500",
                  )}
                >
                  {anc.name}
                </span>
                <ChevronRight className="h-3 w-3 text-slate-300" />
              </React.Fragment>
            ))}
            <span className="text-xs font-bold text-slate-700">
              {data.name}
            </span>
            {data.function_info && (
              <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 gap-1 ml-2">
                <Tag className="h-3 w-3" />
                {data.function_info.name}
              </Badge>
            )}
            {!isEditing && (
              <div className="flex items-center pl-3 border-l border-slate-200 h-4 ml-auto">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 hover:bg-red-50 hover:text-red-600 text-slate-400"
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
            <Input
              value={data.name || ""}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              disabled={!isEditing}
            />
          </FormField>

          {/* ✨ [수정] 코드 입력 가능하도록 변경 */}
          <FormField label="관리 코드">
            <Input
              value={data.code || ""}
              onChange={(e) => setData({ ...data, code: e.target.value })}
              disabled={!isEditing}
              placeholder="코드 입력"
              className={cn(
                !isEditing && "bg-slate-100/50 font-mono text-slate-500",
              )}
            />
          </FormField>

          <FormField label="운영 상태">
            <div
              className={`flex items-center justify-between h-9 px-3 rounded-md border ${!isEditing ? "bg-slate-50" : "bg-white"}`}
            >
              <span
                className={`text-sm font-medium ${data.is_active ? "text-emerald-600" : "text-slate-500"}`}
              >
                {data.is_active ? "운영 중 (Active)" : "중지됨 (Inactive)"}
              </span>
              {isEditing && (
                <Switch
                  checked={data.is_active}
                  onCheckedChange={(v) => setData({ ...data, is_active: v })}
                  className="data-[state=checked]:bg-emerald-500"
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
            disabled={!isEditing}
            onValueChange={(v) =>
              v === "none"
                ? setData({
                    ...data,
                    space_function_id: null,
                    function_info: undefined,
                  })
                : handleFunctionChange(v)
            }
            showTool={isEditing}
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
            disabled={!isEditing}
            onValueChange={(v) => {
              if (v === "none") {
                setData({ ...data, space_type_id: null, type_info: undefined });
              } else {
                handleTypeChange(v);
              }
            }}
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
                {data.is_restricted
                  ? "통제 구역 (Restricted)"
                  : "일반 구역 (Public)"}
              </span>
              {isEditing && (
                <Switch
                  checked={data.is_restricted}
                  onCheckedChange={(v) =>
                    setData({ ...data, is_restricted: v })
                  }
                  className="data-[state=checked]:bg-rose-500"
                />
              )}
            </div>
          </FormField>

          <FormField label="설명 / 메모" fullWidth>
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

// 3. SpaceDetail
interface SpaceDetailProps {
  space: Space;
  facility: Facility | null;
  ancestors?: Space[];
  hasChildren?: boolean;
  isEditing: boolean;
  onEdit: () => void;
  onSave: (data: Facility | Space) => void;
  onCancel: () => void;
  onDelete: () => void;
  spaceFunctions?: SpaceFunction[];
  onUpdateFunctions: (funcs: SpaceFunction[]) => void;
  spaceTypes?: SpaceType[];
  onUpdateTypes: (types: SpaceType[]) => void;
  facilityCategories?: FacilityCategory[];
  onUpdateFacilityCategories?: (cats: FacilityCategory[]) => void;
}

export function SpaceDetail(props: SpaceDetailProps) {
  if (props.facility) {
    return (
      <FacilityDetail
        facility={props.facility}
        isEditing={props.isEditing}
        onEdit={props.onEdit}
        onCancel={props.onCancel}
        onSave={props.onSave as (data: Facility) => void}
        onDelete={props.onDelete}
        facilityCategories={props.facilityCategories}
        onUpdateFacilityCategories={props.onUpdateFacilityCategories}
      />
    );
  }
  return (
    <SpaceForm
      space={props.space}
      ancestors={props.ancestors || []}
      isEditing={props.isEditing}
      onEdit={props.onEdit}
      onSave={props.onSave as (data: Space) => void}
      onCancel={props.onCancel}
      onDelete={props.onDelete}
      spaceFunctions={props.spaceFunctions || []}
      onUpdateFunctions={props.onUpdateFunctions}
      spaceTypes={props.spaceTypes || []}
      onUpdateTypes={props.onUpdateTypes}
    />
  );
}
