import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase";

// 1. ETKİNLİK GÜNCELLE (PUT)
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const supabase = createClient();

    // Supabase üzerinde veriyi güncelliyoruz ve güncellenen yeni satırı çekiyoruz
    const { data, error } = await supabase
      .from("events")
      .update({
        title: body.title,
        date: body.date,
        time: body.time,
        location: body.location,
        type: body.type,
        description: body.description || "",
        color: body.color,
        text_color: body.textColor, // camelCase -> snake_case
        bar_color: body.barColor,   // camelCase -> snake_case
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      // Eğer kayıt bulunamadıysa Supabase PGRST116 hatası dönebilir, kontrol ediyoruz
      if (error.code === "PGRST116") {
        return NextResponse.json({ error: "Event not found" }, { status: 404 });
      }
      throw error;
    }

    // Geri dönen güncel veriyi frontend formatına (camelCase) map ediyoruz
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

    return NextResponse.json(mappedResponse);
  } catch (error) {
    console.error("PUT /api/events/[id] error:", error);
    return NextResponse.json({ error: "Failed to update event" }, { status: 500 });
  }
}

// 2. ETKİNLİK SİL (DELETE)
export async function DELETE(_request, { params }) {
  try {
    const { id } = await params;
    const supabase = createClient();

    // Supabase'den belirtilen id'ye sahip etkinliği siliyoruz
    const { error, count } = await supabase
      .from("events")
      .delete({ count: "exact" }) // Kaç satır etkilendiğini anlamak için count ekliyoruz
      .eq("id", id);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/events/[id] error:", error);
    return NextResponse.json({ error: "Failed to delete event" }, { status: 500 });
  }
}
