import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { getRouteAggregates } from "../api";

const HORIZONS = ["T+1", "T+7", "T+15", "T+30", "T+45"];

export default function AdvanceHorizons() {
  const [routes, setRoutes] = useState([]);
  const [selected, setSelected] = useState("DEL-BOM");

  useEffect(() => {
    getRouteAggregates().then((data) => {
      setRoutes(data);
      if (data.length) setSelected(data[0].route);
    });
  }, []);

  const current = routes.find((r) => r.route === selected);
  const chartData = HORIZONS.map((h) => ({
    horizon: h,
    mean: current?.horizons?.[h]?.mean_base ?? 0,
  }));

  return (
    <div className="bg-slate-900 rounded-xl shadow-sm border border-slate-800 p-5">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-white">
          Advance Purchase Horizons
        </h3>
        <select
          className="bg-slate-800 border border-slate-700 text-white rounded p-1 outline-none focus:border-indigo-500"
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
        >
          {routes.map((r) => (
            <option key={r.route} value={r.route}>
              {r.route}
            </option>
          ))}
        </select>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis dataKey="horizon" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1e293b",
              borderColor: "#334155",
              color: "#f8fafc",
            }}
            itemStyle={{ color: "#818cf8" }}
          />
          <Legend wrapperStyle={{ color: "#cbd5e1" }} />
          <Line
            type="monotone"
            dataKey="mean"
            name="Mean Base Fare"
            stroke="#818cf8"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
