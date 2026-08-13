import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { useDoctorConsultationViewQuery } from "./useDoctorConsultationViewQuery";
import { useDoctorVitalsUpdateMutations } from "./useDoctorVitalsUpdateMutation";
import { useDoctorConsultationNotesMutation } from "./useDoctorConsultationNotesMutation";

import { useModal } from "@/src/hooks/useModal";

import AddMedicineModal from "../components/AddMedicineModal";
import { useDoctorRemovePrescription } from "./useDoctorRemovePrescriptionMutation";
import { AddLabReportModal } from "../components/AddLabReportModal";
import { useDoctorViewHistoryQuery } from "./useDoctorViewHistoryQuery";
import { useDoctorCompleteConsultationMutation } from "./useDoctorCompleteConsultationMutation";
import ViewHistoryDetailModal from "../components/ViewHistoryDetailModal";
import { socket } from "@/src/libs/socket";
import { invalidateQuery } from "@/src/libs/queryClient";
import { ConfirmModal } from "@/src/components/ConfirmModal";
import useDoctorRemoveTestMutation from "./useDoctorRemoveTestMutation";
import { IDoctorViewHistory } from "../../../services/consultation.service";

interface LabTest {
  id: string;
  name: string;
  notes: string;
}

interface RecordedVital {
  id: string;
  timestamp: string;
  bloodPressure: string;
  heartRate: string;
  temperature: string;
  spo2: string;
  weight: string;
  height: string;
}

export type TAB_TYPES = "overview" | "history" | "prescription" | "labtest";

type ConsultationForm = {
  bloodPressure: string | null;
  heartRate: number | null;
  temperature: number | null;
  oxygenLevel: number | null;
  weight: number | null;
  height: number | null;
  medicationPeriod: number | null;
  diagnosis: string;
  quickNote: string;
  advice: string;
  clinicalObservation: string;
};

const LIMIT = 1
const useDoctorConsultation = (id: string) => {
  const router = useRouter();

  const { open } = useModal();

  const [activeTab, setActiveTab] = useState<TAB_TYPES>("overview");

  const [historyPage, setHistoryPage] = useState(1);

  const [isEditingVitals, setIsEditingVitals] = useState(false);

  const [isRecordingNewVitals, setIsRecordingNewVitals] = useState(false);

  useEffect(() => {
    // socket.emit("join-appointment", id);
    socket.on("consultation-started", () => {
      invalidateQuery("appointment");
    });

    socket.on("consultation-ended", () => {
      invalidateQuery("appointment");
    });

    // socket.on("user-joined", (data) => {
    // });
    return () => {
      socket.off("consultation-started");
      socket.off("consultation-ended");
    };
  }, []);
  /**
   * -----------------------------------
   * API
   * -----------------------------------
   */

  const { data, isError } = useDoctorConsultationViewQuery(id);

  const { mutate: updateVitals } = useDoctorVitalsUpdateMutations(id);

  const { mutate: updateNotes } = useDoctorConsultationNotesMutation(id);
  const { mutate: removeMedicine } = useDoctorRemovePrescription(id);
  const { mutate: removeTest } = useDoctorRemoveTestMutation(id);
  const { data: history } = useDoctorViewHistoryQuery({
    id,
    page: historyPage,
    limit: LIMIT,
  });
  const { mutate: endConsultaiton } = useDoctorCompleteConsultationMutation(id);
  const consultationData = data?.data;

  const currentVitals = consultationData?.currentVitals;

  /**
   * -----------------------------------
   * REACT HOOK FORM
   * -----------------------------------
   */

  const form = useForm<ConsultationForm>({
    defaultValues: {
      bloodPressure: null,
      heartRate: null,
      temperature: null,
      oxygenLevel: null,
      weight: null,
      height: null,
      medicationPeriod: null,

      diagnosis: "",
      quickNote: "",
      advice: "",
      clinicalObservation: "",
    },
  });

  const { reset, watch, setValue, handleSubmit, register, formState } = form;

  /**
   * -----------------------------------
   * RESET FORM WHEN API LOADS
   * -----------------------------------
   */

  useEffect(() => {
    if (!consultationData) return;

    reset({
      bloodPressure: currentVitals?.bloodPressure ?? null,

      heartRate: currentVitals?.heartRate ?? null,

      temperature: currentVitals?.temperature ?? null,

      oxygenLevel: currentVitals?.oxygenLevel ?? null,

      weight: currentVitals?.weight ?? null,

      height: currentVitals?.height ?? null,

      diagnosis: consultationData?.primaryDiagnosis ?? "",

      quickNote: consultationData?.quickNote ?? "",

      advice: consultationData?.generalAdvice ?? "",

      clinicalObservation: consultationData?.clinicalObservation ?? "",
      medicationPeriod: consultationData.medicationPeriod ?? null,
    });
  }, [consultationData, currentVitals, reset]);

  /**
   * -----------------------------------
   * NEW VITALS
   * -----------------------------------
   */

  const [newVitals, setNewVitals] = useState({
    bloodPressure: "",
    heartRate: "",
    temperature: "",
    spo2: "",
    weight: "",
    height: "",
  });

  const [recordedVitals, setRecordedVitals] = useState<RecordedVital[]>([]);

  /**
   * -----------------------------------
   * MEDICINES
   * -----------------------------------
   */

  const medicines = consultationData?.prescriptions;
  /**
   * -----------------------------------
   * LAB TESTS
   * -----------------------------------
   */

  const [labTests] = useState<LabTest[]>([
    {
      id: "1",
      name: "Blood Sugar Test",
      notes: "Patient should fast for 12 hours before the test.",
    },
  ]);

  const [newMedicineName, setNewMedicineName] = useState("");

  const [newTestName, setNewTestName] = useState("");

  const [newTestNotes, setNewTestNotes] = useState("");

  /**
   * -----------------------------------
   * SAVE VITALS
   * -----------------------------------
   */

  const handleSaveVitals = handleSubmit((values) => {
    updateVitals({
      bloodPressure: values.bloodPressure as string,

      heartRate: Number(values.heartRate) as number,

      temperature: Number(values.temperature),

      oxygenLevel: Number(values.oxygenLevel),

      weight: Number(values.weight),

      height: Number(values.height),
    });

    setIsEditingVitals(false);
  });

  /**
   * -----------------------------------
   * UPDATE NOTES
   * -----------------------------------
   */

  const handleUpdateNotes = handleSubmit((values) => {
    updateNotes({
      clinicalObservations: values.clinicalObservation,

      quickNote: values.quickNote,

      medicationDuration: Number(values.medicationPeriod),

      generalAdvice: values.advice,

      primaryDiagnosis: values.diagnosis,
    });
  });

  /**
   * -----------------------------------
   * MEDICINES
   * -----------------------------------
   */

  const handleRemoveMedicine = (name: string) => {
    removeMedicine(name);
  };

  const handleOpenMedicineModal = () => {
    open(AddMedicineModal, { id });
  };

  /**
   * -----------------------------------
   * LAB TESTS
   * -----------------------------------
   */

  const handleAddLabTest = () => {
    open(AddLabReportModal, { id });
  };

  const handleRemoveLabTest = (id: string) => {
    open(ConfirmModal, {
      onConfirm: () => removeTest(id),
      title: "Are you sure remove Test Request?",
      message: "Are you sure remove Test Request?",
    });
  };

  /**
   * -----------------------------------
   * NEW VITALS
   * -----------------------------------
   */

  const handleNewVitalChange = (key: keyof typeof newVitals, value: string) => {
    setNewVitals((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleRecordVitals = () => {
    const hasAnyVital = Object.values(newVitals).some((v) => v.trim() !== "");

    if (!hasAnyVital) return;

    const timestamp = new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });

    setRecordedVitals((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        timestamp,
        ...newVitals,
      },
    ]);

    setNewVitals({
      bloodPressure: "",
      heartRate: "",
      temperature: "",
      spo2: "",
      weight: "",
      height: "",
    });

    setIsRecordingNewVitals(false);
  };

  const handleDeleteRecordedVitals = (id: string) => {
    setRecordedVitals((prev) => prev.filter((v) => v.id !== id));
  };

  const viewHistoryDetails = (
    payload: IDoctorViewHistory["history"][number],
  ) => {
    open(ViewHistoryDetailModal, { data: payload });
  };
  /**
   * -----------------------------------
   * COMPLETE CONSULTATION
   * -----------------------------------
   */

  const handleCompleteConsultation = () => {
    endConsultaiton(undefined, {
      onSuccess() {
        router.push("/appointment/today");
      },
    });
  };

  const historyTotalCount = history?.data.pagination.totalCount ?? 0;

  const historyTotalPages = Math.ceil(historyTotalCount / (LIMIT * 2));
  console.log(historyTotalCount, historyTotalPages);
  return {
    /**
     * QUERY
     */
    consultationData,
    isError,
    history: history?.data,
    historyPage,
    historyTotalPages,
    setHistoryPage,

    /**
     * FORM
     */
    form,
    register,
    watch,
    setValue,
    formState,

    /**
     * TABS
     */
    activeTab,
    setActiveTab,

    /**
     * VITALS
     */
    isEditingVitals,
    setIsEditingVitals,
    handleSaveVitals,

    /**
     * NOTES
     */
    handleUpdateNotes,

    /**
     * NEW VITALS
     */
    newVitals,
    setNewVitals,
    isRecordingNewVitals,
    setIsRecordingNewVitals,
    handleNewVitalChange,
    handleRecordVitals,
    recordedVitals,
    handleDeleteRecordedVitals,
    viewHistoryDetails,
    /**
     * MEDICINES
     */
    medicines,
    newMedicineName,
    setNewMedicineName,
    handleRemoveMedicine,
    handleOpenMedicineModal,

    /**
     * LAB TESTS
     */
    labTests,
    newTestName,
    setNewTestName,
    newTestNotes,
    setNewTestNotes,
    handleAddLabTest,
    handleRemoveLabTest,

    /**
     * CONSULTATION
     */
    handleCompleteConsultation,
  };
};

export default useDoctorConsultation;
