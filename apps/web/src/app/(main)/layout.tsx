import { AppSidebar } from "@/shared/components/layout/app-sidebar";
import { AppHeader } from "@/shared/components/layout/app-header";
import { SidebarInset, SidebarProvider } from "@/shared/components/ui/sidebar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {/* 1. SidebarProvider: 사이드바의 열림/닫힘 상태(쿠키 등)를 관리하는 컨텍스트*/}
      <SidebarProvider>
        {/* 2. AppSidebar: 우리가 만든 좌측 사이드바 메뉴 */}
        <AppSidebar />

        {/* 3. SidebarInset: 사이드바를 제외한 나머지 메인 영역 (헤더 + 컨텐츠) */}
        <SidebarInset>
          {/* 4. AppHeader: 상단바 (햄버거 버튼, 브레드크럼, 사용자 메뉴 등 포함) */}
          <AppHeader />

          {/* 5. 실제 페이지 컨텐츠 영역 (대시보드, 재고관리 등) */}
          <div className="flex flex-1 flex-col gap-4 pt-0">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
