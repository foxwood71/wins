import { DeptManagementView } from "@/domain/user/ui/dept-management-view";

/**
 * 시스템 관리 > 부서 관리 페이지
 * 도메인 영역의 DeptManagementView 컴포넌트를 렌더링합니다.
 */
export default function DepartmentPage() {
  return (
    <main className="h-full w-full overflow-hidden">
      <DeptManagementView />
    </main>
  );
}
