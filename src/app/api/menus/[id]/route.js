import { NextResponse } from "next/server";
import { getDb, mapMenuItem } from "@/lib/db";

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const db = getDb();

    const existing = db.prepare("SELECT * FROM menu_items WHERE id = ?").get(id);
    if (!existing) {
      return NextResponse.json({ error: "Menu item not found" }, { status: 404 });
    }

    db.prepare(
      `UPDATE menu_items SET
        label = @label,
        path = @path,
        sort_order = @sort_order
       WHERE id = @id`
    ).run({
      id,
      label: body.label,
      path: body.to,
      sort_order: body.order,
    });

    const row = db.prepare("SELECT * FROM menu_items WHERE id = ?").get(id);
    return NextResponse.json(mapMenuItem(row));
  } catch (error) {
    console.error("PUT /api/menus/[id] error:", error);
    return NextResponse.json({ error: "Failed to update menu item" }, { status: 500 });
  }
}

export async function DELETE(_request, { params }) {
  try {
    const { id } = await params;
    const db = getDb();

    const result = db.prepare("DELETE FROM menu_items WHERE id = ?").run(id);
    if (result.changes === 0) {
      return NextResponse.json({ error: "Menu item not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/menus/[id] error:", error);
    return NextResponse.json({ error: "Failed to delete menu item" }, { status: 500 });
  }
}
