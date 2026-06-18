import { ModalProps } from "@/src/layout/ModalProvider";
import React from "react";
import type {
  ConsultationHistoryDetail,
  LabHistoryDetail,
} from "../../../services/consultation.service";
import { useModal } from "@/src/hooks/useModal";
import ViewPDFModal from "@/src/components/ViewPDFModal";

type Props = ModalProps & {
  data: ConsultationHistoryDetail | LabHistoryDetail;
};

const ViewHistoryDetailModal = ({
  close,
  data,
}: Props) => {
  const {open} = useModal()
  const consultationData:
    | ConsultationHistoryDetail["data"]
    | null =
    data.type === "consultation"
      ? (data.data as ConsultationHistoryDetail["data"])
      : null;

  const labData:
    | LabHistoryDetail["data"]
    | null =
    data.type === "lab"
      ? (data.data as LabHistoryDetail["data"])
      : null;


      const viewPDF = (file : string) => {
        console.log(file)
        open(ViewPDFModal, {file : file,title : "Lab Report" })
      }
  return (
    <div className="mx-4 w-full max-w-4xl overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <h2 className="text-2xl font-bold text-slate-900">
          {consultationData
            ? "Consultation Details"
            : "Lab Report Details"}
        </h2>

        <button
          onClick={close}
          className="text-2xl text-slate-400 transition hover:text-slate-700"
        >
          ×
        </button>
      </div>

      {/* ================= CONSULTATION ================= */}
      {consultationData && (
        <div className="space-y-6 pt-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Doctor
              </p>

              <p className="mt-1 text-lg font-bold text-slate-900">
                {consultationData.doctor.name}
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Date
              </p>

              <p className="mt-1 text-lg font-bold text-slate-900">
                {consultationData.appointment.date}
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Consultation Type
              </p>

              <p className="mt-1 text-lg font-bold text-slate-900">
                {
                  consultationData.appointment
                    .consultationType
                }
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Status
              </p>

              <p className="mt-1 text-lg font-bold text-slate-900">
                {consultationData.appointment.status}
              </p>
            </div>
          </div>

          {/* Diagnosis */}
          <div className="border-t border-slate-200 pt-6">
            <h3 className="mb-4 text-lg font-bold text-slate-900">
              Diagnosis
            </h3>

            <div className="space-y-4">
              {consultationData.diagnosis
                .primaryDiagnosis && (
                <div>
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Primary Diagnosis
                  </p>

                  <p className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-slate-700">
                    {
                      consultationData.diagnosis
                        .primaryDiagnosis
                    }
                  </p>
                </div>
              )}

              {consultationData.diagnosis
                .clinicalObservation && (
                <div>
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Clinical Observation
                  </p>

                  <p className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-slate-700">
                    {
                      consultationData.diagnosis
                        .clinicalObservation
                    }
                  </p>
                </div>
              )}

              {consultationData.diagnosis
                .generalAdvice && (
                <div>
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    General Advice
                  </p>

                  <p className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-slate-700">
                    {
                      consultationData.diagnosis
                        .generalAdvice
                    }
                  </p>
                </div>
              )}

              {consultationData.diagnosis
                .quickNote && (
                <div>
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Quick Note
                  </p>

                  <p className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-slate-700">
                    {
                      consultationData.diagnosis
                        .quickNote
                    }
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Vitals */}
          {consultationData.vitals && (
            <div className="border-t border-slate-200 pt-6">
              <h3 className="mb-4 text-lg font-bold text-slate-900">
                Vitals
              </h3>

              <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                {consultationData.vitals
                  .bloodPressure && (
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Blood Pressure
                    </p>

                    <p className="mt-1 text-lg font-bold text-slate-900">
                      {
                        consultationData.vitals
                          .bloodPressure
                      }
                    </p>
                  </div>
                )}

                {consultationData.vitals.pulse && (
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Pulse
                    </p>

                    <p className="mt-1 text-lg font-bold text-slate-900">
                      {consultationData.vitals.pulse}
                    </p>
                  </div>
                )}

                {consultationData.vitals
                  .temperature && (
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Temperature
                    </p>

                    <p className="mt-1 text-lg font-bold text-slate-900">
                      {
                        consultationData.vitals
                          .temperature
                      }
                      °
                    </p>
                  </div>
                )}

                {consultationData.vitals.spo2 && (
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      SpO2
                    </p>

                    <p className="mt-1 text-lg font-bold text-slate-900">
                      {consultationData.vitals.spo2}%
                    </p>
                  </div>
                )}

                {consultationData.vitals.height && (
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Height
                    </p>

                    <p className="mt-1 text-lg font-bold text-slate-900">
                      {consultationData.vitals.height} cm
                    </p>
                  </div>
                )}

                {consultationData.vitals.weight && (
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Weight
                    </p>

                    <p className="mt-1 text-lg font-bold text-slate-900">
                      {consultationData.vitals.weight} kg
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Prescriptions */}
          {consultationData.prescriptions.length >
            0 && (
            <div className="border-t border-slate-200 pt-6">
              <h3 className="mb-4 text-lg font-bold text-slate-900">
                Prescriptions
              </h3>

              <div className="space-y-3">
                {consultationData.prescriptions.map(
                  (rx, idx) => (
                    <div
                      key={idx}
                      className="rounded-xl border border-slate-200 bg-slate-50 p-4"
                    >
                      <h4 className="text-lg font-bold text-slate-900">
                        {rx.name}
                      </h4>

                      <div className="mt-2 space-y-1 text-sm text-slate-700">
                        <p>
                          <strong>Dosage:</strong>{" "}
                          {rx.dosage}
                        </p>

                        <p>
                          <strong>
                            Frequency:
                          </strong>{" "}
                          {rx.frequency}
                        </p>

                        <p>
                          <strong>
                            Duration:
                          </strong>{" "}
                          {rx.durationInDays} days
                        </p>

                        {rx.instruction && (
                          <p>
                            <strong>
                              Instruction:
                            </strong>{" "}
                            {rx.instruction}
                          </p>
                        )}
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          )}

          {/* Follow Up */}
          <div className="border-t border-slate-200 pt-6">
            <h3 className="mb-4 text-lg font-bold text-slate-900">
              Follow Up
            </h3>

            <div className="space-y-2 text-slate-700">
              {consultationData.followUp
                .medicationPeriod && (
                <p>
                  <strong>
                    Medication Period:
                  </strong>{" "}
                  {
                    consultationData.followUp
                      .medicationPeriod
                  }{" "}
                  days
                </p>
              )}

              {consultationData.followUp
                .freeFollowUpValidUntil && (
                <p>
                  <strong>
                    Free Follow Up Valid Until:
                  </strong>{" "}
                  {
                    consultationData.followUp
                      .freeFollowUpValidUntil
                  }
                </p>
              )}

              <p>
                <strong>Follow Up Used:</strong>{" "}
                {consultationData.followUp
                  .freeFollowUpUsed
                  ? "Yes"
                  : "No"}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ================= LAB ================= */}
      {labData && (
        <div className="space-y-6 pt-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Test Name
              </p>

              <p className="mt-1 text-lg font-bold text-slate-900">
                {labData.testName}
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Status
              </p>

              <p className="mt-1 text-lg font-bold text-slate-900">
                {labData.status}
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Requested At
              </p>

              <p className="mt-1 text-lg font-bold text-slate-900">
                {labData.requestedAt}
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Uploaded At
              </p>

              <p className="mt-1 text-lg font-bold text-slate-900">
                {labData.uploadedAt ??
                  "Not Uploaded"}
              </p>
            </div>
          </div>

          {labData.instructions && (
            <div className="border-t border-slate-200 pt-6">
              <h3 className="mb-4 text-lg font-bold text-slate-900">
                Instructions
              </h3>

              <p className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-slate-700">
                {labData.instructions}
              </p>
            </div>
          )}

          {labData.remarks && (
            <div className="border-t border-slate-200 pt-6">
              <h3 className="mb-4 text-lg font-bold text-slate-900">
                Remarks
              </h3>

              <p className="whitespace-pre-wrap rounded-xl border border-slate-200 bg-slate-50 p-4 text-slate-700">
                {labData.remarks}
              </p>
            </div>
          )}

          {labData.documentKey && (
            <div className="border-t border-slate-200 pt-6">
              <h3 className="mb-4 text-lg font-bold text-slate-900">
                Document
              </h3>

              <button
                onClick={()=>viewPDF(labData.documentKey)}
                rel="noreferrer"
                className="font-medium text-blue-600 underline"
              >
                View Uploaded Report
              </button>
            </div>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="mt-8 flex justify-end border-t border-slate-200 pt-4">
        <button
          onClick={close}
          className="rounded-lg bg-slate-200 px-6 py-2 font-semibold text-slate-900 transition hover:bg-slate-300"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ViewHistoryDetailModal;