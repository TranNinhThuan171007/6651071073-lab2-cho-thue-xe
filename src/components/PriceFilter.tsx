import React from 'react';
import { Search, RotateCcw, Filter } from 'lucide-react';
import { formatCurrency } from '../utils';

interface PriceFilterProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  selectedFuel: string;
  onFuelChange: (fuel: string) => void;
  minPrice: number;
  maxPrice: number;
  onPriceChange: (min: number, max: number) => void;
  onReset: () => void;
  totalFiltered: number;
  categories: string[];
}

export const PriceFilter: React.FC<PriceFilterProps> = ({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedFuel,
  onFuelChange,
  minPrice,
  maxPrice,
  onPriceChange,
  onReset,
  totalFiltered,
  categories,
}) => {
  const pricePresets = [
    { label: 'Tất cả mức giá', min: 500000, max: 5000000 },
    { label: '< 1.000.000₫', min: 500000, max: 1000000 },
    { label: '1 - 1.500.000₫', min: 1000000, max: 1500000 },
    { label: '1.5 - 2.500.000₫', min: 1500000, max: 2500000 },
    { label: '> 2.500.000₫', min: 2500000, max: 5000000 },
  ];

  return (
    <div className="bg-white rounded-2xl border border-emerald-100 p-5 shadow-xs mb-8">
      {/* Search and Quick Filters Header */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between pb-5 border-b border-slate-100">
        {/* Search Input */}
        <div className="relative flex-1">
          <label htmlFor="car-search" className="sr-only">
            Tìm kiếm theo tên xe hoặc hãng xe
          </label>
          <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            id="car-search"
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Tìm theo tên xe, hãng (Toyota, VinFast, Ford, Mercedes...)..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-slate-50/50"
          />
        </div>

        {/* Category Dropdown */}
        <div className="flex flex-wrap sm:flex-nowrap gap-3 items-center">
          <label htmlFor="category-select" className="sr-only">
            Chọn phân khúc xe
          </label>
          <select
            id="category-select"
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 font-medium"
          >
            <option value="all">Tất cả phân khúc</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          {/* Fuel Dropdown */}
          <label htmlFor="fuel-select" className="sr-only">
            Chọn loại nhiên liệu
          </label>
          <select
            id="fuel-select"
            value={selectedFuel}
            onChange={(e) => onFuelChange(e.target.value)}
            className="px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 font-medium"
          >
            <option value="all">Mọi loại nhiên liệu</option>
            <option value="Xăng">Máy Xăng</option>
            <option value="Dầu (Diesel)">Máy Dầu (Diesel)</option>
            <option value="Điện">Xe Thuần Điện</option>
            <option value="Hybrid">Động cơ Hybrid</option>
          </select>

          {/* Reset button */}
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:text-rose-600 hover:border-rose-200 hover:bg-rose-50 text-xs font-semibold transition-colors cursor-pointer"
            title="Khôi phục bộ lọc mặc định"
            aria-label="Khôi phục toàn bộ bộ lọc về mặc định"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Đặt lại</span>
          </button>
        </div>
      </div>

      {/* Mandatory Feature: Lọc theo khoảng giá / ngày */}
      <div className="pt-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-3">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-emerald-600" />
            <span className="text-sm font-bold text-slate-800">
              Lọc theo khoảng giá thuê / ngày (Tính năng bắt buộc):
            </span>
            <span className="text-sm font-extrabold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-md">
              {formatCurrency(minPrice)} — {formatCurrency(maxPrice)}/ngày
            </span>
          </div>

          {/* Quick presets buttons */}
          <div className="flex flex-wrap gap-1.5">
            {pricePresets.map((preset) => {
              const isActive = minPrice === preset.min && maxPrice === preset.max;
              return (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => onPriceChange(preset.min, preset.max)}
                  className={`text-xs px-2.5 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {preset.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dual range sliders */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div>
            <div className="flex justify-between text-xs text-slate-500 mb-1">
              <label htmlFor="min-price-slider">Mức giá tối thiểu:</label>
              <span className="font-semibold text-emerald-700">{formatCurrency(minPrice)}</span>
            </div>
            <input
              id="min-price-slider"
              type="range"
              min={500000}
              max={5000000}
              step={100000}
              value={minPrice}
              onChange={(e) => {
                const val = Number(e.target.value);
                if (val <= maxPrice) {
                  onPriceChange(val, maxPrice);
                }
              }}
              className="w-full accent-emerald-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
              aria-label="Điều chỉnh mức giá thuê tối thiểu"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs text-slate-500 mb-1">
              <label htmlFor="max-price-slider">Mức giá tối đa:</label>
              <span className="font-semibold text-emerald-700">{formatCurrency(maxPrice)}</span>
            </div>
            <input
              id="max-price-slider"
              type="range"
              min={500000}
              max={5000000}
              step={100000}
              value={maxPrice}
              onChange={(e) => {
                const val = Number(e.target.value);
                if (val >= minPrice) {
                  onPriceChange(minPrice, val);
                }
              }}
              className="w-full accent-emerald-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
              aria-label="Điều chỉnh mức giá thuê tối đa"
            />
          </div>
        </div>
      </div>

      {/* Result counter indicator */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
        <span className="text-slate-500">
          Hiển thị kết quả lọc: <strong className="text-emerald-700">{totalFiltered}</strong> chiếc xe phù hợp
        </span>
        {totalFiltered === 0 && (
          <span className="text-rose-600 font-semibold">
            Không tìm thấy xe phù hợp khoảng giá này. Hãy thử nới rộng bộ lọc!
          </span>
        )}
      </div>
    </div>
  );
};
