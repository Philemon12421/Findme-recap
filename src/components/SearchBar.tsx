import React, { useState } from 'react';
import { Search, Loader2, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

interface SearchBarProps {
  onSearch: (username: string) => void;
  isLoading?: boolean;
}

export default function SearchBar({ onSearch, isLoading }: SearchBarProps) {
  const [value, setValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      onSearch(value.trim());
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="relative group">
        <div className="absolute inset-x-0 -inset-y-0.5 bg-gradient-to-r from-brand-orange to-brand-orange-light rounded-full blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
        <div className="relative flex items-center bg-white border border-slate-200 rounded-full py-2 pl-6 pr-2 shadow-xl focus-within:ring-2 focus-within:ring-brand-orange/20 transition-all duration-300">
          <Search className="text-slate-400 mr-3 shrink-0" size={20} />
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Search username, name, or domain..."
            className="w-full bg-transparent border-none focus:ring-0 text-slate-900 placeholder:text-slate-400 font-medium py-2 outline-none"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center gap-2 bg-brand-orange text-white px-6 py-3 rounded-full font-semibold hover:bg-brand-orange/90 transition-all disabled:opacity-50"
          >
            {isLoading ? <Loader2 className="animate-spin" size={18} /> : <Sparkles size={18} />}
            <span>{isLoading ? 'Checking...' : 'Findme'}</span>
          </button>
        </div>
      </form>
      <div className="mt-4 flex flex-wrap justify-center gap-4 text-xs text-slate-500 font-medium">
        <span className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-green-500"></div> 1000+ Platforms</span>
        <span className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div> AI Identity Match</span>
        <span className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-brand-orange"></div> Domain Check</span>
      </div>
    </div>
  );
}
