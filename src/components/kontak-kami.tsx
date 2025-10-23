import { MapPin, Phone, Mail } from "lucide-react"

export default function KontakKami() {
  return (
    <section id="kontak" className="py-16 md:py-24 border-b border-gray-200">
      <div className="mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-red-600 uppercase tracking-wider mb-6">Kontak Kami</h2>
        <p className="text-gray-600 text-lg leading-relaxed max-w-3xl">
          Hubungi kami untuk informasi lebih lanjut tentang Desa Kiawa Satu.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-gradient-to-br from-red-50 to-white border-2 border-red-100 rounded-lg p-8 text-center hover:border-red-300 hover:shadow-lg transition-all">
          <MapPin className="w-16 h-16 text-red-600 mx-auto mb-4" />
          <h3 className="font-bold text-lg text-red-600 mb-3">Alamat</h3>
          <p className="text-gray-600 leading-relaxed">Desa Kiawa Satu, Kabupaten Minahasa, Sulawesi Utara</p>
        </div>

        <div className="bg-gradient-to-br from-red-50 to-white border-2 border-red-100 rounded-lg p-8 text-center hover:border-red-300 hover:shadow-lg transition-all">
          <Phone className="w-16 h-16 text-red-600 mx-auto mb-4" />
          <h3 className="font-bold text-lg text-red-600 mb-3">Telepon</h3>
          <p className="text-gray-600 leading-relaxed">(0431) 123-4567</p>
        </div>

        <div className="bg-gradient-to-br from-red-50 to-white border-2 border-red-100 rounded-lg p-8 text-center hover:border-red-300 hover:shadow-lg transition-all">
          <Mail className="w-16 h-16 text-red-600 mx-auto mb-4" />
          <h3 className="font-bold text-lg text-red-600 mb-3">Email</h3>
          <p className="text-gray-600 leading-relaxed">info@desakiawasatu.id</p>
        </div>
      </div>
    </section>
  )
}
