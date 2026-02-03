import { Space, Facility } from "../model/types";

export function generateNextCode(
  type: "facility" | "child" | "sibling",
  parent: Space | null,
  siblings: (Space | Facility)[],
): string {
  let prefix = "LOC";

  if (type === "facility") {
    prefix = "FAC";
  } else if (parent) {
    switch (parent.space_type_id) {
      case 1:
        prefix = "FLR";
        break; // 건물 -> 층
      case 2:
        prefix = "RM";
        break; // 층 -> 호실
      default:
        prefix = "SP";
        break;
    }
  } else {
    prefix = "BLD"; // 시설 바로 아래 -> 건물
  }

  const nextNum = siblings.length + 1;
  const numStr = String(nextNum).padStart(3, "0");

  return `${prefix}-${numStr}`;
}
