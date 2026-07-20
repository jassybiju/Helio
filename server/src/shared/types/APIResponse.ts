export type APIResponse<T> = {
  success: boolean;
  message: string;
  data?: T;
  error?: unknown | null;
};
