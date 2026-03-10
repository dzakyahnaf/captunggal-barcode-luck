import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function GET() {
  const { count } = await getSupabaseAdmin()
    .from("qr_scans")
    .select("*", { count: "exact", head: true });

  return NextResponse.json({ count: count ?? 0 });
}

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";

  const supabase = getSupabaseAdmin();

  await supabase.from("qr_scans").insert({ ip_address: ip });

  const { count } = await supabase
    .from("qr_scans")
    .select("*", { count: "exact", head: true });

  return NextResponse.json({ count: count ?? 0 });
}
