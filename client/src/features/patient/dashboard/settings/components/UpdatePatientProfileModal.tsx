import ClayButton from "@/src/components/ui/ClayButton";
import Input from "@/src/components/ui/Input";
import { ModalProps } from "@/src/layout/ModalProvider";
import { X } from "lucide-react";
import React from "react";
import { useForm, useWatch } from "react-hook-form";
import {
  UpdatePatientFormData,
  updatePatientSchema,
} from "../../schemas/settings.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import DOBPicker from "@/src/components/ui/DOBPicker";
import { useGetPatientQuery } from "../hooks/useGetPatientQuery";
import { useUpdatePatientProfileMutation } from "../hooks/useUpdatePatientProfileMutation";

const UpdatePatientProfileModal = ({ close }: ModalProps) => {
  const { data } = useGetPatientQuery();
  const { mutate: updateProfile, isPending: isSubmitting } =
    useUpdatePatientProfileMutation(close);
  const toISO = (date: string) => {
    const [d, m, y] = date.split("/");
    return `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`;
  };
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    control,
  } = useForm<UpdatePatientFormData>({
    resolver: zodResolver(updatePatientSchema),
    mode: "onBlur",
    defaultValues: {
      ...data?.data,
      dob: data?.data.dob?.includes("/")
        ? toISO(data.data.dob)
        : data?.data.dob,
    } as UpdatePatientFormData,
  });

  const dobValue = useWatch({
    control,
    name: "dob",
  });
  if (!data) {
    close();
    return null;
  }

  const onSubmit = (data: UpdatePatientFormData) => {
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
        {/* First Name & Last name */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              First Name
            </label>
            <Input
              type="text"
              placeholder="Dr. Jane Doe"
              {...register("firstName")}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-slate-50 ${
                errors.firstName ? "border-red-500" : "border-slate-200"
              }`}
            />
            {errors.firstName && (
              <p className="text-red-600 text-sm mt-1">
                {errors.firstName.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Last Name
            </label>
            <Input
              type="text"
              placeholder="Dr. Jane Doe"
              {...register("lastName")}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-slate-50 ${
                errors.lastName ? "border-red-500" : "border-slate-200"
              }`}
            />
            {errors.lastName && (
              <p className="text-red-600 text-sm mt-1">
                {errors.lastName.message}
              </p>
            )}
          </div>
        </div>

        {/* Gender and DOB */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Gender
            </label>
            <select
              {...register("gender")}
              className={`w-full px-4 py-3 border text-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-slate-50 ${
                errors.gender ? "border-red-500" : "border-slate-200"
              }`}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && (
              <p className="text-red-600 text-sm mt-1">
                {errors.gender.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              DOB
            </label>
            <DOBPicker
              value={dobValue}
              onChange={(date) => setValue("dob", date)}
            />
            {errors.dob && (
              <p className="text-red-600 text-sm mt-1">{errors.dob.message}</p>
            )}
          </div>
        </div>

        {/* Email */}
        <div>
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Blood Group
            </label>
            <select
              {...register("bloodGroup")}
              className={`w-full px-4 py-3 border text-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-slate-50 ${
                errors.bloodGroup ? "border-red-500" : "border-slate-200"
              }`}
            >
              <option value="">Select Blood Group</option>
              <option value="A+">A+</option>
              <option value="B+">B+</option>
              <option value="other">Other</option>
            </select>
            {errors.bloodGroup && (
              <p className="text-red-600 text-sm mt-1">
                {errors.bloodGroup.message}
              </p>
            )}
          </div>
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-sm font-semibold text-slate-900 mb-2">
            Phone Number
          </label>
          <Input
            type="tel"
            placeholder="+1 (555) 000-0000"
            {...register("phone")}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-slate-50 ${
              errors.phone ? "border-red-500" : "border-slate-200"
            }`}
          />
          {errors.phone && (
            <p className="text-red-600 text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>

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

export default UpdatePatientProfileModal;
