import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const googleSheetWebHookUrl = process.env.GOOGLE_APP_SCRIPT_URL;
    if (googleSheetWebHookUrl) {
      // The parameter-less fetch to the Webhook triggers the `doGet(e)` function
      // that the user configured to return the total rows.
      const response = await fetch(googleSheetWebHookUrl, {
        method: "GET",
      });
      const data = await response.json();
      return NextResponse.json({ count: data.count || 0 });
    }
  } catch (error) {
    console.error("Failed to fetch count from Google Sheets", error);
  }
  return NextResponse.json({ count: 0 });
}

export async function POST() {
  // The frontend calls POST on component mount to record a "hit".
  // Since we are migrating purely to Google Sheets for "Actual Participants",
  // we do not need to log empty IPs. We simply return the current row count from Sheets.
  return GET();
}
