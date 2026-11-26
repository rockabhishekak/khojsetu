'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from './Logo';
import { Search, PlusCircle, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/items', label: 'Browse All' },
    { href: '/items/report-lost', label: 'Report Lost' },
    { href: '/items/report-found', label: 'Report Found' },
  ];

  return (
    <nav className="bg-slate-900 border-b border-slate-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <Logo size={38} />
            <div className="leading-tight">
              <span className="text-white font-bold text-lg tracking-tight block">KhojSetu</span>
              <span className="text-amber-400 text-xs font-medium block">खोज सेतु</span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? 'bg-amber-500 text-slate-900'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center gap-2">
            <Link
              href="/items/report-lost"
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              <PlusCircle size={16} />
              Lost Item
            </Link>
            <Link
              href="/items/report-found"
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              <PlusCircle size={16} />
              Found Item
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-slate-300 hover:text-white p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-slate-900 border-t border-slate-700 px-4 pb-4 pt-2 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                pathname === link.href
                  ? 'bg-amber-500 text-slate-900'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2 flex flex-col gap-2">
            <Link
              href="/items/report-lost"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 justify-center bg-red-600 text-white px-4 py-3 rounded-lg text-sm font-medium"
            >
              <PlusCircle size={16} /> Report Lost Item
            </Link>
            <Link
              href="/items/report-found"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 justify-center bg-emerald-600 text-white px-4 py-3 rounded-lg text-sm font-medium"
            >
              <PlusCircle size={16} /> Report Found Item
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
