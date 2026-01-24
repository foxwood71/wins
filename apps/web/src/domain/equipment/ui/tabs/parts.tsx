import React from "react";
import type { Equipment } from "../../types";
import { SimpleTable } from "./shared";

export const Parts = ({ data }: { data: Equipment }) => (
  <SimpleTable
    headers={["상태", "자재규격", "교체주기", "수량", "비고"]}
    rows={data.parts}
  />
);
