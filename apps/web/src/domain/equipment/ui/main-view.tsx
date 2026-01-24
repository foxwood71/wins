"use client";

import React, { useState } from "react";
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  Printer,
  CheckCircle2,
  AlertCircle,
  MoreHorizontal,
} from "lucide-react";

import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Badge } from "@/shared/components/ui/badge";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/shared/components/ui/resizable";

import { Equipment } from "../model/types";
import { BasicInfo } from "./tabs/basic-info";
import { ExtendedInfo } from "./tabs/extended-info";
import { Specs } from "./tabs/specs";
import { Accessories } from "./tabs/accessories";
import { Parts } from "./tabs/parts";
import { History } from "./tabs/history";
import { Inspection } from "./tabs/inspection";
import { Photos } from "./tabs/photos";

const TABS = [
  { id: "basic", label: "기본정보" },
  { id: "extended", label: "확장정보" },
  { id: "specs", label: "사양정보" },
  { id: "accessories", label: "부속장치" },
  { id: "parts", label: "주요부품" },
  { id: "history", label: "이력관리" },
  { id: "inspection", label: "시험검사" },
  { id: "photos", label: "설비사진" },
];

interface MainViewProps {
  data: Equipment[];
  selectedItem: Equipment;
  onSelect: (id: string) => void;
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export function MainView({
  data,
  selectedItem,
  onSelect,
  searchTerm,
  onSearchChange,
}: MainViewProps) {
  const [activeTab, setActiveTab] = useState("basic");

  return (
    <div className="flex flex-col h-full w-full bg-white overflow-hidden">
      {/* 1. 최상단 헤더 */}
      <header className="h-12 bg-white px-6 flex items-stretch justify-between shrink-0 z-30">
        <h1 className="text-lg font-bold text-slate-800 tracking-tight flex items-center pt-3">
          설비관리(Equipment Management)
        </h1>

        <div className="flex items-center pt-3">
          <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-lg p-1 shadow-sm">
            <Button
              variant="ghost"
              size="sm"
              className="h-7 w-7 p-0 text-slate-500 hover:bg-slate-100"
            >
              <Plus className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-7 w-7 p-0 text-slate-500 hover:bg-slate-100"
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-7 w-7 p-0 text-red-500 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-7 w-7 p-0 text-slate-500 hover:bg-slate-100"
            >
              <Printer className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-7 w-7 p-0 text-slate-500 hover:bg-slate-100"
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* 2. 메인 컨텐츠 영역 */}
      <div className="flex-1 overflow-hidden bg-slate-50/50">
        <ResizablePanelGroup
          direction="horizontal"
          className="h-full items-stretch gap-0"
        >
          {/* [LEFT] 설비 선택 리스트 */}
          <ResizablePanel
            defaultSize={20}
            minSize={15}
            maxSize={25}
            className="min-w-[300px]"
          >
            <div className="h-full p-4 pr-2">
              <div className="flex flex-col h-full bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-slate-50 shrink-0">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      placeholder="설비 검색..."
                      value={searchTerm}
                      onChange={(e) => onSearchChange(e.target.value)}
                      className="pl-9 bg-slate-50/50 border-slate-200 rounded-xl shadow-none focus-visible:ring-1 focus-visible:ring-blue-500"
                    />
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto p-3 space-y-2">
                  {data.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => onSelect(item.id)}
                      className={cn(
                        "w-full flex flex-col items-start gap-1 p-4 rounded-xl text-left transition-all border outline-none",
                        selectedItem.id === item.id
                          ? "bg-white border-blue-500 shadow-[0_4px_12px_rgba(59,130,246,0.12)] ring-1 ring-blue-500"
                          : "bg-white border-transparent hover:bg-slate-50 hover:border-slate-100",
                      )}
                    >
                      <div className="flex w-full items-center justify-between mb-1">
                        <span
                          className={cn(
                            "font-bold text-[14px] truncate",
                            selectedItem.id === item.id
                              ? "text-blue-700"
                              : "text-slate-800",
                          )}
                        >
                          {item.name}
                        </span>
                        <Badge
                          variant="secondary"
                          className={cn(
                            "h-5 px-2 text-[10px] font-bold rounded-full",
                            item.status === "Active"
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-amber-100 text-amber-700",
                          )}
                        >
                          {item.status === "Active" ? "가동중" : "점검중"}
                        </Badge>
                      </div>
                      <div className="flex justify-between w-full text-[11px] text-slate-400 font-semibold uppercase">
                        <span>{item.model}</span>
                        <span>{item.location}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </ResizablePanel>

          <ResizableHandle className="w-0 bg-transparent" />

          {/* [RIGHT] 상세 정보 패널 */}
          <ResizablePanel defaultSize={80}>
            <div className="flex flex-col h-full overflow-y-auto p-4 pl-2 gap-4">
              {/* [CARD 1] 장비 타이틀 카드 */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm px-8 py-4 shrink-0">
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight mb-3">
                  {selectedItem.name}
                </h2>
                <div className="flex items-center gap-3 text-[13px] text-slate-500 font-bold">
                  <span className="text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100 font-mono leading-none">
                    {selectedItem.model}
                  </span>
                  <span className="text-slate-300">|</span>
                  <span>{selectedItem.location}</span>
                  <span className="text-slate-300">|</span>
                  <span className="flex items-center gap-1.5">
                    {selectedItem.status === "Active" ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-amber-500" />
                    )}
                    <span
                      className={
                        selectedItem.status === "Active"
                          ? "text-emerald-700"
                          : "text-amber-700"
                      }
                    >
                      {selectedItem.status === "Active"
                        ? "정상 가동 중"
                        : "유지보수 필요"}
                    </span>
                  </span>
                </div>
              </div>

              {/* [CARD 2] 탭 컨텐츠 영역 - flex-1과 h-full로 높이 고정 */}
              <div className="flex-1 flex flex-col min-h-0 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="flex items-end h-14 border-b border-slate-100 px-8 shrink-0 bg-slate-50/30">
                  {TABS.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={cn(
                        "px-5 pb-[21px] text-[13px] font-bold border-b-2 whitespace-nowrap transition-all tracking-tight leading-none outline-none shadow-none",
                        activeTab === tab.id
                          ? "border-blue-600 text-blue-600"
                          : "border-transparent text-slate-400 hover:text-slate-600",
                      )}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* ✨ 일관성을 위한 콘텐츠 래퍼: 최소 높이 및 고정 폭 제어 */}
                <div className="flex-1 overflow-hidden p-6">
                  <div className="w-full max-w-[1200px] mx-auto h-full flex flex-col">
                    <div className="animate-in fade-in duration-300 h-full">
                      {activeTab === "basic" && (
                        <BasicInfo data={selectedItem} />
                      )}
                      {activeTab === "extended" && (
                        <ExtendedInfo data={selectedItem} />
                      )}
                      {activeTab === "specs" && <Specs data={selectedItem} />}
                      {activeTab === "accessories" && (
                        <Accessories data={selectedItem} />
                      )}
                      {activeTab === "parts" && <Parts data={selectedItem} />}
                      {activeTab === "history" && (
                        <History data={selectedItem} />
                      )}
                      {activeTab === "inspection" && (
                        <Inspection data={selectedItem} />
                      )}
                      {activeTab === "photos" && <Photos data={selectedItem} />}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
}
