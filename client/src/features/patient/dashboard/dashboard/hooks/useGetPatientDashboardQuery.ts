import { useQuery } from "@tanstack/react-query"
import { patientDashboardService } from "../../../services/dashboard.service"

export const useGetPatientDashboardQuery = () => {
    return useQuery({
        queryKey : ['dashboard'],
        queryFn : ()=>patientDashboardService.getDashboard()
    })
}