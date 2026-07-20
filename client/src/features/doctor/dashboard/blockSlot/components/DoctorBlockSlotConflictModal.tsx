import { ModalProps } from "@/src/layout/ModalProvider";
import { AlertTriangle, Check, X } from "lucide-react";
import { useDoctorBlockSlotMutation } from "../hooks/useDoctorBlockSlotMutation";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";
import { invalidateQuery } from "@/src/libs/queryClient";
type DoctorBlockSlotConflictType = {
  appointments: {appointmentId : string, date : string, patientName : string, type : string}[];
  blockDetails: {startTime : string, endTime : string, reason : string};
};
const DoctorBlockSlotConflictModal = ({
  close,
  appointments,
  blockDetails,
}: ModalProps & DoctorBlockSlotConflictType) => {
  // const [overlapModal, setOverlapModal] = useState({
  //   isOpen: true,
  //   conflicts: [
  //     {
  //       appointmentId: "AP_rAz5bov-AlUt",
  //       patientName: "HPTR",
  //       appointmentTime: "123",
  //       appointmentType: "online",
  //     },
  //   ],
  //   blockData: {
  //     date: "1.1.2303",
  //     startTime: "10:20",
  //     endTime: "10:20",
  //     reason: ";fkasdfl",
  //   },
  // });
  const { mutate } = useDoctorBlockSlotMutation();

  const handleSubmit = () => {
    mutate(
      {
        startTime: new Date(blockDetails.startTime),
        endTime: new Date(blockDetails.endTime),
        reason: blockDetails.reason,
        force: true,
      },
      {
        onError(error) {
          if (isAxiosError(error)) {
            toast.error(error.response?.data.message);
            if (error.response?.data.error.appointments) {
              toast.error(error.response.data.error.reason);
            }
          }
        },
        onSuccess(){
          invalidateQuery('block-slot')
          toast.success("FORCE BLOCK SUCCESFFUL")
          close()
        }
      },
    );
  };
  return (
    <div className=" inset-0  bg-opacity-50 flex items-center w-full justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full  p-6 space-y-6">
        {/* Header */}
        <div className="flex items-start gap-4 pb-4 border-b border-slate-200">
          <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-6 h-6 text-red-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Appointment Overlap Detected
            </h2>
            <p className="text-slate-600 mt-1">
              Patient appointments conflict with the selected time block
            </p>
          </div>
          <button onClick={close}>
            <X />
          </button>
        </div>

        {/* Conflicting Appointments */}
        <div className="space-y-3">
          <p className="font-semibold text-slate-900">
            Conflicting Appointments:
          </p>
          <div className="space-y-2">
            {appointments.map((conflict, idx) => (
              <div
                key={idx}
                className="bg-red-50 border border-red-200 rounded-lg p-4 space-y-2"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-slate-900">
                      {conflict.patientName}
                    </p>
                    <p className="text-sm text-slate-600 mt-1">
                      <span className="font-medium">Appointment ID:</span>{" "}
                      {conflict.appointmentId}
                    </p>
                  </div>
                  <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded">
                    CONFLICT
                  </span>
                </div>
                {conflict.date && (
                  <p className="text-sm text-slate-600">
                    <span className="font-medium">Time:</span> {conflict.date}
                  </p>
                )}
                {conflict.type && (
                  <p className="text-sm text-slate-600">
                    <span className="font-medium">Type:</span> {conflict.type}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Block Details */}
        {blockDetails && (
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-2">
            <p className="font-semibold text-slate-900">Block Details:</p>
            <div className="grid  gap-4 text-sm">
              {/* <div>
                <p className="text-slate-600">Date</p>
                <p className="font-medium text-slate-900">
                  {blockDetails.date}
                </p>
              </div> */}
              <div>
                <p className="text-slate-600">Time</p>
                <p className="font-medium text-slate-900">
                  {blockDetails.startTime} - {blockDetails.endTime}
                </p>
              </div>
              <div className="col-span-2">
                <p className="text-slate-600">Reason</p>
                <p className="font-medium text-slate-900">
                  {blockDetails.reason}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <p className="text-sm text-amber-900">
            <span className="font-semibold">What would you like to do?</span>
          </p>
          <ul className="text-sm text-amber-800 mt-2 space-y-1 ml-4 list-disc">
            <li>
              <span className="font-semibold">Force Block:</span> This will
              cancel the conflicting patient appointment(s)
            </li>
            <li>
              <span className="font-semibold">Cancel:</span> This will keep the
              patient appointments and not create the block
            </li>
          </ul>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 justify-end pt-4 border-t border-slate-200">
          <button
            onClick={close}
            className="px-6 py-2 border border-slate-300 text-slate-900 font-semibold rounded-lg hover:bg-slate-100 transition flex items-center gap-2"
          >
            <X className="w-4 h-4" />
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition flex items-center gap-2"
          >
            <Check className="w-4 h-4" />
            Force Block (Cancel Appointments)
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorBlockSlotConflictModal;
