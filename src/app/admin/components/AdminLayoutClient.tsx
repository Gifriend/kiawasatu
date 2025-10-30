"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Loader2, Menu } from "lucide-react"; 
import AdminSidebar from "./AdminSidebar"; 

export default function AdminLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const supabase = createClient();
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State untuk sidebar

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

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
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

  // Jika sudah tidak loading dan user ada (terautentikasi)
  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />

      <div className="flex-1 flex flex-col">
        {/* Header Mobile (hanya tampil di mobile) */}
        <header className="md:hidden bg-white shadow-md p-4 flex justify-between items-center sticky top-0 z-30">
          <h2 className="text-xl font-bold text-red-600">Admin Panel</h2>
          <button onClick={toggleSidebar} className="text-gray-600 hover:text-red-600">
            <Menu className="w-6 h-6" />
          </button>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}