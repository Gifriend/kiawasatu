import Image from "next/image"

export default function Hero() {
  return (
    <section className="relative h-96 md:h-screen flex items-center justify-center overflow-hidden">
      <Image src="/images/tees.jpg" alt="Background Desa" fill className="object-cover" priority />
      <div className="absolute inset-0 bg-black/30"></div>
      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance">Selamat Datang</h1>
        <p className="text-xl md:text-3xl font-semibold mb-4 text-balance">Website Resmi Desa Kiawa Satu</p>
        <p className="text-lg md:text-xl text-gray-100 text-balance">
          Sumber informasi tentang pemerintahan di Desa Kiawa Satu
        </p>
      </div>
    </section>
  )
}
