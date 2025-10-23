'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'

// Import komponen peta dengan ssr: false
const PetaDesaContent = dynamic(() => import('./peta-desa-content'), {
  ssr: false,
  loading: () => (
    <section id="peta" className="py-16 md:py-24 border-b border-gray-200 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-red-600 uppercase tracking-wider mb-6">
            Lokasi Desa
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed max-w-3xl">
            Peta interaktif lokasi Desa Kiawa Satu yang menunjukkan posisi geografis desa kami.
          </p>
        </div>
        <div className="bg-gray-200 rounded-lg shadow-lg overflow-hidden" style={{ height: '500px' }}>
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-600">Memuat peta...</p>
          </div>
        </div>
      </div>
    </section>
  ),
})

export default function PetaDesa() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PetaDesaContent />
    </Suspense>
  )
}