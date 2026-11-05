import { Link, useLocation, useNavigate } from 'react-router-dom'
import logoSm from '../assets/logo-sm.webp'
import { BRAND } from '../config'

export function keBagian(navigate, pathname, id) {
  if (pathname === '/') {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  } else {
    navigate('/', { state: { scrollTo: id } })
  }
}

export default function Header() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  return (
    <header className="topbar">
      <div className="wrap topbar-in">
        <Link to="/" className="brand" aria-label={`${BRAND.nama}, beranda`}>
          <img src={logoSm} alt="" width="40" height="40" />
          <span>{BRAND.nama}</span>
        </Link>
        <nav className="nav" aria-label="Menu utama">
          <button type="button" className="nav-link" onClick={() => keBagian(navigate, pathname, 'paket')}>
            Paket
          </button>
          <button type="button" className="nav-link hide-sm" onClick={() => keBagian(navigate, pathname, 'cara-pesan')}>
            Cara pesan
          </button>
          <Link to="/pesan" className="btn btn-plum btn-sm">Pesan</Link>
        </nav>
      </div>
    </header>
  )
}
