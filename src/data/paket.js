// Isi dan harga paket. Foto: taruh file di public/foto/ lalu tulis namanya di `foto`.
// Paket tanpa foto otomatis tampil "Foto menyusul".
export const PAKET = [
  {
    id: 'Basic',
    harga: 15000,
    ringkas: 'A sweet little gift. Hadiah manis yang siap bikin hari si kecil lebih spesial.',
    warna: 'blush',
    foto: ['basic-1.jpg'], // file di public/foto/. Bisa lebih dari satu: ['basic-1.jpg', 'basic-2.jpg']
    isi: [
      { t: '2 snack ringan' },
      { t: '1 wafer / biskuit' },
      { t: '1 permen' },
      { t: '1 susu' },
      { t: '1 mainan / souvenir' },
    ],
    catatan: 'Isi bisa disesuaikan dengan ketersediaan stok.',
    pilihan: null,
    opsional: 'Kartu ucapan + sticker nama',
  },
  {
    id: 'Medium',
    harga: 25000,
    ringkas: 'Goodie bag lengkap dengan satu hadiah kecil.',
    warna: 'mauve',
    foto: [],
    isi: [
      { t: 'Snack 6 macam' },
      { t: 'Puzzle / bubble / stationery / buku', cat: 'Pilih salah satu' },
      { t: 'Goodie bag' },
    ],
    pilihan: {
      label: 'Pilih satu hadiah',
      opsi: ['Puzzle', 'Bubble', 'Stationery', 'Buku'],
    },
    opsional: 'Kartu ucapan + sticker nama',
  },
  {
    id: 'Premium',
    harga: 35000,
    ringkas: 'Hampers spesial dalam box atau basket, cocok sebagai kado.',
    warna: 'plum',
    foto: ['premium-1.jpg'],
    isi: [
      { t: 'Snack 6 macam' },
      { t: 'Mainan yang lebih menarik' },
      { t: 'Coloring set / activity set' },
      { t: 'Souvenir kecil' },
      { t: 'Box / basket' },
    ],
    pilihan: null,
    opsional: 'Kartu ucapan + custom sticker',
  },
]

export const cariPaket = (id) => PAKET.find((p) => p.id === id)
