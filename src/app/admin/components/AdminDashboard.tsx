"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Plus, Edit2, Trash2, X } from "lucide-react";

interface Berita {
  id: string;
  judul: string;
  konten: string;
  penulis: string;
  foto_url: string | null;
  created_at: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const supabase = createClient();
  const [beritaList, setBeritaList] = useState<Berita[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [formData, setFormData] = useState({
    judul: "",
    konten: "",
    foto: null as File | null,
    penulis: "",
  });

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        router.push("/auth/login");
        return;
      }
      setUser(user);
      loadBerita();
    };
    checkAuth();
  }, []);

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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, foto: file }));
    }
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `berita/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("berita-images")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from("berita-images")
        .getPublicUrl(filePath);

      return data.publicUrl;
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
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
      let fotoUrl = null;

      // Jika user upload foto baru
      if (formData.foto) {
        // Jika sedang edit dan sudah ada foto lama, hapus dulu
        if (editingId) {
          const oldBerita = beritaList.find((b) => b.id === editingId);
          if (oldBerita?.foto_url) {
            const oldPath = oldBerita.foto_url.split("/").slice(-2).join("/"); // ambil "berita/namafile.jpg"
            await supabase.storage.from("berita-images").remove([oldPath]);
            console.log("Foto lama dihapus:", oldPath);
          }
        }

        // Upload foto baru
        fotoUrl = await uploadImage(formData.foto);
      }

      if (editingId) {
        const { error } = await supabase
          .from("berita")
          .update({
            judul: formData.judul,
            konten: formData.konten,
            penulis: formData.penulis,
            ...(fotoUrl && { foto_url: fotoUrl }), // hanya ubah foto kalau ada upload baru
          })
          .eq("id", editingId);

        if (error) throw error;
      } else {
        const { error } = await supabase.from("berita").insert({
          judul: formData.judul,
          konten: formData.konten,
          penulis: formData.penulis,
          foto_url: fotoUrl,
        });

        if (error) throw error;
      }

      await loadBerita();
      resetForm();
      alert(
        editingId ? "Berita berhasil diupdate" : "Berita berhasil ditambahkan"
      );
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
      foto: null,
      penulis: berita.penulis,
    });
    setEditingId(berita.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus berita ini?")) return;

    try {
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
    setFormData({ judul: "", konten: "", foto: null, penulis: "" });
    setEditingId(null);
    setShowForm(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
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
              Tambah Berita
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
            >
              Logout
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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Judul
                </label>
                <input
                  type="text"
                  value={formData.judul}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, judul: e.target.value }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                  placeholder="Masukkan judul berita"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Konten
                </label>
                <textarea
                  value={formData.konten}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, konten: e.target.value }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 h-32"
                  placeholder="Masukkan konten berita"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Penulis
                </label>
                <input
                  type="text"
                  value={formData.penulis}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      penulis: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                  placeholder="Nama penulis"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Foto
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                />
                {formData.foto && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-600 mb-2">Preview:</p>
                    <img
                      src={
                        URL.createObjectURL(formData.foto) || "/placeholder.svg"
                      }
                      alt="Preview"
                      className="h-32 object-cover rounded-lg"
                    />
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition font-medium disabled:opacity-50"
                >
                  {isSaving
                    ? "Menyimpan..."
                    : editingId
                    ? "Update Berita"
                    : "Tambah Berita"}
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
                  {berita.foto_url && (
                    <img
                      src={berita.foto_url || "/placeholder.svg"}
                      alt={berita.judul}
                      className="w-full md:w-48 h-48 object-cover"
                    />
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
