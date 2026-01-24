import EquipmentManagement from "@/domain/equipment";

export default function EquipmentPage() {
  return (
    // 헤더 높이를 제외한 영역에 장비 관리 모듈을 배치합니다.
    <div className="h-[calc(100vh-4rem)] bg-slate-50/30 overflow-hidden">
      <EquipmentManagement />
    </div>
  );
}
