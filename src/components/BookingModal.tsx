import React, { useEffect, useRef, useState } from 'react';
import { X, CheckCircle2, Calendar, Phone, Mail, User, ShieldAlert } from 'lucide-react';
import { Car } from './CarCard';
import { formatCurrency, validateEmail } from '../utils';

interface BookingModalProps {
  car: Car | null;
  isOpen: boolean;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ car, isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [days, setDays] = useState(2);
  const [startDate, setStartDate] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [emailError, setEmailError] = useState('');

  // ESC key listener & Focus Trap
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      // Focus trap
      if (e.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;

        const firstEl = focusableElements[0];
        const lastEl = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        } else if (!e.shiftKey && document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Initial focus on modal container or first input
    const timer = setTimeout(() => {
      const firstInput = modalRef.current?.querySelector<HTMLInputElement>('input');
      firstInput?.focus();
    }, 50);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(timer);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !car) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setEmailError('Địa chỉ email chưa hợp lệ (Ví dụ: ten@domain.com)');
      return;
    }
    setEmailError('');
    setSubmitted(true);
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setFullName('');
    setPhone('');
    setEmail('');
    setEmailError('');
    onClose();
  };

  const totalPrice = car.pricePerDay * days;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs transition-opacity"
      onClick={handleResetAndClose}
    >
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200 transform transition-all p-6 sm:p-8"
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-100">
          <div>
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
              Xác nhận đặt thuê xe nhanh
            </span>
            <h3 id="booking-modal-title" className="text-xl font-black text-slate-900 mt-1">
              {car.name}
            </h3>
          </div>

          <button
            type="button"
            onClick={handleResetAndClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
            aria-label="Đóng cửa sổ đặt xe (Nhấn phím Esc để đóng)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="text-xl font-bold text-slate-900">Yêu cầu giữ xe thành công!</h4>
            <p className="text-sm text-slate-600 max-w-xs mx-auto">
              Cảm ơn bạn <strong className="text-slate-800">{fullName}</strong>. Chuyên viên AutoRent sẽ gọi điện thoại tới số <strong className="text-emerald-700">{phone}</strong> trong vòng 10 phút để xác nhận giao nhận xe.
            </p>
            <div className="bg-slate-50 p-4 rounded-2xl text-xs text-slate-600 text-left border border-slate-100 space-y-1">
              <p>• Dòng xe: <strong>{car.name}</strong></p>
              <p>• Thời gian thuê: <strong>{days} ngày</strong></p>
              <p>• Tổng tạm tính: <strong className="text-emerald-700">{formatCurrency(totalPrice)}</strong></p>
            </div>
            <button
              type="button"
              onClick={handleResetAndClose}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl transition-colors cursor-pointer"
            >
              Hoàn tất & Đóng
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            {/* Quick Car Summary */}
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100">
              <img
                src={car.image}
                alt={`Xe ${car.name}`}
                className="w-16 h-12 rounded-xl object-cover"
              />
              <div className="text-xs">
                <span className="font-bold text-slate-900 block truncate">{car.name}</span>
                <span className="text-emerald-700 font-extrabold">{formatCurrency(car.pricePerDay)}</span>
                <span className="text-slate-400"> /ngày</span>
              </div>
            </div>

            {/* Inputs */}
            <div>
              <label htmlFor="modal-name" className="block text-xs font-bold text-slate-700 mb-1">
                Họ và tên người thuê *
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  id="modal-name"
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Nguyễn Văn A"
                  className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="modal-phone" className="block text-xs font-bold text-slate-700 mb-1">
                  Số điện thoại *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    id="modal-phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0912 345 678"
                    className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="modal-email" className="block text-xs font-bold text-slate-700 mb-1">
                  Email xác nhận *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    id="modal-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (emailError) setEmailError('');
                    }}
                    placeholder="email@example.com"
                    className={`w-full pl-9 pr-3 py-2 text-sm border rounded-xl focus:outline-none focus:ring-2 ${
                      emailError
                        ? 'border-rose-400 focus:ring-rose-400'
                        : 'border-slate-200 focus:ring-emerald-500'
                    }`}
                  />
                </div>
                {emailError && (
                  <p className="text-[11px] text-rose-600 mt-1 flex items-center gap-1">
                    <ShieldAlert className="w-3.5 h-3.5" />
                    {emailError}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="modal-start-date" className="block text-xs font-bold text-slate-700 mb-1">
                  Ngày nhận xe *
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    id="modal-start-date"
                    type="date"
                    required
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="modal-days" className="block text-xs font-bold text-slate-700 mb-1">
                  Số ngày thuê: {days} ngày
                </label>
                <input
                  id="modal-days"
                  type="number"
                  min={1}
                  max={30}
                  value={days}
                  onChange={(e) => setDays(Math.max(1, Number(e.target.value)))}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                />
              </div>
            </div>

            {/* Price calculation */}
            <div className="bg-emerald-50/80 border border-emerald-200 rounded-2xl p-3 flex justify-between items-center text-xs">
              <span className="text-emerald-900 font-medium">Tổng tiền dự kiến ({days} ngày):</span>
              <span className="text-base font-black text-emerald-700">
                {formatCurrency(totalPrice)}
              </span>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={handleResetAndClose}
                className="w-1/3 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-semibold text-xs hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Hủy bỏ
              </button>
              <button
                type="submit"
                className="w-2/3 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
              >
                Xác nhận đặt giữ xe
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
