import { UserManagementView } from "@/(domain)/user/ui/user-management-view";

/**
 * 시스템 관리 > 사용자 관리 페이지
 * 도메인 영역의 UserManagementView 컴포넌트를 렌더링합니다.
 */
export default function UserPage() {
  return (
    <main className="h-full w-full overflow-hidden">
      <UserManagementView />
    </main>
  );
}
