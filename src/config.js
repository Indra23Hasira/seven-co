// =====================================================================
// PENGATURAN WEBSITE. Semua data usaha yang bisa diganti ada di file ini.
// Cara ganti lewat GitHub: buka file ini > ikon pensil > ubah > Commit changes.
// Website update sendiri dalam 1–2 menit.
// =====================================================================

export const BRAND = {
  nama: 'Seven & Co.',
  tagline: 'Hampers & goodie bag ulang tahun anak',
  area: 'Tangerang & Jakarta',
}

// Nomor WhatsApp admin yang MENERIMA PESANAN.
// Boleh ditulis 08xxx atau 628xxx. Nomor admin resmi (sama dengan di poster).
export const KONTAK = {
  whatsapp: '085883258926',
  instagram: 'seven.nco', // tanpa @
  tiktok: 'seven.nco', // tanpa @
}

// Info pembayaran yang tampil setelah pelanggan mengirim pesanan.
// contoh: true  = rekening masih CONTOH, tampil peringatan "jangan transfer".
//                 Ganti ke false setelah rekening asli diisi.
// qrisGambar: nama file gambar QRIS di folder public/, contoh 'qris.png'. Kosongkan kalau belum ada.
export const PEMBAYARAN = {
  contoh: true,
  bank: 'BCA',
  noRek: '1234567890',
  atasNama: 'Seven & Co.',
  qrisGambar: '',
}

// Aturan pemesanan. Silakan sesuaikan.
export const ATURAN = {
  minHariPesan: 3, // tanggal acara paling cepat H+3 dari hari ini
  maksPaket: 500,
}

// Pilihan tema di form pesan. Ubah sesuai tema yang kamu siapkan.
export const TEMA = [
  'Dinosaurus',
  'Unicorn',
  'Astronot / Luar angkasa',
  'Princess',
  'Hewan / Safari',
  'Superhero',
  'Pelangi',
  'Tema lain (tulis di catatan)',
]
