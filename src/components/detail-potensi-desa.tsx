'use client'

import { ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useRef } from 'react'

interface DetailPotensiDesaProps {
  id: string
  title: string
  heroImage: string
  sections: Array<{
    title: string
    description: string
  }>
  onBack: () => void
}

export default function DetailPotensiDesa({
  id,
  title,
  heroImage,
  sections,
  onBack,
}: DetailPotensiDesaProps) {
  const sectionRef = useRef<HTMLElement>(null)

  // Scroll ke awal section saat komponen mount
  useEffect(() => {
    sectionRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }, [id])

  return (
    <section ref={sectionRef} id={`detail-${id}`} className="min-h-screen bg-white pt-20 pb-16">
      {/* Button Back */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 mb-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-red-600 hover:text-red-700 font-semibold transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Kembali
        </button>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {/* Hero Image */}
        <div className="mb-12 rounded-lg overflow-hidden shadow-lg">
          <div className="relative w-full h-96 md:h-[500px]">
            <Image
              src={heroImage}
              alt={title}
              fill
              className="object-cover"
              priority
            />
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>
        </div>

        {/* Title */}
        <div className="mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-red-600 mb-4">{title}</h1>
          <div className="w-20 h-1 bg-red-600 rounded-full"></div>
        </div>

        {/* Sections */}
        <div className="space-y-12">
          {sections.map((section, index) => {
            const letterMap = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
            return (
              <div key={index} className="border-l-4 border-red-600 pl-6 md:pl-8">
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">
                      {letterMap[index] || ''}
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-800 pt-1">
                    {section.title}
                  </h2>
                </div>
                <p className="text-gray-700 text-lg leading-relaxed">
                  {section.description}
                </p>
              </div>
            )
          })}
        </div>

        {/* Back to Top Button */}
        <div className="mt-16 flex justify-center">
          <button
            onClick={onBack}
            className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors"
          >
            Kembali ke Potensi Desa
          </button>
        </div>
      </div>
    </section>
  )
}