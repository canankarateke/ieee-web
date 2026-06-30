import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase";

// 1. BELİRLİ BİR SAYFANIN İÇERİĞİNİ GETİR (GET)
// Kullanımı: /api/pages?slug=about
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");

    if (!slug) {
      return NextResponse.json({ error: "Slug parametresi zorunludur" }, { status: 400 });
    }

    const supabase = createClient();
    const { data, error } = await supabase
      .from("pages")
      .select("*")
      .eq("slug", slug)
      .maybeSingle(); // Eğer veri yoksa hata fırlatmaz, null döner

    if (error) throw error;

    return NextResponse.json(data || { title: "", content: "" });
  } catch (error) {
    console.error("GET /api/pages error:", error);
    return NextResponse.json({ error: "Sayfa içeriği yüklenemedi" }, { status: 500 });
  }
}

// 2. SAYFA İÇERİĞİNİ GÜNCELLE VEYA YOKSA OLUŞTUR (PUT)
export async function PUT(request) {
  try {
    const body = await request.json();
    const { slug, title, content } = body;

    if (!slug || !title) {
      return NextResponse.json({ error: "Slug and Title are required" }, { status: 400 });
    }

    const supabase = createClient();

    // upsert: Veri varsa günceller (update), yoksa yeni satır ekler (insert)
    // Bunun çalışması için tablodaki 'slug' kolonunun UNIQUE (benzersiz) olması şarttır!
    const { error } = await supabase
      .from("pages")
      .upsert(
        { slug, title, content, updated_at: new Date().toISOString() },
        { onConflict: "slug" }
      );

    if (error) throw error;

    return NextResponse.json({ success: true, message: "Sayfa başarıyla güncellendi" });
  } catch (error) {
    console.error("PUT /api/pages error:", error);
    return NextResponse.json({ error: "Sayfa kaydedilirken hata oluştu" }, { status: 500 });
  }
}
