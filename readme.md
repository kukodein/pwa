# 🌐 Hybrid PWA Demo

Contoh PWA dengan penyimpanan Hybrid untuk file Assets dan data dari API

- Simpan Cache Asset di Cache Storage
- Simpan data API di IndexedDB

## Logika Simpan Data di PWA

- Cek apakah dalam jaringan? 
- Jika Iya (Online): maka ambil data dari API dan simpan data ke IndexedDB 
- Jika Tidak (Offline): 
  - Cek apakah ada data didalam indexDB, maka ambil data dari IndexedDB
  - Cek apakah tidak ada data didalam IndexedDB, maka tampilkan offline.html

## Sumber Data

Ambil data sample dari API berikut: https://jsonplaceholder.typicode.com/posts?_limit=15

## Duplicate Project

- `index.html` dan `offline.com`: edit konten
- `manifest.json`: informasi untuk PWA
- `sw.js`: daftar file yang dicache