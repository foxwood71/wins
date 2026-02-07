import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getErrorMessage(error: unknown): string {
  let message: string;

  if (error instanceof Error) {
    // 1. 일반적인 Error 객체인 경우
    message = error.message;
  } else if (error && typeof error === "object" && "message" in error) {
    // 2. { message: "..." } 형태의 객체인 경우
    message = String(error.message);
  } else if (typeof error === "string") {
    // 3. 그냥 문자열로 throw 된 경우
    message = error;
  } else {
    // 4. 그 외 알 수 없는 경우
    message = "알 수 없는 에러가 발생했습니다.";
  }

  return message;
}
