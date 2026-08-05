export interface IAIAgentService {
    chat(input: {
        conversationId: string;
        patientId: string;
        message: string;
    }): Promise<string>;
    summarizeAppointment(input: {
        appointmentId: string;
    }): Promise<string>;
}
//# sourceMappingURL=IAIAgentService.d.ts.map