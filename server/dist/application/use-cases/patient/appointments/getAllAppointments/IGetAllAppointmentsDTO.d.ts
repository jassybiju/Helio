export interface IGetAllAppointmentsDTO {
    appointments: {
        id: string;
        doctor: {
            id: string;
            name: string;
            specialization: string;
            profilePicture: string | null;
        };
        appointment: {
            startTime: string;
            endTime: string;
            consultationType: string;
            status: string;
            paymentStatus: string;
            totalAmount: number;
        };
        consultation: {
            exists: boolean;
            completed: boolean;
        };
        hasLabReports: boolean;
    }[];
    cancelledAppointments: string[];
    totalCount: number;
    page: number;
    limit: number;
}
//# sourceMappingURL=IGetAllAppointmentsDTO.d.ts.map