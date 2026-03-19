import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials : true
});

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}


apiClient.interceptors.response.use(
  (response) => response,
  async(error : AxiosError) => {
    const originalRequest  = error.config as CustomAxiosRequestConfig

    if(error.response?.status === 401 && !originalRequest._retry){
      originalRequest._retry = true
      
      try{
        await apiClient.post("/v1/api/auth/refresh");

        return apiClient(originalRequest)
      }catch(refreshError){
        console.error('Session expired. Please login again')
      }
    }
    return Promise.reject(error)
  }
)

export const apiRequest = async <T>(
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  data?: unknown,
): Promise<T> => {
  console.log(process.env.NEXT_PUBLIC_BACKEND_URL)
  const response: AxiosResponse<T> = await apiClient({ method, url, data });
  return response.data;
};
