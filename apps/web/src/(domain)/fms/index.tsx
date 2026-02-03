"use client";

import { useEquipment } from "./hooks/use-equipment";
import { EquipmentManagementView } from "./ui/equipment-management-view";
import { EQUIPMENT_DATA } from "./data/equipment-mock";

/**
 * EquipmentManagement: 장비 관리 도메인의 메인 엔트리 포인트입니다.
 * 비즈니스 로직(Hook)과 표현부(MainView)를 결합합니다.
 */
export default function EquipmentManagement() {
  const { filteredData, selectedItem, searchTerm, handleSelect, handleSearch } =
    useEquipment(EQUIPMENT_DATA);

  return (
    <EquipmentManagementView
      data={filteredData} // 필터링된 목록 데이터
      selectedItem={selectedItem} // 현재 선택된 상세 아이템
      searchTerm={searchTerm} // 현재 검색어
      onSelect={handleSelect} // 아이템 선택 핸들러
      onSearchChange={handleSearch} // 검색어 변경 핸들러
    />
  );
}
