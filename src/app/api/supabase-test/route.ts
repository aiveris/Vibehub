import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabaseServer";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const shouldWrite = url.searchParams.get("write") === "1";

    const supabase = createSupabaseServerClient();

    const read = await supabase
      .from("prompts")
      .select("id, vardas, prompto_tekstas, created_at")
      .order("created_at", { ascending: false })
      .limit(1);

    if (read.error) {
      return NextResponse.json(
        { ok: false, step: "read", error: read.error.message },
        { status: 500 }
      );
    }

    let writeResult: unknown = null;

    if (shouldWrite) {
      const write = await supabase.from("prompts").insert({
        vardas: "Testas",
        prompto_tekstas: `Supabase test ${new Date().toISOString()}`,
      });

      if (write.error) {
        return NextResponse.json(
          { ok: false, step: "write", error: write.error.message, read: read.data },
          { status: 500 }
        );
      }

      writeResult = { ok: true };
    }

    return NextResponse.json({ ok: true, read: read.data, write: writeResult });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : "Unknown error" },
      { status: 500 }
    );
  }
}
