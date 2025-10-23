'use client'

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Koordinat Desa Kiawa Satu
const desaLocation = {
  lat: 1.221471,
  lng: 124.781857,
}

export default function PetaDesaContent() {
  // Fix marker icon
  const customIcon = new L.Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  })

  return (
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

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <MapContainer
            center={[desaLocation.lat, desaLocation.lng]}
            zoom={15}
            style={{ height: '500px', width: '100%' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[desaLocation.lat, desaLocation.lng]} icon={customIcon}>
              <Popup>
                <div className="text-center">
                  <h3 className="font-bold text-red-600">Desa Kiawa Satu</h3>
                  <p className="text-sm">Minahasa, Sulawesi Utara</p>
                  <p className="text-xs text-gray-600 mt-1">
                    {desaLocation.lat.toFixed(4)}°, {desaLocation.lng.toFixed(4)}°
                  </p>
                </div>
              </Popup>
            </Marker>
          </MapContainer>
        </div>

        <div className="mt-8 p-6 bg-red-50 rounded-lg border-l-4 border-red-600">
          <h3 className="text-xl font-bold text-red-600 mb-2">Informasi Lokasi</h3>
          <p className="text-gray-700">
            <strong>Desa Kiawa Satu</strong><br />
            Koordinat: {desaLocation.lat.toFixed(4)}°, {desaLocation.lng.toFixed(4)}°<br />
            Kabupaten: Minahasa<br />
            Provinsi: Sulawesi Utara
          </p>
        </div>
      </div>
    </section>
  )
}