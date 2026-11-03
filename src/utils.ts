/**
 * Định dạng số tiền kèm ký hiệu tiền tệ
 */
export function formatCurrency(amount: number, currency = '₫'): string {
  const formatted = new Intl.NumberFormat('vi-VN').format(amount);
  const symbol = currency === 'VND' || currency === '₫' ? '₫' : currency;
  return `${formatted} ${symbol}`;
}

/**
 * Cắt ngắn văn bản nếu vượt quá độ dài tối đa
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength) + '...';
}

/**
 * Kiểm tra tính hợp lệ của địa chỉ email
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  return emailRegex.test(email);
}

/**
 * Trì hoãn thực thi hàm sau khoảng thời gian delay ms
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function debounce<T extends (...args: any[]) => void>(fn: T, delay: number): T {
  let timer: ReturnType<typeof setTimeout> | null = null;

  return function (this: unknown, ...args: Parameters<T>) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  } as T;
}
