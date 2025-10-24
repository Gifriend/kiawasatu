"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"

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
  const [selectedBerita, setSelectedBerita] = useState<Berita | null>(null)
  const supabase = createClient()

  useEffect(() => {
    const loadBerita = async () => {
      try {
        const { data, error } = await supabase.from("berita").select("*").order("created_at", { ascending: false })

        if (error) throw error

        const mappedData = (data || []).map((item) => ({
          ...item,
          foto_url: item.foto_url
            // ? supabase.storage.from("berita-images").getPublicUrl(item.foto_url).data.publicUrl
            // : null,
        }))

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
              <div
                key={berita.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition cursor-pointer"
                onClick={() => setSelectedBerita(berita)}
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
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal Detail Berita */}
      {selectedBerita && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full relative">
            <button
              onClick={() => setSelectedBerita(null)}
              className="absolute top-3 right-3 bg-gray-200 hover:bg-gray-300 rounded-full w-8 h-8 flex items-center justify-center"
            >
              ✕
            </button>

            {selectedBerita.foto_url && (
              <img
                src={selectedBerita.foto_url || "/placeholder.svg"}
                alt={selectedBerita.judul}
                className="w-full h-64 object-cover rounded-t-lg"
              />
            )}

            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-3">{selectedBerita.judul}</h3>
              <p className="text-gray-700 mb-4 whitespace-pre-line">{selectedBerita.konten}</p>
              <div className="flex justify-between text-sm text-gray-500 border-t pt-3">
                <span>Penulis: {selectedBerita.penulis}</span>
                <span>{new Date(selectedBerita.created_at).toLocaleDateString("id-ID")}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
