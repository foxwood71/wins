"use client";

import React, { useState } from "react";
import { Printer, Settings, MapPin, Edit, Trash2 } from "lucide-react";

import {
  AppContent,
  Toolbar,
  ToolbarButton,
} from "@/shared/components/layout/app-content";

import { Button } from "@/shared/components/ui/button";
import { TreePanel } from "@/shared/components/layout/app-content/tree-panel";

import { useLocationManagement } from "@/loc/hooks/use-location-management";
import { Facility, Space } from "@/loc/model/types";

import {
  FacilityDetail,
  SpaceDetail,
} from "@/domain/loc/ui/views/management/detail";

export function LocationManagementView() {
  const { state, actions } = useLocationManagement();

  // 생성 모드 상태
  const [creationMode, setCreationMode] = useState<
    "facility" | "child" | "sibling" | null
  >(null);

  const [initialPayload, setInitialPayload] = useState<
    Partial<Facility> | Partial<Space>
  >({});

  // ----------------------------------------------------------------------
  // Handlers
  // ----------------------------------------------------------------------

  const handleCreateRequest = (mode: "facility" | "child" | "sibling") => {
    if (mode !== "facility" && !state.selectedData) {
      alert("상위 항목을 선택해주세요.");
      return;
    }

    const newCode =
      mode === "facility" ? `FAC-${Date.now()}` : `SPC-${Date.now()}`;

    // 초기값 설정 로직
    if (mode === "facility") {
      setInitialPayload({ is_active: true, code: newCode });
    } else {
      const selected = state.selectedData;
      let facilityId = 0;
      let parentId: number | null = null;

      if (selected) {
        if (selected.type === "facility") {
          facilityId = selected.id;
          parentId = null;
        } else {
          const s = selected as Space;
          facilityId = s.facility_id;
          parentId = mode === "child" ? s.id : s.parent_id;
        }
      }
      setInitialPayload({
        is_active: true,
        code: newCode,
        facility_id: facilityId,
        parent_id: parentId,
      });
    }
    setCreationMode(mode);
  };

  const handleCancel = () => {
    setCreationMode(null);
    setInitialPayload({});
  };

  const handleSave = async (data: Facility | Space) => {
    try {
      if (data.type === "facility")
        await actions.saveFacility(data as Facility);
      else await actions.saveSpace(data as Space);
      handleCancel();
    } catch (e) {
      console.error(e);
      alert("저장 실패");
    }
  };

  // ----------------------------------------------------------------------
  // Renderers
  // ----------------------------------------------------------------------

  const renderRightPanel = () => {
    // [Case 1] 생성 모드
    if (creationMode) {
      if (creationMode === "facility") {
        return (
          <FacilityDetail
            mode="create"
            facility={initialPayload as Partial<Facility>}
            onCancel={handleCancel}
            onSave={handleSave}
          />
        );
      } else {
        return (
          <SpaceDetail
            mode="create"
            space={initialPayload as Partial<Space>}
            ancestors={[]}
            onCancel={handleCancel}
            onSave={handleSave}
            onUpdateFunctions={() => {}}
            onUpdateTypes={() => {}}
          />
        );
      }
    }

    // [Case 2] 조회/수정 모드
    if (state.selectedData) {
      if (state.selectedData.type === "facility") {
        return (
          <FacilityDetail
            key={`fac-${state.selectedData.id}`}
            mode="view"
            facility={state.selectedData as Facility}
            onSave={handleSave}
            onCancel={() => {}}
            onDelete={actions.handleDelete}
          />
        );
      } else {
        return (
          <SpaceDetail
            key={`space-${state.selectedData.id}`}
            mode="view"
            space={state.selectedData as Space}
            onSave={handleSave}
            onCancel={() => {}}
            onDelete={actions.handleDelete}
            onUpdateFunctions={() => {}}
            onUpdateTypes={() => {}}
          />
        );
      }
    }

    // [Case 3] 선택 없음
    return (
      <div className="flex flex-col items-center justify-center h-full text-slate-400 bg-slate-50/30">
        <MapPin className="h-16 w-16 text-slate-200 mb-6" />
        <h3 className="text-lg font-semibold text-slate-600">
          위치 관리 시작하기
        </h3>
      </div>
    );
  };

  return (
    <AppContent
      title="위치/공간 관리"
      toolbar={
        <Toolbar>
          <ToolbarButton icon={Printer} title="출력" />
          <ToolbarButton icon={Settings} title="설정" />
        </Toolbar>
      }
      leftPanel={
        // ✅ [변경 2] LocationTreeView 제거 -> TreePanel 사용
        <TreePanel
          title="공간 탐색"
          className="bg-white border-r h-full"
          // 1. 데이터 연결
          data={state.treeData}
          selectedId={state.selectedNodeId}
          isAllExpanded={state.isAllExpanded}
          // 2. 기본 동작
          onSearch={actions.setSearchTerm}
          onSelect={(id) => {
            actions.handleSelectNode(id);
            setCreationMode(null);
          }}
          onToggleExpand={actions.handleToggleAll}
          // 3. 툴바 액션 연결
          onCreate={() => handleCreateRequest("facility")}
          onDelete={actions.handleDelete}
          disableDelete={!state.selectedNodeId}
          // 4. ✨ [커스텀] 상태 배지 로직 (active 상태에 따라 색상 변경)
          getItemBadge={(item) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const data = item.data as any; // Facility | Space
            // is_active가 true면 운영(초록), false면 중지(회색)
            if (data?.is_active === undefined) return null;

            return data.is_active
              ? {
                  label: "운영",
                  variant: "outline",
                  className:
                    "bg-emerald-50 text-emerald-600 border-emerald-200",
                }
              : {
                  label: "중지",
                  variant: "outline",
                  className: "bg-slate-50 text-slate-500 border-slate-200",
                };
          }}
          // 5. ✨ [커스텀] 호버 액션 버튼 (수정/삭제)
          renderItemActions={(item) => (
            <>
              {/* 수정 버튼: 클릭 시 해당 노드 선택 (이미 상세화면이 떠 있으므로 자동 편집 모드 진입 효과) */}
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 hover:text-indigo-600 hover:bg-indigo-50"
                onClick={() => {
                  actions.handleSelectNode(item.id);
                  setCreationMode(null);
                }}
              >
                <Edit className="h-3.5 w-3.5" />
              </Button>

              {/* 삭제 버튼: 삭제 로직 호출 */}
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 hover:text-red-600 hover:bg-red-50"
                onClick={() => {
                  // 삭제하려면 먼저 선택 상태여야 Hook이 인식함 (간이 로직)
                  actions.handleSelectNode(item.id);
                  // state 업데이트 후 삭제 호출을 위해 setTimeout 사용하거나,
                  // Hook의 delete 함수가 id를 인자로 받도록 개선하면 더 좋음.
                  // 현재는 UI 흐름상 선택 -> 확인창 뜨는 방식으로 연결.
                  setTimeout(() => actions.handleDelete(), 0);
                }}
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </>
          )}
        />
      }
      rightPanel={renderRightPanel()}
      className="h-[calc(100vh-57px)] overflow-hidden"
    />
  );
}
