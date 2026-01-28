"use client";

import { useState } from "react";
import { Search } from "lucide-react";
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
import { useSpaceTreeNodes } from "../../hooks/use-space-tree"; // 공간 트리 훅 (새로 만듦)
import { LocData } from "../../model/types";

interface SpaceSelectorProps {
  value?: number; // 현재 선택된 space_id
  label?: string; // 현재 선택된 장소의 이름 (예: 유입동 > 펌프실)
  onSelect: (id: number, pathName: string) => void; // 부모에게 선택값 전달
}

export function SpaceSelector({ value, label, onSelect }: SpaceSelectorProps) {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  // 트리의 열림/닫힘 상태를 관리하는 State
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  // 공간 데이터 트리 로드
  const treeNodes = useSpaceTreeNodes(searchTerm);

  // 트리를 열고 닫는 핸들러 함수
  const handleToggle = (id: string) => {
    setOpenItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSelect = (node: TreeNode<LocData>) => {
    // 1. 선택한 노드의 ID와 이름 가져오기
    // (실제로는 노드 데이터에서 전체 경로(Path)를 만들어주는 로직이 있으면 더 좋음)
    const nodeIdStr = String(node.id);

    // "space-"로 시작하지 않으면(즉, 시설이면) 선택 안 함

    if (!nodeIdStr.startsWith("space-")) return;

    // ID 파싱 (space-10 -> 10)
    const selectedId = Number(nodeIdStr.replace("space-", "")); // ID 파싱

    // 2. 부모 컴포넌트에 전달
    onSelect(selectedId, node.label);

    // 3. 팝업 닫기
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {/* 트리거: 클릭하면 팝업 열리는 인풋 박스 */}
        <div className="relative cursor-pointer group">
          <Input
            value={label || ""}
            placeholder="설치 장소를 선택하세요"
            readOnly
            className="pr-10 cursor-pointer hover:bg-slate-50"
          />
          <Search className="absolute right-3 top-2.5 h-4 w-4 text-slate-400 group-hover:text-indigo-500" />
        </div>
      </DialogTrigger>

      <DialogContent className="max-w-[400px] h-[600px] flex flex-col p-0 overflow-hidden">
        <DialogHeader className="px-4 py-3 border-b">
          <DialogTitle>설치 장소 선택</DialogTitle>
        </DialogHeader>

        {/* 검색창 */}
        <div className="p-2 border-b bg-slate-50">
          <Input
            placeholder="공간 명칭 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-8 text-xs"
          />
        </div>

        {/* 트리 영역 (스크롤 가능) */}
        <div className="flex-1 overflow-y-auto p-2">
          <NavTree
            nodes={treeNodes}
            selectedId={value ? `space-${value}` : ""}
            onSelect={handleSelect}
            openItems={openItems}
            onToggle={handleToggle}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
