import { ServicePackage, PortfolioItem, TestimonialItem, EstimatorFeature } from './types';

export const servicePackages: ServicePackage[] = [
  {
    id: 'landing',
    name: 'Paket Landing Page',
    price: 750000,
    originalPrice: 1200000,
    description: 'Solusi satu halaman hemat untuk mempromosikan produk tunggal, event, kuliner, atau jasa spesifik Anda.',
    features: [
      'Desain Premium & Responsive (HP/Tablet/PC)',
      '1 Halaman Fokus Konversi (Section Terstruktur)',
      'Tombol WhatsApp Pintar (Langsung Chat Admin)',
      'Integrasi Media Sosial (IG, FB, TikTok)',
      'Optimasi SEO Dasar (Mudah Dicari di Google)',
      'Sertifikat Keamanan SSL Gratis (HTTPS)',
      'Gratis Domain .my.id / .web.id (Tahun ke-1)',
      'Revisi Desain 2x'
    ],
    badge: 'Paling Hemat',
    deliveryTime: '1-2 Hari Kerja'
  },
  {
    id: 'profile',
    name: 'Paket Company Profile',
    price: 1499000,
    originalPrice: 2200000,
    description: 'Tingkatkan kredibilitas bisnis kuliner, klinik, kontraktor, yayasan, atau jasa profesional Anda dengan profil elegan.',
    features: [
      'Desain Profesional, Clean & Elegan',
      'Hingga 5 Halaman Utama (Home, Tentang, Layanan, Galeri, Kontak)',
      'Email Bisnis Profesional (misal: admin@namaumkm.com)',
      'Integrasi Google Maps Lokasi Usaha',
      'Formulir Kontak Langsung ke Email & WA',
      'Optimasi Kecepatan Loading (Sangat Cepat)',
      'Optimasi SEO Lokal agar Muncul di Pencarian Sekitar',
      'Gratis Domain .com / .id (Tahun ke-1)',
      'Revisi Desain 3x',
      'Bantuan Pendaftaran Google My Business (Google Maps)'
    ],
    badge: 'Terpopuler',
    deliveryTime: '2-5 Hari Kerja',
    recommended: true
  },
  {
    id: 'toko-online',
    name: 'Paket Toko Online (E-Commerce)',
    price: 2499000,
    originalPrice: 3800000,
    description: 'Miliki toko online sendiri untuk berjualan fashion, retail, herbal, atau kuliner tanpa potongan komisi marketplace.',
    features: [
      'Sistem E-Commerce Lengkap & Mandiri',
      'Halaman Produk Unlimited (Mudah Input Sendiri)',
      'Fitur Keranjang Belanja & Checkout WhatsApp Pintar',
      'Integrasi Ongkir Otomatis seluruh Indonesia (JNE, J&T, SiCepat)',
      'Sistem Kupon Diskon & Potongan Harga',
      'Notifikasi Order Otomatis via WhatsApp',
      'Email Bisnis & Statistik Pengunjung Website',
      'Gratis Domain .com / .co.id (Tahun ke-1)',
      'Revisi Desain s.d. Puas (Max 5x)'
    ],
    badge: 'UMKM Mandiri',
    deliveryTime: '7-12 Hari Kerja'
  },
  {
    id: 'custom',
    name: 'Paket Custom & Sistem Web',
    price: 4999000,
    description: 'Aplikasi berbasis web kustom untuk kebutuhan khusus seperti sistem reservasi, kos-kosan, rental mobil, atau e-learning.',
    features: [
      'Analisis Kebutuhan Bisnis Mendalam',
      'Desain UI/UX Eksklusif & Kustom (Bukan Template)',
      'Integrasi Payment Gateway Otomatis (Midtrans/Xendit)',
      'Sistem Booking / Reservasi Jadwal Interaktif',
      'Dashboard Admin Khusus untuk Manajemen Data',
      'Keamanan Database Tingkat Lanjut',
      'Optimasi Performa & Cache Maksimal',
      'Gratis Domain .com & Cloud Hosting Premium',
      'Support & Maintenance Premium 3 Bulan',
      'Garansi Perbaikan Bug Server (30 Hari)'
    ],
    badge: 'Sistem Kustom',
    deliveryTime: 'Sesuai Kesepakatan'
  }
];

export const portfolioItems: PortfolioItem[] = [
  {
    id: 'port-1',
    title: 'Nusa Kreasi Arsitek & Kontraktor',
    category: 'profile',
    description: 'Website profil perusahaan arsitektur dan kontraktor bangunan profesional yang menampilkan portofolio proyek, layanan konstruksi, serta konsultasi rancang bangun.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    tags: ['Arsitek & Kontraktor', 'Profil Bisnis', 'Portofolio Proyek'],
    clientName: 'Nusa Kreasi Arsitek',
    clientLocation: 'Jakarta & Indonesia',
    liveUrl: 'https://example-arsitek-kontraktor.vercel.app/'
  },
  {
    id: 'port-2',
    title: 'Clinic - Layanan Kesehatan',
    category: 'profile',
    description: 'Platform profil klinik kesehatan modern untuk informasi fasilitas medis, pendaftaran pasien online, jadwal praktek dokter, dan konsultasi WhatsApp.',
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80',
    tags: ['Klinik Kesehatan', 'Profil Medis', 'Jadwal Dokter'],
    clientName: 'Clinic',
    clientLocation: 'Indonesia',
    liveUrl: 'https://example-beauty-clinic.vercel.app/'
  },
  {
    id: 'port-3',
    title: 'Tour & Travel Wisata',
    category: 'landing',
    description: 'Website agen perjalanan dan pariwisata yang menawarkan paket liburan populer, itinerari destinasi wisata, serta reservasi perjalanan online.',
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80',
    tags: ['Tour & Travel', 'Paket Wisata', 'Reservasi Online'],
    clientName: 'Tour & Travel',
    clientLocation: 'Indonesia',
    liveUrl: 'https://mhsbarsai.github.io/example-tour---travel/'
  },
  {
    id: 'port-4',
    title: 'Wedding Organizer',
    category: 'landing',
    description: 'Landing page dan profil Wedding Organizer terpercaya dengan galeri dekorasi pernikahan, katalog gaun & tata rias, serta paket pesta pernikahan.',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    tags: ['Wedding Organizer', 'Paket Pernikahan', 'Galeri Dekorasi'],
    clientName: 'Wedding Organizer',
    clientLocation: 'Indonesia',
    liveUrl: 'https://mhsbarsai.github.io/example-wedding-organizer/'
  },
  {
    id: 'port-5',
    title: 'Toko Online Fashion & Retail',
    category: 'toko-online',
    description: 'E-commerce toko online belanja modern terintegrasi lengkap dengan kurir pengiriman (JNE, J&T, SiCepat, Pos Indonesia, GoSend, GrabExpress) untuk cek ongkir otomatis, serta metode pembayaran lokal seperti QRIS, Transfer Bank (BCA, Mandiri, BRI, BNI), E-Wallet (GoPay, OVO, Dana, ShopeePay), dan sistem COD.',
    image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=800&q=80',
    tags: ['Toko Online', 'Cek Ongkir Otomatis', 'JNE/J&T/SiCepat/GoSend', 'QRIS & Transfer Bank', 'E-Wallet & COD'],
    clientName: 'Toko Online',
    clientLocation: 'Indonesia',
    liveUrl: 'https://example-toko-online.vercel.app/'
  }
];

export const testimonials: TestimonialItem[] = [
  {
    id: 'test-1',
    name: 'Ibu Retno Wardhani',
    role: 'Pemilik Usaha',
    company: 'Griya Asri Co-Living',
    category: 'Properti',
    rating: 5,
    content: 'Sangat puas dengan hasilnya! Dulu promosi kos-kosan cuma lewat grup WA dan sebar brosur kertas. Sekarang calon penyewa bisa lihat foto kamar & fasilitas lengkap di website. WhatsApp kosan jadi ramai calon penyewa berkualitas yang langsung tanya ketersediaan.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&h=150&q=80'
  },
  {
    id: 'test-2',
    name: 'Bapak Handoko Susilo',
    role: 'Founder & Owner',
    company: 'Jati Luhur Furniture',
    category: 'Ekspor Furnitur',
    rating: 5,
    content: 'Website katalog yang dibuatkan sangat rapi dan terlihat mahal. Customer dari Jakarta dan Surabaya makin yakin bertransaksi puluhan juta setelah melihat portofolio kami yang terdokumentasi rapi di website. Sungguh investasi terbaik bagi UMKM daerah.',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&h=150&q=80'
  },
  {
    id: 'test-3',
    name: 'Teh Amalia Kartika',
    role: 'Direktur Kreatif',
    company: 'Ameera Hijab Syari',
    category: 'Fashion / Online Shop',
    rating: 5,
    content: 'Fitur checkout otomatis langsung ke WhatsApp yang diintegrasikan dengan ongkos kirim itu praktis banget! Admin kami tidak perlu hitung manual lagi. Sejak website diluncurkan, penjualan bulanan kami naik lebih dari 35% karena customer bisa checkout 24 jam.',
    avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=150&h=150&q=80'
  },
  {
    id: 'test-4',
    name: 'Mas Budi Prasetyo',
    role: 'Pemilik Resto',
    company: 'Soto Kudus Pak Ndut',
    category: 'Kuliner',
    rating: 5,
    content: 'Website kami sering masuk halaman pertama Google untuk pencarian "Kuliner Soto Terdekat". Berkat Google Maps dan landing page yang kencang, banyak rombongan bus pariwisata luar kota mampir makan di warung kami. Sangat profesional pelayanannya.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&h=150&q=80'
  }
];

export const estimatorFeatures: EstimatorFeature[] = [
  // Base Type
  { id: 'base-landing', name: 'Website Landing Page (1 Halaman)', description: 'Satu halaman panjang fokus konversi promosi produk/jasa.', price: 750000, category: 'base' },
  { id: 'base-profile', name: 'Website Profil Perusahaan (Multi-page)', description: 'Beberapa halaman lengkap menjelaskan profil, visi, dan layanan.', price: 1400000, category: 'base' },
  { id: 'base-shop', name: 'Website Toko Online / E-Commerce', description: 'Katalog produk lengkap dengan manajemen stok, keranjang belanja, & transaksi.', price: 2300000, category: 'base' },

  // Pages Count
  { id: 'page-sm', name: 'Jumlah Halaman: 1 - 3 Halaman', description: 'Jumlah standar website hemat.', price: 0, category: 'pages' },
  { id: 'page-md', name: 'Jumlah Halaman: 4 - 7 Halaman', description: 'Informasi bisnis lebih mendetail.', price: 250000, category: 'pages' },
  { id: 'page-lg', name: 'Jumlah Halaman: 8 - 15 Halaman', description: 'Cocok untuk layanan usaha yang banyak.', price: 500000, category: 'pages' },

  // Features (Integrations)
  { id: 'feat-wa', name: 'Checkout WhatsApp Otomatis', description: 'Data pemesanan dirangkum dan dikirim otomatis langsung ke WA penjual.', price: 150000, category: 'features' },
  { id: 'feat-shipping', name: 'Hitung Ongkos Kirim Otomatis (RajaOngkir)', description: 'Menghitung tarif ongkir JNE/J&T/Sicepat real-time dari alamat pembeli.', price: 300000, category: 'features' },
  { id: 'feat-payment', name: 'Integrasi Payment Gateway (Qris, Transfer Bank)', description: 'Menerima pembayaran otomatis instan (Midtrans/Xendit) dengan QRIS.', price: 500000, category: 'features' },
  { id: 'feat-booking', name: 'Sistem Reservasi / Booking Kalender', description: 'Sistem booking slot waktu untuk salon, klinik, atau rental mobil.', price: 400000, category: 'features' },
  { id: 'feat-multilingual', name: 'Fitur Dua Bahasa (Indonesian & English)', description: 'Pengunjung bisa ganti bahasa website secara instan.', price: 350000, category: 'features' },
  { id: 'feat-maps', name: 'Google Maps & Registrasi Usaha Google', description: 'Kami daftarkan lokasi fisik usaha Anda agar terdaftar resmi di Google Maps.', price: 150000, category: 'features' },

  // Add-ons
  { id: 'add-com', name: 'Domain Premium (.com / .id)', description: 'Alamat website premium tepercaya tahun pertama.', price: 180000, category: 'addons' },
  { id: 'add-email', name: 'Email Bisnis Profesional (misal: halo@bisnis.com)', description: 'Meningkatkan kepercayaan saat berkirim penawaran.', price: 120000, category: 'addons' },
  { id: 'add-seo', name: 'Optimasi SEO Konten Tingkat Lanjut', description: 'Riset kata kunci kompetitor agar website mudah naik peringkat Google.', price: 250000, category: 'addons' },
  { id: 'add-maintenance', name: 'Jasa Maintenance Bulanan & Backup (6 Bulan)', description: 'Bantu edit tulisan, ganti foto, dan backup keamanan rutin setiap bulan.', price: 600000, category: 'addons' }
];
