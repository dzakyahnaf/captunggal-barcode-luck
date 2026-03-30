import { NextRequest, NextResponse } from "next/server";
import { generateUniqueCode, hashIdentifier, runRNG, parseWinRate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, instagram, phone } = body as { name?: string; instagram?: string; phone?: string };

    // --- Validate input ---
    if (!name || name.trim().length < 2) {
      return NextResponse.json(
        { error: "Nama lengkap tidak valid." },
        { status: 400 },
      );
    }
    if (!phone || phone.trim().length < 9) {
      return NextResponse.json(
        { error: "Nomor WhatsApp tidak valid." },
        { status: 400 },
      );
    }

    // --- Get IP address (For logging purposes) ---
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";

    // --- Hash phone for privacy ---
    const identifier = await hashIdentifier(phone);

    // --- Run RNG (with robust env var parsing) ---
    const rawEnv = process.env.WIN_RATE_PERCENT;
    const winRate = parseWinRate(rawEnv);
    console.log(`[SPIN] ENV WIN_RATE_PERCENT raw="${rawEnv}", parsed=${winRate}%`);
    const won = runRNG(winRate);

    // --- If winner: generate unique code ---
    let codeStr = "";
    if (won) {
       codeStr = generateUniqueCode();
    }

    let scanOrder = 0;
    
    // --- Send Data to Google Sheets (Webhook Approach) ---
    // The Webhook Apps Script handles checking for duplicates and returning the scan order ATOMICALLY with a Lock!
    const googleSheetWebHookUrl = process.env.GOOGLE_APP_SCRIPT_URL;
    if (googleSheetWebHookUrl) {
      try {
        const response = await fetch(googleSheetWebHookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "text/plain", 
          },
          body: JSON.stringify({
            identifier: identifier,
            ip: ip,
            name: name.trim(),
            phone: phone.trim(),
            instagram: instagram?.trim() || "-",
            won: won,
            code: codeStr || "-",
          }),
        });

        const result = await response.json();
        
        // Google Script will return alreadyPlayed if it finds the identifier
        if (result.alreadyPlayed) {
          return NextResponse.json(
            {
              error: "Nomor ini sudah pernah bermain sebelumnya.",
              alreadyPlayed: true,
            },
            { status: 409 },
          );
        }

        scanOrder = result.scanOrder || 0;

      } catch (e) {
        console.error("Failed to trigger Google Sheets webhook", e);
        return NextResponse.json(
          { error: "Koneksi ke database Sheets gagal atau sibuk. Silakan coba lagi sebentar lagi." },
          { status: 500 },
        );
      }
    } else {
        console.error("GOOGLE_APP_SCRIPT_URL is entirely missing");
        return NextResponse.json(
          { error: "Konfigurasi server (Google Sheets) bermasalah." },
          { status: 500 },
        );
    }

    // --- Return Responses ---
    if (won) {
      return NextResponse.json(
        {
          won: true,
          code: codeStr,
          scanOrder,
          redirectUrl: `/result?won=true&code=${codeStr}`,
        },
        { status: 200 },
      );
    } else {
      const redirectUrl =
        process.env.INSTAGRAM_REDIRECT_URL ||
        "https://instagram.com/rakkencoffee";

      return NextResponse.json(
        {
          won: false,
          scanOrder,
          redirectUrl: `/result?won=false&redirect=${encodeURIComponent(redirectUrl)}`,
        },
        { status: 200 },
      );
    }
  } catch (err) {
    console.error("Spin error:", err instanceof Error ? err.message : err);
    return NextResponse.json(
      { error: "Terjadi kesalahan internal. Silakan coba lagi nanti." },
      { status: 500 },
    );
  }
}
