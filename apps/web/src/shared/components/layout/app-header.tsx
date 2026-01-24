"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Search, Bell, Home, ChevronRight } from "lucide-react";

import { SidebarTrigger } from "@/shared/components/ui/sidebar";
import { Separator } from "@/shared/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/shared/components/ui/breadcrumb";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar";

export function AppHeader() {
  const pathname = usePathname();

  // 전체 경로 세그먼트를 생성합니다.
  const pathSegments = pathname.split("/").filter((item) => item !== "");

  // 브레드크럼 표시용 데이터 가공 (Dashboard 세그먼트는 화면 표시에서 제외)
  const breadcrumbs = pathSegments
    .map((segment, index) => ({
      label:
        segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " "),
      href: "/" + pathSegments.slice(0, index + 1).join("/"),
      isDashboard: segment.toLowerCase() === "dashboard",
    }))
    .filter((item) => !item.isDashboard);

  return (
    <header className="flex h-12 shrink-0 items-center gap-2 border-b bg-white px-4 z-50">
      {/* 1. 좌측: 사이드바 트리거 & 동적 브레드크럼 */}
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />

        <Breadcrumb>
          <BreadcrumbList>
            {/* 홈 아이콘: Dashboard 텍스트를 대신하여 루트 역할을 합니다. */}
            <BreadcrumbItem>
              <BreadcrumbLink
                href="/"
                className="flex items-center text-slate-400 hover:text-blue-600 transition-colors"
              >
                <Home className="h-4 w-4" />
              </BreadcrumbLink>
            </BreadcrumbItem>

            {breadcrumbs.length > 0 && (
              <BreadcrumbSeparator>
                <ChevronRight className="h-3.5 w-3.5 text-slate-300" />
              </BreadcrumbSeparator>
            )}

            {/* 필터링된 경로들을 순회하며 렌더링 */}
            {breadcrumbs.map((item, index) => {
              const isLast = index === breadcrumbs.length - 1;

              return (
                <React.Fragment key={item.href}>
                  <BreadcrumbItem>
                    {isLast ? (
                      <BreadcrumbPage className="text-[13px] font-bold text-blue-600 tracking-tight">
                        {item.label}
                      </BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink
                        href={item.href}
                        className="text-[13px] font-medium text-slate-500 hover:text-slate-800"
                      >
                        {item.label}
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                  {!isLast && (
                    <BreadcrumbSeparator>
                      <ChevronRight className="h-3.5 w-3.5 text-slate-300" />
                    </BreadcrumbSeparator>
                  )}
                </React.Fragment>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* 2. 우측: 검색 및 사용자 메뉴 */}
      <div className="flex items-center gap-2 ml-auto">
        <div className="relative hidden md:block">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
          <Input
            type="search"
            placeholder="Search..."
            className="h-8 w-64 appearance-none bg-slate-50 border-none pl-8 shadow-none text-xs focus-visible:ring-1 focus-visible:ring-blue-600"
          />
        </div>

        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500">
          <Bell className="h-4 w-4" />
          <span className="sr-only">Notifications</span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8 border border-slate-200">
                <AvatarImage src="/avatars/01.png" alt="@admin" />
                <AvatarFallback className="bg-blue-50 text-blue-600 text-[10px] font-bold">
                  AD
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-bold leading-none text-slate-800">
                  Admin User
                </p>
                <p className="text-xs leading-none text-slate-400">
                  admin@wins.com
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-[13px]">Profile</DropdownMenuItem>
            <DropdownMenuItem className="text-[13px]">
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600 text-[13px] font-medium">
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
