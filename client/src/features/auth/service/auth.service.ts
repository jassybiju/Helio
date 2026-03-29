import { apiRequest } from "@/src/libs/axios.config";
import { APIResponse, HTTP_METHOD } from "@/src/types/API.types";
import { USER_DATA } from "@/src/types/user.types";
import { AxiosError } from "axios";

export const authService = {
  async getMe() {
    try {
      const res = (await apiRequest(
        "/auth/get-me",
        HTTP_METHOD.GET,
      )) as APIResponse<USER_DATA>;
      console.log(res);
      return res;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
};
