import { Calendar } from "lucide-react"

export default function BeritaDesa() {
  const news = [
    {
      title: "Pembangunan Jalan Desa Selesai",
      date: "15 Oktober 2025",
      content: "Proyek pembangunan jalan desa telah selesai dilaksanakan dengan hasil yang memuaskan.",
    },
    {
      title: "Program Kesehatan Masyarakat",
      date: "10 Oktober 2025",
      content: "Desa mengadakan program pemeriksaan kesehatan gratis untuk seluruh masyarakat.",
    },
    {
      title: "Pelatihan Keterampilan Masyarakat",
      date: "05 Oktober 2025",
      content: "Pemerintah desa mengadakan pelatihan keterampilan untuk meningkatkan ekonomi masyarakat.",
    },
  ]

  return (
    <section id="berita" className="py-16 md:py-24 border-b border-gray-200">
      <div className="mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-red-600 uppercase tracking-wider mb-6">Berita Desa</h2>
        <p className="text-gray-600 text-lg leading-relaxed max-w-3xl">
          Informasi terbaru dan berita-berita penting dari Desa Kiawa Satu.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {news.map((item, index) => (
          <div
            key={index}
            className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden hover:border-red-300 hover:shadow-lg transition-all"
          >
            <div className="bg-gradient-to-r from-red-600 to-red-700 h-3"></div>
            <div className="p-6">
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                <Calendar className="w-4 h-4" />
                {item.date}
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-3 line-clamp-2">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed text-sm">{item.content}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
