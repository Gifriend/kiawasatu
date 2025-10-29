"use client"

import { useState } from "react"
import { Wheat, Beef, Store, ChevronDown } from "lucide-react"
import Link from "next/link"

const POTENSI_DATA = {
  pertanian: {
    id: "pertanian",
    title: "Pertanian",
    icon: Wheat,
    description: "Desa Kiawa Satu memiliki potensi pertanian yang besar dengan berbagai komoditas unggulan seperti cabe, tomat, jagung, dan nilam.",
  },
  peternakan: {
    id: "peternakan",
    title: "Peternakan",
    icon: Beef,
    description: "Sektor peternakan berkembang dengan fokus pada peternakan babi yang menjadi sumber pendapatan masyarakat.",
  },
  usaha_swasta: {
    id: "usaha-swasta",
    title: "Usaha Swasta Rumahan",
    icon: Store,
    description: "Berbagai usaha rumahan berkembang di desa, termasuk produksi kacang shanghai, kue telur, dan kripik berkualitas.",
  },
}

export default function PotensiDesa() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  const potensiBisnis = Object.values(POTENSI_DATA)

  return (
    <section id="potensi" className="py-16 md:py-24 border-b border-gray-200">
      <div className="mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-red-600 uppercase tracking-wider mb-6">
          Potensi Desa
        </h2>
        <p className="text-gray-600 text-lg leading-relaxed max-w-3xl">
          Desa Kiawa Satu memiliki berbagai potensi yang dapat dikembangkan untuk meningkatkan kesejahteraan masyarakat.
          Klik untuk melihat detail setiap potensi bisnis.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {potensiBisnis.map((item) => {
          const IconComponent = item.icon
          const isOpen = openDropdown === item.id

          return (
            <div key={item.id} className="relative">
              <button
                onClick={() => setOpenDropdown(isOpen ? null : item.id)}
                className="w-full bg-gradient-to-br from-red-50 to-white border-2 border-red-100 rounded-xl p-8 hover:border-red-300 hover:shadow-xl transition-all text-left group"
              >
                <IconComponent className="w-16 h-16 text-red-600 mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-2xl font-bold text-red-600 mb-4">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-4">{item.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-red-600 font-semibold">Lihat Detail</span>
                  <ChevronDown 
                    className={`w-5 h-5 text-red-600 transition-transform ${isOpen ? "rotate-180" : ""}`} 
                  />
                </div>
              </button>

              {isOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-red-300 rounded-xl shadow-xl z-10 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                  <Link
                    href={`/potensi/${item.id}`}
                    className="w-full px-6 py-4 text-left hover:bg-red-50 transition-colors text-gray-800 font-semibold border-b border-red-100 flex items-center justify-between group block"
                  >
                    <span>Baca Detail Lengkap</span>
                    <span className="text-red-600 group-hover:translate-x-1 transition-transform">→</span>
                  </Link>
                  <div className="px-6 py-3 bg-red-50 text-sm text-gray-600">
                    Klik untuk membaca penjelasan lengkap tentang {item.title.toLowerCase()}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}