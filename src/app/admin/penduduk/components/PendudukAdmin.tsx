"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Save } from "lucide-react";

interface Stat {
  id: number;
  label: string;
  nilai: string; // DIUBAH DARI 'value'
  urutan: number;
}

export default function PendudukAdminPage() {
  const [stats, setStats] = useState<Stat[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState<number | null>(null);
  const supabase = createClient();

  const fetchData = async () => {
    setIsLoading(true);
    const { data } = await supabase
      .from("data_penduduk")
      .select("*")
      .order("urutan");
    setStats(data || []);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleValueChange = (id: number, newValue: string) => {
    setStats(
      stats.map((stat) =>
        stat.id === id ? { ...stat, nilai: newValue } : stat 
      )
    );
  };

  const handleLabelChange = (id: number, newLabel: string) => {
    setStats(
      stats.map((stat) =>
        stat.id === id ? { ...stat, label: newLabel } : stat
      )
    );
  };

  const handleSave = async (statToSave: Stat) => {
    setIsSaving(statToSave.id);
    const { error } = await supabase
      .from("data_penduduk")
      .update({ nilai: statToSave.nilai, label: statToSave.label }) // DIUBAH DARI 'value'
      .eq("id", statToSave.id);

    if (error) {
      alert("Gagal menyimpan data");
      console.error(error);
    }
    setIsSaving(null);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <Loader2 className="animate-spin h-8 w-8 text-red-600" />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Kelola Data Penduduk
      </h1>
      <p className="text-gray-600 mb-6">
        Ubah nilai statistik yang akan tampil di halaman depan.
      </p>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="space-y-4">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="flex flex-col md:flex-row items-center gap-4 p-4 border rounded-lg"
            >
              <div className="flex-1 w-full">
                <label className="text-sm font-medium text-gray-500">Label</label>
                <Input
                  value={stat.label}
                  onChange={(e) => handleLabelChange(stat.id, e.target.value)}
                  className="font-semibold"
                />
              </div>
              <div className="flex-1 w-full">
                 <label className="text-sm font-medium text-gray-500">Jumlah</label>
                <Input
                  value={stat.nilai} 
                  onChange={(e) => handleValueChange(stat.id, e.target.value)}
                  className="text-red-600 font-bold text-lg"
                />
              </div>
              <Button
                onClick={() => handleSave(stat)}
                disabled={isSaving === stat.id}
              >
                {isSaving === stat.id ? (
                  <Loader2 className="animate-spin w-5 h-5" />
                ) : (
                  <Save className="w-5 h-5" />
                )}
                <span className="ml-2">Simpan</span>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}