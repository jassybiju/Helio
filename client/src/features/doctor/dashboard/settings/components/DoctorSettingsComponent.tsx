"use client";

import { CreditCard, Eye, EyeOff, Lock, User } from "lucide-react";
import React, { ChangeEvent, useRef, useState } from "react";
import { useGetDoctorQuery } from "../hooks/useGetDoctorQuery";
import { useUpdateDoctorFeeMutation } from "../hooks/useUpdateDoctorFeeMutation";
import ClayButton from "@/src/components/ui/ClayButton";
import { useModal } from "@/src/hooks/useModal";
import UpdateDoctorProfileModal from "./UpdateDoctorProfileModal";
import { useChangePasswordMutation } from "../hooks/useChangePasswordMutation";
import { useForm } from "react-hook-form";
import { UpdateProfilePicModal } from "../../../../../components/UpdateProfilePicModal";
import { useUpdateDoctorProfilePicMutation } from "../hooks/useUpdateDoctorProfilePicMutation";

type FeeFormData = {
  clinicFee: string;
  onlineFee: string;
};

const DoctorSettingsComponent = () => {
  const { data } = useGetDoctorQuery();
  const { mutate: updateFee } = useUpdateDoctorFeeMutation();
  const { mutate: changePassword } = useChangePasswordMutation();
  const { mutate: updateProfilePic } = useUpdateDoctorProfilePicMutation();
  const { register, handleSubmit } = useForm<FeeFormData>({
    values: {
      clinicFee: data?.data.clinicFee?.toString() || "",
      onlineFee: data?.data.onlineFee?.toString() || "",
    },
  });
  const [profilePic, setProfilePic] = useState<null | string>(null);
  const { open } = useModal();
  const DOCTOR = data?.data;
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  // const feeData = fee ?? {
  //   clinicFee: data?.data?.clinicFee || 0,
  //   onlineFee: data?.data?.onlineFee || 0,
  // };

  const handleOpenUpdateModal = () => {
    open(UpdateDoctorProfileModal);
  };

  const imageUploadRef = useRef<null | HTMLInputElement>(null);
  const handleUpdateProfilePic = (e: ChangeEvent<HTMLInputElement>) => {
    // imageUploadRef.current?.click()
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    open(UpdateProfilePicModal, {
      onImageSave: async (image: string) => {
        const file = await fetch(image).then(r => r.blob())
        updateProfilePic(file);
      },
      currentImage: URL.createObjectURL(file),
    });
  };
  if (!data) {
    return null;
  }

  const handleUpdateFee = (formData: FeeFormData) => {
    updateFee({
      clinicFee: Number(formData.clinicFee),
      onlineFee: Number(formData.onlineFee),
    });
  };

  const handleChangePassword = () => {
    if (passwordData.newPassword === passwordData.confirmPassword) {
      changePassword({
        newPassword: passwordData.newPassword,
        oldPassword: passwordData.currentPassword,
      });
    }
  };

  return (
    <div className="space-y-8 mx-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Profile & Settings
        </h1>
        <p className="text-slate-600">
          Manage your professional presence and account security.
        </p>
      </div>

      {/* Doctor Profile Card */}
      <div className="bg-white rounded-lg border border-slate-200 p-8">
        <div className="flex items-start gap-6">
          <div className="relative flex-shrink-0 group">
            <div className="w-32 h-32 bg-teal-500 rounded-full overflow-hidden flex items-center  justify-center text-white">
              {DOCTOR?.profilePic ? (
                <img className='w-full h-full' src={DOCTOR?.profilePic} />
              ) : (
                <svg
                  className="w-16 h-16"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
                </svg>
              )}
              <label
                // onClick={handleUpdateProfilePic}
                className={`absolute w-full h-full bg-gray-50/50 justify-between items-center  rounded-full px-2 py-1 text-black group-hover:flex hidden`}
              >
                Upload Image
                <input
                  type="file"
                  ref={imageUploadRef}
                  onChange={handleUpdateProfilePic}
                  id=""
                  className="hidden w-full h-full"
                />
              </label>
            </div>
            <div className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 rounded-full border-2 border-white flex items-center justify-center text-white text-sm">
              ✓
            </div>
          </div>

          <div className="flex-1 space-y-2">
            <h2 className="text-2xl font-bold text-slate-900">
              {DOCTOR?.fullName}
            </h2>
            <div className="flex items-center gap-2 text-blue-600">
              <CreditCard className="w-4 h-4" />
              <span className="font-medium">{DOCTOR?.specialization}</span>
            </div>
            <div className="flex items-center gap-4 text-slate-600 text-sm">
              <div className="flex items-center gap-1">
                <span>✉</span>
                <span>{DOCTOR?.email}</span>
              </div>
              <div className="flex items-center gap-1">
                <span>📞</span>
                <span>{DOCTOR?.phone}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Personal Information */}
          <div className="bg-white rounded-lg border border-slate-200 p-8 space-y-6">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-blue-600" />
              <h3 className="text-xl font-bold text-slate-900">
                Personal Information
              </h3>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-600 uppercase">
                Full Name
              </label>
              <input
                readOnly
                type="text"
                value={DOCTOR?.fullName ?? ""}
                className="mt-2 w-full px-4 py-2 border border-slate-200 rounded-lg bg-slate-50 text-slate-600 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-600 uppercase">
                Specialization
              </label>
              <input
                readOnly
                type="text"
                value={DOCTOR?.specialization ?? ""}
                className="mt-2 w-full px-4 py-2 border border-slate-200 rounded-lg bg-slate-50 text-slate-600 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-600 uppercase">
                Bio
              </label>
              <textarea
                readOnly
                value={DOCTOR?.bio ?? ""}
                rows={4}
                className="mt-2 w-full px-4 py-2 border border-slate-200 rounded-lg bg-slate-50 text-slate-600 cursor-not-allowed resize-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-600 uppercase">
                Years of Experience
              </label>
              <div className="mt-2 flex items-center gap-4">
                <input
                  readOnly
                  type="number"
                  value={DOCTOR?.yearsOfExperience ?? ""}
                  className="w-32 px-4 py-2 border border-slate-200 rounded-lg bg-slate-50 text-slate-600 cursor-not-allowed"
                />
                <div className="flex items-center gap-2 text-green-600">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                  <span className="text-sm font-medium">
                    Verified professional experience
                  </span>
                </div>
              </div>
              <ClayButton onClick={handleOpenUpdateModal}>
                Update Profile
              </ClayButton>
            </div>
          </div>

          {/* Consultation Fees */}
          <div className="bg-white rounded-lg border border-slate-200 p-8 space-y-6">
            <div className="flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-blue-600" />
              <h3 className="text-xl font-bold text-slate-900">
                Consultation Fees
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="text-xs font-semibold text-slate-600 uppercase">
                  Online Fee ($)
                </label>
                <input type="number" {...register("onlineFee")} />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-600 uppercase">
                  Clinic Fee ($)
                </label>
                <input type="number" {...register("clinicFee")} />
              </div>
            </div>

            <ClayButton onClick={handleSubmit(handleUpdateFee)}>
              Update Fee
            </ClayButton>
          </div>
        </div>

        {/* Security Section */}
        <div className="bg-white rounded-lg border border-slate-200 p-8 space-y-6 h-fit">
          <div className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-blue-600" />
            <h3 className="text-xl font-bold text-slate-900">Security</h3>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-600 uppercase">
              Current Password
            </label>
            <div className="relative mt-2">
              <input
                type={showPasswords.current ? "text" : "password"}
                value={passwordData.currentPassword}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    currentPassword: e.target.value,
                  })
                }
                className="w-full px-4 py-2 border border-slate-200 rounded-lg"
              />

              <button
                onClick={() =>
                  setShowPasswords({
                    ...showPasswords,
                    current: !showPasswords.current,
                  })
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
              >
                {showPasswords.current ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-600 uppercase">
              New Password
            </label>
            <div className="relative mt-2">
              <input
                type={showPasswords.new ? "text" : "password"}
                value={passwordData.newPassword}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    newPassword: e.target.value,
                  })
                }
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={() =>
                  setShowPasswords({
                    ...showPasswords,
                    new: !showPasswords.new,
                  })
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
              >
                {showPasswords.new ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-600 uppercase">
              Confirm New Password
            </label>
            <div className="relative mt-2">
              <input
                type={showPasswords.confirm ? "text" : "password"}
                value={passwordData.confirmPassword}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    confirmPassword: e.target.value,
                  })
                }
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={() =>
                  setShowPasswords({
                    ...showPasswords,
                    confirm: !showPasswords.confirm,
                  })
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
              >
                {showPasswords.confirm ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          <button
            onClick={handleChangePassword}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <Lock className="w-4 h-4" />
            Update Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorSettingsComponent;
