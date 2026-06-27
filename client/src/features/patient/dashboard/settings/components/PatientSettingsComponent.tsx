"use client";

import { Eye, EyeOff, Heart, Lock, X } from "lucide-react";
import React, { ChangeEvent, useRef, useState } from "react";
import { useGetPatientQuery } from "../hooks/useGetPatientQuery";
import { PatientProfileType } from "../../../services/profile.service";
import {
  useAddAllergenMutation,
  useRemoveAllergenMutation,
} from "../hooks/useAllergenMutations";
import {
  useAddConditionMutation,
  useRemoveConditionMutation,
} from "../hooks/useConditionMutation";
import { useChangePasswordMutation } from "../hooks/useChangePasswordMutation";
import { useModal } from "@/src/hooks/useModal";
import UpdatePatientProfileModal from "./UpdatePatientProfileModal";
import { UpdateProfilePicModal } from "@/src/components/UpdateProfilePicModal";
import { useUpdatePatientProfilePicMutation } from "../hooks/useUpdatePatientProfilePicMutation";

const PatientSettingsComponent = () => {
  const { data, isLoading } = useGetPatientQuery();
  const { mutate: addAllergen } = useAddAllergenMutation();
  const { mutate: removeAllergen } = useRemoveAllergenMutation();
  const { mutate: addCondition } = useAddConditionMutation();
  const { mutate: removeCondition } = useRemoveConditionMutation();
  const { mutate: changePassword } = useChangePasswordMutation();
  const { mutate: updateProfilePic } = useUpdatePatientProfilePicMutation();
  const { open } = useModal();
  const PERSON = data?.data ?? ({} as PatientProfileType);

  const [allergyInput, setAllergyInput] = useState("");

  const [conditionInput, setConditionInput] = useState("");

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPasswords, setShowPasswords] = useState({
    old: false,
    new: false,
    confirm: false,
  });
  const imageUploadRef = useRef<null | HTMLInputElement>(null);

  const handleUpdateProfilePic = (e: ChangeEvent<HTMLInputElement>) => {
    // imageUploadRef.current?.click()
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    open(UpdateProfilePicModal, {
      onImageSave: async (image: string) => {
        const file = await fetch(image).then((r) => r.blob());
        console.log(image, file, "1232d", typeof image);
        updateProfilePic(file);
      },
      currentImage: URL.createObjectURL(file),
    });
  };
  if (isLoading) return null;

  const handleUpdateModel = () => {
    open(UpdatePatientProfileModal, { patientData: PERSON, a: "hi" });
  };

  const handleAddAllergy = () => {
    if (allergyInput.trim()) {
      addAllergen({ allergen: allergyInput, severity: "LOW" });
      setAllergyInput("");
    }
  };

  const handleRemoveAllergy = (allergyId: string) => {
    removeAllergen(allergyId);
  };

  const handleAddCondition = () => {
    if (conditionInput.trim()) {
      addCondition(conditionInput);
      setConditionInput("");
    }
  };

  const handleRemoveCondition = (conditionId: string) => {
    removeCondition(conditionId);
  };

  const getPasswordStrength = (password: string) => {
    if (password.length < 6) return { label: "WEAK", color: "bg-red-500" };
    if (password.length < 10)
      return { label: "MEDIUM", color: "bg-yellow-500" };
    return { label: "STRONG", color: "bg-green-500" };
  };

  const handleChangePassword = () => {
    if (passwordData.newPassword === passwordData.confirmPassword) {
      changePassword({
        newPassword: passwordData.newPassword,
        oldPassword: passwordData.oldPassword,
      });
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Account Settings</h1>
        <p className="text-slate-600">
          Manage your health profile and portal security preferences.
        </p>
      </div>

      {/* Personal Information */}
      <div className="bg-white rounded-lg border border-slate-200 p-8 space-y-8">
        <div className="flex items-start gap-6">
          {/* Profile Photo */}
          <div className="space-y-2 text-center">
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center relative group">
              {PERSON?.profilePic ? (
                <img src={PERSON?.profilePic} />
              ) : (
                <svg
                  className="w-16 h-16"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
                </svg>
              )}{" "}
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
              <button className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 rounded-full text-white flex items-center justify-center text-sm">
                ✓
              </button>
            </div>
            <p className="text-xs text-slate-600">PROFILE PHOTO</p>
            <p className="text-xs text-slate-500">JPG, PNG up to 5MB</p>
          </div>

          {/* Form Fields */}
          <div className="flex-1 grid grid-cols-2 gap-6">
            <div>
              <label className="text-xs font-semibold text-slate-600 uppercase">
                First Name
              </label>
              <input
                type="text"
                value={PERSON.firstName}
                readOnly
                // onChange={(e) =>
                //   setFormData({ ...formData, fullName: e.target.value })
                // }
                className="mt-2 w-full px-4 py-2 border border-slate-200 rounded-lg"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 uppercase">
                Last Name
              </label>
              <input
                readOnly
                type="text"
                value={PERSON.lastName ?? ""}
                className="mt-2 w-full px-4 py-2 border border-slate-200 rounded-lg"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 uppercase">
                Date of Birth
              </label>
              <input
                readOnly
                type="text"
                value={PERSON.dob ?? ""}
                className="mt-2 w-full px-4 py-2 border border-slate-200 rounded-lg"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 uppercase">
                Blood Group
              </label>
              <input
                readOnly
                value={PERSON.bloodGroup ?? ""}
                className="mt-2 w-full px-4 py-2 border border-slate-200 rounded-lg"
              ></input>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 uppercase">
                Gender
              </label>
              <input
                readOnly
                value={PERSON.gender ?? ""}
                className="mt-2 w-full px-4 py-2 border border-slate-00 rounded-lg"
              ></input>
            </div>
            {/* <div className="col-span-2">
              <label className="text-xs font-semibold text-slate-600 uppercase">
                Location
              </label>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-slate-400">📍</span>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg"
                />
              </div> */}
            {/* </div> */}
            <div className="col-span-2">
              <label className="text-xs font-semibold text-slate-600 uppercase">
                Email Address
              </label>
              <input
                readOnly
                type="email"
                value={PERSON.email}
                className="mt-2 w-full px-4 py-2 border border-slate-200 rounded-lg"
              />
            </div>
            <div className="col-span-2">
              <label className="text-xs font-semibold text-slate-600 uppercase">
                Phone Number
              </label>
              <input
                readOnly
                type="tel"
                value={PERSON.phone ?? ""}
                className="mt-2 w-full px-4 py-2 border border-slate-200 rounded-lg"
              />
            </div>
          </div>
        </div>

        <button
          onClick={handleUpdateModel}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-full"
        >
          Update Profile
        </button>
      </div>

      {/* Medical Preferences */}
      <div className="bg-white rounded-lg border border-slate-200 p-8 space-y-6">
        <div className="flex items-center gap-2">
          <Heart className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl font-bold text-slate-900">
            Medical Preferences
          </h2>
        </div>

        {/* Known Allergies */}
        <div>
          <label className="text-xs font-semibold text-slate-600 uppercase">
            Known Allergies
          </label>
          <div className="mt-3 flex flex-wrap gap-2">
            {PERSON.allergens.map((allergy) => (
              <button
                key={allergy._id}
                onClick={() => handleRemoveAllergy(allergy._id)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium hover:bg-blue-200"
              >
                {allergy.name}
                <X className="w-4 h-4" />
              </button>
            ))}
          </div>
          <div className="mt-4 flex gap-2">
            <input
              type="text"
              value={allergyInput}
              onChange={(e) => setAllergyInput(e.target.value)}
              placeholder="Add an allergy (e.g. Dust)"
              className="flex-1 px-4 py-2 border border-slate-200 rounded-lg"
              onKeyPress={(e) => e.key === "Enter" && handleAddAllergy()}
            />
            <button
              onClick={handleAddAllergy}
              className="px-4 py-2 text-blue-600 font-medium hover:text-blue-700"
            >
              Add
            </button>
          </div>
        </div>

        {/* Chronic Conditions */}
        <div>
          <label className="text-xs font-semibold text-slate-600 uppercase">
            Chronic Conditions
          </label>
          <div className="mt-3 flex flex-wrap gap-2">
            {PERSON.conditions.map((condition) => (
              <button
                key={condition._id}
                onClick={() => handleRemoveCondition(condition._id)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium hover:bg-blue-200"
              >
                {condition.name}
                <X className="w-4 h-4" />
              </button>
            ))}
          </div>
          <div className="mt-4 flex gap-2">
            <input
              type="text"
              value={conditionInput}
              onChange={(e) => setConditionInput(e.target.value)}
              placeholder="Add a condition (e.g. Type 2 Diabetes)"
              className="flex-1 px-4 py-2 border border-slate-200 rounded-lg"
              onKeyPress={(e) => e.key === "Enter" && handleAddCondition()}
            />
            <button
              onClick={handleAddCondition}
              className="px-4 py-2 text-blue-600 font-medium hover:text-blue-700"
            >
              Add
            </button>
          </div>
        </div>
      </div>

      {/* Change Password */}
      <div className="bg-white rounded-lg border border-slate-200 p-8 space-y-6">
        <div className="flex items-center gap-2">
          <Lock className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl font-bold text-slate-900">Change Password</h2>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-600 uppercase">
              Old Password
            </label>
            <div className="relative mt-2">
              <input
                type={showPasswords.old ? "text" : "password"}
                value={passwordData.oldPassword}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    oldPassword: e.target.value,
                  })
                }
                className="w-full px-4 py-2 border border-slate-200 rounded-lg"
              />
              <button
                onClick={() =>
                  setShowPasswords({
                    ...showPasswords,
                    old: !showPasswords.old,
                  })
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
              >
                {showPasswords.old ? (
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
                className="w-full px-4 py-2 border border-slate-200 rounded-lg"
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
                className="w-full px-4 py-2 border border-slate-200 rounded-lg"
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

            {/* Password Strength */}
            {passwordData.newPassword && (
              <div className="mt-3 space-y-1">
                <div className="flex gap-1 h-2">
                  <div
                    className={`flex-1 rounded-full ${getPasswordStrength(passwordData.newPassword).color}`}
                  />
                  {passwordData.newPassword.length >= 10 && (
                    <div className="flex-1 rounded-full bg-green-500" />
                  )}
                  {passwordData.newPassword.length >= 15 && (
                    <div className="flex-1 rounded-full bg-green-500" />
                  )}
                </div>
                <p
                  className={`text-xs font-semibold ${
                    getPasswordStrength(passwordData.newPassword).label ===
                    "STRONG"
                      ? "text-green-600"
                      : getPasswordStrength(passwordData.newPassword).label ===
                          "MEDIUM"
                        ? "text-yellow-600"
                        : "text-red-600"
                  }`}
                >
                  STRENGTH:{" "}
                  {getPasswordStrength(passwordData.newPassword).label}
                </p>
              </div>
            )}
          </div>
        </div>

        <button
          onClick={handleChangePassword}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-full"
        >
          Update Password
        </button>
      </div>
    </div>
  );
};

export default PatientSettingsComponent;
