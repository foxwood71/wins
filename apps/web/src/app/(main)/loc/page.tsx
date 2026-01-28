//import { Metadata } from "next";
import { SpaceManagementView } from "@/domain/loc";

// 브라우저 탭 제목 설정 (Server Component 기능)
// export const metadata: Metadata = {
//   title: "공간 관리 | WIMS",
//   description: "시설 및 공간 계층 구조를 관리합니다.",
// };

export default function SpacePage() {
  return (
    // 헤더 높이를 제외한 영역에 장비 관리 모듈을 배치합니다.
    <div className="h-[calc(100vh-4rem)] bg-slate-50/30 overflow-hidden">
      <SpaceManagementView />
    </div>
  );
}
