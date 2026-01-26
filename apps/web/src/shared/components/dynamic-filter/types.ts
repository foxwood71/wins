// src/shared/components/dynamic-filter/types.ts

export type FilterInputType = "text" | "select" | "date";

export interface FilterOption {
  label: string;
  value: string;
}

export interface FilterConfig {
  key: string;
  label: string;
  type: FilterInputType;
  options?: FilterOption[];
  placeholder?: string;
}

export type FilterValues = Record<string, string | undefined>;
