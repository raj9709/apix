import axios from "axios";

const api = axios.create({
  baseURL: "apix-hcqo.onrender.com",
  timeout: 30000,
});

export const getIndexSummary = () =>
  api.get("/api/index/summary").then((r) => r.data);
export const getRouteAggregates = () =>
  api.get("/api/fares/routes").then((r) => r.data);
export const getMoSPIExport = (days = 30) =>
  api.get(`/api/mospi-export?days=${days}`).then((r) => r.data);
export const getRawFares = (params = {}) =>
  api.get("/api/fares/raw", { params }).then((r) => r.data);
export const triggerIngestion = () =>
  api.post("/api/admin/run-ingestion").then((r) => r.data);
