// src/domain/equipment/ui/equipment-management-view.tsx
"use client";

import React, { useState } from "react";
import {
  Search,
  Plus,
  Trash2,
  Printer,
  Hammer,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Settings,
  Image as ImageIcon,
  FileText,
  Wrench,
  Package,
  History as HistoryIcon,
  ClipboardCheck,
} from "lucide-react";

import { Input } from "@/shared/components/ui/input";
import { Badge } from "@/shared/components/ui/badge";
import {
  AppContent,
  SidePanel,
  DetailPanel,
  Toolbar,
  ToolbarButton,
} from "@/shared/components/layout/app-content";

import { Equipment } from "../model/types";
import { EquipmentList } from "./components/equipment-list";

// 탭 컴포넌트 임포트
import { BasicInfo } from "./tabs/basic-info";
import { ExtendedInfo } from "./tabs/extended-info";
import { Specs } from "./tabs/specs";
import { SubEquipmentList } from "./tabs/sub-equipment";
import { Parts } from "./tabs/parts";
import { History } from "./tabs/history";
import { Inspection } from "./tabs/inspection";
import { Photos } from "./tabs/photos";

interface EquipmentManagementViewProps {
  data: Equipment[];
  selectedItem: Equipment | undefined;
  searchTerm: string;
  onSelect: (id: number) => void;
  onSearchChange: (value: string) => void;
}

export function EquipmentManagementView({
  data,
  selectedItem,
  searchTerm,
  onSelect,
  onSearchChange,
}: EquipmentManagementViewProps) {
  // UI 전용 상태 (수정 모드, 활성 탭)
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");

  // 1. 좌측 패널 (목록)
  const leftPanel = (
    <SidePanel
      searchBar={
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="설비명, 모델명 검색..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9 h-9 bg-slate-50/50 border-slate-200 rounded-lg shadow-none"
          />
        </div>
      }
      actions={
        <ToolbarButton
          icon={Plus}
          className="bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg"
        />
      }
    >
      <EquipmentList
        data={data}
        selectedId={selectedItem?.id ?? null}
        onSelect={onSelect}
      />
    </SidePanel>
  );

  // 2. 우측 패널 (상세 정보)
  const rightPanel = selectedItem ? (
    <DetailPanel
      icon={Hammer}
      title={selectedItem.name}
      subTitle={
        <div className="flex items-center flex-wrap gap-2">
          <Badge className="bg-indigo-50 text-indigo-600 border-indigo-100 font-bold gap-1.5 py-1 px-2 text-[11px]">
            <Settings className="h-3 w-3" /> {selectedItem.model}
          </Badge>
          <Badge className="bg-slate-50 text-slate-600 border-slate-100 font-bold gap-1.5 py-1 px-2 text-[11px]">
            <MapPin className="h-3 w-3" /> {selectedItem.location}
          </Badge>
          <Badge
            className={
              selectedItem.status === "Active"
                ? "bg-emerald-50 text-emerald-700 border-emerald-100 gap-1.5 py-1 px-2 text-[11px]"
                : "bg-amber-50 text-amber-700 border-amber-100 gap-1.5 py-1 px-2 text-[11px]"
            }
          >
            {selectedItem.status === "Active" ? (
              <CheckCircle2 className="h-3 w-3" />
            ) : (
              <AlertCircle className="h-3 w-3" />
            )}
            {selectedItem.status === "Active" ? "정상 가동" : "점검 필요"}
          </Badge>
        </div>
      }
      mode={isEditing ? "edit" : "view"}
      onEdit={() => setIsEditing(true)}
      onCancel={() => setIsEditing(false)}
      onSave={() => setIsEditing(false)}
      tabs={
        <div className="flex gap-1">
          {[
            { id: "basic", label: "기본정보", icon: FileText },
            { id: "extended", label: "취득 및 제조 정보", icon: Settings },
            { id: "specs", label: "제원", icon: ClipboardCheck },
            { id: "sub-equipment", label: "구성설비", icon: Package },
            { id: "parts", label: "부품", icon: Package },
            { id: "history", label: "이력", icon: HistoryIcon },
            { id: "inspection", label: "검사", icon: Wrench },
            { id: "photos", label: "사진", icon: ImageIcon },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-2 text-[13px] font-bold border-b-2 transition-colors flex items-center gap-1.5 ${
                activeTab === tab.id
                  ? "border-indigo-600 text-indigo-600"
                  : "border-transparent text-slate-400 hover:text-slate-600"
              }`}
            >
              <tab.icon className="h-3.5 w-3.5" />
              {tab.label}
            </button>
          ))}
        </div>
      }
    >
      <div className="h-full">
        {activeTab === "basic" && (
          <BasicInfo
            key={selectedItem.id}
            data={selectedItem}
            isEditing={isEditing}
          />
        )}
        {activeTab === "extended" && (
          <ExtendedInfo
            key={selectedItem.id}
            data={selectedItem}
            isEditing={isEditing}
          />
        )}
        {activeTab === "specs" && (
          <Specs
            key={selectedItem.id}
            data={selectedItem}
            isEditing={isEditing}
          />
        )}
        {activeTab === "parts" && (
          <Parts key={selectedItem.id} data={selectedItem} />
        )}
        {activeTab === "sub-equipment" && (
          <SubEquipmentList data={selectedItem} />
        )}
        {activeTab === "history" && (
          <History key={selectedItem.id} data={selectedItem} />
        )}
        {activeTab === "inspection" && (
          <Inspection key={selectedItem.id} data={selectedItem} />
        )}
        {activeTab === "photos" && (
          <Photos key={selectedItem.id} data={selectedItem} />
        )}
      </div>
    </DetailPanel>
  ) : (
    <div className="flex flex-col items-center justify-center h-full text-slate-300">
      <Hammer className="h-16 w-16 mb-4 opacity-20" />
      <p className="font-medium text-[15px]">설비를 선택해 주세요</p>
    </div>
  );

  return (
    <AppContent
      title="설비 관리"
      toolbar={
        <Toolbar>
          <ToolbarButton icon={Plus} />
          <ToolbarButton icon={Trash2} iconClassName="text-red-500" />
          <ToolbarButton icon={Printer} />
        </Toolbar>
      }
      leftPanel={leftPanel}
      rightPanel={rightPanel}
      className="h-[calc(100vh-57px)] overflow-hidden"
    />
  );
}
