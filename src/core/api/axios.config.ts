import axios, { type AxiosInstance } from "axios";
import camelcaseKeys from "camelcase-keys";

const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// make every key camelCase
apiClient.interceptors.response.use(
  (response) => {
    if (response.data && response.headers['Content-Type'] === 'application/json') {
      response.data = camelcaseKeys(response.data)
    }

    return response
  }
)

export { apiClient }
