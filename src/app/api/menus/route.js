import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase";

// 1. MENÜ ELEMANLARINI GETİR (GET)
export async function GET() {
  try {
    const supabase = createClient();

    // Supabase'den menu_items tablosunu sort_order'a göre sıralı çekiyoruz
    const { data: rows, error } = await supabase
      .from("menu_items")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error) throw error;

    // db.js'deki mapMenuItem mantığını doğrudan burada uyguluyoruz
    const mappedMenus = rows.map((row) => ({
      id: String(row.id),
      label: row.label,
      to: row.path,        // Veritabanındaki path alanını frontend için 'to' yapıyoruz
      order: row.sort_order // Veritabanındaki sort_order alanını frontend için 'order' yapıyoruz
    }));

    return NextResponse.json(mappedMenus);
  } catch (error) {
    console.error("GET /api/menus error:", error);
    return NextResponse.json({ error: "Failed to fetch menu items" }, { status: 500 });
  }
}

// 2. YENİ MENÜ ELEMANI EKLE (POST)
export async function POST(request) {
  try {
    const body = await request.json();
    const supabase = createClient();

    // Supabase'e verileri gönderiyoruz
    const { data, error } = await supabase
      .from("menu_items")
      .insert([
        {
          label: body.label,
          path: body.to,          // Frontend'den gelen 'to' verisini 'path' sütununa yazıyoruz
          sort_order: body.order, // Frontend'den gelen 'order' verisini 'sort_order' sütununa yazıyoruz
        },
      ])
      .select()
      .single();

    if (error) throw error;

    // Geri dönen veriyi frontend formatına dönüştürüyoruz
    const mappedResponse = {
      id: String(data.id),
      label: data.label,
      to: data.path,
      order: data.sort_order,
    };

    return NextResponse.json(mappedResponse, { status: 201 });
  } catch (error) {
    console.error("POST /api/menus error:", error);
    return NextResponse.json({ error: "Failed to create menu item" }, { status: 500 });
  }
}
