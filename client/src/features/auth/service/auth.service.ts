import { apiRequest } from "@/src/libs/axios.config";
import { APIResponse, HTTP_METHOD } from "@/src/types/API.types";
import { USER_DATA } from "@/src/types/user.types";

export const authService = {
  async getMe() {
    const res = (await apiRequest(
      "/auth/get-me",
      HTTP_METHOD.GET,
    )) as APIResponse<USER_DATA>;
    console.log(res);
    return res;
  },

  async logout() {
    console.log("logged out")
    await apiRequest("/auth/logout", HTTP_METHOD.POST);
  },
};
