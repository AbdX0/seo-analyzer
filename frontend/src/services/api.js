import axios from "axios";

const api = axios.create({
    baseURL: "https://seo-analyzer-1ayk.onrender.com/api"
});

export default api;

export const analyzeWebsite = (url) =>
    api.post("/analyze", { url });

export const getResults = (id) =>
    api.get(`/results/${id}`);