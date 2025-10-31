"use client"; 

import { useEffect, useState, useCallback } from "react"; 
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); 

  const handleLogout = useCallback(async () => {
    await supabase.auth.signOut();
    localStorage.removeItem('sessionExpiry'); // Hapus timer saat logout
    router.push('/auth/login');
  }, [supabase, router]);

  useEffect(() => {
    let sessionTimer: NodeJS.Timeout;

    const checkSession = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setIsLoading(false);
        return handleLogout(); 
      }

      const expiryTime = parseInt(localStorage.getItem('sessionExpiry') || '0', 10);
      const now = Date.now();

      if (expiryTime === 0 || now > expiryTime) {
        setIsLoading(false);
        return handleLogout(); // Paksa logout
      }

      setUser(user);
      setIsLoading(false); // Tampilkan halaman

      const remainingTime = expiryTime - now;
      sessionTimer = setTimeout(handleLogout, remainingTime);
    };

    checkSession();

    // Cleanup timer saat komponen unmount
    return () => {
      if (sessionTimer) {
        clearTimeout(sessionTimer);
      }
    };
  }, [supabase, router, handleLogout]); 

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

  // Jika tidak loading dan user ada (terautentikasi dan sesi valid)
  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar 
        isOpen={isSidebarOpen} 
        onClose={toggleSidebar} 
        handleLogout={handleLogout} 
      />

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