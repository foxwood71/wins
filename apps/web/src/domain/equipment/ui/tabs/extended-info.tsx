import React from "react";
import type { Equipment } from "../../types";
import { FormGroup } from "./shared";

export const ExtendedInfo = ({ data }: { data: Equipment }) => (
  <div className="grid grid-cols-1 gap-y-4 max-w-3xl">
    <div className="grid grid-cols-2 gap-6">
      <FormGroup label="Acquisition Method (취득방법)" value="Purchase" />
      <FormGroup label="Source (취득처)" value={data.supplier} />
    </div>
    <FormGroup
      label="Acquisition Price (취득가격)"
      value={data.acquisitionPrice}
    />
    <div className="h-px bg-gray-200 my-2" />
    <FormGroup label="Manufacturer (제조사)" value={data.manufacturer} />
    <div className="grid grid-cols-2 gap-6">
      <FormGroup label="Serial No (제조번호)" value="SN-2023-8839" />
      <FormGroup label="Mfg Date (제조일자)" value="2022-12-10" type="date" />
    </div>
    <div className="grid grid-cols-2 gap-6">
      <FormGroup label="Supplier (공급사)" value={data.supplier} />
      <FormGroup label="Installer (시공사)" value={data.supplier} />
    </div>
    <div className="grid grid-cols-2 gap-6">
      <FormGroup
        label="Install Date (설치/가동일자)"
        value={data.installDate}
        type="date"
      />
      <FormGroup
        label="Completion Date (준공일)"
        value={data.installDate}
        type="date"
      />
    </div>
    <FormGroup label="Useful Life (내구연한)" value={data.usefulLife} />
  </div>
);
