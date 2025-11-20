# React Redux E-Commerce Store

Aplikasi E-Commerce modern yang dibangun menggunakan **Next.js 16** dan **React 19**, dengan fokus utama pada implementasi **Redux Toolkit** untuk manajemen state global yang efisien. Proyek ini mendemonstrasikan cara mengelola data produk (filtering, sorting, searching) dan keranjang belanja (cart) secara *seamless*.

## 🛠 Tech Stack

* **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
* **Library:** [React 19](https://react.dev/)
* **State Management:** [Redux Toolkit](https://redux-toolkit.js.org/) & React-Redux
* **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
* **Icons:** Lucide React

## ✨ Fitur Utama

### 🛍️ Manajemen Produk (`productSlice`)
Fitur pengelolaan tampilan produk yang dinamis tanpa reload halaman:
* **Search Real-time:** Mencari produk berdasarkan nama.
* **Filtering Kategori:** Menyaring produk berdasarkan kategori tertentu.
* **Advanced Sorting:** Mengurutkan produk berdasarkan:
    * Harga (Termurah - Termahal)
    * Harga (Termahal - Termurah)
    * Nama (A - Z)
    * Nama (Z - A)

### 🛒 Keranjang Belanja (`cartSlice`)
Sistem keranjang belanja yang reaktif:
* **Add to Cart:** Menambahkan item baru atau menambah jumlah item yang sudah ada.
* **Remove/Decrease Item:** Mengurangi jumlah item atau menghapusnya jika jumlah mencapai nol.
* **Auto Calculation:** Penghitungan total harga dan total item secara otomatis menggunakan selector.

## 📂 Struktur Redux Store

Aplikasi ini menggunakan **feature-based structure** untuk Redux:

```javascript
// src/store.js
export default configureStore({
  reducer: {
    cart: cartSlice.reducer,      // Handle logika keranjang
    product: productSlice,        // Handle logika display produk
  },
});
````

## 🚀 Cara Instalasi & Menjalankan

Ikuti langkah-langkah berikut untuk menjalankan proyek di komputer lokal Anda:

1.  **Clone repository:**

    ```bash
    git clone <repository-url>
    cd react-redux
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Jalankan Development Server:**

    ```bash
    npm run dev
    ```

4.  **Buka Aplikasi:**
    Akses [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) di browser Anda.

## 📜 Skrip Tersedia

  * `npm run dev`: Menjalankan server development Next.js.
  * `npm run build`: Membuild aplikasi untuk production.
  * `npm run start`: Menjalankan server production.
  * `npm run lint`: Menjalankan ESLint untuk pengecekan kode.

## 📄 Lisensi

Proyek ini dibuat untuk tujuan pembelajaran (**Course Redux Toolkit**).


Copyright © 2025 RapzzKY

```
```
