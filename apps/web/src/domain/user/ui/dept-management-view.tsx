"use client";

import React, { useState } from "react";
import {
  Search,
  Plus,
  Trash2,
  Printer,
  Building2,
  Landmark,
  MapPin,
  Settings,
} from "lucide-react";

import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Badge } from "@/shared/components/ui/badge";
import { Textarea } from "@/shared/components/ui/textarea";

import {
  AppContent,
  SidePanel,
  DetailPanel,
  Toolbar,
  ToolbarButton,
  FormGrid,
  FormField,
  FormSectionHeader,
  FormSelect,
} from "@/shared/components/layout/app-content";

// ✨ [Hooks & Common]
import { NavTree, TreeNode } from "@/shared/components/navigation/nav-tree";
import { useOrgTreeNodes, OrgData } from "../hooks/use-org-tree-nodes";

import {
  SECTORS as INITIAL_SECTORS,
  CENTERS,
  DEPARTMENTS,
} from "../data/user-mock";
import { Sector } from "../model/types";
import { SectorDialog } from "./components/dialog/sector-dialog";

export function DeptManagementView() {
  // --- [State] ---
  const [selectedId, setSelectedId] = useState<number>(DEPARTMENTS[0].id);
  const [searchTerm, setSearchTerm] = useState("");
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const [isEditing, setIsEditing] = useState(false);
  const [isAllExpanded, setIsAllExpanded] = useState(false);
  const [isSectorManagerOpen, setIsSectorManagerOpen] = useState(false);

  const [sectors, setSectors] = useState<Sector[]>(
    INITIAL_SECTORS.map((s) => ({
      id: s.id,
      name: s.name,
      code: s.code || "",
      sort_order: s.sort_order ?? s.id,
    })),
  );

  // --- [Logic] ---
  const selectedDept = DEPARTMENTS.find((d) => d.id === selectedId);
  const selectedSector = sectors.find((s) => s.id === selectedDept?.sector_id);
  const selectedCenter = CENTERS.find((c) => c.id === selectedDept?.center_id);

  // ✨ [Hook] 트리 데이터 생성 (부서만, 사용자 제외)
  const treeNodes = useOrgTreeNodes({
    searchTerm,
    includeUsers: false,
  });

  // --- [Handlers] ---
  const handleToggle = (id: string) => {
    setOpenItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleToggleExpandAll = () => {
    if (isAllExpanded) {
      setOpenItems({});
      setIsAllExpanded(false);
    } else {
      const newOpenItems: Record<string, boolean> = {};
      sectors.forEach((s) => (newOpenItems[`sector-${s.id}`] = true));
      CENTERS.forEach((c) => (newOpenItems[`center-${c.id}`] = true));
      setOpenItems(newOpenItems);
      setIsAllExpanded(true);
    }
  };

  const handleSelectNode = (node: TreeNode<OrgData>) => {
    // 1. 자식이 없고 (Leaf Node)
    // 2. data에 'sector_id'가 있으면 -> Department 타입
    if (!node.children && node.data && "sector_id" in node.data) {
      setSelectedId(Number(node.id));
      if (isEditing) setIsEditing(false);
    }
  };

  // --- [UI] ---
  const leftPanel = (
    <SidePanel
      searchBar={
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="부서 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 h-9 bg-slate-50/50 border-slate-200 rounded-lg shadow-none"
          />
        </div>
      }
      isExpanded={isAllExpanded}
      onToggleExpand={handleToggleExpandAll}
      actions={
        <ToolbarButton
          icon={Plus}
          className="bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg"
        />
      }
    >
      <NavTree
        title="부서 조직도"
        nodes={treeNodes}
        openItems={openItems}
        onToggle={handleToggle}
        selectedId={selectedId}
        onSelect={handleSelectNode}
      />
    </SidePanel>
  );

  const rightPanel = selectedDept ? (
    <DetailPanel
      icon={Building2}
      title={selectedDept.name}
      subTitle={
        <div className="flex items-center gap-1.5">
          <Badge className="bg-indigo-50 text-indigo-600 border-indigo-100 font-bold py-0.5 px-2 text-[11px]">
            <Landmark className="h-3 w-3 mr-1" /> {selectedSector?.name}
          </Badge>
          {selectedCenter && (
            <Badge className="bg-violet-50 text-violet-600 border-violet-100 font-bold py-0.5 px-2 text-[11px]">
              <MapPin className="h-3 w-3 mr-1" /> {selectedCenter.name}
            </Badge>
          )}
        </div>
      }
      tabs={
        <div className="px-4 pb-3 text-[13px] font-bold border-b-2 border-indigo-600 text-indigo-600">
          부서 상세 정보
        </div>
      }
      mode={isEditing ? "edit" : "view"}
      onEdit={() => setIsEditing(true)}
      onCancel={() => setIsEditing(false)}
      onSave={() => setIsEditing(false)}
    >
      <FormGrid>
        <FormSectionHeader title="조직 위계 설정" icon={Landmark} />
        <FormField label="부서 명칭">
          <Input
            defaultValue={selectedDept.name}
            disabled={!isEditing}
            className="h-9 rounded-lg"
          />
        </FormField>
        <FormField label="부서 코드">
          <Input
            defaultValue={selectedDept.code || ""}
            disabled={!isEditing}
            className="h-9 rounded-lg font-mono text-[13px]"
          />
        </FormField>

        {/* 상위 부문 선택 + 관리 팝업 버튼 */}
        <FormField label="상위 부문">
          <div className="flex gap-2">
            <div className="flex-1">
              <FormSelect
                value={String(selectedDept.sector_id)}
                onValueChange={(val) => console.log("Selected Sector:", val)}
                options={sectors.map((s) => ({
                  label: s.name,
                  value: String(s.id),
                }))}
                disabled={!isEditing}
              />
            </div>
            {isEditing && (
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => setIsSectorManagerOpen(true)}
                className="h-9 w-9 border-indigo-200 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 rounded-lg"
                title="본부 목록 관리"
              >
                <Settings className="h-4 w-4" />
              </Button>
            )}
          </div>
        </FormField>

        <FormSelect
          label="소속 센터 (선택)"
          value={
            selectedDept.center_id ? String(selectedDept.center_id) : "none"
          }
          onValueChange={() => {}}
          options={[
            { label: "없음 (부문 직속)", value: "none" },
            ...CENTERS.filter(
              (c) => String(c.sector_id) === String(selectedDept.sector_id),
            ).map((c) => ({ label: c.name, value: String(c.id) })),
          ]}
          disabled={!isEditing}
        />

        <FormSectionHeader title="실무 관할 시설" icon={MapPin} />
        <div className="col-span-2 bg-slate-50/50 border border-slate-200 rounded-lg p-3">
          <div className="flex flex-wrap gap-1.5">
            {selectedDept.facility_ids.length > 0 ? (
              selectedDept.facility_ids.map((id) => (
                <Badge
                  key={id}
                  variant="secondary"
                  className="bg-white border-slate-200 text-slate-600 py-1 px-2 text-[11px]"
                >
                  시설 ID: {id}
                </Badge>
              ))
            ) : (
              <p className="text-[12px] text-slate-400 py-1">
                연결된 관리 시설이 없습니다.
              </p>
            )}
            {isEditing && (
              <Button
                variant="outline"
                size="sm"
                className="h-7 text-indigo-600 border-dashed border-indigo-200 bg-indigo-50/30"
              >
                + 시설 추가
              </Button>
            )}
          </div>
        </div>

        <FormField label="비고" fullWidth>
          <Textarea
            className="min-h-[80px] text-[13px] rounded-lg resize-none"
            disabled={!isEditing}
          />
        </FormField>
      </FormGrid>
    </DetailPanel>
  ) : null;

  return (
    <>
      <AppContent
        title="조직 및 부서 관리"
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

      <SectorDialog
        open={isSectorManagerOpen}
        onOpenChange={setIsSectorManagerOpen}
        units={sectors}
        onUnitsChange={setSectors}
      />
    </>
  );
}
