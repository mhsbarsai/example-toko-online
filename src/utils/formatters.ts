export const formatRupiah = (amount: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(amount);
};

export const generateOrderId = (): string => {
  const timestamp = Date.now().toString().slice(-6);
  const randomStr = Math.floor(1000 + Math.random() * 9000).toString();
  return `INV/TK/${timestamp}/${randomStr}`;
};

export const generateTrackingNumber = (courierName: string): string => {
  const prefix = courierName.toLowerCase().includes('jne') ? 'JNE' : 
                 courierName.toLowerCase().includes('sicepat') ? 'SCP' : 'GSD';
  const num = Math.floor(1000000000 + Math.random() * 9000000000);
  return `${prefix}${num}`;
};

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};
