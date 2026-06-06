import { ModalProps } from "@/src/layout/ModalProvider";
import { Plus, X } from "lucide-react";
import React, { useState } from "react";
import { useDoctorAddPrescription } from "../hooks/useDoctorAddPrescriptionMutation";

const AddMedicineModal = ({ close, id }: ModalProps & { id: string }) => {
  console.log(1234);

  const [medicine, setMedicine] = useState<{
    name: string;
    foodTiming: 0 | 1;
    timings: { morning: boolean; afternoon: boolean; night: boolean };
    durationInDays: number;
    instruction: string | null;
  }>({
    name: "",
    timings: { morning: false, afternoon: false, night: false },
    durationInDays: 0,
    foodTiming: 0,
    instruction: null,
  });
  const { mutate: addMedicine } = useDoctorAddPrescription(id);
  const [error, setError] = useState("");
  const handleAddMedicine = () => {
    if (medicine.name.length === 0) {
      setError("Invalid Medicine Name");
      return;
    }

    if (
      !medicine.timings.afternoon &&
      !medicine.timings.morning &&
      !medicine.timings.night
    ) {
      setError("Select atleadt 1 timings");
      return;
    }

    if (medicine.durationInDays == 0) {
      setError("Duration should be greater than 0");
      return 0;
    }

    addMedicine(medicine);
  };

  const handleCloseMedicineModal = () => {
    close();
  };
  return (
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
          {error && (<p className="text-red-500">{error}</p>)}
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6 space-y-4">
        <h2 className="text-xl font-bold text-slate-900">Add Medicine</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-600 uppercase mb-2">
              Medicine Name
            </label>
            <input
              type="text"
              value={medicine.name}
              onChange={(e) =>
                setMedicine({ ...medicine, name: e.target.value })
              }
              placeholder="e.g. Lisinopril 10mg"
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-600 uppercase mb-3">
              Dosage timings
            </label>
            <div className="space-y-2">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={medicine.timings.morning}
                  onChange={(e) =>
                    setMedicine({
                      ...medicine,
                      timings: {
                        ...medicine.timings,
                        morning: e.target.checked,
                      },
                    })
                  }
                  className="w-4 h-4 accent-blue-600 cursor-pointer"
                />
                <span className="text-slate-900 font-medium">Morning</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={medicine.timings.afternoon}
                  onChange={(e) =>
                    setMedicine({
                      ...medicine,
                      timings: {
                        ...medicine.timings,
                        afternoon: e.target.checked,
                      },
                    })
                  }
                  className="w-4 h-4 accent-blue-600 cursor-pointer"
                />
                <span className="text-slate-900 font-medium">Afternoon</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={medicine.timings.night}
                  onChange={(e) =>
                    setMedicine({
                      ...medicine,
                      timings: { ...medicine.timings, night: e.target.checked },
                    })
                  }
                  className="w-4 h-4 accent-blue-600 cursor-pointer"
                />
                <span className="text-slate-900 font-medium">Night</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-600 uppercase mb-3">
              Food timings
            </label>
            <div className="space-y-2">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={medicine.foodTiming === 0}
                  onChange={() =>
                    setMedicine({
                      ...medicine,
                      foodTiming: 0,
                    })
                  }
                  className="w-4 h-4 accent-blue-600 cursor-pointer"
                />
                <span className="text-slate-900 font-medium">Before Food</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={medicine.foodTiming === 1}
                  onChange={() =>
                    setMedicine({
                      ...medicine,
                      foodTiming: 1,
                    })
                  }
                  className="w-4 h-4 accent-blue-600 cursor-pointer"
                />
                <span className="text-slate-900 font-medium">After Food</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-600 uppercase mb-2">
              Duration
            </label>
            <input
              type="text"
              value={medicine.durationInDays}
              onChange={(e) =>
                setMedicine({
                  ...medicine,
                  durationInDays: Number(e.target.value),
                })
              }
              placeholder="30 days"
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
            value={medicine.instruction ?? ""}
            onChange={(e) =>
              setMedicine({ ...medicine, instruction: e.target.value })
            }
            placeholder="e.g. Lisinopril 10mg"
            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex gap-2 justify-end pt-4 border-t border-slate-200">
          <button
            onClick={handleCloseMedicineModal}
            className="px-4 py-2 border border-slate-300 text-slate-900 font-semibold rounded-lg hover:bg-slate-100 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleAddMedicine}
            disabled={!medicine.name.trim()}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white font-semibold rounded-lg transition flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Add Medicine
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddMedicineModal;
