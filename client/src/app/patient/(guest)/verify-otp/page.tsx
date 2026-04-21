import PatientVerifyOTP from "@/src/features/patient/auth/components/PatientVerifyOTP";
import { redirect } from "next/navigation";

type Props = {
  searchParams: Promise<{ [key: string]: string }>;
};

const PatientVerifyOTPPage = async ({ searchParams }: Props) => {
  const params = await searchParams;
  const id = params.otpId;
  const expires = params.expires;

  if (!id) {
    redirect("/doctor/register");
  }
  console.log(expires);
  return <PatientVerifyOTP id={id} expires={expires as string} />;
};

export default PatientVerifyOTPPage;
