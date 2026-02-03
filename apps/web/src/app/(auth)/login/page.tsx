import { Metadata } from "next";
import { Package2 } from "lucide-react";
import { LoginForm } from "@/(domain)/auth/ui/login-form";

export const metadata: Metadata = {
  title: "Login - WINS",
  description: "Warehouse Inventory & Network System Login",
};

export default function LoginPage() {
  return (
    // [수정 포인트] lg:grid-cols-2 대신 -> lg:grid-cols-[450px_1fr] 사용
    // 좌측을 450px로 고정하고, 나머지를 우측 영역이 모두 차지하게 함
    <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-[450px_1fr] lg:px-0">
      {/* --- 좌측 브랜드 패널 (너비 고정됨) --- */}
      <div className="relative hidden h-full flex-col bg-slate-900 p-10 text-white lg:flex dark:border-r">
        {/* 배경을 심심하지 않게 그라데이션 추가 */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-slate-800" />

        {/* 상단 로고 */}
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Package2 className="mr-2 h-6 w-6 text-blue-400" />
          WINS
        </div>

        {/* 하단 메시지 */}
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-md font-light leading-relaxed text-slate-200">
              &ldquo;효율적인 시설 관리는
              <br />
              정확한 데이터에서 시작됩니다.&rdquo;
            </p>
          </blockquote>
        </div>
      </div>

      {/* --- 우측 로그인 폼 패널 (넓은 영역) --- */}
      <div className="lg:p-8 bg-slate-50 h-full flex items-center justify-center">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          {/* 모바일용 로고 (PC에선 숨김) */}
          <div className="flex flex-col space-y-2 text-center lg:hidden">
            <Package2 className="mx-auto h-6 w-6 text-blue-600" />
            <h1 className="text-2xl font-semibold tracking-tight">WINS</h1>
          </div>

          <LoginForm />

          <p className="px-8 text-center text-sm text-muted-foreground">
            &copy; 2026 WINS Project.
          </p>
        </div>
      </div>
    </div>
  );
}
