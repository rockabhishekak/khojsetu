import Link from 'next/link';
import { Search, AlertCircle, CheckCircle2, ArrowRight, Shield, Zap, Users } from 'lucide-react';

export const dynamic = 'force-dynamic';

// Fetch recent items from DB (Server Component)
async function getRecentItems() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/items`, {
      next: { revalidate: 60 },
    });
    const data = await res.json();
    return data.success ? data.data.slice(0, 6) : [];
  } catch {
    return [];
  }
}

function StatCard({ number, label, icon }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 text-center shadow-sm">
      <div className="text-3xl font-bold text-slate-900 mb-1">{number}</div>
      <div className="text-slate-500 text-sm">{label}</div>
    </div>
  );
}

function RecentItemCard({ item }) {
  const isLost = item.type === 'LOST';
  return (
    <Link href={`/items/${item._id}`} className="block group">
      <div className={`bg-white border-2 rounded-xl p-4 hover:shadow-md transition-all ${isLost ? 'border-red-100 hover:border-red-300' : 'border-emerald-100 hover:border-emerald-300'}`}>
        <div className="flex items-center justify-between mb-2">
          <span className={`text-xs font-bold px-2 py-1 rounded-full ${isLost ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'}`}>
            {isLost ? '🔴 LOST' : '🟢 FOUND'}
          </span>
          <span className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">{item.category}</span>
        </div>
        <h3 className="font-semibold text-slate-900 text-sm mb-1 group-hover:text-amber-700 line-clamp-1">{item.title}</h3>
        <p className="text-slate-500 text-xs line-clamp-2">{item.description}</p>
        <div className="mt-2 text-xs text-slate-400">📍 {item.city}, {item.state}</div>
      </div>
    </Link>
  );
}

export default async function HomePage() {
  const recentItems = await getRecentItems();
  const lostCount = recentItems.filter(i => i.type === 'LOST').length;
  const foundCount = recentItems.filter(i => i.type === 'FOUND').length;

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-slate-900 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Shield size={14} />
            Pan-India Citizens Lost & Found Portal
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Lost Something? Found Something?
            <span className="text-amber-400 block mt-2">KhojSetu Connects You.</span>
          </h1>
          <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
            Report lost or found belongings across India. Our AI similarity engine automatically matches 
            lost items with found reports based on description, location, category and date — giving you 
            a confidence score you can explain.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/items/report-lost"
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-bold text-base transition-colors shadow-lg w-full sm:w-auto justify-center"
            >
              <AlertCircle size={20} />
              Report Lost Item
            </Link>
            <Link
              href="/items/report-found"
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-bold text-base transition-colors shadow-lg w-full sm:w-auto justify-center"
            >
              <CheckCircle2 size={20} />
              Report Found Item
            </Link>
            <Link
              href="/items"
              className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white px-8 py-4 rounded-xl font-bold text-base transition-colors w-full sm:w-auto justify-center"
            >
              <Search size={20} />
              Browse All
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="bg-amber-50 border-y border-amber-100 py-8 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard number="🇮🇳 All India" label="Pan-India Coverage" />
          <StatCard number="8 Types" label="Item Categories" />
          <StatCard number="AI Powered" label="Smart Matching Engine" />
          <StatCard number="Free" label="Always Free for Citizens" />
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">How KhojSetu Works</h2>
            <p className="text-slate-500 text-base max-w-xl mx-auto">
              A simple 3-step process powered by a transparent, explainable AI matching algorithm.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                icon: '📝',
                title: 'Submit Your Report',
                desc: 'Fill in a detailed report about your lost or found item — description, location, date, and contact info.',
                color: 'bg-blue-50 border-blue-100',
              },
              {
                step: '02',
                icon: '🤖',
                title: 'AI Finds Matches',
                desc: 'Our algorithm scores all opposite-type items on 4 dimensions: Category (25%), Location (25%), Date closeness (20%), and Description similarity (30%).',
                color: 'bg-amber-50 border-amber-100',
              },
              {
                step: '03',
                icon: '🤝',
                title: 'Connect & Reunite',
                desc: 'View your confidence score and explanation. Contact the person directly to verify and reunite with your item.',
                color: 'bg-emerald-50 border-emerald-100',
              },
            ].map((step) => (
              <div key={step.step} className={`${step.color} border rounded-2xl p-6 text-center`}>
                <div className="text-4xl mb-4">{step.icon}</div>
                <div className="text-sm font-bold text-slate-400 mb-2">STEP {step.step}</div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">{step.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Matching Explanation */}
      <section className="py-16 px-4 bg-slate-900">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white mb-3">Our AI Matching Formula</h2>
            <p className="text-slate-400">Transparent, explainable — not a black box</p>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8">
            <div className="text-center mb-6">
              <code className="text-amber-400 text-sm bg-slate-900 px-4 py-2 rounded-lg block max-w-xl mx-auto">
                Score = Category(25%) + Location(25%) + Date Closeness(20%) + Description Match(30%)
              </code>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Category', value: '25%', desc: 'Same type of item?', color: 'text-blue-400' },
                { label: 'Location', value: '25%', desc: 'Same city or state?', color: 'text-emerald-400' },
                { label: 'Date', value: '20%', desc: 'Within 7-15 days?', color: 'text-amber-400' },
                { label: 'Description', value: '30%', desc: 'Keywords overlap?', color: 'text-purple-400' },
              ].map((f) => (
                <div key={f.label} className="bg-slate-900 rounded-xl p-4 text-center border border-slate-700">
                  <div className={`text-2xl font-bold ${f.color} mb-1`}>{f.value}</div>
                  <div className="text-white text-sm font-semibold mb-1">{f.label}</div>
                  <div className="text-slate-400 text-xs">{f.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Recent Items */}
      {recentItems.length > 0 && (
        <section className="py-16 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Recent Reports</h2>
                <p className="text-slate-500 text-sm mt-1">Latest lost & found items submitted by citizens</p>
              </div>
              <Link
                href="/items"
                className="flex items-center gap-2 text-amber-600 font-semibold hover:text-amber-700 text-sm"
              >
                View All <ArrowRight size={16} />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {recentItems.map((item) => (
                <RecentItemCard key={item._id} item={item} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Empty State CTA if no items */}
      {recentItems.length === 0 && (
        <section className="py-16 px-4 bg-white">
          <div className="max-w-2xl mx-auto text-center">
            <div className="text-6xl mb-4">🗃️</div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">No Items Yet</h2>
            <p className="text-slate-500 mb-6">
              Load sample data to see the platform in action, or submit your first report!
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/api/seed"
                className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-xl font-bold text-sm"
              >
                🌱 Load Sample Data
              </Link>
              <Link
                href="/items/report-lost"
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-bold text-sm"
              >
                Report Lost Item
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
