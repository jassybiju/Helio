import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

const isServer = typeof window === "undefined";

const apiClient = axios.create({
  baseURL: isServer
    ? process.env.SERVER_BACKEND_URL
    : process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: true,
});

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

//response interceptors : Handle 401 and Retry

let isRefreshing = false;
let failedQueue: {
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}[] = [];

const processQueue = (error: unknown) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve();
  });
  failedQueue = [];
};

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;
    console.log(
      "FIRST",
      originalRequest.url,
      error.response?.status,
      originalRequest._retry,
      originalRequest,
      error.response,
    );
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      originalRequest.url !== "/auth/refresh"
    ) {
      console.log("SECOND");
      originalRequest._retry = true;
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => {
            return apiClient(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }
      console.log("THIRD");

      isRefreshing = true;
      try {
        console.log("FORTH");

        // refresh token request using cookies
        await apiClient.post("/auth/refresh");
        console.log("FIFTH");

        isRefreshing = false;
        processQueue(null);
        return apiClient(originalRequest);
      } catch (refreshError) {
        console.log("SIXTh");

        isRefreshing = false;
        processQueue(refreshError);
        return Promise.reject(refreshError);
      } finally {
        console.log("SEVEN");

        isRefreshing = false;
      }
    }
    console.log("eIGTH");

    return Promise.reject(error);
  },
);

export const apiRequest = async <T>(
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  data?: unknown,
  params? : unknown
): Promise<T> => {
  console.log(isRefreshing);
  const response: AxiosResponse<T> = await apiClient({ method, url, data , params});
  console.log(response,params)
  return response.data;
};
