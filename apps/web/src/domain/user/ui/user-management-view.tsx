"use client";

import React, { useState, useMemo } from "react";
import {
  Plus,
  Trash2,
  Printer,
  UserCircle,
  CheckCircle2,
  Building2,
  KeyRound,
  Eye,
  EyeOff,
  Landmark,
  UserRound,
  MapPin,
  Briefcase,
} from "lucide-react";

import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Badge } from "@/shared/components/ui/badge";

// ✨ [Dynamic Filter]
import { FilterConfig, FilterValues } from "@/shared/components/dynamic-filter";

import {
  AppContent,
  SidePanel,
  DetailPanel,
  Toolbar,
  ToolbarButton,
  FormGrid,
  FormField,
  FormSelect,
  FormSectionHeader,
} from "@/shared/components/layout/app-content";

// [Navigation]
import { NavTree, TreeNode } from "@/shared/components/navigation/nav-tree";
import { useUserTreeNodes } from "../hooks/use-org-tree-nodes";

// Data & Types
import { User, UserRole, OrgData } from "../model/types";
import { USERS, DEPARTMENTS, CENTERS, SECTORS } from "../data/user-mock";

export function UserManagementView() {
  // --- [State] ---
  const [selectedId, setSelectedId] = useState<number>(USERS[0].id);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilters, setActiveFilters] = useState<FilterValues>({}); // 필터 상태

  const [showPassword, setShowPassword] = useState(false);
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const [isEditing, setIsEditing] = useState(false);
  const [isAllExpanded, setIsAllExpanded] = useState(false);

  // Form States
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [selectedSectorId, setSelectedSectorId] = useState<number>(0);
  const [selectedCenterId, setSelectedCenterId] = useState<number | null>(null);
  const [selectedDeptId, setSelectedDeptId] = useState<number>(0);

  // --- [Config] Filters ---
  const USER_FILTERS: FilterConfig[] = useMemo(
    () => [
      {
        key: "sector_id",
        label: "소속 부문",
        type: "select",
        options: SECTORS.map((s) => ({ label: s.name, value: String(s.id) })),
      },
      {
        key: "center_id",
        label: "소속 센터",
        type: "select",
        options: CENTERS.map((c) => ({ label: c.name, value: String(c.id) })),
      },
      {
        key: "role",
        label: "사용자 권한",
        type: "select",
        options: [
          { label: "최고 관리자", value: String(UserRole.SUPER_ADMIN) },
          { label: "중간 관리자", value: String(UserRole.ADMIN) },
          { label: "일반 사용자", value: String(UserRole.USER) },
        ],
      },
      {
        key: "status",
        label: "계정 상태",
        type: "select",
        options: [
          { label: "정상 (Active)", value: "active" },
          { label: "잠김 (Locked)", value: "locked" },
          { label: "휴면 (Inactive)", value: "inactive" },
        ],
      },
    ],
    [],
  );

  // --- [Logic] ---
  const selectedUser = USERS.find((u: User) => u.id === selectedId);

  // 트리 데이터 Hook
  const treeNodes = useUserTreeNodes(searchTerm);

  // --- [Handlers] ---
  const toggleItem = (key: string) => {
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleToggleTree = () => {
    if (isAllExpanded) {
      setOpenItems({});
      setIsAllExpanded(false);
    } else {
      const keys: Record<string, boolean> = {};
      SECTORS.forEach((s) => (keys[`sector-${s.id}`] = true));
      CENTERS.forEach((c) => (keys[`center-${c.id}`] = true));
      DEPARTMENTS.forEach((d) => (keys[`dept-${d.id}`] = true));
      setOpenItems(keys);
      setIsAllExpanded(true);
    }
  };

  const handleSelectNode = (node: TreeNode<OrgData>) => {
    // 1. 자식이 없고 (Leaf Node)
    // 2. data에 'login_id'가 있으면 -> User 타입
    if (!node.children && node.data && "login_id" in node.data) {
      const user = node.data as User;
      setSelectedId(user.id);

      // 선택된 사용자의 소속 정보로 폼 상태 업데이트
      const dept = DEPARTMENTS.find((d) => d.id === user.department_id);
      if (dept) {
        setSelectedSectorId(dept.sector_id || 0);
        setSelectedCenterId(dept.center_id || null);
        setSelectedDeptId(dept.id);
      }

      setIsEditing(false);
      setPassword("");
      setPasswordConfirm("");
    }
  };

  const handleFilterChange = (newFilters: FilterValues) => {
    setActiveFilters(newFilters);
    console.log("User Filters:", newFilters);
  };

  const handleSave = () => {
    if (password && password !== passwordConfirm) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    setIsEditing(false);
    // API Call...
  };

  const getRoleInfo = (role: number) => {
    if (role === UserRole.SUPER_ADMIN)
      return {
        label: "최고관리자",
        color: "bg-rose-50 text-rose-600 border-rose-100",
      };
    if (role === UserRole.ADMIN)
      return {
        label: "관리자",
        color: "bg-violet-50 text-violet-600 border-violet-100",
      };
    return {
      label: "일반사용자",
      color: "bg-slate-50 text-slate-600 border-slate-100",
    };
  };

  // ✨ [Render Item] 사용자 카드 디자인 적용
  const renderNodeContent = (node: TreeNode<OrgData>) => {
    const isSelected = String(node.data?.id) === String(selectedId); // ID 비교 수정

    // 데이터 타입 확인
    const isUser = node.data && "login_id" in node.data;

    // 1. 사용자(User)인 경우 -> 카드 스타일 적용
    if (isUser) {
      const user = node.data as User;
      const isActive = user.status === "active";

      return (
        <div
          onClick={(e) => {
            e.stopPropagation();
            handleSelectNode(node);
          }}
          className={cn(
            // 높이 80% 축소 (p-2, mb-1), 테두리 투명 처리
            "flex items-center p-2 mb-1 rounded-xl border transition-all cursor-pointer group relative select-none",
            isSelected
              ? "bg-white border-indigo-500 ring-1 ring-indigo-500/20 shadow-md z-10"
              : "bg-white border-transparent hover:bg-slate-50 hover:border-slate-200",
          )}
        >
          {/* 아이콘 박스 (배경 없음, 같은 크기) */}
          <div
            className={cn(
              "h-8 w-8 flex items-center justify-center shrink-0 mr-2.5 transition-colors",
              isSelected
                ? "text-indigo-600"
                : "text-slate-400 group-hover:text-indigo-500",
            )}
          >
            <UserRound className="h-4 w-4" />
          </div>

          {/* 텍스트 정보 */}
          <div className="flex-1 min-w-0 flex flex-col justify-center">
            <span
              className={cn(
                "text-[13px] font-bold truncate leading-tight",
                isSelected ? "text-slate-900" : "text-slate-700",
              )}
            >
              {user.name}
            </span>
            <span className="text-[11px] font-bold text-slate-400 mt-[1px] truncate font-mono">
              {user.login_id}
            </span>
          </div>

          {/* 상태 아이콘 */}
          <div className="ml-2.5 shrink-0 flex items-center">
            {isActive ? (
              <CheckCircle2 className="h-4.5 w-4.5 text-emerald-500" />
            ) : (
              <div
                className="h-4.5 w-4.5 rounded-full border-2 border-slate-200 bg-slate-50 flex items-center justify-center"
                title="비활성"
              >
                <div className="h-1.5 w-1.5 rounded-full bg-slate-300" />
              </div>
            )}
          </div>
        </div>
      );
    }

    // 2. 부서(Dept)이지만 자식이 없어 Leaf로 렌더링 되는 경우 (빈 부서)
    // 간단한 폴더 형태로 표시
    return (
      <div className="flex items-center py-1.5 px-2 text-slate-500 gap-2">
        <Briefcase className="h-4 w-4" />
        <span className="text-[13px] font-medium">{node.label}</span>
      </div>
    );
  };

  // --- [UI Layout] ---
  const leftPanel = (
    <SidePanel
      title="사용자 현황"
      // ✨ Search & Filter Integration
      onSearch={setSearchTerm}
      filterConfigs={USER_FILTERS}
      onFilterChange={handleFilterChange}
      isExpanded={isAllExpanded}
      onToggleExpand={handleToggleTree}
      actions={
        <ToolbarButton
          icon={Plus}
          className="bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg h-8 w-8 ml-1"
        />
      }
    >
      <NavTree
        title="" // 내부 타이틀 제거
        nodes={treeNodes}
        openItems={openItems}
        onToggle={toggleItem}
        selectedId={selectedId}
        onSelect={handleSelectNode}
        renderItem={renderNodeContent} // ✨ 커스텀 렌더러 전달
      />
    </SidePanel>
  );

  const rightPanel = (
    <DetailPanel
      icon={UserCircle}
      title={selectedUser?.name || "사용자를 선택하세요"}
      subTitle={
        selectedUser && (
          <div className="flex items-center flex-wrap gap-2">
            <Badge className="bg-indigo-50 text-indigo-600 border-indigo-100 font-bold gap-1.5 py-1 px-3">
              <Landmark className="h-3.5 w-3.5" />{" "}
              {SECTORS.find((s) => s.id === selectedSectorId)?.name}
            </Badge>
            {selectedCenterId && (
              <Badge className="bg-blue-50 text-blue-600 border-blue-100 font-bold gap-1.5 py-1 px-3">
                <MapPin className="h-3.5 w-3.5" />{" "}
                {CENTERS.find((c) => c.id === selectedCenterId)?.name}
              </Badge>
            )}
            <Badge
              className={cn(
                "font-bold py-1 px-3 shadow-sm",
                getRoleInfo(selectedUser.role).color,
              )}
            >
              {getRoleInfo(selectedUser.role).label}
            </Badge>
            <Badge className="bg-emerald-50 text-emerald-700 border-emerald-100 font-bold gap-1.5 py-1 px-3">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> 정상
              계정
            </Badge>
          </div>
        )
      }
      mode={isEditing ? "edit" : "view"}
      onEdit={() => setIsEditing(true)}
      onCancel={() => {
        setIsEditing(false);
        setPassword("");
        setPasswordConfirm("");
      }}
      onSave={handleSave}
      tabs={
        <div className="flex gap-6">
          <div className="px-4 pb-3 text-[13px] font-bold border-b-2 border-indigo-600 text-indigo-600">
            계정 상세 정보
          </div>
          <div className="px-4 pb-3 text-[13px] font-bold text-slate-400 hover:text-slate-600 cursor-pointer">
            권한 설정
          </div>
        </div>
      }
    >
      {selectedUser ? (
        <FormGrid>
          <FormSectionHeader title="기본 프로필" icon={UserRound} />
          <FormField label="성명">
            <Input
              defaultValue={selectedUser.name}
              disabled={!isEditing}
              className="h-9 rounded-lg"
            />
          </FormField>
          <FormField label="아이디">
            <Input
              defaultValue={selectedUser.login_id}
              disabled
              className="h-9 bg-slate-100/50 rounded-lg font-mono text-slate-500"
            />
          </FormField>
          <FormField label="연락처">
            <Input
              defaultValue={selectedUser.phone || ""}
              disabled={!isEditing}
              className="h-9 rounded-lg"
            />
          </FormField>
          <FormField label="사번/코드">
            <Input
              defaultValue={selectedUser.code || ""}
              disabled={!isEditing}
              className="h-9 rounded-lg"
            />
          </FormField>

          <FormSectionHeader title="소속 및 권한" icon={Building2} />
          <FormSelect
            label="부문"
            value={String(selectedSectorId)}
            options={SECTORS.map((s) => ({
              label: s.name,
              value: String(s.id),
            }))}
            disabled={!isEditing}
            onValueChange={(val) => {
              setSelectedSectorId(Number(val));
              setSelectedCenterId(null);
              setSelectedDeptId(0);
            }}
          />
          <FormSelect
            label="센터"
            value={selectedCenterId ? String(selectedCenterId) : "none"}
            options={[
              { label: "없음 (본사직영)", value: "none" },
              ...CENTERS.filter((c) => c.sector_id === selectedSectorId).map(
                (c) => ({ label: c.name, value: String(c.id) }),
              ),
            ]}
            disabled={!isEditing}
            onValueChange={(val) => {
              setSelectedCenterId(val === "none" ? null : Number(val));
              setSelectedDeptId(0);
            }}
          />
          <FormSelect
            label="부서"
            value={String(selectedDeptId)}
            options={DEPARTMENTS.filter((d) =>
              selectedCenterId
                ? d.center_id === selectedCenterId
                : d.sector_id === selectedSectorId && !d.center_id,
            ).map((d) => ({ label: d.name, value: String(d.id) }))}
            disabled={!isEditing || !selectedSectorId}
            onValueChange={(val) => setSelectedDeptId(Number(val))}
          />

          <FormSectionHeader title="보안 설정" icon={KeyRound} />
          <FormField label="새 비밀번호">
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={!isEditing}
                placeholder={isEditing ? "변경 시에만 입력" : "비공개 정보"}
                className="h-9 pr-10 font-mono"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </FormField>
          <FormField label="비밀번호 확인">
            <Input
              type="password"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              disabled={!isEditing}
              placeholder={isEditing ? "비밀번호 재입력" : ""}
              className={cn(
                "h-9 font-mono",
                password &&
                  password !== passwordConfirm &&
                  "border-red-300 ring-1 ring-red-100",
              )}
            />
          </FormField>
        </FormGrid>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 text-slate-300">
          <UserCircle className="h-16 w-16 mb-4 opacity-20" />
          <p className="font-medium text-[15px]">사용자를 선택해 주세요</p>
        </div>
      )}
    </DetailPanel>
  );

  return (
    <AppContent
      title="사용자 관리"
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
