'use client';

import { Search, SlidersHorizontal, X } from 'lucide-react';

const STATES = [
  'All States', 'Andhra Pradesh', 'Delhi', 'Gujarat', 'Haryana', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Punjab', 'Rajasthan',
  'Tamil Nadu', 'Telangana', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
];

const CATEGORIES = [
  'All Categories', 'Electronics', 'Documents', 'Wallets & Purses',
  'Keys', 'Luggage & Bags', 'Clothing', 'Jewellery', 'Others',
];

const TYPES = ['All Types', 'LOST', 'FOUND'];
const STATUSES = ['All Status', 'OPEN', 'MATCHED', 'RESOLVED'];

export default function FilterBar({ filters, onChange, onReset }) {
  const hasFilters =
    filters.search || filters.type !== 'ALL' || filters.category !== 'ALL' ||
    filters.state !== 'ALL' || filters.status !== 'ALL';

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
      {/* Search Bar */}
      <div className="relative mb-3">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input
          type="text"
          placeholder="Search by item name, description, city..."
          value={filters.search}
          onChange={(e) => onChange('search', e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent bg-slate-50"
        />
      </div>

      {/* Filter Dropdowns */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {/* Type Filter */}
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">Type</label>
          <select
            value={filters.type}
            onChange={(e) => onChange('type', e.target.value)}
            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-amber-400"
          >
            {TYPES.map((t) => (
              <option key={t} value={t === 'All Types' ? 'ALL' : t}>{t}</option>
            ))}
          </select>
        </div>

        {/* Category Filter */}
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">Category</label>
          <select
            value={filters.category}
            onChange={(e) => onChange('category', e.target.value)}
            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-amber-400"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c === 'All Categories' ? 'ALL' : c}>{c}</option>
            ))}
          </select>
        </div>

        {/* State Filter */}
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">State</label>
          <select
            value={filters.state}
            onChange={(e) => onChange('state', e.target.value)}
            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-amber-400"
          >
            {STATES.map((s) => (
              <option key={s} value={s === 'All States' ? 'ALL' : s}>{s}</option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">Status</label>
          <select
            value={filters.status}
            onChange={(e) => onChange('status', e.target.value)}
            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-amber-400"
          >
            {STATUSES.map((s) => (
              <option key={s} value={s === 'All Status' ? 'ALL' : s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Reset Button */}
      {hasFilters && (
        <div className="mt-3 flex justify-end">
          <button
            onClick={onReset}
            className="flex items-center gap-1.5 text-sm text-red-600 hover:text-red-800 font-medium"
          >
            <X size={14} />
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
