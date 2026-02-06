"use client";

import React from "react";
import {
  Facility,
  Space,
  SpaceFunction,
  SpaceType,
  FacilityCategory,
} from "@/loc/model/types";
import { FacilityDetail } from "./facility-detail";
import { SpaceDetail } from "./space-detail";

interface LocationDetailContainerProps {
  selectedData: Facility | Space;
  ancestors?: Space[];

  isEditing: boolean; // 컨테이너는 여전히 boolean으로 받을 수 있음
  onEdit: () => void;
  onCancel: () => void;
  onSave: (data: Facility | Space) => void;
  onDelete: () => void;

  spaceFunctions?: SpaceFunction[];
  onUpdateFunctions: (funcs: SpaceFunction[]) => void;
  spaceTypes?: SpaceType[];
  onUpdateTypes: (types: SpaceType[]) => void;
  facilityCategories?: FacilityCategory[];
  onUpdateFacilityCategories?: (cats: FacilityCategory[]) => void;
}

export function LocationDetailContainer(props: LocationDetailContainerProps) {
  const { selectedData } = props;

  // 🟢 [Fix] boolean 상태를 컴포넌트가 원하는 mode 문자열로 변환
  const viewMode = props.isEditing ? "edit" : "view";

  // 1. 시설 (Facility)
  if (selectedData.type === "facility") {
    return (
      <FacilityDetail
        facility={selectedData as Facility}
        mode={viewMode} // 👈 isEditing 대신 mode 전달
        onEdit={props.onEdit}
        onCancel={props.onCancel}
        onSave={props.onSave as (data: Facility) => void}
        onDelete={props.onDelete}
        facilityCategories={props.facilityCategories}
        onUpdateFacilityCategories={props.onUpdateFacilityCategories}
      />
    );
  }

  // 2. 공간 (Space)
  return (
    <SpaceDetail
      space={selectedData as Space}
      ancestors={props.ancestors || []}
      mode={viewMode} // 👈 isEditing 대신 mode 전달
      onEdit={props.onEdit}
      onCancel={props.onCancel}
      onSave={props.onSave as (data: Space) => void}
      onDelete={props.onDelete}
      spaceFunctions={props.spaceFunctions || []}
      onUpdateFunctions={props.onUpdateFunctions}
      spaceTypes={props.spaceTypes || []}
      onUpdateTypes={props.onUpdateTypes}
    />
  );
}
