import axios from 'axios';

const API_BASE_URL = 'https://api.themoviedb.org/3';
const BEARER_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNjlhYjI1ZGY2NGE1NWVjZGIwZDFhNzAzMWMwM2Y4NSIsIm5iZiI6MTc0NDAzOTgyNi41ODMwMDAyLCJzdWIiOiI2N2YzZWY5MjFiYjA0NzI4OTk5OTZhOTMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.6PskKhYDwvVlQxNSbXPaPFmnBrRaKMRp3UQdQa7i2KM';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Bearer ${BEARER_TOKEN}`,
    Accept: 'application/json',
  },
});

export const fetchMovies = async (endpoint: string) => {
  try {
    const response = await api.get(endpoint, { params: { language: 'en-US', page: 1 } });
    return response.data.results;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};