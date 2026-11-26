'use client';

import { useState, useEffect, useMemo } from 'react';
import ItemCard from '@/components/ItemCard';
import FilterBar from '@/components/FilterBar';
import { Loader2, Package, AlertCircle } from 'lucide-react';
import Link from 'next/link';

const DEFAULT_FILTERS = {
  search: '',
  type: 'ALL',
  category: 'ALL',
  state: 'ALL',
  status: 'ALL',
};

export default function BrowsePage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  // Fetch items whenever filters change
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchItems();
    }, 300); // debounce search
    return () => clearTimeout(timer);
  }, [filters]);

  async function fetchItems() {
    setLoading(true);
    setError('');
    try {
      const params = new URLSearchParams();
      if (filters.search) params.set('search', filters.search);
      if (filters.type !== 'ALL') params.set('type', filters.type);
      if (filters.category !== 'ALL') params.set('category', filters.category);
      if (filters.state !== 'ALL') params.set('state', filters.state);
      if (filters.status !== 'ALL') params.set('status', filters.status);

      const res = await fetch(`/api/items?${params.toString()}`);
      const data = await res.json();
      if (data.success) {
        setItems(data.data);
      } else {
        setError(data.error);
      }
    } catch {
      setError('Failed to load items. Please check your connection.');
    } finally {
      setLoading(false);
    }
  }

  function handleFilterChange(key, value) {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }

  function handleReset() {
    setFilters(DEFAULT_FILTERS);
  }

  const lostItems = useMemo(() => items.filter((i) => i.type === 'LOST'), [items]);
  const foundItems = useMemo(() => items.filter((i) => i.type === 'FOUND'), [items]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Browse Lost & Found Items</h1>
        <p className="text-slate-500">
          Search through all reported lost and found items across India. 
          Click any item to view details and see AI-powered potential matches.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="mb-6">
        <FilterBar filters={filters} onChange={handleFilterChange} onReset={handleReset} />
      </div>

      {/* Results Summary */}
      {!loading && !error && (
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-slate-600">
            Showing <span className="font-semibold text-slate-900">{items.length}</span> results
            {filters.type === 'ALL' && (
              <span className="ml-2">
                (<span className="text-red-600 font-medium">{lostItems.length} Lost</span>
                {' · '}
                <span className="text-emerald-600 font-medium">{foundItems.length} Found</span>)
              </span>
            )}
          </p>
          <Link
            href="/api/seed"
            className="text-xs text-slate-400 hover:text-amber-500 underline"
          >
            Load sample data
          </Link>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <Loader2 size={40} className="animate-spin text-amber-500 mx-auto mb-3" />
            <p className="text-slate-500 text-sm">Searching items...</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <AlertCircle size={40} className="text-red-400 mx-auto mb-3" />
          <p className="text-red-700 font-medium">{error}</p>
          <button onClick={fetchItems} className="mt-3 text-sm text-red-600 underline">Try again</button>
        </div>
      )}

      {/* No Results */}
      {!loading && !error && items.length === 0 && (
        <div className="text-center py-20">
          <Package size={60} className="text-slate-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-slate-700 mb-2">No items found</h3>
          <p className="text-slate-500 mb-6">
            Try adjusting your filters or{' '}
            <Link href="/api/seed" className="text-amber-600 underline font-medium">load sample data</Link>{' '}
            to get started.
          </p>
          <div className="flex justify-center gap-3">
            <Link href="/items/report-lost" className="bg-red-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-red-700">
              Report Lost Item
            </Link>
            <Link href="/items/report-found" className="bg-emerald-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-emerald-700">
              Report Found Item
            </Link>
          </div>
        </div>
      )}

      {/* Item Grid */}
      {!loading && !error && items.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {items.map((item) => (
            <ItemCard key={item._id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
