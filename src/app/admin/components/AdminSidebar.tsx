"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Home, Newspaper, Users, BarChart2, LogOut, Info, X } from "lucide-react";

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void; // Fungsi untuk menutup sidebar (misalnya saat klik link/overlay)
  handleLogout: () => void
}

export default function AdminSidebar({ isOpen, onClose, handleLogout }: AdminSidebarProps) {
  const router = useRouter();
  const supabase = createClient();

  // const handleLogout = async () => {
  //   await supabase.auth.signOut();
  //   router.push("/"); 
  //   onClose(); // Tutup sidebar setelah logout
  // };

  // Tutup sidebar saat link navigasi diklik
  const handleLinkClick = () => {
    onClose();
  };

  return (
    <>
      {/* Overlay (hanya muncul di mobile saat sidebar terbuka) */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose} // Tutup saat overlay diklik
      ></div>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-md transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } shrink-0 flex flex-col`}
      >
        <div className="p-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-red-600">Admin Panel</h2>
            <p className="text-sm text-gray-500">Desa Kiawa Satu</p>
          </div>
          {/* Tombol Close (hanya di mobile) */}
          <button onClick={onClose} className="md:hidden text-gray-500 hover:text-red-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigasi */}
        <nav className="mt-6 flex-1 px-4 overflow-y-auto">
          <Link
            href="/admin/berita"
            onClick={handleLinkClick}
            className="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-red-50 hover:text-red-600 transition"
          >
            <Newspaper className="w-5 h-5" />
            <span>Kelola Berita</span>
          </Link>
          <Link
            href="/admin/struktur"
            onClick={handleLinkClick}
            className="flex items-center gap-3 px-4 py-3 mt-2 text-gray-700 rounded-lg hover:bg-red-50 hover:text-red-600 transition"
          >
            <Users className="w-5 h-5" />
            <span>Kelola Struktur</span>
          </Link>
          <Link
            href="/admin/penduduk"
            onClick={handleLinkClick}
            className="flex items-center gap-3 px-4 py-3 mt-2 text-gray-700 rounded-lg hover:bg-red-50 hover:text-red-600 transition"
          >
            <BarChart2 className="w-5 h-5" />
            <span>Kelola Penduduk</span>
          </Link>
          <Link
            href="/admin/info"
            onClick={handleLinkClick}
            className="flex items-center gap-3 px-4 py-3 mt-2 text-gray-700 rounded-lg hover:bg-red-50 hover:text-red-600 transition"
          >
            <Info className="w-5 h-5" />
            <span>Kelola Info Desa</span>
          </Link>
        </nav>

        {/* Bagian Bawah Sidebar */}
        <div className="p-4 border-t border-gray-200 mt-auto">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 text-gray-700 rounded-lg hover:bg-red-50 hover:text-red-600 transition"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
          <Link
            href="/"
            onClick={handleLinkClick}
            className="flex items-center gap-3 w-full px-4 py-3 mt-2 text-sm text-gray-500 rounded-lg hover:bg-gray-100 transition"
          >
            <Home className="w-5 h-5" />
            <span>Kembali ke Website</span>
          </Link>
        </div>
      </aside>
    </>
  );
}