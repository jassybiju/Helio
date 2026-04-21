import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { doctorProfileService } from "../../../services/profile.service";

export const useChangePasswordMutation = () => {
  return useMutation({
    mutationFn: ({
      newPassword,
      oldPassword,
    }: {
      newPassword: string;
      oldPassword: string;
    }) => doctorProfileService.changePassword({ newPassword, oldPassword }),
    onSuccess: () => {
      toast.success("Password Changed Successfuly");
    },
    onError() {
      toast.error("Error in changing password");
    },
  });
};
