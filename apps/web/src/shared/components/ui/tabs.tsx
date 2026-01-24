"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cva, type VariantProps } from "class-variance-authority"; // cva 추가

import { cn } from "@/shared/lib/utils";

const Tabs = TabsPrimitive.Root;

// 1. TabsList에 대한 스타일 변수 정의 (cva 사용)
const tabsListVariants = cva("inline-flex items-center justify-center", {
  variants: {
    variant: {
      default: "h-10 rounded-md bg-muted p-1 text-muted-foreground",
      line: "h-auto w-full justify-start gap-8 bg-transparent p-0 border-b border-slate-200", // 라인 스타일 추가
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

// 2. Props 타입에 VariantProps 추가
interface TabsListProps
  extends
    React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>,
    VariantProps<typeof tabsListVariants> {}

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  TabsListProps
>(({ className, variant, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(tabsListVariants({ variant }), className)}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

// 3. TabsTrigger도 라인 스타일에 맞춰 수정 (필요 시)
const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:text-foreground",
      // 라인 스타일을 위한 추가 클래스 (부모가 line variant일 때 적용되도록 MainView에서 직접 제어하는 것이 편함)
      className,
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = TabsPrimitive.Content;
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
