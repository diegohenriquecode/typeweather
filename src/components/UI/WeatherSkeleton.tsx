export default function WeatherSkeleton() {
  return (
    <>
      <div className="md:col-span-8 rounded-2xl border border-white/10 bg-white/5 p-5 animate-pulse">
        <div className="h-6 w-32 bg-white/10 rounded mb-2"></div>
        <div className="h-4 w-48 bg-white/10 rounded"></div>

        <div className="mt-8 flex justify-between items-end">
          <div>
            <div className="h-14 w-24 bg-white/10 rounded mb-2"></div>
            <div className="h-4 w-40 bg-white/10 rounded"></div>
          </div>

          <div className="h-28 w-40 bg-white/10 rounded"></div>
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-12">
          <div className="md:col-span-4 h-12 bg-white/10 rounded"></div>
          <div className="md:col-span-8 h-12 bg-white/10 rounded"></div>
        </div>
      </div>

      <div className="md:col-span-4 rounded-2xl border border-white/10 bg-white/5 p-5 animate-pulse">
        <div className="h-5 w-40 bg-white/10 rounded mb-4"></div>
        <div className="space-y-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-4 w-full bg-white/10 rounded" />
          ))}
        </div>
      </div>

      <div className="md:col-span-4 rounded-2xl border border-white/10 bg-white/5 p-5 animate-pulse">
        <div className="h-5 w-40 bg-white/10 rounded mb-4"></div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-16 bg-white/10 rounded" />
          ))}
        </div>
      </div>
    </>
  );
}
