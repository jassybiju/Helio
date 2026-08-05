export class GetPatientDashboardUseCase {
    _logger;
    _patientRepo;
    _appointmentRepo;
    constructor(_logger, _patientRepo, _appointmentRepo) {
        this._logger = _logger;
        this._patientRepo = _patientRepo;
        this._appointmentRepo = _appointmentRepo;
    }
    async execute(patientId) {
        this._logger.info("Get Patient Attempt", { patientId });
        return {
            stats: {
                totalAppointments: 1,
                completedAppointments: 1,
                upcomingAppointments: 1,
                cancelledAppointments: 1,
            },
            vitals: {
                heartRate: "",
                bloodPressure: "",
                oxygenLevel: "",
                temperature: "",
                weight: "",
                height: "",
                fromAppointmentId: "",
                date: new Date(),
            },
            medications: [
                {
                    doctorName: "",
                    prescription: {
                        name: "",
                        foodTiming: 1,
                        timing: { morning: true, afternoon: true, night: true },
                        durationInDays: 1,
                        validTill: new Date(),
                        instructions: "string",
                    },
                    fromAppointemnts: "string",
                },
            ],
            nextAppointment: {
                doctorName: "string",
                specialty: "string",
                date: new Date(),
                appointmentId: "string",
            },
        };
    }
}
//# sourceMappingURL=GetPatientDashboardUseCase.js.map