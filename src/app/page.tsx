import NavbarWithAuth from "@/components/navbar"
import Hero from "@/components/hero"
import JelajahiDesa from "@/components/jelajahi-desa"
import StrukturOrganisasi from "@/components/struktur-organisasi"
import DataPenduduk from "@/components/data-penduduk"
import PotensiDesa from "@/components/potensi-desa"
import BeritaDesa from "@/components/berita-desa"
import KontakKami from "@/components/kontak-kami"
import Footer from "@/components/footer"
import PetaDesa from "@/components/peta-desa"

export default function Home() {
  return (
    <main>
      <NavbarWithAuth />
      <Hero />
      <div className="w-full bg-white">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-0">
          <JelajahiDesa />
          <StrukturOrganisasi />
          <DataPenduduk />
          <PotensiDesa />
          <PetaDesa />
          <BeritaDesa />
          <KontakKami />
        </div>
      </div>
      <Footer />
    </main>
  )
}