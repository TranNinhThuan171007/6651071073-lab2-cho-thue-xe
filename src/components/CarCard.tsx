import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Fuel, Gauge, Star, MapPin, ArrowRight } from 'lucide-react';
import { formatCurrency, truncateText } from '../utils';

export interface Car {
  id: string;
  name: string;
  brand: string;
  category: string;
  pricePerDay: number;
  seats: number;
  transmission: string;
  fuel: string;
  rating: number;
  reviewsCount: number;
  tripsCount: number;
  location: string;
  image: string;
  description: string;
  features: string[];
  specifications: {
    engine: string;
    horsepower: string;
    consumption: string;
    year: number;
  };
  isAvailable: boolean;
}

interface CarCardProps {
  car: Car;
}

export const CarCard: React.FC<CarCardProps> = ({ car }) => {
  return (
    <article className="group bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-emerald-300 transition-all duration-300 flex flex-col h-full">
      {/* Car Image with Badge - Fixed Height h-52 to guarantee all cards are 100% equal in height */}
      <div className="relative w-full h-52 overflow-hidden bg-slate-100 shrink-0">
        <img
          src={car.image}
          alt={`Ảnh chụp ngoại thất xe ô tô ${car.name} đời ${car.specifications.year}`}
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1000&q=80';
          }}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />

        {/* Category Badge */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <span className="bg-slate-900/80 backdrop-blur-md text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow-xs">
            {car.category}
          </span>
          {car.fuel === 'Điện' && (
            <span className="bg-emerald-600/90 backdrop-blur-md text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow-xs">
              Xe Xanh
            </span>
          )}
        </div>

        {/* Status Badge */}
        <div className="absolute top-3 right-3">
          <span
            className={`text-xs font-bold px-2.5 py-1 rounded-full shadow-xs backdrop-blur-md ${
              car.isAvailable
                ? 'bg-emerald-100/95 text-emerald-800 border border-emerald-300'
                : 'bg-rose-100/95 text-rose-800 border border-rose-300'
            }`}
          >
            {car.isAvailable ? 'Sẵn sàng giao' : 'Đang có khách'}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Rating & Location */}
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <div className="flex items-center gap-1 text-amber-600 font-semibold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
              <span>{car.rating.toFixed(1)}</span>
              <span className="text-slate-400 font-normal">({car.reviewsCount})</span>
            </div>
            <div className="flex items-center gap-1 text-slate-500 truncate max-w-[55%]">
              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="truncate">{car.location}</span>
            </div>
          </div>

          {/* Car Name */}
          <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-1 mb-2">
            {car.name}
          </h3>

          {/* Description truncated with utils */}
          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
            {truncateText(car.description, 85)}
          </p>

          {/* Quick Specifications Grid */}
          <div className="grid grid-cols-3 gap-2 py-3 px-2 bg-slate-50 rounded-xl text-xs text-slate-600 mb-4 border border-slate-100">
            <div className="flex items-center gap-1.5 justify-center">
              <Users className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{car.seats} chỗ</span>
            </div>
            <div className="flex items-center gap-1.5 justify-center border-x border-slate-200">
              <Gauge className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="truncate">{car.transmission}</span>
            </div>
            <div className="flex items-center gap-1.5 justify-center">
              <Fuel className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="truncate">{car.fuel}</span>
            </div>
          </div>
        </div>

        {/* Price & Action Button */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between mt-auto">
          <div>
            <span className="block text-[11px] text-slate-500 uppercase font-medium">Giá thuê xe</span>
            <span className="text-lg font-extrabold text-emerald-700">
              {formatCurrency(car.pricePerDay)}
            </span>
            <span className="text-xs text-slate-500 font-normal">/ngày</span>
          </div>

          <Link
            to={`/item/${car.id}`}
            className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3.5 py-2.5 rounded-xl transition-all shadow-sm hover:shadow-md hover:shadow-emerald-600/30 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-1"
            aria-label={`Xem chi tiết và đặt xe ${car.name}`}
          >
            <span>Chi tiết</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </article>
  );
};
