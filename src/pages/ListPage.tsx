import React, { useState, useMemo } from 'react';
import rawData from '../data/data.json';
import { CarCard, Car } from '../components/CarCard';
import { PriceFilter } from '../components/PriceFilter';
import { StatChart } from '../components/StatChart';
import { Sparkles, ShieldCheck, Clock, Award, KeyRound } from 'lucide-react';

const allCars: Car[] = rawData as Car[];

export const ListPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedFuel, setSelectedFuel] = useState('all');
  const [minPrice, setMinPrice] = useState(500000);
  const [maxPrice, setMaxPrice] = useState(5000000);

  // Extract unique categories
  const categories = useMemo(() => {
    return Array.from(new Set(allCars.map((c) => c.category)));
  }, []);

  // Filter cars based on criteria
  const filteredCars = useMemo(() => {
    return allCars.filter((car) => {
      // Search term
      const matchesSearch =
        car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.location.toLowerCase().includes(searchTerm.toLowerCase());

      // Category
      const matchesCategory =
        selectedCategory === 'all' || car.category === selectedCategory;

      // Fuel
      const matchesFuel =
        selectedFuel === 'all' || car.fuel === selectedFuel;

      // Mandatory feature: Lọc theo khoảng giá/ngày
      const matchesPrice =
        car.pricePerDay >= minPrice && car.pricePerDay <= maxPrice;

      return matchesSearch && matchesCategory && matchesFuel && matchesPrice;
    });
  }, [searchTerm, selectedCategory, selectedFuel, minPrice, maxPrice]);

  const handlePriceChange = (min: number, max: number) => {
    setMinPrice(min);
    setMaxPrice(max);
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedFuel('all');
    setMinPrice(500000);
    setMaxPrice(5000000);
  };

  return (
    <div className="page-enter-active">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-900 via-emerald-800 to-slate-900 text-white p-8 sm:p-12 mb-10 shadow-xl">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-emerald-700/60 border border-emerald-500/40 text-emerald-200 text-xs font-bold px-3 py-1 rounded-full mb-4">
            <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
            <span>Thực Hành Buổi 2 • Đề tài Cho thuê xe • SV 6651071073</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight mb-4">
            Thuê Xe Tự Lái Chuẩn <span className="text-emerald-400">5 Sao</span> Nhanh Chóng & Tiện Lợi
          </h1>

          <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed max-w-2xl mb-8">
            Hơn 20+ dòng xe đời mới từ sedan lịch lãm, SUV 7 chỗ đa dụng đến xe điện VinFast hiện đại. Cam kết bảo hiểm đầy đủ, thủ tục 5 phút nhận xe ngay.
          </p>

          {/* Value props */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-emerald-700/60">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-300 shrink-0" />
              <span className="text-xs font-semibold text-emerald-100">Bảo hiểm 2 chiều</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-emerald-300 shrink-0" />
              <span className="text-xs font-semibold text-emerald-100">Giao xe tận nơi</span>
            </div>
            <div className="flex items-center gap-2">
              <KeyRound className="w-5 h-5 text-emerald-300 shrink-0" />
              <span className="text-xs font-semibold text-emerald-100">Không giữ hộ chiếu</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-emerald-300 shrink-0" />
              <span className="text-xs font-semibold text-emerald-100">Xe đời 2023 - 2024</span>
            </div>
          </div>
        </div>

        {/* Decorative circle glow */}
        <div className="absolute -right-20 -top-20 w-96 h-96 rounded-full bg-emerald-500/20 blur-3xl pointer-events-none"></div>
      </section>

      {/* Mandatory Feature: Price Range Filter & Search */}
      <PriceFilter
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        selectedFuel={selectedFuel}
        onFuelChange={setSelectedFuel}
        minPrice={minPrice}
        maxPrice={maxPrice}
        onPriceChange={handlePriceChange}
        onReset={handleResetFilters}
        totalFiltered={filteredCars.length}
        categories={categories}
      />

      {/* Car Grid: Responsive breakpoints specified by rubric:
          < 640px (mobile, 1 cột): grid-cols-1
          640–1024px (tablet, 2 cột): sm:grid-cols-2
          > 1024px (desktop, 3-4 cột): lg:grid-cols-3 xl:grid-cols-4
      */}
      <section aria-label="Danh sách các xe cho thuê">
        {filteredCars.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 shadow-xs">
            <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <KeyRound className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-1">
              Không tìm thấy dòng xe nào phù hợp
            </h3>
            <p className="text-sm text-slate-500 max-w-sm mx-auto mb-6">
              Vui lòng thử điều chỉnh lại mức giá hoặc tìm kiếm từ khóa khác.
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors cursor-pointer"
            >
              Xem lại tất cả 22 xe
            </button>
          </div>
        )}
      </section>

      {/* Mandatory Feature: Stat Chart */}
      <StatChart cars={allCars} />
    </div>
  );
};
