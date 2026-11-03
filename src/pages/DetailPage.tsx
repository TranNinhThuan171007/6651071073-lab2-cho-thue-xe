import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import rawData from '../data/data.json';
import { Car } from '../components/CarCard';
import { BookingModal } from '../components/BookingModal';
import { formatCurrency } from '../utils';
import {
  ArrowLeft,
  Star,
  MapPin,
  Users,
  Fuel,
  Gauge,
  Calendar,
  CheckCircle2,
  ShieldCheck,
  Zap,
  PhoneCall,
  ChevronRight,
  Car as CarIcon,
} from 'lucide-react';

const allCars: Car[] = rawData as Car[];

export const DetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const car = allCars.find((c) => c.id === id);

  if (!car) {
    return (
      <div className="py-20 text-center page-enter-active">
        <div className="max-w-md mx-auto bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <CarIcon className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Không tìm thấy thông tin xe</h2>
          <p className="text-sm text-slate-500 mb-6">
            Mã định danh xe không tồn tại hoặc đã bị tạm ngưng cung cấp dịch vụ.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Quay lại danh sách xe</span>
          </Link>
        </div>
      </div>
    );
  }

  // Related cars in the same category
  const relatedCars = allCars
    .filter((c) => c.id !== car.id && c.category === car.category)
    .slice(0, 3);

  return (
    <div className="page-enter-active space-y-8">
      {/* Breadcrumb Navigation (Điều hướng bằng Link chuẩn react-router-dom) */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-500">
        <Link to="/" className="hover:text-emerald-700 transition-colors font-medium">
          Trang chủ
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <Link to="/" className="hover:text-emerald-700 transition-colors font-medium">
          {car.category}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-800 font-bold truncate max-w-xs">{car.name}</span>
      </nav>

      {/* Back Button */}
      <div>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-emerald-700 bg-white border border-slate-200 px-3.5 py-2 rounded-xl transition-colors shadow-2xs hover:border-emerald-300"
          aria-label="Quay lại danh sách toàn bộ xe cho thuê"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Quay lại danh sách</span>
        </Link>
      </div>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Image and Key Highlights */}
        <div className="lg:col-span-7 space-y-6">
          <div className="relative w-full h-72 sm:h-96 rounded-3xl overflow-hidden shadow-md bg-slate-900 border border-slate-200">
            <img
              src={car.image}
              alt={`Hình ảnh thực tế xe ${car.name} phiên bản năm ${car.specifications.year}`}
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1000&q=80';
              }}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute top-4 left-4 flex gap-2">
              <span className="bg-slate-900/80 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full">
                {car.category}
              </span>
              <span className="bg-emerald-600/90 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full">
                {car.brand}
              </span>
            </div>

            <div className="absolute bottom-4 right-4 bg-slate-950/80 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-xl border border-white/20">
              Đã hoàn thành {car.tripsCount} chuyến thuê an toàn
            </div>
          </div>

          {/* Detailed Description */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
            <h2 className="text-lg font-black text-slate-900 tracking-tight">
              Giới Thiệu Tổng Quan Về Dòng Xe
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              {car.description}
            </p>

            <h3 className="text-sm font-bold text-slate-900 pt-2">
              Trang Bị & Tiện Nghi Nổi Bật:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {car.features.map((feature) => (
                <div
                  key={feature}
                  className="flex items-center gap-2 text-xs font-medium text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Specifications */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
            <h2 className="text-lg font-black text-slate-900 tracking-tight mb-4">
              Thông Số Kỹ Thuật Chi Tiết
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-emerald-50/60 border border-emerald-100 rounded-2xl p-3 text-center">
                <span className="text-[11px] text-slate-500 block mb-1">Năm sản xuất</span>
                <span className="text-sm font-black text-emerald-900">{car.specifications.year}</span>
              </div>
              <div className="bg-emerald-50/60 border border-emerald-100 rounded-2xl p-3 text-center">
                <span className="text-[11px] text-slate-500 block mb-1">Động cơ</span>
                <span className="text-sm font-black text-emerald-900 truncate block">
                  {car.specifications.engine}
                </span>
              </div>
              <div className="bg-emerald-50/60 border border-emerald-100 rounded-2xl p-3 text-center">
                <span className="text-[11px] text-slate-500 block mb-1">Công suất</span>
                <span className="text-sm font-black text-emerald-900">{car.specifications.horsepower}</span>
              </div>
              <div className="bg-emerald-50/60 border border-emerald-100 rounded-2xl p-3 text-center">
                <span className="text-[11px] text-slate-500 block mb-1">Mức tiêu hao</span>
                <span className="text-sm font-black text-emerald-900">{car.specifications.consumption}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Pricing & Booking Action */}
        <div className="lg:col-span-5 space-y-6">
          <div className="sticky top-24 bg-white rounded-3xl p-6 sm:p-8 border border-emerald-200 shadow-md space-y-6">
            {/* Header info */}
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-emerald-700 font-bold uppercase tracking-wider">
                  Mã xe: #{car.id.toUpperCase()}
                </span>
                <div className="flex items-center gap-1 text-amber-600 font-bold">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
                  <span>{car.rating.toFixed(1)}</span>
                  <span className="text-slate-400 font-normal">({car.reviewsCount} đánh giá)</span>
                </div>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                {car.name}
              </h1>

              <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-2">
                <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Khu vực giao xe: <strong>{car.location}</strong></span>
              </div>
            </div>

            {/* Price Box */}
            <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-100 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-500 block font-medium">Đơn giá thuê niêm yết</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl sm:text-3xl font-black text-emerald-800">
                    {formatCurrency(car.pricePerDay)}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">/ngày</span>
                </div>
              </div>

              <span
                className={`text-xs font-bold px-3 py-1.5 rounded-full ${
                  car.isAvailable
                    ? 'bg-emerald-600 text-white'
                    : 'bg-rose-500 text-white'
                }`}
              >
                {car.isAvailable ? 'Sẵn sàng giao' : 'Đang cho thuê'}
              </span>
            </div>

            {/* Quick specs icons */}
            <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-100 text-xs text-slate-600">
              <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-slate-50">
                <Users className="w-5 h-5 text-emerald-600 mb-1" />
                <span className="font-bold text-slate-800">{car.seats} chỗ ngồi</span>
              </div>
              <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-slate-50">
                <Gauge className="w-5 h-5 text-emerald-600 mb-1" />
                <span className="font-bold text-slate-800">{car.transmission}</span>
              </div>
              <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-slate-50">
                <Fuel className="w-5 h-5 text-emerald-600 mb-1" />
                <span className="font-bold text-slate-800">{car.fuel}</span>
              </div>
            </div>

            {/* Commitments list */}
            <div className="space-y-2 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Bảo hiểm vật chất 2 chiều bao gồm trong giá thuê</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Giao xe tận nhà/sân bay chỉ trong vòng 30 phút</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Hỗ trợ hủy chuyến miễn phí trước 24 giờ nhận xe</span>
              </div>
            </div>

            {/* Primary Action Button */}
            <div className="space-y-3 pt-2">
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-6 rounded-2xl shadow-lg shadow-emerald-600/30 hover:shadow-emerald-600/50 transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
              >
                <span>Đặt Thuê Xe Ngay Bây Giờ</span>
              </button>

              <a
                href="tel:19006651"
                className="w-full bg-white hover:bg-slate-50 text-slate-700 font-bold py-3 px-6 rounded-2xl border border-slate-200 transition-colors flex items-center justify-center gap-2 text-xs"
              >
                <PhoneCall className="w-4 h-4 text-emerald-600" />
                <span>Tư vấn qua Hotline: 1900 6651 (Miễn phí)</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Related Cars Section */}
      {relatedCars.length > 0 && (
        <section aria-label="Các dòng xe cùng phân khúc" className="pt-10 border-t border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-900">
              Dòng Xe Cùng Phân Khúc {car.category}
            </h2>
            <Link
              to="/"
              className="text-xs font-bold text-emerald-700 hover:text-emerald-800"
            >
              Xem tất cả xe
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedCars.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:border-emerald-300 transition-colors flex flex-col justify-between"
              >
                <div className="aspect-16/10 relative overflow-hidden bg-slate-100">
                  <img
                    src={item.image}
                    alt={`Xe gợi ý ${item.name}`}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-2.5 left-2.5 bg-slate-900/80 text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                    {item.category}
                  </span>
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm truncate">{item.name}</h3>
                    <p className="text-xs text-emerald-700 font-extrabold mt-1">
                      {formatCurrency(item.pricePerDay)}/ngày
                    </p>
                  </div>
                  <Link
                    to={`/item/${item.id}`}
                    className="mt-3 block text-center text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 py-2 rounded-xl transition-colors"
                  >
                    Xem chi tiết xe
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Booking Modal with Focus Trap & ESC key listener */}
      <BookingModal
        car={car}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};
