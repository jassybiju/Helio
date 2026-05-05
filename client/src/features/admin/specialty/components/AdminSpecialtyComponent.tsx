"use client";

import TableComponent, { ColumnType } from "@/src/components/TableComponent";
import React from "react";
import { useSpecialtyQuery } from "../hooks/useSpecialtyQuery";
import { useAddSpecialtyMutation } from "../hooks/useAddSpecialty";
import { useModal } from "@/src/hooks/useModal";
import AddSpecialtyModal from "./AddSpecialtyModal";
import ClayButton from "@/src/components/ui/ClayButton";
import { DeleteIcon, Trash2 } from "lucide-react";
import { useDeleteSpecialtyMutation } from "../hooks/useDeleteSpecialty";

const AdminSpecialtyComponent = () => {
  const { data } = useSpecialtyQuery();
  const { mutate: deleteSpecialty } = useDeleteSpecialtyMutation();
  const { open } = useModal();
  const specialty = data;
  const columns: ColumnType<{ _id: string; name: string }> = [
    {
      key: "",
      title: "ID",
      render: (_x, _r, _d, i) => i + 1,
    },
    {
      key: "label",
      title: "SPecialyt",
      render: (x) => x,
    },
    {
      key: "_id",
      title: "SPecialyt",
      render: (x) =><div onClick={()=>handleDelete(x)} className=" flex text-center justify-center"> <Trash2 color="red"/></div>,
    },
  ];

  const handleDelete = (id : string) => {
    deleteSpecialty(id)
  }
  const handleOpenAddSpecialty = () => {
    open(AddSpecialtyModal);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900">
          Specialty Management
        </h2>
        <p className="text-slate-600 mt-1">Total registered patients</p>
      </div>
      <ClayButton onClick={handleOpenAddSpecialty}>Add Specialty</ClayButton>

      <TableComponent data={specialty?.data} columns={columns} />
    </div>
  );
};

export default AdminSpecialtyComponent;
