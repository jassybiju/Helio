export class DoctorViewAllAppointmentMapper {
    static toDto(appointment) {
        return appointment.map((appoint) => {
            const app = appoint.appointment;
            return {
                id: app.id,
                patientName: appoint.patientName,
                time: app.startTime,
                type: app.consultationType,
                paymentStatus: app.paymentStatus,
                status: app.status,
                queueNumber: app.queueNumber,
            };
        });
    }
}
//# sourceMappingURL=DoctorViewAllAppointmentMapper.js.map