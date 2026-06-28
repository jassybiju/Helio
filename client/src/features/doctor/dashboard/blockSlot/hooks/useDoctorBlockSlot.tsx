"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  BlockDoctorSlotFormData,
  blockDoctorSlotSchema,
} from "../../schemas/block-slot.schema";
import { useDoctorBlockSlotMutation } from "./useDoctorBlockSlotMutation";
import { useDoctorBlockSlotQuery } from "./useDoctorBlockSlotQuery";
import { ColumnType } from "@/src/components/TableComponent";
import { IGetDoctorBlockSlotDTO } from "../../../services/slot.service";
import { Trash2 } from "lucide-react";
import { useDoctorDeleteBlockSlotMutation } from "./useDoctorDeleteBlockSlotMutation";
import { toast } from "react-toastify";
import { isAxiosError } from "axios";
import { useModal } from "@/src/hooks/useModal";
import DoctorBlockSlotConflictModal from "../components/DoctorBlockSlotConflictModal";
import { invalidateQuery } from "@/src/libs/queryClient";

export const useDoctorBlockSlot = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(blockDoctorSlotSchema) });
  const { data } = useDoctorBlockSlotQuery();

  const { mutate } = useDoctorBlockSlotMutation();
  const { mutate: deleteSlot } = useDoctorDeleteBlockSlotMutation();

  const {open} = useModal()

  const onSubmit = (data: BlockDoctorSlotFormData) => {
    console.log(123)
    mutate(data,{onError(error){
      if(isAxiosError(error)){
        toast.error(error.response?.data.message)
        if(error.response?.data?.error?.appointments){
          console.log(error.response.data.error.appointments)
          open(DoctorBlockSlotConflictModal,{appointments : error.response.data.error.appointments, blockDetails : error.response.data.error.blockDetails})
          toast.error(error.response.data.error.reason)
        }
      }
    }, onSuccess : ()=>{
      toast.success("BLOCK SLOT SUCCESSFULY")
      invalidateQuery("block-slot")
    }});


  };

  const column: ColumnType<IGetDoctorBlockSlotDTO> = [
    {
      key: "",
      title: "Day",
      render: (_value, row) => (
        <span className="text-slate-600">
          {new Date(row.startDate).toLocaleString()} -{" "}
          {new Date(row.endDate).toLocaleString()}
        </span>
      ),
    },

    {
      key: "reason",
      title: "Reason",
      render: (_value, row) => (
        <span className="text-slate-600">
          {row.reason !== "" ? row.reason : "—"}
        </span>
      ),
    },
    {
      key: "id",
      title: "Actions",
      render: (_value, row) => (
        <button
          onClick={() => deleteSlot(row.id)}
          className="text-red-600 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      ),
    },
  ];

  // const data = []
  return {
    register,
    onSubmit: handleSubmit(onSubmit),
    column,
    data: data?.data,
    errors,
  };
};
