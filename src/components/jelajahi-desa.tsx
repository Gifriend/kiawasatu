"use client"

import { useState } from "react"
import { Building2, Scroll, Target } from "lucide-react"
import Link from "next/link"

const MODAL_CONTENT = {
  profil: {
    title: "Profil Desa",
  },
  sejarah: {
    title: "Sejarah Desa",
  },
  visiMisi: {
    title: "Visi & Misi",
  },
}

export default function JelajahiDesa() {
  const [modal, setModal] = useState<keyof typeof MODAL_CONTENT | null>(null)

  const cards = [
    { id: "profil" as const, icon: Building2, title: "Profil Desa" },
    { id: "sejarah" as const, icon: Scroll, title: "Sejarah Desa" },
    { id: "visiMisi" as const, icon: Target, title: "Visi & Misi" },
  ]

  return (
    <section id="jelajahi" className="py-16 md:py-24 border-b border-gray-200">
      <div className="mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-red-600 uppercase tracking-wider mb-6">Jelajahi Desa</h2>
        <p className="text-gray-600 text-lg leading-relaxed max-w-3xl">
          Pelajari lebih lanjut tentang Desa Kiawa Satu melalui profil, sejarah, serta visi dan misi kami. Klik pada
          salah satu kartu di bawah untuk membaca informasi lengkapnya.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card) => {
          const IconComponent = card.icon
          return (
            <Link
              key={card.id}
              href={`/jelajahi/${card.id}`}
              className="bg-linear-to-br from-red-50 to-white p-8 rounded-lg shadow-md border border-red-100 hover:shadow-xl hover:border-red-300 hover:scale-105 transition-all duration-300 text-left group cursor-pointer block"
            >
              <div className="mb-4">
                <IconComponent className="w-16 h-16 text-red-600 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-2xl font-bold text-red-600 mb-4">{card.title}</h3>
              <p className="text-gray-600 leading-relaxed">
                Klik untuk membaca lebih lanjut tentang {card.title.toLowerCase()}.
              </p>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
