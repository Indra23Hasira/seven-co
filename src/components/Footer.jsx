import logoSm from '../assets/logo-sm.webp'
import { BRAND, KONTAK } from '../config'
import { waLink, pesanTanya } from '../lib/wa'

export default function Footer() {
  return (
    <footer className="foot">
      <div className="wrap foot-in">
        <div className="foot-brand">
          <img src={logoSm} alt="" width="56" height="56" />
          <div>
            <p className="foot-name">{BRAND.nama}</p>
            <p>{BRAND.tagline}</p>
            <p>Area pengantaran: {BRAND.area}</p>
          </div>
        </div>
        <ul className="foot-links">
          <li>
            <a href={waLink(pesanTanya)} target="_blank" rel="noreferrer">WhatsApp</a>
          </li>
          {KONTAK.instagram && (
            <li>
              <a href={`https://instagram.com/${KONTAK.instagram}`} target="_blank" rel="noreferrer">Instagram @{KONTAK.instagram}</a>
            </li>
          )}
          {KONTAK.tiktok && (
            <li>
              <a href={`https://www.tiktok.com/@${KONTAK.tiktok}`} target="_blank" rel="noreferrer">TikTok @{KONTAK.tiktok}</a>
            </li>
          )}
        </ul>
      </div>
      <div className="wrap foot-bawah">
        <span>© {new Date().getFullYear()} {BRAND.nama}</span>
      </div>
    </footer>
  )
}
