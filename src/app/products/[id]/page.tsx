import Link from "next/link";
import { Metadata } from "next";
import ProductDetailsClient from "@/components/ProductDetailsClient";
import NavClient from '@/components/NavClient';
type Props = {
  params: { id: string };
};

const MOCK_PRODUCTS = [
  {
    id: "1",
    title: "IoT Başlangıç Kiti",
    price: "₺999.99",
    description: "Sensörler, mikrodenetleyici ve eğitim materyalleri içeren başlangıç dostu bir IoT kiti.",
    features: ["Mikrodenetleyici kart", "Sıcaklık sensörü", "Wi-Fi modülü", "Eğitim rehberleri"],
  },
  {
    id: "2",
    title: "Robotik Atölye Paketi",
    price: "₺2.499,00",
    description: "Motorlar, kontrolcü ve şasi dahil bir hafta sonu robotik atölyesi için tam set.",
    features: ["Motorlar ve sürücüler", "Şasi kiti", "Kontrol kartı", "Örnek projeler"],
  },
];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = await params as { id: string };
  const id = String(p.id);
  const product = MOCK_PRODUCTS.find((p) => p.id === id) || null;
  return {
    title: product ? `${product.title} | IEEE Student Branch` : "Product | IEEE Student Branch",
  };
}

export default async function ProductPage({ params }: Props) {
  const p = await params as { id: string };
  const id = String(p.id);
  const product = MOCK_PRODUCTS.find((p) => p.id === id) || null;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="font-bold text-[#0A5DA6] text-lg">IEEE</Link>
          <NavClient />
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        <ProductDetailsClient product={product} />
      </main>
    </div>
  );
}
