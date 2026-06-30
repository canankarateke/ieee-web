import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase";

// 1. KAYITLARI GETİR (GET)
export async function GET() {
  try {
    const supabase = createClient();

    // Supabase'den registrations tablosunu id'ye göre tersten sıralı çekiyoruz
    const { data: rows, error } = await supabase
      .from("registrations")
      .select("*")
      .order("id", { ascending: false });

    if (error) throw error;

    // db.js'deki mapRegistration mantığını burada doğrudan uyguluyoruz
    const mappedRegistrations = rows.map((row) => ({
      id: String(row.id),
      fullName: row.full_name,
      email: row.email,
      studentId: row.student_id || null,
      createdAt: row.created_at,
    }));

    return NextResponse.json(mappedRegistrations);
  } catch (error) {
    console.error("GET /api/register error:", error);
    return NextResponse.json({ error: "Failed to fetch registrations" }, { status: 500 });
  }
}

// 2. YENİ KAYIT OLUŞTUR (POST)
export async function POST(request) {
  try {
    const body = await request.json();
    const supabase = createClient();

    // Supabase'e kayıt verilerini gönderiyoruz
    const { data, error } = await supabase
      .from("registrations")
      .insert([
        {
          full_name: body.fullName,
          email: body.email,
          student_id: body.studentId || null,
        },
      ])
      .select()
      .single();

    if (error) throw error;

    // Geri dönen veriyi frontend formatına dönüştürüyoruz
    const mappedResponse = {
      id: String(data.id),
      fullName: data.full_name,
      email: data.email,
      studentId: data.student_id || null,
      createdAt: data.created_at,
    };

    return NextResponse.json(mappedResponse, { status: 201 });
  } catch (error) {
    console.error("POST /api/register error:", error);
    return NextResponse.json({ error: "Failed to create registration" }, { status: 500 });
  }
}
