import { NextRequest, NextResponse } from "next/server";
import { clearAdminCookie } from "@/lib/adminAuth";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const res = NextResponse.json({ ok: true, admin: false });
  clearAdminCookie(res, req);
  return res;
}
