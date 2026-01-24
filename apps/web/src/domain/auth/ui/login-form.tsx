"use client";

import * as React from "react";
import { Loader2, Lock, Mail } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";

// Card 관련 컴포넌트 대신 일반 div로 구조 변경
export function LoginForm() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert("로그인 시도!");
    }, 2000);
  }

  // Card 래퍼를 제거하고 깔끔한 div로 변경
  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">로그인</h1>
        <p className="text-sm text-muted-foreground">
          이메일과 비밀번호를 입력해 주세요.
        </p>
      </div>
      <div className="grid gap-6">
        <form onSubmit={onSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">이메일</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  id="email"
                  placeholder="name@example.com"
                  type="email"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  disabled={isLoading}
                  className="pl-9 focus-visible:ring-blue-600"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">비밀번호</Label>
                <a
                  href="#"
                  className="text-sm font-medium text-blue-600 hover:underline"
                >
                  비밀번호를 잊으셨나요?
                </a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  id="password"
                  placeholder="••••••••"
                  type="password"
                  autoComplete="current-password"
                  disabled={isLoading}
                  className="pl-9 focus-visible:ring-blue-600"
                />
              </div>
            </div>
            <Button
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              WINS 계정으로 로그인
            </Button>
          </div>
        </form>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-muted-foreground">또는</span>
          </div>
        </div>
        <Button variant="outline" type="button" disabled={isLoading}>
          사내 통합 인증(SSO)으로 계속
        </Button>
      </div>
      <p className="px-8 text-center text-sm text-muted-foreground">
        계속 진행하면 WINS{" "}
        <a href="#" className="underline underline-offset-4 hover:text-primary">
          서비스 약관
        </a>{" "}
        및{" "}
        <a href="#" className="underline underline-offset-4 hover:text-primary">
          개인정보 처리방침
        </a>
        에 동의하게 됩니다.
      </p>
    </div>
  );
}
