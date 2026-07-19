import { ModalProps } from "@/src/layout/ModalProvider";
import React from "react";
import { useGetDoctorQuery } from "../hooks/useGetDoctorQuery";
import { useUpdateDoctorMutation } from "../hooks/useUpdateDoctorMutation";
import { useForm } from "react-hook-form";
import {
  doctorUpdateProfileSchema,
  UpdateDoctorFormData,
} from "../../schemas/settings.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/src/components/ui/Input";
import ClayButton from "@/src/components/ui/ClayButton";
import { X } from "lucide-react";
import { useSpecialtyQuery } from "@/src/hooks/useSpecialtyQuery";

const UpdateDoctorProfileModal = ({ close }: ModalProps) => {
  // const [submitError, setSubmitError] = useState<string | null>(null);
  // const [submitSuccess, setSubmitSuccess] = useState(false);
  const { data: specialization } = useSpecialtyQuery();

  const { data } = useGetDoctorQuery();
  const { mutate: updateProfile, isPending: isSubmitting } =
    useUpdateDoctorMutation(close);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateDoctorFormData>({
    resolver: zodResolver(doctorUpdateProfileSchema),
    mode: "onBlur",
    defaultValues: data?.data as UpdateDoctorFormData,
  });

  if (!data) {
    close();
    return null;
  }

  const onSubmit = (data: UpdateDoctorFormData) => {
    updateProfile(data);
  };
  return (
    <div className="flex flex-col    bg-white rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 shrink-0 ">
        <h2 className="text-base font-semibold text-slate-900">
          {"Update Patient"}
        </h2>
        <button
          onClick={close}
          className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-500"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 px-6 py-4 border-b"
      >
        {/* Success Message */}
        {/* {submitSuccess && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-800 font-medium">
              Registration successful! Redirecting...
            </p>
          </div>
        )} */}

        {/* Error Message */}
        {/* {submitError && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800 font-medium">{submitError}</p>
          </div>
        )} */}

        {/* First Name & Last name */}
        <div className="grid  gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Full Name
            </label>
            <Input
              type="text"
              placeholder="Dr. Jane Doe"
              {...register("fullName")}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-slate-50 ${
                errors.fullName ? "border-red-500" : "border-slate-200"
              }`}
            />
            {errors.fullName && (
              <p className="text-red-600 text-sm mt-1">
                {errors.fullName.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid  gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Specialization
            </label>
            <select
              {...register("specialization")}
              className={`w-full px-4 py-3 border text-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-slate-50 ${
                errors.specialization ? "border-red-500" : "border-slate-200"
              }`}
            >
              <option value="">Select Specialization</option>
              {specialization?.data?.map((x) => (
                <option key={x.value} value={x.value}>
                  {x.label}
                </option>
              ))}
            </select>
            {errors.specialization && (
              <p className="text-red-600 text-sm mt-1">
                {errors.specialization.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid  gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Bio
            </label>
            <Input
              type="text"
              placeholder="Dr. Jane Doe"
              {...register("bio")}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-slate-50 ${
                errors.bio ? "border-red-500" : "border-slate-200"
              }`}
            />
            {errors.bio && (
              <p className="text-red-600 text-sm mt-1">{errors.bio.message}</p>
            )}
          </div>
        </div>
        {/* Email */}

        {/* Password Fields */}
        {/* <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Password
            </label>
            <Input
              type="password"
              placeholder="••••••••"
              {...register("password")}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-slate-50 ${
                errors.password ? "border-red-500" : "border-slate-200"
              }`}
            />
            {errors.password && (
              <p className="text-red-600 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Confirm Password
            </label>
            <Input
              type="password"
              placeholder="••••••••"
              {...register("confirmPassword")}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-slate-50 ${
                errors.confirmPassword ? "border-red-500" : "border-slate-200"
              }`}
            />
            {errors.confirmPassword && (
              <p className="text-red-600 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
        </div> */}

        {/* Create Account Button */}
        <div className="mt-8">
          <ClayButton
            variant="primary"
            size="lg"
            type="submit"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Updating Account..." : "Update Account"}
          </ClayButton>
        </div>
      </form>
    </div>
  );
};

export default UpdateDoctorProfileModal;
