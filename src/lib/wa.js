import { KONTAK, BRAND } from '../config'
import { rupiah, tanggalPanjang, normalisasiWA } from './format'

export function waLink(teks, nomor = KONTAK.whatsapp) {
  const n = normalisasiWA(nomor)
  return `https://wa.me/${n}?text=${encodeURIComponent(teks)}`
}

export function ringkasPesanan(o) {
  const baris = [
    `Kode pesanan: ${o.kode}`,
    `Nama: ${o.nama}`,
    `No. WA: ${o.wa}`,
    `Paket: ${o.paket} x ${o.qty}${o.pilihanIsi ? ` (${o.pilihanIsi})` : ''}`,
    `Harga: ${rupiah(o.harga)} / paket`,
    `Perkiraan subtotal: ${rupiah(o.subtotal)}`,
  ]
  if (o.kartuSticker) {
    baris.push(
      `Kartu ucapan + sticker nama: ya${o.teksSticker ? `, tulisan sticker: ${o.teksSticker}` : ''}${o.teksKartu ? `, isi kartu: ${o.teksKartu}` : ''}`,
    )
  }
  if (o.tema) baris.push(`Tema: ${o.tema}`)
  baris.push(`Tanggal acara: ${tanggalPanjang(o.tanggalAcara)}`)
  baris.push(o.pengiriman === 'kirim' ? `Dikirim ke: ${o.alamat}` : 'Diambil sendiri')
  if (o.catatan) baris.push(`Catatan: ${o.catatan}`)
  return baris.join('\n')
}

// Pesan dari pelanggan ke admin
export function pesanKonfirmasi(o) {
  return `Halo ${BRAND.nama}, saya mau pesan hampers lewat website.\n\n${ringkasPesanan(o)}\n\nMohon konfirmasi total (termasuk ongkir) dan info pembayarannya. Terima kasih!`
}

export const pesanTanya = `Halo ${BRAND.nama}, saya mau tanya soal hampers.`
