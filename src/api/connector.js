import axios from 'axios';
import { API_KEY, API_URL } from '../settings';

// Axios instance configured with base URL and headers for API requests.
const caller = axios.create({
  baseURL: API_URL,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Client-ID ${API_KEY}`,
  },
});

/* Makes a GET request to the specified API endpoint with the provided parameters. */
export const callAPI = async (endpoint, params) => {
  return await caller.get(endpoint, { params });
};

export default callAPI;
