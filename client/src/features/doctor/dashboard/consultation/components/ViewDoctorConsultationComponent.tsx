"use client";

import { useEffect } from "react";
import {
  Plus,
  Trash2,
  Info,
  AlertCircle,
  Phone,
  Mail,
  Stethoscope,
  Check,
  Eye,
} from "lucide-react";
import { useRouter } from "next/navigation";
import useDoctorConsultation, {
  TAB_TYPES,
} from "../hooks/useDoctorConsultation";
import { CONSULTATION_TYPE } from "@/src/types/appointment.types";
import VideoCall from "@/src/components/VideoCall";
import Pagination from "@/src/components/Pagination";

const ViewDoctorConsultationComponent = ({ id }: { id: string }) => {
  const {
    consultationData,
    isError,
    history,
    historyPage,
    historyTotalPages,
    handleCompleteConsultation,
    setActiveTab,
    activeTab,
    handleOpenMedicineModal,
    register,
    handleSaveVitals,
    medicines,
    handleRemoveMedicine,
    handleAddLabTest,
    handleRemoveLabTest,
    viewHistoryDetails,
    handleUpdateNotes,
    setHistoryPage
  } = useDoctorConsultation(id);

  const router = useRouter();
  useEffect(() => {
    if (isError) {
      router.back();
    }
  }, [router, isError]);

  if (!consultationData) {
    return null;
  }
  const patient = consultationData.patient;
  const previousVitals = consultationData.previousVitals;
  const labReport = consultationData.labTest;
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between bg-white rounded-lg border border-slate-200 p-4 sm:p-4 sm:p-6">
          {" "}
          <div className="flex items-center gap-3 sm:gap-4">
            {" "}
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full">
              {" "}
              <span className="text-2xl font-bold text-white">MC</span>
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold"> {patient.name}</h1>
              <p className="text-xs sm:text-sm text-slate-600 break-all">
                {" "}
                {patient.id} • Oct 28 2023, 10:00 AM • Consultation •{" "}
                {consultationData.consultationType}
              </p>
            </div>
          </div>
          <button
            onClick={handleCompleteConsultation}
            className="px-6 py-3 w-full lg:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
          >
            Complete Consultations
          </button>
        </div>

        {consultationData.consultationType === CONSULTATION_TYPE.ONLINE && (
          <VideoCall
            patientName={consultationData.patient.name}
            appointmentId={consultationData?.appointment?.id}
          />
        )}

        {/* Tabs Navigation */}
        <div className="bg-white rounded-lg border border-slate-200 border-b-0">
          <div className="flex overflow-x-auto whitespace-nowrap scrollbar-hide border-b border-slate-200">
            {[
              { id: "overview", label: "Patient Overview" },
              { id: "history", label: "Medical History" },
              { id: "prescription", label: "Today's Prescription" },
              { id: "labtest", label: "Order Lab Test" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TAB_TYPES)}
                className={`
flex-shrink-0
px-4 sm:px-6
py-3 sm:py-4
text-sm
font-semibold
 transition ${
   activeTab === tab.id
     ? "text-blue-600 border-b-2 border-blue-600"
     : "text-slate-600 hover:text-slate-900"
 }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-4 sm:p-4 sm:p-6 space-y-6">
            {" "}
            {/* Patient Overview Tab */}
            {activeTab === "overview" && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:p-6">
                {/* Left Column */}
                <div className="space-y-4 order-2 lg:order-1">
                  {/* Basic Information */}
                  <div className="bg-slate-50 rounded-lg p-4 sm:p-6 space-y-4 border border-slate-200">
                    <div className="flex items-center gap-2 mb-4">
                      <Info className="w-5 h-5 text-blue-600" />
                      <h3 className="font-bold text-slate-900">
                        Basic Information
                      </h3>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs font-semibold text-slate-600 uppercase">
                          Age
                        </p>
                        <p className="text-lg font-bold text-slate-900">
                          {patient.age} Years
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-600 uppercase">
                          Gender
                        </p>
                        <p className="text-lg font-bold text-slate-900">
                          {patient.gender}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-600 uppercase">
                          Blood Type
                        </p>
                        <p className="text-lg font-bold text-slate-900">
                          {patient.blood_type}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-600 uppercase">
                          Last Visit
                        </p>
                        <p className="text-lg font-bold text-slate-900">
                          12 Sep 2023
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Contact */}
                  <div className="bg-slate-50 rounded-lg p-4 sm:p-6 space-y-4 border border-slate-200">
                    <div className="flex items-center gap-2 mb-4">
                      <Mail className="w-5 h-5 text-blue-600" />
                      <h3 className="font-bold text-slate-900">Contact</h3>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-600 uppercase mb-1">
                        Phone
                      </p>
                      <p className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        {patient.phone}{" "}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-600 uppercase mb-1">
                        Email
                      </p>
                      <p className="text-sm font-semibold text-slate-900">
                        {patient.email}{" "}
                      </p>
                    </div>
                  </div>

                  {/* Medical Alerts */}
                  {patient.allergens.length !== 0 && (
                    <div className="bg-red-50 rounded-lg p-4 sm:p-6 border border-red-200 space-y-3">
                      <div className="flex items-center gap-2 mb-3">
                        <AlertCircle className="w-5 h-5 text-red-600" />
                        <h3 className="font-bold text-slate-900">Allergens</h3>
                      </div>
                      <div className="space-y-2">
                        {patient.allergens.map((all, i) => (
                          <p
                            key={i}
                            className="text-sm font-semibold text-orange-600"
                          >
                            {all}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}
                  {/* Medical Alerts */}
                  {patient.condition.length !== 0 && (
                    <div className="bg-red-50 rounded-lg p-4 sm:p-6 border border-red-200 space-y-3">
                      <div className="flex items-center gap-2 mb-3">
                        <AlertCircle className="w-5 h-5 text-red-600" />
                        <h3 className="font-bold text-slate-900">Conditions</h3>
                      </div>
                      <div className="space-y-2">
                        {patient.condition.map((all, i) => (
                          <p
                            key={i}
                            className="text-sm font-semibold text-orange-600"
                          >
                            {all}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Middle Column - Current Vitals */}
                <div className="order-1 lg:order-2 lg:col-span-2">
                  {" "}
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-slate-900 flex items-center gap-2">
                      <Stethoscope className="w-5 h-5 text-blue-600" />
                      Previous Vitals
                    </h3>
                    {/* {!isEditingVitals && (
                      <button
                        onClick={() => {
                          setEditingVitals(vitals);
                          setIsEditingVitals(true);
                        }}
                        className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-2 text-sm"
                      >
                        <Edit2 className="w-4 h-4" /> Edit
                      </button>
                    )} */}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                    {previousVitals.bloodPressure && (
                      <div className="bg-blue-50 rounded-lg p-4 sm:p-6 text-center border border-blue-200">
                        <p className="text-xs font-semibold text-blue-600 uppercase mb-2">
                          Blood Pressure
                        </p>
                        <p className="text-3xl font-bold text-slate-900">
                          {previousVitals.bloodPressure}
                        </p>
                        <p className="text-xs text-slate-600 mt-1">mmHg</p>
                      </div>
                    )}
                    {previousVitals.heartRate && (
                      <div className="bg-red-50 rounded-lg p-4 sm:p-6 text-center border border-red-200">
                        <p className="text-xs font-semibold text-red-600 uppercase mb-2">
                          Heart Rate
                        </p>
                        <p className="text-3xl font-bold text-slate-900">
                          {previousVitals.heartRate}
                        </p>
                        <p className="text-xs text-slate-600 mt-1">bpm</p>
                      </div>
                    )}
                    {previousVitals.temperature && (
                      <div className="bg-amber-50 rounded-lg p-4 sm:p-6 text-center border border-amber-200">
                        <p className="text-xs font-semibold text-amber-600 uppercase mb-2">
                          Temperature
                        </p>
                        <p className="text-3xl font-bold text-slate-900">
                          {previousVitals.temperature}
                        </p>
                        <p className="text-xs text-slate-600 mt-1">°F</p>
                      </div>
                    )}

                    {previousVitals.oxygenLevel && (
                      <div className="bg-green-50 rounded-lg p-4 sm:p-6 text-center border border-green-200">
                        <p className="text-xs font-semibold text-green-600 uppercase mb-2">
                          SPO2
                        </p>
                        <p className="text-3xl font-bold text-slate-900">
                          {previousVitals.oxygenLevel}
                        </p>
                        <p className="text-xs text-slate-600 mt-1">%</p>
                      </div>
                    )}
                    {previousVitals.weight && (
                      <div className="bg-purple-50 rounded-lg p-4 sm:p-6 text-center border border-purple-200">
                        <p className="text-xs font-semibold text-purple-600 uppercase mb-2">
                          Weight
                        </p>
                        <p className="text-3xl font-bold text-slate-900">
                          {previousVitals.weight}
                        </p>
                        <p className="text-xs text-slate-600 mt-1">kg</p>
                      </div>
                    )}

                    {previousVitals.height && (
                      <div className="bg-indigo-50 rounded-lg p-4 sm:p-6 text-center border border-indigo-200">
                        <p className="text-xs font-semibold text-indigo-600 uppercase mb-2">
                          Height
                        </p>
                        <p className="text-3xl font-bold text-slate-900">
                          {previousVitals.height}
                        </p>
                        <p className="text-xs text-slate-600 mt-1">cm</p>
                      </div>
                    )}
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 sm:p-6 mb-6 space-y-4">
                    <p className="text-sm font-semibold text-slate-600">
                      Update Patient Current Vitals
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 uppercase mb-2">
                          Blood Pressure
                        </label>
                        <input
                          type="text"
                          {...register("bloodPressure")}
                          placeholder="120/80"
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <p className="text-xs text-slate-600 mt-1">mmHg</p>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 uppercase mb-2">
                          Heart Rate
                        </label>
                        <input
                          type="text"
                          {...register("heartRate")}
                          placeholder="72"
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <p className="text-xs text-slate-600 mt-1">bpm</p>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 uppercase mb-2">
                          Temperature
                        </label>
                        <input
                          type="text"
                          {...register("temperature")}
                          placeholder="98.6"
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <p className="text-xs text-slate-600 mt-1">°F</p>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 uppercase mb-2">
                          SPO2
                        </label>
                        <input
                          type="text"
                          {...register("oxygenLevel")}
                          placeholder="98"
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <p className="text-xs text-slate-600 mt-1">%</p>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 uppercase mb-2">
                          Weight
                        </label>
                        <input
                          type="text"
                          {...register("weight")}
                          placeholder="78"
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <p className="text-xs text-slate-600 mt-1">kg</p>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 uppercase mb-2">
                          Height
                        </label>
                        <input
                          type="text"
                          {...register("height")}
                          placeholder="180"
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <p className="text-xs text-slate-600 mt-1">cm</p>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-end gap-2 pt-4 border-t border-blue-300">
                      <button
                        onClick={handleSaveVitals}
                        className=" w-full sm:w-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition flex items-center gap-2"
                      >
                        <Check className="w-4 h-4" /> Save Vitals
                      </button>
                    </div>
                  </div>
                  {/* Quick Observation Notes */}
                </div>
              </div>
            )}
            {/* Medical History Tab */}
            {activeTab === "history" && (
              <div className="space-y-4 order-2 lg:order-1">
                {/* <div className="flex flex-col sm:flex-row gap-4">
                  {" "}
                  <input
                    type="text"
                    placeholder="Search records, diagnoses, or lab tests..."
                    className="flex-1 px-4 py-2 w-full w-full sm:w-48 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <select className="px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>All Records</option>
                  </select>
                </div> */}

                <div className="overflow-x-auto ">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50">
                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">
                          Date
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">
                          Record Type
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">
                          Doctor / Lab
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">
                          Reason / Test
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">
                          Status
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {history?.history.map((h, i) => h.type === 'CONSULTATION' ?(
                        <tr
                          key={i}
                          className="border-b border-slate-200 hover:bg-slate-50"
                        >
                          <td className="px-6 py-4 text-sm text-slate-900">
                            {new Date(h.appointment.startTime).toDateString()}
                          </td>
                          <td className="px-6 py-4">
                            <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded">
                              Appointment
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-slate-900">
                            {h.doctor.name}{" "}
                          </td>
                          <td className="px-6 py-4 text-sm text-slate-900">
                            {h.diagnosis.clinicalObservation}{" "}
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-sm font-semibold text-green-600">
                              {h.appointment.status}{" "}
                            </span>
                          </td>
                          <td
                            className="px-6 py-4 flex gap-2"
                            onClick={() =>
                              viewHistoryDetails(h)
                            }
                          >
                            <Eye className="w-4 h-4 text-slate-600" />
                          </td>
                        </tr>
                      ) :( 
                        <tr
                          key={i}
                          className="border-b border-slate-200 hover:bg-slate-50"
                        >
                          <td className="px-6 py-4 text-sm text-slate-900">
                            {new Date(
                              new Date(h.uploadedAt ?? ""),
                            ).toDateString()}
                          </td>
                          <td className="px-6 py-4">
                            <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded">
                              Lab Report
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-slate-900">
                            {h.testName}{" "}
                          </td>
                          <td className="px-6 py-4 text-sm text-slate-900">
                            {h.instructions}{" "}
                          </td>

                          <td className="px-6 py-4">
                            <span className="text-sm font-semibold text-green-600">
                              {h.status}{" "}
                            </span>
                          </td>
                          <td
                            className="px-6 py-4 flex gap-2"
                            onClick={() =>
                              viewHistoryDetails(h)
                            }
                          >
                            <Eye className="w-4 h-4 text-slate-600" />
                          </td>
                        </tr>
                      ))}
                      {/* <tr className="border-b border-slate-200 hover:bg-slate-50">
                        <td className="px-6 py-4 text-sm text-slate-900">
                          Oct 15, 2023
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded">
                            Lab Report
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-900">
                          City Labs
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-900">
                          Lipid Profile
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm font-semibold text-blue-600">
                            ● Uploaded
                          </span>
                        </td>
                        <td className="px-6 py-4 flex gap-2">
                          <Download className="w-4 h-4 text-slate-600" />
                        </td>
                      </tr>
                      <tr className="border-b border-slate-200 hover:bg-slate-50">
                        <td className="px-6 py-4 text-sm text-slate-900">
                          Sep 12, 2023
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded">
                            Appointment
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-900">
                          Dr. Vance
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-900">
                          Routine Follow-up
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm font-semibold text-green-600">
                            ● Completed
                          </span>
                        </td>
                        <td className="px-6 py-4 flex gap-2">
                          <Eye className="w-4 h-4 text-slate-600" />
                        </td>
                      </tr> */}
                    </tbody>
                  </table>
                </div>
                <Pagination currentPage={historyPage} totalPages={historyTotalPages} onPageChange={(page)=>setHistoryPage(page)}/>
             
              </div>
            )}
            {/* Today's Prescription Tab */}
            {activeTab === "prescription" && (
              <div className="space-y-6 text-black">
                <div>
                  <label className="block text-sm font-semibold text-slate-600 uppercase mb-3">
                    Quick Note
                  </label>
                  <textarea
                    {...register("quickNote")}
                    placeholder="Enter the main medical diagnosis here..."
                    className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                  />
                  <div className="my-5">
                   <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-4">
                      <h3 className="font-bold text-slate-900 flex items-center gap-2">
                        <span>💊</span> Medicine Prescription
                      </h3>
                      <button
                        onClick={handleOpenMedicineModal}
                        className="w-full sm:w-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg flex items-center gap-2 transition"
                      >
                        <Plus className="w-4 h-4" /> Add Medicine
                      </button>
                    </div>
                    <div className="overflow-x-auto border border-slate-200 rounded-lg">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-slate-200 bg-slate-50">
                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">
                              Medicine Name
                            </th>
                            <th className="px-6 py-3 text-center text-xs font-semibold text-slate-600 uppercase">
                              Morn
                            </th>
                            <th className="px-6 py-3 text-center text-xs font-semibold text-slate-600 uppercase">
                              Aftn
                            </th>
                            <th className="px-6 py-3 text-center text-xs font-semibold text-slate-600 uppercase">
                              Night
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">
                              Duration
                            </th>
                            <th className="px-6 py-3 text-center text-xs font-semibold text-slate-600 uppercase">
                              Before
                            </th>
                            <th className="px-6 py-3 text-center text-xs font-semibold text-slate-600 uppercase">
                              After
                            </th>
                            <th className="px-6 py-3 text-center text-xs font-semibold text-slate-600 uppercase">
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {medicines?.map((med, i) => (
                            <tr key={i} className="border-b border-slate-200">
                              <td className="px-6 py-4 font-semibold text-slate-900">
                                {med.name}
                              </td>
                              <td className="px-6 py-4 text-center">
                                <input
                                  type="checkbox"
                                  checked={med.timings.morning}
                                  readOnly
                                  className="w-4 h-4 accent-blue-600 cursor-pointer"
                                />
                              </td>
                              <td className="px-6 py-4 text-center">
                                <input
                                  type="checkbox"
                                  checked={med.timings.afternoon}
                                  readOnly
                                  className="w-4 h-4 accent-blue-600 cursor-pointer"
                                />
                              </td>
                              <td className="px-6 py-4 text-center">
                                <input
                                  type="checkbox"
                                  checked={med.timings.night}
                                  readOnly
                                  className="w-4 h-4 accent-blue-600 cursor-pointer"
                                />
                              </td>
                              <td className="px-6 py-4 text-slate-900">
                                {med.durationInDays}
                              </td>
                              <td className="px-6 py-4 text-center">
                                <input
                                  checked={med.foodTiming === 0}
                                  readOnly
                                  type="checkbox"
                                  className="w-4 h-4 accent-blue-600"
                                />
                              </td>
                              <td className="px-6 py-4 text-center">
                                <input
                                  checked={med.foodTiming === 1}
                                  readOnly
                                  type="checkbox"
                                  className="w-4 h-4 accent-blue-600"
                                />
                              </td>
                              <td className="px-6 py-4 text-center">
                                <button
                                  onClick={() => handleRemoveMedicine(med.name)}
                                  className="text-slate-400 hover:text-red-600 transition"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>{" "}
                    <div></div>
                  </div>
                  <label className="block text-sm font-semibold text-slate-600 uppercase mb-3">
                    Primary Diagnosis
                  </label>
                  <textarea
                    {...register("diagnosis")}
                    placeholder="Enter the main medical diagnosis here..."
                    className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-600 uppercase mb-3">
                    Clinical Observations
                  </label>
                  <textarea
                    {...register("clinicalObservation")}
                    placeholder="Notes on symptoms, vitals, and physical exam findings..."
                    className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-600 uppercase mb-3">
                    <span className="text-orange-600">●</span> General Advice &
                    Lifestyle Instructions
                  </label>
                  <textarea
                    {...register("advice")}
                    placeholder="e.g. Low sodium diet, 30 min daily walk, monitor BP twice daily..."
                    className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                  />
                </div>

                <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between pt-4 border-t border-slate-200">
                  <div>
                    <p className="text-sm text-slate-600">
                      Total Medication Duration
                    </p>
                    <input
                      {...register("medicationPeriod")}
                      placeholder="e.g. Low sodium diet, 30 min daily walk, monitor BP twice daily..."
                      className="w-full lg:max-w-sm px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />{" "}
                  </div>
                  <button
                    onClick={handleUpdateNotes}
                    className="w-full lg:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
                  >
                    Save Draft
                  </button>
                </div>
              </div>
            )}
            {/* Order Lab Test Tab */}
            {activeTab === "labtest" && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-slate-900">
                  Create Lab Order
                </h3>

                {labReport.map((test, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-lg border border-slate-200 p-4 sm:p-6 space-y-4"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 uppercase mb-2">
                          Lab Test Name
                        </label>
                        <input
                          type="text"
                          value={test.testName}
                          readOnly
                          className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-slate-50 text-slate-900 font-semibold"
                        />
                      </div>
                      <div className="flex items-end justify-end">
                        <button
                          onClick={() => handleRemoveLabTest(test.id)}
                          className="p-2 text-slate-400 hover:text-red-600 transition"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 uppercase mb-2">
                        Notes for Lab
                      </label>
                      <textarea
                        value={test.instructions ?? ""}
                        readOnly
                        className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-slate-50 text-slate-900"
                        rows={2}
                      />
                    </div>
                  </div>
                ))}

                <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center">
                  <button
                    onClick={handleAddLabTest}
                    className="w-full py-4 text-slate-600 font-semibold flex items-center justify-center gap-2 hover:text-slate-900 transition"
                  >
                    <Plus className="w-5 h-5" /> Add Another Lab Test
                  </button>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                  <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition">
                    Save Lab Reports
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDoctorConsultationComponent;
