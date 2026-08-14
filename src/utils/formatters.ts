export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function generateOrderNumber(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let rand = '';
  for (let i = 0; i < 5; i++) {
    rand += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `KNC-${rand}`;
}

export function generateMockVANumber(bank: string): string {
  const bankPrefixes: Record<string, string> = {
    bca_va: '80777',
    mandiri_va: '88708',
    bni_va: '82770',
    bri_va: '12800',
  };
  const prefix = bankPrefixes[bank] || '89900';
  const randomDigits = Math.floor(1000000000 + Math.random() * 9000000000).toString();
  return `${prefix}${randomDigits}`;
}

export function getPaymentMethodDetails(method: string) {
  switch (method) {
    case 'qris':
      return {
        name: 'QRIS (Semua E-Wallet & M-Banking)',
        badge: 'Instan Otomatis',
        type: 'qris',
        desc: 'Scan via BCA Mobile, GoPay, OVO, Dana, Livin by Mandiri, ShopeePay',
        icon: 'QrCode'
      };
    case 'bca_va':
      return {
        name: 'BCA Virtual Account',
        badge: 'Verifikasi Otomatis',
        type: 'va',
        desc: 'Transfer m-BCA, KlikBCA, atau ATM BCA',
        icon: 'CreditCard'
      };
    case 'mandiri_va':
      return {
        name: 'Mandiri Virtual Account',
        badge: 'Verifikasi Otomatis',
        type: 'va',
        desc: 'Transfer Livin by Mandiri atau ATM Mandiri',
        icon: 'CreditCard'
      };
    case 'bni_va':
      return {
        name: 'BNI Virtual Account',
        badge: 'Verifikasi Otomatis',
        type: 'va',
        desc: 'Transfer BNI Mobile Banking atau ATM BNI',
        icon: 'CreditCard'
      };
    case 'bri_va':
      return {
        name: 'BRI Virtual Account (BRIVA)',
        badge: 'Verifikasi Otomatis',
        type: 'va',
        desc: 'Transfer BRImo atau ATM BRI',
        icon: 'CreditCard'
      };
    case 'gopay':
      return {
        name: 'GoPay / GoPay Later',
        badge: 'E-Wallet',
        type: 'ewallet',
        desc: 'Buka aplikasi Gojek untuk konfirmasi',
        icon: 'Smartphone'
      };
    case 'shopeepay':
      return {
        name: 'ShopeePay / SPayLater',
        badge: 'E-Wallet',
        type: 'ewallet',
        desc: 'Buka aplikasi Shopee untuk konfirmasi',
        icon: 'Smartphone'
      };
    case 'ovo':
      return {
        name: 'OVO SmartPay',
        badge: 'E-Wallet',
        type: 'ewallet',
        desc: 'Notifikasi pembayaran akan dikirim ke aplikasi OVO',
        icon: 'Smartphone'
      };
    case 'dana':
      return {
        name: 'DANA Dompet Digital',
        badge: 'E-Wallet',
        type: 'ewallet',
        desc: 'Konfirmasi langsung dari saldo DANA Anda',
        icon: 'Smartphone'
      };
    case 'credit_card':
      return {
        name: 'Kartu Kredit / Debit Online',
        badge: 'Visa / Mastercard / JCB',
        type: 'card',
        desc: 'Dukungan 3D-Secure 128-bit Enkripsi',
        icon: 'CreditCard'
      };
    case 'cash_on_pickup':
      return {
        name: 'Bayar di Kasir Toko (Cash / EDC)',
        badge: 'Khusus Ambil di Outlet',
        type: 'cash',
        desc: 'Bayar tunai atau debit saat mengambil pesanan di outlet',
        icon: 'Store'
      };
    default:
      return {
        name: 'Pembayaran Transfer',
        badge: 'Otomatis',
        type: 'transfer',
        desc: 'Pembayaran aman Kencana Gateway',
        icon: 'CreditCard'
      };
  }
}
