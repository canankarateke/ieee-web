import { createClient } from "@/lib/supabase";
import HomeClient from "@/components/HomeClient";

export default async function HomePage() {
  const supabase = createClient();

  // 1. Yaklaşan en yeni 3 etkinliği Supabase'den çekiyoruz
  const { data: eventRows, error: eventError } = await supabase
    .from("events")
    .select("*")
    .order("id", { ascending: false })
    .limit(3);

  if (eventError) {
    console.error("Supabase home events fetch error:", eventError);
  }

  const events = (eventRows || []).map((row) => ({
    id: String(row.id),
    title: row.title,
    date: row.date,
    time: row.time,
    location: row.location,
    type: row.type,
    description: row.description || "",
    color: row.color,
    textColor: row.text_color,
    barColor: row.bar_color,
  }));

  // 2. Tüm komiteleri Supabase'den çekiyoruz
  const { data: committeeRows, error: committeeError } = await supabase
    .from("committees")
    .select("*")
    .order("id", { ascending: true });

  if (committeeError) {
    console.error("Supabase home committees fetch error:", committeeError);
  }

  const committees = (committeeRows || []).map((row) => ({
    id: String(row.id),
    name: row.name,
    description: row.description,
    activities: JSON.parse(row.activities || "[]"),
    color: row.color,
    iconColor: row.icon_color,
    borderColor: row.border_color,
    icon: row.icon,
  }));

  // Verileri temiz bir şekilde istemci bileşenine (Client Component) aktarıyoruz
  return <HomeClient initialEvents={events} initialCommittees={committees} />;
}
