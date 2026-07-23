import { Product, Voucher, ShippingCourier, PaymentMethodOption } from '../types';

export const SAMPLE_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Headphone Wireless Noise Cancelling Premium Bluetooth 5.3',
    category: 'Elektronik & Gadget',
    price: 899000,
    originalPrice: 1299000,
    discountPercentage: 31,
    rating: 4.9,
    reviewCount: 342,
    salesCount: 1200,
    stock: 25,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Headphone nirkabel kelas atas dengan Active Noise Cancellation (ANC) tingkat lanjut. Menghasilkan suara bass mendalam, vokal jernih, dan ketahanan baterai hingga 40 jam nonstop. Cocok untuk kerja, travel, dan mendengarkan musik favorit Anda.',
    features: [
      'Active Noise Cancellation hingga 35dB',
      'Koneksi Bluetooth 5.3 ultra-stabil tanpa delay',
      'Daya tahan baterai hingga 40 jam playback',
      'Busa ear-pad Memory Foam empuk dan ergonomis',
      'Mikrofon ganda berteknologi AI Noise reduction untuk panggilan jernih'
    ],
    variants: [
      { type: 'color', options: ['Hitam Onyx', 'Putih Perak', 'Biru Navy'] }
    ],
    brand: 'AcousticTech',
    weightGrams: 350,
    isFlashSale: true,
    isBestSeller: true,
    freeShipping: true,
  },
  {
    id: 'prod-2',
    name: 'Smartwatch Sport OLED Waterproof IP68 Heart Rate & SpO2',
    category: 'Elektronik & Gadget',
    price: 499000,
    originalPrice: 799000,
    discountPercentage: 38,
    rating: 4.8,
    reviewCount: 215,
    salesCount: 890,
    stock: 18,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Jam tangan pintar modern dengan layar HD AMOLED 1.43 inci, pemantau detak jantung 24/7, kadar oksigen darah (SpO2), pelacak kualitas tidur, serta lebih dari 100 mode olahraga profesional.',
    features: [
      'Layar Retina AMOLED Always-On Display',
      'Sertifikasi Tahan Air IP68 hingga 50 meter',
      'Notifikasi WA, Telepon, dan Aplikasi Realtime',
      'Daya Tahan Baterai 14 Hari Sekali Charge'
    ],
    variants: [
      { type: 'color', options: ['Black Edition', 'Rose Gold', 'Silver Mesh'] }
    ],
    brand: 'ChronoFit',
    weightGrams: 180,
    isFlashSale: true,
    isBestSeller: true,
    freeShipping: true,
  },
  {
    id: 'prod-3',
    name: 'Sneakers Casual Men Leather Premium Lightweight Anti-Slip',
    category: 'Sepatu & Olahraga',
    price: 349000,
    originalPrice: 550000,
    discountPercentage: 36,
    rating: 4.7,
    reviewCount: 184,
    salesCount: 640,
    stock: 42,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Sepatu sneakers gaya kasual yang elegan dan nyaman dipakai seharian. Menggunakan bahan sintetis microfiber breathable dan outsole karet TPR anti-licin yang empuk.',
    features: [
      'Desain modern sporty & versatile',
      'Insole memory foam empuk berpori udara',
      'Sole TPR anti-slip presisi tinggi',
      'Mudah dibersihkan dan awet'
    ],
    variants: [
      { type: 'color', options: ['Merah Sport', 'Hitam Catur', 'Putih Minimalis'] },
      { type: 'size', options: ['39', '40', '41', '42', '43'] }
    ],
    brand: 'KicksLocal',
    weightGrams: 750,
    isBestSeller: true,
    freeShipping: false,
  },
  {
    id: 'prod-4',
    name: 'Kemeja Linen Unisex Oversized Casual Premium Cut',
    category: 'Fashion Pria & Wanita',
    price: 189000,
    originalPrice: 280000,
    discountPercentage: 32,
    rating: 4.8,
    reviewCount: 412,
    salesCount: 1530,
    stock: 60,
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Kemeja berbahan katun linen alami yang sejuk, ringan, dan sangat nyaman dipakai di iklim tropis. Potongan oversized trendi cocok untuk pria maupun wanita.',
    features: [
      '100% Premium Cotton Linen Breathable',
      'Jahitan rapi standar konveksi ekspor',
      'Kancing kayu estetik natural',
      'Tidak gatal dan lembut di kulit'
    ],
    variants: [
      { type: 'color', options: ['Sage Green', 'Beige Sand', 'Clean White', 'Terracotta'] },
      { type: 'size', options: ['M', 'L', 'XL'] }
    ],
    brand: 'NusaWear',
    weightGrams: 250,
    isFlashSale: false,
    isBestSeller: true,
    freeShipping: true,
  },
  {
    id: 'prod-5',
    name: 'Kopi Arabika Gayo Single Origin Gourmet Beans 250g',
    category: 'Makanan & Minuman',
    price: 75000,
    originalPrice: 95000,
    discountPercentage: 21,
    rating: 4.9,
    reviewCount: 520,
    salesCount: 2400,
    stock: 120,
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=800&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Biji kopi specialty Arabika asli dari dataran tinggi Takengon Gayo, Aceh. Diproses secara Full Wash dengan roasting profile Medium to Dark. Memiliki catatan rasa fruity manis, hint cokelat hitam, dan acidity seimbang.',
    features: [
      'Single Origin Takengon, Aceh (1500 mdpl)',
      'Freshly Roasted Setiap Minggu',
      'Profil Rasa: Chocolate, Caramel, Nutty, Mild Citrus',
      'Kemasan Foil Zipper dengan One-Way Degassing Valve'
    ],
    variants: [
      { type: 'variant', options: ['Biji Utuh (Beans)', 'Giling Kasar (Cold Brew/Press)', 'Giling Halus (Tubruk/Espresso)'] }
    ],
    brand: 'Gayo Roastery',
    weightGrams: 280,
    isFlashSale: false,
    isBestSeller: true,
    freeShipping: false,
  },
  {
    id: 'prod-6',
    name: 'Air Fryer Digital Low Watt 4.5 Litre Touchscreen Smart',
    category: 'Peralatan Rumah',
    price: 649000,
    originalPrice: 1100000,
    discountPercentage: 41,
    rating: 4.9,
    reviewCount: 289,
    salesCount: 710,
    stock: 15,
    image: 'https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=800&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Alat penggoreng tanpa minyak canggih hemat listrik hanya 650 Watt. Kapasitas ekstra besar 4.5 Liter untuk memasak sekeluarga. Makanan renyah garing di luar dan lembut di dalam dengan minyak hingga 85% lebih sedikit.',
    features: [
      'Sistem Sirkulasi Udara Panas Rapid 360 Degree',
      'Kapasitas 4.5 Liter muat 1 ekor ayam utuh',
      'Panel Layar Sentuh LED 8 Preset Memasak Automatis',
      'Wadah Non-stick Coating BPA-Free aman cuci piring'
    ],
    variants: [
      { type: 'color', options: ['Matte Black', 'Creamy White'] }
    ],
    brand: 'HomeChef Pro',
    weightGrams: 3500,
    isFlashSale: true,
    isBestSeller: true,
    freeShipping: true,
  },
  {
    id: 'prod-7',
    name: 'Serum Brightening Glow Niacinamide 10% + Vitamin C 30ml',
    category: 'Kecantikan & Kesehatan',
    price: 119000,
    originalPrice: 169000,
    discountPercentage: 29,
    rating: 4.8,
    reviewCount: 680,
    salesCount: 3100,
    stock: 85,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1608248597262-838d8234857d?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Serum wajah mencerahkan noda hitam, menyamarkan bekas jerawat, serta meratakan warna kulit. Mengandung formula Niacinamide murni 10% dikombinasikan dengan Vitamin C stabil & Hyaluronic Acid.',
    features: [
      'Mencerahkan kulit kusam & menyamarkan hyperpigmentasi',
      'Dermatologically Tested & BPOM Certified',
      'Formula non-comedogenic ringan menyerap cepat',
      'Aman untuk semua jenis kulit termasuk kulit sensitif'
    ],
    brand: 'SkinGlow Organics',
    weightGrams: 100,
    isFlashSale: false,
    isBestSeller: true,
    freeShipping: false,
  },
  {
    id: 'prod-8',
    name: 'Tas Ransel Laptop Anti Air Waterproof Backpack 15.6 Inch',
    category: 'Produk Lokal UKM',
    price: 229000,
    originalPrice: 350000,
    discountPercentage: 34,
    rating: 4.7,
    reviewCount: 198,
    salesCount: 820,
    stock: 35,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Tas ransel buatan pengerajin lokal Bandung berstandar internasional. Menggunakan bahan Bimo Waterproof tebal, resleting waterproof, kompartemen laptop terlindungi busa tebal, dan slot charging USB external.',
    features: [
      'Bahan Bimo Cordura Waterproof Anti-Air',
      'Kompartemen Laptop terpisah berlapis Busa Busa Tebal',
      'Port USB Charging External + Port Audio',
      'Tali Bahu Ergonomis Sistem Airflow Busa Busa Mesh'
    ],
    variants: [
      { type: 'color', options: ['Hitam Carbon', 'Navy Blue', 'Army Green'] }
    ],
    brand: 'Nusantara Craft',
    weightGrams: 650,
    isFlashSale: false,
    isBestSeller: false,
    freeShipping: true,
  }
];

export const VOUCHERS: Voucher[] = [
  {
    code: 'HEMAT20',
    title: 'Diskon 20% Khusus Hari Ini',
    discountType: 'percentage',
    discountValue: 20,
    minSpend: 100000,
    maxDiscount: 100000,
  },
  {
    code: 'ONGKIRGRATIS',
    title: 'Potongan Ongkir Rp 20.000',
    discountType: 'fixed',
    discountValue: 20000,
    minSpend: 50000,
  },
  {
    code: 'PELANGGANBARU',
    title: 'Cashback Rp 50.000 Pengguna Baru',
    discountType: 'fixed',
    discountValue: 50000,
    minSpend: 200000,
  }
];

export const SHIPPING_COURIERS: ShippingCourier[] = [
  {
    id: 'jne-reg',
    name: 'JNE Express',
    serviceName: 'Regular (REG)',
    estimatedDays: '2 - 3 Hari',
    price: 18000,
    logo: '📦'
  },
  {
    id: 'jne-yes',
    name: 'JNE Express',
    serviceName: 'Yakin Esok Sampai (YES)',
    estimatedDays: '1 Hari (Besok)',
    price: 32000,
    logo: '⚡'
  },
  {
    id: 'sicepat-gokil',
    name: 'SiCepat Ekspres',
    serviceName: 'Cargo Gokil',
    estimatedDays: '2 - 4 Hari',
    price: 15000,
    logo: '🚚'
  },
  {
    id: 'gosend-instant',
    name: 'GoSend / GrabExpress',
    serviceName: 'Instant Delivery (Max 3 Jam)',
    estimatedDays: 'Hari Ini (3 Jam)',
    price: 35000,
    logo: '🛵'
  }
];

export const PAYMENT_METHODS: PaymentMethodOption[] = [
  {
    id: 'qris-all',
    name: 'QRIS (Gopay, OVO, DANA, ShopeePay, BCA Mobile)',
    category: 'qris',
    icon: '📱',
    description: 'Pindai kode QRIS langsung melalui semua aplikasi pembayaran & m-banking.'
  },
  {
    id: 'va-bca',
    name: 'BCA Virtual Account',
    category: 'va',
    icon: '🏦',
    accountNumber: '880128391029381',
    description: 'Proses verifikasi otomatis 24 jam tanpa perlu unggah bukti transfer.'
  },
  {
    id: 'va-mandiri',
    name: 'Mandiri Virtual Account',
    category: 'va',
    icon: '🏛️',
    accountNumber: '892019283019283',
    description: 'Bayar lewat Livin by Mandiri, ATM, atau Internet Banking.'
  },
  {
    id: 'va-bri',
    name: 'BRI Virtual Account (BRIVA)',
    category: 'va',
    icon: '🏬',
    accountNumber: '102938192830192',
    description: 'Bayar via BRImo atau Agen BRILink terdekat.'
  },
  {
    id: 'ewallet-gopay',
    name: 'GoPay',
    category: 'ewallet',
    icon: '🟢',
    description: 'Konfirmasi pembayaran instan di aplikasi Gojek.'
  },
  {
    id: 'ewallet-dana',
    name: 'DANA',
    category: 'ewallet',
    icon: '🔵',
    description: 'Bayar cepat dengan saldo DANA Anda.'
  },
  {
    id: 'card-visa',
    name: 'Kartu Kredit / Debit (Visa & Mastercard)',
    category: 'card',
    icon: '💳',
    description: 'Enkripsi SSL 256-Bit dengan 3D Secure Verification.'
  },
  {
    id: 'cod-pay',
    name: 'Bayar di Tempat (COD)',
    category: 'cod',
    icon: '💵',
    description: 'Bayar langsung dengan uang tunai saat kurir tiba membawa paket Anda.'
  }
];
