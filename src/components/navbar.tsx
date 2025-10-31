"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronDown, LogOut, Menu, X } from "lucide-react"
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

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setIsOpen(false)
      setDropdownState(null)
    }
  }

  const navigateOrScroll = (sectionId: string) => {
    if (pathname === "/") {
      scrollToSection(sectionId)
    } else {
      localStorage.setItem("scrollToSection", sectionId)
      router.push("/")
    }
  }

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
            <div className="flex flex-col items-start">
              <span className="font-bold text-lg text-gray-800">Desa Kiawa Satu</span>
              <span className="text-xs text-gray-600">Kabupaten Minahasa</span>
              <span className="text-xs text-gray-600">Kecamatan Kawangkoan Utara</span>
            </div>
          </div>
        </div>
      </nav>
    )
  }

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <button onClick={() => router.push("/")} className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition">
          <Image src="/images/minahasa.jpg" alt="Logo Minahasa" width={50} height={50} className="object-contain" />
          <div className="flex flex-col items-start">
            <span className="font-bold text-lg text-gray-800">Desa Kiawa Satu</span>
            <span className="text-xs text-gray-600">Kabupaten Minahasa</span>
            <span className="text-xs text-gray-600">Kecamatan Kawangkoan Utara</span>
          </div>
        </button>

        {/* Hamburger Button - Mobile */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-gray-700 hover:text-red-600 transition">
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

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
              <button onClick={() => router.push("/potensi/usaha-swasta")} className="block w-full text-left px-4 py-2 hover:bg-red-50 hover:text-red-600 transition">
                Usaha Swasta Rumahan
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
              <div></div>
            )}
          </li>
        </ul>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t shadow-lg">
          <ul className="flex flex-col">
            <li className="border-b">
              <button
                onClick={() => setDropdownState(dropdownState === "jelajahi" ? null : "jelajahi")}
                className="w-full text-left px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 transition flex items-center justify-between"
              >
                Jelajahi
                <ChevronDown className={`w-4 h-4 transition-transform ${dropdownState === "jelajahi" ? "rotate-180" : ""}`} />
              </button>
              {dropdownState === "jelajahi" && (
                <div className="bg-gray-50">
                  <button
                    onClick={() => {
                      router.push("/jelajahi/profil")
                      setIsOpen(false)
                      setDropdownState(null)
                    }}
                    className="block w-full text-left px-8 py-2 text-gray-600 hover:bg-red-50 hover:text-red-600 transition"
                  >
                    Profil Desa
                  </button>
                  <button
                    onClick={() => {
                      router.push("/jelajahi/sejarah")
                      setIsOpen(false)
                      setDropdownState(null)
                    }}
                    className="block w-full text-left px-8 py-2 text-gray-600 hover:bg-red-50 hover:text-red-600 transition"
                  >
                    Sejarah Desa
                  </button>
                  <button
                    onClick={() => {
                      router.push("/jelajahi/visiMisi")
                      setIsOpen(false)
                      setDropdownState(null)
                    }}
                    className="block w-full text-left px-8 py-2 text-gray-600 hover:bg-red-50 hover:text-red-600 transition"
                  >
                    Visi & Misi
                  </button>
                </div>
              )}
            </li>

            <li className="border-b">
              <button
                onClick={() => {
                  navigateOrScroll("organisasi")
                  setIsOpen(false)
                }}
                className="w-full text-left px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 transition"
              >
                Organisasi
              </button>
            </li>

            <li className="border-b">
              <button
                onClick={() => {
                  navigateOrScroll("penduduk")
                  setIsOpen(false)
                }}
                className="w-full text-left px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 transition"
              >
                Penduduk
              </button>
            </li>

            <li className="border-b">
              <button
                onClick={() => setDropdownState(dropdownState === "potensi" ? null : "potensi")}
                className="w-full text-left px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 transition flex items-center justify-between"
              >
                Potensi
                <ChevronDown className={`w-4 h-4 transition-transform ${dropdownState === "potensi" ? "rotate-180" : ""}`} />
              </button>
              {dropdownState === "potensi" && (
                <div className="bg-gray-50">
                  <button
                    onClick={() => {
                      router.push("/potensi/pertanian")
                      setIsOpen(false)
                      setDropdownState(null)
                    }}
                    className="block w-full text-left px-8 py-2 text-gray-600 hover:bg-red-50 hover:text-red-600 transition"
                  >
                    Pertanian
                  </button>
                  <button
                    onClick={() => {
                      router.push("/potensi/peternakan")
                      setIsOpen(false)
                      setDropdownState(null)
                    }}
                    className="block w-full text-left px-8 py-2 text-gray-600 hover:bg-red-50 hover:text-red-600 transition"
                  >
                    Peternakan
                  </button>
                  <button
                    onClick={() => {
                      router.push("/potensi/usaha-swasta")
                      setIsOpen(false)
                      setDropdownState(null)
                    }}
                    className="block w-full text-left px-8 py-2 text-gray-600 hover:bg-red-50 hover:text-red-600 transition"
                  >
                    Usaha Swasta Rumahan
                  </button>
                </div>
              )}
            </li>

            <li className="border-b">
              <button
                onClick={() => {
                  navigateOrScroll("peta")
                  setIsOpen(false)
                }}
                className="w-full text-left px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 transition"
              >
                Peta
              </button>
            </li>

            <li className="border-b">
              <button
                onClick={() => {
                  navigateOrScroll("berita")
                  setIsOpen(false)
                }}
                className="w-full text-left px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 transition"
              >
                Berita
              </button>
            </li>

            <li className="border-b">
              <button
                onClick={() => {
                  navigateOrScroll("kontak")
                  setIsOpen(false)
                }}
                className="w-full text-left px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 transition"
              >
                Kontak
              </button>
            </li>

            {user && (
              <>
                <li className="border-b">
                  <Link
                    href="/admin"
                    onClick={() => setIsOpen(false)}
                    className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 transition"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => {
                      handleLogout()
                      setIsOpen(false)
                    }}
                    className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 transition flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" /> Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  )
}