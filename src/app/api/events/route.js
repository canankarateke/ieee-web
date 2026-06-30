import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase";

// 1. TÜM ETKİNLİKLERİ GETİR (GET)
export async function GET() {
  try {
    const supabase = createClient();

    // Supabase'den verileri çekiyoruz ve id'ye göre tersten sıralıyoruz
    const { data: rows, error } = await supabase
      .from("events")
      .select("*")
      .order("id", { ascending: false });

    if (error) throw error;

    // db.js'deki mapEvent dönüşümünü doğrudan burada yapıyoruz
    const mappedEvents = rows.map((row) => ({
      id: String(row.id),
      title: row.title,
      date: row.date,
      time: row.time,
      location: row.location,
      type: row.type,
      description: row.description || "",
      color: row.color,
      textColor: row.text_color, // Veritabanındaki text_color'ı frontend'in beklediği textColor'a çevirdik
      barColor: row.bar_color,   // Veritabanındaki bar_color'ı frontend'in beklediği barColor'a çevirdik
    }));

    return NextResponse.json(mappedEvents);
  } catch (error) {
    console.error("GET /api/events error:", error);
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 });
  }
}

// 2. YENİ ETKİNLİK EKLE (POST)
export async function POST(request) {
  try {
    const body = await request.json();
    const supabase = createClient();

    // Supabase'e yeni satırı ekliyoruz
    const { data, error } = await supabase
      .from("events")
      .insert([
        {
          title: body.title,
          date: body.date,
          time: body.time,
          location: body.location,
          type: body.type,
          description: body.description || "",
          color: body.color,
          text_color: body.textColor, // Frontend'den camelCase gelir, veritabanına snake_case kaydederiz
          bar_color: body.barColor,   // Frontend'den camelCase gelir, veritabanına snake_case kaydederiz
        },
      ])
      .select()
      .single(); // Eklenen tek satırı geri almak için

    if (error) throw error;

    // Geri dönen veriyi yine frontend'in okuyacağı formata (mapEvent) sokuyoruz
    const mappedResponse = {
      id: String(data.id),
      title: data.title,
      date: data.date,
      time: data.time,
      location: data.location,
      type: data.type,
      description: data.description || "",
      color: data.color,
      textColor: data.text_color,
      barColor: data.bar_color,
    };

    return NextResponse.json(mappedResponse, { status: 201 });
  } catch (error) {
    console.error("POST /api/events error:", error);
    return NextResponse.json({ error: "Failed to create event" }, { status: 500 });
  }
}
