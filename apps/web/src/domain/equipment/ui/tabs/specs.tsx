import React from "react";
import type { Equipment } from "../../types";
import { FormGroup } from "./shared";

export const Specs = ({ data }: { data: Equipment }) => (
  <div className="grid grid-cols-1 gap-y-4 max-w-3xl">
    <FormGroup label="Type / Spec (형식/제원)" value={data.specType} />
    <FormGroup
      label="Operation Method (운전방식)"
      value="Pendant Switch / Remote"
    />
    <FormGroup label="Power / HP (동력/마력)" value={data.power} />
    <FormGroup label="Standard / Capacity (규격/용량)" value={data.capacity} />
    <FormGroup
      label="Travel / Lift Dist. (주행/인양거리)"
      value="Travel 11.5m / Lift 18m"
    />
    <FormGroup label="Reduction / Torque (감속비/토크)" value="1:30 / 500Nm" />
    <FormGroup label="Speed (운전/회전속도)" value="1500 RPM" />
  </div>
);
