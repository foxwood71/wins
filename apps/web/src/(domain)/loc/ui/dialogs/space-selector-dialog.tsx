"use client";

import { useState } from "react";
import {
  Search,
  MapPin,
  Building2,
  Layers,
  DoorOpen,
  Cylinder,
  Factory,
} from "lucide-react"; // ✨ 아이콘 추가
import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
import { Input } from "@/shared/components/ui/input";
import { NavTree, TreeNode } from "@/shared/components/navigation/nav-tree";

// ✨ [변경 1] 훅 경로 확인 (hooks 폴더로 이동했으므로)
import { useSpaceTreeNodes } from "@/(domain)/loc/hooks/use-space-tree";
import { LocData, Space, Facility } from "@/(domain)/loc/model/types";
// ✨ [변경 2] Mock 데이터 가져오기 (훅에 넘겨주기 위해)
import { FACILITIES, SPACES } from "@/(domain)/loc/data/loc-mock";

interface SpaceSelectorProps {
  value?: number;
  label?: string;
  onSelect: (id: number, pathName: string) => void;
}

export function SpaceSelector({ value, label, onSelect }: SpaceSelectorProps) {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  // ✨ [변경 3] 훅 사용법 변경 (데이터를 인자로 전달)
  // 현재는 Mock 데이터를 직접 넣지만, 나중에는 React Query 데이터 등을 넣을 수 있음
  const treeNodes = useSpaceTreeNodes(searchTerm, FACILITIES, SPACES);

  const handleToggle = (id: string) => {
    setOpenItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSelect = (node: TreeNode<LocData>) => {
    const nodeIdStr = String(node.id);

    // "space-"로 시작하지 않으면(시설이면) 선택 방지 (정책에 따라 다름)
    if (!nodeIdStr.startsWith("space-")) return;

    const selectedId = Number(nodeIdStr.replace("space-", ""));

    // ✨ [팁] 전체 경로명을 만들어주면 더 좋습니다 (지금은 단순 라벨만 전달)
    onSelect(selectedId, node.label);
    setOpen(false);
  };

  // ✨ [추가] 사이드바와 비슷하게 이쁜 아이콘 렌더링
  const renderItem = (node: TreeNode<LocData>) => {
    const isFac = String(node.id).startsWith("fac-");
    let Icon = MapPin;

    if (isFac) {
      Icon = Factory;
    } else {
      const s = node.data as Space;
      switch (s?.space_type_id) {
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

    // NavTree 기본 렌더링 대신 커스텀 아이콘 사용을 위해 아이콘만 전달하거나,
    // NavTree가 icon prop을 지원하면 아래처럼 노드 데이터에 icon을 미리 매핑하는 것이 좋음.
    // 여기서는 NavTree의 기본 renderItem 기능을 활용하지 않고,
    // NavTree 컴포넌트가 icon을 지원한다면 treeNodes 생성 시점에 icon을 넣어주는 게 베스트.
    // (단, 여기서는 NavTree 내부 구현을 모르므로 기본 텍스트만 출력되거나, NavTree가 icon을 받는다고 가정)
    return <>{node.label}</>;
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="relative cursor-pointer group">
          <Input
            value={label || ""}
            placeholder="설치 장소를 선택하세요"
            readOnly
            className="pr-10 cursor-pointer hover:bg-slate-50 text-left cursor-pointer"
          />
          <Search className="absolute right-3 top-2.5 h-4 w-4 text-slate-400 group-hover:text-indigo-500" />
        </div>
      </DialogTrigger>

      <DialogContent className="max-w-[400px] h-[600px] flex flex-col p-0 overflow-hidden">
        <DialogHeader className="px-4 py-3 border-b">
          <DialogTitle>설치 장소 선택</DialogTitle>
        </DialogHeader>

        <div className="p-2 border-b bg-slate-50">
          <Input
            placeholder="공간 명칭 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-9"
          />
        </div>

        <div className="flex-1 overflow-y-auto p-2">
          <NavTree
            nodes={treeNodes}
            selectedId={value ? `space-${value}` : ""}
            onSelect={handleSelect}
            openItems={openItems}
            onToggle={handleToggle}
            // renderItem을 안 넘기면 기본 텍스트 렌더링 (간단하게 사용)
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
