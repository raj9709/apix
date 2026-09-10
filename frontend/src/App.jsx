import { useState } from "react";
import ExecutiveKPIs from "./components/ExecutiveKPIs";
import MacroIndexChart from "./components/MacroIndexChart";
import AdvanceHorizons from "./components/AdvanceHorizons";
import TransparencyGrid from "./components/TransparencyGrid";
import { triggerIngestion } from "./api";

export default function App() {
  const [loading, setLoading] = useState(false);

  const handleRunNow = async () => {
    setLoading(true);
    try {
      await triggerIngestion();
      window.location.reload();
    } catch (e) {
      alert("Error generating data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 p-6 text-slate-200">
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="flex justify-between items-center bg-slate-900 border border-slate-800 p-4 rounded-xl shadow-sm">
          <div>
            <h1 className="text-2xl font-bold text-white">APIx Dashboard</h1>
            <p className="text-sm text-slate-400">
              MoSPI Airfare Price Index - Smart India Hackathon
            </p>
          </div>
          <button
            onClick={handleRunNow}
            disabled={loading}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 transition-colors text-white rounded-lg font-medium shadow-lg shadow-indigo-900/20"
          >
            {loading ? "Processing API..." : "Run Daily Ingestion"}
          </button>
        </header>

        <ExecutiveKPIs />
        <MacroIndexChart />
        <AdvanceHorizons />
        <TransparencyGrid />
      </div>
    </div>
  );
}
