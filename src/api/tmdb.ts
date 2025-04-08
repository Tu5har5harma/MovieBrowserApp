import axios from "axios";
import { Movie } from "../types/movie";

interface PaginatedResponse {
  page: number;
  total_pages: number;
  results: Movie[];
}

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNjlhYjI1ZGY2NGE1NWVjZGIwZDFhNzAzMWMwM2Y4NSIsIm5iZiI6MTc0NDAzOTgyNi41ODMwMDAyLCJzdWIiOiI2N2YzZWY5MjFiYjA0NzI4OTk5OTZhOTMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.6PskKhYDwvVlQxNSbXPaPFmnBrRaKMRp3UQdQa7i2KM",
    Accept: "application/json",
  },
});

export const fetchMovies = async (
  endpoint: string,
  page: number = 1
): Promise<PaginatedResponse> => {
  try {
    const response = await api.get(endpoint, {
      params: { language: "en-US", page },
    });
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

export const searchMovies = async (
  query: string,
  page: number = 1
): Promise<PaginatedResponse> => {
  try {
    const response = await api.get("/search/movie", {
      params: { query, language: "en-US", page },
    });
    return response.data;
  } catch (error) {
    console.error("Search Error:", error);
    throw error;
  }
};
