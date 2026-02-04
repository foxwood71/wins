// 1. 하위 엔티티 타입 정의 (DB 테이블과 매핑될 구조)

// [검사 이력]
export interface Inspection {
  id: number;
  date: string; // 검사일자
  type: string; // 구분 (내부/외부)
  cycle: string; // 주기
  name: string; // 검사명
  result: "Pass" | "Fail" | "Cond. Pass"; // 판정
  worker: string; // 담당자/업체
  standard: string; // 기준값
  before: string; // 측정전
  after: string; // 측정후
  deviation: string; // 편차
  note: string; // 검사의견
}

// [부품 데이터]
export interface Part {
  id: number;
  status: "Normal" | "Check" | "Replace"; // 상태
  name: string; // 부품명 (자재규격 포함 or 분리 가능)
  spec: string; // 규격
  cycle: string; // 교체주기
  quantity: string; // 수량
  note: string; // 비고
}

// [유지보수 이력]
export interface MaintenanceRecord {
  id: number;
  date: string;
  type: "Repair" | "Check" | "Replace" | "Emergency"; // 구분
  content: string; // 작업내용
  worker: string; // 작업자
  vendor: string; // 업체
  cost: string; // 비용
  status: "Complete" | "Pending" | "Progress"; // 상태
  note: string;
}

// [자재 사용 이력]
export interface MaterialRecord {
  id: number;
  type: string; // 구분 (구매/출고)
  vendor: string; // 구매처
  name: string; // 품명/규격
  quantity: string; // 수량
  unitPrice: string; // 단가
  totalPrice: string; // 금액
}

// [하위 구성 설비]
export interface SubEquipment {
  id: number;
  code: string;
  managementCode: string;
  name: string;
  model: string;
  category: string;
  status: "Active" | "Inactive" | "Maintenance" | "Disposed";
  manufacturer: string;
  installDate: string;
}

// 2. 메인 설비 타입 (Root Entity)
export interface Equipment {
  // [식별자]
  id: number; // DB Index
  code: string; // 시스템 코드 (UUID)
  managementCode: string; // 관리 번호

  // [기본 정보]
  name: string;
  facilityName: string;
  department: string; // 관리부서
  status: "Active" | "Inactive" | "Maintenance" | "Disposed";
  location: string;
  category: string;
  model: string;
  manufacturer: string;
  installDate: string;
  description: string;
  images: string[]; // 이미지 URL 배열

  // [관계형 데이터 - 객체 배열로 변경됨]
  subEquipments: SubEquipment[];
  parts: Part[];
  inspections: Inspection[];

  history: {
    maintenance: MaintenanceRecord[];
    materials: MaterialRecord[];
  };

  // [확장 정보]
  acquisitionPrice: string;
  supplier: string;
  usefulLife: string;
  specType: string;
  power: string;
  capacity: string;
}
