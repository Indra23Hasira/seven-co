import { Link } from 'react-router-dom'
import { waLink, pesanTanya } from '../lib/wa'

// Bilah tombol di bawah layar HP, supaya pelanggan selalu bisa langsung memesan.
export default function StickyBar() {
  return (
    <div className="sticky-bar">
      <Link to="/pesan" className="btn btn-plum">Pesan sekarang</Link>
      <a
        className="btn btn-line"
        href={waLink(pesanTanya)}
        target="_blank"
        rel="noreferrer"
      >
        Chat WhatsApp
      </a>
    </div>
  )
}
