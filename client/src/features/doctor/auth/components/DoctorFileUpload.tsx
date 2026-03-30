import React from 'react'
import { Path, UseFormRegister } from 'react-hook-form';
import { DoctorRegisterFormData } from '../schema/auth.schema';

type PropType = {
  name : Path<DoctorRegisterFormData>,
  register : UseFormRegister<DoctorRegisterFormData>,
  error? :string
}

const DoctorFileUpload : React.FC<PropType> = ({
   name , register, error 
}) => {
  return (
    <div className="flex flex-col gap-2 text-black">

      <input
        type="file"
        {...register(name)}
        className="border p-2 rounded text-gray-500"
      />

      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );  
}

export default DoctorFileUpload