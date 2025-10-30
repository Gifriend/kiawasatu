"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Save } from "lucide-react";

interface InfoDesa {
  id: number;
  nama_info: string;
  nilai_info: string;
}

function formatLabel(key: string) {
  return key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

export default function InfoDesaAdminPage() {
  const [infoList, setInfoList] = useState<InfoDesa[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState<number | null>(null); // Simpan ID yang sedang disimpan
  const supabase = createClient();

  const fetchData = async () => {
    setIsLoading(true);
    const { data } = await supabase
      .from("info_desa")
      .select("*")
      .order("id");
    setInfoList(data || []);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleValueChange = (id: number, newValue: string) => {
    setInfoList(
      infoList.map((info) =>
        info.id === id ? { ...info, nilai_info: newValue } : info
      )
    );
  };

  const handleSave = async (infoToSave: InfoDesa) => {
    setIsSaving(infoToSave.id);
    const { error } = await supabase
      .from("info_desa")
      .update({ nilai_info: infoToSave.nilai_info })
      .eq("id", infoToSave.id);

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
        Kelola Info Profil Desa
      </h1>
      <p className="text-gray-600 mb-6">
        Ubah data yang akan tampil di halaman profil (Jumlah Penduduk, KK, Luas Wilayah).
      </p>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="space-y-4">
          {infoList.map((info) => (
            <div
              key={info.id}
              className="flex flex-col md:flex-row items-center gap-4 p-4 border rounded-lg"
            >
              <div className="flex-1 w-full">
                <label className="text-sm font-medium text-gray-500">Info</label>
                <p className="font-semibold text-lg text-gray-800">
                  {formatLabel(info.nama_info)}
                </p>
              </div>
              <div className="flex-1 w-full">
                 <label className="text-sm font-medium text-gray-500">Nilai</label>
                <Input
                  value={info.nilai_info}
                  onChange={(e) => handleValueChange(info.id, e.target.value)}
                  className="text-red-600 font-bold text-lg"
                />
              </div>
              <Button
                onClick={() => handleSave(info)}
                disabled={isSaving === info.id}
              >
                {isSaving === info.id ? (
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