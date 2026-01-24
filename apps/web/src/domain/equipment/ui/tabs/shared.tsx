import React from "react";
import { Input } from "../../../../shared/components/ui/input";
import { cn } from "../../../../shared/lib/utils";

export const FormGroup = ({
  label,
  value,
  type = "text",
}: {
  label: string;
  value: string;
  type?: string;
}) => (
  <div className="space-y-1">
    <label className="text-xs font-semibold text-gray-500">{label}</label>
    <Input
      value={value}
      type={type}
      readOnly
      className="h-9 bg-gray-50/50 border-gray-200 focus-visible:ring-0"
    />
  </div>
);

export const SimpleTable = ({
  headers,
  rows,
}: {
  headers: string[];
  rows: string[][];
}) => {
  // 컬럼 성격에 따른 너비 스타일 결정 함수
  const getColumnStyle = (header: string) => {
    const h = header.replace(/\s/g, "");
    if (
      h === "상태" ||
      h === "구분" ||
      h === "수량" ||
      h === "교정자" ||
      h === "#"
    )
      return "w-16 text-center";
    if (h === "설치일" || h === "일자" || h === "교체주기" || h === "교정일자")
      return "w-32 text-center";
    if (h === "관리번호" || h === "제작사" || h === "공급업체")
      return "w-40 text-center";
    // 명칭, 규격, 비고 등은 넓게 배분
    return "text-left";
  };

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm flex flex-col h-full">
      <table className="w-full text-sm table-fixed border-collapse">
        <thead className="bg-gray-100/80 text-gray-700 font-bold border-b border-gray-200 sticky top-0 z-10">
          <tr>
            <th className="p-3 w-12 text-center border-r border-gray-200 bg-gray-100/30">
              #
            </th>
            {headers.map((h, i) => (
              <th
                key={i}
                className={cn(
                  "p-3 border-r border-gray-200 last:border-0",
                  getColumnStyle(h),
                )}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {rows.map((row, idx) => (
            <tr
              key={idx}
              className="even:bg-gray-50/50 hover:bg-blue-50/40 transition-colors group"
            >
              <td className="p-2.5 text-center text-gray-400 font-medium border-r border-gray-100 group-hover:bg-blue-50/10">
                {idx + 1}
              </td>
              {row.map((cell, cIdx) => (
                <td
                  key={cIdx}
                  className={cn(
                    "p-2.5 border-r border-gray-100 last:border-0 truncate",
                    getColumnStyle(headers[cIdx]),
                  )}
                  title={cell}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
          {/* 빈 행 채우기 (데이터가 적어도 그리드 형태 유지) */}
          {Array.from({ length: Math.max(0, 10 - rows.length) }).map((_, i) => (
            <tr
              key={`empty-${i}`}
              className="h-10 even:bg-gray-50/20 border-b border-gray-50 last:border-0"
            >
              <td className="border-r border-gray-100"></td>
              {headers.map((_, j) => (
                <td
                  key={j}
                  className="border-r border-gray-100 last:border-0"
                ></td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
