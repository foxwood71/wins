import { NextResponse } from "next/server";
import * as LocService from "@/loc/lib/actions";

// 에러 메시지 추출 헬퍼
function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return String(error);
}

// ----------------------------------------------------------------------
// GET: 목록 조회
// ----------------------------------------------------------------------
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const parentIdParam = searchParams.get("parentId");

    // "null" 문자열이거나 빈 값이면 null, 아니면 숫자 변환
    const parentId =
      parentIdParam && parentIdParam !== "null" ? Number(parentIdParam) : null;

    if (parentId !== null && isNaN(parentId)) {
      return NextResponse.json({ error: "Invalid parentId" }, { status: 400 });
    }

    const data = await LocService.getLocationList(parentId);
    return NextResponse.json(data);
  } catch (error: unknown) {
    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: 500 },
    );
  }
}

// ----------------------------------------------------------------------
// POST: 생성 (시설 또는 공간)
// ----------------------------------------------------------------------
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // 필수값 검증
    if (!body.name || typeof body.name !== "string") {
      return NextResponse.json(
        { error: "유효하지 않은 명칭입니다." },
        { status: 400 },
      );
    }

    // actions.ts의 createLocation 함수 호출
    // (actions 내부에서 type에 따라 facilities/spaces 테이블 분기 처리됨)
    const newItem = await LocService.createLocation({
      name: body.name,
      code: body.code,
      type: body.type, // 'facility' | 'space'
      parentId: body.parentId,

      // 추가 필드들 전달
      facility_id: body.facility_id,
      category_id: body.category_id,
      space_type_id: body.space_type_id,
      space_function_id: body.space_function_id,
      description: body.description,
      area_size: body.area_size,
      is_restricted: body.is_restricted,
      latitude: body.latitude,
      longitude: body.longitude,
    });

    return NextResponse.json(newItem);
  } catch (error: unknown) {
    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: 500 },
    );
  }
}

// ----------------------------------------------------------------------
// DELETE: 삭제 (신규 추가됨)
// ----------------------------------------------------------------------
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const idParam = searchParams.get("id");
    const typeParam = searchParams.get("type"); // 'facility' 또는 'space' 필수

    if (!idParam || isNaN(Number(idParam))) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    // 테이블을 구분하기 위해 type이 반드시 필요함
    if (!typeParam || (typeParam !== "facility" && typeParam !== "space")) {
      return NextResponse.json(
        { error: "Invalid Type (facility or space required)" },
        { status: 400 },
      );
    }

    await LocService.deleteLocation(
      Number(idParam),
      typeParam as "facility" | "space",
    );

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: 500 },
    );
  }
}
