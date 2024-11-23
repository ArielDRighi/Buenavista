import { Request, Response } from "express";
import {
  getAllAppointmentsService,
  getAppointmentByIdService,
  scheduleAppointmentService,
  cancelAppointmentByIdService,
  getAppointmentsByUserIdService,
} from "../services/appointmentService";
import AppointmentDto from "../dto/AppointmentDto";

// Obtener todos los turnos
export const getAppointments = async (req: Request, res: Response): Promise<Response> => {
  try {
    const appointments = await getAllAppointmentsService();
    if (appointments.length > 0) {
      return res.json(appointments);
    } else {
      return res.status(404).json({ message: "No appointments found" });
    }
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

// Obtener el detalle de un turno por ID
export const getAppointmentById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const appointment = await getAppointmentByIdService(parseInt(req.params.id));
    if (appointment) {
      return res.json(appointment);
    } else {
      return res.status(404).json({ message: "Appointment not found" });
    }
  } catch (error: any) {
    return res.status(500).json({ message: "Error retrieving appointment", error });
  }
};

// Obtener turnos por ID de usuario
export const getAppointmentsByUserId = async (req: Request, res: Response): Promise<Response> => {
  try {
    const userId = parseInt(req.params.userId, 10);
    const appointments = await getAppointmentsByUserIdService(userId);

    if (appointments.length > 0) {
      return res.json(appointments);
    } else {
      return res.status(404).json({ message: "No appointments found for this user" });
    }
  } catch (error: any) {
    return res.status(500).json({ message: "Error retrieving appointments", error });
  }
};

// Agendar un nuevo turno
export const scheduleAppointment = async (req: Request, res: Response): Promise<Response> => {
  try {
    const appointmentData: AppointmentDto = req.body;

    const appointmentDate = new Date(appointmentData.date);
    const dayOfWeek = appointmentDate.getUTCDay();

    // Verifica si la fecha es un sábado (6) o domingo (0)
    if (dayOfWeek === 6 || dayOfWeek === 0) {
      return res.status(400).json({ message: "No se pueden agendar turnos en sábados y domingos." });
    }

    const selectedTime = new Date(`2000-01-01T${appointmentData.time}`);
    const openingTime = new Date(`2000-01-01T10:00`);
    const closingTime = new Date(`2000-01-01T22:00`);

    // Verifica que la hora esté dentro del horario de atención
    if (selectedTime < openingTime || selectedTime > closingTime) {
      return res.status(400).json({ message: "La hora seleccionada debe estar entre las 10:00 y las 22:00" });
    }

    const newAppointment = await scheduleAppointmentService(appointmentData);
    return res.status(201).json(newAppointment);
  } catch (error: any) {
    return res.status(500).json({ message: "Error scheduling appointment", error });
  }
};

// Cancelar un turno
export const cancelAppointment = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;

    // Obtener los detalles del turno para verificar la fecha
    const appointment = await getAppointmentByIdService(parseInt(id, 10));

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    const appointmentDate = new Date(`${appointment.date}T${appointment.time}`);
    const today = new Date();

    // Solo permite cancelaciones hasta el día anterior al turno
    const oneDayBefore = new Date(appointmentDate);
    oneDayBefore.setDate(appointmentDate.getDate() - 1);

    if (today > oneDayBefore) {
      return res.status(400).json({ message: "No se puede cancelar el turno, solo hasta el día anterior." });
    }

    const result = await cancelAppointmentByIdService(parseInt(id, 10));

    if (result === "Appointment not found") {
      return res.status(404).json({ message: result });
    }

    return res.json({ id: parseInt(id, 10), message: result });
  } catch (error: any) {
    return res.status(500).json({ error: "Error canceling appointment" });
  }
};
