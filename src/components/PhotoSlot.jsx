import { useEffect, useState } from 'react'

const FOTO_BASE = import.meta.env.BASE_URL + 'foto/'

function IkonKado() {
  return (
    <svg viewBox="0 0 48 48" width="44" height="44" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="8" y="20" width="32" height="20" rx="2" />
      <path d="M6 14h36v6H6zM24 14v26" />
      <path d="M24 14c-3-6-11-6-11-2s7 2 11 2zM24 14c3-6 11-6 11-2s-7 2-11 2z" />
    </svg>
  )
}

function Lightbox({ src, alt, tutup }) {
  useEffect(() => {
    const k = (e) => e.key === 'Escape' && tutup()
    document.addEventListener('keydown', k)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', k)
      document.body.style.overflow = ''
    }
  }, [tutup])
  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={alt} onClick={tutup}>
      <img src={src} alt={alt} />
      <button type="button" className="lightbox-x" onClick={tutup} autoFocus>Tutup</button>
    </div>
  )
}

// Foto produk. Ketuk foto untuk memperbesar. Kalau belum ada foto, tampil bingkai "Foto menyusul".
export default function PhotoSlot({ fotos = [], alt }) {
  const [rusak, setRusak] = useState({})
  const [besar, setBesar] = useState(null)
  const daftar = fotos.filter((f) => !rusak[f])
  if (!daftar.length) {
    return (
      <div className="photo photo-ph" role="img" aria-label={`${alt}, foto menyusul`}>
        <IkonKado />
        <span>Foto menyusul</span>
      </div>
    )
  }
  return (
    <>
      <div className="photo photo-strip">
        {daftar.map((f, i) => (
          <button key={f} type="button" className="photo-btn" onClick={() => setBesar(f)} aria-label={`Perbesar foto ${alt}${daftar.length > 1 ? ` ${i + 1}` : ''}`}>
            <img
              src={FOTO_BASE + f}
              alt={alt}
              loading="lazy"
              onError={() => setRusak((r) => ({ ...r, [f]: true }))}
            />
          </button>
        ))}
        <span className="photo-tip" aria-hidden="true">Ketuk untuk perbesar</span>
      </div>
      {besar && <Lightbox src={FOTO_BASE + besar} alt={alt} tutup={() => setBesar(null)} />}
    </>
  )
}
