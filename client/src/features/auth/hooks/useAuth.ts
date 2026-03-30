import { AuthContext } from "@/src/layout/AuthProvider"
import { useContext } from "react"

export const useAuth = () => {
  
  return useContext(AuthContext)
}