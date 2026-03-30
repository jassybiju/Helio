import React from "react";

type PropType = {
  value : string,
  onChange : React.ChangeEventHandler<HTMLSelectElement>,
  title : string,
  children : React.ReactNode
}

const AdminFilterSelect = ({value, onChange,title, children} : PropType) => {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-900 mb-2">
        {title}
      </label>
      <select
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
      >
        {children}
      </select>
    </div>
  );
};

export default AdminFilterSelect;
