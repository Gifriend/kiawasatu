import Image from "next/image";
import { createClient } from "@/lib/supabase/server";

function groupBy(list: any[], key: string) {
  return list.reduce(function (rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
}

const AnggotaCard = ({ anggota, styleConfig }: any) => {
  return (
    <div className={styleConfig.card}>
      <div className={styleConfig.imageContainer}>
        {anggota.foto_url ? (
          <img
            src={anggota.foto_url}
            alt={anggota.nama}
            className="w-full h-full object-cover object-top rounded"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500 text-xs">
            No Photo
          </div>
        )}
      </div>
      <div className={styleConfig.jabatan}>{anggota.jabatan}</div>
      <div className={styleConfig.nama}>{anggota.nama || "-"}</div>
    </div>
  );
};

export default async function StrukturOrganisasi() {
  const supabase = createClient();
  const { data } = await (await supabase)
    .from("struktur_organisasi")
    .select("*")
    .order("level")
    .order("urutan");

  const struktur = data || [];
  const groupedStruktur = groupBy(struktur, "level");

  const styles = {
    level1: {
      card: "bg-linear-to-br from-red-600 to-red-700 text-white px-10 py-8 rounded-lg font-bold text-center text-lg shadow-lg hover:shadow-xl transition-shadow w-64 flex flex-col items-center",
      imageContainer:
        "w-36 h-44 mb-3 rounded-lg bg-white bg-opacity-20 overflow-hidden relative",
      imageSizes: "144px",
      jabatan: "text-lg",
      nama: "text-sm font-normal mt-2",
    },
    level2: {
      card: "bg-linear-to-br from-red-50 to-white px-8 py-6 rounded-lg text-center font-semibold border-2 border-red-400 hover:border-red-600 transition-colors w-56 shadow-md flex flex-col items-center",
      imageContainer:
        "w-24 h-32 mb-3 rounded-lg bg-red-100 overflow-hidden relative",
      imageSizes: "96px",
      jabatan: "text-red-600 font-bold mb-2",
      nama: "text-sm text-gray-600",
    },
    level3: {
      card: "bg-linear-to-br from-red-100 to-white px-6 py-5 rounded-lg text-center font-semibold border-2 border-red-400 hover:border-red-600 transition-colors shadow-md flex flex-col items-center",
      imageContainer:
        "w-20 h-28 mb-2 rounded-lg bg-red-200 overflow-hidden relative",
      imageSizes: "80px",
      jabatan:
        "text-red-600 font-bold mb-1 text-sm h-10 flex items-center justify-center",
      nama: "text-xs text-gray-600 mt-1",
    },
    level4: {
      card: "bg-linear-to-br from-red-100 to-white px-6 py-4 rounded-lg text-center font-semibold border-2 border-red-500 hover:border-red-700 transition-colors shadow-md flex flex-col items-center",
      imageContainer:
        "w-20 h-28 mb-2 rounded-lg bg-red-200 overflow-hidden relative",
      imageSizes: "80px",
      jabatan: "text-red-600 font-bold mb-1",
      nama: "text-sm text-gray-600",
    },
  };

  return (
    <section
      id="organisasi"
      className="py-16 md:py-24 bg-linear-to-b from-white to-red-50 px-4 md:px-6"
    >
      <div className="mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-red-600 uppercase tracking-wider mb-6">
          Struktur Organisasi
        </h2>
        <p className="text-gray-600 text-lg leading-relaxed max-w-3xl">
          Berikut adalah struktur organisasi pemerintahan Desa Kiawa Satu yang
          bertanggung jawab dalam menjalankan tugas-tugas pemerintahan desa.
        </p>
      </div>

      <div className="flex justify-center">
        <div className="w-full max-w-7xl">
          <div className="flex justify-center flex-wrap gap-12 md:gap-20 mb-16">
            {(groupedStruktur["1"] || []).map((anggota: any) => (
              <AnggotaCard
                key={anggota.id}
                anggota={anggota}
                styleConfig={styles.level1}
              />
            ))}
          </div>

          <div className="flex justify-center flex-wrap gap-12 md:gap-20 mb-16">
            {(groupedStruktur["2"] || []).map((anggota: any) => (
              <AnggotaCard
                key={anggota.id}
                anggota={anggota}
                styleConfig={styles.level2}
              />
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {(groupedStruktur["3"] || []).map((anggota: any) => (
              <AnggotaCard
                key={anggota.id}
                anggota={anggota}
                styleConfig={styles.level3}
              />
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {(groupedStruktur["4"] || []).map((anggota: any) => (
              <AnggotaCard
                key={anggota.id}
                anggota={anggota}
                styleConfig={styles.level4}
              />
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(groupedStruktur["5"] || []).map((anggota: any) => (
              <AnggotaCard
                key={anggota.id}
                anggota={anggota}
                styleConfig={styles.level4}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
