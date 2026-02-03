"use client";

import React, { useState } from "react";
import { Factory, MapPin, Settings, Maximize, Plus } from "lucide-react";
import {
  DetailPanel,
  FormGrid,
  FormField,
  FormSectionHeader,
  FormSelect,
} from "@/shared/components/layout/app-content";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import { Switch } from "@/shared/components/ui/switch";
import { Facility, Space } from "@/(domain)/loc/model/types";
import {
  SPACES,
  SPACE_TYPES,
  SPACE_FUNCTIONS,
} from "@/(domain)/loc/data/loc-mock";
import { generateNextCode } from "@/(domain)/loc/utils/space-code-gen";

// --- [시설 등록 폼] ---
export function FacilityForm({
  onCancel,
  onSave,
}: {
  onCancel: () => void;
  onSave: (data: Partial<Facility>) => void;
}) {
  // ✨ [수정] useEffect 제거하고 useState 초기값 함수에서 바로 계산
  const [formData, setFormData] = useState<Partial<Facility>>(() => {
    const suggestedCode = generateNextCode("facility", null, []);
    return { code: suggestedCode };
  });

  return (
    <DetailPanel
      icon={Factory}
      title="새 시설 등록"
      mode="edit"
      onSave={() => onSave(formData)}
      onCancel={onCancel}
    >
      <FormGrid>
        <FormSectionHeader title="시설 개요" icon={Factory} />
        <FormField label="시설 명칭">
          <Input
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
            placeholder="시설 이름"
            autoFocus
          />
        </FormField>
        <FormField label="시설 코드">
          <Input
            value={formData.code || ""}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, code: e.target.value }))
            }
            className="bg-slate-50 font-mono"
          />
        </FormField>
        <FormField label="주소" fullWidth>
          <Input
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, address: e.target.value }))
            }
            placeholder="주소"
          />
        </FormField>
      </FormGrid>
    </DetailPanel>
  );
}

// --- [공간 등록 폼] ---
interface SpaceFormProps {
  mode: "child" | "sibling";
  selectedSpace: Space | null;
  selectedFacility: Facility | null;
  parentSpace: Space | null;
  onCancel: () => void;
  onSave: (data: Partial<Space>) => void;
}

export function SpaceForm({
  mode,
  selectedSpace,
  selectedFacility,
  parentSpace,
  onCancel,
  onSave,
}: SpaceFormProps) {
  // ✨ [수정] let -> const 변경 (ESLint prefer-const 해결)
  const targetParentSpace =
    mode === "child" ? (selectedSpace ?? null) : (parentSpace ?? null);
  const siblingNodes = SPACES.filter(
    (s) => s.parent_id === targetParentSpace?.id,
  );
  const suggestedCode = generateNextCode(mode, targetParentSpace, siblingNodes);

  // ✨ [수정] useEffect 제거하고 useState 초기값으로 바로 설정
  // 부모 컴포넌트에서 key를 바꿔주면 이 컴포넌트가 새로 마운트되면서 이 초기화 로직이 다시 실행됩니다.
  const [formData, setFormData] = useState<Partial<Space>>({
    code: suggestedCode,
    space_type_id: 5,
    is_restricted: false,
    area_size: 0,
  });

  // ✨ [수정] any 제거하고 제네릭 사용
  const update = <K extends keyof Space>(k: K, v: Space[K]) => {
    setFormData((prev) => ({ ...prev, [k]: v }));
  };

  return (
    <DetailPanel
      icon={Plus}
      title={mode === "child" ? "하위 추가" : "동일 레벨 추가"}
      subTitle={`${selectedFacility?.name}`}
      mode="edit"
      onSave={() => onSave(formData)}
      onCancel={onCancel}
    >
      <FormGrid>
        <FormSectionHeader title="위치 정보" icon={MapPin} />
        <FormField label="상위 공간">
          <Input
            value={targetParentSpace?.name || "최상위"}
            disabled
            className="bg-slate-50 font-bold"
          />
        </FormField>

        <FormSectionHeader title="기본 정보" icon={Settings} />
        <FormField label="명칭">
          <Input
            onChange={(e) => update("name", e.target.value)}
            placeholder="공간 명칭"
            autoFocus
          />
        </FormField>
        <FormField label="코드">
          <Input
            value={formData.code || ""}
            onChange={(e) => update("code", e.target.value)}
            className="font-mono bg-slate-50"
          />
        </FormField>
        <FormSelect
          label="기능"
          options={SPACE_FUNCTIONS.map((f) => ({
            label: f.name,
            value: String(f.id),
          }))}
          onValueChange={(v) => update("space_function_id", Number(v))}
        />

        <FormSectionHeader title="속성" icon={Maximize} />
        <FormSelect
          label="유형"
          options={SPACE_TYPES.map((t) => ({
            label: t.name,
            value: String(t.id),
          }))}
          onValueChange={(v) => update("space_type_id", Number(v))}
        />
        <FormField label="면적">
          <Input
            type="number"
            onChange={(e) => update("area_size", Number(e.target.value))}
          />
        </FormField>
        <FormField label="통제">
          <Switch onCheckedChange={(v) => update("is_restricted", v)} />
        </FormField>
      </FormGrid>
    </DetailPanel>
  );
}
