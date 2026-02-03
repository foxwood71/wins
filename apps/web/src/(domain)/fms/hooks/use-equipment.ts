import { useState, useMemo } from "react";
import { Equipment } from "../model/types";

export function useEquipment(initialData: Equipment[]) {
  const [searchTerm, setSearchTerm] = useState("");
  // ✨ selectedId 상태를 number | null 타입으로 변경
  const [selectedId, setSelectedId] = useState<number | null>(
    initialData[0]?.id ?? null,
  );

  const filteredData = useMemo(() => {
    return initialData.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.model.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [initialData, searchTerm]);

  const selectedItem = useMemo(() => {
    return initialData.find((item) => item.id === selectedId);
  }, [initialData, selectedId]);

  // ✨ handleSelect의 인자 id의 타입을 number로 변경
  const handleSelect = (id: number) => {
    setSelectedId(id);
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  return {
    filteredData,
    selectedItem,
    searchTerm,
    handleSelect,
    handleSearch,
  };
}
