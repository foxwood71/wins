import { NextResponse } from "next/server";
import * as LocService from "@/loc/lib/actions";

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return String(error);
}

// =============================================================================
// GET: 목록 조회 (Fetch All)
// =============================================================================
export async function GET(request: Request) {
  try {
    // 🟢 [수정] actions.ts의 getLocationList()는 이제 인자를 받지 않습니다.
    // 전체 데이터를 한 번에 가져오므로 파라미터 파싱 로직이 필요 없습니다.

    const data = await LocService.getLocationList();

    return NextResponse.json(data);
  } catch (error: unknown) {
    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: 500 },
    );
  }
}

// =============================================================================
// POST: 생성
// =============================================================================
export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    const newItem = await LocService.createLocation({
      name: body.name,
      code: body.code,
      type: body.type,
      // 프론트에서 parent_id로 보내든 parentId로 보내든 처리
      parent_id: body.parent_id ?? body.parentId,

      facility_id: body.facility_id,
      category_id: body.category_id,
      space_type_id: body.space_type_id,
      space_function_id: body.space_function_id,
      description: body.description,
      area_size: body.area_size,
      is_restricted: body.is_restricted,
      address: body.address,
    });

    return NextResponse.json(newItem);
  } catch (error: unknown) {
    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: 500 },
    );
  }
}

// =============================================================================
// DELETE: 삭제
// =============================================================================
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id?: string[] }> },
) {
  try {
    // 🟢 [핵심] params를 먼저 기다려(await) 줍니다.
    const resolvedParams = await params;
    const { searchParams } = new URL(request.url);

    const idParam = resolvedParams.id?.[0];
    const typeParam = searchParams.get("type");

    if (!idParam || !typeParam) {
      return NextResponse.json(
        { error: "ID and Type required" },
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
