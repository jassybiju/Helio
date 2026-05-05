import React from "react";
import { ModalProps } from "../layout/ModalProvider";
import { X } from "lucide-react";

interface ViewPDFModalProps extends ModalProps {
  file: string;
  title: string;
}

const ViewPDFModal = ({ file, title, close }: ViewPDFModalProps) => {
  return (
    <div className="flex flex-col w-[90vw] max-w-4xl h-[85vh] bg-white rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 shrink-0 ">
        <h2 className="text-base font-semibold text-slate-900">{title}</h2>
        <button
          onClick={close}
          className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-500"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* PDF Viewer */}
      <iframe src={file} className="flex-1 w-full" title={title} />
    </div>
  );
};

export default ViewPDFModal;
