# Seven & Co. — Website Katalog & Pemesanan

Website statis (tanpa database): pengunjung melihat katalog, foto, harga, dan isi paket,
lalu mengisi form pesan. Tombol **Pesan via WhatsApp** membuka chat ke admin dengan ringkasan
pesanan yang sudah terisi. Konfirmasi, pembayaran, dan kabar perkembangan pesanan dilakukan di WhatsApp.

## Pasang di GitHub Pages
1. Buat repository baru (public), misalnya `seven-co`.
2. Upload seluruh isi folder ini (Add file → Upload files). Pastikan folder `.github` ikut.
3. Settings → Pages → Source: **GitHub Actions**.
4. Tab **Actions**: tunggu "Deploy ke GitHub Pages" hijau. Alamat website muncul di sana
   (biasanya `https://<username>.github.io/seven-co/`).

## Mengganti data usaha — `src/config.js`
Buka file di GitHub → ikon pensil → ubah → **Commit changes**. Website update sendiri dalam 1–2 menit.
- `KONTAK.whatsapp` — nomor admin penerima pesanan (boleh 08xxx atau 628xxx).
- `KONTAK.instagram`, `KONTAK.tiktok` — tanpa @.
- `PEMBAYARAN` — rekening. Selama `contoh: true`, tampil peringatan "rekening contoh, jangan transfer".
  Setelah rekening asli diisi, ubah jadi `contoh: false`. QRIS: upload gambar ke `public/qris.png`, isi `qrisGambar: 'qris.png'`.
- `ATURAN.minHariPesan` — batas minimal hari sebelum acara. `TEMA` — daftar pilihan tema.

## Paket, harga, dan foto — `src/data/paket.js`
- Ubah harga, isi, dan pilihan tiap paket di file ini.
- Foto: upload ke folder `public/foto/`, lalu tulis nama filenya di `foto: [...]` paket terkait.
  Bisa lebih dari satu foto (bisa digeser). Paket tanpa foto tampil "Foto menyusul".

## Jalankan di komputer (opsional)
`npm install` lalu `npm run dev`.
