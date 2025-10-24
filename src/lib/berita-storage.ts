// Simple storage for berita using localStorage
// In production, replace with Firebase or backend API

export interface Berita {
  id: string
  judul: string
  konten: string
  foto: string | null
  tanggal: string
  penulis: string
}

const STORAGE_KEY = "berita_desa"

export function getBeritaList(): Berita[] {
  if (typeof window === "undefined") return []
  const data = localStorage.getItem(STORAGE_KEY)
  return data ? JSON.parse(data) : []
}

export function getBeritaById(id: string): Berita | null {
  const list = getBeritaList()
  return list.find((b) => b.id === id) || null
}

export function addBerita(berita: Omit<Berita, "id">): Berita {
  const list = getBeritaList()
  const newBerita: Berita = {
    ...berita,
    id: Date.now().toString(),
  }
  list.push(newBerita)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
  return newBerita
}

export function updateBerita(id: string, updates: Partial<Berita>): Berita | null {
  const list = getBeritaList()
  const index = list.findIndex((b) => b.id === id)
  if (index === -1) return null

  list[index] = { ...list[index], ...updates }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
  return list[index]
}

export function deleteBerita(id: string): boolean {
  const list = getBeritaList()
  const filtered = list.filter((b) => b.id !== id)
  if (filtered.length === list.length) return false

  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered))
  return true
}

// Initialize with sample data if empty
export function initializeSampleData() {
  if (getBeritaList().length === 0) {
    const sampleBerita: Omit<Berita, "id">[] = [
      {
        judul: "Pembangunan Jalan Desa Selesai",
        konten:
          "Alhamdulillah, pembangunan jalan desa telah selesai dilaksanakan dengan baik. Terima kasih atas dukungan masyarakat.",
        foto: "/jalan-desa.jpg",
        tanggal: new Date().toISOString().split("T")[0],
        penulis: "Admin",
      },
      {
        judul: "Acara Gotong Royong Desa",
        konten: "Masyarakat desa berkumpul untuk melakukan kegiatan gotong royong membersihkan lingkungan sekitar.",
        foto: "/gotong-royong.jpg",
        tanggal: new Date(Date.now() - 86400000).toISOString().split("T")[0],
        penulis: "Admin",
      },
    ]

    sampleBerita.forEach((b) => addBerita(b))
  }
}
