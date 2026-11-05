import { useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { PAKET, cariPaket } from '../data/paket'
import { ATURAN, TEMA, BRAND } from '../config'
import { rupiah, normalisasiWA, validWA, isoHariIni, tanggalPanjang, buatKode } from '../lib/format'
import { waLink, pesanKonfirmasi } from '../lib/wa'
import Pembayaran from '../components/Pembayaran'

function Field({ id, label, hint, error, children }) {
  return (
    <div className={'field' + (error ? ' ada-err' : '')}>
      <label htmlFor={id}>{label}</label>
      {children}
      {hint && <p className="hint">{hint}</p>}
      {error && <p className="err" role="alert">{error}</p>}
    </div>
  )
}

function Sukses({ order }) {
  const link = waLink(pesanKonfirmasi(order))
  const nama = order.nama.split(' ')[0]
  return (
    <section className="wrap narrow halaman sukses">
      <p className="eyebrow">Satu langkah lagi</p>
      <h1>Kirim pesananmu di WhatsApp, {nama}</h1>
      <div className="kirim-box">
        <p>WhatsApp admin sudah terbuka dengan ringkasan pesananmu. Tekan <b>Kirim</b> di WhatsApp supaya pesanan kami terima. Kalau WhatsApp belum terbuka, pakai tombol di bawah.</p>
        <p className="kecil">Kode pesanan <span className="mono">{order.kode}</span>. Sebutkan kode ini kalau menanyakan pesanan.</p>
        <a className="btn btn-krim btn-block" href={link} target="_blank" rel="noreferrer">
          Buka WhatsApp lagi
        </a>
      </div>

      <h2 className="sub-judul">Setelah itu</h2>
      <ol className="langkah-list">
        <li>
          <h3>Admin mengonfirmasi pesanan</h3>
          <p>Kami cek ketersediaan, lalu kabari total akhir termasuk ongkir dan biaya tambahan.</p>
        </li>
        <li>
          <h3>Bayar setelah total dikonfirmasi</h3>
          <Pembayaran />
        </li>
        <li>
          <h3>Kami kabari perkembangannya</h3>
          <p>Setiap tahap kami kabari di chat yang sama: pembayaran diterima, sedang dikemas, sampai siap dikirim atau diambil.</p>
        </li>
      </ol>

      <div className="aksi-baris">
        <Link to="/" className="btn btn-garis-gelap">Kembali ke beranda</Link>
      </div>
    </section>
  )
}

const AWAL = {
  nama: '', wa: '', paket: '', qty: 1, pilihanIsi: '', kartuSticker: false,
  teksSticker: '', teksKartu: '', tema: '', tanggalAcara: '', pengiriman: 'kirim',
  alamat: '', catatan: '', website: '',
}

export default function Pesan() {
  const [params] = useSearchParams()
  const dariUrl = cariPaket(params.get('paket'))
  const [f, setF] = useState({
    ...AWAL,
    paket: dariUrl ? dariUrl.id : '',
    pilihanIsi: dariUrl?.pilihan?.opsi[0] || '',
  })
  const [err, setErr] = useState({})
  const [selesai, setSelesai] = useState(null)
  const formRef = useRef(null)

  const paket = cariPaket(f.paket)
  const subtotal = paket ? paket.harga * (Number(f.qty) || 0) : 0
  const set = (k) => (e) => setF((s) => ({ ...s, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }))
  const minTanggal = isoHariIni(ATURAN.minHariPesan)

  function pilihPaket(id) {
    const p = cariPaket(id)
    setF((s) => ({ ...s, paket: id, pilihanIsi: p.pilihan ? p.pilihan.opsi[0] : '' }))
  }
  function ubahQty(n) {
    const v = Math.max(1, Math.min(ATURAN.maksPaket, Number(n) || 1))
    setF((s) => ({ ...s, qty: v }))
  }

  function periksa() {
    const e = {}
    if (f.nama.trim().length < 2) e.nama = 'Tulis nama kamu.'
    if (!validWA(normalisasiWA(f.wa))) e.wa = 'Nomor WhatsApp belum benar. Contoh: 0812 3456 7890.'
    if (!paket) e.paket = 'Pilih salah satu paket.'
    if (!f.tanggalAcara) e.tanggalAcara = 'Pilih tanggal acara.'
    else if (f.tanggalAcara < minTanggal) {
      e.tanggalAcara = `Tanggal acara paling cepat ${tanggalPanjang(minTanggal)}. Untuk acara lebih dekat, chat kami lewat WhatsApp.`
    }
    if (f.pengiriman === 'kirim' && f.alamat.trim().length < 8) e.alamat = 'Tulis alamat lengkap pengiriman.'
    return e
  }

  function kirim(ev) {
    ev.preventDefault()
    const e = periksa()
    setErr(e)
    if (Object.keys(e).length) {
      const pertama = formRef.current?.querySelector('.ada-err input, .ada-err select, .ada-err textarea, fieldset.ada-err input')
      pertama?.focus()
      return
    }
    if (f.website) return // kolom jebakan untuk bot
    const order = {
      kode: buatKode(),
      nama: f.nama.trim(),
      wa: normalisasiWA(f.wa),
      paket: paket.id,
      qty: Number(f.qty),
      harga: paket.harga,
      subtotal,
      pilihanIsi: f.pilihanIsi,
      kartuSticker: f.kartuSticker,
      teksSticker: f.kartuSticker ? f.teksSticker.trim() : '',
      teksKartu: f.kartuSticker ? f.teksKartu.trim() : '',
      tema: f.tema,
      tanggalAcara: f.tanggalAcara,
      pengiriman: f.pengiriman,
      alamat: f.pengiriman === 'kirim' ? f.alamat.trim() : '',
      catatan: f.catatan.trim(),
    }
    // Buka WhatsApp langsung dari klik tombol (kalau diblokir browser, ada tombol cadangan di layar berikutnya).
    window.open(waLink(pesanKonfirmasi(order)), '_blank', 'noopener')
    setSelesai(order)
    window.scrollTo(0, 0)
  }

  if (selesai) return <Sukses order={selesai} />

  return (
    <section className="wrap halaman">
      <p className="eyebrow">Form pesanan</p>
      <h1>Pesan hampers</h1>
      <p className="muted lead">
        Isi data di bawah, lalu kirim lewat WhatsApp. Admin akan mengonfirmasi total sebelum kamu membayar.
      </p>

      <form className="pesan-grid" onSubmit={kirim} ref={formRef} noValidate>
        <div className="pesan-kolom">
          <fieldset className={'kelompok' + (err.paket ? ' ada-err' : '')}>
            <legend>1. Pilih paket</legend>
            <div className="pick-grid">
              {PAKET.map((p) => (
                <label key={p.id} className={`pick pick-${p.warna}` + (f.paket === p.id ? ' on' : '')}>
                  <input type="radio" name="paket" value={p.id} checked={f.paket === p.id} onChange={() => pilihPaket(p.id)} />
                  <span className="pick-nama">{p.id}</span>
                  <span className="pick-harga">{rupiah(p.harga)}</span>
                  <span className="pick-isi">{p.isi.map((i) => i.t).join(' · ')}</span>
                </label>
              ))}
            </div>
            {err.paket && <p className="err" role="alert">{err.paket}</p>}
          </fieldset>

          <fieldset className="kelompok">
            <legend>2. Jumlah dan isi</legend>
            <Field id="qty" label="Jumlah paket" hint={`Maksimal ${ATURAN.maksPaket} paket per pesanan.`}>
              <div className="stepper">
                <button type="button" onClick={() => ubahQty(Number(f.qty) - 1)} aria-label="Kurangi jumlah">−</button>
                <input id="qty" type="number" inputMode="numeric" min="1" max={ATURAN.maksPaket} value={f.qty} onChange={(e) => ubahQty(e.target.value)} />
                <button type="button" onClick={() => ubahQty(Number(f.qty) + 1)} aria-label="Tambah jumlah">+</button>
              </div>
            </Field>
            {paket?.pilihan && (
              <Field id="pilihanIsi" label={paket.pilihan.label}>
                <select id="pilihanIsi" value={f.pilihanIsi} onChange={set('pilihanIsi')}>
                  {paket.pilihan.opsi.map((o) => <option key={o}>{o}</option>)}
                </select>
              </Field>
            )}
            <Field id="tema" label="Tema (opsional)" hint="Ketersediaan tema kami konfirmasi lewat WhatsApp.">
              <select id="tema" value={f.tema} onChange={set('tema')}>
                <option value="">Belum menentukan</option>
                {TEMA.map((t) => <option key={t}>{t}</option>)}
              </select>
            </Field>
            <label className="cek">
              <input type="checkbox" checked={f.kartuSticker} onChange={set('kartuSticker')} />
              <span>
                <b>{paket?.opsional || 'Kartu ucapan + sticker nama'}</b>
                <small>Opsional, ada biaya tambahan yang kami konfirmasi.</small>
              </span>
            </label>
            {f.kartuSticker && (
              <>
                <Field id="teksSticker" label="Tulisan di sticker" hint="Contoh: Nadia 6th">
                  <input id="teksSticker" type="text" maxLength="60" value={f.teksSticker} onChange={set('teksSticker')} />
                </Field>
                <Field id="teksKartu" label="Isi kartu ucapan">
                  <textarea id="teksKartu" rows="3" maxLength="240" value={f.teksKartu} onChange={set('teksKartu')} />
                </Field>
              </>
            )}
          </fieldset>

          <fieldset className="kelompok">
            <legend>3. Acara dan pengiriman</legend>
            <Field id="tanggalAcara" label="Tanggal acara" error={err.tanggalAcara} hint={`Paling cepat ${tanggalPanjang(minTanggal)}.`}>
              <input id="tanggalAcara" type="date" min={minTanggal} value={f.tanggalAcara} onChange={set('tanggalAcara')} />
            </Field>
            <div className="radio-baris" role="radiogroup" aria-label="Cara terima pesanan">
              <label className={'radio' + (f.pengiriman === 'kirim' ? ' on' : '')}>
                <input type="radio" name="pengiriman" value="kirim" checked={f.pengiriman === 'kirim'} onChange={set('pengiriman')} />
                Dikirim
              </label>
              <label className={'radio' + (f.pengiriman === 'ambil' ? ' on' : '')}>
                <input type="radio" name="pengiriman" value="ambil" checked={f.pengiriman === 'ambil'} onChange={set('pengiriman')} />
                Ambil sendiri
              </label>
            </div>
            {f.pengiriman === 'kirim' ? (
              <Field id="alamat" label="Alamat pengiriman" error={err.alamat} hint={`Area layanan: ${BRAND.area}. Ongkir kami konfirmasi lewat WhatsApp.`}>
                <textarea id="alamat" rows="3" maxLength="400" value={f.alamat} onChange={set('alamat')} autoComplete="street-address" />
              </Field>
            ) : (
              <p className="hint">Alamat pengambilan kami kabari lewat WhatsApp.</p>
            )}
          </fieldset>

          <fieldset className="kelompok">
            <legend>4. Data pemesan</legend>
            <Field id="nama" label="Nama" error={err.nama}>
              <input id="nama" type="text" autoComplete="name" maxLength="80" value={f.nama} onChange={set('nama')} />
            </Field>
            <Field id="wa" label="Nomor WhatsApp" error={err.wa} hint="Nomor WhatsApp kamu, untuk kami hubungi.">
              <input id="wa" type="tel" inputMode="tel" autoComplete="tel" placeholder="0812 3456 7890" value={f.wa} onChange={set('wa')} />
            </Field>
            <Field id="catatan" label="Catatan (opsional)">
              <textarea id="catatan" rows="2" maxLength="300" value={f.catatan} onChange={set('catatan')} />
            </Field>
            <input className="jebakan" type="text" name="website" tabIndex="-1" autoComplete="off" aria-hidden="true" value={f.website} onChange={set('website')} />
            <p className="hint">Data kamu hanya dipakai untuk memproses pesanan ini.</p>
          </fieldset>
        </div>

        <aside className="ringkas-box" aria-label="Ringkasan pesanan">
          <h2>Ringkasan</h2>
          {paket ? (
            <dl className="ringkas">
              <div><dt>Paket</dt><dd>{paket.id} × {f.qty}</dd></div>
              <div><dt>Harga satuan</dt><dd>{rupiah(paket.harga)}</dd></div>
              {paket.pilihan && <div><dt>{paket.pilihan.label}</dt><dd>{f.pilihanIsi}</dd></div>}
              {f.tema && <div><dt>Tema</dt><dd>{f.tema}</dd></div>}
              {f.tanggalAcara && <div><dt>Acara</dt><dd>{tanggalPanjang(f.tanggalAcara)}</dd></div>}
            </dl>
          ) : (
            <p className="muted">Pilih paket dulu.</p>
          )}
          <div className="total">
            <span>Perkiraan total</span>
            <strong>{rupiah(subtotal)}</strong>
          </div>
          <p className="hint">
            Belum termasuk ongkir{f.kartuSticker ? ' dan biaya kartu/sticker' : ''}. Total akhir kami konfirmasi lewat WhatsApp sebelum kamu membayar.
          </p>
          <button className="btn btn-plum btn-block btn-besar" type="submit">
            Pesan via WhatsApp
          </button>
          <p className="hint">Tombol ini membuka WhatsApp admin dengan ringkasan pesananmu. Pesanan kami terima setelah kamu tekan Kirim di WhatsApp.</p>
        </aside>
      </form>
    </section>
  )
}
