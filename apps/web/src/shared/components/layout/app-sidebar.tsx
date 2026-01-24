"use client";

import * as React from "react";
import {
  Box,
  ChevronRight,
  ChevronUp,
  FileText,
  LayoutDashboard,
  Settings,
  Users,
  Package2,
  User2,
  Wrench,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/shared/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/shared/components/ui/collapsible";
import { usePathname } from "next/navigation";

// 메뉴 데이터 구조 변경 (Inventory 하위에 items 추가)
const data = {
  navMain: [
    {
      title: "대시보드",
      href: "/dashboard",
      icon: LayoutDashboard,
      items: [], // 하위 메뉴 없음
    },
    {
      title: "자재관리",
      href: "#", // 클릭 시 펼치기 동작이므로 URL 없음
      icon: Box,
      isActive: true, // 기본적으로 펼쳐져 있게 설정
      items: [
        { title: "Current Stock", href: "/inventory" }, // 현재 재고 현황
        { title: "Inbound (입고)", href: "/inventory/inbound" }, // 입고 관리
        { title: "Outbound (출고)", href: "/inventory/outbound" }, // 출고 관리
      ],
    },
    {
      title: "설비관리",
      href: "/equipment",
      icon: Wrench,
      items: [],
    },
    {
      title: "Reports",
      href: "/reports",
      icon: FileText,
      items: [],
    },
    {
      title: "사용자 관리",
      href: "#",
      icon: Users,
      items: [
        { title: "부서 관리", href: "/user/department" },
        { title: "사용자 관리", href: "/user/user" },
      ],
    },
  ],
  navSecondary: [{ title: "Settings", url: "/settings", icon: Settings }],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/dashboard">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-blue-600 text-sidebar-primary-foreground">
                  <Package2 className="size-4 text-white" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">WINS System</span>
                  <span className="truncate text-xs">v1.0.0</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Platform</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.navMain.map((item) => {
                // 1. 하위 메뉴가 없는 경우 (Dashboard, Equipment 등)
                if (item.items.length === 0) {
                  const isActive = pathname.startsWith(item.href);
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        tooltip={item.title}
                      >
                        <a href={item.href}>
                          <item.icon />
                          <span>{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                }

                // 2. 하위 메뉴가 있는 경우 (Inventory) -> Collapsible 적용
                // 현재 경로가 이 메뉴의 하위 URL을 포함하면 펼쳐진 상태 유지
                const isGroupActive = item.items.some((sub) =>
                  pathname.startsWith(sub.href),
                );

                return (
                  <Collapsible
                    key={item.title}
                    asChild
                    defaultOpen={item.isActive || isGroupActive} // 기본적으로 열어두거나, 하위 메뉴에 있을 때 열림
                    className="group/collapsible"
                  >
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton tooltip={item.title}>
                          <item.icon />
                          <span>{item.title}</span>
                          <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items.map((subItem) => {
                            const isSubActive = pathname === subItem.href;
                            return (
                              <SidebarMenuSubItem key={subItem.title}>
                                <SidebarMenuSubButton
                                  asChild
                                  isActive={isSubActive}
                                >
                                  <a href={subItem.href}>
                                    <span>{subItem.title}</span>
                                  </a>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            );
                          })}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* 설정 메뉴 */}
        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarMenu>
              {data.navSecondary.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild size="sm">
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <User2 className="size-4" />
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">Admin User</span>
                    <span className="truncate text-xs">admin@wins.com</span>
                  </div>
                  <ChevronUp className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
              >
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
