import React from "react";
import type { Equipment } from "../../types";
import { FormGroup } from "./shared";

// 기본 플레이스홀더 이미지 (이미지가 없을 경우 대비)
const DEFAULT_PLACEHOLDER_IMAGE =
  "https://placehold.co/600x400/f3f4f6/94a3b8?text=No+Image";

export const BasicInfo = ({ data }: { data: Equipment }) => {
  // 로직: 첫 번째 이미지가 있으면 사용, 없으면 플레이스홀더 사용
  const displayImage =
    data.images && data.images.length > 0
      ? data.images[0]
      : DEFAULT_PLACEHOLDER_IMAGE;

  return (
    <div className="flex gap-8 h-full">
      {/* 좌측 폼 영역 */}
      <div className="flex-1 grid grid-cols-1 gap-y-4 content-start">
        <div className="grid grid-cols-2 gap-4">
          <FormGroup label="설비품목" value={data.category} />
          <FormGroup label="설비번호" value={data.model} />
        </div>
        <FormGroup label="설비명" value={data.name} />
        <FormGroup label="시설명" value={data.facilityName} />
        <FormGroup label="용도" value="Main Power Distribution" />

        <div className="grid grid-cols-2 gap-4">
          <FormGroup label="설치위치" value={data.location} />
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-tight">
              상태
            </label>
            <select
              className="w-full h-9 rounded-md border border-gray-200 text-sm px-2 bg-gray-50/50 focus:ring-0 focus:border-blue-500 font-medium"
              disabled
            >
              <option>{data.status === "Active" ? "가동중" : "점검중"}</option>
            </select>
          </div>
        </div>
        <FormGroup label="다음점검일" value="2024-05-20" type="date" />
        <div className="space-y-1">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-tight">
            비고
          </label>
          <textarea
            className="w-full rounded-md border border-gray-200 text-sm p-2.5 min-h-[100px] bg-gray-50/50 focus:ring-0 focus:border-blue-500 resize-none text-gray-700"
            readOnly
            defaultValue={data.description}
          />
        </div>
      </div>

      {/* 우측 이미지 영역: 설비사진 탭과 동일한 스타일 적용 */}
      <div className="w-80 flex flex-col shrink-0">
        <label className="text-xs font-semibold text-gray-500 uppercase tracking-tight mb-1.5">
          설비사진
        </label>
        <div className="aspect-[4/3] w-full relative rounded-xl border border-gray-200 overflow-hidden bg-gray-50 shadow-sm transition-all hover:border-blue-300">
          <img
            src={displayImage}
            alt="Equipment Main"
            className="w-full h-full object-cover"
          />
          {/* 사진이 없는 경우를 위한 오버레이(선택사항) */}
          {(!data.images || data.images.length === 0) && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-50/50">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                No Image Available
              </span>
            </div>
          )}
        </div>
        {/* 하단 보조 정보 (선택사항) */}
        <div className="mt-3 p-3 bg-blue-50/50 rounded-lg border border-blue-100/50">
          <p className="text-[11px] text-blue-700 leading-relaxed font-medium">
            ※ 설비사진 탭의 첫 번째 등록된 사진이 대표 이미지로 표시됩니다.
          </p>
        </div>
      </div>
    </div>
  );
};
