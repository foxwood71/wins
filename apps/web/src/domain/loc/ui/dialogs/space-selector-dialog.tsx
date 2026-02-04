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
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
import { Input } from "@/shared/components/ui/input";
import { NavTree, TreeNode } from "@/shared/components/navigation/nav-tree";

// [수정] Mock import 제거 -> 타입 import만 유지
import { useSpaceTreeNodes } from "@/loc/hooks/use-space-tree";
import { LocData, Space, Facility } from "@/loc/model/types";

interface SpaceSelectorProps {
  value?: number;
  label?: string;
  onSelect: (id: number, pathName: string) => void;
  // [추가] 부모로부터 데이터를 받아야 함
  facilities: Facility[];
  spaces: Space[];
}

export function SpaceSelector({
  value,
  label,
  onSelect,
  facilities, // props
  spaces, // props
}: SpaceSelectorProps) {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  // [수정] Props로 받은 데이터 사용
  const treeNodes = useSpaceTreeNodes(searchTerm, facilities, spaces);

  const handleToggle = (id: string) => {
    setOpenItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSelect = (node: TreeNode<LocData>) => {
    const nodeIdStr = String(node.id);
    if (!nodeIdStr.startsWith("space-")) return;

    const selectedId = Number(nodeIdStr.replace("space-", ""));
    onSelect(selectedId, node.label);
    setOpen(false);
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
            // renderItem을 생략하여 기본 텍스트 렌더링 사용 (간단화)
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
