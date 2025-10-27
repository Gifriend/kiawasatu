"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronDown, LogOut, LogIn } from "lucide-react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { usePathname, useRouter } from "next/navigation"

export default function NavbarWithAuth() {
  const [isOpen, setIsOpen] = useState(false)
  const [dropdownState, setDropdownState] = useState<string | null>(null)
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const supabase = createClient()
  const pathname = usePathname()
  const router = useRouter()

  // 🔹 Mengecek login user
  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)
      setIsLoading(false)
    }

    checkUser()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null)
    })

    return () => subscription?.unsubscribe()
  }, [])

  // 🔹 Fungsi bantu untuk scroll ke section (kalau di halaman utama)
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setIsOpen(false)
      setDropdownState(null)
    }
  }

  // 🔹 Fungsi untuk pindah ke halaman utama lalu scroll ke section
  const navigateOrScroll = (sectionId: string) => {
    if (pathname === "/") {
      scrollToSection(sectionId)
    } else {
      // simpan sectionId di localStorage agar bisa diakses setelah redirect
      localStorage.setItem("scrollToSection", sectionId)
      router.push("/")
    }
  }

  // 🔹 Setelah kembali ke home, auto scroll ke section yang diminta
  useEffect(() => {
    if (pathname === "/") {
      const sectionId = localStorage.getItem("scrollToSection")
      if (sectionId) {
        setTimeout(() => {
          scrollToSection(sectionId)
          localStorage.removeItem("scrollToSection")
        }, 500)
      }
    }
  }, [pathname])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setIsOpen(false)
  }

  if (isLoading) {
    return (
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Image src="/images/minahasa.jpg" alt="Logo Minahasa" width={50} height={50} className="object-contain" />
            <span className="font-bold text-lg text-gray-800">Desa Kiawa Satu</span>
          </div>
        </div>
      </nav>
    )
  }

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <Image src="/images/minahasa.jpg" alt="Logo Minahasa" width={50} height={50} className="object-contain" />
          <span className="font-bold text-lg text-gray-800">Desa Kiawa Satu</span>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 items-center">
          <li className="relative group">
            <button className="text-gray-700 hover:text-red-600 transition flex items-center gap-1">
              Jelajahi
              <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform" />
            </button>
            <div className="absolute left-0 top-full hidden group-hover:block bg-white border-t-2 border-red-600 shadow-lg rounded-b-lg overflow-hidden min-w-max">
              <button onClick={() => router.push("/jelajahi/profil")} className="block w-full text-left px-4 py-2 hover:bg-red-50 hover:text-red-600 transition">
                Profil Desa
              </button>
              <button onClick={() => router.push("/jelajahi/sejarah")} className="block w-full text-left px-4 py-2 hover:bg-red-50 hover:text-red-600 transition">
                Sejarah Desa
              </button>
              <button onClick={() => router.push("/jelajahi/visiMisi")} className="block w-full text-left px-4 py-2 hover:bg-red-50 hover:text-red-600 transition">
                Visi & Misi
              </button>
            </div>
          </li>

          <li>
            <button onClick={() => navigateOrScroll("organisasi")} className="text-gray-700 hover:text-red-600 transition">
              Organisasi
            </button>
          </li>
          <li>
            <button onClick={() => navigateOrScroll("penduduk")} className="text-gray-700 hover:text-red-600 transition">
              Penduduk
            </button>
          </li>

          <li className="relative group">
            <button className="text-gray-700 hover:text-red-600 transition flex items-center gap-1">
              Potensi
              <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform" />
            </button>
            <div className="absolute left-0 top-full hidden group-hover:block bg-white border-t-2 border-red-600 shadow-lg rounded-b-lg overflow-hidden min-w-max">
              <button onClick={() => router.push("/potensi/pertanian")} className="block w-full text-left px-4 py-2 hover:bg-red-50 hover:text-red-600 transition">
                Pertanian
              </button>
              <button onClick={() => router.push("/potensi/peternakan")} className="block w-full text-left px-4 py-2 hover:bg-red-50 hover:text-red-600 transition">
                Peternakan
              </button>
            </div>
          </li>

          <li>
            <button onClick={() => navigateOrScroll("peta")} className="text-gray-700 hover:text-red-600 transition">
              Peta
            </button>
          </li>
          <li>
            <button onClick={() => navigateOrScroll("berita")} className="text-gray-700 hover:text-red-600 transition">
              Berita
            </button>
          </li>
          <li>
            <button onClick={() => navigateOrScroll("kontak")} className="text-gray-700 hover:text-red-600 transition">
              Kontak
            </button>
          </li>

          <li className="border-l pl-8">
            {user ? (
              <div className="flex items-center gap-3">
                <Link href="/admin" className="px-3 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition text-sm">
                  Dashboard
                </Link>
                <button onClick={handleLogout} className="flex items-center gap-2 px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition">
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </div>
            ) : (
              // <Link href="/auth/login" className="flex items-center gap-2 px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition">
              //   <LogIn className="w-4 h-4" /> Admin
              // </Link>
              <div></div>
            )}
          </li>
        </ul>
      </div>
    </nav>
  )
}
