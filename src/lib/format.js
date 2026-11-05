export const rupiah = (n) => 'Rp' + Math.round(n || 0).toLocaleString('id-ID')

const pecah = (iso) => String(iso || '').split('-').map(Number)

export function tanggalPanjang(iso) {
  if (!iso) return '-'
  const [y, m, d] = pecah(iso)
  return new Date(y, m - 1, d).toLocaleDateString('id-ID', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  })
}

export function isoHariIni(tambah = 0) {
  const d = new Date()
  d.setDate(d.getDate() + tambah)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

export function normalisasiWA(v) {
  let n = String(v || '').replace(/\D/g, '')
  if (n.startsWith('0')) n = '62' + n.slice(1)
  else if (n.startsWith('8')) n = '62' + n
  return n
}
export const validWA = (n) => /^62\d{8,13}$/.test(n)

// 32 huruf/angka tanpa I, O, 0, 1 supaya mudah dibaca. 32 membagi 256 sama rata.
// Kode ini hanya nomor referensi di chat WhatsApp (tidak disimpan di server).
const HURUF = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
export function buatKode() {
  const a = new Uint8Array(6)
  crypto.getRandomValues(a)
  return 'SC-' + Array.from(a, (x) => HURUF[x % 32]).join('')
}
