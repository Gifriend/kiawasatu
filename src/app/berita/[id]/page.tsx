import { createClient } from "@/lib/supabase/server";
import { Carousel } from "@/components/ui/carousel";
import NavbarWithAuth from "@/components/navbar";
import Footer from "@/components/footer";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface Berita {
  id: string;
  judul: string;
  konten: string;
  penulis: string;
  foto_urls: string[] | null; 
  created_at: string;
}

async function getBerita(id: string): Promise<Berita | null> {
  const supabase = createClient();
  const { data, error } = await (await supabase)
    .from("berita")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) {
    return null;
  }
  return data as Berita;
}

export default async function BeritaDetailPage({ params }: { params: Promise<{ id: string }> }) { 
  
  const resolvedParams = await params; 

  const berita = await getBerita(resolvedParams.id);

  if (!berita) {
    notFound();
  }

  return (
    <main>
      <NavbarWithAuth />

      <div className="w-full bg-white">
        <div className="max-w-4xl mx-auto px-4 md:px-8 py-8">
          
          <Link
            href="/" 
            className="flex items-center gap-2 text-red-600 hover:text-red-700 mb-8 font-semibold transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Kembali
          </Link>

          {berita.foto_urls && berita.foto_urls.length > 0 ? (
            <div className="mb-8 rounded-lg overflow-hidden shadow-lg">
              <Carousel images={berita.foto_urls} alt={berita.judul} />
            </div>
          ) : (
            <div className="mb-8 rounded-lg overflow-hidden shadow-lg h-96 bg-gray-200 flex items-center justify-center text-gray-500">
              Tidak Ada Foto
            </div>
          )}
          <article className="prose prose-lg max-w-none">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">{berita.judul}</h1>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between text-gray-600 mb-8 pb-8 border-b border-gray-200">
              <span className="font-semibold">Penulis: {berita.penulis}</span>
              <span>
                {new Date(berita.created_at).toLocaleDateString("id-ID", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>

            <div className="text-gray-700 leading-relaxed whitespace-pre-line text-lg">{berita.konten}</div>
          </article>
        </div>
      </div>

      <Footer />
    </main>
  );
}