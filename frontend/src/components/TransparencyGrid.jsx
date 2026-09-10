import { useEffect, useState } from "react";
import { getRawFares } from "../api";

export default function TransparencyGrid() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    getRawFares({ limit: 25 }).then(setRows);
  }, []);

  return (
    <div className="bg-slate-900 rounded-xl shadow-sm border border-slate-800 overflow-hidden mt-6">
      <div className="p-4 border-b border-slate-800">
        <h3 className="font-bold text-lg text-white">
          Transparency Grid (Unbundled Fares)
        </h3>
        <p className="text-sm text-slate-400">Live API Ingestion Feed</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-slate-950 text-slate-400">
            <tr>
              <th className="p-3">Flight Date</th>
              <th className="p-3">Route</th>
              <th className="p-3">Airline</th>
              <th className="p-3">Flight No.</th>
              <th className="p-3">Window</th>
              <th className="p-3">Base Fare</th>
              <th className="p-3">Taxes (18%)</th>
              <th className="p-3">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {rows.map((r) => (
              <tr key={r.id} className="hover:bg-slate-800 transition-colors">
                <td className="p-3 font-medium text-slate-300">
                  {r.flight_date}
                </td>
                <td className="p-3 text-slate-300">
                  {r.origin}-{r.destination}
                </td>
                <td className="p-3 font-semibold text-indigo-400">
                  {r.carrier}
                </td>
                <td className="p-3 text-slate-500">{r.flight_number}</td>
                <td className="p-3">
                  <span className="px-2 py-1 bg-slate-800 rounded text-xs font-bold text-slate-300 tracking-wider">
                    {r.advance_purchase_window}
                  </span>
                </td>
                <td className="p-3 font-semibold text-emerald-400">
                  ₹{r.base_fare}
                </td>
                <td className="p-3 text-rose-400">₹{r.taxes_udf}</td>
                <td className="p-3 font-bold text-white">₹{r.total_fare}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
