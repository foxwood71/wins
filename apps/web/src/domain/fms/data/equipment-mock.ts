import {
  Equipment,
  SubEquipment,
  Part,
  MaintenanceRecord,
  MaterialRecord,
  Inspection,
} from "../model/types";

const getRandomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;
const pick = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
const randomDate = (year: number) =>
  new Date(year, getRandomInt(0, 11), getRandomInt(1, 28))
    .toISOString()
    .split("T")[0];
const randomMoney = (min: number, max: number) =>
  (getRandomInt(min, max) * 1000).toLocaleString();

// --- 생성기 함수들 (객체 반환) ---

const generateParts = (): Part[] => {
  return Array.from({ length: getRandomInt(2, 5) }, (_, i) => ({
    id: i,
    status: pick(["Normal", "Normal", "Check", "Replace"]),
    name: pick(["V-Belt", "Bearing", "Filter", "Fuse", "O-Ring"]),
    spec: pick(["A-40", "#6204", "500x500", "250V 10A", "P-20"]),
    cycle: pick(["6개월", "1년", "2년", "소모성"]),
    quantity: `${getRandomInt(1, 10)} EA`,
    note: pick(["-", "예비품 확보", "재고 부족", "상태 양호"]),
  }));
};

const generateMaintenance = (): MaintenanceRecord[] => {
  return Array.from({ length: getRandomInt(1, 5) }, (_, i) => ({
    id: i,
    date: randomDate(2024),
    // ✨ 'as MaintenanceRecord["type"]'를 추가하여 타입 범위를 좁혀줍니다.
    type: pick([
      "Repair",
      "Check",
      "Replace",
      "Emergency",
    ]) as MaintenanceRecord["type"],
    content: pick(["오일 교체", "필터 청소", "모터 베어링 교체", "정기 점검"]),
    worker: pick(["김반장", "이주임", "박기사"]),
    vendor: pick(["(주)한일", "직영", "삼성서비스"]),
    cost: randomMoney(50, 500),
    // ✨ status도 같은 방식으로 처리합니다.
    status: "Complete" as MaintenanceRecord["status"],
    note: "특이사항 없음",
  })).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

const generateMaterials = (): MaterialRecord[] => {
  return Array.from({ length: getRandomInt(1, 3) }, (_, i) => {
    const price = getRandomInt(5, 50) * 1000;
    const qty = getRandomInt(1, 5);
    return {
      id: i,
      type: "구매",
      vendor: pick(["동신툴피아", "한국베어링"]),
      name: pick(["구리스", "세척제", "웨스", "볼트/너트"]),
      quantity: `${qty}`,
      unitPrice: price.toLocaleString(),
      totalPrice: (price * qty).toLocaleString(),
    };
  });
};

const generateInspections = (): Inspection[] => {
  const count = getRandomInt(2, 6);
  return Array.from({ length: count }, (_, i) => {
    const std = getRandomInt(210, 230);
    const val = std + getRandomInt(-5, 5);
    return {
      id: i,
      date: randomDate(2024),
      type: pick(["내부", "외부"]),
      cycle: pick(["월간", "분기", "연간"]),
      name: pick(["절연저항", "접지저항", "소음측정", "진동측정"]),
      // ✨ 'as Inspection["result"]'를 추가합니다.
      result: pick(["Pass", "Fail", "Cond. Pass"]) as Inspection["result"],
      worker: pick(["김철수", "이영희", "박민수"]),
      standard: `${std} ±10%`,
      before: `${std + getRandomInt(-10, 10)}`,
      after: `${val}`,
      deviation: `${Math.abs(val - std)}`,
      note: "-",
    };
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

const generateSubEquipments = (
  parentId: number,
  parentCode: string,
): SubEquipment[] => {
  return Array.from({ length: getRandomInt(0, 3) }, (_, i) => ({
    id: parentId * 100 + i,
    code: `${parentCode}-SUB-${i + 1}`,
    managementCode: `SUB-${getRandomInt(10, 99)}`,
    name: pick(["Motor Unit", "Control Panel", "Pump Head"]),
    model: `M-${getRandomInt(100, 999)}`,
    category: "부속설비",
    status: pick(["Active", "Active", "Maintenance"]),
    manufacturer: pick(["LS", "Samsung", "LG"]),
    installDate: randomDate(2020),
  }));
};

// 메인 생성 함수
export const generateMockEquipments = (count: number = 100): Equipment[] => {
  const equipments: Equipment[] = [];

  for (let i = 1; i <= count; i++) {
    const code = `EQ-2026-${String(i).padStart(4, "0")}`;
    equipments.push({
      id: i,
      code,
      managementCode: `MC-${getRandomInt(100, 999)}`,
      name: `Equipment #${i}`,
      facilityName: "제1공장",
      department: "시설관리팀",
      status: pick(["Active", "Active", "Maintenance", "Inactive"]),
      location: "B1 기계실",
      category: pick(["수배전", "공조", "소방"]),
      model: `MODEL-${getRandomInt(100, 999)}`,
      manufacturer: "LS ELECTRIC",
      installDate: randomDate(2019),
      description: "자동 생성된 설비 데이터입니다.",
      images: ["https://placehold.co/600x400/f1f5f9/475569?text=Equipment"],

      subEquipments: generateSubEquipments(i, code),
      parts: generateParts(),
      inspections: generateInspections(),
      history: {
        maintenance: generateMaintenance(),
        materials: generateMaterials(),
      },

      acquisitionPrice: randomMoney(100, 5000),
      supplier: "(주)공급사",
      usefulLife: "20년",
      specType: "Standard",
      power: "380V",
      capacity: "100kW",
    });
  }
  return equipments;
};

export const EQUIPMENT_DATA = generateMockEquipments(100);
