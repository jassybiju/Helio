import { useQueryClient } from "@tanstack/react-query";
import { authService } from "../service/auth.service";
import { useRouter } from "next/navigation";

export const useLogout = () => {
  const queryClient = useQueryClient()
  const router = useRouter()
  
  const logout = async () => {
  try {
        await authService.logout();
        queryClient.setQueriesData({queryKey : ['me']},null)
        queryClient.removeQueries({queryKey : ['me']})

        console.log("REMVOED CACHE")
        router.push("/login");
      } catch (err) {
        alert("Failed to logout");
      }
    }

    return {logout}
}