"use client"

import { useParams, useRouter } from "next/navigation"
import NavbarWithAuth from "@/components/navbar"
import Footer from "@/components/footer"
import { ArrowLeft, Target, Compass, CheckCircle2 } from "lucide-react"

const JELAJAHI_DATA: Record<string, { title: string; content?: string; isHistoryPage?: boolean; isVisionMissionPage?: boolean }> = {
  profil: {
    title: "Profil Desa",
    content: `Desa Kiawa Satu adalah sebuah desa yang terletak di Kabupaten Minahasa, Provinsi Sulawesi Utara. Desa ini memiliki potensi alam yang kaya dan masyarakat yang dinamis.

Secara administratif, Desa Kiawa Satu terdiri dari beberapa lingkungan dengan total populasi penduduk yang terus berkembang. Desa ini memiliki luas wilayah yang strategis dan dapat diakses dengan mudah.

Pemerintah Desa Kiawa Satu berkomitmen untuk memberikan pelayanan terbaik kepada masyarakat dan mengembangkan potensi desa secara berkelanjutan. Kami bekerja sama dengan berbagai stakeholder untuk meningkatkan kualitas hidup masyarakat.

Visi kami adalah menjadi desa yang maju, sejahtera, dan berkelanjutan. Melalui berbagai program pembangunan, kami terus berinovasi untuk memberikan dampak positif bagi seluruh masyarakat.`,
  },
  sejarah: {
    title: "Sejarah Desa",
    isHistoryPage: true,
  },
  visiMisi: {
    title: "Visi & Misi",
    isVisionMissionPage: true,
  },
}

const VisionMissionContent = () => {
  const misiItems = [
    "Peningkatan Mutu Pelayanan Pemerintahan Desa Kepada Masyarakat",
    "Pengembangan Koordinasi Pelaksanaan Program dan Kebijakan Pemerintah Pusat dan Daerah Serta Perintisan, Perbaikan Sarana dan Prasarana Pedesaan",
    "Peningkatan Potensi Sumber Daya Manusia Melalui Pendidikan Bermutu, Kesehatan dan Pengembangan Minat Bakat Generasi Muda",
    "Peningkatan Gerakan Ekonomi Rakyat",
    "Pengembangan Kemitraan dan Kerjasama antar Lembaga Umat Beragama dan Peningkatan Kesadaran Hukum Antar Warga Masyarakat"
  ]

  return (
    <div className="space-y-12">
      {/* VISI */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
        <div className="lg:col-span-1 flex justify-center">
          <div className="w-24 h-24 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center shadow-lg">
            <Target className="w-12 h-12 text-white" />
          </div>
        </div>
        <div className="lg:col-span-2">
          <h2 className="text-3xl md:text-4xl font-bold text-red-600 mb-4 flex items-center gap-3">
            <span className="w-1 h-10 bg-red-600 rounded-full"></span>
            VISI
          </h2>
          <div className="bg-gradient-to-r from-red-50 to-white p-8 rounded-lg border-l-4 border-red-600 shadow-lg">
            <p className="text-gray-800 text-lg leading-relaxed font-semibold">
              "Memberi Diri, Berjuang, Bekerja dan Mengabdi untuk Kepentingan dan Kesejahteraan Masyarakat Desa Kiawa Satu"
            </p>
          </div>
        </div>
      </div>

      {/* MISI */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-24 h-24 bg-gradient-to-br from-white to-red-50 rounded-full flex items-center justify-center shadow-lg border-2 border-red-600">
            <Compass className="w-12 h-12 text-red-600" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-red-600">MISI</h2>
        </div>

        <div className="bg-gradient-to-r from-white to-red-50 p-8 rounded-lg border-l-4 border-red-600 shadow-lg mb-8">
          <p className="text-gray-800 text-lg leading-relaxed font-semibold mb-4">
            Mewujudkan masyarakat Desa Kiawa Satu yang <span className="text-red-600 font-bold">"ESA"</span>
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-700 font-medium">
            <div className="flex items-center gap-2">
              <span className="text-red-600 text-xl">•</span>
              <span>Satu Hati</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-red-600 text-xl">•</span>
              <span>Satu Pikiran</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-red-600 text-xl">•</span>
              <span>Satu Tekad</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-red-600 text-xl">•</span>
              <span>Satu Program</span>
            </div>
          </div>
          <p className="text-gray-700 text-base mt-4 leading-relaxed">
            Untuk membangun masyarakat yang <span className="font-bold text-red-600">Aman, Damai dan Sejahtera</span>
          </p>
        </div>
      </div>

      {/* KEBIJAKAN OPERASIONAL */}
      <div className="space-y-6">
        <h3 className="text-3xl font-bold text-red-600 mb-8 flex items-center gap-3">
          <span className="w-1 h-10 bg-red-600 rounded-full"></span>
          KEBIJAKAN OPERASIONAL
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {misiItems.map((item, index) => (
            <div key={index} className="group">
              <div className="bg-white border-2 border-red-200 rounded-lg p-6 shadow hover:shadow-lg transition-all duration-300 hover:border-red-600 h-full">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-red-600 text-white font-bold">
                      {index + 1}
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-800 leading-relaxed font-medium">
                      {item}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PENUTUP */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700 opacity-10 rounded-lg"></div>
        <div className="relative bg-gradient-to-r from-red-600 to-red-700 text-white p-8 md:p-12 rounded-lg shadow-xl">
          <div className="flex items-start gap-4">
            <CheckCircle2 className="w-8 h-8 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-2xl font-bold mb-3">Komitmen Kami</h3>
              <p className="text-red-50 leading-relaxed text-lg">
                Dengan semangat gotong royong dan kesadaran bersama, Pemerintah Desa Kiawa Satu berkomitmen untuk mewujudkan visi dan misi ini demi terciptanya masyarakat yang berkesejahteraan dan sejahtera.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const HistoryContent = () => {
  const kepalaWalak = [
    { no: 1, tahun: "Tahun 1650-1670", nama: "Keintjem, Palar, Toporundeng, Pesik" },
    { no: 2, tahun: "Tahun 1670-1750", nama: "Lumanaw" },
    { no: 3, tahun: "Tahun 1750-1776", nama: "Tambuwun" },
    { no: 4, tahun: "Tahun 1776-1789", nama: "Sumolang" },
    { no: 5, tahun: "Tahun 1789-1793", nama: "Pinontoan" },
    { no: 6, tahun: "Tahun 1790-1809", nama: "Walewangko" },
    { no: 7, tahun: "Tahun 1809-1824", nama: "Palar" },
    { no: 8, tahun: "Tahun 1824-1845", nama: "Hermanus Willem Dotulong (Tololiu)" },
    { no: 9, tahun: "Tahun 1845-1850", nama: "Ponamon, Wowor" },
  ]

  const hukumTua = [
    { tahun: "Tahun 1850-1878", nama: "Enos Palar", status: "DEFINITIF" },
    { tahun: "Tahun 1878-1906", nama: "Adrianus Palar", status: "DEFINITIF" },
    { tahun: "Tahun 1906-1911", nama: "Arnolus Palar", status: "DEFINITIF" },
    { tahun: "Tahun 1911-1936", nama: "Herlin Palar", status: "DEFINITIF" },
    { tahun: "Tahun 1936-1950", nama: "Johanis Suak", status: "DEFINITIF" },
    { tahun: "Tahun 1950-1954", nama: "Josis Rawung Palar", status: "DEFINITIF" },
    { tahun: "Tahun 1954-1958", nama: "Marthin L Rakian", status: "DEFINITIF" },
    { tahun: "Tahun 1958-1963", nama: "Dirk Silap", status: "PEJABAT HUKUM TUA" },
    { tahun: "Tahun 1963-1971", nama: "Altien Lombok", status: "DEFINITIF" },
    { tahun: "Tahun 1971-1974", nama: "Soleman Piri", status: "PEJABAT" },
    { tahun: "Tahun 1975-1981", nama: "M.L Suak", status: "DEFINITIF" },
    { tahun: "Tahun 1981-1988", nama: "Jopie Rondonuwu", status: "DEFINITIF" },
    { tahun: "Tahun 1988-1989", nama: "Joost Toporundeng", status: "PEJABAT" },
    { tahun: "Tahun 1990-1999", nama: "P.H Piri", status: "DEFINITIF" },
    { tahun: "Tahun 1999-2004", nama: "Drs. Dharma Palar", status: "DEFINITIF" },
    { tahun: "Tahun 2004-2006", nama: "Yantje Walukow", status: "PEJABAT" },
    { tahun: "Tahun 2007-Sekarang", nama: "Nortje Tendean, SE", status: "DEFINITIF (Di mekarkan menjadi tiga Desa)" },
  ]

  const panitiaPemekaran = [
    { jabatan: "Hukum Tua", nama: "Ny. Nortje Palar Tendean, SE" },
    { jabatan: "Ketua", nama: "Joppie Rondonuwu" },
    { jabatan: "Wakil Ketua", nama: "Drs. Darma Palar" },
    { jabatan: "Sekretaris", nama: "Jaudi Polii" },
    { jabatan: "Bendahara", nama: "Jappi Walukow, SE" },
  ]

  return (
    <div className="space-y-12">
      {/* Pendahuluan */}
      <div className="space-y-4">
        <h2 className="text-3xl font-bold text-red-600 mb-4">Asal Usul Desa Kiawa</h2>
        <p className="text-gray-700 leading-relaxed text-lg">
          Penduduk Desa Kiawa Raya yang ada sekarang ini adalah keturunan dari rombongan sekelompok orang-orang yang bertitik tolak pada pembahagiaan Tanah Malesung oleh nenek moyang di Batu Pinawetengan setelah pada abad ke-10 ditempat bersejarah tersebut.
        </p>
        <p className="text-gray-700 leading-relaxed text-lg">
          Rombongan yang keluar ini adalah sebagian dari pakasaan <strong>TONTEMBOAN (TOMPAKWA)</strong> yang pergi ke suatu tempat arah utara barat laut. Disebut TONTEMBOAN karena orang-orang pada mulanya diam di tempat yang tinggi yaitu di gunung atau di lereng-lereng gunung.
        </p>
        <p className="text-gray-700 leading-relaxed text-lg">
          <strong>TONTEMBOAN</strong> asal katanya <em>"TEMBO"</em> artinya memandang dari tempat tinggi sambil menengok ke bawah. <em>TEMBOAN</em> artinya tempat tinggi. Jadi TONTEMBOAN artinya orang yang diam di tempat tinggi.
        </p>
      </div>

      {/* Tinincasan */}
      <div className="space-y-4 bg-red-50 p-6 rounded-lg border-l-4 border-red-600">
        <h3 className="text-2xl font-bold text-red-600">Periode TININCASAN (Abad XV)</h3>
        <p className="text-gray-700 leading-relaxed">
          Mereka datang berkemah pada suatu tempat yang mereka anggap aman pada mulanya. Tetapi kemudian ternyata tempat itu tidak sehat karena warganya selalu ditimpa penyakit demam, sedangkan warganya semakin banyak. Ternyata pula bahwa tempat ini terletak dekat sungai yang memungkinkan mereka mudah dilanda banjir.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Daerah itu sekarang dikenal dengan nama <strong>"TININCASAN"</strong> asal kata <em>TINCAS</em> yang artinya lari. <strong>TININCASAN</strong> artinya tempat yang ditinggalkan. Tempat itu berada kurang lebih 5 km di sebelah Barat Desa Kiawa I.
        </p>
      </div>

      {/* Nimawale */}
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-red-600">Periode NIMAWALE (Sekitar Tahun 1600)</h3>
        <p className="text-gray-700 leading-relaxed">
          Sekitar tahun 1600 warga TININCASAN beralih ke timur ke suatu tempat yang sekarang dikenal dengan nama <strong>"NIMAWALE"</strong> asal kata <em>WALE</em> artinya rumah. <strong>NIMAWALE</strong> artinya bekas perumahan dimana tempat ini sekarang sudah menjadi perkebunan rakyat.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Tempat <strong>NIMAWALE</strong> yang aman sehingga memungkinkan mereka membangun rumah tempat tinggal dan menyediakan <strong>WARUGA</strong> (Timbukan), sebagai tempat penyimpanan mayat (kuburan) untuk Tonaas-tonaas yang meninggal dunia atau kuburan orang besar.
        </p>
        <div className="bg-yellow-50 p-4 rounded border-l-4 border-yellow-500">
          <p className="text-gray-700 leading-relaxed italic">
            <strong>Catatan:</strong> Waruga itu masih ada sekarang kurang lebih 30 buah banyaknya, ada yang terkelompok, ada juga yang tersendiri. Ini membuktikan bahwa tempat asal Desa Kiawa pada waktu itu merupakan tempat himpunan orang-orang satria.
          </p>
        </div>
      </div>

      {/* Songkel/Sonder */}
      <div className="space-y-4 bg-red-50 p-6 rounded-lg border-l-4 border-red-600">
        <h3 className="text-2xl font-bold text-red-600">Periode SONGKEL/SONDER (Sekitar Tahun 1650)</h3>
        <p className="text-gray-700 leading-relaxed">
          Pada sekitar tahun 1650 mereka berhasil menentukan tempat baru di sebelah timur <strong>NIMAWALE</strong> dipimpin oleh <strong>Tonaas KEINTJEM, PALAR, PESIK, TOPORUNDENG, dan MANGOWAL</strong>.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Penentuan daerah baru ini menjadi tempat tinggal perkampungan melalui tata cara kebudayaan asli Minahasa. Sebagai tanda diperolehnya daerah baru maka ditancapkanlah sebuah batu yang dianggap sebagai batu penjuru negeri yang disebut <strong>BATU TUMOTOWA</strong>, asal kata <em>TOWA</em> artinya panggil, <em>TUMOTOWA</em> artinya memanggil.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Batu itu merupakan batu <strong>TINAINIAN</strong> yaitu batu yang dianggap tempat pemujaan waktu mendirikan negeri. Batu TUMOTOWA terletak di ujung barat Desa Kiawa (bagian Baras Desa Kiawa I Barat/samping SD Inpres Kiawa sekarang).
        </p>
        <div className="bg-yellow-50 p-4 rounded border-l-4 border-yellow-500">
          <p className="text-gray-700 leading-relaxed">
            Tempat yang baru ini mereka beri nama <strong>SONGKEL</strong> karena di tempat yang baru ini terdapat banyak burung Songkel (sejenis burung Moleo) yang kegemarannya yaitu merendamkan badannya di air. Jadi daerah KIAWA sekarang ini sebenarnya bernama <strong>SONDER</strong> sampai dengan tahun 1845.
          </p>
        </div>
      </div>

      {/* Perpindahan ke Utara */}
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-red-600">Perpindahan ke Utara (Tahun 1845)</h3>
        <p className="text-gray-700 leading-relaxed">
          Pada tahun 1845 penduduk ingin mencari tempat baru ke sebelah utara, mencari daerah yang banyak air yang baik untuk dijadikan sawah dan ternak ikan. Perpindahan penduduk ini dipimpin oleh <strong>Tonaas TOLOLIU HERMANUS WILEM DOTULONG</strong> yang lahir pada tanggal 12 Januari 1795.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Penduduk yang beralih ke utara sekaligus membawa nama SONGKEL/SONDER (penduduk Sonder berasal dari Desa Kiawa).
        </p>
      </div>

      {/* Asal Nama Kiawa */}
      <div className="space-y-4 bg-red-50 p-6 rounded-lg border-l-4 border-red-500">
        <h3 className="text-2xl font-bold text-red-600">Asal Nama KIAWA</h3>
        <p className="text-gray-700 leading-relaxed">
          Sebagian penduduk ragu-ragu mengikuti jejak Tonaas dan penduduk yang menuju ke utara. Penduduk yang tinggal dan ragu-ragu untuk berpindah menamakan diri mereka <strong>CAKIO-KIOWA</strong> (Ragu-ragu).
        </p>
        <p className="text-gray-700 leading-relaxed">
          Nama Kiowa kemudian dirubah menjadi <strong>Kiawa</strong>.
        </p>
      </div>

      {/* Pemekaran Desa */}
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-red-600">Pemekaran Desa</h3>
        <div className="space-y-3">
          <div className="bg-white p-4 rounded border-l-4 border-red-600 shadow-sm">
            <p className="text-gray-700 leading-relaxed">
              <strong>17 Oktober 1977:</strong> Desa dimekarkan menjadi dua Desa, yaitu <strong>Desa Kiawa I</strong> dan <strong>Desa Kiawa II</strong>
            </p>
          </div>
          <div className="bg-white p-4 rounded border-l-4 border-red-600 shadow-sm">
            <p className="text-gray-700 leading-relaxed">
              <strong>17 September 2008:</strong> Desa Kiawa I dimekarkan menjadi tiga Desa, yaitu <strong>Desa Kiawa I (Induk)</strong>, <strong>Desa Kiawa I Barat</strong>, dan <strong>Desa Kiawa I Utara</strong>
            </p>
          </div>
        </div>
      </div>

      {/* Penduduk Mula-mula */}
      <div className="space-y-4 bg-red-50 p-6 rounded-lg">
        <h3 className="text-2xl font-bold text-red-600">Penduduk Mula-mula</h3>
        <ul className="space-y-2 text-gray-700 leading-relaxed">
          <li className="flex items-start">
            <span className="text-red-600 mr-2">•</span>
            <span>Penduduk Asal Desa Kiawa I adalah keturunan dari penduduk yang hidup sekitar tahun 1600 sampai 1650 (penduduk asli)</span>
          </li>
          <li className="flex items-start">
            <span className="text-red-600 mr-2">•</span>
            <span>Penduduk Desa Kiawa I sekarang adalah hasil perkembangan penduduk Desa Kiawa yang pada umumnya adalah penduduk asli suku <strong>TOUNTEMBOAN</strong></span>
          </li>
        </ul>
      </div>

      {/* Tabel Kepala Walak/Tonaas */}
      <div className="space-y-4">
        <h2 className="text-3xl font-bold text-red-600 mb-6">Tokoh-tokoh Pendiri Desa</h2>
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Kepala Walak / Tonaas</h3>
        <div className="overflow-x-auto shadow-lg rounded-lg">
          <table className="w-full border-collapse bg-white">
            <thead>
              <tr className="bg-red-600 text-white">
                <th className="border border-red-700 px-6 py-4 text-left font-semibold">No.</th>
                <th className="border border-red-700 px-6 py-4 text-left font-semibold">Periode</th>
                <th className="border border-red-700 px-6 py-4 text-left font-semibold">Nama</th>
              </tr>
            </thead>
            <tbody>
              {kepalaWalak.map((item, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                  <td className="border border-gray-300 px-6 py-4 text-gray-800">{item.no}</td>
                  <td className="border border-gray-300 px-6 py-4 text-gray-800 font-medium">{item.tahun}</td>
                  <td className="border border-gray-300 px-6 py-4 text-gray-800">{item.nama}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tabel Hukum Tua */}
      <div className="space-y-4">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Hukum Tua - Hukum Tua</h3>
        <div className="overflow-x-auto shadow-lg rounded-lg">
          <table className="w-full border-collapse bg-white">
            <thead>
              <tr className="bg-red-600 text-white">
                <th className="border border-red-700 px-6 py-4 text-left font-semibold">Periode</th>
                <th className="border border-red-700 px-6 py-4 text-left font-semibold">Nama</th>
                <th className="border border-red-700 px-6 py-4 text-left font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {hukumTua.map((item, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                  <td className="border border-gray-300 px-6 py-4 text-gray-800 font-medium">{item.tahun}</td>
                  <td className="border border-gray-300 px-6 py-4 text-gray-800">{item.nama}</td>
                  <td className="border border-gray-300 px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      item.status.includes("DEFINITIF") 
                        ? "bg-green-100 text-green-800" 
                        : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Panitia Pemekaran */}
      <div className="space-y-4 bg-gradient-to-r from-red-50 to-white p-6 rounded-lg border-2 border-red-200">
        <h3 className="text-2xl font-semibold text-red-600 mb-4">Panitia Pemekaran Desa Kiawa I (2008)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {panitiaPemekaran.map((item, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow border-l-4 border-red-600">
              <p className="text-sm text-gray-600 font-semibold uppercase mb-1">{item.jabatan}</p>
              <p className="text-lg text-gray-800 font-bold">{item.nama}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 p-4 bg-yellow-50 rounded border-l-4 border-yellow-500">
          <p className="text-gray-700 text-sm italic">
            <strong>Catatan:</strong> Desa Kiawa I dimekarkan menjadi Desa Kiawa I (Induk), Desa Kiawa I Barat, dan Desa Kiawa I Utara berdasarkan surat keputusan Bupati Minahasa pada tanggal 17 September 2008.
          </p>
        </div>
      </div>

      {/* Penutup */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-8 rounded-lg shadow-lg">
        <h3 className="text-2xl font-bold mb-4">Warisan Budaya yang Tetap Terjaga</h3>
        <p className="leading-relaxed text-lg">
          Sejarah panjang Desa Kiawa I mencerminkan kearifan nenek moyang dalam membangun peradaban yang harmonis dengan alam. Dari Batu Pinawetengan hingga pemekaran desa di era modern, semangat gotong royong dan nilai-nilai budaya Minahasa tetap menjadi fondasi kehidupan masyarakat.
        </p>
      </div>
    </div>
  )
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
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-12">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-red-600 hover:text-red-700 mb-8 font-semibold transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Kembali
          </button>

          <h1 className="text-4xl md:text-5xl font-bold text-red-600 uppercase tracking-wider mb-12">
            {jelajahi.title}
          </h1>

          {jelajahi.isVisionMissionPage ? (
            <VisionMissionContent />
          ) : jelajahi.isHistoryPage ? (
            <HistoryContent />
          ) : (
            <div className="prose prose-lg max-w-none">
              <div className="text-gray-700 leading-relaxed whitespace-pre-line text-lg">{jelajahi.content}</div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  )
}