import PatientChatComponent from '@/src/features/patient/dashboard/chat/components/PatientChatComponent'

const PatientChatPage = () => {
  return (
    <div className="h-[calc(100vh-140px)] overflow-hidden rounded-lg border border-slate-200 bg-white">
      <div className="flex h-full">
        <PatientChatComponent />
      </div>
    </div>  )
}

export default PatientChatPage