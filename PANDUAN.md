# Panduan Menyambungkan Jepret ke AI Sungguhan

Panduan ini ditulis untuk yang belum pernah coding. Ikuti urutan dari atas ke bawah, jangan lompat.

Total waktu: kurang lebih 30–45 menit untuk pertama kali.

---

## Bagian 1 — Ambil API Key dari Google

Ini adalah "kunci" supaya website Anda boleh minta Google membuatkan gambar.

1. Buka https://aistudio.google.com di browser, login pakai akun Google.
2. Cari tombol **"Get API key"** (biasanya di kiri atas atau menu).
3. Klik **"Create API key"**.
4. Salin (copy) kode yang muncul — bentuknya panjang, diawali huruf/angka acak. **Simpan di tempat aman** (mis. Notes di HP), jangan dibagikan ke siapa pun.
5. Cek juga bagian billing/tagihan di Google AI Studio — untuk pemakaian di luar batas gratis, Google akan menagih otomatis ke kartu yang didaftarkan. Pastikan Anda paham biayanya (sekitar Rp600–Rp1.500 per gambar, tergantung kurs & model yang dipakai).

---

## Bagian 2 — Simpan Kode Website ke GitHub

GitHub itu semacam "Google Drive" khusus untuk kode. Vercel (tempat kita hosting nanti) butuh kode disimpan di sana.

1. Buka https://github.com, buat akun kalau belum punya (gratis).
2. Setelah login, klik ikon **"+"** di kanan atas → **"New repository"**.
3. Isi nama repository, misalnya `jepret-studio`. Biarkan pengaturan lain default. Klik **"Create repository"**.
4. Di halaman repository yang baru dibuat, cari link **"uploading an existing file"** (atau tombol "Add file" → "Upload files").
5. Buka folder project yang saya berikan (hasil unduhan), lalu **seret semua isinya** (bukan foldernya, tapi isinya: `index.html`, folder `api`, `package.json`, dst.) ke halaman upload GitHub tadi.
6. Scroll ke bawah, klik **"Commit changes"**. Selesai — kode Anda sekarang ada di GitHub.

---

## Bagian 3 — Deploy ke Vercel

Vercel yang akan membuat website Anda benar-benar bisa diakses online.

1. Buka https://vercel.com, klik **"Sign Up"**, pilih **"Continue with GitHub"** (supaya otomatis terhubung).
2. Setelah masuk dashboard, klik **"Add New..."** → **"Project"**.
3. Cari repository `jepret-studio` yang tadi dibuat, klik **"Import"**.
4. Di halaman konfigurasi, **jangan klik Deploy dulu** — scroll ke bagian **"Environment Variables"**.
5. Tambahkan satu baris:
   - **Name**: `GEMINI_API_KEY`
   - **Value**: (paste API key dari Bagian 1)
6. Klik **"Add"**, lalu klik **"Deploy"**.
7. Tunggu 1–2 menit sampai muncul tanda sukses (biasanya ada confetti 🎉) dan tombol **"Visit"** — itu link website Anda yang sudah live.

---

## Bagian 4 — Tes

1. Buka link website dari Vercel tadi.
2. Login pakai isian bebas (login masih simulasi, belum sungguhan — ini langkah terpisah nanti).
3. Unggah satu foto produk, pilih salah satu shortcut, klik **"+ Generate"**.
4. Tunggu beberapa detik — kalau berhasil, muncul foto hasil AI sungguhan. Kalau muncul pesan error, lihat bagian Troubleshooting di bawah.

---

## Kalau ada perubahan kode nanti

Setiap kali saya kasih Anda file baru/perbaikan:
1. Buka repository di GitHub.
2. Upload ulang file yang berubah (cara sama seperti Bagian 2 langkah 4–6) — GitHub otomatis menimpa file lama.
3. Vercel akan **otomatis deploy ulang** dalam 1–2 menit setelah ada perubahan di GitHub. Tidak perlu klik apa-apa di Vercel.

---

## Troubleshooting (kalau ada masalah)

**"Gagal generate: Server belum dikonfigurasi..."**
→ Environment variable `GEMINI_API_KEY` belum ke-set. Balik ke Vercel → Project Anda → Settings → Environment Variables, pastikan sudah ada, lalu buka tab **Deployments** → klik titik tiga pada deployment terakhir → **Redeploy**.

**"Gagal generate: 403" atau "API key not valid"**
→ API key salah copy, atau billing di Google AI Studio belum aktif. Cek ulang Bagian 1.

**Halaman muncul tapi Generate tidak merespons sama sekali**
→ Buka Developer Tools browser (klik kanan → Inspect → tab Console) untuk lihat pesan error, atau kirim screenshot-nya ke saya.

**Biaya membengkak tak terduga**
→ Set batas anggaran (budget alert) di Google Cloud Console/AI Studio, dan pertimbangkan menambahkan sistem kuota/kredit (sudah kita rancang strukturnya sebelumnya) supaya user tidak generate tanpa batas.

---

## Yang belum ada di versi ini

- Login sungguhan (sekarang masih bisa isi apa saja)
- Sistem kredit/kuota per user
- Pembayaran untuk beli kredit

Ini langkah lanjutan yang bisa kita kerjakan setelah Generate-nya sudah jalan dan Anda yakin arahnya sudah pas.
