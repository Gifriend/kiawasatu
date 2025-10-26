"use client"

import { useParams, useRouter } from "next/navigation"
import NavbarWithAuth from "@/components/navbar"
import Footer from "@/components/footer"
import { ArrowLeft } from "lucide-react"

const JELAJAHI_DATA = {
  profil: {
    title: "Profil Desa",
    content: `Desa Kiawa Satu adalah sebuah desa yang terletak di Kabupaten Minahasa, Provinsi Sulawesi Utara. Desa ini memiliki potensi alam yang kaya dan masyarakat yang dinamis.

Secara administratif, Desa Kiawa Satu terdiri dari beberapa lingkungan dengan total populasi penduduk yang terus berkembang. Desa ini memiliki luas wilayah yang strategis dan dapat diakses dengan mudah.

Pemerintah Desa Kiawa Satu berkomitmen untuk memberikan pelayanan terbaik kepada masyarakat dan mengembangkan potensi desa secara berkelanjutan. Kami bekerja sama dengan berbagai stakeholder untuk meningkatkan kualitas hidup masyarakat.

Visi kami adalah menjadi desa yang maju, sejahtera, dan berkelanjutan. Melalui berbagai program pembangunan, kami terus berinovasi untuk memberikan dampak positif bagi seluruh masyarakat.`,
  },
  sejarah: {
    title: "Sejarah Desa",
    content: `Desa Kiawa Satu memiliki sejarah panjang yang kaya dengan nilai-nilai budaya lokal. Desa ini telah berkembang dari pemukiman kecil menjadi desa dengan infrastruktur modern yang memadai.

Pada awal terbentuknya, Desa Kiawa Satu merupakan bagian dari wilayah yang dihuni oleh masyarakat yang mengandalkan sektor pertanian dan peternakan. Seiring dengan perkembangan zaman, desa ini terus mengalami transformasi.

Masyarakat Desa Kiawa Satu dikenal dengan karakter yang gotong royong dan solidaritas yang tinggi. Nilai-nilai tradisional ini tetap dipertahankan sambil membuka diri terhadap perkembangan modern.

Hingga saat ini, Desa Kiawa Satu terus berkembang dengan tetap mempertahankan identitas lokal dan nilai-nilai budaya yang menjadi fondasi kehidupan masyarakat desa.`,
  },
  visiMisi: {
    title: "Visi & Misi",
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

export default function JelajahiDetailPage() {
  const params = useParams()
  const router = useRouter()
  const jelajahi = JELAJAHI_DATA[params.id as keyof typeof JELAJAHI_DATA]

  if (!jelajahi) {
    return (
      <main>
        <NavbarWithAuth />
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-gray-500">Halaman tidak ditemukan</p>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main>
      <NavbarWithAuth />

      <div className="w-full bg-white">
        <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
          {/* Back Button */}
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-red-600 hover:text-red-700 mb-8 font-semibold transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Kembali
          </button>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-red-600 uppercase tracking-wider mb-12">
            {jelajahi.title}
          </h1>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <div className="text-gray-700 leading-relaxed whitespace-pre-line text-lg">{jelajahi.content}</div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
