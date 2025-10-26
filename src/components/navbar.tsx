  "use client"

  import { useState, useEffect } from "react"
  import Image from "next/image"
  import { ChevronDown, LogOut, LogIn } from "lucide-react"
  import Link from "next/link"
  import { createClient } from "@/lib/supabase/client"

  export default function NavbarWithAuth() {
    const [isOpen, setIsOpen] = useState(false)
    const [dropdownState, setDropdownState] = useState<string | null>(null)
    const [user, setUser] = useState<any>(null)
    const [isLoading, setIsLoading] = useState(true)
    const supabase = createClient()

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

    const toggleMenu = () => {
      setIsOpen(!isOpen)
    }

    const scrollToSection = (id: string) => {
      const element = document.getElementById(id)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
        setIsOpen(false)
        setDropdownState(null)
      }
    }

    const navigateToJelajahi = (id: string) => {
      const section = document.getElementById("jelajahi")
      if (section) {
        section.scrollIntoView({ behavior: "smooth" })
      }

      setTimeout(() => {
        window.dispatchEvent(new CustomEvent("navigateToJelajahi", { detail: { id } }))
      }, 500)

      setIsOpen(false)
      setDropdownState(null)
    }

    const navigateToPotensi = (id: string) => {
      const section = document.getElementById("potensi")
      if (section) {
        section.scrollIntoView({ behavior: "smooth" })
      }

      setTimeout(() => {
        window.dispatchEvent(new CustomEvent("navigateToPotensi", { detail: { id } }))
      }, 500)

      setIsOpen(false)
      setDropdownState(null)
    }

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
      <>
        <nav className="bg-white shadow-md sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Image src="/images/minahasa.jpg" alt="Logo Minahasa" width={50} height={50} className="object-contain" />
              <span className="font-bold text-lg text-gray-800">Desa Kiawa Satu</span>
            </div>

            {/* Hamburger Menu */}
            <button className="md:hidden flex flex-col gap-1 cursor-pointer" onClick={toggleMenu}>
              <span className={`w-6 h-0.5 bg-gray-800 transition-all ${isOpen ? "rotate-45 translate-y-2" : ""}`}></span>
              <span className={`w-6 h-0.5 bg-gray-800 transition-all ${isOpen ? "opacity-0" : ""}`}></span>
              <span
                className={`w-6 h-0.5 bg-gray-800 transition-all ${isOpen ? "-rotate-45 -translate-y-2" : ""}`}
              ></span>
            </button>

            {/* Desktop Menu */}
            <ul className="hidden md:flex gap-8 items-center">
              <li className="relative group">
                <button className="text-gray-700 hover:text-red-600 transition flex items-center gap-1">
                  Jelajahi
                  <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform" />
                </button>
                <div className="absolute left-0 top-full hidden group-hover:block bg-white border-t-2 border-red-600 shadow-lg rounded-b-lg overflow-hidden min-w-max">
                  <button
                    onClick={() => navigateToJelajahi("profil")}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 transition"
                  >
                    Profil Desa
                  </button>
                  <button
                    onClick={() => navigateToJelajahi("sejarah")}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 transition"
                  >
                    Sejarah Desa
                  </button>
                  <button
                    onClick={() => navigateToJelajahi("visiMisi")}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 transition"
                  >
                    Visi & Misi
                  </button>
                </div>
              </li>

              <li>
                <button
                  onClick={() => scrollToSection("organisasi")}
                  className="text-gray-700 hover:text-red-600 transition"
                >
                  Organisasi
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("penduduk")}
                  className="text-gray-700 hover:text-red-600 transition"
                >
                  Penduduk
                </button>
              </li>

              <li className="relative group">
                <button className="text-gray-700 hover:text-red-600 transition flex items-center gap-1">
                  Potensi
                  <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform" />
                </button>
                <div className="absolute left-0 top-full hidden group-hover:block bg-white border-t-2 border-red-600 shadow-lg rounded-b-lg overflow-hidden min-w-max">
                  <button
                    onClick={() => navigateToPotensi("pertanian")}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 transition"
                  >
                    Pertanian
                  </button>
                  <button
                    onClick={() => navigateToPotensi("peternakan")}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 transition"
                  >
                    Peternakan
                  </button>
                </div>
              </li>

              <li>
                <button onClick={() => scrollToSection("peta")} className="text-gray-700 hover:text-red-600 transition">
                  Peta
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("berita")} className="text-gray-700 hover:text-red-600 transition">
                  Berita
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("kontak")} className="text-gray-700 hover:text-red-600 transition">
                  Kontak
                </button>
              </li>

              <li className="border-l pl-8">
                {user ? (
                  <div className="flex items-center gap-3">
                    {/* <span className="text-sm text-gray-600">{user.email}</span> */}
                    <Link
                      href="/admin"
                      className="px-3 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition text-sm"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                ) : (
                  <Link
                    href="/auth/login"
                    className="flex items-center gap-2 px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                  >
                    <LogIn className="w-4 h-4" />
                    Admin
                  </Link>
                )}
              </li>
            </ul>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="md:hidden bg-gray-50 border-t">
              <ul className="flex flex-col gap-4 p-4">
                <li>
                  <button
                    onClick={() => setDropdownState(dropdownState === "jelajahi" ? null : "jelajahi")}
                    className="text-gray-700 hover:text-red-600 transition block w-full text-left flex items-center justify-between"
                  >
                    Jelajahi
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${dropdownState === "jelajahi" ? "rotate-180" : ""}`}
                    />
                  </button>
                  {dropdownState === "jelajahi" && (
                    <div className="ml-4 mt-2 space-y-2 border-l-2 border-red-600 pl-4">
                      <button
                        onClick={() => navigateToJelajahi("profil")}
                        className="block w-full text-left text-gray-600 hover:text-red-600 transition"
                      >
                        Profil Desa
                      </button>
                      <button
                        onClick={() => navigateToJelajahi("sejarah")}
                        className="block w-full text-left text-gray-600 hover:text-red-600 transition"
                      >
                        Sejarah Desa
                      </button>
                      <button
                        onClick={() => navigateToJelajahi("visiMisi")}
                        className="block w-full text-left text-gray-600 hover:text-red-600 transition"
                      >
                        Visi & Misi
                      </button>
                    </div>
                  )}
                </li>

                <li>
                  <button
                    onClick={() => scrollToSection("organisasi")}
                    className="text-gray-700 hover:text-red-600 transition block w-full text-left"
                  >
                    Organisasi
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("penduduk")}
                    className="text-gray-700 hover:text-red-600 transition block w-full text-left"
                  >
                    Penduduk
                  </button>
                </li>

                <li>
                  <button
                    onClick={() => setDropdownState(dropdownState === "potensi" ? null : "potensi")}
                    className="text-gray-700 hover:text-red-600 transition block w-full text-left flex items-center justify-between"
                  >
                    Potensi
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${dropdownState === "potensi" ? "rotate-180" : ""}`}
                    />
                  </button>
                  {dropdownState === "potensi" && (
                    <div className="ml-4 mt-2 space-y-2 border-l-2 border-red-600 pl-4">
                      <button
                        onClick={() => navigateToPotensi("pertanian")}
                        className="block w-full text-left text-gray-600 hover:text-red-600 transition"
                      >
                        Pertania
                      </button>
                      <button
                        onClick={() => navigateToPotensi("peternakan")}
                        className="block w-full text-left text-gray-600 hover:text-red-600 transition"
                      >
                        Peternakan
                      </button>
                    </div>
                  )}
                </li>

                <li>
                  <button
                    onClick={() => scrollToSection("peta")}
                    className="text-gray-700 hover:text-red-600 transition block w-full text-left"
                  >
                    Peta
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("berita")}
                    className="text-gray-700 hover:text-red-600 transition block w-full text-left"
                  >
                    Berita
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("kontak")}
                    className="text-gray-700 hover:text-red-600 transition block w-full text-left"
                  >
                    Kontak
                  </button>
                </li>

                <li className="border-t pt-4 mt-4">
                  {user ? (
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600">Logged in as: {user.email}</p>
                      <Link
                        href="/admin"
                        className="w-full block text-center px-3 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition"
                        onClick={() => setIsOpen(false)}
                      >
                        Admin Dashboard
                      </Link>
                      <button
                        onClick={() => {
                          handleLogout()
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </div>
                  ) : (
                    <Link
                      href="/auth/login"
                      className="w-full flex items-center gap-2 px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                      onClick={() => setIsOpen(false)}
                    >
                      <LogIn className="w-4 h-4" />
                      Admin Login
                    </Link>
                  )}
                </li>
              </ul>
            </div>
          )}
        </nav>
      </>
    )
  }
