import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase";

// 1. KOMİTE GÜNCELLE (PUT)
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const supabase = createClient();

    // Gelen aktiviteleri dizi formatına güvenli şekilde dönüştürüyoruz
    const activities = Array.isArray(body.activities)
      ? body.activities
      : String(body.activities || "")
        .split(",")
        .map((a) => a.trim())
        .filter(Boolean);

    // Supabase üzerinde güncelleyip güncellenen yeni satırı alıyoruz
    const { data, error } = await supabase
      .from("committees")
      .update({
        name: body.name,
        description: body.description,
        activities: JSON.stringify(activities),
        color: body.color,
        icon_color: body.iconColor,     // camelCase -> snake_case
        border_color: body.borderColor, // camelCase -> snake_case
        icon: body.icon,
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        return NextResponse.json({ error: "Committee not found" }, { status: 404 });
      }
      throw error;
    }

    // Geri dönen veriyi frontend camelCase formatına map ediyoruz
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

    return NextResponse.json(mappedResponse);
  } catch (error) {
    console.error("PUT /api/committees/[id] error:", error);
    return NextResponse.json({ error: "Failed to update committee" }, { status: 500 });
  }
}

// 2. KOMİTE SİL (DELETE)
export async function DELETE(_request, { params }) {
  try {
    const { id } = await params;
    const supabase = createClient();

    // Supabase'den ilgili komiteyi siliyoruz
    const { error } = await supabase
      .from("committees")
      .delete()
      .eq("id", id);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/committees/[id] error:", error);
    return NextResponse.json({ error: "Failed to delete committee" }, { status: 500 });
  }
}
