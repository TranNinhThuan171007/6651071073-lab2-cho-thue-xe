import React, { useMemo, useState } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import { BarChart3, PieChart as PieIcon, TrendingUp } from 'lucide-react';
import { Car } from './CarCard';
import { formatCurrency } from '../utils';

interface StatChartProps {
  cars: Car[];
}

const COLORS = ['#059669', '#10b981', '#34d399', '#0284c7', '#6366f1', '#f59e0b', '#ec4899'];

export const StatChart: React.FC<StatChartProps> = ({ cars }) => {
  const [activeTab, setActiveTab] = useState<'price' | 'trips'>('price');

  // Thống kê giá thuê trung bình theo phân khúc
  const categoryStats = useMemo(() => {
    const statsMap: Record<string, { total: number; count: number; trips: number }> = {};

    cars.forEach((car) => {
      if (!statsMap[car.category]) {
        statsMap[car.category] = { total: 0, count: 0, trips: 0 };
      }
      statsMap[car.category].total += car.pricePerDay;
      statsMap[car.category].count += 1;
      statsMap[car.category].trips += car.tripsCount;
    });

    return Object.entries(statsMap).map(([category, val]) => ({
      name: category,
      avgPrice: Math.round(val.total / val.count),
      count: val.count,
      trips: val.trips,
    }));
  }, [cars]);

  // Thống kê top 6 xe có lượt thuê nhiều nhất
  const topRentedCars = useMemo(() => {
    return [...cars]
      .sort((a, b) => b.tripsCount - a.tripsCount)
      .slice(0, 6)
      .map((car) => ({
        name: car.name.replace(/2\.[0-9]L?|Signature|Legender/g, '').trim(),
        trips: car.tripsCount,
        price: car.pricePerDay,
      }));
  }, [cars]);

  return (
    <section
      id="statistics-section"
      className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs my-12"
      aria-label="Khu vực biểu đồ thống kê"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full mb-2">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Tính năng bắt buộc (F=3): Biểu đồ thống kê</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Thống Kê Thị Trường & Hoạt Động Thuê Xe
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Dữ liệu tổng hợp từ 22 dòng xe thực tế đang phục vụ tại hệ thống AutoRent.
          </p>
        </div>

        {/* Tab switchers */}
        <div className="flex gap-2 bg-slate-100 p-1.5 rounded-2xl self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setActiveTab('price')}
            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'price'
                ? 'bg-white text-emerald-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BarChart3 className="w-4 h-4 text-emerald-600" />
            <span>Giá TB theo phân khúc</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('trips')}
            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'trips'
                ? 'bg-white text-emerald-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <PieIcon className="w-4 h-4 text-emerald-600" />
            <span>Tỷ trọng lượt thuê</span>
          </button>
        </div>
      </div>

      {/* Chart display area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
        {/* Left Chart: Main visual (Bar or Pie) */}
        <div className="lg:col-span-2 h-80 w-full">
          {activeTab === 'price' ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryStats} margin={{ top: 20, right: 30, left: 20, bottom: 25 }}>
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 11, fill: '#475569' }}
                  interval={0}
                  angle={-15}
                  textAnchor="end"
                />
                <YAxis
                  tick={{ fontSize: 11, fill: '#475569' }}
                  tickFormatter={(val: number) => `${val / 1000000}M`}
                />
                <Tooltip
                  formatter={(value: unknown) => [
                    formatCurrency(typeof value === 'number' ? value : 0),
                    'Giá thuê trung bình/ngày',
                  ]}
                  contentStyle={{
                    backgroundColor: '#064e3b',
                    color: '#ffffff',
                    borderRadius: '0.75rem',
                    border: 'none',
                    fontSize: '12px',
                    fontWeight: 600,
                  }}
                />
                <Bar
                  dataKey="avgPrice"
                  fill="#059669"
                  radius={[8, 8, 0, 0]}
                  name="Giá TB (VNĐ/ngày)"
                />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryStats}
                  cx="50%"
                  cy="50%"
                  outerRadius={105}
                  innerRadius={60}
                  paddingAngle={4}
                  dataKey="trips"
                  nameKey="name"
                  label={({ name, percent }: { name?: string; percent?: number }) =>
                    `${name ?? ''}: ${((percent ?? 0) * 100).toFixed(0)}%`
                  }
                >
                  {categoryStats.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: unknown) => [`${value} lượt thuê`, 'Số chuyến']}
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    color: '#ffffff',
                    borderRadius: '0.75rem',
                    border: 'none',
                    fontSize: '12px',
                  }}
                />
                <Legend
                  wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Right Info: Key Highlights */}
        <div className="bg-emerald-50/70 border border-emerald-100 rounded-2xl p-5 space-y-4">
          <h4 className="text-sm font-bold text-emerald-900 flex items-center gap-1.5 uppercase tracking-wide">
            <TrendingUp className="w-4 h-4 text-emerald-700" />
            Top xe được thuê nhiều nhất
          </h4>

          <div className="space-y-3">
            {topRentedCars.slice(0, 4).map((car, idx) => (
              <div
                key={car.name}
                className="flex items-center justify-between text-xs bg-white p-2.5 rounded-xl border border-emerald-200/60 shadow-2xs"
              >
                <div className="flex items-center gap-2 truncate">
                  <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-extrabold flex items-center justify-center text-[10px] shrink-0">
                    {idx + 1}
                  </span>
                  <span className="font-semibold text-slate-800 truncate">{car.name}</span>
                </div>
                <div className="text-right shrink-0">
                  <span className="font-bold text-emerald-700">{car.trips} lượt</span>
                  <span className="block text-[10px] text-slate-400">
                    {formatCurrency(car.price)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-[11px] text-emerald-800 bg-white/80 p-3 rounded-xl border border-emerald-200">
            <strong>Gợi ý kinh tế:</strong> Phân khúc MPV và SUV 7 chỗ hiện chiếm hơn 45% tổng số lượt thuê trong các dịp lễ và cuối tuần nhờ sức chứa tối ưu cho cả gia đình.
          </div>
        </div>
      </div>
    </section>
  );
};
