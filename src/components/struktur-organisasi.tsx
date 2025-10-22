import Image from 'next/image';

export default function StrukturOrganisasi() {
  return (
    <section id="organisasi" className="py-16 md:py-24 bg-gradient-to-b from-white to-red-50 px-4 md:px-6">
      <div className="mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-red-600 uppercase tracking-wider mb-6">
          Struktur Organisasi
        </h2>
        <p className="text-gray-600 text-lg leading-relaxed max-w-3xl">
          Berikut adalah struktur organisasi pemerintahan Desa Kiawa Satu yang bertanggung jawab dalam menjalankan
          tugas-tugas pemerintahan desa.
        </p>
      </div>

      <div className="flex justify-center">
        <div className="w-full max-w-7xl">
          {/* Level 1: Kepala Desa */}
          <div className="flex justify-center mb-16">
            <div className="bg-gradient-to-br from-red-600 to-red-700 text-white px-10 py-8 rounded-lg font-bold text-center text-lg shadow-lg hover:shadow-xl transition-shadow w-64 flex flex-col items-center">
              <div className="w-36 h-36 mb-3 rounded-lg bg-white bg-opacity-20 flex items-center justify-center overflow-hidden">
                <Image 
                  src="/images/struktur/hukum-tua.jpg" 
                  alt="Hukum Tua" 
                  width={144} 
                  height={144} 
                  className="object-cover rounded"
                />
              </div>
              <div className="text-lg">Hukum Tua</div>
              <div className="text-sm font-normal mt-2">Nortje E. Tendean, SE</div>
            </div>
          </div>

          {/* Level 2: Sekretaris & Bendahara */}
          <div className="flex justify-center gap-12 md:gap-20 mb-16">
            <div className="bg-gradient-to-br from-red-50 to-white px-8 py-6 rounded-lg text-center font-semibold border-2 border-red-400 hover:border-red-600 transition-colors w-56 shadow-md flex flex-col items-center">
              <div className="w-24 h-24 mb-3 rounded-lg bg-red-100 flex items-center justify-center overflow-hidden">
                <Image 
                  src="/images/struktur/sekretaris-desa.jpg" 
                  alt="Sekretaris Desa" 
                  width={96} 
                  height={96} 
                  className="object-cover rounded"
                />
              </div>
              <div className="text-red-600 font-bold mb-2">Sekretaris Desa</div>
              <div className="text-sm text-gray-600">Patrichia Lumintang, SE</div>
            </div>
            <div className="bg-gradient-to-br from-red-50 to-white px-8 py-6 rounded-lg text-center font-semibold border-2 border-red-400 hover:border-red-600 transition-colors w-56 shadow-md flex flex-col items-center">
              <div className="w-24 h-24 mb-3 rounded-lg bg-red-100 flex items-center justify-center overflow-hidden">
                <Image 
                  src="/images/struktur/bendahara-desa.jpg" 
                  alt="Bendahara Desa" 
                  width={96} 
                  height={96} 
                  className="object-cover rounded"
                />
              </div>
              <div className="text-red-600 font-bold mb-2">Bendahara Desa</div>
              <div className="text-sm text-gray-600">Gracella Mait</div>
            </div>
          </div>

          {/* Level 3: Kaur & Kasie */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {/* Kasie Pemerintahan */}
            <div className="bg-gradient-to-br from-red-100 to-white px-6 py-5 rounded-lg text-center font-semibold border-2 border-red-400 hover:border-red-600 transition-colors shadow-md flex flex-col items-center">
              <div className="w-20 h-20 mb-2 rounded-lg bg-red-200 flex items-center justify-center overflow-hidden">
                <Image 
                  src="/images/struktur/kasie-pemerintahan.jpg" 
                  alt="Kasie Pemerintahan" 
                  width={80} 
                  height={80} 
                  className="object-cover rounded"
                />
              </div>
              <div className="text-red-600 font-bold mb-1 text-sm">Kasie Pemerintahan &<br/>Pembinaan Masyarakat</div>
              <div className="text-xs text-gray-600 mt-1">Denny Mamentu</div>
            </div>

            {/* Kasie Pelayanan */}
            <div className="bg-gradient-to-br from-red-100 to-white px-6 py-5 rounded-lg text-center font-semibold border-2 border-red-400 hover:border-red-600 transition-colors shadow-md flex flex-col items-center">
              <div className="w-20 h-20 mb-2 rounded-lg bg-red-200 flex items-center justify-center overflow-hidden">
                <Image 
                  src="/images/struktur/kasie-pelayanan.jpg" 
                  alt="Kasie Pelayanan" 
                  width={80} 
                  height={80} 
                  className="object-cover rounded"
                />
              </div>
              <div className="text-red-600 font-bold mb-1 text-sm">Kasie Pelayanan &<br/>Kesejahteraan</div>
              <div className="text-xs text-gray-600 mt-1">Hengky Luimtang</div>
            </div>

            {/* Kaur Umum */}
            <div className="bg-gradient-to-br from-red-100 to-white px-6 py-5 rounded-lg text-center font-semibold border-2 border-red-400 hover:border-red-600 transition-colors shadow-md flex flex-col items-center">
              <div className="w-20 h-20 mb-2 rounded-lg bg-red-200 flex items-center justify-center overflow-hidden">
                <Image 
                  src="/images/struktur/kaur-umum.jpg" 
                  alt="Kaur Umum" 
                  width={80} 
                  height={80} 
                  className="object-cover rounded"
                />
              </div>
              <div className="text-red-600 font-bold mb-1 text-sm">Kaur Umum</div>
              <div className="text-xs text-gray-600 mt-1">Prisilia Polii</div>
            </div>

            {/* Kaur Perencanaan */}
            <div className="bg-gradient-to-br from-red-100 to-white px-6 py-5 rounded-lg text-center font-semibold border-2 border-red-400 hover:border-red-600 transition-colors shadow-md flex flex-col items-center">
              <div className="w-20 h-20 mb-2 rounded-lg bg-red-200 flex items-center justify-center overflow-hidden">
                <Image 
                  src="/images/struktur/kaur-perencanaan.jpg" 
                  alt="Kaur Perencanaan" 
                  width={80} 
                  height={80} 
                  className="object-cover rounded"
                />
              </div>
              <div className="text-red-600 font-bold mb-1 text-sm">Kaur Perencanaan<br/>Pelaporan Keuangan</div>
              <div className="text-xs text-gray-600 mt-1">Fransisko Karinda</div>
            </div>
          </div>

          {/* Level 4: Kepala Jaga */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-gradient-to-br from-red-100 to-white px-6 py-4 rounded-lg text-center font-semibold border-2 border-red-500 hover:border-red-700 transition-colors shadow-md flex flex-col items-center">
              <div className="w-20 h-20 mb-2 rounded-lg bg-red-200 flex items-center justify-center overflow-hidden">
                <Image 
                  src="/images/struktur/kepala-jaga-1.jpg" 
                  alt="Kepala Jaga I" 
                  width={80} 
                  height={80} 
                  className="object-cover rounded"
                />
              </div>
              <div className="text-red-600 font-bold mb-1">Kepala Jaga I</div>
              <div className="text-sm text-gray-600">Jorry Tambuwun</div>
            </div>

            <div className="bg-gradient-to-br from-red-100 to-white px-6 py-4 rounded-lg text-center font-semibold border-2 border-red-500 hover:border-red-700 transition-colors shadow-md flex flex-col items-center">
              <div className="w-20 h-20 mb-2 rounded-lg bg-red-200 flex items-center justify-center overflow-hidden">
                <Image 
                  src="/images/struktur/kepala-jaga-2.jpg" 
                  alt="Kepala Jaga II" 
                  width={80} 
                  height={80} 
                  className="object-cover rounded"
                />
              </div>
              <div className="text-red-600 font-bold mb-1">Kepala Jaga II</div>
              <div className="text-sm text-gray-600">Fiko Mawey</div>
            </div>

            <div className="bg-gradient-to-br from-red-100 to-white px-6 py-4 rounded-lg text-center font-semibold border-2 border-red-500 hover:border-red-700 transition-colors shadow-md flex flex-col items-center">
              <div className="w-20 h-20 mb-2 rounded-lg bg-red-200 flex items-center justify-center overflow-hidden">
                <Image 
                  src="/images/struktur/kepala-jaga-3.jpg" 
                  alt="Kepala Jaga III" 
                  width={80} 
                  height={80} 
                  className="object-cover rounded"
                />
              </div>
              <div className="text-red-600 font-bold mb-1">Kepala Jaga III</div>
              <div className="text-sm text-gray-600">Nofry Rundungan</div>
            </div>
          </div>

          {/* Level 5: Meweteng Jaga */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-red-100 to-white px-6 py-4 rounded-lg text-center font-semibold border-2 border-red-500 hover:border-red-700 transition-colors shadow-md flex flex-col items-center">
              <div className="w-20 h-20 mb-2 rounded-lg bg-red-200 flex items-center justify-center overflow-hidden">
                <Image 
                  src="/images/struktur/meweteng-jaga-1.jpg" 
                  alt="Meweteng Jaga I" 
                  width={80} 
                  height={80} 
                  className="object-cover rounded"
                />
              </div>
              <div className="text-red-600 font-bold mb-1">Meweteng Jaga I</div>
              <div className="text-sm text-gray-600">Nova Walukow</div>
            </div>

            <div className="bg-gradient-to-br from-red-100 to-white px-6 py-4 rounded-lg text-center font-semibold border-2 border-red-500 hover:border-red-700 transition-colors shadow-md flex flex-col items-center">
              <div className="w-20 h-20 mb-2 rounded-lg bg-red-200 flex items-center justify-center overflow-hidden">
                <Image 
                  src="/images/struktur/meweteng-jaga-2.jpg" 
                  alt="Meweteng Jaga II" 
                  width={80} 
                  height={80} 
                  className="object-cover rounded"
                />
              </div>
              <div className="text-red-600 font-bold mb-1">Meweteng Jaga II</div>
              <div className="text-sm text-gray-600">Silhana Silap</div>
            </div>

            <div className="bg-gradient-to-br from-red-100 to-white px-6 py-4 rounded-lg text-center font-semibold border-2 border-red-500 hover:border-red-700 transition-colors shadow-md flex flex-col items-center">
              <div className="w-20 h-20 mb-2 rounded-lg bg-red-200 flex items-center justify-center overflow-hidden">
                <Image 
                  src="/images/struktur/meweteng-jaga-3.jpg" 
                  alt="Meweteng Jaga III" 
                  width={80} 
                  height={80} 
                  className="object-cover rounded"
                />
              </div>
              <div className="text-red-600 font-bold mb-1">Meweteng Jaga III</div>
              <div className="text-sm text-gray-600">Maya Pangimangen</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}