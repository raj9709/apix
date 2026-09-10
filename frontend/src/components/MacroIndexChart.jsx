import { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import { getMoSPIExport } from "../api";

export default function MacroIndexChart() {
  const [series, setSeries] = useState([]);

  useEffect(() => {
    getMoSPIExport(30).then((data) => {
      setSeries(
        [...data].sort((a, b) => a.record_date.localeCompare(b.record_date)),
      );
    });
  }, []);

  const option = {
    title: {
      text: "National Airfare Price Index vs DGCA Baseline",
      left: "center",
      textStyle: { color: "#e2e8f0" },
    },
    tooltip: {
      trigger: "axis",
      backgroundColor: "#1e293b",
      borderColor: "#334155",
      textStyle: { color: "#f8fafc" },
    },
    legend: {
      data: ["APIx National Index", "DGCA Monthly Baseline"],
      bottom: 0,
      textStyle: { color: "#cbd5e1" },
    },
    xAxis: {
      type: "category",
      data: series.map((d) => d.record_date),
      axisLabel: { color: "#94a3b8" },
    },
    yAxis: {
      type: "value",
      min: 90,
      max: 110,
      axisLabel: { color: "#94a3b8" },
      splitLine: { lineStyle: { color: "#334155" } },
    },
    series: [
      {
        name: "APIx National Index",
        type: "line",
        smooth: true,
        data: series.map((d) => d.national_index),
        itemStyle: { color: "#818cf8" },
        areaStyle: { color: "rgba(129, 140, 248, 0.15)" },
      },
      {
        name: "DGCA Monthly Baseline",
        type: "line",
        data: series.map((d) => d.dgca_benchmark),
        itemStyle: { color: "#64748b" },
        lineStyle: { type: "dashed" },
      },
    ],
  };

  return (
    <div className="bg-slate-900 rounded-xl shadow-sm border border-slate-800 p-5">
      <ReactECharts option={option} style={{ height: 400 }} />
    </div>
  );
}
