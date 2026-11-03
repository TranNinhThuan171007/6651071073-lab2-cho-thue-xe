import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Car as CarIcon, BarChart3, Phone, ShieldCheck, Menu, X } from 'lucide-react';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const scrollToStats = () => {
    setMobileMenuOpen(false);
    if (location.pathname !== '/') {
      return;
    }
    const element = document.getElementById('statistics-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-sm">
      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded-lg p-1 group"
            aria-label="Về trang chủ AutoRent 6651071073"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-emerald-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform duration-200">
              <CarIcon className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-emerald-600 transition-colors">
                Auto<span className="text-emerald-600">Rent</span>
              </span>
              <span className="block text-[11px] font-semibold text-emerald-700 tracking-wider uppercase">
                6651071073 • Premium
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6" aria-label="Điều hướng chính">
            <Link
              to="/"
              className={`text-sm font-semibold transition-colors py-1 border-b-2 ${
                location.pathname === '/'
                  ? 'text-emerald-600 border-emerald-600'
                  : 'text-slate-600 hover:text-emerald-600 border-transparent'
              }`}
            >
              Danh sách xe
            </Link>

            {location.pathname === '/' ? (
              <button
                type="button"
                onClick={scrollToStats}
                className="text-sm font-semibold text-slate-600 hover:text-emerald-600 transition-colors flex items-center gap-1.5 cursor-pointer py-1 border-b-2 border-transparent"
              >
                <BarChart3 className="w-4 h-4 text-emerald-600" />
                Biểu đồ thống kê
              </button>
            ) : (
              <Link
                to="/#statistics-section"
                className="text-sm font-semibold text-slate-600 hover:text-emerald-600 transition-colors flex items-center gap-1.5 py-1 border-b-2 border-transparent"
              >
                <BarChart3 className="w-4 h-4 text-emerald-600" />
                Biểu đồ thống kê
              </Link>
            )}

            <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Bảo hiểm 100% chuyến đi</span>
            </div>
          </nav>

          {/* Hotline / Action */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="tel:19006651"
              className="flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:text-emerald-800 bg-white border border-emerald-200 px-3.5 py-2 rounded-xl shadow-xs transition-colors"
              aria-label="Gọi hotline hỗ trợ 1900 6651"
            >
              <Phone className="w-4 h-4 text-emerald-600" />
              <span>1900 6651</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              aria-label={mobileMenuOpen ? "Đóng menu điều hướng" : "Mở menu điều hướng"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-emerald-100 bg-white px-4 pt-3 pb-4 space-y-2 shadow-lg">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-slate-800 hover:bg-emerald-50 hover:text-emerald-600"
          >
            Danh sách xe cho thuê
          </Link>
          <button
            type="button"
            onClick={scrollToStats}
            className="w-full text-left px-3 py-2 rounded-lg text-base font-medium text-slate-800 hover:bg-emerald-50 hover:text-emerald-600 flex items-center gap-2"
          >
            <BarChart3 className="w-5 h-5 text-emerald-600" />
            Biểu đồ thống kê phân tích
          </button>
          <div className="pt-2 border-t border-slate-100 text-xs text-slate-500">
            Hỗ trợ tư vấn thuê xe: <strong>1900 6651</strong> (Miễn phí)
          </div>
        </div>
      )}
    </header>
  );
};
