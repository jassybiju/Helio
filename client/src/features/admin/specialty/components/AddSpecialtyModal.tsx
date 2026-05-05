"use client";

import ClayButton from "@/src/components/ui/ClayButton";
import Input from "@/src/components/ui/Input";
import { X } from "lucide-react";
import React, { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useAddSpecialtyMutation } from "../hooks/useAddSpecialty";
import { ModalProps } from "@/src/layout/ModalProvider";


const AddSpecialtyModal = ({ close }: ModalProps) => {
  const [value, setValue] = useState("");

  const queryClient = useQueryClient();
  const { mutate, isPending } = useAddSpecialtyMutation();

  const handleSubmit = () => {
    if (!value.trim()) return;

    mutate(
      { name: value },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["specialties"] }); // ✅ refetch list
          close(); 
        },
      }
    );
  };

  return (
    <div className="flex flex-col bg-white rounded-2xl overflow-hidden w-[400px]">
      {/* Header */}
      <div className="flex w-full items-center justify-between px-6 py-4 border-b border-slate-200">
        <h2 className="text-base font-semibold text-slate-900">
          Add Specialty
        </h2>

        <button
          onClick={close}
          className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-500"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="p-6 text-black space-y-4">
        <div>
          <label className="text-sm font-medium">Specialty Name</label>
          <Input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>

        <ClayButton onClick={handleSubmit} disabled={isPending}>
          {isPending ? "Creating..." : "Submit"}
        </ClayButton>
      </div>
    </div>
  );
};

export default AddSpecialtyModal;