import React from "react";
import type { Equipment } from "../../types";
import { SimpleTable } from "./shared";

export const Inspection = ({ data }: { data: Equipment }) => (
  <SimpleTable
    headers={[
      "구분",
      "일자",
      "교정자",
      "보정전값",
      "기준값",
      "편차",
      "보정후값",
    ]}
    rows={data.inspections}
  />
);
