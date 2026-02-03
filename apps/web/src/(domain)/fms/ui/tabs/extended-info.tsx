"use client";

import React from "react";
import { Wallet, Factory } from "lucide-react";
import { Input } from "@/shared/components/ui/input";
import {
  FormGrid,
  FormField,
  FormSectionHeader,
} from "@/shared/components/layout/app-content";
import type { Equipment } from "../../model/types";

interface ExtendedInfoProps {
  data: Equipment;
  isEditing: boolean;
}

export function ExtendedInfo({ data, isEditing }: ExtendedInfoProps) {
  return (
    <div className="h-full overflow-hidden pt-2">
      <div className="flex flex-col gap-8">
        {/* [상단] 자산 및 가치 정보 */}
        <div className="space-y-4">
          <FormSectionHeader title="자산 및 가치 정보" icon={Wallet} />

          <FormGrid className="grid-cols-4 gap-4">
            <FormField label="취득 구분">
              <Input
                defaultValue="구매 (Purchase)" // 필요한 경우 types에 추가 가능
                disabled={!isEditing}
                className="h-8 rounded text-[12px]"
              />
            </FormField>
            <FormField label="취득처">
              <Input
                defaultValue={data.supplier} // ✨ supplier 필드 사용
                disabled={!isEditing}
                className="h-8 rounded text-[12px]"
              />
            </FormField>
            <FormField label="내구연한">
              <Input
                defaultValue={data.usefulLife} // ✨ usefulLife 필드 사용
                disabled={!isEditing}
                className="h-8 rounded text-[12px]"
              />
            </FormField>
            <div className="hidden md:block" />

            {/* 금액 정보 */}
            <FormField label="취득가액 (Acquisition Price)">
              <div className="relative">
                <Input
                  defaultValue={data.acquisitionPrice}
                  disabled={!isEditing}
                  className="h-8 rounded text-right pr-6 font-mono text-[13px] text-slate-700 font-medium"
                />
                <span className="absolute right-2 top-2 text-[10px] text-slate-400">
                  원
                </span>
              </div>
            </FormField>

            <FormField label="현재가치 (Book Value)">
              <div className="relative">
                <Input
                  defaultValue="계산된 값" // DB 로직 혹은 프론트 계산값
                  disabled={true}
                  className="h-8 rounded text-right pr-6 font-mono font-bold text-indigo-600 bg-indigo-50/50 text-[13px]"
                />
                <span className="absolute right-2 top-2 text-[10px] text-indigo-400">
                  원
                </span>
              </div>
            </FormField>
          </FormGrid>
        </div>

        {/* 구분선 */}
        <div className="border-t border-slate-100" />

        {/* [하단] 제조 및 설치 이력 */}
        <div className="space-y-4">
          <FormSectionHeader title="제조 및 설치 이력" icon={Factory} />

          <FormGrid className="grid-cols-4 gap-4">
            {/* Row 1: 제품 정보 */}
            <FormField label="제조사">
              <Input
                defaultValue={data.manufacturer}
                disabled={!isEditing}
                className="h-8 rounded text-[12px]"
              />
            </FormField>
            <FormField label="제조일자">
              <Input
                type="date"
                defaultValue={data.installDate} // 제조일자 필드 미구현 시 installDate 차용
                disabled={!isEditing}
                className="h-8 rounded text-[12px]"
              />
            </FormField>
            <FormField label="모델명">
              <Input
                defaultValue={data.model}
                disabled={!isEditing}
                className="h-8 rounded text-[12px]"
              />
            </FormField>
            <FormField label="제조번호 (Serial No)">
              <Input
                defaultValue={data.code} // 고유 코드를 제조번호로 표시
                disabled={!isEditing}
                className="h-8 rounded font-mono text-[12px]"
              />
            </FormField>

            {/* Row 2: 현장 정보 */}
            <FormField label="시공사">
              <Input
                defaultValue={data.supplier}
                disabled={!isEditing}
                className="h-8 rounded text-[12px]"
              />
            </FormField>
            <FormField label="설치일자">
              <Input
                type="date"
                defaultValue={data.installDate}
                disabled={!isEditing}
                className="h-8 rounded text-[12px]"
              />
            </FormField>
            <FormField label="준공일자">
              <Input
                type="date"
                defaultValue={data.installDate}
                disabled={!isEditing}
                className="h-8 rounded text-[12px]"
              />
            </FormField>
          </FormGrid>
        </div>
      </div>
    </div>
  );
}
