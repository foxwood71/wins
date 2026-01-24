import type { Equipment } from "../model/types";

export const EQUIPMENT_DATA: Equipment[] = [
  {
    id: "HV-4",
    name: "22.9KV PF&PT PANEL",
    facilityName: "시설팀",
    status: "Active",
    location: "전기실",
    category: "ALTS반",
    model: "HV-4",
    manufacturer: "현대일렉트릭",
    installDate: "2023-01-15",
    description: "A구역 메인 전력 분배 패널입니다.",
    images: [
      "https://images.unsplash.com/photo-1581092921461-eab62e97a780?q=80&w=2070&auto=format&fit=crop",
    ],
    accessories: [
      [
        "가동중",
        "LS일렉트릭",
        "차단기",
        "CB-001",
        "메인 진공차단기",
        "2023-01-15",
      ],
      [
        "가동중",
        "삼성",
        "컨트롤러",
        "CTL-102",
        "디지털 집중표시계",
        "2023-01-15",
      ],
    ],
    parts: [
      ["양호", "PF 200A", "3년", "3", "메인 퓨즈"],
      ["양호", "PT 절연유", "2년", "1", "교체 완료"],
    ],
    history: {
      maintenance: [
        ["수리", "2023-11-10", "부품 교체", "김철수", "자체", "50,000", "완료"],
        [
          "점검",
          "2023-05-20",
          "정기 점검",
          "이영희",
          "외부",
          "200,000",
          "정상",
        ],
      ],
      materials: [["구매", "툴데포", "PF 200A", "3", "15,000", "45,000"]],
    },
    inspections: [
      ["정기", "2023-12-01", "박검사", "22.9kV", "22.9kV ±5%", "0.0", "22.9kV"],
    ],
    acquisitionPrice: "45,000,000",
    supplier: "현대중공업",
    usefulLife: "15년",
    specType: "전동식 현수형",
    power: "3Φ x 380V x 60Hz",
    capacity: "3 TON",
  },
  {
    id: "M-1-1",
    name: "송풍기 (Main Blower)",
    facilityName: "운영팀",
    status: "Maintenance",
    location: "지하 1층 기계실",
    category: "송풍기",
    model: "CF-5000",
    manufacturer: "LG전자",
    installDate: "2021-06-20",
    description: "로비 공조용 메인 송풍기입니다.",
    images: [],
    accessories: [
      ["정지", "현대모터", "모터", "MOT-500", "15HP 구동 모터", "2021-06-20"],
    ],
    parts: [
      ["교체필요", "V-Belt A-45", "6개월", "4", "슬립 발생"],
      ["양호", "그리스", "3개월", "1", "주입 완료"],
    ],
    history: {
      maintenance: [
        [
          "긴급",
          "2024-01-05",
          "벨트 파손",
          "박대리",
          "자체",
          "10,000",
          "조치중",
        ],
      ],
      materials: [["구매", "상사", "V-Belt", "4", "5,000", "20,000"]],
    },
    inspections: [
      ["수시", "2024-01-02", "최공무", "1500rpm", "1500rpm", "-20", "1480rpm"],
    ],
    acquisitionPrice: "12,000,000",
    supplier: "LG HVAC",
    usefulLife: "10년",
    specType: "터보팬",
    power: "380V / 15HP",
    capacity: "5000 CMM",
  },
];
