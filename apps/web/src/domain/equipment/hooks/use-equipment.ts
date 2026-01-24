"use client";

import { useState, useMemo } from "react";
import { Equipment } from "../types";

export function useEquipment(initialData: Equipment[]) {
  // 1. 상태 관리 (검색어 및 선택된 장비 ID)
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedId, setSelectedId] = useState<string>(
    initialData.length > 0 ? initialData[0].id : "",
  );

  // 2. 검색 필터링 로직 (성능을 위해 useMemo 사용)
  const filteredData = useMemo(() => {
    return initialData.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.location.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [searchTerm, initialData]);

  // 3. 현재 선택된 아이템 정보 (필터링된 목록 내에서 찾거나 전체에서 찾음)
  const selectedItem = useMemo(() => {
    return initialData.find((item) => item.id === selectedId) || initialData[0];
  }, [selectedId, initialData]);

  // 4. 핸들러 함수들
  const handleSelect = (id: string) => {
    setSelectedId(id);
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    // 검색 시 선택된 아이템이 목록에서 사라질 수 있으므로 추가 로직을 넣을 수 있습니다.
  };

  return {
    filteredData,
    selectedItem,
    searchTerm,
    handleSelect,
    handleSearch,
  };
}
