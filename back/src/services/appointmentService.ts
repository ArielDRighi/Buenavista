import { AppDataSource } from "../config/data-source";
import AppointmentDto from "../dto/AppointmentDto";
import { Appointment } from "../entities/Appointment";
import { User } from "../entities/User";
import { AppointmentStatus } from "../enums/AppointmentStatus";

const AppointmentEntity = AppDataSource.getRepository(Appointment);

// Obtener todos los turnos
export const getAllAppointmentsService = async (): Promise<Appointment[]> => {
  const appointmentsAll: Appointment[] = await AppointmentEntity.find({
    relations: { user: true },
  });
  return appointmentsAll;
};

// Obtener turnos por ID de usuario

export const getAppointmentsByUserIdService = async (userId: number): Promise<Appointment[]> => {
  const appointments: Appointment[] = await AppointmentEntity.find({
    where: { user: { id: userId } }, // Busca turnos donde el ID del usuario coincida
    relations: { user: true }, // Asegura que se recuperen los datos del usuario asociado
  });
  return appointments;
};

// Obtener turno por ID
export const getAppointmentByIdService = async (id: number): Promise<Appointment | null> => {
  return await AppointmentEntity.findOne({ where: { id }, relations: { user: true } });
};

// Agendar un turno
export const scheduleAppointmentService = async (appointmentData: AppointmentDto): Promise<Appointment | null> => {
  const { date, time, userId } = appointmentData;

  const foundUser: User | null = await AppDataSource.getRepository(User).findOneBy({ id: userId });

  if (foundUser) {
    const newAppointment: Appointment = AppointmentEntity.create({
      date,
      time,
      user: foundUser,
    });
    newAppointment.status = AppointmentStatus.ACTIVE;
    await AppointmentEntity.save(newAppointment);
    return newAppointment;
  }
  return null;
};

// Cancelar un turno
export const cancelAppointmentByIdService = async (id: number): Promise<string> => {
  const foundAppointment: Appointment | null = await AppointmentEntity.findOne({
    where: { id },
  });

  if (!foundAppointment) {
    return "Appointment not found";
  }

  foundAppointment.status = AppointmentStatus.CANCELLED;
  await AppointmentEntity.save(foundAppointment);

  return "Appointment canceled successfully";
};
