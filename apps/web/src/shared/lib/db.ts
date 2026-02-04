import { Pool, QueryResultRow } from "pg";

// 1. 전역 타입 선언
declare global {
  var postgres: Pool | undefined;
}

// 2. SQL 파라미터로 허용할 타입 정의 (any 대체)
// 문자, 숫자, 불리언, NULL, 날짜, undefined 등을 허용합니다.
export type SqlParam = string | number | boolean | null | Date | undefined;

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432"),
  database: process.env.DB_NAME,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
};

let pool: Pool;

if (process.env.NODE_ENV === "production") {
  pool = new Pool(dbConfig);
} else {
  if (!global.postgres) {
    global.postgres = new Pool(dbConfig);
    console.log("🔌 PostgreSQL Connection Pool Created (Dev)");
  }
  pool = global.postgres;
}

// 3. 쿼리 실행 헬퍼 수정
export const db = {
  // 제네릭 T는 쿼리 결과의 행(Row) 타입을 의미하며, 기본값으로 QueryResultRow(객체)를 사용
  query: <T extends QueryResultRow = QueryResultRow>(
    text: string,
    params?: SqlParam[], // 👈 여기가 수정된 부분입니다 (any[] -> SqlParam[])
  ) => pool.query<T>(text, params),

  getClient: () => pool.connect(),
};

export default pool;
