"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronDown } from "lucide-react"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [dropdownState, setDropdownState] = useState<string | null>(null)

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
    // Scroll ke section jelajahi terlebih dahulu
    const section = document.getElementById('jelajahi')
    if (section) {
      section.scrollIntoView({ behavior: "smooth" })
    }
    
    // Tunggu sedikit agar scroll selesai, baru trigger event
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('navigateToJelajahi', { detail: { id } }))
    }, 500)
    
    setIsOpen(false)
    setDropdownState(null)
  }

  const navigateToPotensi = (id: string) => {
    // Scroll ke section potensi terlebih dahulu
    const section = document.getElementById('potensi')
    if (section) {
      section.scrollIntoView({ behavior: "smooth" })
    }
    
    // Tunggu sedikit agar scroll selesai, baru trigger event
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('navigateToPotensi', { detail: { id } }))
    }, 500)
    
    setIsOpen(false)
    setDropdownState(null)
  }

  return (
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
          <span className={`w-6 h-0.5 bg-gray-800 transition-all ${isOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
        </button>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8">
          {/* Jelajahi dengan Dropdown */}
          <li className="relative group">
            <button className="text-gray-700 hover:text-red-600 transition flex items-center gap-1">
              Jelajahi
              <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform" />
            </button>
            <div className="absolute left-0 top-full hidden group-hover:block bg-white border-t-2 border-red-600 shadow-lg rounded-b-lg overflow-hidden min-w-max">
              <button
                onClick={() => navigateToJelajahi('profil')}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 transition"
              >
                Profil Desa
              </button>
              <button
                onClick={() => navigateToJelajahi('sejarah')}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 transition"
              >
                Sejarah Desa
              </button>
              <button
                onClick={() => navigateToJelajahi('visiMisi')}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 transition"
              >
                Visi & Misi
              </button>
            </div>
          </li>

          <li>
            <button onClick={() => scrollToSection("organisasi")} className="text-gray-700 hover:text-red-600 transition">
              Organisasi
            </button>
          </li>
          <li>
            <button onClick={() => scrollToSection("penduduk")} className="text-gray-700 hover:text-red-600 transition">
              Penduduk
            </button>
          </li>

          {/* Potensi dengan Dropdown */}
          <li className="relative group">
            <button className="text-gray-700 hover:text-red-600 transition flex items-center gap-1">
              Potensi
              <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform" />
            </button>
            <div className="absolute left-0 top-full hidden group-hover:block bg-white border-t-2 border-red-600 shadow-lg rounded-b-lg overflow-hidden min-w-max">
              <button
                onClick={() => navigateToPotensi('pertanian')}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 transition"
              >
                Pertanian
              </button>
              <button
                onClick={() => navigateToPotensi('peternakan')}
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
        </ul>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-50 border-t">
          <ul className="flex flex-col gap-4 p-4">
            {/* Mobile Jelajahi Dropdown */}
            <li>
              <button
                onClick={() => setDropdownState(dropdownState === 'jelajahi' ? null : 'jelajahi')}
                className="text-gray-700 hover:text-red-600 transition block w-full text-left flex items-center justify-between"
              >
                Jelajahi
                <ChevronDown className={`w-4 h-4 transition-transform ${dropdownState === 'jelajahi' ? 'rotate-180' : ''}`} />
              </button>
              {dropdownState === 'jelajahi' && (
                <div className="ml-4 mt-2 space-y-2 border-l-2 border-red-600 pl-4">
                  <button
                    onClick={() => navigateToJelajahi('profil')}
                    className="block w-full text-left text-gray-600 hover:text-red-600 transition"
                  >
                    Profil Desa
                  </button>
                  <button
                    onClick={() => navigateToJelajahi('sejarah')}
                    className="block w-full text-left text-gray-600 hover:text-red-600 transition"
                  >
                    Sejarah Desa
                  </button>
                  <button
                    onClick={() => navigateToJelajahi('visiMisi')}
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

            {/* Mobile Potensi Dropdown */}
            <li>
              <button
                onClick={() => setDropdownState(dropdownState === 'potensi' ? null : 'potensi')}
                className="text-gray-700 hover:text-red-600 transition block w-full text-left flex items-center justify-between"
              >
                Potensi
                <ChevronDown className={`w-4 h-4 transition-transform ${dropdownState === 'potensi' ? 'rotate-180' : ''}`} />
              </button>
              {dropdownState === 'potensi' && (
                <div className="ml-4 mt-2 space-y-2 border-l-2 border-red-600 pl-4">
                  <button
                    onClick={() => navigateToPotensi('pertanian')}
                    className="block w-full text-left text-gray-600 hover:text-red-600 transition"
                  >
                    Pertanian
                  </button>
                  <button
                    onClick={() => navigateToPotensi('peternakan')}
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
          </ul>
        </div>
      )}
    </nav>
  )
}