import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase";

// 1. İLETİŞİM MESAJLARINI GETİR (GET) - Admin Paneli İçin
export async function GET() {
  try {
    const supabase = createClient();

    // Supabase'den contacts tablosunu id'ye göre tersten sıralı çekiyoruz
    const { data: rows, error } = await supabase
      .from("contacts")
      .select("*")
      .order("id", { ascending: false });

    if (error) throw error;

    // Frontend formatına map'leme yapıyoruz
    const mappedContacts = rows.map((row) => ({
      id: String(row.id),
      name: row.name,
      email: row.email,
      message: row.message,
      createdAt: row.created_at,
    }));

    return NextResponse.json(mappedContacts);
  } catch (error) {
    console.error("GET /api/contact error:", error);
    return NextResponse.json({ error: "Failed to fetch contacts" }, { status: 500 });
  }
}

// 2. YENİ İLETİŞİM MESAJI OLUŞTUR (POST) - İletişim Formu İçin
export async function POST(request) {
  try {
    const body = await request.json();
    const supabase = createClient();

    // Veritabanına mesajı ekliyoruz.
    // 🚨 .select().single() kısmını kaldırdık; böylece RLS select politikası kapalı olsa bile insert başarılı olur.
    const { error } = await supabase
      .from("contacts")
      .insert([
        {
          name: body.name,
          email: body.email,
          message: body.message,
        },
      ]);

    if (error) throw error;

    // İstek başarılı olduysa doğrudan başarılı durum kodu dönüyoruz
    return NextResponse.json({ success: true, message: "Contact created successfully" }, { status: 201 });
  } catch (error) {
    console.error("POST /api/contact error:", error);
    return NextResponse.json({ error: "Failed to create contact" }, { status: 500 });
  }
}
