"use client";

import React from "react";
import { Info, Tag, Settings } from "lucide-react";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import {
  FormGrid,
  FormField,
  FormSectionHeader,
  FormSelect,
} from "@/shared/components/layout/app-content";
import { Equipment } from "../../model/types"; // 업데이트된 타입 임포트

interface BasicInfoProps {
  data: Equipment;
  isEditing: boolean;
}

export function BasicInfo({ data, isEditing }: BasicInfoProps) {
  const displayImage =
    data.images && data.images.length > 0 ? data.images[0] : "/no-image.png";

  return (
    <div className="flex gap-6 h-full overflow-hidden pt-2 pr-2">
      {/* 좌측 폼 영역 */}
      <div className="flex-1 flex flex-col gap-5 h-full">
        {/* 1. 기본 식별 및 운영 정보 */}
        <div className="shrink-0 space-y-3">
          <FormSectionHeader title="기본 식별 정보" icon={Tag} />
          <FormGrid className="gap-y-3">
            {/* Row 1: 시스템 코드 | 관리 번호 | 카테고리 (3 Cols) */}
            <div className="col-span-2 grid grid-cols-3 gap-4">
              <FormField label="시스템 코드">
                <Input
                  defaultValue={data.code}
                  disabled={true}
                  className="h-8 rounded bg-slate-50 text-slate-500 font-mono text-[12px]"
                />
              </FormField>
              <FormField label="관리 번호">
                <Input
                  defaultValue={data.managementCode}
                  disabled={!isEditing}
                  className="h-8 rounded  bg-slate-50 text-slate-700 text-[12px]"
                />
              </FormField>
              <FormField label="카테고리">
                <Input
                  defaultValue={data.category}
                  disabled={!isEditing}
                  className="h-8 rounded text-[13px]"
                />
              </FormField>
            </div>

            {/* Row 2: 설비명 | 모델번호 | 내용연수 (3 Cols) */}
            <div className="col-span-2 grid grid-cols-3 gap-4">
              <FormField label="설비명">
                <Input
                  defaultValue={data.name}
                  disabled={!isEditing}
                  className="h-8 rounded text-[13px]"
                />
              </FormField>
              <FormField label="모델번호">
                <Input
                  defaultValue={data.model}
                  disabled={!isEditing}
                  className="h-8 rounded text-[13px]"
                />
              </FormField>
              <FormField label="내용연수">
                <Input
                  defaultValue={data.usefulLife}
                  disabled={!isEditing}
                  className="h-8 rounded text-[13px]"
                />
              </FormField>
            </div>

            {/* Row 3: 관리부서 | 시설명 | 설치위치 | 가동상태 (4 Cols) */}
            <div className="col-span-2 grid grid-cols-4 gap-4">
              <FormField label="관리부서">
                <Input
                  defaultValue={data.department} // ✨ 이제 data.department 바로 사용 가능
                  disabled={!isEditing}
                  className="h-8 rounded text-[13px]"
                />
              </FormField>
              <FormField label="시설명">
                <Input
                  defaultValue={data.facilityName}
                  disabled={!isEditing}
                  className="h-8 rounded text-[13px]"
                />
              </FormField>
              <FormField label="설치위치">
                <Input
                  defaultValue={data.location}
                  disabled={!isEditing}
                  className="h-8 rounded text-[13px]"
                />
              </FormField>
              <FormSelect
                label="가동 상태"
                value={data.status}
                options={[
                  { label: "가동중", value: "Active" },
                  { label: "유휴", value: "Inactive" },
                  { label: "점검중", value: "Maintenance" },
                  { label: "폐기", value: "Disposed" },
                ]}
                disabled={!isEditing}
                className="h-8 rounded text-[13px]"
                onValueChange={() => {}}
              />
            </div>
          </FormGrid>
        </div>

        {/* 2. 주요 사양 정보 (Spec Only - 1줄 유지) */}
        <div className="shrink-0 space-y-3">
          <FormSectionHeader title="주요 사양 정보" icon={Settings} />
          <div className="grid grid-cols-4 gap-4">
            <FormField label="제조사">
              <Input
                defaultValue={data.manufacturer}
                disabled={!isEditing}
                className="h-8 rounded text-[12px]"
              />
            </FormField>
            <FormField label="규격/형식">
              <Input
                defaultValue={data.specType}
                disabled={!isEditing}
                className="h-8 rounded text-[12px]"
              />
            </FormField>
            <FormField label="전원사양">
              <Input
                defaultValue={data.power}
                disabled={!isEditing}
                className="h-8 rounded text-[12px]"
              />
            </FormField>
            <FormField label="용량">
              <Input
                defaultValue={data.capacity}
                disabled={!isEditing}
                className="h-8 rounded text-[12px]"
              />
            </FormField>
          </div>
        </div>

        {/* 3. 비고 및 특이사항 (자동 높이 조절) */}
        <div className="flex-1 flex flex-col gap-2 min-h-0">
          <FormSectionHeader title="비고 및 특이사항" icon={Info} />
          <Textarea
            defaultValue={data.description}
            disabled={!isEditing}
            className="flex-1 resize-none rounded-lg text-[13px] leading-relaxed p-3 h-full"
            placeholder="비고 내용을 입력해 주세요."
          />
        </div>
      </div>

      {/* 우측 이미지 영역 (생략 가능, 기존 로직 유지) */}
      <div className="w-80 shrink-0 h-full">
        <div className="rounded-xl border border-slate-200 overflow-hidden bg-white shadow-sm h-full flex flex-col">
          <div className="bg-slate-50 border-b border-slate-100 p-3 shrink-0">
            <p className="text-[12px] font-bold text-slate-700">대표 이미지</p>
          </div>
          <div className="flex-1 bg-slate-100 flex items-center justify-center relative overflow-hidden group">
            <img
              src={displayImage}
              alt="Equipment"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div className="p-3 bg-white border-t border-slate-100 shrink-0">
            <p className="text-[11px] text-slate-400">
              이미지 관리 ({data.images.length}장)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
