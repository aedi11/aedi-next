import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

// Read the pre-computed cache at request time (file-system, server only)
const CACHE_FILE = path.join(process.cwd(), "src/lib/demo-cache.json");

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const indexParam = searchParams.get("index");
  const index = Number(indexParam);

  if (isNaN(index) || index < 0 || index > 2) {
    return NextResponse.json({ error: "Invalid index. Use 0, 1, or 2." }, { status: 400 });
  }

  try {
    const raw = fs.readFileSync(CACHE_FILE, "utf-8");
    const cache: Array<{ index: number; label: string; prompt: string; response: unknown }> =
      JSON.parse(raw);

    const entry = cache.find((c) => c.index === index);
    if (!entry) {
      return NextResponse.json({ error: "Demo not found in cache." }, { status: 404 });
    }

    return NextResponse.json({ response: entry.response });
  } catch {
    return NextResponse.json(
      { error: "Demo cache not found. Run the seed script first." },
      { status: 503 }
    );
  }
}
