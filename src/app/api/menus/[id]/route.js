import { NextResponse } from "next/server";
import  { createClient as supabase } from "@/lib/supabase"; // Supabase bağlantı dosyanızın yolu

// MENU ÖĞESİNİ GÜNCELLEME (PUT)
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();

    // 1. Önce güncellenecek veri var mı diye kontrol ediyoruz
    const { data: existing, error: fetchError } = await supabase
      .from("menu_items")
      .select("*")
      .eq("id", id)
      .single();

    if (fetchError || !existing) {
      return NextResponse.json({ error: "Menu item not found" }, { status: 404 });
    }

    // 2. Supabase ile güncelleme işlemini yapıyoruz
    const { data: updatedData, error: updateError } = await supabase
      .from("menu_items")
      .update({
        label: body.label,
        path: body.to, // Gelen body'deki 'to' alanını 'path'e eşitliyoruz
        sort_order: body.order, // Gelen body'deki 'order' alanını 'sort_order'a eşitliyoruz
      })
      .eq("id", id)
      .select()
      .single();

    if (updateError) throw updateError;

    // Güncellenmiş veriyi döndürüyoruz
    return NextResponse.json(updatedData);
  } catch (error) {
    console.error("PUT /api/menus/[id] error:", error);
    return NextResponse.json({ error: "Failed to update menu item" }, { status: 500 });
  }
}

// MENU ÖĞESİNİ SİLME (DELETE)
export async function DELETE(_request, { params }) {
  try {
    const { id } = await params;

    // Supabase ile veriyi siliyoruz
    const { data, error, status } = await supabase
      .from("menu_items")
      .delete()
      .eq("id", id)
      .select();

    // Eğer silinen bir satır yoksa veya hata döndüyse 404 veriyoruz
    if (error || !data || data.length === 0) {
      return NextResponse.json({ error: "Menu item not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/menus/[id] error:", error);
    return NextResponse.json({ error: "Failed to delete menu item" }, { status: 500 });
  }
}
