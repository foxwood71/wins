"use client";

import React, { useState, useMemo } from "react";
import {
  Plus,
  Trash2,
  Printer,
  Building2,
  Landmark,
  MapPin,
  Settings,
  CheckCircle2, // 상태 아이콘
} from "lucide-react";

import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Badge } from "@/shared/components/ui/badge";
import { Textarea } from "@/shared/components/ui/textarea";
import { cn } from "@/shared/lib/utils";

// [Dynamic Filter]
import { FilterConfig, FilterValues } from "@/shared/components/dynamic-filter";

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

// [Navigation]
import { NavTree, TreeNode } from "@/shared/components/navigation/nav-tree";
import { useDeptTreeNodes } from "../hooks/use-org-tree-nodes";

// Data & Types
import {
  SECTORS as INITIAL_SECTORS,
  CENTERS,
  DEPARTMENTS,
} from "../data/user-mock";
import { Sector, Center, Department, OrgData } from "../model/types";
import { SectorDialog } from "./components/dialog/sector-dialog";

export function DeptManagementView() {
  // --- [State] ---
  const [selectedId, setSelectedId] = useState<number>(DEPARTMENTS[0].id);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilters, setActiveFilters] = useState<FilterValues>({});

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

  // --- [Config] Filters ---
  const DEPT_FILTERS: FilterConfig[] = useMemo(
    () => [
      {
        key: "sector_id",
        label: "소속 부문",
        type: "select",
        options: sectors.map((s) => ({ label: s.name, value: String(s.id) })),
      },
      {
        key: "center_id",
        label: "소속 센터",
        type: "select",
        options: CENTERS.map((c) => ({ label: c.name, value: String(c.id) })),
      },
      {
        key: "status",
        label: "운영 상태",
        type: "select",
        options: [
          { label: "운영중 (Active)", value: "active" },
          { label: "폐지 (Inactive)", value: "inactive" },
        ],
      },
    ],
    [sectors],
  );

  // --- [Logic] ---
  const selectedDept = DEPARTMENTS.find((d) => d.id === selectedId);
  const selectedSector = sectors.find((s) => s.id === selectedDept?.sector_id);
  const selectedCenter = CENTERS.find((c) => c.id === selectedDept?.center_id);

  const treeNodes = useDeptTreeNodes(searchTerm);

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
    // 2. data에 'sector_id'가 있으면 -> 부서타입
    if (!node.children && node.data && "sector_id" in node.data) {
      const data = node.data as Department;
      setSelectedId(data.id);
      // 선택된 사용자의 소속 정보로 폼 상태 업데이트
      // const dept = DEPARTMENTS.find((d) => d.id === user.department_id);
      // if (dept) {
      //   setSelectedSectorId(dept.sector_id || 0);
      //   setSelectedCenterId(dept.center_id || null);
      //   setSelectedDeptId(dept.id);
      // }

      setIsEditing(false);
      // if (isEditing) setIsEditing(false);
    }
  };

  const handleFilterChange = (newFilters: FilterValues) => {
    setActiveFilters(newFilters);
  };

  // ✨ [수정 2] 렌더링 함수: 데이터를 숫자로 변환하여 비교
  const renderNodeContent = (node: TreeNode<OrgData>) => {
    const isSelected = String(node.data?.id) === String(selectedId); // ID 비교 수정

    // A. 데이터 타입 확인
    // const data = node.data as Department;
    const isDept = node.data && "sector_id" in node.data;
    //const isActive = data?.status !== "inactive";

    // B. 선택 여부 판단 (숫자로 변환 후 비교)
    // node.data가 없으면 false, 있으면 data.id를 숫자로 바꿔서 selectedId와 비교
    //const isSelected = node.data
    //  ? Number((node.data as Department).id) === Number(selectedId)
    //  : false;

    // C. 부서 노드 렌더링
    if (isDept) {
      const dept = node.data as Department;
      const isActive = dept.status === "active";
      return (
        <div
          onClick={(e) => {
            e.stopPropagation();
            handleSelectNode(node);
          }}
          className={cn(
            // 스타일 클래스: 사용자 관리와 동일
            "flex items-center p-2 mb-1 rounded-xl border transition-all cursor-pointer group relative select-none",
            isSelected
              ? "bg-white border-indigo-500 ring-1 ring-indigo-500/20 shadow-md z-10"
              : "bg-white border-transparent hover:bg-slate-50 hover:border-slate-200",
          )}
        >
          {/* 아이콘 박스 */}
          <div
            className={cn(
              "h-8 w-8 flex items-center justify-center shrink-0 mr-2.5 transition-colors",
              isSelected
                ? "text-indigo-600"
                : "text-slate-400 group-hover:text-indigo-500",
            )}
          >
            <Building2 className="h-4 w-4" />
          </div>

          {/* 텍스트 정보 */}
          <div className="flex-1 min-w-0 flex flex-col justify-center">
            <span
              className={cn(
                "text-[13px] font-bold truncate leading-tight",
                isSelected ? "text-slate-900" : "text-slate-700",
              )}
            >
              {node.label}
            </span>
            {dept.code && (
              <span className="text-[11px] font-bold text-slate-400 mt-[1px] truncate uppercase tracking-wide">
                {dept.code}
              </span>
            )}
          </div>

          {/* 상태 아이콘 */}
          <div className="ml-2.5 shrink-0 flex items-center">
            {isActive ? (
              <CheckCircle2 className="h-4.5 w-4.5 text-emerald-500" />
            ) : (
              <div
                className="h-4.5 w-4.5 rounded-full border-2 border-slate-200 bg-slate-50 flex items-center justify-center"
                title="폐지됨"
              >
                <div className="h-1.5 w-1.5 rounded-full bg-slate-300" />
              </div>
            )}
          </div>
        </div>
      );
    }

    // 부서가 아니면 기본 텍스트 렌더링
    return <span className="text-sm font-medium">{node.label}</span>;
  };

  // --- [UI Layout] ---
  const leftPanel = (
    <SidePanel
      title="부서 조직도"
      onSearch={setSearchTerm}
      filterConfigs={DEPT_FILTERS}
      onFilterChange={handleFilterChange}
      isExpanded={isAllExpanded}
      onToggleExpand={handleToggleExpandAll}
      actions={
        <ToolbarButton
          icon={Plus}
          className="bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg h-8 w-8 ml-1"
        />
      }
    >
      <NavTree
        title=""
        nodes={treeNodes}
        openItems={openItems}
        onToggle={handleToggle}
        selectedId={selectedId}
        onSelect={handleSelectNode}
        renderItem={renderNodeContent} // 렌더러 전달
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
                className="h-9 w-9 shrink-0 border-indigo-200 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 rounded-lg"
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
