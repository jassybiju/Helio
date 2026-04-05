import { useDoctorVerificationDetails } from "./useDoctorVerificationDetails"

export const useDoctorPendingApproval = () => {
  const {data } = useDoctorVerificationDetails()
 
  const {
    verification_history=[],
    verification_status,
    rejection_reason,
    document_url
  } = data?.data || {}

  return {
    verification_history,
    verification_status,
    rejection_reason,
    document_url
  }

}