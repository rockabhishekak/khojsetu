'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft, MapPin, Calendar, Tag, Phone, Mail, User,
  AlertCircle, CheckCircle2, Loader2, Zap, TrendingUp, Gift,
  Clock, Info
} from 'lucide-react';

function ScoreBar({ value, max, label, color }) {
  const pct = max > 0 ? (value / max) * 100 : 0;
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="text-slate-600">{label}</span>
        <span className="font-semibold text-slate-900">{value}/{max}</span>
      </div>
      <div className="bg-slate-100 rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all ${color}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function MatchCard({ match }) {
  const { item, score, breakdown, reason } = match;
  const isFound = item.type === 'FOUND';

  let badgeColor = 'bg-slate-100 text-slate-700';
  let badgeLabel = 'Low';
  if (score >= 70) { badgeColor = 'bg-emerald-100 text-emerald-700'; badgeLabel = 'High'; }
  else if (score >= 50) { badgeColor = 'bg-amber-100 text-amber-700'; badgeLabel = 'Medium'; }

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-4">
        <div className="flex items-start justify-between mb-2 gap-2">
          <div className="flex-1 min-w-0">
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full inline-block mb-1 ${isFound ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
              {item.type}
            </span>
            <h3 className="font-bold text-slate-900 text-sm line-clamp-1">{item.title}</h3>
          </div>
          {/* Score Badge */}
          <div className="flex flex-col items-center flex-shrink-0">
            <div className="text-2xl font-black text-slate-900">{score}%</div>
            <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${badgeColor}`}>{badgeLabel}</span>
          </div>
        </div>

        <p className="text-slate-500 text-xs line-clamp-2 mb-3">{item.description}</p>

        {/* Score Breakdown */}
        <div className="space-y-1.5 mb-3">
          <ScoreBar value={breakdown.category} max={25} label="Category" color="bg-blue-400" />
          <ScoreBar value={breakdown.location} max={25} label="Location" color="bg-emerald-400" />
          <ScoreBar value={breakdown.temporal} max={20} label="Date Proximity" color="bg-amber-400" />
          <ScoreBar value={breakdown.text} max={30} label="Description Match" color="bg-purple-400" />
        </div>

        {/* AI Reason */}
        <div className="bg-slate-50 border border-slate-100 rounded-lg p-2.5 mb-3">
          <div className="flex items-start gap-1.5">
            <Info size={12} className="text-slate-400 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-slate-600 leading-relaxed">{reason}</p>
          </div>
        </div>

        {/* Location & Date */}
        <div className="flex gap-3 text-xs text-slate-500 mb-3">
          <span className="flex items-center gap-1">
            <MapPin size={11} />
            {item.city}, {item.state}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={11} />
            {new Date(item.incidentDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
          </span>
        </div>

        <Link
          href={`/items/${item._id}`}
          className="block w-full text-center bg-amber-500 hover:bg-amber-600 text-white py-2 rounded-lg text-xs font-bold transition-colors"
        >
          View Full Details →
        </Link>
      </div>
    </div>
  );
}

export default function ItemDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [item, setItem] = useState(null);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [matchLoading, setMatchLoading] = useState(false);
  const [error, setError] = useState('');
  const [contactVisible, setContactVisible] = useState(false);

  useEffect(() => {
    if (params.id) {
      loadItem();
    }
  }, [params.id]);

  async function loadItem() {
    setLoading(true);
    try {
      const res = await fetch(`/api/items/${params.id}`);
      const data = await res.json();
      if (data.success) {
        setItem(data.data);
        loadMatches(params.id);
      } else {
        setError('Item not found');
      }
    } catch {
      setError('Failed to load item');
    } finally {
      setLoading(false);
    }
  }

  async function loadMatches(itemId) {
    setMatchLoading(true);
    try {
      const res = await fetch('/api/match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ itemId }),
      });
      const data = await res.json();
      if (data.success) {
        setMatches(data.data.matches);
      }
    } catch {
      // Silently fail for matches
    } finally {
      setMatchLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <Loader2 size={40} className="animate-spin text-amber-500 mx-auto mb-3" />
          <p className="text-slate-500">Loading item details...</p>
        </div>
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <AlertCircle size={48} className="text-red-400 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-slate-900 mb-2">Item Not Found</h2>
        <p className="text-slate-500 mb-6">{error}</p>
        <Link href="/items" className="bg-amber-500 text-white px-6 py-3 rounded-xl font-bold">
          ← Back to Browse
        </Link>
      </div>
    );
  }

  const isLost = item.type === 'LOST';
  const typeBg = isLost ? 'bg-red-50 border-red-200' : 'bg-emerald-50 border-emerald-200';
  const typeColor = isLost ? 'text-red-700' : 'text-emerald-700';
  const typeBadge = isLost ? 'bg-red-600 text-white' : 'bg-emerald-600 text-white';

  const formattedDate = new Date(item.incidentDate).toLocaleDateString('en-IN', {
    weekday: 'long', day: '2-digit', month: 'long', year: 'numeric'
  });
  const postedDate = new Date(item.createdAt).toLocaleDateString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric'
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 text-sm mb-6 group"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        Back
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT: Item Details */}
        <div className="lg:col-span-2 space-y-4">
          {/* Type Banner */}
          <div className={`${typeBg} border rounded-2xl p-4 flex items-center justify-between`}>
            <div className="flex items-center gap-3">
              <span className={`text-sm font-bold px-4 py-2 rounded-full ${typeBadge}`}>
                {isLost ? '🔴 LOST ITEM' : '🟢 FOUND ITEM'}
              </span>
              <span className={`text-sm font-semibold ${typeColor}`}>{item.category}</span>
            </div>
            <span className={`text-xs px-3 py-1 rounded-full font-bold border ${
              item.status === 'OPEN' ? 'bg-blue-50 border-blue-200 text-blue-700' :
              item.status === 'MATCHED' ? 'bg-amber-50 border-amber-200 text-amber-700' :
              'bg-green-50 border-green-200 text-green-700'
            }`}>
              {item.status}
            </span>
          </div>

          {/* Title & Description */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <h1 className="text-2xl font-bold text-slate-900 mb-3">{item.title}</h1>
            <p className="text-slate-600 leading-relaxed">{item.description}</p>
            {item.primaryColor && (
              <div className="mt-3 inline-flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-lg">
                <span className="text-xs text-slate-500 font-medium">Primary Color:</span>
                <span className="text-sm font-semibold text-slate-900">{item.primaryColor}</span>
              </div>
            )}
          </div>

          {/* Location & Date */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <h2 className="font-bold text-slate-900 mb-4 text-base">📍 Location & Date</h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-slate-900">{item.specificLocation}</p>
                  <p className="text-slate-500 text-sm">{item.city}, {item.state}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar size={18} className="text-amber-500 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-slate-900">{formattedDate}</p>
                  <p className="text-slate-500 text-sm">Date {isLost ? 'Lost' : 'Found'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Reward */}
          {item.reward && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center gap-3">
              <Gift size={22} className="text-amber-600" />
              <div>
                <p className="font-bold text-amber-900 text-sm">Reward Offered</p>
                <p className="text-amber-700 font-semibold">{item.reward}</p>
              </div>
            </div>
          )}

          {/* Contact Section */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-slate-900 text-base">📞 Contact Information</h2>
              <button
                onClick={() => setContactVisible(!contactVisible)}
                className="text-xs bg-amber-500 hover:bg-amber-600 text-white px-3 py-1.5 rounded-lg font-semibold transition-colors"
              >
                {contactVisible ? 'Hide' : 'Show Contact'}
              </button>
            </div>
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-slate-100 rounded-full p-2">
                <User size={18} className="text-slate-600" />
              </div>
              <div>
                <p className="font-semibold text-slate-900">{item.contactName}</p>
                <p className="text-slate-500 text-xs">Reported by</p>
              </div>
            </div>
            {contactVisible ? (
              <div className="space-y-2 mt-3 p-3 bg-slate-50 rounded-lg border border-slate-200">
                <div className="flex items-center gap-2 text-sm">
                  <Phone size={15} className="text-emerald-600" />
                  <span className="font-semibold text-slate-900">{item.contactPhone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Mail size={15} className="text-blue-600" />
                  <a href={`mailto:${item.contactEmail}`} className="text-blue-600 hover:underline">{item.contactEmail}</a>
                </div>
              </div>
            ) : (
              <p className="text-slate-400 text-xs mt-2">
                Click "Show Contact" to reveal contact details. Only do this if you have genuine information.
              </p>
            )}
            <p className="text-xs text-slate-400 mt-3">Posted on {postedDate}</p>
          </div>
        </div>

        {/* RIGHT: AI Matches */}
        <div className="space-y-4">
          <div className="bg-slate-900 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-1">
              <Zap size={18} className="text-amber-400" />
              <h2 className="font-bold text-white text-base">AI Similarity Matches</h2>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Automatically scanning {isLost ? 'Found' : 'Lost'} items. 
              Score based on Category(25%) + Location(25%) + Date(20%) + Description(30%).
            </p>
          </div>

          {matchLoading && (
            <div className="bg-white border border-slate-200 rounded-xl p-8 text-center">
              <Loader2 size={28} className="animate-spin text-amber-500 mx-auto mb-2" />
              <p className="text-slate-500 text-sm">Running AI match engine...</p>
            </div>
          )}

          {!matchLoading && matches.length === 0 && (
            <div className="bg-white border border-slate-200 rounded-xl p-6 text-center">
              <TrendingUp size={32} className="text-slate-300 mx-auto mb-2" />
              <p className="text-slate-600 font-medium text-sm mb-1">No strong matches found yet</p>
              <p className="text-slate-400 text-xs">As more items are reported, matches will appear here automatically.</p>
            </div>
          )}

          {!matchLoading && matches.length > 0 && (
            <div className="space-y-3">
              <p className="text-xs text-slate-500 font-medium">
                Found {matches.length} potential match{matches.length !== 1 ? 'es' : ''}:
              </p>
              {matches.map((match, idx) => (
                <MatchCard key={match.item._id || idx} match={match} />
              ))}
            </div>
          )}

          {/* Quick Action */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <p className="text-amber-800 text-xs font-semibold mb-2">🔍 Add a new report to improve matching</p>
            <div className="space-y-2">
              <Link
                href="/items/report-lost"
                className="block text-center bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg text-xs font-bold"
              >
                Report Lost Item
              </Link>
              <Link
                href="/items/report-found"
                className="block text-center bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg text-xs font-bold"
              >
                Report Found Item
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
