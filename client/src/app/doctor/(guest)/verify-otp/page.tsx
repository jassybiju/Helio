import DoctorVerifyOTP from "@/src/features/doctor/auth/components/DoctorVerifyOTP";
import { redirect } from "next/navigation";

type Props = {
  searchParams: Promise<{ [key: string]: string }>;
};

const DoctorVerifyOTPPage = async ({ searchParams }: Props) => {
  const params = await searchParams;
  const id = params.otpId;
  const expires = params.expires;

  if (!id) {
    redirect("/doctor/register");
  }
  return <DoctorVerifyOTP id={id} expires={expires as string} />;
};

export default DoctorVerifyOTPPage;
