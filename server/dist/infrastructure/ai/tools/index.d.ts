import type { ISpecialityRepository } from "#application/ports/repositories/ISpeicaltyRepository.js";
import type { IDoctorRepository } from "#application/ports/repositories/IDoctorRepository.js";
import { DynamicStructuredTool } from "langchain";
import z from "zod";
interface Slot {
    dateTime: string;
    consultationType: "ONLINE" | "CLINIC";
    id: string;
}
export declare function createGetSpecialtyTool(specialtyRepo: ISpecialityRepository): DynamicStructuredTool<z.ZodObject<{}, z.z.core.$strip>, Record<string, never>, Record<string, never>, {
    specialties: string[];
}, unknown, "get_specialities">;
export declare function createSearchDoctorTool(doctorRepo: IDoctorRepository): DynamicStructuredTool<z.ZodObject<{
    query: z.ZodString;
}, z.z.core.$strip>, {
    query: string;
}, {
    query: string;
}, {
    doctors: {
        id: string;
        name: string;
        clinicFee: number | null;
        onlineFee: number | null;
        experienceYears: number | null;
        rating: number;
    }[];
}, unknown, "search_doctors">;
export declare const getDoctorDetailsTool: DynamicStructuredTool<z.ZodObject<{
    doctorId: z.ZodString;
}, z.z.core.$strip>, {
    doctorId: string;
}, {
    doctorId: string;
}, {
    error: string;
    doctor?: never;
} | {
    doctor: {
        id: string;
        name: string;
        specialty: string;
        experienceYears: number;
        rating: number;
        fee: number;
    };
    error?: never;
}, unknown, "get_doctor_details">;
export declare const getDoctorSlotsTool: DynamicStructuredTool<z.ZodObject<{
    doctorId: z.ZodString;
}, z.z.core.$strip>, {
    doctorId: string;
}, {
    doctorId: string;
}, {
    error: string;
    slots?: never;
} | {
    slots: Slot[];
    error?: never;
}, unknown, "get_doctor_slots">;
export declare const bookAppointmentTool: DynamicStructuredTool<z.ZodObject<{
    doctorId: z.ZodString;
    date: z.ZodString;
    consultationType: z.ZodEnum<{
        ONLINE: "ONLINE";
        CLINIC: "CLINIC";
    }>;
}, z.z.core.$strip>, {
    doctorId: string;
    date: string;
    consultationType: "ONLINE" | "CLINIC";
}, {
    doctorId: string;
    date: string;
    consultationType: "ONLINE" | "CLINIC";
}, {
    bookingId: string;
    doctorId: string;
    date: string;
    consultationType: "ONLINE" | "CLINIC";
    status: string;
}, unknown, "book_appointment">;
export declare const getPatientWalletTool: DynamicStructuredTool<z.ZodObject<{
    patientId: z.ZodOptional<z.ZodString>;
}, z.z.core.$strip>, {
    patientId?: string | undefined;
}, {
    patientId?: string | undefined;
}, {
    balance: number;
    currency: string;
}, unknown, "getPatientWallet">;
export declare const helioTools: (DynamicStructuredTool<z.ZodObject<{}, z.z.core.$strip>, Record<string, never>, Record<string, never>, {
    specialties: string[];
}, unknown, "get_specialities"> | DynamicStructuredTool<z.ZodObject<{
    query: z.ZodString;
}, z.z.core.$strip>, {
    query: string;
}, {
    query: string;
}, {
    doctors: {
        id: string;
        name: string;
        clinicFee: number | null;
        onlineFee: number | null;
        experienceYears: number | null;
        rating: number;
    }[];
}, unknown, "search_doctors"> | DynamicStructuredTool<z.ZodObject<{
    doctorId: z.ZodString;
}, z.z.core.$strip>, {
    doctorId: string;
}, {
    doctorId: string;
}, {
    error: string;
    doctor?: never;
} | {
    doctor: {
        id: string;
        name: string;
        specialty: string;
        experienceYears: number;
        rating: number;
        fee: number;
    };
    error?: never;
}, unknown, "get_doctor_details"> | DynamicStructuredTool<z.ZodObject<{
    doctorId: z.ZodString;
}, z.z.core.$strip>, {
    doctorId: string;
}, {
    doctorId: string;
}, {
    error: string;
    slots?: never;
} | {
    slots: Slot[];
    error?: never;
}, unknown, "get_doctor_slots"> | DynamicStructuredTool<z.ZodObject<{
    doctorId: z.ZodString;
    date: z.ZodString;
    consultationType: z.ZodEnum<{
        ONLINE: "ONLINE";
        CLINIC: "CLINIC";
    }>;
}, z.z.core.$strip>, {
    doctorId: string;
    date: string;
    consultationType: "ONLINE" | "CLINIC";
}, {
    doctorId: string;
    date: string;
    consultationType: "ONLINE" | "CLINIC";
}, {
    bookingId: string;
    doctorId: string;
    date: string;
    consultationType: "ONLINE" | "CLINIC";
    status: string;
}, unknown, "book_appointment"> | DynamicStructuredTool<z.ZodObject<{
    patientId: z.ZodOptional<z.ZodString>;
}, z.z.core.$strip>, {
    patientId?: string | undefined;
}, {
    patientId?: string | undefined;
}, {
    balance: number;
    currency: string;
}, unknown, "getPatientWallet">)[];
export {};
//# sourceMappingURL=index.d.ts.map