"use client";

import React from "react";
import { Plus, Camera, X } from "lucide-react";
import { cn } from "@/shared/lib/utils";

interface PhotosProps {
  data: {
    images?: string[];
  };
}

export function Photos({ data }: PhotosProps) {
  const images = data.images || [];
  const MAX_PHOTOS = 6;

  return (
    <div className="flex flex-col h-full w-full min-h-0 overflow-hidden">
      {/* 상단 헤더 영역 */}
      <div className="flex items-center justify-between mb-4 shrink-0">
        <h3 className="text-[13px] font-bold text-slate-700 flex items-center gap-2">
          <span className="w-1.5 h-3.5 bg-indigo-500 rounded-full" />
          설비 사진 관리
        </h3>
        <span className="text-[11px] text-slate-400 font-medium">
          {images.length} / {MAX_PHOTOS} 장 등록됨
        </span>
      </div>

      {/* 메인 그리드 영역: 3열 구성 */}
      <div className="flex-1 min-h-0 overflow-y-auto pr-2 custom-scrollbar">
        <div className="grid grid-cols-3 gap-5 pb-4">
          {/* 1. 기존 사진 목록 표시 */}
          {images.map((url, index) => (
            <div key={index} className="flex flex-col gap-2">
              <div className="relative aspect-video group overflow-hidden rounded-lg border border-slate-200 bg-slate-100 shadow-sm">
                <img
                  src={url}
                  alt={`설비 사진 ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* 호버 액션 레이어 */}
                <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button className="p-1.5 bg-white/20 backdrop-blur-md rounded-md hover:bg-white/40 transition-colors">
                    <Camera className="h-4 w-4 text-white" />
                  </button>
                  <button className="p-1.5 bg-red-500/80 backdrop-blur-md rounded-md hover:bg-red-600 transition-colors">
                    <X className="h-4 w-4 text-white" />
                  </button>
                </div>

                {/* ✨ 메인 사진(첫 번째 사진)에만 "기본" 라벨 표시 */}
                {index === 0 && (
                  <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-indigo-600/90 backdrop-blur-sm rounded text-[10px] text-white font-bold z-10">
                    기본
                  </div>
                )}
              </div>
              {/* 사진 개별 타이틀 */}
              <div className="px-1">
                <p className="text-[12px] font-bold text-slate-700 truncate">
                  {index === 0
                    ? "메인 설비 전면 사진"
                    : `설비 상세 사진 ${index + 1}`}
                </p>
                <p className="text-[10px] text-slate-400 font-medium">
                  2026-01-21 등록
                </p>
              </div>
            </div>
          ))}

          {/* 2. 유동적 사진 추가 카드 */}
          {images.length < MAX_PHOTOS && (
            <div className="flex flex-col gap-2">
              <div className="aspect-video bg-slate-50 border-2 border-dashed border-slate-200 rounded-lg flex flex-col items-center justify-center gap-2 cursor-pointer group hover:border-indigo-400 hover:bg-indigo-50/30 transition-all">
                <div className="p-2 bg-white rounded-full shadow-sm group-hover:scale-110 transition-transform border border-slate-100">
                  <Plus className="h-4 w-4 text-slate-400 group-hover:text-indigo-600" />
                </div>
                <span className="text-[11px] font-bold text-slate-400 group-hover:text-indigo-600">
                  사진 업로드
                </span>
              </div>
              {/* 레이아웃 유지용 투명 요소 */}
              <div className="px-1 opacity-0 pointer-events-none">
                <p className="text-[12px]">Placeholder</p>
                <p className="text-[10px]">Date</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
