export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header skeleton */}
      <div className="mb-8">
        <div className="h-8 bg-slate-200 rounded-lg w-72 mb-3 animate-pulse" />
        <div className="h-4 bg-slate-200 rounded w-96 animate-pulse" />
      </div>

      {/* Filter bar skeleton */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 mb-6 animate-pulse">
        <div className="h-11 bg-slate-100 rounded-lg mb-3" />
        <div className="grid grid-cols-4 gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-10 bg-slate-100 rounded-lg" />
          ))}
        </div>
      </div>

      {/* Cards skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="bg-white border border-slate-200 rounded-xl overflow-hidden animate-pulse">
            <div className="h-12 bg-slate-100" />
            <div className="p-4 space-y-2">
              <div className="h-5 bg-slate-200 rounded w-3/4" />
              <div className="h-4 bg-slate-100 rounded w-full" />
              <div className="h-4 bg-slate-100 rounded w-2/3" />
              <div className="h-3 bg-slate-100 rounded w-1/2 mt-3" />
              <div className="h-3 bg-slate-100 rounded w-2/5" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
