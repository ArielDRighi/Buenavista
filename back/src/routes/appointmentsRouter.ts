import { Router } from "express";
import {
  getAppointments,
  getAppointmentById,
  scheduleAppointment,
  cancelAppointment,
  getAppointmentsByUserId,
} from "../controllers/appointmentsController";
import { checkUserExists } from "../Middlewares/checkUserExists";

const router = Router();

router.get("/", getAppointments);
router.get("/user/:userId", getAppointmentsByUserId);
router.get("/:id", getAppointmentById);
router.post("/schedule", checkUserExists, scheduleAppointment);
router.put("/cancel/:id", cancelAppointment);

export default router;
