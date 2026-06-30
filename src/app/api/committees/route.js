import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase";

// 1. KOMİTELERİ GETİR (GET)
export async function GET() {
  try {
    const supabase = createClient();

    // Supabase'den committees tablosunu çekiyoruz
    const { data: rows, error } = await supabase
      .from("committees")
      .select("*")
      .order("id", { ascending: true });

    if (error) throw error;

    // db.js'deki mapCommittee mantığını doğrudan burada uyguluyoruz
    const mappedCommittees = rows.map((row) => ({
      id: String(row.id),
      name: row.name,
      description: row.description,
      activities: JSON.parse(row.activities || "[]"), // Metin olarak saklanan JSON dizisini geri objeye çeviriyoruz
      color: row.color,
      iconColor: row.icon_color,
      borderColor: row.border_color,
      icon: row.icon,
    }));

    return NextResponse.json(mappedCommittees);
  } catch (error) {
    console.error("GET /api/committees error:", error);
    return NextResponse.json({ error: "Failed to fetch committees" }, { status: 500 });
  }
}

// 2. YENİ KOMİTE OLUŞTUR (POST)
export async function POST(request) {
  try {
    const body = await request.json();
    const supabase = createClient();

    // Frontend'den gelen aktiviteleri temizleyip dizi haline getiriyoruz
    const activities = Array.isArray(body.activities)
      ? body.activities
      : String(body.activities || "")
          .split(",")
          .map((a) => a.trim())
          .filter(Boolean);

    // Supabase'e kayıt verilerini gönderiyoruz
    const { data, error } = await supabase
      .from("committees")
      .insert([
        {
          name: body.name,
          description: body.description,
          activities: JSON.stringify(activities), // SQLite'taki gibi metin olarak saklıyoruz
          color: body.color,
          icon_color: body.iconColor,
          border_color: body.borderColor,
          icon: body.icon,
        },
      ])
      .select()
      .single();

    if (error) throw error;

    // Geri dönen veriyi frontend formatına dönüştürüyoruz
    const mappedResponse = {
      id: String(data.id),
      name: data.name,
      description: data.description,
      activities: JSON.parse(data.activities || "[]"),
      color: data.color,
      iconColor: data.icon_color,
      borderColor: data.border_color,
      icon: data.icon,
    };

    return NextResponse.json(mappedResponse, { status: 201 });
  } catch (error) {
    console.error("POST /api/committees error:", error);
    return NextResponse.json({ error: "Failed to create committee" }, { status: 500 });
  }
}
