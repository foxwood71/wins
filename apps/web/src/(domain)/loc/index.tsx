/**
 * [Loc Domain Entry Point]
 * loc 도메인 내부의 복잡한 경로를 감추고,
 * 외부에서 필요한 컴포넌트와 타입만 깔끔하게 노출(Export)합니다.
 */

// 1. 메인 뷰 (페이지 라우터에서 사용)
export { SpaceManagementView } from "@/(domain)/loc/ui/views/space-management-view";

// 2. 공용 컴포넌트 (다른 도메인에서 장소 선택 팝업이 필요할 때 사용)
export { SpaceSelector } from "@/(domain)/loc/ui/dialogs/space-selector-dialog";

// 3. 타입 정의 (다른 도메인에서 Loc 데이터 타입이 필요할 때 사용)
// 예: import { LocData } from "@/domain/loc";
export * from "./model/types";

// 4. 훅 (다른 도메인에서 공간 트리 구조가 필요할 때 사용)
export { useSpaceTreeNodes } from "./hooks/use-space-tree";

// 5. 유틸리티 함수 (다른 도메인에서 loc 관련 유틸이 필요할 때 사용)
