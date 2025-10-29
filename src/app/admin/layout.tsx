"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Home, Newspaper, Users, BarChart2, LogOut, Loader2 } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const supabase = createClient();
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        router.push("/auth/login");
      } else {
        setUser(user);
        setIsLoading(false);
      }
    };
    checkAuth();
  }, [router, supabase.auth]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="animate-spin h-12 w-12 text-red-600 mx-auto mb-4" />
          <p className="text-gray-600">Memuat Sesi Admin...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md shrink-0">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-red-600">Admin Panel</h2>
          <p className="text-sm text-gray-500">Desa Kiawa Satu</p>
        </div>
        <nav className="mt-6 flex-1 px-4">
          <Link
            href="/admin/berita"
            className="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-red-50 hover:text-red-600 transition"
          >
            <Newspaper className="w-5 h-5" />
            <span>Kelola Berita</span>
          </Link>
          <Link
            href="/admin/struktur"
            className="flex items-center gap-3 px-4 py-3 mt-2 text-gray-700 rounded-lg hover:bg-red-50 hover:text-red-600 transition"
          >
            <Users className="w-5 h-5" />
            <span>Kelola Struktur</span>
          </Link>
          <Link
            href="/admin/penduduk"
            className="flex items-center gap-3 px-4 py-3 mt-2 text-gray-700 rounded-lg hover:bg-red-50 hover:text-red-600 transition"
          >
            <BarChart2 className="w-5 h-5" />
            <span>Kelola Penduduk</span>
          </Link>
        </nav>
        <div className="absolute bottom-0 w-64 p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 text-gray-700 rounded-lg hover:bg-red-50 hover:text-red-600 transition"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
          <Link
            href="/"
            className="flex items-center gap-3 w-full px-4 py-3 mt-2 text-sm text-gray-500 rounded-lg hover:bg-gray-100 transition"
          >
            <Home className="w-5 h-5" />
            <span>Kembali ke Website</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        {children}
      </main>
    </div>
  );
}