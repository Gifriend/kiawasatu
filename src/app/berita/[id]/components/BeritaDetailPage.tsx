"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import NavbarWithAuth from "@/components/navbar"
import Footer from "@/components/footer"
import { ArrowLeft } from "lucide-react"

interface Berita {
  id: string
  judul: string
  konten: string
  penulis: string
  foto_url: string | null
  created_at: string
}

export default function BeritaDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [berita, setBerita] = useState<Berita | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const loadBerita = async () => {
      try {
        const { data, error } = await supabase.from("berita").select("*").eq("id", params.id).single()

        if (error) throw error

        const mappedData = {
          ...data,
          foto_url: data.foto_url,
          // ? supabase.storage.from("berita-images").getPublicUrl(data.foto_url).data.publicUrl
          // : null,
        }

        setBerita(data)
      } catch (error) {
        console.error("Error loading berita:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadBerita()
  }, [params.id])

  if (isLoading) {
    return (
      <main>
        <NavbarWithAuth />
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-gray-500">Loading...</p>
        </div>
        <Footer />
      </main>
    )
  }

  if (!berita) {
    return (
      <main>
        <NavbarWithAuth />
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-gray-500">Berita tidak ditemukan</p>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main>
      <NavbarWithAuth />

      <div className="w-full bg-white">
        <div className="max-w-4xl mx-auto px-4 md:px-8 py-8">
          {/* Back Button */}
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-red-600 hover:text-red-700 mb-8 font-semibold transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Kembali
          </button>

          {/* Hero Image */}
          {berita.foto_url && (
            <div className="mb-8 rounded-lg overflow-hidden shadow-lg">
              <img
                src={berita.foto_url || "/placeholder.svg"}
                alt={berita.judul}
                className="w-full h-96 object-cover"
              />
            </div>
          )}

          {/* Content */}
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
  )
}
