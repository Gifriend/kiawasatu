import { createClient } from "@/lib/supabase/server";
export default async function DataPenduduk() {
  const supabase = createClient();

  const { data: stats } = await (await supabase)
    .from("data_penduduk")
    .select("*")
    .order("urutan");

  return (
    <section id="penduduk" className="py-16 md:py-24 border-b border-gray-200">
      <div className="mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-red-600 uppercase tracking-wider mb-6">Data Penduduk</h2>
        <p className="text-gray-600 text-lg leading-relaxed max-w-3xl">
          Statistik penduduk Desa Kiawa Satu berdasarkan data terkini dari sistem informasi desa.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        
        {(stats || []).map((stat) => (
          <div
            key={stat.id}
            className="bg-linear-to-br from-red-50 to-white p-6 md:p-8 rounded-lg border-2 border-red-100 hover:border-red-300 hover:shadow-md transition-all text-center"
          >
            <div className="text-4xl md:text-5xl font-bold text-red-600 mb-3">{stat.nilai}</div>
            <div className="text-gray-600 font-semibold text-sm md:text-base">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}