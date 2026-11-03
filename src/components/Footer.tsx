import React from 'react';
import { Shield, Sparkles, MapPin, Mail, Phone } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-20 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold">
                A
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                Auto<span className="text-emerald-400">Rent</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Dịch vụ cho thuê xe ô tô tự lái và có tài xế cao cấp. Hệ thống xe đời mới, giao xe tận nơi nhanh chóng trong vòng 30 phút.
            </p>
            <div className="text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 rounded-lg p-2.5">
              <p className="font-semibold">Báo cáo bài tập Thực hành Buổi 2</p>
              <p>Trần Ninh Thuận • Chủ đề: Cho thuê xe</p>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Dòng xe phổ biến
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li className="hover:text-emerald-400 transition-colors cursor-pointer">SUV 7 chỗ gia đình</li>
              <li className="hover:text-emerald-400 transition-colors cursor-pointer">Sedan công tác cao cấp</li>
              <li className="hover:text-emerald-400 transition-colors cursor-pointer">Xe ô tô điện VinFast</li>
              <li className="hover:text-emerald-400 transition-colors cursor-pointer">MPV thương gia Carnival</li>
              <li className="hover:text-emerald-400 transition-colors cursor-pointer">Bán tải thể thao Ford Raptor</li>
            </ul>
          </div>

          {/* Guarantees */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Cam kết dịch vụ
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Bảo hiểm vật chất 2 chiều</span>
              </li>
              <li className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Khử khuẩn, rửa xe sạch bóng</span>
              </li>
              <li className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Thủ tục nhận xe chỉ mất 5 phút</span>
              </li>
              <li className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Hỗ trợ cứu hộ 24/7 toàn quốc</span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Thông tin liên hệ
            </h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 mt-1 shrink-0" />
                {/* Đã sửa thẻ đóng </span> */}
                <span>Văn phòng đại diện: TP. Hồ Chí Minh</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Hotline: 1900 6651 (24/7)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                {/* Đã cập nhật email của bạn và gắn link mailto: click vào gửi mail ngay */}
                <span>
                  Email:{' '}
                  <a
                    href="mailto:vipthuantran@gmail.com"
                    className="hover:text-emerald-400 transition-colors underline underline-offset-2"
                  >
                    vipthuantran@gmail.com
                  </a>
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-6 text-center text-xs text-slate-500 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p>© 2026 AutoRent 6651071073. Thiết kế chuẩn Responsive & Accessibility AA.</p>
          <p className="text-emerald-400">Công nghệ: React 18, TypeScript (Strict), Tailwind CSS, React Router v6, Vitest</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;