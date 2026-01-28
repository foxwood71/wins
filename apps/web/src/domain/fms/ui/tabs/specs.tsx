import React from "react";
import { ClipboardCheck } from "lucide-react";
import { Input } from "@/shared/components/ui/input";
import {
  FormGrid,
  FormField,
  FormSectionHeader,
} from "@/shared/components/layout/app-content";
import type { Equipment } from "../../model/types";

interface SpecsProps {
  data: Equipment;
  isEditing: boolean;
}

export function Specs({ data, isEditing }: SpecsProps) {
  return (
    <div className="h-full overflow-y-auto pr-2 custom-scrollbar">
      <FormGrid>
        <FormSectionHeader
          title="기술 제원 (Specifications)"
          icon={ClipboardCheck}
        />
        <FormField label="Type / Spec (형식/제원)">
          <Input
            defaultValue={data.specType}
            disabled={!isEditing}
            className="h-9 rounded-lg"
          />
        </FormField>
        <FormField label="Operation Method (운전방식)">
          <Input
            defaultValue="Pendant Switch / Remote"
            disabled={!isEditing}
            className="h-9 rounded-lg"
          />
        </FormField>
        <FormField label="Standard / Capacity (규격/용량)">
          <Input
            defaultValue={data.capacity}
            disabled={!isEditing}
            className="h-9 rounded-lg"
          />
        </FormField>
        <FormField label="Travel / Lift Dist. (주행/인양거리)">
          <Input
            defaultValue="Travel 11.5m / Lift 18m"
            disabled={!isEditing}
            className="h-9 rounded-lg"
          />
        </FormField>
        <FormField label="Reduction / Torque (감속비/토크)">
          <Input
            defaultValue="1:30 / 500Nm"
            disabled={!isEditing}
            className="h-9 rounded-lg"
          />
        </FormField>
        <FormField label="Speed (운전/회전속도)">
          <Input
            defaultValue="1500 RPM"
            disabled={!isEditing}
            className="h-9 rounded-lg"
          />
        </FormField>
      </FormGrid>
    </div>
  );
}
