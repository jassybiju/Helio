import React from 'react'
import { UseFormRegister } from 'react-hook-form';

type PropType = {
  label : string,
  name : string,
  register : UseFormRegister<any>,
  error? :string
}

const DoctorFileUpload : React.FC<PropType> = ({
  label, name , register, error 
}) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-medium">{label}</label>

      <input
        type="file"
        {...register(name)}
        className="border p-2 rounded"
      />

      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );  
}

export default DoctorFileUpload