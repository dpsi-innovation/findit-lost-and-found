import React from 'react';
import { useApp } from '../context/AppContext';
import { ItemCategory } from '../types';
import { Search, Filter, X, MapPin } from 'lucide-react';

const CATEGORIES: ('all' | ItemCategory)[] = [
  'all',
  'Electronics & Gadgets',
  'Clothing & Uniform',
  'Books & Stationery',
  'Bottles & Lunchboxes',
  'Student IDs & Cards',
  'Keys, Bags & Wallets',
  'Sports Equipment',
  'Other Accessories'
];

export const FilterBar: React.FC = () => {
  const { filters, setFilters, zones } = useApp();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({ ...prev, search: e.target.value }));
  };

  const handleTypeChange = (type: 'all' | 'found' | 'lost') => {
    setFilters(prev => ({ ...prev, type }));
  };

  const handleCategoryChange = (category: string) => {
    setFilters(prev => ({ ...prev, category }));
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters(prev => ({ ...prev, location: e.target.value }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      category: 'all',
      type: 'all',
      status: 'all',
      location: 'all'
    });
  };

  const hasActiveFilters = 
    filters.search !== '' || 
    filters.category !== 'all' || 
    filters.type !== 'all' || 
    filters.location !== 'all';

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-xs mb-6 space-y-4">
      {/* Top Row: Search and Type Pills */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        {/* Search bar */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={filters.search}
            onChange={handleSearchChange}
            placeholder="Search items by name, keywords (e.g. calculator, blazer, keys)..."
            className="w-full pl-10 pr-9 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
          />
          {filters.search && (
            <button
              onClick={() => setFilters(prev => ({ ...prev, search: '' }))}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Type Filter Buttons */}
        <div className="flex bg-slate-100 p-1 rounded-lg text-xs font-semibold text-slate-600 shrink-0">
          <button
            onClick={() => handleTypeChange('all')}
            className={`px-3 py-1.5 rounded-md transition ${
              filters.type === 'all'
                ? 'bg-white text-blue-700 shadow-xs'
                : 'hover:text-slate-900'
            }`}
          >
            All Items
          </button>
          <button
            onClick={() => handleTypeChange('found')}
            className={`px-3 py-1.5 rounded-md transition ${
              filters.type === 'found'
                ? 'bg-white text-blue-700 shadow-xs'
                : 'hover:text-slate-900'
            }`}
          >
            Found on Campus
          </button>
          <button
            onClick={() => handleTypeChange('lost')}
            className={`px-3 py-1.5 rounded-md transition ${
              filters.type === 'lost'
                ? 'bg-white text-blue-700 shadow-xs'
                : 'hover:text-slate-900'
            }`}
          >
            Reported Lost
          </button>
        </div>

        {/* Location selector */}
        <div className="relative shrink-0">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
            <MapPin className="w-3.5 h-3.5" />
          </div>
          <select
            value={filters.location}
            onChange={handleLocationChange}
            className="pl-8 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition appearance-none cursor-pointer"
          >
            <option value="all">All School Locations</option>
            {zones.map(z => (
              <option key={z.id} value={z.name}>{z.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Category Pills Slider */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
        <span className="text-slate-400 text-xs font-medium pr-1 flex items-center gap-1 shrink-0">
          <Filter className="w-3 h-3" /> Categories:
        </span>
        {CATEGORIES.map(category => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={`px-2.5 py-1 rounded-full whitespace-nowrap transition text-xs font-medium ${
              filters.category === category
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
            }`}
          >
            {category === 'all' ? 'All' : category}
          </button>
        ))}

        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="ml-auto text-xs text-blue-600 hover:text-blue-800 font-semibold px-2 py-1 shrink-0 flex items-center gap-1"
          >
            <X className="w-3 h-3" /> Clear filters
          </button>
        )}
      </div>
    </div>
  );
};
