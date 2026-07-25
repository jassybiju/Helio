import { ModalProps } from "@/src/layout/ModalProvider";
import { useGetDoctorAppointmentQuery } from "../hooks/useGetDoctorAppointmentQuery";
import {
  CalendarDays,
  ClipboardList,
  Activity,
  MessageCircle,
  Download,
  Printer,
  X,
} from "lucide-react";

export default function ViewDoctorAppointmentModal({
  close,
  id,
}: ModalProps & { id: string }) {
  const { data, isLoading } = useGetDoctorAppointmentQuery(id);

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
        <div className="rounded-2xl bg-white px-6 py-4 shadow-xl">
          Loading...
        </div>
      </div>
    );
  }

  const appointment = data?.data;
  const consultation = appointment?.consultation;

  if (!appointment) return null;

  return (
      <div className="w-full  overflow-y-auto  bg-[#FCFCFD] shadow-[0_10px_50px_rgba(0,0,0,0.15)] border border-[#E9EDF5]">
        {/* HEADER */}
        <div className="sticky top-0 z-10 bg-[#FCFCFD] rounded-t-[34px] border-b border-[#EEF2F6] px-8 py-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-2xl bg-[#EEF4FF] flex items-center justify-center">
                <ClipboardList className="text-[#2563EB]" size={22} />
              </div>

              <div>
                <h2 className="text-[30px] font-bold text-[#101828]">
                  Appointment Report
                </h2>

                <p className="text-sm text-[#667085] mt-1">
                  Appointment ID: {appointment.id}
                </p>
              </div>
            </div>

            <button
              onClick={close}
              className="h-10 w-10 rounded-xl hover:bg-gray-100 flex items-center justify-center transition"
            >
              <X size={22} />
            </button>
          </div>

          {/* Doctor Row */}
          <div className="mt-7 flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* <img
                // src="https://i.pravatar.cc/100?img=12"
                alt=""
                className="h-16 w-16 rounded-full object-cover"
              /> */}

              <div>
                <h3 className="text-2xl font-semibold text-[#101828]">
                  {appointment.patientName}
                </h3>

                <p className="text-[#2563EB] font-medium text-sm mt-1">
                  {appointment.consultationType}
                </p>

                <div className="mt-2 flex items-center gap-2 text-[#667085] text-sm">
                  <CalendarDays size={15} />
                  {new Date(appointment.startTime).toLocaleString()}
                </div>
              </div>
            </div>

            <div>
              <span
                className={`rounded-full px-5 py-2 text-sm font-semibold ${
                  consultation?.endedAt
                    ? "bg-[#ECFDF3] text-[#039855]"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {appointment?.status}
              </span>
            </div>
          </div>
        </div>

        {/* BODY */}
        <div className="px-8 py-7 space-y-10">
          {/* VITALS */}
          <section>
            <div className="flex items-center gap-2 mb-5">
              <Activity className="text-[#2563EB]" size={22} />

              <h3 className="text-2xl font-semibold text-[#101828]">
                Patient Vitals
              </h3>
            </div>

            {!consultation?.vitals ? (
              <div className="rounded-3xl border border-dashed p-8 text-center text-gray-500">
                No vitals added
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <VitalCard
                  label="BP"
                  value={consultation.vitals.bloodPressure}
                />

                <VitalCard
                  label="HR"
                  value={consultation.vitals.heartRate}
                />

                <VitalCard
                  label="TEMP"
                  value={consultation.vitals.temperature}
                />

                <VitalCard
                  label="SPO2"
                  value={consultation.vitals.oxygenLevel}
                />

                <VitalCard
                  label="WEIGHT"
                  value={consultation.vitals.weight}    
                />

                <VitalCard
                  label="HEIGHT"
                  value={consultation.vitals.height}
                />
              </div>
            )}
          </section>

          {/* NOTES */}
          <section>
            <div className="flex items-center gap-2 mb-5">
              <ClipboardList className="text-[#2563EB]" size={22} />

              <h3 className="text-2xl font-semibold text-[#101828]">
                Consultation Notes
              </h3>
            </div>

            <div className="rounded-[28px] bg-[#F8FAFC] border border-[#EEF2F6] overflow-hidden">
              <NoteRow
                label="Primary Diagnosis"
                value={consultation?.notes.primaryDiagnosis}
              />

              <NoteRow
                label="Clinical Observation"
                value={consultation?.notes.clinicalObservation}
              />

              <NoteRow
                label="General Advice"
                value={consultation?.notes.generalAdvice}
              />

              <NoteRow
                label="Quick Note"
                value={consultation?.notes.quickNote}
              />
              <NoteRow
                label="Medication Duration"
                // value={consultation?.medicationDuration}
              />
            </div>
          </section>

          {/* PRESCRIPTIONS */}
          <section>
            <div className="flex text-black items-center gap-2 mb-5">
              <ClipboardList className="text-[#2563EB]" size={22} />

              <h3 className="text-2xl font-semibold text-[#101828]">
                Prescriptions
              </h3>
            </div>

            {!consultation?.prescriptions?.length ? (
              <div className="rounded-3xl border border-dashed p-8 text-center text-gray-500">
                No prescriptions added
              </div>
            ) : (
              <div className="overflow-hidden rounded-[28px] border border-[#EEF2F6]">
                <div className="flex justify-between bg-[#F9FAFB] px-6 py-4 text-sm font-semibold text-[#667085]">
                  <div>Medicine</div>
                  <div>Timing</div>
                  <div>Food</div>
                  <div>Duration</div>
                </div>

                {consultation.prescriptions.map((prescription, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center text-black w-full px-6 py-5 border-t border-[#EEF2F6]"
                  >
                    <div>
                      <h4 className="font-semibold text-[#101828]">
                        {prescription.name}
                      </h4>

                      <p className="text-sm text-[#667085] mt-1">
                        {prescription.instruction || "No instructions"}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      {prescription.timings.morning && (
                        <span>🌞 Morning</span>
                      )}

                      {prescription.timings.afternoon && (
                        <span>☀️ Afternoon</span>
                      )}

                      {prescription.timings.night && (
                        <span>🌙 Night</span>
                      )}
                    </div>

                    <div>
                      <span className="rounded-full bg-[#F2F4F7] px-3 py-1 text-sm">
                        {prescription.foodTiming === 0? "Before Food" : "After Food"}
                      </span>
                    </div>

                    <div className="font-medium">
                      {prescription.durationInDays} Days
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* LAB TESTS */}
          {/* <section>
            <div className="flex items-center gap-2 mb-5">
              <FlaskConical className="text-[#2563EB]" size={22} />

              <h3 className="text-2xl font-semibold text-[#101828]">
                Lab Tests
              </h3>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <LabCard
                title="Blood Sugar Test"
                status="Requested"
              />

              <LabCard
                title="Lipid Profile"
                status="Requested"
              />
            </div>
          </section> */}
        </div>

        {/* FOOTER */}
        <div className="sticky bottom-0 bg-[#FCFCFD] border-t border-[#EEF2F6] px-8 py-5 rounded-b-[34px]">
          <div className="flex items-center justify-between">
            <button className="flex items-center gap-2 text-[#2563EB] font-medium">
              <MessageCircle size={18} />
              Message Patient
            </button>

            <div className="flex items-center gap-4">
              <button className="rounded-full border border-[#D0D5DD] px-6 py-3 font-medium hover:bg-gray-50">
                <div className="flex items-center gap-2">
                  <Printer size={18} />
                  Print Summary
                </div>
              </button>

              <button className="rounded-full bg-[#2563EB] text-white px-7 py-3 font-medium shadow-lg hover:opacity-90">
                <div className="flex items-center gap-2">
                  <Download size={18} />
                  Download Reports
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
  );
}

function VitalCard({
  label,
  value,
}: {
  label: string;
  value: string | number | null;
}) {
  return (
    <div className="rounded-[24px] bg-white border border-[#EEF2F6] p-5 shadow-sm">
      <div className="text-xs font-semibold text-[#667085]">{label}</div>

      <div className="mt-2 text-3xl font-bold text-[#101828]">
        {value ?? "N/A"}
      </div>
    </div>
  );
}

function NoteRow({
  label,
  value,
}: {
  label: string;
  value?: string | null;
}) {
  return (
    <div className="grid grid-cols-[220px_1fr] gap-5 px-6 py-5 border-b border-[#EEF2F6] last:border-none">
      <div className="font-medium text-[#667085]">{label}</div>

      <div className="text-[#101828] leading-relaxed">
        {value || "No data"}
      </div>
    </div>
  );
}

// function LabCard({
//   title,
//   status,
// }: {
//   title: string;
//   status: string;
// }) {
//   return (
//     <div className="rounded-[28px] bg-white border border-[#EEF2F6] p-6 shadow-sm">
//       <div className="flex items-start gap-4">
//         <div className="h-12 w-12 rounded-2xl bg-[#FFF4E5] flex items-center justify-center">
//           <FlaskConical className="text-[#F59E0B]" size={22} />
//         </div>

//         <div>
//           <h4 className="font-semibold text-[#101828]">{title}</h4>

//           <p className="text-sm text-[#667085] mt-1">{status}</p>
//         </div>
//       </div>
//     </div>
//   );
// }