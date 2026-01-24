export interface Equipment {
  id: string;
  name: string;
  facilityName: string;
  status: "Active" | "Inactive" | "Maintenance" | "Disposed";
  location: string;
  category: string;
  model: string;
  manufacturer: string;
  installDate: string;
  description: string;
  images: string[];
  // 추가된 상세 데이터 필드들
  accessories: string[][]; // [상태, 제작사, 구분, 관리번호, 명칭, 설치일]
  parts: string[][]; // [상태, 자재규격, 교체주기, 수량, 비고]
  history: {
    maintenance: string[][]; // [구분, 일자, 작업구분, 작업자, 업체, 금액, 결과]
    materials: string[][]; // [구분, 공급업체, 품목/자재, 수량, 단가, 소계]
  };
  inspections: string[][]; // [구분, 일자, 교정자, 전값, 기준값, 편차, 후값]
  // 확장 및 사양 정보
  acquisitionPrice: string;
  supplier: string;
  usefulLife: string;
  specType: string;
  power: string;
  capacity: string;
}
