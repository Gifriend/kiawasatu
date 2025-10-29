"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Plus, Edit2, Trash2, X, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation"; // 1. Import useRouter di sini

// Interface yang BENAR (sesuai database baru)
interface Berita {
  id: string;
  judul: string;
  konten: string;
  penulis: string;
  foto_urls: string[] | null; // <-- PERUBAHAN KUNCI
  created_at: string;
}

// Ganti nama 'BeritaAdminPage' ini jika file Anda namanya 'AdminDashboard'
export default function BeritaAdminPage() { 
  const supabase = createClient();
  const router = useRouter(); // 2. Panggil hook di top-level

  const [beritaList, setBeritaList] = useState<Berita[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    judul: "",
    konten: "",
    penulis: "",
  });

  const [files, setFiles] = useState<FileList | null>(null);
  const [existingPhotos, setExistingPhotos] = useState<string[]>([]);
  const [user, setUser] = useState<any>(null);

  // 3. HAPUS 'useEffect' dan 'useState' untuk router yang error
  // ... (Kode yang error sudah dihapus) ...

  // 4. Perbarui useEffect ini
  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        router.push("/auth/login"); // Langsung gunakan 'router'
        return;
      }
      setUser(user);
      loadBerita(); 
    };
    
    checkAuth();

  }, [router, supabase.auth]); // Tambahkan dependency yang benar

  const loadBerita = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("berita")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setBeritaList(data || []);
    } catch (error) {
      console.error("Error loading berita:", error);
      alert("Gagal memuat berita");
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(e.target.files); 
  };

  const uploadImages = async (files: FileList): Promise<string[] | null> => {
    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        const fileExt = file.name.split(".").pop();
        const fileName = `${Date.now()}-${file.name}`;
        const filePath = `berita/${fileName}`;

        const { error } = await supabase.storage
          .from("berita-images") 
          .upload(filePath, file);

        if (error) throw error;

        const { data } = supabase.storage
          .from("berita-images")
          .getPublicUrl(filePath);
        return data.publicUrl;
      });

      const urls = await Promise.all(uploadPromises);
      return urls;
    } catch (error) {
      console.error("Error uploading images:", error);
      return null;
    }
  };

  const deleteOldImages = async (fotoUrls: string[]) => {
    try {
      const filePaths = fotoUrls.map((url) => {
        const parts = url.split("/");
        return parts.slice(parts.length - 2).join("/"); // "berita/namafile.jpg"
      });
      await supabase.storage.from("berita-images").remove(filePaths);
      console.log("Foto lama dihapus:", filePaths);
    } catch (error) {
      console.error("Error deleting old images:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.judul || !formData.konten) {
      alert("Judul dan konten harus diisi");
      return;
    }

    setIsSaving(true);

    try {
      let fotoUrls: string[] | null = null;

      if (files && files.length > 0) {
        if (editingId && existingPhotos.length > 0) {
          await deleteOldImages(existingPhotos);
        }
        fotoUrls = await uploadImages(files);
      } else if (editingId) {
        fotoUrls = existingPhotos;
      }

      if (editingId) {
        // Update
        const { error } = await supabase
          .from("berita")
          .update({
            judul: formData.judul,
            konten: formData.konten,
            penulis: formData.penulis,
            foto_urls: fotoUrls, // <-- PERUBAHAN KUNCI
          })
          .eq("id", editingId);
        if (error) throw error;
      } else {
        // Insert
        const { error } = await supabase.from("berita").insert({
          judul: formData.judul,
          konten: formData.konten,
          penulis: formData.penulis,
          foto_urls: fotoUrls, // <-- PERUBAHAN KUNCI
        });
        if (error) throw error;
      }

      await loadBerita();
      resetForm();
      alert(editingId ? "Berita berhasil diupdate" : "Berita berhasil ditambahkan");
    } catch (error) {
      console.error("Error saving berita:", error);
      alert("Gagal menyimpan berita");
    } finally {
      setIsSaving(false);
    }
  };

  const handleEdit = (berita: Berita) => {
    setFormData({
      judul: berita.judul,
      konten: berita.konten,
      penulis: berita.penulis,
    });
    setEditingId(berita.id);
    setExistingPhotos(berita.foto_urls || []); 
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus berita ini?")) return;
    try {
      const berita = beritaList.find((b) => b.id === id);
      if (berita && berita.foto_urls && berita.foto_urls.length > 0) {
        await deleteOldImages(berita.foto_urls);
      }
      const { error } = await supabase.from("berita").delete().eq("id", id);
      if (error) throw error;
      await loadBerita();
      alert("Berita berhasil dihapus");
    } catch (error) {
      console.error("Error deleting berita:", error);
      alert("Gagal menghapus berita");
    }
  };

  const resetForm = () => {
    setFormData({ judul: "", konten: "", penulis: "" });
    setFiles(null); 
    setExistingPhotos([]);
    setEditingId(null);
    setShowForm(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Admin Dashboard
            </h1>
            <p className="text-gray-600 text-sm mt-1">Kelola Berita Desa</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowForm(!showForm)}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              <Plus className="w-5 h-5" />
              {showForm ? "Tutup Form" : "Tambah Berita"}
            </button>
          </div>
        </div>

        {/* Form Tambah/Edit Berita */}
        {showForm && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                {editingId ? "Edit Berita" : "Tambah Berita Baru"}
              </h2>
              <button
                onClick={resetForm}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <InputForm
                label="Judul"
                name="judul"
                value={formData.judul}
                onChange={setFormData}
                placeholder="Masukkan judul berita"
              />
              <TextAreaForm
                label="Konten"
                name="konten"
                value={formData.konten}
                onChange={setFormData}
                placeholder="Masukkan konten berita"
              />
              <InputForm
                label="Penulis"
                name="penulis"
                value={formData.penulis}
                onChange={setFormData}
                placeholder="Nama penulis"
              />
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Foto (Bisa lebih dari satu)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  multiple 
                  onChange={handleImageChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                />
                
                {/* Preview BARU untuk BANYAK file */}
                {files && files.length > 0 && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-600 mb-2">Preview ({files.length} foto baru):</p>
                    <div className="flex gap-2 flex-wrap">
                      {Array.from(files).map((file, index) => (
                        <img
                          key={index}
                          src={URL.createObjectURL(file)}
                          alt={`Preview ${index + 1}`}
                          className="h-32 w-32 object-cover rounded-lg"
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Preview untuk foto yang sudah ada (saat edit) */}
                {editingId && existingPhotos.length > 0 && !files && (
                  <div className="mt-2 text-sm text-gray-500">
                    <p>Foto saat ini ({existingPhotos.length} foto):</p>
                    <div className="flex gap-2 mt-2 flex-wrap">
                      {existingPhotos.map(url => (
                        <img key={url} src={url} alt="Foto lama" className="h-16 w-16 object-cover rounded"/>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition font-medium disabled:opacity-50"
                >
                  {isSaving ? "Menyimpan..." : (editingId ? "Update Berita" : "Tambah Berita")}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 bg-gray-300 text-gray-800 py-2 rounded-lg hover:bg-gray-400 transition font-medium"
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Daftar Berita */}
        <div className="grid gap-6">
          {beritaList.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <p className="text-gray-500">
                Belum ada berita. Tambahkan berita baru untuk memulai.
              </p>
            </div>
          ) : (
            beritaList.map((berita) => (
              <div
                key={berita.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition"
              >
                <div className="flex flex-col md:flex-row">
                  
                  {/* Tampilkan foto PERTAMA dari array */}
                  {berita.foto_urls && berita.foto_urls.length > 0 ? (
                    <img
                      src={berita.foto_urls[0]} // <-- Ambil foto pertama
                      alt={berita.judul}
                      className="w-full md:w-48 h-48 object-cover"
                    />
                  ) : (
                    <div className="w-full md:w-48 h-48 bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500">No Image</span>
                    </div>
                  )}

                  <div className="flex-1 p-6 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">
                        {berita.judul}
                      </h3>
                      <p className="text-gray-600 mb-3 line-clamp-2">
                        {berita.konten}
                      </p>
                      <div className="flex gap-4 text-sm text-gray-500">
                        <span>Penulis: {berita.penulis}</span>
                        <span>
                          Tanggal:{" "}
                          {new Date(berita.created_at).toLocaleDateString(
                            "id-ID"
                          )}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={() => handleEdit(berita)}
                        className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                      >
                        <Edit2 className="w-4 h-4" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(berita.id)}
                        className="flex items-center gap-2 px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                      >
                        <Trash2 className="w-4 h-4" />
                        Hapus
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

// Helper components (bisa diekstrak ke file sendiri)
const InputForm = ({ label, name, value, onChange, placeholder }: any) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={(e) => onChange((prev: any) => ({ ...prev, [name]: e.target.value }))}
      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
      placeholder={placeholder}
    />
  </div>
);

const TextAreaForm = ({ label, name, value, onChange, placeholder }: any) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <textarea
      name={name}
      value={value}
      onChange={(e) => onChange((prev: any) => ({ ...prev, [name]: e.target.value }))}
      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 h-32"
      placeholder={placeholder}
    />
  </div>
);