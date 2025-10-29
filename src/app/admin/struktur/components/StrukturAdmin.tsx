"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Edit, Trash, X, Save } from "lucide-react";

interface Struktur {
  id: number;
  jabatan: string;
  nama: string;
  level: number;
  urutan: number;
  foto_url: string | null;
}

export default function StrukturAdminPage() {
  const [struktur, setStruktur] = useState<Struktur[]>([]);
  const [form, setForm] = useState({ jabatan: "", nama: "", level: 1, urutan: 1 });
  const [file, setFile] = useState<File | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Partial<Struktur>>({});
  const [editFile, setEditFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const supabase = createClient();

  const fetchData = async () => {
    setIsLoading(true);
    const { data } = await supabase
      .from("struktur_organisasi")
      .select("*")
      .order("level")
      .order("urutan");
    setStruktur(data || []);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEditChange = (e: any) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleUpload = async (file: File) => {
    if (!file) return null;
    const filePath = `struktur/${Date.now()}-${file.name}`;
    const { data, error } = await supabase.storage.from("struktur_images").upload(filePath, file);
    if (error) {
      console.error("Upload error:", error);
      return null;
    }
    const { data: urlData } = supabase.storage.from("struktur_images").getPublicUrl(filePath);
    return urlData.publicUrl;
  };

  const handleSubmit = async () => {
    setIsSaving(true);
    const fotoUrl = file ? await handleUpload(file) : null;
    await supabase.from("struktur_organisasi").insert([{ ...form, foto_url: fotoUrl }]);
    setForm({ jabatan: "", nama: "", level: 1, urutan: 1 });
    setFile(null);
    (document.querySelector('input[type="file"]') as HTMLInputElement).value = "";
    fetchData();
    setIsSaving(false);
  };

  const handleUpdate = async () => {
    if (!editingId) return;

    setIsSaving(true);
    let fotoUrl = editForm.foto_url;

    if (editFile) {
      if (editForm.foto_url) {
        const oldPath = editForm.foto_url.split("/").pop();
        if (oldPath) {
          await supabase.storage.from("struktur_images").remove([`struktur/${oldPath}`]);
        }
      }
      fotoUrl = await handleUpload(editFile);
    }

    await supabase
      .from("struktur_organisasi")
      .update({
        jabatan: editForm.jabatan,
        nama: editForm.nama,
        level: editForm.level,
        urutan: editForm.urutan,
        foto_url: fotoUrl
      })
      .eq("id", editingId);

    setEditingId(null);
    setEditForm({});
    setEditFile(null);
    fetchData();
    setIsSaving(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Yakin ingin menghapus?")) return;

    const item = struktur.find(s => s.id === id);
    if (item && item.foto_url) {
      const oldPath = item.foto_url.split("/").pop();
      if (oldPath) {
        await supabase.storage.from("struktur_images").remove([`struktur/${oldPath}`]);
      }
    }

    await supabase.from("struktur_organisasi").delete().eq("id", id);
    fetchData();
  };

  const startEdit = (item: Struktur) => {
    setEditingId(item.id);
    setEditForm(item);
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Kelola Struktur Organisasi</h1>

      {/* Form Tambah */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-bold text-red-600 mb-4">Tambah Anggota Baru</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <span className="text-sm font-medium text-gray-700">Jabatan</span>
            <Input name="jabatan" value={form.jabatan} onChange={handleChange} placeholder="cth: Hukum Tua" />
          </div>
          <div>
            <span className="text-sm font-medium text-gray-700">Nama</span>
            <Input name="nama" value={form.nama} onChange={handleChange} placeholder="cth: Nortje E. Tendean, SE" />
          </div>
          <div>
            <span className="text-sm font-medium text-gray-700">Urutan dari atas (Level)</span>
            <Input name="level" type="number" value={form.level} onChange={handleChange} placeholder="1 = paling atas" />
          </div>
          <div>
            <span className="text-sm font-medium text-gray-700">Urutan dari samping</span>
            <Input name="urutan" type="number" value={form.urutan} onChange={handleChange} placeholder="1 = paling kiri" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-700">Foto</span>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="col-span-2 border text-sm rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
            />
          </div>
        </div>
        <Button onClick={handleSubmit} disabled={isSaving}>
          {isSaving ? <Loader2 className="animate-spin" /> : "Tambah"}
        </Button>
      </div>

      {/* Tabel Data */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-red-600 mb-4">Daftar Anggota</h2>
        {isLoading ? (
          <div className="flex justify-center p-8">
            <Loader2 className="animate-spin h-8 w-8 text-red-600" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border">
              <thead className="bg-red-100 text-red-700">
                <tr>
                  <th className="border px-3 py-2">Jabatan</th>
                  <th className="border px-3 py-2">Nama</th>
                  <th className="border px-3 py-2">Foto</th>
                  <th className="border px-3 py-2">Level/Urutan</th>
                  <th className="border px-3 py-2">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {struktur.map((row) => (
                  <tr key={row.id}>
                    {editingId === row.id ? (
                      <>
                        <td className="border px-2 py-2">
                          <Input name="jabatan" value={editForm.jabatan} onChange={handleEditChange} />
                        </td>
                        <td className="border px-2 py-2">
                          <Input name="nama" value={editForm.nama} onChange={handleEditChange} />
                        </td>
                        <td className="border px-2 py-2">
                          <input
                            type="file"
                            onChange={(e) => setEditFile(e.target.files?.[0] || null)}
                            className="text-sm"
                          />
                        </td>
                        <td className="border px-2 py-2">
                          <Input name="level" type="number" value={editForm.level} onChange={handleEditChange} className="mb-1" />
                          <Input name="urutan" type="number" value={editForm.urutan} onChange={handleEditChange} />
                        </td>
                        <td className="border px-2 py-2 text-center">
                          <Button size="sm" onClick={handleUpdate} disabled={isSaving} className="mr-2">
                            {isSaving ? <Loader2 className="animate-spin" /> : <Save className="w-4 h-4" />}
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => setEditingId(null)}>
                            <X className="w-4 h-4" />
                          </Button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="border px-3 py-2">{row.jabatan}</td>
                        <td className="border px-3 py-2">{row.nama}</td>
                        <td className="border px-3 py-2">
                          {row.foto_url && (
                            <img src={row.foto_url} alt={row.nama} className="w-16 h-20 object-cover rounded" />
                          )}
                        </td>
                        <td className="border px-3 py-2 text-center">{row.level} / {row.urutan}</td>
                        <td className="border px-3 py-2 text-center">
                          <Button variant="outline" size="sm" onClick={() => startEdit(row)} className="mr-2">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="destructive" size="sm" onClick={() => handleDelete(row.id)}>
                            <Trash className="w-4 h-4" />
                          </Button>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}