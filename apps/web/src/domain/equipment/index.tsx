"use client";

import { useEquipment } from "./hooks/use-equipment";
import { MainView } from "./ui/main-view";
import { EQUIPMENT_DATA } from "./data/equipment-mock.ts";

/**
 * EquipmentManagement: 장비 관리 도메인의 메인 엔트리 포인트입니다.
 * 비즈니스 로직(Hook)과 표현부(MainView)를 결합합니다.
 */
export default function EquipmentManagement() {
  const { filteredData, selectedItem, searchTerm, handleSelect, handleSearch } =
    useEquipment(EQUIPMENT_DATA);

  return (
    <MainView
      data={filteredData}
      selectedItem={selectedItem}
      searchTerm={searchTerm}
      onSelect={handleSelect}
      onSearchChange={handleSearch}
    />
  );
}
