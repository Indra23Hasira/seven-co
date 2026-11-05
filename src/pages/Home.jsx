import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import logoHero from '../assets/logo-hero.webp'
import { BRAND, ATURAN } from '../config'
import { PAKET } from '../data/paket'
import { rupiah } from '../lib/format'
import PhotoSlot from '../components/PhotoSlot'

const termurah = Math.min(...PAKET.map((p) => p.harga))

const PERSONAL = [
  {
    judul: 'Kartu ucapan',
    isi: 'Tulis pesan untuk si kecil atau tamu pesta, dicetak dan diselipkan di dalam paket.',
    ikon: (
      <>
        <rect x="6" y="10" width="36" height="28" rx="2" />
        <path d="M6 14l18 14 18-14" />
      </>
    ),
  },
  {
    judul: 'Sticker nama',
    isi: 'Nama anak (dan umurnya) tercetak di sticker, ditempel di kemasan.',
    ikon: (
      <>
        <path d="M8 8h22l10 10v22H8z" />
        <path d="M30 8v10h10" />
        <path d="M15 28h18M15 34h11" />
      </>
    ),
  },
  {
    judul: 'Pilihan tema',
    isi: 'Pilih tema yang cocok dengan pesta, dari dinosaurus sampai unicorn. Ketersediaannya kami konfirmasi.',
    ikon: (
      <>
        <path d="M24 6c-9 0-16 6-16 14 0 6 5 8 9 8h3c2 0 3 1 3 3 0 3 1 7 5 7 8 0 14-7 14-16 0-9-8-16-18-16z" />
        <circle cx="16" cy="19" r="2" />
        <circle cx="24" cy="14" r="2" />
        <circle cx="33" cy="19" r="2" />
      </>
    ),
  },
]

const LANGKAH = [
  { j: 'Pilih paket', t: 'Lihat isi tiap paket, lalu pilih yang cocok untuk acaramu.' },
  { j: 'Isi form, kirim via WhatsApp', t: 'Isi jumlah, tanggal acara, tema, dan alamat. Ringkasan pesanan langsung terkirim ke WhatsApp admin.' },
  { j: 'Admin mengonfirmasi', t: 'Kami kabari total akhir, termasuk ongkir dan biaya tambahan.' },
  { j: 'Bayar, lalu kami kemas dan antar', t: 'Transfer atau QRIS, kirim bukti bayar. Perkembangan pesanan kami kabari lewat WhatsApp.' },
]

const FAQ = [
  {
    q: 'Berapa lama pesanan disiapkan?',
    a: `Pesan paling lambat ${ATURAN.minHariPesan} hari sebelum acara. Kalau acaranya lebih dekat, tetap isi form dan kami kabari apakah masih bisa.`,
  },
  {
    q: 'Bisa pesan dalam jumlah banyak?',
    a: 'Bisa. Isi jumlah paket di form. Untuk jumlah besar, kami konfirmasi waktu pengerjaannya lewat WhatsApp.',
  },
  {
    q: 'Bagaimana cara membayar?',
    a: 'Setelah pesanan diterima, kami konfirmasi total lewat WhatsApp. Pembayaran lewat transfer rekening atau QRIS, lalu kamu kirim bukti bayarnya.',
  },
  {
    q: 'Dikirim ke mana saja?',
    a: `Kami melayani ${BRAND.area}. Ongkir dihitung sesuai alamat dan dikonfirmasi lewat WhatsApp. Bisa juga diambil sendiri.`,
  },
  {
    q: 'Bagaimana saya tahu perkembangan pesanan?',
    a: 'Kami kabari lewat chat WhatsApp di setiap tahap: konfirmasi, pembayaran diterima, sedang dikemas, sampai siap dikirim atau diambil.',
  },
]

export default function Home() {
  const { state } = useLocation()
  useEffect(() => {
    if (state?.scrollTo) {
      setTimeout(() => document.getElementById(state.scrollTo)?.scrollIntoView({ behavior: 'smooth' }), 50)
    }
  }, [state])

  return (
    <>
      <section className="hero">
        <div className="wrap hero-in">
          <div className="hero-logo">
            <img src={logoHero} alt={`Logo ${BRAND.nama}`} width="320" height="320" />
          </div>
          <div className="hero-teks">
            <p className="eyebrow eyebrow-terang">{BRAND.tagline}</p>
            <h1>
              Hampers ulang tahun anak, <em>dikemas rapi</em> dan siap dibagikan.
            </h1>
            <p className="hero-sub">
              Pilih paket, isi pesanan, dan kami antar ke {BRAND.area}. Kartu ucapan dan sticker nama bisa ditambahkan.
            </p>
            <div className="hero-aksi">
              <Link to="/pesan" className="btn btn-krim">Pesan sekarang</Link>
              <Link to="/" className="btn btn-garis" onClick={(e) => { e.preventDefault(); document.getElementById('paket')?.scrollIntoView({ behavior: 'smooth' }) }}>
                Lihat paket
              </Link>
            </div>
            <p className="hero-harga">Mulai dari {rupiah(termurah)} per paket</p>
          </div>
        </div>
        <svg className="gelombang" viewBox="0 0 1440 90" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0,46 C240,96 480,2 720,44 C960,86 1200,8 1440,54 L1440,90 L0,90 Z" fill="var(--paper)" />
          <path d="M0,46 C240,96 480,2 720,44 C960,86 1200,8 1440,54" fill="none" stroke="var(--gold)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
        </svg>
      </section>

      <section id="paket" className="bagian">
        <div className="wrap">
          <p className="eyebrow">Katalog</p>
          <h2>Pilih paket</h2>
          <p className="bagian-sub">Tiga pilihan isi. Harga per paket.</p>
          <div className="paket-grid">
            {PAKET.map((p) => (
              <article key={p.id} className={`pk pk-${p.warna}`}>
                <PhotoSlot fotos={p.foto} alt={`Paket ${p.id}`} />
                <div className="pk-badan">
                  <span className="pk-tab">{p.id}</span>
                  <p className="pk-harga">{rupiah(p.harga)} <small>/ paket</small></p>
                  <p className="pk-ringkas">{p.ringkas}</p>
                  <ul className="pk-isi">
                    {p.isi.map((i) => (
                      <li key={i.t}>
                        <span>{i.t}</span>
                        {i.cat && <em>{i.cat}</em>}
                      </li>
                    ))}
                  </ul>
                  {p.catatan && <p className="pk-catatan">{p.catatan}</p>}
                  <p className="pk-opsi"><b>Opsional, ada biaya tambahan:</b> {p.opsional}</p>
                  <Link to={`/pesan?paket=${p.id}`} className="btn btn-plum btn-block">Pesan paket {p.id}</Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bagian bagian-alt">
        <div className="wrap">
          <p className="eyebrow">Sentuhan personal</p>
          <h2>Bikin hampers terasa dibuat untuk si kecil</h2>
          <div className="personal-grid">
            {PERSONAL.map((p) => (
              <div key={p.judul} className="personal">
                <svg viewBox="0 0 48 48" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  {p.ikon}
                </svg>
                <h3>{p.judul}</h3>
                <p>{p.isi}</p>
              </div>
            ))}
          </div>
          <p className="catatan-kecil">Kartu ucapan dan sticker nama bersifat opsional dengan biaya tambahan, dikonfirmasi saat kami menghubungimu.</p>
        </div>
      </section>

      <section id="cara-pesan" className="bagian">
        <div className="wrap">
          <p className="eyebrow">Cara pesan</p>
          <h2>Empat langkah</h2>
          <ol className="langkah-grid">
            {LANGKAH.map((l, i) => (
              <li key={l.j}>
                <span className="langkah-no" aria-hidden="true">{i + 1}</span>
                <h3>{l.j}</h3>
                <p>{l.t}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bagian bagian-alt">
        <div className="wrap narrow">
          <p className="eyebrow">Pertanyaan umum</p>
          <h2>Sebelum memesan</h2>
          <div className="faq">
            {FAQ.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="ajakan">
        <div className="wrap ajakan-in">
          <h2>Siap memesan?</h2>
          <p>Isi form beberapa menit, lalu kirim lewat WhatsApp. Admin langsung mengonfirmasi pesananmu.</p>
          <Link to="/pesan" className="btn btn-krim">Pesan sekarang</Link>
        </div>
      </section>
    </>
  )
}
