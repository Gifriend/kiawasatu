"use client"

import { useParams, useRouter } from "next/navigation"
import NavbarWithAuth from "@/components/navbar"
import Footer from "@/components/footer"
import { ArrowLeft } from "lucide-react"

const POTENSI_DATA = {
  pertanian: {
    id: "pertanian",
    title: "Pertanian",
    // heroImage: "/images/tees.jpg",
    sections: [
      {
        title: "Lahan Pertanian yang Subur",
        description:
          "Desa Kiawa Satu memiliki lahan pertanian yang sangat subur dengan struktur tanah yang mendukung berbagai jenis tanaman. Tanah dengan kandungan nutrisi tinggi memungkinkan petani untuk melakukan pertanian berkelanjutan dengan hasil yang optimal.",
      },
      {
        title: "Jenis Tanaman Utama",
        description:
          "Tanaman utama yang ditanam di desa ini meliputi padi, jagung, dan palawija lainnya. Setiap musim, petani dapat menghasilkan panen yang berlimpah berkat kondisi alam yang mendukung dan pengetahuan pertanian yang telah diwariskan turun-temurun.",
      },
      {
        title: "Sistem Irigasi Modern",
        description:
          "Desa telah mengembangkan sistem irigasi yang efisien untuk memastikan ketersediaan air sepanjang tahun. Infrastruktur ini mendukung intensifikasi pertanian dan meningkatkan produktivitas lahan.",
      },
      {
        title: "Program Pemberdayaan Petani",
        description:
          "Pemerintah desa aktif memberikan pelatihan dan pendampingan kepada petani tentang teknik pertanian modern, penggunaan pupuk organik, dan manajemen hasil panen untuk meningkatkan nilai jual produk pertanian.",
      },
      {
        title: "Potensi Agribisnis",
        description:
          "Selain pertanian subsisten, terdapat peluang besar untuk mengembangkan agribisnis dengan mengolah hasil pertanian menjadi produk bernilai tambah seperti tepung, keripik, dan makanan siap jual lainnya.",
      },
    ],
  },
  peternakan: {
    id: "peternakan",
    title: "Peternakan",
    heroImage: "/images/minahasa.jpg",
    sections: [
      {
        title: "Populasi Ternak yang Berkembang",
        description:
          "Peternakan di Desa Kiawa Satu menunjukkan pertumbuhan yang konsisten. Populasi ternak sapi, kambing, dan ayam terus bertambah, mencerminkan meningkatnya minat masyarakat terhadap usaha peternakan sebagai sumber pendapatan alternatif.",
      },
      {
        title: "Peternakan Sapi Potong",
        description:
          "Usaha peternakan sapi potong menjadi salah satu fokus utama dengan sistem pemeliharaan yang semi-intensif. Masyarakat telah mengadopsi teknologi pemberian pakan berkualitas tinggi untuk menghasilkan ternak yang lebih produktif.",
      },
      {
        title: "Peternakan Kambing dan Domba",
        description:
          "Kambing dan domba banyak dipelihara oleh masyarakat karena memerlukan investasi awal yang lebih rendah dan perawatan yang lebih mudah. Produktivitas tinggi membuat usaha ini menjadi pilihan populer di kalangan petani peternak.",
      },
      {
        title: "Usaha Peternakan Unggas",
        description:
          "Peternakan ayam potong dan petelur berkembang pesat di desa ini. Banyak masyarakat yang mulai mengembangkan usaha ini dalam skala kecil hingga menengah dengan hasil yang menguntungkan.",
      },
      {
        title: "Penyediaan Pakan Ternak",
        description:
          "Untuk mendukung perkembangan peternakan, telah berkembang usaha penyediaan pakan ternak berkualitas. Beberapa petani juga mengolah limbah pertanian menjadi pakan alternatif yang ekonomis dan bergizi.",
      },
      {
        title: "Program Kesehatan Ternak",
        description:
          "Desa memfasilitasi program kesehatan ternak melalui vaksinasi rutin dan pendampingan teknis dari petugas lapangan. Ini memastikan kesehatan ternak terjaga dan produktivitas tetap optimal.",
      },
    ],
  },
}

export default function PotensiDetailPage() {
  const params = useParams()
  const router = useRouter()
  const potensi = POTENSI_DATA[params.id as keyof typeof POTENSI_DATA]

  if (!potensi) {
    return (
      <main>
        <NavbarWithAuth />
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-gray-500">Potensi tidak ditemukan</p>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main>
      <NavbarWithAuth />

      <div className="w-full bg-white">
        {/* Hero Image */}
        {/* <div className="w-full h-96 overflow-hidden">
          <img
            // src={potensi.heroImage || "/placeholder.svg"}
            alt={potensi.title}
            className="w-full h-full object-cover"
          />
        </div> */}

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
            {potensi.title}
          </h1>

          {/* Sections */}
          <div className="space-y-12">
            {potensi.sections.map((section, index) => (
              <div key={index} className="border-l-4 border-red-600 pl-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">{section.title}</h2>
                <p className="text-gray-700 leading-relaxed text-lg">{section.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
