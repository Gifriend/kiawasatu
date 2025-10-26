"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import Link from "next/link"

interface Berita {
  id: string
  judul: string
  konten: string
  penulis: string
  foto_url: string | null
  created_at: string
}

export default function BeritaDisplay() {
  const [beritaList, setBeritaList] = useState<Berita[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const loadBerita = async () => {
      try {
        const { data, error } = await supabase.from("berita").select("*").order("created_at", { ascending: false })

        if (error) throw error

        setBeritaList(data || [])
      } catch (error) {
        console.error("Error loading berita:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadBerita()

    // Realtime update
    const channel = supabase
      .channel("realtime:berita")
      .on("postgres_changes", { event: "*", schema: "public", table: "berita" }, () => {
        loadBerita()
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  if (isLoading) {
    return (
      <section id="berita" className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Berita Desa</h2>
          <div className="text-center text-gray-500">
            <p>Loading...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="berita" className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Berita Desa</h2>

        {beritaList.length === 0 ? (
          <div className="text-center text-gray-500">
            <p>Belum ada berita. Kembali lagi nanti.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {beritaList.map((berita) => (
              <Link
                key={berita.id}
                href={`/berita/${berita.id}`}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition cursor-pointer block"
              >
                {berita.foto_url && (
                  <img
                    src={berita.foto_url || "/placeholder.svg"}
                    alt={berita.judul}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{berita.judul}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-3">{berita.konten}</p>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{berita.penulis}</span>
                    <span>{new Date(berita.created_at).toLocaleDateString("id-ID")}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
