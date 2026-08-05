export class PatientAppointmentPdfMapper {
    static toView(appointment, patient, doctor) {
        return {
            appointmentId: appointment.id,
            appointmentDate: appointment.startTime.toDateString(),
            doctorName: doctor.fullName,
            specialization: doctor.specialization ?? "",
            patientName: patient.fullName,
            amount: String(appointment.totalAmount),
            status: appointment.paymentStatus,
            consultationType: appointment.consultationType,
            generatedAt: new Date().toDateString(),
        };
    }
}
//# sourceMappingURL=PatientInvoicePDFMapper.js.map