'use client'

import { X } from 'lucide-react'
import { useEffect } from 'react'

interface PopupJelajahiDesaProps {
  isOpen: boolean
  onClose: () => void
  title: string
  content: string
}

export default function PopupJelajahiDesa({ isOpen, onClose, title, content }: PopupJelajahiDesaProps) {
  // Prevent body scroll saat modal terbuka
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // Close modal saat menekan ESC
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop dengan blur effect */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        <div
          className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-hidden transform transition-all duration-300 animate-in fade-in zoom-in-95"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-linear-to-r from-red-600 to-red-700 px-6 sm:px-8 py-6 flex items-center justify-between">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">{title}</h2>
            <button
              onClick={onClose}
              className="text-white hover:bg-red-800 rounded-full p-2 transition-colors duration-200"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="overflow-y-auto" style={{ maxHeight: 'calc(85vh - 180px)' }}>
            <div className="px-6 sm:px-8 py-6 sm:py-8 text-gray-700 leading-relaxed space-y-4">
              {content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-base sm:text-lg">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Footer dengan tombol close */}
          <div className="shrink-0 bg-gray-50 px-6 sm:px-8 py-4 border-t border-gray-200 flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors duration-200 cursor-pointer"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </>
  )
}