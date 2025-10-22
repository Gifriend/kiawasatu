'use client'

import { useState, useEffect } from 'react'
import { Building2, Scroll, Target } from 'lucide-react'
import PopupJelajahiDesa from './popup-jelajahi-desa'

const MODAL_CONTENT = {
  profil: {
    title: 'Profil Desa',
    content: `Desa Kiawa Satu adalah sebuah desa yang terletak di Kabupaten Minahasa, Provinsi Sulawesi Utara. Desa ini memiliki potensi alam yang kaya dan masyarakat yang dinamis.

Secara administratif, Desa Kiawa Satu terdiri dari beberapa lingkungan dengan total populasi penduduk yang terus berkembang. Desa ini memiliki luas wilayah yang strategis dan dapat diakses dengan mudah.

Pemerintah Desa Kiawa Satu berkomitmen untuk memberikan pelayanan terbaik kepada masyarakat dan mengembangkan potensi desa secara berkelanjutan. Kami bekerja sama dengan berbagai stakeholder untuk meningkatkan kualitas hidup masyarakat.

Visi kami adalah menjadi desa yang maju, sejahtera, dan berkelanjutan. Melalui berbagai program pembangunan, kami terus berinovasi untuk memberikan dampak positif bagi seluruh masyarakat.`,
  },
  sejarah: {
    title: 'Sejarah Desa',
    content: `Desa Kiawa Satu memiliki sejarah panjang yang kaya dengan nilai-nilai budaya lokal. Desa ini telah berkembang dari pemukiman kecil menjadi desa dengan infrastruktur modern yang memadai.

Pada awal terbentuknya, Desa Kiawa Satu merupakan bagian dari wilayah yang dihuni oleh masyarakat yang mengandalkan sektor pertanian dan peternakan. Seiring dengan perkembangan zaman, desa ini terus mengalami transformasi.

Masyarakat Desa Kiawa Satu dikenal dengan karakter yang gotong royong dan solidaritas yang tinggi. Nilai-nilai tradisional ini tetap dipertahankan sambil membuka diri terhadap perkembangan modern.

Hingga saat ini, Desa Kiawa Satu terus berkembang dengan tetap mempertahankan identitas lokal dan nilai-nilai budaya yang menjadi fondasi kehidupan masyarakat desa.`,
  },
  visiMisi: {
    title: 'Visi & Misi',
    content: `VISI DESA KIAWA SATU:
Menjadi desa yang maju, sejahtera, dan berkelanjutan dengan masyarakat yang berkarakter, inovatif, dan responsif terhadap perubahan zaman.

MISI DESA KIAWA SATU:
1. Meningkatkan kualitas pelayanan publik melalui aparatur desa yang profesional dan berintegritas tinggi

2. Mengembangkan potensi ekonomi lokal dengan memberdayakan masyarakat melalui program-program pemberdayaan yang strategis

3. Menjaga kelestarian lingkungan dan pembangunan berkelanjutan untuk generasi mendatang

4. Meningkatkan akses pendidikan, kesehatan, dan infrastruktur dasar bagi seluruh masyarakat desa

5. Memperkuat partisipasi masyarakat dalam setiap proses pengambilan keputusan pembangunan desa

6. Membangun kemitraan yang solid dengan berbagai pihak untuk akselerasi pembangunan desa`,
  },
}

export default function JelajahiDesa() {
  const [modal, setModal] = useState<keyof typeof MODAL_CONTENT | null>(null)

  const cards = [
    { id: 'profil' as const, icon: Building2, title: 'Profil Desa' },
    { id: 'sejarah' as const, icon: Scroll, title: 'Sejarah Desa' },
    { id: 'visiMisi' as const, icon: Target, title: 'Visi & Misi' },
  ]

  // Listen untuk custom event dari navbar
  useEffect(() => {
    const handleNavigateToJelajahi = (event: Event) => {
      const customEvent = event as CustomEvent
      setModal(customEvent.detail.id as keyof typeof MODAL_CONTENT)
    }

    window.addEventListener('navigateToJelajahi', handleNavigateToJelajahi)
    return () => window.removeEventListener('navigateToJelajahi', handleNavigateToJelajahi)
  }, [])

  return (
    <>
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
              <button
                key={card.id}
                onClick={() => setModal(card.id)}
                className="bg-gradient-to-br from-red-50 to-white p-8 rounded-lg shadow-md border border-red-100 hover:shadow-xl hover:border-red-300 hover:scale-105 transition-all duration-300 text-left group cursor-pointer"
              >
                <div className="mb-4">
                  <IconComponent className="w-16 h-16 text-red-600 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="text-2xl font-bold text-red-600 mb-4">{card.title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  Klik untuk membaca lebih lanjut tentang {card.title.toLowerCase()}.
                </p>
              </button>
            )
          })}
        </div>
      </section>

      {modal && (
        <PopupJelajahiDesa
          isOpen={true}
          onClose={() => setModal(null)}
          title={MODAL_CONTENT[modal].title}
          content={MODAL_CONTENT[modal].content}
        />
      )}
    </>
  )
}