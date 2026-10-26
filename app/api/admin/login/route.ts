import { NextRequest, NextResponse } from "next/server";
import { applyAdminCookie, passwordsMatchAdmin } from "@/lib/adminAuth";
import { adminPassword } from "@/lib/siteConfig";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  if (!adminPassword()) {
    return NextResponse.json(
      { error: "Este sitio no pide contraseña de admin" },
      { status: 400 },
    );
  }

  const body = (await req.json().catch(() => null)) as { password?: string } | null;
  const given = body?.password ?? "";

  if (!passwordsMatchAdmin(given)) {
    return NextResponse.json({ error: "Contraseña incorrecta" }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true, admin: true });
  applyAdminCookie(res, req);
  return res;
}
