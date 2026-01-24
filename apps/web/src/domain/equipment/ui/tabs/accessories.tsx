import React from "react";
import type { Equipment } from "../../types";
import { SimpleTable } from "./shared";

export const Accessories = ({ data }: { data: Equipment }) => (
  <SimpleTable
    headers={["상태", "제작사", "구분", "관리번호", "명칭", "설치일"]}
    rows={data.accessories}
  />
);
