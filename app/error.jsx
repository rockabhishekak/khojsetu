'use client';

import Link from 'next/link';
import { AlertCircle } from 'lucide-react';

export default function Error({ error, reset }) {
  return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center">
      <div className="bg-red-50 border border-red-200 rounded-2xl p-10">
        <AlertCircle size={48} className="text-red-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Something went wrong</h2>
        <p className="text-slate-500 mb-6 text-sm">{error?.message || 'An unexpected error occurred.'}</p>
        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <button
            onClick={reset}
            className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-xl font-bold text-sm"
          >
            Try Again
          </button>
          <Link href="/" className="bg-slate-700 hover:bg-slate-800 text-white px-6 py-3 rounded-xl font-bold text-sm">
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
