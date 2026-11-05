import { useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import StickyBar from './components/StickyBar.jsx'
import Home from './pages/Home.jsx'
import Pesan from './pages/Pesan.jsx'

function KeAtas() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  const { pathname } = useLocation()
  const tanpaBar = pathname === '/pesan'
  return (
    <div className={tanpaBar ? '' : 'punya-bar'}>
      <KeAtas />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pesan" element={<Pesan />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
      {!tanpaBar && <StickyBar />}
    </div>
  )
}
