"use client";

import {
  Activity,
  CreditCard,
  DollarSign,
  Users,
  Package,
  AlertTriangle,
  ClipboardList,
  Wrench,
  ArrowUpRight,
} from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/shared/components/ui/chart";
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  ResponsiveContainer,
} from "recharts";

// --- Mock Data: 차트 데이터 ---
const chartData = [
  { category: "Electronics", items: 450 },
  { category: "Furniture", items: 320 },
  { category: "Cabling", items: 280 },
  { category: "Peripherals", items: 190 },
  { category: "Networking", items: 410 },
];

const chartConfig = {
  items: {
    label: "Items",
    color: "#2563eb", // blue-600
  },
} satisfies ChartConfig;

// --- Mock Data: 최근 활동 ---
const recentActivities = [
  {
    user: "Sarah J.",
    action: "Checkout",
    target: 'MacBook Pro 16"',
    time: "2m ago",
    avatar: "/avatars/01.png",
    status: "orange",
  },
  {
    user: "Admin",
    action: "Restocked",
    target: "HDMI Cable (50ft)",
    time: "15m ago",
    avatar: "/avatars/02.png",
    status: "green",
  },
  {
    user: "Mike T.",
    action: "Maintenance Flag",
    target: "Projector X1",
    time: "3h ago",
    avatar: "/avatars/03.png",
    status: "red",
  },
  {
    user: "Tom C.",
    action: "New Item",
    target: 'Dell Monitor 27"',
    time: "5h ago",
    avatar: "/avatars/04.png",
    status: "blue",
  },
];

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      {/* 페이지 타이틀 영역 */}
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Overview</h2>
        {/* 우측 상단 날짜 필터 등 추가 가능 */}
      </div>

      {/* 1. 상단 KPI 카드 영역 (4개) */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Card 1: Total Items */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Items
            </CardTitle>
            <Package className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,450</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center text-green-600">
              <ArrowUpRight className="mr-1 h-3 w-3" />
              +2.5% vs last month
            </p>
          </CardContent>
        </Card>

        {/* Card 2: Low Stock Alerts */}
        <Card className="border-red-100 bg-red-50/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Low Stock Alerts
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">18</div>
            <div className="mt-2">
              <Badge
                variant="destructive"
                className="text-[10px] px-2 py-0.5 h-5"
              >
                CRITICAL
              </Badge>
              <span className="ml-2 text-xs text-muted-foreground">
                Restock needed
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Card 3: Pending Orders */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pending Orders
            </CardTitle>
            <ClipboardList className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <div className="mt-2">
              <Badge
                variant="secondary"
                className="bg-orange-100 text-orange-700 hover:bg-orange-100 text-[10px] px-2 py-0.5 h-5"
              >
                Processing
              </Badge>
              <span className="ml-2 text-xs text-muted-foreground">
                Est. delivery 2d
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Card 4: Maintenance Due */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Maintenance Due
            </CardTitle>
            <Wrench className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <div className="mt-2">
              <Badge
                variant="secondary"
                className="bg-purple-100 text-purple-700 hover:bg-purple-100 text-[10px] px-2 py-0.5 h-5"
              >
                Attention
              </Badge>
              <span className="ml-2 text-xs text-muted-foreground">
                Scheduled checks
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 2. 중단 차트 및 활동 로그 영역 */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* 왼쪽: Stock Levels Chart (4칸 차지) */}
        <Card className="col-span-4">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Stock Levels by Category</CardTitle>
                <CardDescription>
                  Real-time inventory distribution
                </CardDescription>
              </div>
              {/* 기간 선택 드롭다운 (UI만 구현) */}
              <Button variant="outline" size="sm" className="text-xs h-8">
                This Month
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pl-0">
            <ChartContainer
              config={chartConfig}
              className="min-h-[300px] w-full"
            >
              <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="category"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 10)}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar
                  dataKey="items"
                  fill="var(--color-items)"
                  radius={[4, 4, 0, 0]}
                  barSize={40}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* 오른쪽: Recent Activity (3칸 차지) */}
        <Card className="col-span-3">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Activity</CardTitle>
              <Button variant="link" className="text-blue-600 text-xs px-0">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {/* 활동 리스트 루프 */}
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={activity.avatar} alt="Avatar" />
                    <AvatarFallback>
                      {activity.user.substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="ml-4 space-y-1 w-full">
                    <p className="text-sm font-medium leading-none">
                      <span
                        className={`inline-block w-2 h-2 rounded-full mr-2 
                                                ${activity.status === "orange" ? "bg-orange-500" : ""}
                                                ${activity.status === "green" ? "bg-green-500" : ""}
                                                ${activity.status === "red" ? "bg-red-500" : ""}
                                                ${activity.status === "blue" ? "bg-blue-500" : ""}
                                            `}
                      ></span>
                      {activity.action}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {activity.target}
                      <span className="mx-1">·</span>
                      <span className="font-medium text-foreground">
                        {activity.user}
                      </span>
                    </p>
                  </div>
                  <div className="ml-auto text-xs text-muted-foreground whitespace-nowrap">
                    {activity.time}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
