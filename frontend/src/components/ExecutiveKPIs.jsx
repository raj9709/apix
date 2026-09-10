import { useEffect, useState } from "react";
import { getIndexSummary } from "../api";
import { TrendingUp, TrendingDown, Plane, Percent, Route } from "lucide-react";

export default function ExecutiveKPIs() {
  const [data, setData] = useState(null);

  useEffect(() => {
    getIndexSummary().then(setData).catch(console.error);
  }, []);

  if (!data)
    return <div className="h-28 bg-slate-800 animate-pulse rounded-xl"></div>;

  const up = (data.delta_24h ?? 0) >= 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-slate-900 rounded-xl shadow-sm border border-slate-800 p-5">
        <div className="flex justify-between items-center">
          <p className="text-sm font-medium text-slate-400">National Index</p>
          <Plane className="w-5 h-5 text-indigo-400" />
        </div>
        <p className="mt-2 text-3xl font-bold text-white">
          {data.national_index.toFixed(2)}
        </p>
      </div>

      <div className="bg-slate-900 rounded-xl shadow-sm border border-slate-800 p-5">
        <div className="flex justify-between items-center">
          <p className="text-sm font-medium text-slate-400">24h Change</p>
          {up ? (
            <TrendingUp className="w-5 h-5 text-emerald-400" />
          ) : (
            <TrendingDown className="w-5 h-5 text-rose-400" />
          )}
        </div>
        <p
          className={`mt-2 text-3xl font-bold ${up ? "text-emerald-400" : "text-rose-400"}`}
        >
          {data.delta_24h > 0 ? "+" : ""}
          {data.delta_24h?.toFixed(2)}
        </p>
      </div>

      <div className="bg-slate-900 rounded-xl shadow-sm border border-slate-800 p-5">
        <div className="flex justify-between items-center">
          <p className="text-sm font-medium text-slate-400">Base/Tax Ratio</p>
          <Percent className="w-5 h-5 text-amber-400" />
        </div>
        <p className="mt-2 text-3xl font-bold text-white">
          {data.base_vs_tax_ratio}
        </p>
      </div>

      <div className="bg-slate-900 rounded-xl shadow-sm border border-slate-800 p-5">
        <div className="flex justify-between items-center">
          <p className="text-sm font-medium text-slate-400">Tracked Routes</p>
          <Route className="w-5 h-5 text-cyan-400" />
        </div>
        <p className="mt-2 text-3xl font-bold text-white">
          {data.tracked_routes}
        </p>
      </div>
    </div>
  );
}
