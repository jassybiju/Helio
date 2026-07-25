import { ModalProps } from "@/src/layout/ModalProvider";
import { Plus, X } from "lucide-react";
import { useState } from "react";
import useDoctorAddTestMutation from "../hooks/useDoctorAddTestMutation";

export const AddLabReportModal = ({close ,id} : ModalProps & {id : string}) => {
  const [test, setTest] = useState({ name: "", instructions: "" });
  // const [error, setError] = useState();
  const {mutate} = useDoctorAddTestMutation(id)
  const handleAddTest = () => {
    mutate({testName : test.name, instructions : test.instructions})
  }

  const handleCloseTestModal = () => close()
  return (
    <>
      {" "}
      <div className="flex flex-col inset-0  bg-opacity-50 flex items-center justify-center z-50">
        <div className="w-full flex items-center justify-between px-6 py-4 border-b border-slate-200 shrink-0 ">
          <h2 className="text-base font-semibold text-slate-900">
            {"Add Medicine"}
          </h2>
          <button
            onClick={close}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-500"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        {/* {error && <p className="text-red-500">{error}</p>} */}
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6 space-y-4">
          <h2 className="text-xl font-bold text-slate-900">Add Medicine</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-600 uppercase mb-2">
                Test Name
              </label>
              <input
                type="text"
                value={test.name}
                onChange={(e) => setTest({ ...test, name: e.target.value })}
                placeholder="e.g. Lisinopril 10mg"
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-600 uppercase mb-2">
              instruction
            </label>
            <input
              type="text"
              value={test.instructions ?? ""}
              onChange={(e) =>
                setTest({ ...test, instructions: e.target.value })
              }
              placeholder="e.g. Lisinopril 10mg"
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex gap-2 justify-end pt-4 border-t border-slate-200">
            <button
              onClick={handleCloseTestModal}
              className="px-4 py-2 border border-slate-300 text-slate-900 font-semibold rounded-lg hover:bg-slate-100 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleAddTest}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white font-semibold rounded-lg transition flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> Add Medicine
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
