'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { BlockDoctorSlotFormData, blockDoctorSlotSchema } from "../../schemas/block-slot.schema"
import { useDoctorBlockSlotMutation } from "./useDoctorBlockSlotMutation"
import { useDoctorBlockSlotQuery } from "./useDoctorBlockSlotQuery"
import { ColumnType } from "@/src/components/TableComponent"
import { IGetDoctorBlockSlotDTO } from "../../../services/slot.service"
import { Trash2 } from "lucide-react"

export const useDoctorBlockSlot = () => {
  const {register,handleSubmit, formState : {errors} } = useForm({resolver : zodResolver(blockDoctorSlotSchema)})
  const {data} = useDoctorBlockSlotQuery()

  const {mutate} = useDoctorBlockSlotMutation()
  const onSubmit = (data : BlockDoctorSlotFormData) => {
    mutate(data)
  }

  const column: ColumnType<IGetDoctorBlockSlotDTO> = [
    {
      key: "",
      title: "Day",
      render: (_value, row) => (
         <span className="text-slate-600">
          {new Date(row.startDate).toLocaleString()} - {new Date(row.endDate).toLocaleString()}
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
          onClick={() => console.log(row.id)}
          className="text-red-600 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      ),
    },
  ];

  // const data = []
  return {register, onSubmit : handleSubmit(onSubmit), column, data : data?.data, errors}
}