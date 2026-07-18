'use client'

import { useState, useRef } from 'react'
import { Upload, X, CheckCircle } from 'lucide-react'
import { ModalProps } from '@/src/layout/ModalProvider'
import { useUploadLabReportMutation } from '../hooks/useUploadLabReportMutation'
import { toast } from 'react-toastify'

interface UploadLabReportModalProps {
  testName : string,
  reportId : string
}

 const PatientUploadLabReportModal = ({ close , testName, reportId}: ModalProps & UploadLabReportModalProps)=> {
  const [dragActive, setDragActive] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const {mutate :upload, isPending : isUploading} = useUploadLabReportMutation(reportId)

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      if (isValidFile(file)) {
        setSelectedFile(file)
      } else {
        alert('Please upload a PDF or image file (max 10MB)')
      }
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      if (isValidFile(file)) {
        setSelectedFile(file)
      } else {
        alert('Please upload a PDF or image file (max 10MB)')
      }
    }
  }

const isValidFile = (file: File) => {
  const maxSize = 10 * 1024 * 1024; // 10MB

  return file.type === "application/pdf" && file.size <= maxSize;
};

  const handleSubmit = async () => {
    if(!selectedFile) return
    // if (!selectedFile) {
    //   alert('Please select a file to upload')
    //   return
    // }

    // setIsUploading(true)
    // // Simulate upload
    // await new Promise(resolve => setTimeout(resolve, 2000))
    // setIsUploading(false)
    

    upload(selectedFile, {onSuccess(){
      setSelectedFile(null)
      close()
      toast.success('PDF Uploaded Succesfully')

    }})
  }

  return (
    <div className=" inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="border-b border-slate-200 p-6 flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Upload Lab Report</h2>
            <p className="text-slate-600 mt-1">Test: <span className="font-semibold">{testName}</span></p>
          </div>
          <button
            onClick={close}
            className="p-1 hover:bg-slate-100 rounded-lg transition"
          >
            <X className="w-5 h-5 text-slate-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* File Upload Section */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-slate-900">Select or Drag & Drop File</label>
            <p className="text-xs text-slate-600">PDF or Image (JPG, PNG) • Max 10MB</p>

            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition ${
                dragActive
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-slate-300 hover:border-slate-400'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                onChange={handleChange}
                accept=".pdf,.jpg,.jpeg,.png"
                className="hidden"
              />

              {selectedFile ? (
                <div className="space-y-3">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">{selectedFile.name}</p>
                    <p className="text-xs text-slate-600 mt-1">
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedFile(null)
                    }}
                    className="text-xs text-blue-600 hover:text-blue-700 font-semibold"
                  >
                    Choose Different File
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto">
                    <Upload className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Drag and drop your file here</p>
                    <p className="text-sm text-slate-600 mt-1">or click to browse</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Notes Section */}
        

          {/* File Requirements */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-2">
            <h4 className="text-sm font-semibold text-blue-900">File Requirements</h4>
            <ul className="text-xs text-blue-800 space-y-1 ml-4 list-disc">
              <li>Supported formats: PDF</li>
              <li>Maximum file size: 10 MB</li>
              <li>Ensure all text is clearly visible</li>
              <li>Include complete lab report details</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-200 bg-slate-50 p-6 flex gap-3 justify-end">
          <button
            onClick={close}
            disabled={isUploading}
            className="px-6 py-2 border border-slate-300 text-slate-900 font-semibold rounded-lg hover:bg-slate-100 transition disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!selectedFile || isUploading}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white font-semibold rounded-lg transition flex items-center gap-2 disabled:cursor-not-allowed"
          >
            {isUploading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4" />
                Upload Report
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}


export default PatientUploadLabReportModal