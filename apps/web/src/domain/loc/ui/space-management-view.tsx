"use client";

import React, { useState, useMemo } from "react";
import {
  Plus,
  CornerDownRight, // 하위 추가 아이콘
  Trash2,
  Printer,
  Factory,
  Building2,
  Layers,
  DoorOpen,
  Cylinder,
  MapPin,
  Settings,
  Lock,
  Maximize,
  ChevronRight, // 배지 구분용 화살표
  Tag, // 기능 역할 아이콘
} from "lucide-react";

import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Badge } from "@/shared/components/ui/badge";
import { Textarea } from "@/shared/components/ui/textarea";
import { Switch } from "@/shared/components/ui/switch";

// [Layout Components]
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

// [Navigation Components]
import { NavTree, TreeNode } from "@/shared/components/navigation/nav-tree";
import { NavListItem } from "@/shared/components/navigation/nav-list-item";
import { useSpaceTreeNodes } from "../hooks/use-space-tree";

// [Data & Types]
import {
  FACILITIES,
  SPACES,
  SPACE_TYPES,
  SPACE_FUNCTIONS,
} from "../data/loc-mock";
import { Facility, Space, LocData } from "../model/types";

// [Dynamic Filter]
import { FilterValues } from "@/shared/components/dynamic-filter";

export function SpaceManagementView() {
  // ----------------------------------------------------------------------
  // 1. State Management
  // ----------------------------------------------------------------------

  const [selectedKey, setSelectedKey] = useState<string>(
    `fac-${FACILITIES[0].id}`,
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilters, setActiveFilters] = useState<FilterValues>({});

  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});
  const [isAllExpanded, setIsAllExpanded] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [creationMode, setCreationMode] = useState<
    "facility" | "child" | "sibling" | null
  >(null);

  // ----------------------------------------------------------------------
  // 2. Derived Data
  // ----------------------------------------------------------------------

  const isFacilitySelected = selectedKey.startsWith("fac-");
  const selectedIdNum = Number(selectedKey.split("-")[1]);

  const selectedFacility = isFacilitySelected
    ? FACILITIES.find((f) => f.id === selectedIdNum)
    : FACILITIES.find(
        (f) => f.id === SPACES.find((s) => s.id === selectedIdNum)?.facility_id,
      );

  const selectedSpace = !isFacilitySelected
    ? SPACES.find((s) => s.id === selectedIdNum)
    : null;

  const parentSpace = selectedSpace?.parent_id
    ? SPACES.find((s) => s.id === selectedSpace.parent_id)
    : null;

  const hasChildren = useMemo(() => {
    if (!selectedSpace) return false;
    return SPACES.some((s) => s.parent_id === selectedSpace.id);
  }, [selectedSpace]);

  const treeNodes = useSpaceTreeNodes(searchTerm);

  // ----------------------------------------------------------------------
  // 3. Handlers
  // ----------------------------------------------------------------------

  const handleToggle = (id: string) => {
    setOpenItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleToggleExpandAll = () => {
    if (isAllExpanded) {
      setOpenItems({});
      setIsAllExpanded(false);
    } else {
      const newOpenItems: Record<string, boolean> = {};
      FACILITIES.forEach((f) => (newOpenItems[`fac-${f.id}`] = true));
      SPACES.forEach((s) => (newOpenItems[`space-${s.id}`] = true));
      setOpenItems(newOpenItems);
      setIsAllExpanded(true);
    }
  };

  const handleSelectNode = (node: TreeNode<LocData>) => {
    setSelectedKey(String(node.id));
    setCreationMode(null);
    setIsEditing(false);
  };

  const handleCreate = (mode: "child" | "sibling") => {
    if (!selectedFacility?.id) return alert("시설을 먼저 선택해주세요.");

    if (isFacilitySelected && mode === "sibling") {
      setCreationMode("facility");
      setIsEditing(true);
      return;
    }

    setCreationMode(mode);
    setIsEditing(true);

    if (mode === "child" && !openItems[selectedKey]) {
      setOpenItems((prev) => ({ ...prev, [selectedKey]: true }));
    }
  };

  // ----------------------------------------------------------------------
  // 4. Renderers
  // ----------------------------------------------------------------------

  const renderNodeContent = (node: TreeNode<LocData>) => {
    const isSelected = node.id === selectedKey;
    const nodeIdStr = String(node.id);
    const isFac = nodeIdStr.startsWith("fac-");

    let spaceData: Space | null = null;
    let facilityData: Facility | null = null;
    let Icon = MapPin;
    let subInfos: string[] = [];

    if (isFac) {
      Icon = Factory;
      facilityData = node.data as Facility;
      subInfos = [facilityData?.code || ""];
    } else {
      spaceData = node.data as Space;
      subInfos = [spaceData?.code || ""];
      switch (spaceData?.space_type_id) {
        case 1:
          Icon = Building2;
          break;
        case 2:
          Icon = Layers;
          break;
        case 3:
          Icon = DoorOpen;
          break;
        case 4:
          Icon = Cylinder;
          break;
        default:
          Icon = MapPin;
          break;
      }
    }

    return (
      <NavListItem
        title={node.label}
        icon={Icon}
        subInfo={subInfos}
        isSelected={isSelected}
        onClick={() => handleSelectNode(node)}
        rightElement={
          <div className="flex items-center">
            {!isFac && spaceData?.is_restricted && (
              <Lock className="h-3.5 w-3.5 text-rose-400" />
            )}
          </div>
        }
      />
    );
  };

  const renderRightPanelContent = () => {
    // ----------------------------------------------------
    // [CASE 0-A] 신규 시설 등록
    // ----------------------------------------------------
    if (creationMode === "facility") {
      return (
        <DetailPanel
          icon={Factory}
          title="새 시설 등록"
          mode="edit"
          onSave={() => {
            alert("시설 저장 로직");
            setIsEditing(false);
            setCreationMode(null);
          }}
          onCancel={() => {
            setIsEditing(false);
            setCreationMode(null);
          }}
        >
          <FormGrid>
            <FormSectionHeader title="시설 개요" icon={Factory} />
            <FormField label="시설 명칭">
              <Input placeholder="새 시설 이름" autoFocus />
            </FormField>
            <FormField label="시설 코드">
              <Input
                placeholder="자동 생성"
                disabled
                className="bg-slate-100"
              />
            </FormField>
            <FormField label="주소" fullWidth>
              <Input placeholder="주소 입력" />
            </FormField>
            <FormField label="설명" fullWidth>
              <Textarea placeholder="설명 입력" />
            </FormField>
          </FormGrid>
        </DetailPanel>
      );
    }

    // ----------------------------------------------------
    // [CASE 0-B] 신규 공간 등록 (Child / Sibling) - ✨ 전체 필드 추가됨
    // ----------------------------------------------------
    if (creationMode === "child" || creationMode === "sibling") {
      let targetParentSpace: Space | null = null;
      let titleText = "";
      let referenceName = "";

      if (creationMode === "child") {
        targetParentSpace = selectedSpace ?? null;
        titleText = selectedSpace ? "하위 공간 추가" : "최상위 공간 추가";
      } else {
        targetParentSpace = parentSpace ?? null;
        referenceName = selectedSpace?.name || "";
        titleText = "동일 레벨 공간 추가";
      }

      const parentName = targetParentSpace
        ? targetParentSpace.name
        : "없음 (최상위 공간)";

      const subTitlePath = targetParentSpace
        ? `${selectedFacility?.name} > ${targetParentSpace.name}`
        : `${selectedFacility?.name}`;

      return (
        <DetailPanel
          icon={Plus}
          title={titleText}
          subTitle={subTitlePath}
          mode="edit"
          onSave={() => {
            alert("저장 로직 구현 필요");
            setIsEditing(false);
            setCreationMode(null);
          }}
          onCancel={() => {
            setIsEditing(false);
            setCreationMode(null);
          }}
        >
          <FormGrid>
            <FormSectionHeader title="위치 정보" icon={MapPin} />

            <FormField label="소속 시설">
              <Input
                value={selectedFacility?.name}
                disabled
                className="bg-slate-50 text-slate-600"
              />
            </FormField>

            {creationMode === "sibling" && (
              <FormField label="기준 공간 (형제)">
                <div className="relative">
                  <Input
                    value={referenceName}
                    disabled
                    className="bg-indigo-50/50 text-indigo-700 font-medium border-indigo-200"
                  />
                  <span className="absolute right-3 top-2.5 text-xs text-indigo-400 font-medium">
                    옆에 생성
                  </span>
                </div>
              </FormField>
            )}

            <FormField label="상위 공간 (부모)">
              <Input
                value={parentName}
                disabled
                className="bg-slate-50 font-bold text-slate-700"
              />
            </FormField>

            {/* ✨ [수정] 기본 정보 및 물리적 속성 모두 입력 가능하도록 추가 */}
            <FormSectionHeader title="기본 정보" icon={Settings} />
            <FormField label="공간 명칭">
              <Input placeholder="예: 1층, 전산실..." autoFocus />
            </FormField>

            <FormSelect
              label="기능 역할"
              options={[
                { label: "선택 안함", value: "none" },
                ...SPACE_FUNCTIONS.map((f) => ({
                  label: f.name,
                  value: String(f.id),
                })),
              ]}
              onValueChange={() => {}}
            />

            <FormSectionHeader title="물리적 속성" icon={Maximize} />
            <FormSelect
              label="공간 유형"
              options={SPACE_TYPES.map((t) => ({
                label: t.name,
                value: String(t.id),
              }))}
              onValueChange={() => {}}
            />
            <FormField label="면적 (m²)">
              <div className="relative">
                <Input type="number" placeholder="0" className="pr-8" />
                <span className="absolute right-3 top-2.5 text-xs text-slate-400">
                  m²
                </span>
              </div>
            </FormField>
            <FormField label="통제 구역">
              <div className="flex items-center justify-between h-9 px-3 rounded-lg border">
                <span className="text-sm text-slate-600">일반 구역</span>
                <Switch defaultChecked={false} onCheckedChange={() => {}} />
              </div>
            </FormField>

            <FormField label="설명 / 메모" fullWidth>
              <Textarea
                placeholder="공간에 대한 설명을 입력하세요"
                className="resize-none min-h-[80px]"
              />
            </FormField>
          </FormGrid>
        </DetailPanel>
      );
    }

    // ----------------------------------------------------
    // [CASE 1] 시설 상세
    // ----------------------------------------------------
    if (isFacilitySelected && selectedFacility) {
      return (
        <DetailPanel
          icon={Factory}
          title={selectedFacility.name}
          subTitle={
            <Badge className="bg-indigo-50 text-indigo-600 border-indigo-200">
              Facility
            </Badge>
          }
          mode={isEditing ? "edit" : "view"}
          onEdit={() => setIsEditing(true)}
          onCancel={() => setIsEditing(false)}
          onSave={() => setIsEditing(false)}
        >
          <FormGrid>
            <FormSectionHeader title="시설 개요" icon={Factory} />
            <FormField label="시설 명칭">
              <Input
                defaultValue={selectedFacility.name}
                disabled={!isEditing}
              />
            </FormField>
            <FormField label="시설 코드">
              <Input
                defaultValue={selectedFacility.code}
                disabled
                className="bg-slate-100/50 font-mono"
              />
            </FormField>
            <FormField label="주소" fullWidth>
              <Input
                defaultValue={selectedFacility.address}
                disabled={!isEditing}
              />
            </FormField>
          </FormGrid>
        </DetailPanel>
      );
    }

    // ----------------------------------------------------
    // [CASE 2] 공간 상세
    // ----------------------------------------------------
    if (!isFacilitySelected && selectedSpace) {
      const functionName = SPACE_FUNCTIONS.find(
        (f) => f.id === selectedSpace.space_function_id,
      )?.name;

      return (
        <DetailPanel
          icon={MapPin}
          title={selectedSpace.name}
          subTitle={
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center flex-wrap gap-1">
                {/* 1. 시설 이름 */}
                <Badge
                  variant="secondary"
                  className="bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border-indigo-200"
                >
                  {selectedFacility?.name}
                </Badge>

                {/* 2. 상위 공간 */}
                {parentSpace && (
                  <>
                    <ChevronRight className="h-3 w-3 text-slate-300" />
                    <Badge
                      variant="outline"
                      className="bg-white text-slate-600 border-slate-200"
                    >
                      {parentSpace.name}
                    </Badge>
                  </>
                )}

                {/* 3. 기능 역할 */}
                {functionName && (
                  <>
                    <span className="text-slate-300 mx-1">|</span>
                    <Badge className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border-emerald-200 gap-1 pl-1.5">
                      <Tag className="h-3 w-3" />
                      {functionName}
                    </Badge>
                  </>
                )}
              </div>

              {!isEditing && (
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "h-7 w-7 p-0 ml-2 shrink-0",
                    hasChildren
                      ? "text-slate-300 cursor-not-allowed"
                      : "text-red-500 hover:bg-red-50",
                  )}
                  disabled={hasChildren}
                  title={hasChildren ? "하위 공간이 있어 삭제 불가" : "삭제"}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!hasChildren && confirm("정말 삭제하시겠습니까?")) {
                      alert("삭제되었습니다.");
                    }
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          }
          mode={isEditing ? "edit" : "view"}
          onEdit={() => setIsEditing(true)}
          onCancel={() => setIsEditing(false)}
          onSave={() => setIsEditing(false)}
        >
          <FormGrid>
            <FormSectionHeader title="공간 정보" icon={Settings} />
            <FormField label="명칭">
              <Input defaultValue={selectedSpace.name} disabled={!isEditing} />
            </FormField>

            <FormField label="관리 코드">
              <Input
                defaultValue={selectedSpace.code}
                disabled
                className="bg-slate-100/50 font-mono text-slate-500"
              />
            </FormField>

            <FormSelect
              label="기능 역할"
              value={String(selectedSpace.space_function_id || "none")}
              options={[
                { label: "선택 안함", value: "none" },
                ...SPACE_FUNCTIONS.map((f) => ({
                  label: f.name,
                  value: String(f.id),
                })),
              ]}
              disabled={!isEditing}
              onValueChange={() => {}}
            />

            <FormSectionHeader title="물리적 속성" icon={Maximize} />
            <FormSelect
              label="유형"
              value={String(selectedSpace.space_type_id)}
              options={SPACE_TYPES.map((t) => ({
                label: t.name,
                value: String(t.id),
              }))}
              disabled={!isEditing}
              onValueChange={() => {}}
            />
            <FormField label="면적 (m²)">
              <div className="relative">
                <Input
                  type="number"
                  defaultValue={selectedSpace.area_size}
                  disabled={!isEditing}
                  className="pr-8"
                />
                <span className="absolute right-3 top-2.5 text-xs text-slate-400">
                  m²
                </span>
              </div>
            </FormField>
            <FormField label="통제 구역">
              <div className="flex items-center justify-between h-9 px-3 rounded-lg border">
                <span className="text-sm">
                  {selectedSpace.is_restricted ? "통제 구역" : "일반 구역"}
                </span>
                {isEditing && (
                  <Switch
                    defaultChecked={selectedSpace.is_restricted}
                    onCheckedChange={() => {}}
                  />
                )}
              </div>
            </FormField>

            <FormField label="설명 / 메모" fullWidth>
              <Textarea
                defaultValue={selectedSpace.description}
                disabled={!isEditing}
                className="resize-none min-h-[80px]"
              />
            </FormField>
          </FormGrid>
        </DetailPanel>
      );
    }
    return (
      <div className="p-10 text-center text-slate-400">항목을 선택하세요</div>
    );
  };

  // ----------------------------------------------------------------------
  // 5. Main Layout
  // ----------------------------------------------------------------------

  const leftPanel = (
    <SidePanel
      title="시설 및 공간"
      onSearch={setSearchTerm}
      isExpanded={isAllExpanded}
      onToggleExpand={handleToggleExpandAll}
      actions={
        <div className="flex items-center ml-1">
          <ToolbarButton
            icon={Plus}
            onClick={() => handleCreate("sibling")}
            title="동일 레벨에 추가 (시설 등록 또는 형제 추가)"
            className="hover:bg-slate-100 hover:text-slate-700"
          />

          <ToolbarButton
            icon={CornerDownRight}
            onClick={() => handleCreate("child")}
            title="하위 항목 추가 (자식)"
            className="ml-1 hover:bg-slate-100 hover:text-slate-700"
          />
        </div>
      }
    >
      <NavTree
        nodes={treeNodes}
        openItems={openItems}
        onToggle={handleToggle}
        selectedId={selectedKey}
        onSelect={handleSelectNode}
        renderItem={renderNodeContent}
      />
    </SidePanel>
  );

  return (
    <AppContent
      title="공간 관리 (Space Management)"
      toolbar={
        <Toolbar>
          <ToolbarButton icon={Printer} />
        </Toolbar>
      }
      leftPanel={leftPanel}
      rightPanel={renderRightPanelContent()}
      className="h-[calc(100vh-57px)] overflow-hidden"
    />
  );
}
