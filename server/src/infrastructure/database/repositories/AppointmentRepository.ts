import type { IAppointmentRepository } from "@application/ports/repositories/IAppointmentRepository.ts";
import { Appointment } from "@domain/entities/Appointment.ts";
import { BaseRepository } from "./BaseRepository.ts";
import {
  appointmentModel,
  type AppointmentRaw,
} from "../model/AppointmentModel.ts";
import { AppointmentMapper } from "../../../mappers/AppointmentMapper.ts";
import type { CONSULTATION_TYPE } from "@domain/common/enums/doctorShift.enum.ts";

export class AppointmentRepository
  extends BaseRepository<Appointment, AppointmentRaw>
  implements IAppointmentRepository
{
  constructor() {
    super(appointmentModel);
  }
  async findExistingPatientAppointment(
    patientId: string,
    doctorId: string,
    startTime: Date
  ): Promise<Appointment | null> {
    return await super.findOne(
      { patient_id: patientId, doctor_id: doctorId, start_time: startTime },
      AppointmentMapper.toDomain
    );
  }

  async countConfirmed(
    doctorId: string,
    startTime: Date,
    type: CONSULTATION_TYPE
  ): Promise<number> {
    return await super.count({
      doctor_id: doctorId,
      start_time: startTime,
      consultation_type: type,
    });
  }

  async create(appointment: Appointment): Promise<void> {
    await super.create(appointment, AppointmentMapper.toPersistence);
  }

  async findActiveInRange(
    doctorId: string,
    start: Date,
    end: Date
  ): Promise<Appointment[]> {
    console.log(start);
    let startTime = new Date(start).setHours(0, 0, 0, 0);
    let endTime = new Date(end).setHours(23, 59, 59, 999);
    console.log(startTime, endTime, doctorId, 111);
    return await super.find(
      {
        doctor_id: doctorId,

        // start_time: {
        //   $gte: startTime,
        //   $lt: endTime,
        // },
      },
      {},
      AppointmentMapper.toDomain
    );
  }
}
