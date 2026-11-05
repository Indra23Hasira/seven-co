import { PEMBAYARAN } from '../config'

// Info rekening / QRIS dari config. Kalau belum diisi, tampil pesan pengganti.
export default function Pembayaran() {
  const p = PEMBAYARAN
  if (!p.noRek && !p.qrisGambar) {
    return <p className="muted">Info rekening dan QRIS kami kirim lewat WhatsApp setelah total dikonfirmasi.</p>
  }
  return (
    <div className="bayar">
      {p.contoh && (
        <p className="peringatan">Rekening contoh, belum aktif. Jangan transfer ke rekening ini; tunggu info pembayaran dari admin lewat WhatsApp.</p>
      )}
      {p.noRek && (
        <dl className="bayar-rek">
          <div><dt>Bank</dt><dd>{p.bank}</dd></div>
          <div><dt>No. rekening</dt><dd className="mono">{p.noRek}</dd></div>
          <div><dt>Atas nama</dt><dd>{p.atasNama}</dd></div>
        </dl>
      )}
      {p.qrisGambar && <img className="qris" src={import.meta.env.BASE_URL + p.qrisGambar} alt="QRIS pembayaran" />}
    </div>
  )
}
