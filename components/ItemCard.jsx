import Link from 'next/link';
import { MapPin, Calendar, Tag, Phone, AlertCircle, CheckCircle2, Clock } from 'lucide-react';

function StatusBadge({ status }) {
  const map = {
    OPEN: { label: 'Open', className: 'bg-blue-100 text-blue-800 border border-blue-200' },
    MATCHED: { label: 'Matched', className: 'bg-amber-100 text-amber-800 border border-amber-200' },
    RESOLVED: { label: 'Resolved', className: 'bg-green-100 text-green-800 border border-green-200' },
  };
  const cfg = map[status] || map.OPEN;
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${cfg.className}`}>
      {cfg.label}
    </span>
  );
}

function TypeBadge({ type }) {
  if (type === 'LOST') {
    return (
      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-red-600 text-white">
        <AlertCircle size={11} />
        LOST
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-600 text-white">
      <CheckCircle2 size={11} />
      FOUND
    </span>
  );
}

export default function ItemCard({ item }) {
  const formattedDate = new Date(item.incidentDate).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  const borderColor = item.type === 'LOST' ? 'border-red-200 hover:border-red-400' : 'border-emerald-200 hover:border-emerald-400';
  const headerBg = item.type === 'LOST' ? 'bg-red-50' : 'bg-emerald-50';

  return (
    <Link href={`/items/${item._id}`} className="block group">
      <div className={`bg-white rounded-xl border-2 ${borderColor} transition-all duration-200 hover:shadow-lg overflow-hidden`}>
        {/* Card Header */}
        <div className={`${headerBg} px-4 py-3 flex items-center justify-between`}>
          <TypeBadge type={item.type} />
          <StatusBadge status={item.status} />
        </div>

        {/* Card Body */}
        <div className="p-4">
          <h3 className="font-bold text-slate-900 text-base mb-1 group-hover:text-amber-700 transition-colors line-clamp-1">
            {item.title}
          </h3>
          <p className="text-slate-500 text-sm mb-3 line-clamp-2 leading-relaxed">
            {item.description}
          </p>

          {/* Meta Info */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <Tag size={12} className="text-slate-400 flex-shrink-0" />
              <span className="bg-slate-100 px-2 py-0.5 rounded-full font-medium">{item.category}</span>
              {item.primaryColor && (
                <span className="text-slate-400">· {item.primaryColor}</span>
              )}
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-600">
              <MapPin size={12} className="text-slate-400 flex-shrink-0" />
              <span className="line-clamp-1">{item.city}, {item.state}</span>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-600">
              <Clock size={12} className="text-slate-400 flex-shrink-0" />
              <span>{formattedDate}</span>
            </div>
          </div>

          {/* Reward */}
          {item.reward && (
            <div className="mt-3 bg-amber-50 border border-amber-200 rounded-lg px-3 py-1.5">
              <p className="text-xs font-semibold text-amber-700">🎁 {item.reward}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-slate-100 px-4 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Phone size={11} />
            <span>{item.contactName}</span>
          </div>
          <span className="text-xs text-amber-600 font-medium group-hover:underline">View Details →</span>
        </div>
      </div>
    </Link>
  );
}
