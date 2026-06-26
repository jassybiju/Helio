import { useMutation } from "@tanstack/react-query";
import { doctorProfileService } from "../../../services/profile.service";
import { toast } from "react-toastify";

export const useUpdateDoctorProfilePicMutation = () => {
  return useMutation({
    mutationFn: (file: Blob) => doctorProfileService.updateProfilePic(file),
    onSuccess(){
      toast.success("UPDATE PROFILE SUCCESSFUL")
    }
  });
};
