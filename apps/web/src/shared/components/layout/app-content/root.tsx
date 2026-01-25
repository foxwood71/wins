"use client";

import React from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/shared/components/ui/resizable";
import { cn } from "@/shared/lib/utils";

interface AppContentProps {
  title: string;
  toolbar?: React.ReactNode;
  leftPanel: React.ReactNode;
  rightPanel: React.ReactNode;
  className?: string;
}

export function AppContent({
  title,
  toolbar,
  leftPanel,
  rightPanel,
  className,
}: AppContentProps) {
  return (
    <div
      className={cn(
        "flex flex-col h-full w-full bg-white overflow-hidden font-sans text-slate-900",
        className,
      )}
    >
      {/* Header */}
      <header className="h-12 bg-white px-4 flex items-stretch justify-between shrink-0 z-30 border-b border-slate-100">
        <h1 className="text-lg font-bold text-slate-800 tracking-tight flex items-center pt-3">
          {title}
        </h1>
        <div className="flex items-center pt-3 gap-2">{toolbar}</div>
      </header>

      {/* Main */}
      <div className="flex-1 overflow-hidden bg-slate-50/50">
        <ResizablePanelGroup
          direction="horizontal"
          className="h-full items-stretch gap-0"
        >
          {/* Left Panel */}
          <ResizablePanel
            defaultSize={25}
            minSize={20}
            maxSize={35}
            className="min-w-[300px]"
          >
            <div className="h-full p-4 pr-1">
              <div className="flex flex-col h-full bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                {leftPanel}
              </div>
            </div>
          </ResizablePanel>

          <ResizableHandle className="w-0 bg-transparent" />

          {/* Right Panel*/}
          <ResizablePanel defaultSize={75}>
            {/* ✨ [수정 포인트]
               1. overflow-y-auto 제거 -> 스크롤은 DetailPanel 내부에서 처리
               2. overflow-hidden 추가 -> 패널 밖으로 나가는 것 방지
               3. min-w-0 추가 -> ⭐ 핵심! 내부 컨텐츠가 패널보다 커도 강제로 줄어들게 허용
            */}
            <div className="flex flex-col h-full overflow-hidden p-4 pl-1 min-w-0">
              {rightPanel}
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
}
